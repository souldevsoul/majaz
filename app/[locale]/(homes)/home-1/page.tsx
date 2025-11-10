'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import GlassCard from '@/components/majaz/GlassCard';
import Button from '@/components/majaz/Button';

export default function HomePage() {
  const tHero = useTranslations('hero');
  const tFeatures = useTranslations('features');
  const tStats = useTranslations('stats');
  const tProcess = useTranslations('process');
  const tTestimonials = useTranslations('testimonials');
  const tCta = useTranslations('cta');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const stats = [
    { key: 'vehicles', icon: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z' },
    { key: 'customers', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { key: 'accuracy', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { key: 'satisfaction', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
  ];

  const features = [
    { key: 'comprehensive', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
    { key: 'experts', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { key: 'fast', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { key: 'transparent', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  ];

  const steps = [
    { key: 'booking', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { key: 'inspection', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
    { key: 'analysis', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { key: 'report', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { key: 'delivery', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  ];

  const testimonials = [
    { key: 'testimonial1', author: 'Ahmed Al-Maktoum', role: 'Dubai Business Owner', rating: 5 },
    { key: 'testimonial2', author: 'Sarah Johnson', role: 'Expat Professional', rating: 5 },
    { key: 'testimonial3', author: 'Mohammed bin Rashid', role: 'Car Collector', rating: 5 },
  ];

  return (
    <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <Image
          src="/images/brand/hero-majaz-dubai.jpg"
          alt="Majaz Dubai Hero"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

        <div className="relative z-10 flex h-full items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h1 className="font-playfair text-5xl md:text-7xl font-bold text-ivory mb-6 animate-fade-in">
                {tHero('title')}
              </h1>
              <p className="text-xl md:text-2xl text-ivory/90 mb-8 animate-fade-in-delay-1">
                {tHero('subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-2">
                <Link href={`/${locale}/booking`}>
                  <Button variant="primary" size="lg">
                    {tHero('cta_primary')}
                  </Button>
                </Link>
                <Link href={`/${locale}/about`}>
                  <Button variant="secondary" size="lg">
                    {tHero('cta_secondary')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <GlassCard key={stat.key} className="text-center p-8 hover:scale-105 transition-transform duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 mb-4">
                  <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                  </svg>
                </div>
                <div className="text-4xl font-bold text-gold mb-2 font-playfair">
                  {tStats(`${stat.key}.value`)}
                </div>
                <div className="text-ivory/80 text-lg">
                  {tStats(`${stat.key}.label`)}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-ivory mb-4">
              {tFeatures('title')}
            </h2>
            <p className="text-xl text-ivory/70 max-w-2xl mx-auto">
              {tFeatures('subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <GlassCard
                key={feature.key}
                className="p-8 hover:shadow-2xl hover:shadow-gold/20 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gold/20 flex items-center justify-center">
                    <svg className="w-7 h-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-ivory mb-3 font-playfair">
                      {tFeatures(`${feature.key}.title`)}
                    </h3>
                    <p className="text-ivory/70 leading-relaxed">
                      {tFeatures(`${feature.key}.description`)}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-ivory mb-4">
              {tProcess('title')}
            </h2>
            <p className="text-xl text-ivory/70 max-w-2xl mx-auto">
              {tProcess('subtitle')}
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.key} className="relative">
                <div className="flex flex-col md:flex-row items-start gap-6 mb-12">
                  <div className="flex-shrink-0 relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold to-gold/60 flex items-center justify-center shadow-lg shadow-gold/30">
                      <svg className="w-10 h-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={step.icon} />
                      </svg>
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-gold to-transparent"
                         style={{ display: index === steps.length - 1 ? 'none' : 'block' }} />
                  </div>

                  <GlassCard className="flex-1 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-gold font-bold text-lg">
                        {tProcess('step')} {index + 1}
                      </span>
                      <div className="h-px flex-1 bg-gold/30" />
                    </div>
                    <h3 className="text-2xl font-bold text-ivory mb-3 font-playfair">
                      {tProcess(`steps.${step.key}.title`)}
                    </h3>
                    <p className="text-ivory/70 leading-relaxed">
                      {tProcess(`steps.${step.key}.description`)}
                    </p>
                  </GlassCard>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-ivory mb-4">
              {tTestimonials('title')}
            </h2>
            <p className="text-xl text-ivory/70 max-w-2xl mx-auto">
              {tTestimonials('subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial) => (
              <GlassCard key={testimonial.key} className="p-8 hover:shadow-xl hover:shadow-gold/10 transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-gold fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-ivory/80 mb-6 leading-relaxed italic">
                  "{tTestimonials(`${testimonial.key}.text`)}"
                </p>
                <div className="border-t border-gold/20 pt-4">
                  <div className="font-bold text-ivory">{testimonial.author}</div>
                  <div className="text-ivory/60 text-sm">{testimonial.role}</div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-t from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <GlassCard className="max-w-4xl mx-auto p-12 text-center">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-ivory mb-6">
              {tCta('title')}
            </h2>
            <p className="text-xl text-ivory/70 mb-8 max-w-2xl mx-auto">
              {tCta('subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/booking`}>
                <Button variant="primary" size="lg">
                  {tCta('button_primary')}
                </Button>
              </Link>
              <Link href={`/${locale}/contact`}>
                <Button variant="secondary" size="lg">
                  {tCta('button_secondary')}
                </Button>
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .animate-fade-in-delay-1 {
          opacity: 0;
          animation: fade-in 1s ease-out 0.2s forwards;
        }

        .animate-fade-in-delay-2 {
          opacity: 0;
          animation: fade-in 1s ease-out 0.4s forwards;
        }
      `}</style>
    </div>
  );
}
