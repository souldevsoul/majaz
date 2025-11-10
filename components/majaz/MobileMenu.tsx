'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LanguageToggle from './LanguageToggle'
import CurrencySelector from './CurrencySelector'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  isAuthenticated?: boolean
}

export default function MobileMenu({ isOpen, onClose, isAuthenticated = false }: MobileMenuProps) {
  const t = useTranslations('navigation')
  const locale = useLocale()
  const pathname = usePathname()

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/pricing`, label: t('pricing') },
    { href: `/${locale}/how-it-works`, label: t('howItWorks') },
    { href: `/${locale}/team`, label: t('team') },
    { href: `/${locale}/faq`, label: t('faq') },
    { href: `/${locale}/contact`, label: t('contact') },
  ]

  const isActiveLink = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === `/${locale}` || pathname === `/${locale}/`
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`mobile-menu-backdrop ${isOpen ? 'visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <div className="mobile-menu-logo">
            <span className="logo-text">MAJAZ</span>
            <span className="logo-tagline">مجاز</span>
          </div>
          <button
            onClick={onClose}
            className="mobile-menu-close"
            aria-label="Close menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <nav className="mobile-menu-nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`mobile-menu-link ${isActiveLink(link.href) ? 'active' : ''}`}
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mobile-menu-actions">
          {isAuthenticated ? (
            <Link
              href={`/${locale}/dashboard`}
              className="btn-mobile-primary"
              onClick={onClose}
            >
              {t('dashboard')}
            </Link>
          ) : (
            <Link
              href={`/${locale}/login`}
              className="btn-mobile-primary"
              onClick={onClose}
            >
              {t('login')}
            </Link>
          )}
        </div>

        <div className="mobile-menu-footer">
          <div className="mobile-menu-controls">
            <LanguageToggle />
            <CurrencySelector />
          </div>
        </div>
      </div>

      <style jsx>{`
        .mobile-menu-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(10, 10, 10, 0.8);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          opacity: 0;
          visibility: hidden;
          transition: all var(--transition-base);
          z-index: var(--z-modal-backdrop);
        }

        .mobile-menu-backdrop.visible {
          opacity: 1;
          visibility: visible;
        }

        .mobile-menu {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 320px;
          max-width: 85vw;
          background: var(--majaz-glass-bg);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-left: 1px solid var(--majaz-glass-border);
          box-shadow: -8px 0 32px var(--majaz-glass-shadow);
          transform: translateX(100%);
          transition: transform var(--transition-base);
          z-index: var(--z-modal);
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }

        .mobile-menu.open {
          transform: translateX(0);
        }

        .mobile-menu-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem;
          border-bottom: 1px solid var(--majaz-border-light);
        }

        .mobile-menu-logo {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
        }

        .logo-text {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--majaz-gold);
          letter-spacing: 0.05em;
        }

        .logo-tagline {
          font-family: var(--font-arabic);
          font-size: 0.875rem;
          color: var(--majaz-text-muted);
        }

        .mobile-menu-close {
          background: transparent;
          border: none;
          color: var(--majaz-gold);
          cursor: pointer;
          padding: 0.5rem;
          transition: all var(--transition-fast);
          border-radius: var(--radius-md);
        }

        .mobile-menu-close:hover {
          background: rgba(212, 175, 55, 0.1);
          transform: rotate(90deg);
        }

        .mobile-menu-nav {
          flex: 1;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .mobile-menu-link {
          display: block;
          padding: 0.875rem 1rem;
          color: var(--majaz-text-primary);
          font-size: 1rem;
          font-weight: 500;
          text-decoration: none;
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
          border: 1px solid transparent;
        }

        .mobile-menu-link:hover {
          background: rgba(212, 175, 55, 0.1);
          border-color: var(--majaz-border-light);
          transform: translateX(-4px);
        }

        .mobile-menu-link.active {
          background: rgba(212, 175, 55, 0.15);
          border-color: var(--majaz-border);
          color: var(--majaz-gold);
        }

        .mobile-menu-actions {
          padding: 1rem 1.5rem;
          border-top: 1px solid var(--majaz-border-light);
        }

        .btn-mobile-primary {
          display: block;
          width: 100%;
          padding: 1rem;
          background: var(--majaz-gradient-gold);
          color: var(--majaz-black);
          text-align: center;
          font-weight: 600;
          font-size: 1rem;
          text-decoration: none;
          border-radius: var(--radius-md);
          transition: all var(--transition-base);
          box-shadow: var(--majaz-shadow-md);
        }

        .btn-mobile-primary:hover {
          box-shadow: var(--majaz-shadow-gold);
          transform: translateY(-2px);
        }

        .mobile-menu-footer {
          padding: 1rem 1.5rem 2rem;
          border-top: 1px solid var(--majaz-border-light);
        }

        .mobile-menu-controls {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .mobile-menu-controls > :global(*) {
          flex: 1;
          min-width: 120px;
        }

        /* RTL Support */
        [dir="rtl"] .mobile-menu {
          right: auto;
          left: 0;
          border-left: none;
          border-right: 1px solid var(--majaz-glass-border);
          box-shadow: 8px 0 32px var(--majaz-glass-shadow);
          transform: translateX(-100%);
        }

        [dir="rtl"] .mobile-menu.open {
          transform: translateX(0);
        }

        [dir="rtl"] .mobile-menu-link:hover {
          transform: translateX(4px);
        }

        @media (max-width: 360px) {
          .mobile-menu {
            width: 100vw;
            max-width: 100vw;
          }
        }
      `}</style>
    </>
  )
}
