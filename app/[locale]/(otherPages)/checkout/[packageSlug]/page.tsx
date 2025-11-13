'use client'

import { useState, useEffect } from 'react'
import { useLocale } from 'next-intl'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { getPackageBySlug } from '@/data/packages'
import GlassCard from '@/components/majaz/GlassCard'
import Button from '@/components/majaz/Button'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

function CheckoutForm({
  packagePrice,
  packageCurrency,
  packageId,
  duration,
  locale,
  onSuccess
}: {
  packagePrice: number
  packageCurrency: string
  packageId: string
  duration: string
  locale: string
  onSuccess: () => void
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [errorMessage, setErrorMessage] = useState<string>()
  const [isProcessing, setIsProcessing] = useState(false)
  const isArabic = locale === 'ar'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setErrorMessage(undefined)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/${locale}/checkout/success?packageId=${packageId}&duration=${duration}`,
      },
    })

    if (error) {
      setErrorMessage(error.message)
      setIsProcessing(false)
    } else {
      onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="stripe-form">
      <PaymentElement />

      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        className="submit-button"
        disabled={!stripe || isProcessing}
      >
        {isProcessing
          ? (isArabic ? 'جارٍ المعالجة...' : 'Processing...')
          : (isArabic ? `ادفع ${packagePrice.toLocaleString()} ${packageCurrency}` : `Pay ${packagePrice.toLocaleString()} ${packageCurrency}`)}
      </button>

      <p className="security-note">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1l6 2v4c0 3.5-2.5 6.5-6 8-3.5-1.5-6-4.5-6-8V3l6-2z" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
        {isArabic ? 'دفع آمن ومشفّر عبر Stripe' : 'Secure payment powered by Stripe'}
      </p>

      <style jsx>{`
        .stripe-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .error-message {
          padding: 1rem;
          background: rgba(220, 38, 38, 0.1);
          border: 1px solid rgba(220, 38, 38, 0.3);
          border-radius: 8px;
          color: #fca5a5;
          font-size: 0.875rem;
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

        .security-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: rgba(255, 255, 240, 0.6);
          margin: 0;
        }

        .security-note svg {
          color: #D4AF37;
        }
      `}</style>
    </form>
  )
}

export default function CheckoutPage() {
  const locale = useLocale()
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const isArabic = locale === 'ar'

  const packageSlug = params.packageSlug as string
  const duration = (searchParams.get('duration') || 'annual') as 'monthly' | 'quarterly' | 'annual'

  const pkg = getPackageBySlug(packageSlug)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    agreeTerms: false
  })

  const [clientSecret, setClientSecret] = useState<string>()
  const [isLoadingPayment, setIsLoadingPayment] = useState(false)

  if (!pkg) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <GlassCard className="error-card">
            <h1>{isArabic ? 'الباقة غير موجودة' : 'Package Not Found'}</h1>
            <p>{isArabic ? 'الباقة المطلوبة غير متوفرة' : 'The requested package is not available'}</p>
            <Button href={`/${locale}/packages`}>
              {isArabic ? 'عودة إلى الباقات' : 'Back to Packages'}
            </Button>
          </GlassCard>
        </div>
      </div>
    )
  }

  const price = pkg.price[duration]
  const name = isArabic ? pkg.nameAr : pkg.name
  const features = isArabic ? pkg.featuresAr : pkg.features

  const formatPrice = (amount: number) => {
    if (amount === 0) return isArabic ? 'اتصل بنا' : 'Contact Us'
    return `${amount.toLocaleString()} ${pkg.currency}`
  }

  const getDurationLabel = () => {
    const labels = {
      en: { monthly: 'Monthly', quarterly: 'Quarterly', annual: 'Annual' },
      ar: { monthly: 'شهري', quarterly: 'ربع سنوي', annual: 'سنوي' }
    }
    return labels[isArabic ? 'ar' : 'en'][duration]
  }

  const handleInitiatePayment = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.agreeTerms) {
      return
    }

    setIsLoadingPayment(true)

    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: price,
          currency: pkg.currency,
          packageId: pkg.id,
          duration,
          customerInfo: formData
        }),
      })

      const data = await response.json()

      if (data.clientSecret) {
        setClientSecret(data.clientSecret)
      } else {
        throw new Error('Failed to create payment intent')
      }
    } catch (error) {
      console.error('Error creating payment intent:', error)
      alert(isArabic ? 'خطأ في إنشاء الدفع' : 'Error creating payment')
    } finally {
      setIsLoadingPayment(false)
    }
  }

  const handlePaymentSuccess = () => {
    // Payment success handled by redirect
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-grid">
          {/* Order Summary */}
          <div className="order-summary">
            <GlassCard className="summary-card">
              <h2 className="summary-title">
                {isArabic ? 'ملخص الطلب' : 'Order Summary'}
              </h2>

              <div className="package-info">
                <h3 className="package-name">{name}</h3>
                <p className="package-duration">{getDurationLabel()}</p>
              </div>

              <div className="features-list">
                <h4 className="features-title">
                  {isArabic ? 'يتضمن:' : 'Includes:'}
                </h4>
                <ul>
                  {features.slice(0, 5).map((feature, index) => (
                    <li key={index}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="price-breakdown">
                <div className="price-row">
                  <span>{isArabic ? 'المجموع الفرعي' : 'Subtotal'}</span>
                  <span className="price-value">{formatPrice(price)}</span>
                </div>
                <div className="price-row total">
                  <span>{isArabic ? 'الإجمالي' : 'Total'}</span>
                  <span className="price-value">{formatPrice(price)}</span>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Checkout Form */}
          <div className="checkout-form-container">
            <GlassCard className="form-card">
              <h1 className="form-title">
                {isArabic ? 'إتمام عملية الشراء' : 'Complete Your Purchase'}
              </h1>

              <form onSubmit={(e) => { e.preventDefault(); handleInitiatePayment(); }} className="checkout-form">
                {/* Contact Information */}
                <div className="form-section">
                  <h3 className="section-title">
                    {isArabic ? 'معلومات الاتصال' : 'Contact Information'}
                  </h3>

                  <div className="form-group">
                    <label htmlFor="name">
                      {isArabic ? 'الاسم الكامل' : 'Full Name'}
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      placeholder={isArabic ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      {isArabic ? 'البريد الإلكتروني' : 'Email'}
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      placeholder={isArabic ? 'your@email.com' : 'your@email.com'}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">
                      {isArabic ? 'رقم الهاتف' : 'Phone Number'}
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                      placeholder={isArabic ? '+971 XX XXX XXXX' : '+971 XX XXX XXXX'}
                    />
                  </div>
                </div>

                {/* Payment Information */}
                <div className="form-section">
                  <h3 className="section-title">
                    {isArabic ? 'معلومات الدفع' : 'Payment Information'}
                  </h3>

                  {!clientSecret ? (
                    <div className="payment-initiate">
                      <button
                        type="button"
                        onClick={handleInitiatePayment}
                        disabled={isLoadingPayment || !formData.agreeTerms}
                        className="initiate-button"
                      >
                        {isLoadingPayment
                          ? (isArabic ? 'جارٍ التحميل...' : 'Loading...')
                          : (isArabic ? 'متابعة إلى الدفع' : 'Continue to Payment')}
                      </button>
                    </div>
                  ) : (
                    <div className="stripe-elements-wrapper">
                      {stripePromise && clientSecret && (
                        <Elements
                          stripe={stripePromise}
                          options={{
                            clientSecret,
                            appearance: {
                              theme: 'night',
                              variables: {
                                colorPrimary: '#D4AF37',
                                colorBackground: '#0A0A0A',
                                colorText: '#FFFFF0',
                                colorDanger: '#df1b41',
                                fontFamily: 'Inter, system-ui, sans-serif',
                                spacingUnit: '4px',
                                borderRadius: '8px',
                              },
                            },
                          }}
                        >
                          <CheckoutForm
                            packagePrice={price}
                            packageCurrency={pkg.currency}
                            packageId={pkg.id}
                            duration={duration}
                            locale={locale}
                            onSuccess={handlePaymentSuccess}
                          />
                        </Elements>
                      )}
                    </div>
                  )}
                </div>

                {/* Terms & Conditions */}
                <div className="form-section">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.agreeTerms}
                      onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})}
                      required
                    />
                    <span>
                      {isArabic ? 'أوافق على' : 'I agree to the'}{' '}
                      <a href={`/${locale}/terms`} target="_blank">
                        {isArabic ? 'الشروط والأحكام' : 'Terms & Conditions'}
                      </a>
                    </span>
                  </label>
                </div>
              </form>
            </GlassCard>
          </div>
        </div>
      </div>

      <style jsx>{`
        .checkout-page {
          min-height: 100vh;
          background: linear-gradient(to bottom, #000000 0%, #0A0A0A 50%, #000000 100%);
          padding: 140px 0 80px;
        }

        .checkout-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .checkout-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 3rem;
          align-items: start;
        }

        /* Order Summary */
        .order-summary {
          position: sticky;
          top: 140px;
        }

        .summary-card {
          padding: 2rem;
        }

        .summary-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 600;
          color: #FFFFF0;
          margin: 0 0 1.5rem 0;
        }

        .package-info {
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(212, 175, 55, 0.15);
          margin-bottom: 1.5rem;
        }

        .package-name {
          font-size: 1.25rem;
          font-weight: 600;
          color: #D4AF37;
          margin: 0 0 0.5rem 0;
        }

        .package-duration {
          color: rgba(255, 255, 240, 0.6);
          margin: 0;
        }

        .features-list {
          margin-bottom: 1.5rem;
        }

        .features-title {
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: rgba(255, 255, 240, 0.7);
          margin: 0 0 1rem 0;
        }

        .features-list ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .features-list li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9375rem;
          color: rgba(255, 255, 240, 0.85);
        }

        .features-list svg {
          color: #D4AF37;
          flex-shrink: 0;
        }

        .price-breakdown {
          padding-top: 1.5rem;
          border-top: 1px solid rgba(212, 175, 55, 0.15);
        }

        .price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0;
          color: rgba(255, 255, 240, 0.7);
        }

        .price-row.total {
          border-top: 2px solid rgba(212, 175, 55, 0.3);
          margin-top: 0.5rem;
          padding-top: 1rem;
          font-size: 1.25rem;
          font-weight: 600;
          color: #FFFFF0;
        }

        .price-value {
          font-family: var(--font-display);
          color: #D4AF37;
          font-weight: 600;
        }

        /* Checkout Form */
        .form-card {
          padding: 2.5rem;
        }

        .form-title {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 300;
          color: #FFFFF0;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0 0 2rem 0;
        }

        .checkout-form {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .form-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .section-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #D4AF37;
          margin: 0;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-size: 0.9375rem;
          font-weight: 600;
          color: rgba(255, 255, 240, 0.9);
        }

        .form-group input {
          padding: 0.875rem 1rem;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 8px;
          color: #FFFFF0;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-group input:focus {
          outline: none;
          border-color: #D4AF37;
          background: rgba(0, 0, 0, 0.6);
        }

        .form-group input::placeholder {
          color: rgba(255, 255, 240, 0.4);
        }

        .payment-initiate {
          padding: 2rem;
          text-align: center;
        }

        .initiate-button {
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

        .initiate-button:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(212, 175, 55, 0.4);
        }

        .initiate-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .stripe-elements-wrapper {
          padding: 1.5rem;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 12px;
        }

        .checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          cursor: pointer;
          color: rgba(255, 255, 240, 0.8);
          font-size: 0.9375rem;
        }

        .checkbox-label input[type="checkbox"] {
          margin-top: 0.25rem;
          width: 18px;
          height: 18px;
          cursor: pointer;
        }

        .checkbox-label a {
          color: #D4AF37;
          text-decoration: underline;
        }

        /* Mobile Responsive */
        @media (max-width: 1024px) {
          .checkout-grid {
            grid-template-columns: 1fr;
          }

          .order-summary {
            position: static;
          }
        }

        @media (max-width: 768px) {
          .checkout-page {
            padding: 100px 0 40px;
          }

          .checkout-container {
            padding: 0 1rem;
          }

          .form-card {
            padding: 1.5rem;
          }

          .form-title {
            font-size: 1.5rem;
          }
        }

        /* RTL Support */
        [dir="rtl"] .checkout-page {
          direction: rtl;
        }

        [dir="rtl"] .features-list li {
          flex-direction: row-reverse;
        }

        [dir="rtl"] .checkbox-label {
          flex-direction: row-reverse;
        }
      `}</style>
    </div>
  )
}
