'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'

export default function LanguageToggle() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en'
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <button
      onClick={toggleLanguage}
      className="language-toggle"
      aria-label={locale === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
    >
      <span className="language-flag">{locale === 'en' ? '🇦🇪' : '🇬🇧'}</span>
      <span className="language-text">{locale === 'en' ? 'AR' : 'EN'}</span>

      <style jsx>{`
        .language-toggle {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: transparent;
          border: 1px solid var(--majaz-border);
          border-radius: var(--radius-md);
          color: var(--gold);
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-base);
        }

        .language-toggle:hover {
          background: var(--gold);
          color: var(--majaz-black);
          border-color: var(--gold);
        }

        .language-flag {
          font-size: 1.25rem;
        }

        .language-text {
          font-size: 0.875rem;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .language-toggle {
            padding: 0.4rem 0.8rem;
          }

          .language-text {
            display: none;
          }
        }
      `}</style>
    </button>
  )
}
