'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import Link from 'next/link';
import GlassCard from '@/components/majaz/GlassCard';
import Button from '@/components/majaz/Button';

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(8, 'Phone number must be at least 8 digits'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
  language: z.enum(['en', 'ar']),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
  newsletter: z.boolean().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const t = useTranslations('register');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      language: locale as 'en' | 'ar',
      newsletter: false,
      agreeToTerms: false,
    },
  });

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Register data:', data);
      // Redirect to login or dashboard
      window.location.href = `/${locale}/login`;
    } catch (error) {
      console.error('Error registering:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPasswordStrength = (pwd: string): { strength: number; label: string; color: string } => {
    if (!pwd) return { strength: 0, label: '', color: '' };

    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (pwd.length >= 12) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;

    if (strength <= 2) return { strength: 33, label: t('password_strength.weak'), color: 'bg-red-500' };
    if (strength <= 4) return { strength: 66, label: t('password_strength.medium'), color: 'bg-yellow-500' };
    return { strength: 100, label: t('password_strength.strong'), color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-playfair text-5xl font-bold text-ivory mb-4">
              {t('title')}
            </h1>
            <p className="text-ivory/70">
              {t('subtitle')}
            </p>
          </div>

          {/* Register Form */}
          <GlassCard className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-ivory mb-2 font-semibold">
                    {t('fields.first_name.label')}
                  </label>
                  <input
                    {...register('firstName')}
                    type="text"
                    id="firstName"
                    placeholder={t('fields.first_name.placeholder')}
                    className="w-full px-4 py-3 bg-black/40 backdrop-blur-md border border-gold/20 rounded-lg text-ivory placeholder-ivory/40 focus:outline-none focus:border-gold transition-colors"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-red-400 text-sm">{errors.firstName.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-ivory mb-2 font-semibold">
                    {t('fields.last_name.label')}
                  </label>
                  <input
                    {...register('lastName')}
                    type="text"
                    id="lastName"
                    placeholder={t('fields.last_name.placeholder')}
                    className="w-full px-4 py-3 bg-black/40 backdrop-blur-md border border-gold/20 rounded-lg text-ivory placeholder-ivory/40 focus:outline-none focus:border-gold transition-colors"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-red-400 text-sm">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-ivory mb-2 font-semibold">
                  {t('fields.email.label')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gold/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    placeholder={t('fields.email.placeholder')}
                    className="w-full pl-12 pr-4 py-3 bg-black/40 backdrop-blur-md border border-gold/20 rounded-lg text-ivory placeholder-ivory/40 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-red-400 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-ivory mb-2 font-semibold">
                  {t('fields.phone.label')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gold/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <input
                    {...register('phone')}
                    type="tel"
                    id="phone"
                    placeholder={t('fields.phone.placeholder')}
                    className="w-full pl-12 pr-4 py-3 bg-black/40 backdrop-blur-md border border-gold/20 rounded-lg text-ivory placeholder-ivory/40 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-red-400 text-sm">{errors.phone.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-ivory mb-2 font-semibold">
                  {t('fields.password.label')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gold/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder={t('fields.password.placeholder')}
                    className="w-full pl-12 pr-12 py-3 bg-black/40 backdrop-blur-md border border-gold/20 rounded-lg text-ivory placeholder-ivory/40 focus:outline-none focus:border-gold transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5 text-gold/60 hover:text-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gold/60 hover:text-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {/* Password Strength Indicator */}
                {password && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 h-2 bg-black/40 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${passwordStrength.color} transition-all duration-300`}
                          style={{ width: `${passwordStrength.strength}%` }}
                        />
                      </div>
                      <span className="text-sm text-ivory/60">{passwordStrength.label}</span>
                    </div>
                  </div>
                )}
                {errors.password && (
                  <p className="mt-1 text-red-400 text-sm">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-ivory mb-2 font-semibold">
                  {t('fields.confirm_password.label')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gold/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <input
                    {...register('confirmPassword')}
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    placeholder={t('fields.confirm_password.placeholder')}
                    className="w-full pl-12 pr-12 py-3 bg-black/40 backdrop-blur-md border border-gold/20 rounded-lg text-ivory placeholder-ivory/40 focus:outline-none focus:border-gold transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5 text-gold/60 hover:text-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gold/60 hover:text-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-red-400 text-sm">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Language Preference */}
              <div>
                <label className="block text-ivory mb-2 font-semibold">
                  {t('fields.language.label')}
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      {...register('language')}
                      type="radio"
                      value="en"
                      className="w-4 h-4 text-gold bg-black/40 border-gold/20 focus:ring-gold focus:ring-2"
                    />
                    <span className="text-ivory">{t('fields.language.options.english')}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      {...register('language')}
                      type="radio"
                      value="ar"
                      className="w-4 h-4 text-gold bg-black/40 border-gold/20 focus:ring-gold focus:ring-2"
                    />
                    <span className="text-ivory">{t('fields.language.options.arabic')}</span>
                  </label>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    {...register('agreeToTerms')}
                    type="checkbox"
                    className="w-5 h-5 mt-0.5 text-gold bg-black/40 border-gold/20 rounded focus:ring-gold focus:ring-2"
                  />
                  <span className="text-ivory/80 text-sm">
                    {t('fields.terms.text')}{' '}
                    <Link href={`/${locale}/terms`} className="text-gold hover:text-gold/80 transition-colors">
                      {t('fields.terms.link')}
                    </Link>
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <p className="mt-1 text-red-400 text-sm">{errors.agreeToTerms.message}</p>
                )}
              </div>

              {/* Newsletter */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    {...register('newsletter')}
                    type="checkbox"
                    className="w-5 h-5 mt-0.5 text-gold bg-black/40 border-gold/20 rounded focus:ring-gold focus:ring-2"
                  />
                  <span className="text-ivory/80 text-sm">
                    {t('fields.newsletter.text')}
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? t('submitting') : t('submit')}
              </Button>
            </form>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <span className="text-ivory/60">{t('have_account')} </span>
              <Link href={`/${locale}/login`} className="text-gold hover:text-gold/80 font-semibold transition-colors">
                {t('sign_in')}
              </Link>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
