'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LanguageToggle from './LanguageToggle'
import CurrencySelector from './CurrencySelector'
import MobileMenu from './MobileMenu'

interface HeaderProps {
  isAuthenticated?: boolean
}

export default function Header({ isAuthenticated = false }: HeaderProps) {
  const t = useTranslations('navigation')
  const locale = useLocale()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

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
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          {/* Logo */}
          <Link href={`/${locale}`} className="header-logo">
            <span className="logo-text">MAJAZ</span>
            <span className="logo-divider">|</span>
            <span className="logo-arabic">مجاز</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="header-nav">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${isActiveLink(link.href) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Controls */}
          <div className="header-controls">
            <LanguageToggle />
            <CurrencySelector />
            {isAuthenticated ? (
              <Link href={`/${locale}/dashboard`} className="btn-header-primary">
                {t('dashboard')}
              </Link>
            ) : (
              <Link href={`/${locale}/login`} className="btn-header-primary">
                {t('login')}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="mobile-menu-button"
            aria-label="Open menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 12H21M3 6H21M3 18H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isAuthenticated={isAuthenticated}
      />

      <style jsx>{`
        .header {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 999;
          background: transparent;
          transition: all var(--transition-base);
        }

        .header.scrolled {
          position: fixed;
          background: var(--majaz-glass-bg);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--majaz-glass-border);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        }

        .header-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1.25rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }

        .header-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          transition: all var(--transition-base);
        }

        .header-logo:hover {
          transform: translateY(-2px);
        }

        .logo-text {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--gold);
          letter-spacing: 0.05em;
        }

        .logo-divider {
          color: rgba(255, 255, 255, 0.5);
          font-weight: 300;
        }

        .header.scrolled .logo-divider {
          color: var(--majaz-border);
        }

        .logo-arabic {
          font-family: var(--font-arabic);
          font-size: 1.25rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.8);
        }

        .header.scrolled .logo-arabic {
          color: var(--majaz-text-muted);
        }

        .header-nav {
          display: none;
          align-items: center;
          gap: 0.5rem;
          flex: 1;
          justify-content: center;
        }

        .nav-link {
          padding: 0.625rem 1rem;
          color: #ffffff !important;
          text-decoration: none !important;
          font-size: 0.9375rem;
          font-weight: 600;
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
          position: relative;
          white-space: nowrap;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5),
                       0 0 20px rgba(255, 255, 255, 0.3);
        }

        .nav-link:hover {
          color: var(--gold) !important;
          background: rgba(212, 175, 55, 0.1);
          text-shadow: 0 0 15px rgba(212, 175, 55, 0.8),
                       0 0 30px rgba(212, 175, 55, 0.5);
        }

        .nav-link.active {
          color: var(--gold) !important;
          text-shadow: 0 0 15px rgba(212, 175, 55, 0.8),
                       0 0 30px rgba(212, 175, 55, 0.5);
        }

        .header.scrolled .nav-link {
          color: var(--majaz-text-primary) !important;
          text-shadow: none;
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0.25rem;
          left: 1rem;
          right: 1rem;
          height: 2px;
          background: var(--majaz-gradient-gold);
          border-radius: var(--radius-full);
        }

        .header-controls {
          display: none;
          align-items: center;
          gap: 1rem;
        }

        .btn-header-primary {
          padding: 0.625rem 1.5rem;
          background: var(--majaz-gradient-gold);
          color: var(--majaz-black);
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9375rem;
          border-radius: var(--radius-md);
          transition: all var(--transition-base);
          box-shadow: var(--majaz-shadow-sm);
          white-space: nowrap;
        }

        .btn-header-primary:hover {
          box-shadow: var(--majaz-shadow-gold);
          transform: translateY(-2px);
        }

        .mobile-menu-button {
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 1px solid var(--majaz-border);
          border-radius: var(--radius-md);
          color: var(--gold);
          cursor: pointer;
          padding: 0.5rem;
          transition: all var(--transition-fast);
        }

        .mobile-menu-button:hover {
          background: rgba(212, 175, 55, 0.1);
          border-color: var(--majaz-border-strong);
        }

        /* Desktop Breakpoint */
        @media (min-width: 1024px) {
          .header-nav {
            display: flex;
          }

          .header-controls {
            display: flex;
          }

          .mobile-menu-button {
            display: none;
          }
        }

        /* Tablet Breakpoint */
        @media (max-width: 1023px) and (min-width: 769px) {
          .header-container {
            padding: 1rem 1.5rem;
          }

          .logo-text {
            font-size: 1.5rem;
          }

          .logo-arabic {
            font-size: 1.125rem;
          }
        }

        /* Mobile Breakpoint */
        @media (max-width: 768px) {
          .header-container {
            padding: 1rem;
            gap: 1rem;
          }

          .logo-text {
            font-size: 1.5rem;
          }

          .logo-divider,
          .logo-arabic {
            display: none;
          }
        }

        /* RTL Support */
        [dir="rtl"] .header-logo {
          flex-direction: row-reverse;
        }

        [dir="rtl"] .nav-link.active::after {
          left: 1rem;
          right: 1rem;
        }

        /* Print Support */
        @media print {
          .header {
            position: static;
            background: white;
            border-bottom: 1px solid #ccc;
          }

          .header-nav,
          .header-controls,
          .mobile-menu-button {
            display: none;
          }
        }
      `}</style>
    </>
  )
}
