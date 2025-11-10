import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const teamMember = await prisma.teamMember.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        name: true,
        nameAr: true,
        role: true,
        title: true,
        titleAr: true,
        bio: true,
        bioAr: true,
        email: true,
        phone: true,
        image: true,
        location: true,
        active: true,
        inspectionsCompleted: true,
        rating: true,
        createdAt: true,
      }
    });

    if (!teamMember) {
      return NextResponse.json(
        { success: false, error: "Team member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: teamMember
    });

  } catch (error) {
    console.error("Get team member error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch team member" },
      { status: 500 }
    );
  }
}
