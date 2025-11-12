'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import Link from 'next/link';
import GlassCard from '@/components/majaz/GlassCard';
import Button from '@/components/majaz/Button';

type Category = 'general' | 'pricing' | 'process';

interface FAQ {
  key: string;
  category: Category;
}

export default function FAQPage() {
  const t = useTranslations('faq');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [activeCategory, setActiveCategory] = useState<Category>('general');
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const faqs: FAQ[] = [
    // General
    { key: 'what_is_majaz', category: 'general' },
    { key: 'who_needs_assessment', category: 'general' },
    { key: 'how_long', category: 'general' },
    { key: 'where_inspect', category: 'general' },
    { key: 'what_checked', category: 'general' },
    // Pricing
    { key: 'how_much', category: 'pricing' },
    { key: 'payment_methods', category: 'pricing' },
    { key: 'refund_policy', category: 'pricing' },
    { key: 'group_discount', category: 'pricing' },
    // Process
    { key: 'how_book', category: 'process' },
    { key: 'what_prepare', category: 'process' },
    { key: 'report_format', category: 'process' },
    { key: 'follow_up', category: 'process' },
  ];

  const categories: Category[] = ['general', 'pricing', 'process'];

  const categoryIcons: Record<Category, string> = {
    general: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    pricing: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    process: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  };

  const filteredFaqs = faqs.filter((faq) => faq.category === activeCategory);

  const toggleQuestion = (key: string) => {
    setOpenQuestion(openQuestion === key ? null : key);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-playfair text-5xl md:text-6xl font-thin uppercase tracking-wider text-ivory mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-ivory/70 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gold text-black shadow-lg shadow-gold/30'
                  : 'bg-black/40 backdrop-blur-md text-ivory/70 hover:text-ivory border border-gold/20'
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={categoryIcons[category]} />
              </svg>
              {t(`categories.${category}`)}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <GlassCard
                key={faq.key}
                className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-gold/10"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <button
                  onClick={() => toggleQuestion(faq.key)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-playfair text-xl font-semibold text-ivory pr-4">
                    {t(`questions.${faq.key}.question`)}
                  </span>
                  <svg
                    className={`w-6 h-6 text-gold flex-shrink-0 transition-transform duration-300 ${
                      openQuestion === faq.key ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div
                  className={`transition-all duration-300 ${
                    openQuestion === faq.key ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="px-6 pb-6 text-ivory/80 leading-relaxed">
                    {t(`questions.${faq.key}.answer`)}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Still Have Questions Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <GlassCard className="p-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 mb-6">
              <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="font-playfair text-3xl font-thin uppercase tracking-wider text-ivory mb-4">
              {t('contact_section.title')}
            </h2>
            <p className="text-ivory/70 mb-6 max-w-xl mx-auto">
              {t('contact_section.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/contact`}>
                <Button variant="primary" size="lg">
                  {t('contact_section.button_primary')}
                </Button>
              </Link>
              <a href="tel:+971501234567">
                <Button variant="secondary" size="lg">
                  {t('contact_section.button_secondary')}
                </Button>
              </a>
            </div>
          </GlassCard>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
          <Link href={`/${locale}/pricing`}>
            <GlassCard className="p-6 text-center hover:scale-105 transition-transform duration-300 cursor-pointer h-full">
              <svg className="w-10 h-10 text-gold mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4 className="font-bold text-ivory mb-2">{t('quick_links.pricing')}</h4>
            </GlassCard>
          </Link>

          <Link href={`/${locale}/booking`}>
            <GlassCard className="p-6 text-center hover:scale-105 transition-transform duration-300 cursor-pointer h-full">
              <svg className="w-10 h-10 text-gold mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h4 className="font-bold text-ivory mb-2">{t('quick_links.booking')}</h4>
            </GlassCard>
          </Link>

          <Link href={`/${locale}/about`}>
            <GlassCard className="p-6 text-center hover:scale-105 transition-transform duration-300 cursor-pointer h-full">
              <svg className="w-10 h-10 text-gold mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4 className="font-bold text-ivory mb-2">{t('quick_links.about')}</h4>
            </GlassCard>
          </Link>
        </div>
      </div>
    </div>
  );
}
