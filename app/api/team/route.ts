import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role");

    const where: any = { active: true };

    if (role && ["INSPECTOR", "OPERATOR", "ADMIN"].includes(role)) {
      where.role = role;
    }

    const teamMembers = await prisma.teamMember.findMany({
      where,
      orderBy: [
        { rating: "desc" },
        { inspectionsCompleted: "desc" },
        { name: "asc" }
      ],
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
      }
    });

    return NextResponse.json({
      success: true,
      data: teamMembers
    });

  } catch (error) {
    console.error("Get team members error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch team members" },
      { status: 500 }
    );
  }
}
