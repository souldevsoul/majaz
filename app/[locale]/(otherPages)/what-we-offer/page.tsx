'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { packages } from '@/data/packages'
import GlassCard from '@/components/majaz/GlassCard'

export default function WhatWeOfferPage() {
  const locale = useLocale()
  const isArabic = locale === 'ar'

  const individualServices = packages.filter(pkg =>
    ['basic', 'standard', 'premium'].includes(pkg.tier)
  )

  const conciergeServices = packages.filter(pkg =>
    ['gold', 'platinum', 'diamond'].includes(pkg.tier)
  )

  return (
    <div className="what-we-offer-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <h1 className="hero-title">
            {isArabic ? 'ماذا نقدم' : 'What We Offer'}
          </h1>
          <p className="hero-subtitle">
            {isArabic
              ? 'من الفحص الفردي إلى الكونسيرج الكامل، خدمات السيارات الفاخرة المصممة لك'
              : 'From individual inspections to full concierge, luxury automotive services tailored for you'}
          </p>
        </div>
      </section>

      {/* Individual Services */}
      <section className="services-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">
              {isArabic ? 'خدمات الفحص' : 'Inspection Services'}
            </h2>
            <p className="section-description">
              {isArabic
                ? 'تقييم احترافي قبل الشراء لأي مركبة في الإمارات'
                : 'Professional pre-purchase assessment for any vehicle in UAE'}
            </p>
          </div>

          <div className="services-grid">
            {individualServices.map((pkg) => (
              <GlassCard key={pkg.id} className="service-card">
                {pkg.imagePath && (
                  <div className="service-image">
                    <Image
                      src={pkg.imagePath}
                      alt={isArabic ? pkg.nameAr : pkg.name}
                      width={600}
                      height={400}
                      className="image"
                    />
                  </div>
                )}

                <div className="service-content">
                  <h3 className="service-name">
                    {isArabic ? pkg.nameAr : pkg.name}
                  </h3>
                  <p className="service-description">
                    {isArabic ? pkg.descriptionAr : pkg.description}
                  </p>

                  <div className="service-price">
                    <span className="price-label">
                      {isArabic ? 'يبدأ من' : 'Starting at'}
                    </span>
                    <span className="price-amount">
                      {pkg.price.monthly} {pkg.currency}
                    </span>
                  </div>

                  <ul className="service-features">
                    {(isArabic ? pkg.featuresAr : pkg.features).slice(0, 3).map((feature, idx) => (
                      <li key={idx}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Concierge Memberships */}
      <section className="memberships-section">
        <div className="section-container">
          <div className="section-header">
            <div className="exclusive-badge">
              {isArabic ? 'حصري' : 'EXCLUSIVE'}
            </div>
            <h2 className="section-title gold">
              {isArabic ? 'عضويات الكونسيرج' : 'Concierge Memberships'}
            </h2>
            <p className="section-description">
              {isArabic
                ? 'امتياز الأميكس بلاك كارد لملكية السيارات - خدمة كاملة لجامعي السيارات الفاخرة'
                : 'The Amex Black Card of car ownership - full white-glove service for luxury collectors'}
            </p>
          </div>

          <div className="memberships-grid">
            {conciergeServices.map((pkg) => (
              <GlassCard key={pkg.id} className={`membership-card ${pkg.tier}`}>
                {pkg.imagePath && (
                  <div className="membership-image">
                    <Image
                      src={pkg.imagePath}
                      alt={isArabic ? pkg.nameAr : pkg.name}
                      width={800}
                      height={533}
                      className="image"
                    />
                    <div className="image-overlay" />
                  </div>
                )}

                <div className="membership-content">
                  {pkg.badge && (
                    <div className="membership-badge">
                      {isArabic ? pkg.badgeAr : pkg.badge}
                    </div>
                  )}

                  <h3 className="membership-name">
                    {isArabic ? pkg.nameAr : pkg.name}
                  </h3>

                  <div className="membership-price">
                    {pkg.price.annual === 0 ? (
                      <span className="price-contact">
                        {isArabic ? 'اتصل بنا' : 'Contact Us'}
                      </span>
                    ) : (
                      <>
                        <span className="price-amount">
                          {pkg.price.annual.toLocaleString()} {pkg.currency}
                        </span>
                        <span className="price-period">
                          {isArabic ? '/سنة' : '/year'}
                        </span>
                      </>
                    )}
                  </div>

                  <p className="membership-description">
                    {isArabic ? pkg.descriptionAr : pkg.description}
                  </p>

                  <ul className="membership-features">
                    {(isArabic ? pkg.featuresAr : pkg.features).slice(0, 5).map((feature, idx) => (
                      <li key={idx}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5"/>
                          <path d="M6 9l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* AI Interview CTA */}
      <section className="cta-section">
        <div className="section-container">
          <GlassCard className="cta-card">
            <div className="cta-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                <rect x="9" y="2" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="2"/>
                <path d="M5 10v1a7 7 0 0014 0v-1M12 18v4m-4 0h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>

            <h2 className="cta-title">
              {isArabic ? 'ابدأ رحلتك مع مجاز' : 'Begin Your MAJAZ Journey'}
            </h2>

            <p className="cta-description">
              {isArabic
                ? 'تحدث مع وكيلنا الذكي المتطور للحصول على توصية مخصصة بناءً على احتياجاتك'
                : 'Speak with our sophisticated AI advisor for a personalized recommendation based on your needs'}
            </p>

            <Link href={`/${locale}/interview`} className="cta-button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="9" y="2" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="2"/>
                <path d="M5 10v1a7 7 0 0014 0v-1M12 18v4m-4 0h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>{isArabic ? 'ابدأ المحادثة الصوتية' : 'Start Voice Conversation'}</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 14l5-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </Link>

            <p className="cta-note">
              {isArabic
                ? 'محادثة آمنة ومشفرة • دعم اللغة العربية والإنجليزية'
                : 'Secure & private conversation • Arabic & English supported'}
            </p>
          </GlassCard>
        </div>
      </section>

      <style jsx>{`
        .what-we-offer-page {
          min-height: 100vh;
          background: linear-gradient(to bottom, #000000 0%, #0A0A0A 50%, #000000 100%);
        }

        /* Hero Section */
        .hero-section {
          padding: 140px 0 80px;
          text-align: center;
        }

        .hero-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: 4rem;
          font-weight: 200;
          color: #FFFFF0;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin: 0 0 1.5rem 0;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 240, 0.7);
          line-height: 1.6;
          margin: 0;
        }

        /* Services Section */
        .services-section {
          padding: 80px 0;
        }

        .section-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
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

        .section-title.gold {
          color: #D4AF37;
        }

        .section-description {
          font-size: 1.125rem;
          color: rgba(255, 255, 240, 0.6);
          margin: 0;
        }

        .exclusive-badge {
          display: inline-block;
          background: linear-gradient(135deg, #D4AF37 0%, #B8941E 100%);
          color: #111111;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 6px 18px;
          border-radius: 20px;
          margin-bottom: 1.5rem;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
        }

        .service-card {
          padding: 2rem;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 48px rgba(212, 175, 55, 0.2);
        }

        .service-image {
          position: relative;
          width: calc(100% + 4rem);
          height: 500px;
          margin: -2rem -2rem 2rem -2rem;
          border-radius: 16px 16px 0 0;
          overflow: hidden;
        }

        .service-image .image {
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .service-card:hover .service-image .image {
          transform: scale(1.1);
        }

        .service-content {
          padding: 2rem 1.75rem;
        }

        .service-name {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 600;
          color: #D4AF37;
          margin: 0 0 0.75rem 0;
        }

        .service-description {
          color: rgba(255, 255, 240, 0.7);
          font-size: 0.9375rem;
          margin: 0 0 1.5rem 0;
          line-height: 1.6;
        }

        .service-price {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding: 1.25rem 0;
          border-top: 1px solid rgba(212, 175, 55, 0.15);
          border-bottom: 1px solid rgba(212, 175, 55, 0.15);
          margin-bottom: 1.5rem;
        }

        .price-label {
          font-size: 0.875rem;
          color: rgba(255, 255, 240, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .price-amount {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 600;
          color: #D4AF37;
        }

        .service-features {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .service-features li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: rgba(255, 255, 240, 0.85);
          font-size: 0.9375rem;
        }

        .service-features svg {
          color: #D4AF37;
          flex-shrink: 0;
        }

        /* Memberships Section */
        .memberships-section {
          padding: 80px 0;
          background: radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.08) 0%, transparent 70%);
        }

        .memberships-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
          gap: 2.5rem;
        }

        .membership-card {
          padding: 2rem;
          overflow: hidden;
          transition: all 0.4s ease;
        }

        .membership-card:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 24px 60px rgba(212, 175, 55, 0.25);
        }

        .membership-card.platinum {
          border: 2px solid rgba(212, 175, 55, 0.4);
        }

        .membership-image {
          position: relative;
          width: calc(100% + 4rem);
          height: 600px;
          margin: -2rem -2rem 2rem -2rem;
          border-radius: 16px 16px 0 0;
          overflow: hidden;
        }

        .membership-image .image {
          object-fit: cover;
          transition: transform 0.8s ease;
        }

        .membership-card:hover .membership-image .image {
          transform: scale(1.15);
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 0%, rgba(10, 10, 10, 0.9) 100%);
        }

        .membership-content {
          padding: 2.5rem 2rem;
        }

        .membership-badge {
          display: inline-block;
          background: linear-gradient(135deg, #D4AF37 0%, #B8941E 100%);
          color: #111111;
          font-size: 0.625rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 4px 12px;
          border-radius: 12px;
          margin-bottom: 1rem;
        }

        .membership-name {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 600;
          color: #D4AF37;
          margin: 0 0 1.5rem 0;
          letter-spacing: 0.02em;
        }

        .membership-price {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .price-amount {
          font-family: var(--font-display);
          font-size: 2.5rem;
          font-weight: 600;
          color: #D4AF37;
          line-height: 1;
        }

        .price-period,
        .price-contact {
          font-size: 1rem;
          color: rgba(255, 255, 240, 0.7);
        }

        .membership-description {
          color: rgba(255, 255, 240, 0.8);
          font-size: 1rem;
          line-height: 1.6;
          margin: 0 0 2rem 0;
        }

        .membership-features {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .membership-features li {
          display: flex;
          align-items: flex-start;
          gap: 0.875rem;
          color: rgba(255, 255, 240, 0.9);
          font-size: 0.9375rem;
          line-height: 1.5;
        }

        .membership-features svg {
          color: #D4AF37;
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* CTA Section */
        .cta-section {
          padding: 100px 0;
        }

        .cta-card {
          max-width: 800px;
          margin: 0 auto;
          padding: 4rem 3rem;
          text-align: center;
        }

        .cta-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100px;
          height: 100px;
          background: rgba(212, 175, 55, 0.1);
          border: 2px solid rgba(212, 175, 55, 0.3);
          border-radius: 50%;
          color: #D4AF37;
          margin-bottom: 2rem;
        }

        .cta-title {
          font-family: var(--font-display);
          font-size: 2.5rem;
          font-weight: 300;
          color: #FFFFF0;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0 0 1.5rem 0;
        }

        .cta-description {
          font-size: 1.25rem;
          color: rgba(255, 255, 240, 0.8);
          line-height: 1.6;
          margin: 0 0 3rem 0;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem 3rem;
          background: linear-gradient(135deg, #D4AF37 0%, #B8941E 100%);
          color: #111111;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.125rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-radius: 16px;
          transition: all 0.4s ease;
          box-shadow: 0 8px 24px rgba(212, 175, 55, 0.4);
        }

        .cta-button:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(212, 175, 55, 0.5);
        }

        .cta-note {
          margin-top: 2rem;
          font-size: 0.875rem;
          color: rgba(255, 255, 240, 0.6);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .services-grid,
          .memberships-grid {
            grid-template-columns: 1fr;
          }

          .service-image,
          .membership-image {
            width: calc(100% + 2rem);
            height: 300px;
            margin: -1rem -1rem 1.5rem -1rem;
          }

          .service-card,
          .membership-card {
            padding: 1rem;
          }

          .cta-card {
            padding: 3rem 2rem;
          }

          .cta-title {
            font-size: 1.75rem;
          }
        }

        /* RTL Support */
        [dir="rtl"] .what-we-offer-page {
          direction: rtl;
        }
      `}</style>
    </div>
  )
}
