import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";

const updateRequestSchema = z.object({
  status: z.enum([
    "PENDING_PAYMENT",
    "PAYMENT_RECEIVED",
    "SCRAPING",
    "PARSING",
    "ANALYZING",
    "GENERATING_REPORT",
    "COMPLETED",
    "FAILED",
    "REFUNDED"
  ]).optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const requestData = await prisma.request.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            phone: true,
          }
        },
        listing: true,
        vehicle: true,
        estimate: true,
        reports: {
          orderBy: { generatedAt: "desc" }
        },
        events: {
          orderBy: { createdAt: "desc" },
          take: 50,
        },
        messages: {
          orderBy: { createdAt: "asc" }
        }
      }
    });

    if (!requestData) {
      return NextResponse.json(
        { success: false, error: "Request not found" },
        { status: 404 }
      );
    }

    // Check if user owns this request
    if (requestData.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: "Forbidden" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      data: requestData
    });

  } catch (error) {
    console.error("Get request error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch request" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = updateRequestSchema.parse(body);

    // Check if request exists and user owns it
    const existingRequest = await prisma.request.findUnique({
      where: { id: params.id }
    });

    if (!existingRequest) {
      return NextResponse.json(
        { success: false, error: "Request not found" },
        { status: 404 }
      );
    }

    if (existingRequest.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: "Forbidden" },
        { status: 403 }
      );
    }

    // Update request
    const updatedRequest = await prisma.request.update({
      where: { id: params.id },
      data: {
        ...validatedData,
        updatedAt: new Date(),
        completedAt: validatedData.status === "COMPLETED" ? new Date() : undefined,
      },
      include: {
        listing: true,
        vehicle: true,
        estimate: true,
      }
    });

    // Create event log if status changed
    if (validatedData.status && validatedData.status !== existingRequest.status) {
      await prisma.event.create({
        data: {
          requestId: params.id,
          type: "STATUS_CHANGED",
          description: `Status changed from ${existingRequest.status} to ${validatedData.status}`,
          payload: {
            oldStatus: existingRequest.status,
            newStatus: validatedData.status,
          }
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: updatedRequest
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: error.errors
        },
        { status: 400 }
      );
    }

    console.error("Update request error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update request" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if request exists and user owns it
    const existingRequest = await prisma.request.findUnique({
      where: { id: params.id }
    });

    if (!existingRequest) {
      return NextResponse.json(
        { success: false, error: "Request not found" },
        { status: 404 }
      );
    }

    if (existingRequest.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: "Forbidden" },
        { status: 403 }
      );
    }

    // Soft delete by updating status
    await prisma.request.update({
      where: { id: params.id },
      data: {
        status: "FAILED",
        updatedAt: new Date(),
      }
    });

    // Create event log
    await prisma.event.create({
      data: {
        requestId: params.id,
        type: "STATUS_CHANGED",
        description: "Request deleted by user",
        payload: {
          deletedAt: new Date().toISOString(),
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: { message: "Request deleted successfully" }
    });

  } catch (error) {
    console.error("Delete request error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete request" },
      { status: 500 }
    );
  }
}
