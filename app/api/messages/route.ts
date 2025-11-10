import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";

const createMessageSchema = z.object({
  requestId: z.string().min(1, "Request ID is required"),
  content: z.string().min(1, "Message content is required"),
  attachments: z.array(z.string().url()).optional().default([]),
});

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("requestId");

    if (!requestId) {
      return NextResponse.json(
        { success: false, error: "Request ID is required" },
        { status: 400 }
      );
    }

    // Check if user owns this request
    const requestData = await prisma.request.findUnique({
      where: { id: requestId },
      select: { userId: true }
    });

    if (!requestData) {
      return NextResponse.json(
        { success: false, error: "Request not found" },
        { status: 404 }
      );
    }

    if (requestData.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: "Forbidden" },
        { status: 403 }
      );
    }

    // Get messages for this request
    const messages = await prisma.message.findMany({
      where: { requestId },
      orderBy: { createdAt: "asc" }
    });

    // Mark messages as read
    await prisma.message.updateMany({
      where: {
        requestId,
        senderId: { not: session.user.id },
        read: false,
      },
      data: {
        read: true,
        readAt: new Date(),
      }
    });

    return NextResponse.json({
      success: true,
      data: messages
    });

  } catch (error) {
    console.error("Get messages error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = createMessageSchema.parse(body);

    // Check if user owns this request
    const requestData = await prisma.request.findUnique({
      where: { id: validatedData.requestId },
      select: { userId: true }
    });

    if (!requestData) {
      return NextResponse.json(
        { success: false, error: "Request not found" },
        { status: 404 }
      );
    }

    if (requestData.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: "Forbidden" },
        { status: 403 }
      );
    }

    // Create message
    const message = await prisma.message.create({
      data: {
        requestId: validatedData.requestId,
        senderId: session.user.id,
        senderName: session.user.name || session.user.email || "User",
        senderType: "user",
        content: validatedData.content,
        attachments: validatedData.attachments,
      }
    });

    // Create event log
    await prisma.event.create({
      data: {
        requestId: validatedData.requestId,
        type: "MESSAGE_SENT",
        description: "User sent a message",
        payload: {
          messageId: message.id,
          hasAttachments: validatedData.attachments.length > 0,
        }
      }
    });

    return NextResponse.json(
      {
        success: true,
        data: message
      },
      { status: 201 }
    );

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

    console.error("Create message error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    );
  }
}
