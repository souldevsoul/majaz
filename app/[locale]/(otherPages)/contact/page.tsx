'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import GlassCard from '@/components/majaz/GlassCard';
import Button from '@/components/majaz/Button';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(8, 'Phone number must be at least 8 digits'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  preferredContact: z.enum(['email', 'phone', 'whatsapp']),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      preferredContact: 'email',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Form data:', data);
      setSubmitSuccess(true);
      reset();
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      key: 'phone',
      icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
      value: '+971 50 123 4567',
      href: 'tel:+971501234567',
    },
    {
      key: 'email',
      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      value: 'support@majaz.ae',
      href: 'mailto:support@majaz.ae',
    },
    {
      key: 'whatsapp',
      icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
      value: '+971 50 123 4567',
      href: 'https://wa.me/971501234567',
    },
    {
      key: 'address',
      icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
      value: 'Dubai Marina, UAE',
      href: 'https://maps.google.com/?q=Dubai+Marina',
    },
  ];

  const workingHours = [
    { key: 'weekdays', days: 'Monday - Friday', hours: '8:00 AM - 8:00 PM' },
    { key: 'saturday', days: 'Saturday', hours: '9:00 AM - 6:00 PM' },
    { key: 'sunday', days: 'Sunday', hours: '10:00 AM - 4:00 PM' },
  ];

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <GlassCard className="p-8">
              <h2 className="font-playfair text-3xl font-thin uppercase tracking-wider text-ivory mb-6">
                {t('form.title')}
              </h2>

              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300">
                  {t('form.success_message')}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-ivory mb-2 font-semibold">
                    {t('form.fields.name.label')}
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    id="name"
                    placeholder={t('form.fields.name.placeholder')}
                    className="w-full px-4 py-3 bg-black/40 backdrop-blur-md border border-gold/20 rounded-lg text-ivory placeholder-ivory/40 focus:outline-none focus:border-gold transition-colors"
                  />
                  {errors.name && (
                    <p className="mt-1 text-red-400 text-sm">{errors.name.message}</p>
                  )}
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-ivory mb-2 font-semibold">
                      {t('form.fields.email.label')}
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      id="email"
                      placeholder={t('form.fields.email.placeholder')}
                      className="w-full px-4 py-3 bg-black/40 backdrop-blur-md border border-gold/20 rounded-lg text-ivory placeholder-ivory/40 focus:outline-none focus:border-gold transition-colors"
                    />
                    {errors.email && (
                      <p className="mt-1 text-red-400 text-sm">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-ivory mb-2 font-semibold">
                      {t('form.fields.phone.label')}
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      id="phone"
                      placeholder={t('form.fields.phone.placeholder')}
                      className="w-full px-4 py-3 bg-black/40 backdrop-blur-md border border-gold/20 rounded-lg text-ivory placeholder-ivory/40 focus:outline-none focus:border-gold transition-colors"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-red-400 text-sm">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-ivory mb-2 font-semibold">
                    {t('form.fields.subject.label')}
                  </label>
                  <input
                    {...register('subject')}
                    type="text"
                    id="subject"
                    placeholder={t('form.fields.subject.placeholder')}
                    className="w-full px-4 py-3 bg-black/40 backdrop-blur-md border border-gold/20 rounded-lg text-ivory placeholder-ivory/40 focus:outline-none focus:border-gold transition-colors"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-red-400 text-sm">{errors.subject.message}</p>
                  )}
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block text-ivory mb-2 font-semibold">
                    {t('form.fields.preferred_contact.label')}
                  </label>
                  <div className="flex gap-4">
                    {(['email', 'phone', 'whatsapp'] as const).map((method) => (
                      <label key={method} className="flex items-center gap-2 cursor-pointer">
                        <input
                          {...register('preferredContact')}
                          type="radio"
                          value={method}
                          className="w-4 h-4 text-gold bg-black/40 border-gold/20 focus:ring-gold focus:ring-2"
                        />
                        <span className="text-ivory">{t(`form.fields.preferred_contact.options.${method}`)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-ivory mb-2 font-semibold">
                    {t('form.fields.message.label')}
                  </label>
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={6}
                    placeholder={t('form.fields.message.placeholder')}
                    className="w-full px-4 py-3 bg-black/40 backdrop-blur-md border border-gold/20 rounded-lg text-ivory placeholder-ivory/40 focus:outline-none focus:border-gold transition-colors resize-none"
                  />
                  {errors.message && (
                    <p className="mt-1 text-red-400 text-sm">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? t('form.submitting') : t('form.submit')}
                </Button>
              </form>
            </GlassCard>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Contact Details */}
            <GlassCard className="p-6">
              <h3 className="font-playfair text-2xl font-thin uppercase tracking-wider text-ivory mb-6">
                {t('info.title')}
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <a
                    key={info.key}
                    href={info.href}
                    target={info.key === 'address' ? '_blank' : undefined}
                    rel={info.key === 'address' ? 'noopener noreferrer' : undefined}
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-gold/10 transition-colors group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center group-hover:bg-gold/30 transition-colors">
                      <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={info.icon} />
                      </svg>
                    </div>
                    <div>
                      <div className="text-ivory/60 text-sm mb-1">{t(`info.${info.key}.label`)}</div>
                      <div className="text-ivory font-semibold">{info.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </GlassCard>

            {/* Working Hours */}
            <GlassCard className="p-6">
              <h3 className="font-playfair text-2xl font-thin uppercase tracking-wider text-ivory mb-6">
                {t('hours.title')}
              </h3>
              <div className="space-y-3">
                {workingHours.map((schedule) => (
                  <div key={schedule.key} className="flex justify-between items-center py-2 border-b border-gold/10 last:border-0">
                    <span className="text-ivory/80">{schedule.days}</span>
                    <span className="text-gold font-semibold">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Social Media */}
            <GlassCard className="p-6">
              <h3 className="font-playfair text-2xl font-thin uppercase tracking-wider text-ivory mb-6">
                {t('social.title')}
              </h3>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com/MAJAZuae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center p-3 rounded-lg bg-gold/20 hover:bg-gold/30 transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-6 h-6 text-gold" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com/MAJAZuae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center p-3 rounded-lg bg-gold/20 hover:bg-gold/30 transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6 text-gold" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/company/MAJAZ-uae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center p-3 rounded-lg bg-gold/20 hover:bg-gold/30 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-6 h-6 text-gold" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
