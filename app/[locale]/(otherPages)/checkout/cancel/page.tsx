'use client'

import { useLocale } from 'next-intl'
import GlassCard from '@/components/majaz/GlassCard'
import Link from 'next/link'

export default function CheckoutCancelPage() {
  const locale = useLocale()
  const isArabic = locale === 'ar'

  return (
    <div className="cancel-page">
      <div className="cancel-container">
        <GlassCard className="cancel-card">
          <div className="cancel-content">
            {/* Cancel Icon */}
            <div className="cancel-icon">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="38" stroke="rgba(255, 255, 240, 0.3)" strokeWidth="3" />
                <path d="M30 30l20 20M50 30L30 50" stroke="rgba(255, 255, 240, 0.5)" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>

            {/* Cancel Message */}
            <h1 className="cancel-title">
              {isArabic ? 'تم إلغاء الدفع' : 'Payment Cancelled'}
            </h1>

            <p className="cancel-message">
              {isArabic
                ? 'لم يتم إكمال عملية الدفع. لم يتم خصم أي رسوم من بطاقتك.'
                : 'Your payment was not completed. No charges have been made to your card.'}
            </p>

            {/* Information Box */}
            <div className="info-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <p>
                {isArabic
                  ? 'إذا واجهت أي مشاكل أو كانت لديك أسئلة، فلا تتردد في الاتصال بفريق الدعم لدينا.'
                  : 'If you experienced any issues or have questions, please feel free to contact our support team.'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <Link href={`/${locale}/packages`} className="primary-button">
                {isArabic ? 'عرض الباقات' : 'View Packages'}
              </Link>
              <Link href={`/${locale}/contact`} className="secondary-button">
                {isArabic ? 'اتصل بالدعم' : 'Contact Support'}
              </Link>
            </div>

            {/* Alternative Options */}
            <div className="alternative-options">
              <h3 className="options-title">
                {isArabic ? 'هل تحتاج إلى مساعدة؟' : 'Need Help?'}
              </h3>
              <div className="options-grid">
                <Link href={`/${locale}/faq`} className="option-card">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <div>
                    <h4>{isArabic ? 'الأسئلة الشائعة' : 'FAQ'}</h4>
                    <p>{isArabic ? 'ابحث عن إجابات للأسئلة الشائعة' : 'Find answers to common questions'}</p>
                  </div>
                </Link>

                <Link href={`/${locale}/interview`} className="option-card">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div>
                    <h4>{isArabic ? 'وكيل الذكاء الاصطناعي' : 'AI Agent'}</h4>
                    <p>{isArabic ? 'احصل على توصيات مخصصة' : 'Get personalized recommendations'}</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      <style jsx>{`
        .cancel-page {
          min-height: 100vh;
          background: linear-gradient(to bottom, #000000 0%, #0A0A0A 50%, #000000 100%);
          padding: 140px 2rem 80px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cancel-container {
          max-width: 700px;
          width: 100%;
          margin: 0 auto;
        }

        .cancel-card {
          padding: 4rem 3rem;
          text-align: center;
        }

        .cancel-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .cancel-icon {
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .cancel-title {
          font-family: var(--font-display);
          font-size: 2.5rem;
          font-weight: 300;
          color: #FFFFF0;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0;
        }

        .cancel-message {
          font-size: 1.125rem;
          color: rgba(255, 255, 240, 0.7);
          line-height: 1.6;
          max-width: 500px;
          margin: 0;
        }

        .info-box {
          width: 100%;
          padding: 1.5rem;
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 12px;
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          text-align: left;
        }

        .info-box svg {
          flex-shrink: 0;
          color: #D4AF37;
          margin-top: 2px;
        }

        .info-box p {
          margin: 0;
          color: rgba(255, 255, 240, 0.8);
          font-size: 0.9375rem;
          line-height: 1.6;
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

        .alternative-options {
          width: 100%;
          margin-top: 1rem;
        }

        .options-title {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 600;
          color: #FFFFF0;
          margin: 0 0 1.5rem 0;
        }

        .options-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .option-card {
          display: flex;
          gap: 1rem;
          padding: 1.5rem;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(212, 175, 55, 0.1);
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.3s ease;
          text-align: left;
        }

        .option-card:hover {
          border-color: rgba(212, 175, 55, 0.3);
          background: rgba(0, 0, 0, 0.5);
          transform: translateY(-2px);
        }

        .option-card svg {
          flex-shrink: 0;
          color: #D4AF37;
        }

        .option-card h4 {
          font-size: 1rem;
          font-weight: 600;
          color: #FFFFF0;
          margin: 0 0 0.25rem 0;
        }

        .option-card p {
          font-size: 0.875rem;
          color: rgba(255, 255, 240, 0.6);
          margin: 0;
          line-height: 1.4;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .cancel-page {
            padding: 100px 1rem 40px;
          }

          .cancel-card {
            padding: 2.5rem 1.5rem;
          }

          .cancel-title {
            font-size: 1.75rem;
          }

          .action-buttons {
            flex-direction: column;
          }

          .options-grid {
            grid-template-columns: 1fr;
          }

          .info-box {
            text-align: center;
            flex-direction: column;
            align-items: center;
          }
        }

        /* RTL Support */
        [dir="rtl"] .info-box {
          text-align: right;
        }

        [dir="rtl"] .option-card {
          flex-direction: row-reverse;
          text-align: right;
        }
      `}</style>
    </div>
  )
}
