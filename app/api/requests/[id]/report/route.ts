import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";

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

    const { searchParams } = new URL(request.url);
    const language = searchParams.get("language") || "EN";
    const format = searchParams.get("format") || "html"; // html or pdf

    // Check if request exists and user owns it
    const requestData = await prisma.request.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          }
        },
        listing: true,
        vehicle: true,
        estimate: true,
      }
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

    // Get the latest report in requested language
    const report = await prisma.report.findFirst({
      where: {
        requestId: params.id,
        language: language as "EN" | "AR",
      },
      orderBy: {
        generatedAt: "desc"
      }
    });

    if (!report) {
      return NextResponse.json(
        { success: false, error: "Report not found" },
        { status: 404 }
      );
    }

    // Mark report as sent if not already
    if (!report.sentToUser) {
      await prisma.report.update({
        where: { id: report.id },
        data: {
          sentToUser: true,
          sentAt: new Date(),
        }
      });

      // Create event log
      await prisma.event.create({
        data: {
          requestId: params.id,
          type: "REPORT_SENT",
          description: `Report downloaded in ${language} format`,
          payload: {
            reportId: report.id,
            language: language,
            format: format,
          }
        }
      });
    }

    if (format === "pdf" && report.pdfUrl) {
      // Redirect to PDF URL or return PDF data
      return NextResponse.json({
        success: true,
        data: {
          type: "pdf",
          url: report.pdfUrl,
          reportId: report.id,
        }
      });
    } 
      // Return HTML content
      return new NextResponse(report.htmlContent, {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Content-Disposition": `inline; filename="majaz-report-${params.id}.html"`,
        }
      });
    

  } catch (error) {
    console.error("Get report error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch report" },
      { status: 500 }
    );
  }
}
