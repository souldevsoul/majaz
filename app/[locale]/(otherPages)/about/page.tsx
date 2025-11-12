'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import GlassCard from '@/components/majaz/GlassCard';
import Button from '@/components/majaz/Button';

export default function AboutPage() {
  const t = useTranslations('about');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const values = [
    {
      key: 'excellence',
      icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
    },
    {
      key: 'integrity',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    },
    {
      key: 'innovation',
      icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    },
    {
      key: 'customer',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    },
  ];

  const milestones = [
    { year: '2020', key: 'founded' },
    { year: '2021', key: 'expansion' },
    { year: '2022', key: 'technology' },
    { year: '2023', key: 'recognition' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <Image
          src="/images/brand/about-section-team.jpg"
          alt="Majaz Team"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />

        <div className="relative z-10 flex h-full items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="font-playfair text-5xl md:text-6xl font-thin uppercase tracking-wider text-ivory mb-6">
                {t('hero.title')}
              </h1>
              <p className="text-xl md:text-2xl text-ivory/90">
                {t('hero.subtitle')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <GlassCard className="p-10">
              <h2 className="font-playfair text-4xl font-thin uppercase tracking-wider text-ivory mb-6">
                {t('story.title')}
              </h2>
              <div className="space-y-4 text-ivory/80 text-lg leading-relaxed">
                <p>{t('story.paragraph1')}</p>
                <p>{t('story.paragraph2')}</p>
                <p>{t('story.paragraph3')}</p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <GlassCard className="p-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 mb-6">
                <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="font-playfair text-3xl font-thin uppercase tracking-wider text-ivory mb-4">
                {t('mission.title')}
              </h2>
              <p className="text-ivory/80 text-lg leading-relaxed">
                {t('mission.description')}
              </p>
            </GlassCard>

            <GlassCard className="p-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 mb-6">
                <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="font-playfair text-3xl font-thin uppercase tracking-wider text-ivory mb-4">
                {t('vision.title')}
              </h2>
              <p className="text-ivory/80 text-lg leading-relaxed">
                {t('vision.description')}
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-thin uppercase tracking-wider text-ivory mb-4">
              {t('values.title')}
            </h2>
            <p className="text-xl text-ivory/70 max-w-2xl mx-auto">
              {t('values.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value) => (
              <GlassCard key={value.key} className="p-8 text-center hover:scale-105 transition-transform duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 mb-4">
                  <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={value.icon} />
                  </svg>
                </div>
                <h3 className="font-playfair text-2xl font-thin uppercase tracking-wider text-ivory mb-3">
                  {t(`values.items.${value.key}.title`)}
                </h3>
                <p className="text-ivory/70">
                  {t(`values.items.${value.key}.description`)}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-thin uppercase tracking-wider text-ivory mb-4">
              {t('timeline.title')}
            </h2>
            <p className="text-xl text-ivory/70 max-w-2xl mx-auto">
              {t('timeline.subtitle')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gold/30 -translate-x-1/2" />

              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="relative mb-12 last:mb-0">
                  <div className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <GlassCard className="p-6 inline-block">
                        <div className="text-gold font-bold text-xl mb-2">{milestone.year}</div>
                        <h3 className="font-playfair text-2xl font-thin uppercase tracking-wider text-ivory mb-2">
                          {t(`timeline.milestones.${milestone.key}.title`)}
                        </h3>
                        <p className="text-ivory/70">
                          {t(`timeline.milestones.${milestone.key}.description`)}
                        </p>
                      </GlassCard>
                    </div>

                    <div className="relative flex-shrink-0">
                      <div className="w-4 h-4 rounded-full bg-gold shadow-lg shadow-gold/50" />
                    </div>

                    <div className="flex-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl md:text-5xl font-thin uppercase tracking-wider text-ivory mb-4">
              {t('team.title')}
            </h2>
            <p className="text-xl text-ivory/70 max-w-2xl mx-auto mb-8">
              {t('team.subtitle')}
            </p>
            <Link href={`/${locale}/team-list`}>
              <Button variant="primary" size="lg">
                {t('team.cta')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-t from-black to-gray-900">
        <div className="container mx-auto px-4">
          <GlassCard className="max-w-4xl mx-auto p-12 text-center">
            <h2 className="font-playfair text-4xl md:text-5xl font-thin uppercase tracking-wider text-ivory mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-ivory/70 mb-8 max-w-2xl mx-auto">
              {t('cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/booking`}>
                <Button variant="primary" size="lg">
                  {t('cta.button_primary')}
                </Button>
              </Link>
              <Link href={`/${locale}/contact`}>
                <Button variant="secondary" size="lg">
                  {t('cta.button_secondary')}
                </Button>
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
