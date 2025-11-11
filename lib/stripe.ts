import { loadStripe, Stripe } from '@stripe/stripe-js'

let stripePromise: Promise<Stripe | null>

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  }
  return stripePromise
}

export function formatAmountForStripe(amount: number, currency: string): number {
  // Stripe expects amounts in cents/fils
  return Math.round(amount * 100)
}

export function formatAmountFromStripe(amount: number, currency: string): number {
  return amount / 100
}
