import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import Stripe from "stripe";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const createRequestSchema = z.object({
  mode: z.enum(["REMOTE_ASSESSMENT", "ONSITE_INSPECTION", "SOURCING", "DELEGATED_BIDDING"]),
  serviceTier: z.enum(["REMOTE_48H", "REMOTE_24H", "REMOTE_SAME_DAY", "ONSITE_48H", "ONSITE_24H"]),
  country: z.string().default("UAE"),
  serviceFeeAED: z.number().positive(),
  depositAED: z.number().positive().optional(),
  depositPct: z.number().int().min(0).max(100).optional(),
  sourcingBrief: z.string().optional(),
  listingUrl: z.string().url().optional(),
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
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const [requests, total] = await Promise.all([
      prisma.request.findMany({
        where: { userId: session.user.id },
        include: {
          listing: true,
          vehicle: true,
          estimate: true,
          _count: {
            select: {
              reports: true,
              messages: true,
              events: true,
            }
          }
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.request.count({
        where: { userId: session.user.id }
      })
    ]);

    return NextResponse.json({
      success: true,
      data: {
        requests,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        }
      }
    });

  } catch (error) {
    console.error("Get requests error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch requests" },
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
    const validatedData = createRequestSchema.parse(body);

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(validatedData.serviceFeeAED * 100), // Convert to fils
      currency: "aed",
      metadata: {
        userId: session.user.id,
        mode: validatedData.mode,
        serviceTier: validatedData.serviceTier,
      }
    });

    // Create deposit payment intent if needed
    let depositIntent;
    if (validatedData.depositAED) {
      depositIntent = await stripe.paymentIntents.create({
        amount: Math.round(validatedData.depositAED * 100),
        currency: "aed",
        metadata: {
          userId: session.user.id,
          type: "deposit",
        }
      });
    }

    // Create request in database
    const newRequest = await prisma.request.create({
      data: {
        userId: session.user.id,
        mode: validatedData.mode,
        serviceTier: validatedData.serviceTier,
        country: validatedData.country,
        serviceFeeAED: validatedData.serviceFeeAED,
        depositAED: validatedData.depositAED,
        depositPct: validatedData.depositPct,
        sourcingBrief: validatedData.sourcingBrief,
        stripePaymentId: paymentIntent.id,
        stripeDepositId: depositIntent?.id,
        status: "PENDING_PAYMENT",
      },
      include: {
        listing: true,
        vehicle: true,
        estimate: true,
      }
    });

    // Create event log
    await prisma.event.create({
      data: {
        requestId: newRequest.id,
        type: "REQUEST_CREATED",
        description: `New ${validatedData.mode} request created`,
        payload: {
          serviceTier: validatedData.serviceTier,
          serviceFee: validatedData.serviceFeeAED,
        }
      }
    });

    // Create listing if URL provided
    if (validatedData.listingUrl) {
      await prisma.listing.create({
        data: {
          requestId: newRequest.id,
          url: validatedData.listingUrl,
          source: "OTHER", // Will be detected during scraping
        }
      });
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          request: newRequest,
          paymentClientSecret: paymentIntent.client_secret,
          depositClientSecret: depositIntent?.client_secret,
        }
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

    console.error("Create request error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create request" },
      { status: 500 }
    );
  }
}
