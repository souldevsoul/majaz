import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { formatAmountForStripe } from '@/lib/stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
})

export async function POST(req: NextRequest) {
  try {
    const { amount, currency, packageId, duration, customerInfo } = await req.json()

    // Extract locale from headers or use default
    const acceptLanguage = req.headers.get('accept-language') || ''
    const locale = acceptLanguage.startsWith('ar') ? 'ar' : 'en'

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: formatAmountForStripe(amount, currency),
      currency: currency.toLowerCase(),
      automatic_payment_methods: {
        enabled: true,
      },
      receipt_email: customerInfo?.email,
      metadata: {
        packageId,
        packageSlug: packageId, // Store slug for email lookup
        duration,
        customerName: customerInfo?.name || '',
        customerEmail: customerInfo?.email || '',
        customerPhone: customerInfo?.phone || '',
        locale,
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    console.error('Payment intent creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}
