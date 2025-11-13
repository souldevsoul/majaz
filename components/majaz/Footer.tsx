'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import LanguageToggle from './LanguageToggle'

export default function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('navigation')
  const locale = useLocale()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const currentYear = new Date().getFullYear()

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      // Simulate API call - replace with actual newsletter subscription
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitMessage(t('newsletter.subscribe'))
      setEmail('')
    } catch (error) {
      setSubmitMessage('Error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const aboutLinks = [
    { href: `/${locale}/about`, label: tNav('about') },
    { href: `/${locale}/team`, label: tNav('team') },
    { href: `/${locale}/partners`, label: tNav('partners') },
  ]

  const quickLinks = [
    { href: `/${locale}/pricing`, label: tNav('pricing') },
    { href: `/${locale}/how-it-works`, label: tNav('howItWorks') },
    { href: `/${locale}/faq`, label: tNav('faq') },
    { href: `/${locale}/contact`, label: tNav('contact') },
  ]

  const serviceLinks = [
    { href: `/${locale}/services/remote-assessment`, label: 'Remote Assessment' },
    { href: `/${locale}/services/onsite-inspection`, label: 'On-Site Inspection' },
    { href: `/${locale}/services/vehicle-sourcing`, label: 'Vehicle Sourcing' },
    { href: `/${locale}/services/delegated-bidding`, label: 'Delegated Bidding' },
  ]

  const legalLinks = [
    { href: `/${locale}/terms`, label: tNav('terms') },
    { href: `/${locale}/privacy`, label: tNav('privacy') },
  ]

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://instagram.com/MAJAZuae',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799 15.2063 14.5458 14.5931 15.1514 13.8416 15.5297 13.0901 15.9079 12.2384 16.0396 11.4078 15.9059 10.5771 15.7723 9.80976 15.3801 9.21484 14.7852 8.61992 14.1902 8.22773 13.4229 8.09407 12.5922 7.9604 11.7615 8.09207 10.9099 8.47033 10.1584 8.84859 9.40685 9.45419 8.79374 10.201 8.40624 10.9478 8.01874 11.7978 7.87658 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.1283 15.4785 9.73515 15.8741 10.5211 16 11.37Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/majaz',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23 3.00005C22.0424 3.67552 20.9821 4.19216 19.86 4.53005C19.2577 3.83756 18.4573 3.34674 17.567 3.12397 16.6767 2.90121 15.7395 2.95724 14.8821 3.28445 14.0247 3.61166 13.2884 4.19445 12.773 4.95376 12.2575 5.71308 11.9877 6.61238 12 7.53005V8.53005C10.2426 8.57561 8.50127 8.18586 6.93101 7.39549 5.36074 6.60513 4.01032 5.43868 3 4.00005C3 4.00005 -1 13 8 17C5.94053 18.398 3.48716 19.099 1 19C10 24 21 19 21 7.50005C20.9991 7.2215 20.9723 6.94364 20.92 6.67005C21.9406 5.66354 22.6608 4.39276 23 3.00005V3.00005Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/MAJAZ-uae',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736 21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858 17.0391 12.2107 16.5304 12 16 12 15.4696 12 14.9609 12.2107 14.5858 12.5858 14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736 12.8826 8.63214 14.4087 8 16 8V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 6C5.10457 6 6 5.10457 6 4 6 2.89543 5.10457 2 4 2 2.89543 2 2 2.89543 2 4 2 5.10457 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/971XXXXXXXX',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382C17.015 14.154 14.774 13.057 14.369 12.906 13.964 12.754 13.677 12.679 13.391 13.136 13.105 13.593 12.237 14.631 11.981 14.918 11.726 15.204 11.47 15.238 11.013 15.01 10.556 14.782 9.06898 14.298 7.30998 12.732 5.93498 11.51 5.00598 10.002 4.74998 9.545 4.49398 9.088 4.72198 8.851 4.94998 8.624 5.15198 8.413 5.30498 8.237 5.45698 8.061 5.56998 7.868 5.62598 7.775 5.68198 7.682 5.68198 7.537 5.62598 7.392 5.00598 5.149 4.85398 4.692 4.70198 4.235 4.54998 4.287 4.26198 4.261 3.97398 4.235 3.68698 4.235 3.39998 4.235 2.64998 4.474 2.09898 4.909 1.54798 5.344 1.01298 6.083 1.01298 7.561 1.01298 9.039 2.14698 10.466 2.30498 10.752 2.46198 11.039 5.03198 14.877 8.99998 16.177 9.95298 16.556 10.728 16.782 11.349 16.953 11.865 17.096 12.329 17.045 12.691 16.994 13.053 16.944 13.623 16.638 13.959 16.231 14.294 15.824 14.363 15.528 14.471 15.283 14.578 15.037 14.937 14.611 15.394 14.382 15.851 14.154 16.308 14.154 16.765 14.382 17.223 14.61 17.929 14.61 18.436 14.61 18.943 14.61 19.245 14.449 19.472 14.382Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 2C6.48 2 2 6.48 2 12C2 13.89 2.525 15.66 3.44 17.17L2 22L7.01 20.59C8.45 21.41 10.16 21.89 12 21.89C17.52 21.89 22 17.41 22 11.89C22 6.37 17.52 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ]

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top Section */}
        <div className="footer-grid">
          {/* About Column */}
          <div className="footer-column">
            <div className="footer-brand">
              <span className="brand-text">MAJAZ</span>
              <span className="brand-arabic">مجاز</span>
            </div>
            <p className="footer-description">{t('description')}</p>
            <div className="footer-social">
              <span className="social-title">{t('social')}</span>
              <div className="social-links">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-column">
            <h3 className="footer-title">{t('quickLinks')}</h3>
            <ul className="footer-links">
              {[...aboutLinks, ...quickLinks].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="footer-column">
            <h3 className="footer-title">{t('services')}</h3>
            <ul className="footer-links">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="footer-column">
            <h3 className="footer-title">{t('newsletter.title')}</h3>
            <p className="newsletter-subtitle">{t('newsletter.subtitle')}</p>
            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('newsletter.placeholder')}
                required
                className="newsletter-input"
                disabled={isSubmitting}
              />
              <button
                type="submit"
                className="newsletter-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? '...' : t('newsletter.subscribe')}
              </button>
            </form>
            {submitMessage && (
              <p className="newsletter-message">{submitMessage}</p>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              {t('copyright', { year: currentYear })}
            </p>
            <div className="footer-badge">
              <span className="badge-icon">🇦🇪</span>
              <span className="badge-text">{t('madeIn')}</span>
            </div>
            <div className="footer-legal">
              {legalLinks.map((link, index) => (
                <span key={link.href}>
                  <Link href={link.href} className="legal-link">
                    {link.label}
                  </Link>
                  {index < legalLinks.length - 1 && <span className="legal-divider">•</span>}
                </span>
              ))}
            </div>
            <div className="footer-language">
              <LanguageToggle />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: var(--majaz-rich-black);
          border-top: 1px solid var(--majaz-border-light);
          padding: 4rem 0 2rem;
        }

        .footer-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .footer-column {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          margin-bottom: 0.5rem;
        }

        .brand-text {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 700;
          color: var(--gold);
          letter-spacing: 0.05em;
        }

        .brand-arabic {
          font-family: var(--font-arabic);
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--majaz-text-muted);
        }

        .footer-description {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9375rem;
          line-height: 1.6;
          margin: 0;
        }

        .footer-social {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .social-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--gold);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .social-links {
          display: flex;
          gap: 0.75rem;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid var(--majaz-border);
          border-radius: var(--radius-md);
          color: var(--gold);
          transition: all var(--transition-base);
        }

        .social-link:hover {
          background: var(--gold);
          color: var(--majaz-black);
          border-color: var(--gold);
          transform: translateY(-4px);
          box-shadow: var(--majaz-shadow-gold);
        }

        .footer-title {
          font-family: var(--font-display);
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--gold);
          margin: 0;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
        }

        .footer-link {
          color: rgba(255, 255, 255, 0.65);
          text-decoration: none;
          font-size: 0.9375rem;
          transition: all var(--transition-fast);
          display: inline-block;
        }

        .footer-link:hover {
          color: var(--gold);
          transform: translateX(4px);
        }

        .newsletter-subtitle {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          margin: 0;
        }

        .newsletter-form {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .newsletter-input {
          padding: 0.75rem 1rem;
          background: rgba(26, 26, 26, 0.6);
          border: 1px solid var(--majaz-border);
          border-radius: var(--radius-md);
          color: var(--majaz-text-primary);
          font-size: 0.9375rem;
          transition: all var(--transition-base);
        }

        .newsletter-input:focus {
          outline: none;
          border-color: var(--gold);
          background: rgba(26, 26, 26, 0.8);
        }

        .newsletter-input::placeholder {
          color: var(--majaz-text-muted);
        }

        .newsletter-button {
          padding: 0.75rem 1.5rem;
          background: var(--majaz-gradient-gold);
          color: var(--majaz-black);
          border: none;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.9375rem;
          cursor: pointer;
          transition: all var(--transition-base);
        }

        .newsletter-button:hover:not(:disabled) {
          box-shadow: var(--majaz-shadow-gold);
          transform: translateY(-2px);
        }

        .newsletter-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .newsletter-message {
          font-size: 0.875rem;
          color: var(--gold);
          margin: 0;
        }

        .footer-bottom {
          border-top: 1px solid var(--majaz-border-light);
          padding-top: 2rem;
        }

        .footer-bottom-content {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
        }

        .footer-copyright {
          color: var(--gold);
          font-size: 0.875rem;
          margin: 0;
          font-weight: 500;
        }

        .footer-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid var(--majaz-border);
          border-radius: var(--radius-full);
        }

        .badge-icon {
          font-size: 1.125rem;
        }

        .badge-text {
          color: var(--gold);
          font-size: 0.875rem;
          font-weight: 600;
        }

        .footer-legal {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .legal-link {
          color: rgba(255, 255, 255, 0.65);
          text-decoration: none;
          font-size: 0.875rem;
          transition: color var(--transition-fast);
        }

        .legal-link:hover {
          color: var(--gold);
        }

        .legal-divider {
          color: var(--majaz-border);
        }

        .footer-language {
          display: flex;
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .footer {
            padding: 3rem 0 1.5rem;
          }

          .footer-container {
            padding: 0 1rem;
          }

          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
            margin-bottom: 2rem;
          }

          .footer-bottom-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .footer-badge {
            order: -1;
          }
        }

        /* RTL Support */
        [dir="rtl"] .footer-link:hover {
          transform: translateX(-4px);
        }

        [dir="rtl"] .footer-bottom-content {
          direction: rtl;
        }

        [dir="rtl"] .footer-legal {
          flex-direction: row-reverse;
        }
      `}</style>
    </footer>
  )
}
