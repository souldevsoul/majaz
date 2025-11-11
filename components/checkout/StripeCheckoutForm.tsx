'use client'

import { useState, useEffect } from 'react'
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'

interface StripeCheckoutFormProps {
  amount: number
  currency: string
  packageName: string
  locale: string
  onSuccess?: () => void
}

export default function StripeCheckoutForm({
  amount,
  currency,
  packageName,
  locale,
  onSuccess
}: StripeCheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>()

  const isArabic = locale === 'ar'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setErrorMessage(undefined)

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/${locale}/checkout/success?package=${packageName}`,
        },
      })

      if (error) {
        setErrorMessage(error.message)
        setIsProcessing(false)
      } else {
        onSuccess?.()
      }
    } catch (err) {
      setErrorMessage(isArabic ? 'حدث خطأ في المعالجة' : 'An error occurred')
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="stripe-form">
      <div className="payment-element-container">
        <PaymentElement />
      </div>

      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="submit-button"
      >
        {isProcessing
          ? (isArabic ? 'جارٍ المعالجة...' : 'Processing...')
          : (isArabic ? `ادفع ${amount} ${currency}` : `Pay ${amount} ${currency}`)}
      </button>

      <style jsx>{`
        .stripe-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .payment-element-container {
          padding: 1.5rem;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 12px;
        }

        .error-message {
          padding: 1rem;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 8px;
          color: #F87171;
          font-size: 0.9375rem;
        }

        .submit-button {
          width: 100%;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #D4AF37 0%, #B8941E 100%);
          color: #111111;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1.125rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(212, 175, 55, 0.3);
        }

        .submit-button:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(212, 175, 55, 0.4);
        }

        .submit-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </form>
  )
}
