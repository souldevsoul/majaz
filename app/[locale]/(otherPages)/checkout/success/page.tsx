'use client'

import { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'
import { useSearchParams, useRouter } from 'next/navigation'
import GlassCard from '@/components/majaz/GlassCard'
import Link from 'next/link'

export default function CheckoutSuccessPage() {
  const locale = useLocale()
  const searchParams = useSearchParams()
  const router = useRouter()
  const isArabic = locale === 'ar'

  const [isLoading, setIsLoading] = useState(true)
  const packageId = searchParams.get('packageId')
  const duration = searchParams.get('duration')

  useEffect(() => {
    // Simulate verification check
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="success-page">
      <div className="success-container">
        <GlassCard className="success-card">
          {isLoading ? (
            <div className="loading-state">
              <div className="spinner" />
              <h2>{isArabic ? 'جارٍ التحقق من الدفع...' : 'Verifying Payment...'}</h2>
            </div>
          ) : (
            <div className="success-content">
              {/* Success Icon */}
              <div className="success-icon">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <circle cx="40" cy="40" r="38" stroke="#D4AF37" strokeWidth="3" />
                  <path d="M25 40l10 10 20-25" stroke="#D4AF37" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Success Message */}
              <h1 className="success-title">
                {isArabic ? 'تم الدفع بنجاح!' : 'Payment Successful!'}
              </h1>

              <p className="success-message">
                {isArabic
                  ? 'شكراً لك على انضمامك إلى مجاز. تم استلام طلبك وسيتم معالجته قريباً.'
                  : 'Thank you for joining MAJAZ. Your order has been received and will be processed shortly.'}
              </p>

              {/* Next Steps */}
              <div className="next-steps">
                <h3 className="steps-title">
                  {isArabic ? 'الخطوات التالية:' : 'Next Steps:'}
                </h3>
                <ul className="steps-list">
                  <li>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M5 10l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>
                      {isArabic
                        ? 'ستتلقى بريداً إلكترونياً للتأكيد خلال بضع دقائق'
                        : 'You will receive a confirmation email within minutes'}
                    </span>
                  </li>
                  <li>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M5 10l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>
                      {isArabic
                        ? 'سيتصل بك مدير الكونسيرج الخاص بك خلال 24 ساعة'
                        : 'Your dedicated concierge manager will contact you within 24 hours'}
                    </span>
                  </li>
                  <li>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M5 10l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>
                      {isArabic
                        ? 'يمكنك الوصول إلى لوحة التحكم الخاصة بك الآن'
                        : 'You can access your dashboard now'}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <Link href={`/${locale}/dashboard`} className="primary-button">
                  {isArabic ? 'انتقل إلى لوحة التحكم' : 'Go to Dashboard'}
                </Link>
                <Link href={`/${locale}`} className="secondary-button">
                  {isArabic ? 'العودة إلى الصفحة الرئيسية' : 'Back to Home'}
                </Link>
              </div>

              {/* Support Note */}
              <div className="support-note">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M10 6v4M10 14h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span>
                  {isArabic ? 'هل تحتاج إلى مساعدة؟ ' : 'Need help? '}
                  <Link href={`/${locale}/contact`}>
                    {isArabic ? 'اتصل بنا' : 'Contact us'}
                  </Link>
                </span>
              </div>
            </div>
          )}
        </GlassCard>
      </div>

      <style jsx>{`
        .success-page {
          min-height: 100vh;
          background: linear-gradient(to bottom, #000000 0%, #0A0A0A 50%, #000000 100%);
          padding: 140px 2rem 80px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .success-container {
          max-width: 700px;
          width: 100%;
          margin: 0 auto;
        }

        .success-card {
          padding: 4rem 3rem;
          text-align: center;
        }

        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .spinner {
          width: 60px;
          height: 60px;
          border: 4px solid rgba(212, 175, 55, 0.2);
          border-top-color: #D4AF37;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .loading-state h2 {
          font-family: var(--font-display);
          color: #FFFFF0;
          font-size: 1.5rem;
          font-weight: 300;
          margin: 0;
        }

        .success-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .success-icon {
          animation: scaleIn 0.5s ease-out;
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .success-title {
          font-family: var(--font-display);
          font-size: 2.5rem;
          font-weight: 300;
          color: #FFFFF0;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0;
        }

        .success-message {
          font-size: 1.125rem;
          color: rgba(255, 255, 240, 0.7);
          line-height: 1.6;
          max-width: 500px;
          margin: 0;
        }

        .next-steps {
          width: 100%;
          padding: 2rem;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(212, 175, 55, 0.15);
          border-radius: 16px;
          text-align: left;
        }

        .steps-title {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 600;
          color: #D4AF37;
          margin: 0 0 1.5rem 0;
        }

        .steps-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .steps-list li {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          color: rgba(255, 255, 240, 0.85);
          font-size: 0.9375rem;
          line-height: 1.6;
        }

        .steps-list svg {
          flex-shrink: 0;
          color: #D4AF37;
          margin-top: 2px;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          width: 100%;
          max-width: 500px;
        }

        .primary-button,
        .secondary-button {
          flex: 1;
          padding: 1rem 2rem;
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-radius: 12px;
          transition: all 0.3s ease;
          text-align: center;
        }

        .primary-button {
          background: linear-gradient(135deg, #D4AF37 0%, #B8941E 100%);
          color: #111111;
          box-shadow: 0 4px 16px rgba(212, 175, 55, 0.3);
        }

        .primary-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(212, 175, 55, 0.4);
        }

        .secondary-button {
          background: rgba(255, 255, 255, 0.05);
          color: #D4AF37;
          border: 1px solid rgba(212, 175, 55, 0.3);
        }

        .secondary-button:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(212, 175, 55, 0.5);
        }

        .support-note {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9375rem;
          color: rgba(255, 255, 240, 0.6);
        }

        .support-note svg {
          color: #D4AF37;
        }

        .support-note a {
          color: #D4AF37;
          text-decoration: underline;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .success-page {
            padding: 100px 1rem 40px;
          }

          .success-card {
            padding: 2.5rem 1.5rem;
          }

          .success-title {
            font-size: 1.75rem;
          }

          .action-buttons {
            flex-direction: column;
          }

          .next-steps {
            text-align: center;
          }

          .steps-list {
            text-align: left;
          }
        }

        /* RTL Support */
        [dir="rtl"] .next-steps {
          text-align: right;
        }

        [dir="rtl"] .steps-list li {
          flex-direction: row-reverse;
        }
      `}</style>
    </div>
  )
}
