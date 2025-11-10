import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getServicePricing, convertCurrency, type Currency } from '@/lib/currency'

const quoteSchema = z.object({
  mode: z.enum(['REMOTE_ASSESSMENT', 'ONSITE_INSPECTION', 'SOURCING', 'DELEGATED_BIDDING']),
  serviceTier: z.enum(['REMOTE_48H', 'REMOTE_24H', 'REMOTE_SAME_DAY', 'ONSITE_48H', 'ONSITE_24H']),
  country: z.string(),
  currency: z.enum(['AED', 'USD', 'EUR']).default('AED'),
  includeDeposit: z.boolean().default(false),
  maxBid: z.number().optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = quoteSchema.parse(body)

    // Get base pricing in AED
    const serviceFeeAED = getServicePricing(data.serviceTier, 'AED')

    // Convert to requested currency
    const serviceFee = convertCurrency(serviceFeeAED, 'AED', data.currency)

    // Calculate deposit if requested
    let deposit = 0
    if (data.includeDeposit && data.maxBid) {
      deposit = Number((data.maxBid * 0.20).toFixed(2))
    }

    // Calculate SLA hours
    const slaHours = {
      REMOTE_48H: 48,
      REMOTE_24H: 24,
      REMOTE_SAME_DAY: 8,
      ONSITE_48H: 48,
      ONSITE_24H: 24
    }[data.serviceTier]

    return NextResponse.json({
      success: true,
      data: {
        serviceFee,
        deposit,
        total: serviceFee + deposit,
        currency: data.currency,
        slaHours,
        breakdown: {
          serviceFeeLabel: data.mode === 'ONSITE_INSPECTION' ? 'On-Site Inspection Fee' : 'Assessment Fee',
          serviceFee,
          depositLabel: 'Refundable Deposit (20%)',
          deposit,
          depositRefundable: true
        }
      }
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid request data',
            details: error.errors
          }
        },
        { status: 400 }
      )
    }

    console.error('Quote API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to generate quote'
        }
      },
      { status: 500 }
    )
  }
}
