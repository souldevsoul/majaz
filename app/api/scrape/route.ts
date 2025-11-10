import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import axios from "axios";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { ListingSource } from "@prisma/client";

const scrapeSchema = z.object({
  url: z.string().url("Invalid URL"),
  requestId: z.string().optional(),
});

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;

// Map domain to listing source
function detectListingSource(url: string): ListingSource {
  const hostname = new URL(url).hostname.toLowerCase();

  if (hostname.includes("emiratesauction")) return "EMIRATES_AUCTION";
  if (hostname.includes("awalmazad")) return "AWAL_MAZAD";
  if (hostname.includes("dubizzle")) return "DUBIZZLE";
  if (hostname.includes("carswitch")) return "CAR_SWITCH";
  if (hostname.includes("autotraderuae")) return "AUTO_TRADER_UAE";
  if (hostname.includes("haraj")) return "HARAJ";
  if (hostname.includes("marhaba")) return "MARHABA";

  return "OTHER";
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
    const validatedData = scrapeSchema.parse(body);

    if (!FIRECRAWL_API_KEY) {
      return NextResponse.json(
        { success: false, error: "Firecrawl API key not configured" },
        { status: 500 }
      );
    }

    // Detect listing source
    const source = detectListingSource(validatedData.url);

    // Start scraping with Firecrawl
    let scrapedData;
    try {
      const response = await axios.post(
        "https://api.firecrawl.dev/v0/scrape",
        {
          url: validatedData.url,
          formats: ["html", "markdown"],
          onlyMainContent: true,
        },
        {
          headers: {
            "Authorization": `Bearer ${FIRECRAWL_API_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 30000, // 30 second timeout
        }
      );

      scrapedData = response.data;
    } catch (scrapeError: any) {
      console.error("Firecrawl scraping error:", scrapeError.message);

      // Create failed event if requestId provided
      if (validatedData.requestId) {
        await prisma.event.create({
          data: {
            requestId: validatedData.requestId,
            type: "SCRAPING_FAILED",
            description: "Failed to scrape listing URL",
            payload: {
              url: validatedData.url,
              error: scrapeError.message,
            }
          }
        });

        await prisma.request.update({
          where: { id: validatedData.requestId },
          data: { status: "FAILED" }
        });
      }

      return NextResponse.json(
        {
          success: false,
          error: "Failed to scrape URL",
          details: scrapeError.message
        },
        { status: 500 }
      );
    }

    // Extract photos from scraped content
    const photos: string[] = [];
    if (scrapedData.data?.metadata?.images) {
      photos.push(...scrapedData.data.metadata.images);
    }

    // Create or update listing in database
    let listing;
    if (validatedData.requestId) {
      // Check if request exists and user owns it
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

      // Update request status
      await prisma.request.update({
        where: { id: validatedData.requestId },
        data: { status: "PARSING" }
      });

      // Create or update listing
      listing = await prisma.listing.upsert({
        where: { requestId: validatedData.requestId },
        create: {
          requestId: validatedData.requestId,
          source,
          url: validatedData.url,
          rawHtml: scrapedData.data?.html || null,
          rawJson: scrapedData.data || {},
          photos,
          scrapedAt: new Date(),
        },
        update: {
          source,
          url: validatedData.url,
          rawHtml: scrapedData.data?.html || null,
          rawJson: scrapedData.data || {},
          photos,
          scrapedAt: new Date(),
        }
      });

      // Create events
      await prisma.event.create({
        data: {
          requestId: validatedData.requestId,
          type: "SCRAPING_STARTED",
          description: "Started scraping listing URL",
          payload: { url: validatedData.url, source }
        }
      });

      await prisma.event.create({
        data: {
          requestId: validatedData.requestId,
          type: "SCRAPING_COMPLETED",
          description: "Successfully scraped listing data",
          payload: {
            url: validatedData.url,
            source,
            photosCount: photos.length,
          }
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        url: validatedData.url,
        source,
        listing,
        scraped: {
          html: scrapedData.data?.html ? "Available" : "Not available",
          markdown: scrapedData.data?.markdown ? "Available" : "Not available",
          photos: photos.length,
          metadata: scrapedData.data?.metadata,
        }
      }
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

    console.error("Scrape route error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process scraping request" },
      { status: 500 }
    );
  }
}
