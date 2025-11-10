'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import GlassCard from '@/components/majaz/GlassCard';

type Section =
  | 'introduction'
  | 'services'
  | 'booking'
  | 'payment'
  | 'cancellation'
  | 'liability'
  | 'intellectual_property'
  | 'privacy'
  | 'user_conduct'
  | 'modifications'
  | 'governing_law';

export default function TermsPage() {
  const t = useTranslations('terms');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [activeSection, setActiveSection] = useState<Section>('introduction');

  const sections: Section[] = [
    'introduction',
    'services',
    'booking',
    'payment',
    'cancellation',
    'liability',
    'intellectual_property',
    'privacy',
    'user_conduct',
    'modifications',
    'governing_law',
  ];

  const sectionIcons: Record<Section, string> = {
    introduction: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    services: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    booking: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    payment: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
    cancellation: 'M6 18L18 6M6 6l12 12',
    liability: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    intellectual_property: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
    privacy: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
    user_conduct: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    modifications: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
    governing_law: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3',
  };

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map((section) => ({
        id: section,
        element: document.getElementById(section),
      }));

      const currentSection = sectionElements.find(({ element }) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (section: Section) => {
    const element = document.getElementById(section);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-ivory mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-ivory/70 max-w-2xl mx-auto mb-4">
            {t('subtitle')}
          </p>
          <p className="text-ivory/60">
            {t('last_updated')}: {t('last_updated_date')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <GlassCard className="p-4">
                <h3 className="font-playfair text-xl font-bold text-ivory mb-4 px-2">
                  {t('navigation.title')}
                </h3>
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section}
                      onClick={() => scrollToSection(section)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-300 ${
                        activeSection === section
                          ? 'bg-gold/20 text-gold border-l-2 border-gold'
                          : 'text-ivory/70 hover:text-ivory hover:bg-gold/10'
                      }`}
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sectionIcons[section]} />
                      </svg>
                      <span className="text-sm font-medium">{t(`sections.${section}.title`)}</span>
                    </button>
                  ))}
                </nav>

                {/* Quick Links */}
                <div className="mt-6 pt-6 border-t border-gold/20">
                  <h4 className="text-ivory/80 font-semibold text-sm mb-3 px-2">
                    {t('navigation.quick_links')}
                  </h4>
                  <div className="space-y-2">
                    <Link
                      href={`/${locale}/privacy`}
                      className="block px-3 py-2 text-sm text-ivory/70 hover:text-gold transition-colors"
                    >
                      {t('navigation.privacy_policy')}
                    </Link>
                    <Link
                      href={`/${locale}/contact`}
                      className="block px-3 py-2 text-sm text-ivory/70 hover:text-gold transition-colors"
                    >
                      {t('navigation.contact_us')}
                    </Link>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <GlassCard className="p-8 md:p-12">
              <div className="prose prose-invert max-w-none">
                {sections.map((section) => (
                  <section key={section} id={section} className="mb-12 last:mb-0 scroll-mt-24">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sectionIcons[section]} />
                        </svg>
                      </div>
                      <h2 className="font-playfair text-3xl font-bold text-ivory m-0">
                        {t(`sections.${section}.title`)}
                      </h2>
                    </div>

                    <div className="space-y-4 text-ivory/80 leading-relaxed">
                      {/* Main content */}
                      <p className="text-lg">{t(`sections.${section}.content`)}</p>

                      {/* Additional paragraphs if they exist */}
                      {[1, 2, 3, 4, 5].map((i) => {
                        try {
                          const paragraph = t(`sections.${section}.paragraph${i}`);
                          return (
                            <p key={i} className="text-lg">
                              {paragraph}
                            </p>
                          );
                        } catch {
                          return null;
                        }
                      })}

                      {/* List items if they exist */}
                      {(() => {
                        const listItems = [];
                        for (let i = 1; i <= 10; i++) {
                          try {
                            const item = t(`sections.${section}.list.item${i}`);
                            listItems.push(item);
                          } catch {
                            break;
                          }
                        }
                        if (listItems.length > 0) {
                          return (
                            <ul className="space-y-3 ml-6">
                              {listItems.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                  <svg className="w-5 h-5 text-gold flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          );
                        }
                        return null;
                      })()}
                    </div>
                  </section>
                ))}
              </div>

              {/* Contact Section */}
              <div className="mt-12 pt-8 border-t border-gold/20">
                <div className="bg-gold/10 rounded-lg p-6 border border-gold/20">
                  <h3 className="font-playfair text-2xl font-bold text-ivory mb-3">
                    {t('contact_section.title')}
                  </h3>
                  <p className="text-ivory/80 mb-4">
                    {t('contact_section.description')}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href={`/${locale}/contact`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-gold/90 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {t('contact_section.button')}
                    </Link>
                    <a
                      href="mailto:legal@majaz.ae"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-md text-ivory border border-gold/20 font-semibold rounded-lg hover:bg-gold/10 transition-colors"
                    >
                      legal@majaz.ae
                    </a>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Print Button */}
        <div className="max-w-7xl mx-auto mt-8 text-center">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-md text-ivory border border-gold/20 font-semibold rounded-lg hover:bg-gold/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            {t('print_button')}
          </button>
        </div>
      </div>

      <style jsx>{`
        @media print {
          nav, button {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
