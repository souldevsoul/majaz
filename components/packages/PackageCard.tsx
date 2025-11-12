'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Package, packageTiers } from '@/data/packages'

interface PackageCardProps {
  package: Package
  duration: 'monthly' | 'quarterly' | 'annual'
  locale?: string
  featured?: boolean
}

export default function PackageCard({
  package: pkg,
  duration,
  locale = 'en',
  featured = false
}: PackageCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const isArabic = locale === 'ar'

  const price = pkg.price[duration]
  const tierInfo = packageTiers[pkg.tier]

  // Format price with currency
  const formatPrice = (amount: number) => {
    if (amount === 0) return isArabic ? 'اتصل بنا' : 'Contact Us'
    return `${amount.toLocaleString()} ${pkg.currency}`
  }

  // Get duration label
  const getDurationLabel = () => {
    const labels = {
      en: { monthly: '/month', quarterly: '/quarter', annual: '/year' },
      ar: { monthly: '/شهر', quarterly: '/ربع سنة', annual: '/سنة' }
    }
    return labels[isArabic ? 'ar' : 'en'][duration]
  }

  const features = isArabic ? pkg.featuresAr : pkg.features
  const name = isArabic ? pkg.nameAr : pkg.name
  const description = isArabic ? pkg.descriptionAr : pkg.description
  const badge = isArabic ? pkg.badgeAr : pkg.badge

  return (
    <div
      className={`package-card ${featured ? 'featured' : ''} ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge */}
      {(pkg.popular || badge) && (
        <div className="package-badge">
          {badge || (isArabic ? 'الأكثر شعبية' : 'MOST POPULAR')}
        </div>
      )}

      {/* Tier Indicator */}
      <div className="tier-indicator" style={{ borderColor: tierInfo.color }}>
        <div className="tier-dot" style={{ backgroundColor: tierInfo.color }} />
      </div>

      {/* Image */}
      {pkg.imagePath && (
        <div className="package-image">
          <Image
            src={pkg.imagePath}
            alt={name}
            width={1200}
            height={800}
            className="image"
            loading="lazy"
          />
          <div className="image-overlay" />
        </div>
      )}

      {/* Content */}
      <div className="package-content">
        {/* Header */}
        <div className="package-header">
          <div>
            <h3 className="package-name">{name}</h3>
            <p className="package-description">{description}</p>
          </div>
        </div>

        {/* Price */}
        <div className="package-price">
          <div className="price-main">
            {formatPrice(price)}
          </div>
          {price > 0 && (
            <div className="price-duration">{getDurationLabel()}</div>
          )}
        </div>

        {/* Features */}
        <ul className="package-features">
          {features.map((feature, index) => (
            <li key={index} className="feature-item">
              <svg className="feature-icon" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
                <path d="M6 10l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Link
          href={`/${locale}/checkout/${pkg.slug}?duration=${duration}`}
          className="package-cta"
        >
          <span>{isArabic ? 'اختر الباقة' : 'Choose Package'}</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      <style jsx>{`
        .package-card {
          position: relative;
          background: rgba(26, 26, 26, 0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(212, 175, 55, 0.15);
          border-radius: 24px;
          padding: 2rem;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .package-card:hover {
          transform: translateY(-8px);
          border-color: rgba(212, 175, 55, 0.4);
          box-shadow: 0 20px 60px rgba(212, 175, 55, 0.15),
                      0 0 80px rgba(212, 175, 55, 0.1);
        }

        .package-card.featured {
          border-width: 2px;
          border-color: rgba(212, 175, 55, 0.4);
          box-shadow: 0 12px 40px rgba(212, 175, 55, 0.1);
        }

        .package-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 10;
          background: linear-gradient(135deg, #D4AF37 0%, #B8941E 100%);
          color: #111111;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 6px 16px;
          border-radius: 20px;
          box-shadow: 0 4px 16px rgba(212, 175, 55, 0.3);
        }

        .tier-indicator {
          position: absolute;
          top: 24px;
          left: 24px;
          z-index: 10;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.6);
        }

        .tier-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .package-image {
          position: relative;
          width: calc(100% + 4rem);
          height: 550px;
          margin: -2rem -2rem 2rem -2rem;
          border-radius: 16px 16px 0 0;
          overflow: hidden;
        }

        .image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .package-card:hover .image {
          transform: scale(1.08);
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 0%, rgba(17, 17, 17, 0.9) 100%);
        }

        .package-content {
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .package-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .package-name {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 600;
          color: #FFFFF0;
          margin: 0 0 8px 0;
          letter-spacing: 0.02em;
        }

        .package-description {
          font-size: 0.9375rem;
          color: rgba(255, 255, 240, 0.7);
          margin: 0;
          line-height: 1.5;
        }

        .package-price {
          border-top: 1px solid rgba(212, 175, 55, 0.15);
          border-bottom: 1px solid rgba(212, 175, 55, 0.15);
          padding: 20px 0;
        }

        .price-main {
          font-family: var(--font-display);
          font-size: 2.5rem;
          font-weight: 600;
          color: #D4AF37;
          line-height: 1;
          margin-bottom: 4px;
        }

        .price-duration {
          font-size: 0.875rem;
          color: rgba(255, 255, 240, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .package-features {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 0.9375rem;
          color: rgba(255, 255, 240, 0.85);
          line-height: 1.6;
        }

        .feature-icon {
          flex-shrink: 0;
          width: 20px;
          height: 20px;
          color: #D4AF37;
          margin-top: 2px;
        }

        .package-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 100%;
          padding: 16px 32px;
          background: linear-gradient(135deg, #D4AF37 0%, #B8941E 100%);
          color: #111111;
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 16px rgba(212, 175, 55, 0.3);
        }

        .package-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(212, 175, 55, 0.4);
        }

        .package-cta svg {
          transition: transform 0.3s ease;
        }

        .package-cta:hover svg {
          transform: translateX(4px);
        }

        /* RTL Support */
        [dir="rtl"] .package-badge {
          right: auto;
          left: 20px;
        }

        [dir="rtl"] .tier-indicator {
          left: auto;
          right: 24px;
        }

        [dir="rtl"] .feature-item {
          flex-direction: row-reverse;
        }

        [dir="rtl"] .package-cta svg {
          transform: rotate(180deg);
        }

        [dir="rtl"] .package-cta:hover svg {
          transform: rotate(180deg) translateX(4px);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .package-card {
            padding: 1rem;
          }

          .package-image {
            width: calc(100% + 2rem);
            height: 320px;
            margin: -1rem -1rem 1.5rem -1rem;
          }

          .package-content {
            padding: 24px 20px;
            gap: 20px;
          }

          .package-name {
            font-size: 1.5rem;
          }

          .price-main {
            font-size: 2rem;
          }

          .package-badge {
            font-size: 0.625rem;
            padding: 4px 12px;
          }
        }
      `}</style>
    </div>
  )
}
