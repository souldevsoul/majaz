'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import Link from 'next/link';
import GlassCard from '@/components/majaz/GlassCard';
import Button from '@/components/majaz/Button';

type Currency = 'AED' | 'USD' | 'EUR';

interface PricingTier {
  key: string;
  popular?: boolean;
  premium?: boolean;
}

export default function PricingPage() {
  const t = useTranslations('pricing');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [currency, setCurrency] = useState<Currency>('AED');

  const tiers: PricingTier[] = [
    { key: 'basic' },
    { key: 'standard' },
    { key: 'premium', popular: true },
    { key: 'luxury', premium: true },
    { key: 'fleet' },
  ];

  const currencySymbols: Record<Currency, string> = {
    AED: 'AED',
    USD: '$',
    EUR: '€',
  };

  const conversionRates: Record<Currency, number> = {
    AED: 1,
    USD: 0.27,
    EUR: 0.25,
  };

  const convertPrice = (aedPrice: string): string => {
    const numericPrice = parseInt(aedPrice.replace(/[^0-9]/g, ''));
    const converted = Math.round(numericPrice * conversionRates[currency]);
    return `${currencySymbols[currency]}${converted.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-playfair text-5xl md:text-6xl font-thin uppercase tracking-wider text-ivory mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-ivory/70 max-w-2xl mx-auto mb-8">
            {t('subtitle')}
          </p>

          {/* Currency Selector */}
          <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-full p-2 border border-gold/20">
            {(['AED', 'USD', 'EUR'] as Currency[]).map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  currency === curr
                    ? 'bg-gold text-black shadow-lg shadow-gold/30'
                    : 'text-ivory/70 hover:text-ivory'
                }`}
              >
                {curr}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {tiers.map((tier) => (
            <GlassCard
              key={tier.key}
              className={`p-8 relative ${
                tier.popular || tier.premium
                  ? 'ring-2 ring-gold shadow-2xl shadow-gold/20 scale-105'
                  : 'hover:scale-105'
              } transition-all duration-300`}
            >
              {/* Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-black px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                  {t('badges.popular')}
                </div>
              )}
              {tier.premium && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold to-yellow-600 text-black px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                  {t('badges.premium')}
                </div>
              )}

              {/* Tier Name */}
              <div className="text-center mb-6">
                <h3 className="font-playfair text-2xl font-thin uppercase tracking-wider text-ivory mb-2">
                  {t(`tiers.${tier.key}.name`)}
                </h3>
                <p className="text-ivory/60 text-sm">
                  {t(`tiers.${tier.key}.subtitle`)}
                </p>
              </div>

              {/* Price */}
              <div className="text-center mb-6 pb-6 border-b border-gold/20">
                <div className="text-4xl font-bold text-gold mb-2 font-playfair">
                  {convertPrice(t(`tiers.${tier.key}.price`))}
                </div>
                <div className="text-ivory/60 text-sm">
                  {t(`tiers.${tier.key}.duration`)}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {[1, 2, 3, 4, 5, 6].map((i) => {
                  const featureKey = `tiers.${tier.key}.features.feature${i}`;
                  try {
                    const feature = t(featureKey);
                    return (
                      <li key={i} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-ivory/80 text-sm">{feature}</span>
                      </li>
                    );
                  } catch {
                    return null;
                  }
                })}
              </ul>

              {/* CTA Button */}
              <Link href={`/${locale}/booking?tier=${tier.key}`}>
                <Button
                  variant={tier.popular || tier.premium ? 'primary' : 'secondary'}
                  size="md"
                  className="w-full"
                >
                  {t('cta_button')}
                </Button>
              </Link>
            </GlassCard>
          ))}
        </div>

        {/* Comparison Note */}
        <div className="max-w-4xl mx-auto mt-16">
          <GlassCard className="p-8 text-center">
            <h3 className="font-playfair text-2xl font-thin uppercase tracking-wider text-ivory mb-4">
              {t('comparison.title')}
            </h3>
            <p className="text-ivory/70 mb-6">
              {t('comparison.description')}
            </p>
            <Link href={`/${locale}/contact`}>
              <Button variant="secondary" size="lg">
                {t('comparison.cta')}
              </Button>
            </Link>
          </GlassCard>
        </div>

        {/* FAQ Teaser */}
        <div className="max-w-3xl mx-auto mt-12 text-center">
          <p className="text-ivory/60 mb-4">
            {t('faq_teaser')}
          </p>
          <Link href={`/${locale}/faq`} className="text-gold hover:text-gold/80 font-semibold inline-flex items-center gap-2 transition-colors">
            {t('faq_link')}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Value Propositions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-16">
          <GlassCard className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/20 mb-4">
              <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 className="font-bold text-ivory mb-2">{t('benefits.guarantee.title')}</h4>
            <p className="text-ivory/60 text-sm">{t('benefits.guarantee.description')}</p>
          </GlassCard>

          <GlassCard className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/20 mb-4">
              <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-bold text-ivory mb-2">{t('benefits.turnaround.title')}</h4>
            <p className="text-ivory/60 text-sm">{t('benefits.turnaround.description')}</p>
          </GlassCard>

          <GlassCard className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/20 mb-4">
              <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h4 className="font-bold text-ivory mb-2">{t('benefits.support.title')}</h4>
            <p className="text-ivory/60 text-sm">{t('benefits.support.description')}</p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
