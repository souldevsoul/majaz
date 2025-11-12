'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import PackageCard from '@/components/packages/PackageCard'
import DurationToggle from '@/components/packages/DurationToggle'
import { packages } from '@/data/packages'

export default function PackagesPage() {
  const locale = useLocale()
  const [duration, setDuration] = useState<'monthly' | 'quarterly' | 'annual'>('annual')
  const isArabic = locale === 'ar'

  // Separate packages by category
  const assessmentPackages = packages.filter(pkg =>
    ['basic', 'standard', 'premium'].includes(pkg.tier)
  )

  const conciergeMemberships = packages.filter(pkg =>
    ['gold', 'platinum', 'diamond'].includes(pkg.tier)
  )

  return (
    <div className="packages-page">
      {/* Hero Section */}
      <section className="packages-hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              {isArabic ? 'اختر تجربتك مع مجاز' : 'Choose Your MAJAZ Experience'}
            </h1>
            <p className="hero-subtitle">
              {isArabic
                ? 'من الفحص الفردي إلى الخدمة الحصرية للكونسيرج، لدينا الباقة المثالية لاحتياجاتك'
                : 'From individual inspections to exclusive concierge service, we have the perfect package for your needs'}
            </p>
          </div>

          {/* Duration Toggle */}
          <DurationToggle value={duration} onChange={setDuration} locale={locale} />
        </div>
      </section>

      {/* Premium Assessment Services */}
      <section className="packages-section">
        <div className="packages-container">
          <div className="section-header">
            <h2 className="section-title">
              {isArabic ? 'خدمات التقييم الفاخرة' : 'Premium Assessment Services'}
            </h2>
            <p className="section-description">
              {isArabic
                ? 'تقييم احترافي مصمم لقرارات الاستثمار الواعية'
                : 'Professional assessment tailored for informed investment decisions'}
            </p>
          </div>

          <div className="packages-grid">
            {assessmentPackages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                package={pkg}
                duration={duration}
                locale={locale}
                featured={pkg.popular}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Concierge Memberships */}
      <section className="packages-section memberships">
        <div className="packages-container">
          <div className="section-header">
            <div className="header-badge">
              {isArabic ? 'حصري للغاية' : 'ULTRA EXCLUSIVE'}
            </div>
            <h2 className="section-title">
              {isArabic ? 'عضويات الكونسيرج الخاصة' : 'Private Concierge Memberships'}
            </h2>
            <p className="section-description">
              {isArabic
                ? 'خدمة كونسيرج شاملة مع وصول غير محدود وامتيازات عالمية'
                : 'Comprehensive concierge service with unlimited access and global privileges'}
            </p>
          </div>

          <div className="packages-grid memberships-grid">
            {conciergeMemberships.map((pkg) => (
              <PackageCard
                key={pkg.id}
                package={pkg}
                duration={duration}
                locale={locale}
                featured={pkg.tier === 'platinum'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="comparison-section">
        <div className="packages-container">
          <div className="section-header">
            <h2 className="section-title">
              {isArabic ? 'قارن الباقات' : 'Compare Packages'}
            </h2>
            <p className="section-description">
              {isArabic
                ? 'ابحث عن الباقة المثالية لاحتياجاتك'
                : 'Find the perfect package for your needs'}
            </p>
          </div>

          <div className="comparison-note">
            <p>
              {isArabic
                ? 'للحصول على مقارنة مفصلة للميزات أو لمناقشة احتياجاتك، اتصل بفريقنا'
                : 'For a detailed feature comparison or to discuss your needs, contact our team'}
            </p>
            <a href={`/${locale}/contact`} className="comparison-cta">
              {isArabic ? 'اتصل بنا' : 'Contact Us'}
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="packages-container">
          <div className="section-header">
            <h2 className="section-title">
              {isArabic ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
            </h2>
          </div>

          <div className="faq-grid">
            <div className="faq-card">
              <h3 className="faq-question">
                {isArabic ? 'ما هو الفرق بين التقييم عن بعد والفحص الميداني؟' : 'What\'s the difference between Remote Assessment and On-Site Inspection?'}
              </h3>
              <p className="faq-answer">
                {isArabic
                  ? 'التقييم عن بعد يقوم بتحليل قوائم المركبات عبر الإنترنت ومقارنات السوق. الفحص الميداني يتضمن فحصًا فعليًا بواسطة مفتش محترف في موقع المركبة.'
                  : 'Remote Assessment analyzes online vehicle listings and market comparisons. On-Site Inspection involves physical examination by a professional inspector at the vehicle location.'}
              </p>
            </div>

            <div className="faq-card">
              <h3 className="faq-question">
                {isArabic ? 'كيف تعمل عضوية الكونسيرج؟' : 'How does Concierge Membership work?'}
              </h3>
              <p className="faq-answer">
                {isArabic
                  ? 'يتم تعيين مدير كونسيرج مخصص لك يتعامل مع جميع احتياجات المركبات الخاصة بك - من البحث والفحص إلى المفاوضة والشراء. لديك وصول غير محدود إلى فحوصاتنا والخدمات الحصرية.'
                  : 'You\'re assigned a dedicated concierge manager who handles all your vehicle needs - from sourcing and inspection to negotiation and purchase. You have unlimited access to our inspections and exclusive services.'}
              </p>
            </div>

            <div className="faq-card">
              <h3 className="faq-question">
                {isArabic ? 'هل يمكنني الترقية أو التخفيض في أي وقت؟' : 'Can I upgrade or downgrade anytime?'}
              </h3>
              <p className="faq-answer">
                {isArabic
                  ? 'نعم! يمكنك الترقية على الفور والحصول على الميزات الجديدة. التخفيضات تدخل حيز التنفيذ في بداية دورة الفوترة التالية.'
                  : 'Yes! You can upgrade immediately and get access to new features. Downgrades take effect at the start of your next billing cycle.'}
              </p>
            </div>

            <div className="faq-card">
              <h3 className="faq-question">
                {isArabic ? 'ماذا يتضمن الفحص المكون من 200+ نقطة؟' : 'What does the 200+ point inspection include?'}
              </h3>
              <p className="faq-answer">
                {isArabic
                  ? 'نقوم بفحص المحرك، ناقل الحركة، نظام التعليق، الفرامل، الإطارات، الأجزاء الداخلية، الإلكترونيات، وأكثر. ستحصل على تقرير تفصيلي مع الصور وتوصيات الخبراء.'
                  : 'We inspect engine, transmission, suspension, brakes, tires, interior, electronics, and more. You get a detailed report with photos and expert recommendations.'}
              </p>
            </div>
          </div>

          <div className="faq-cta">
            <p>{isArabic ? 'هل لديك المزيد من الأسئلة؟' : 'Have more questions?'}</p>
            <a href={`/${locale}/faq`} className="faq-link">
              {isArabic ? 'عرض جميع الأسئلة الشائعة' : 'View All FAQs'}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="packages-container">
          <div className="cta-card">
            <h2 className="cta-title">
              {isArabic ? 'غير متأكد من الباقة المناسبة؟' : 'Not Sure Which Package is Right?'}
            </h2>
            <p className="cta-description">
              {isArabic
                ? 'دع وكيلنا الذكي يساعدك في العثور على الباقة المثالية بناءً على احتياجاتك'
                : 'Let our AI agent help you find the perfect package based on your needs'}
            </p>
            <div className="cta-buttons">
              <a href={`/${locale}/interview`} className="cta-button primary">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2a6 6 0 016 6v3.586l1.707 1.707A1 1 0 0117 15H3a1 1 0 01-.707-1.707L4 11.586V8a6 6 0 016-6z" fill="currentColor" />
                  <path d="M8 17a2 2 0 104 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {isArabic ? 'ابدأ مقابلة الذكاء الاصطناعي' : 'Start AI Interview'}
              </a>
              <a href={`/${locale}/contact`} className="cta-button secondary">
                {isArabic ? 'تحدث إلى خبير' : 'Talk to an Expert'}
              </a>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .packages-page {
          min-height: 100vh;
          background: linear-gradient(to bottom, #000000 0%, #0A0A0A 50%, #000000 100%);
          padding-top: 120px;
        }

        /* Hero Section */
        .packages-hero {
          padding: 4rem 0 3rem;
          text-align: center;
        }

        .hero-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .hero-content {
          margin-bottom: 3rem;
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: 3.5rem;
          font-weight: 200;
          color: #FFFFF0;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin: 0 0 1.5rem 0;
          line-height: 1.2;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 240, 0.7);
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Packages Section */
        .packages-section {
          padding: 4rem 0;
        }

        .packages-section.memberships {
          background: radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.05) 0%, transparent 70%);
        }

        .packages-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .header-badge {
          display: inline-block;
          background: linear-gradient(135deg, #D4AF37 0%, #B8941E 100%);
          color: #111111;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 6px 16px;
          border-radius: 20px;
          margin-bottom: 1rem;
        }

        .section-title {
          font-family: var(--font-display);
          font-size: 2.5rem;
          font-weight: 300;
          color: #FFFFF0;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0 0 1rem 0;
        }

        .section-description {
          font-size: 1.125rem;
          color: rgba(255, 255, 240, 0.6);
          max-width: 600px;
          margin: 0 auto;
        }

        .packages-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .memberships-grid {
          grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
          gap: 2.5rem;
        }

        /* Comparison Section */
        .comparison-section {
          padding: 4rem 0;
          background: rgba(26, 26, 26, 0.3);
        }

        .comparison-note {
          text-align: center;
          background: rgba(26, 26, 26, 0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(212, 175, 55, 0.15);
          border-radius: 24px;
          padding: 3rem;
          margin-top: 2rem;
        }

        .comparison-note p {
          font-size: 1.125rem;
          color: rgba(255, 255, 240, 0.8);
          margin: 0 0 1.5rem 0;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .comparison-cta {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 14px 32px;
          background: linear-gradient(135deg, #D4AF37 0%, #B8941E 100%);
          color: #111111;
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-radius: 12px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(212, 175, 55, 0.3);
        }

        .comparison-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(212, 175, 55, 0.4);
        }

        /* FAQ Section */
        .faq-section {
          padding: 4rem 0;
        }

        .faq-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .faq-card {
          background: rgba(26, 26, 26, 0.4);
          border: 1px solid rgba(212, 175, 55, 0.1);
          border-radius: 16px;
          padding: 2rem;
          transition: all 0.3s ease;
        }

        .faq-card:hover {
          border-color: rgba(212, 175, 55, 0.3);
          background: rgba(26, 26, 26, 0.6);
        }

        .faq-question {
          font-family: var(--font-display);
          font-size: 1.125rem;
          font-weight: 600;
          color: #D4AF37;
          margin: 0 0 1rem 0;
          line-height: 1.4;
        }

        .faq-answer {
          font-size: 0.9375rem;
          color: rgba(255, 255, 240, 0.7);
          line-height: 1.6;
          margin: 0;
        }

        .faq-cta {
          text-align: center;
          margin-top: 3rem;
        }

        .faq-cta p {
          font-size: 1.125rem;
          color: rgba(255, 255, 240, 0.8);
          margin: 0 0 1rem 0;
        }

        .faq-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #D4AF37;
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .faq-link:hover {
          gap: 12px;
        }

        /* CTA Section */
        .cta-section {
          padding: 4rem 0 6rem;
        }

        .cta-card {
          text-align: center;
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(26, 26, 26, 0.8) 100%);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 32px;
          padding: 4rem 2rem;
        }

        .cta-title {
          font-family: var(--font-display);
          font-size: 2.5rem;
          font-weight: 300;
          color: #FFFFF0;
          margin: 0 0 1rem 0;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .cta-description {
          font-size: 1.25rem;
          color: rgba(255, 255, 240, 0.7);
          max-width: 600px;
          margin: 0 auto 2rem;
          line-height: 1.6;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 32px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .cta-button.primary {
          background: linear-gradient(135deg, #D4AF37 0%, #B8941E 100%);
          color: #111111;
          box-shadow: 0 4px 16px rgba(212, 175, 55, 0.3);
        }

        .cta-button.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(212, 175, 55, 0.4);
        }

        .cta-button.secondary {
          background: rgba(255, 255, 255, 0.05);
          color: #D4AF37;
          border: 1px solid rgba(212, 175, 55, 0.3);
        }

        .cta-button.secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(212, 175, 55, 0.5);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .packages-page {
            padding-top: 80px;
          }

          .hero-title {
            font-size: 2rem;
            letter-spacing: 0.1em;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .section-title {
            font-size: 1.75rem;
          }

          .packages-grid,
          .memberships-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .faq-grid {
            grid-template-columns: 1fr;
          }

          .cta-title {
            font-size: 1.75rem;
          }

          .cta-buttons {
            flex-direction: column;
          }

          .cta-button {
            width: 100%;
            justify-content: center;
          }
        }

        /* RTL Support */
        [dir="rtl"] .packages-page {
          direction: rtl;
        }

        [dir="rtl"] .faq-link svg {
          transform: rotate(180deg);
        }
      `}</style>
    </div>
  )
}
