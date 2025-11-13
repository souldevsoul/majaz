'use client'

import React, { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import GlassCard from '@/components/majaz/GlassCard'
import Button from '@/components/majaz/Button'

// Form validation schema
const requestSchema = z.object({
  mode: z.enum(['remote_assessment', 'onsite_inspection', 'sourcing']),
  tier: z.enum(['48h', '24h', 'sameDay']),
  url: z.string().url().optional().or(z.literal('')),
  brief: z.string().min(10).optional().or(z.literal(''))
}).refine(
  (data) => {
    if (data.mode === 'sourcing') {
      return data.brief && data.brief.length >= 10
    } 
      return data.url && data.url.length > 0
    
  },
  {
    message: "URL is required for Remote/Onsite, Brief is required for Sourcing",
    path: ["url"]
  }
)

type RequestFormData = z.infer<typeof requestSchema>

interface PricingTier {
  mode: string
  tier: string
  price: number
  sla: string
  features: string[]
}

export default function NewRequestPage() {
  const t = useTranslations('forms.newRequest')
  const tPricing = useTranslations('pricing.tiers')
  const tCommon = useTranslations('common')

  const [quote, setQuote] = useState<PricingTier | null>(null)
  const [loadingQuote, setLoadingQuote] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue
  } = useForm<RequestFormData>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      mode: 'remote_assessment',
      tier: '48h',
      url: '',
      brief: ''
    }
  })

  const selectedMode = watch('mode')
  const selectedTier = watch('tier')
  const url = watch('url')
  const brief = watch('brief')

  useEffect(() => {
    // Auto-fetch quote when mode or tier changes
    if (selectedMode && selectedTier) {
      fetchQuote()
    }
  }, [selectedMode, selectedTier])

  const fetchQuote = async () => {
    setLoadingQuote(true)

    // Simulate API call to /api/requests/quote
    setTimeout(() => {
      const prices: Record<string, Record<string, number>> = {
        remote_assessment: { '48h': 49, '24h': 89, 'sameDay': 129 },
        onsite_inspection: { '48h': 169, '24h': 209, 'sameDay': 249 },
        sourcing: { '48h': 59, '24h': 59, 'sameDay': 59 }
      }

      const features: Record<string, string[]> = {
        remote_assessment: [
          'Complete listing scrape',
          'AI-powered data extraction',
          'Market comparables analysis',
          'Fair value estimate',
          'Safe max bid recommendation',
          'Comprehensive PDF report'
        ],
        onsite_inspection: [
          'Everything in Remote Assessment',
          'Physical vehicle inspection',
          'Detailed photo documentation',
          'Test drive assessment',
          'Mechanical inspection',
          'Undercarriage inspection'
        ],
        sourcing: [
          'Personalized vehicle search',
          'Market research',
          'Multiple options presented',
          'Price negotiations',
          'Due diligence support'
        ]
      }

      const slaLabels: Record<string, string> = {
        '48h': '48 Hours',
        '24h': '24 Hours',
        'sameDay': 'Same Day'
      }

      setQuote({
        mode: selectedMode,
        tier: selectedTier,
        price: prices[selectedMode][selectedTier],
        sla: slaLabels[selectedTier],
        features: features[selectedMode]
      })

      setLoadingQuote(false)
    }, 500)
  }

  const onSubmit = async (data: RequestFormData) => {
    setSubmitting(true)

    // Simulate API call to create request and initiate payment
    setTimeout(() => {
      console.log('Creating request:', data)
      // In production, this would:
      // 1. POST to /api/requests
      // 2. Get Stripe checkout URL
      // 3. Redirect to payment
      alert('Redirecting to payment...')
      setSubmitting(false)
      // window.location.href = '/dashboard/requests'
    }, 1500)
  }

  const modeOptions = [
    {
      value: 'remote_assessment',
      label: t('mode.remote'),
      icon: '🌐',
      description: 'Analysis based on listing data and market research'
    },
    {
      value: 'onsite_inspection',
      label: t('mode.onsite'),
      icon: '🔍',
      description: 'Physical inspection by certified expert'
    },
    {
      value: 'sourcing',
      label: t('mode.sourcing'),
      icon: '🎯',
      description: 'We find the perfect vehicle for you'
    }
  ]

  const tierOptions = [
    { value: '48h', label: t('tier.48h') },
    { value: '24h', label: t('tier.24h') },
    { value: 'sameDay', label: t('tier.sameDay') }
  ]

  return (
    <div style={{ padding: 'var(--spacing-2xl)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--spacing-xl)' }}>
        <Button
          variant="outline"
          size="sm"
          href="/dashboard/requests"
          style={{ marginBottom: 'var(--spacing-md)' }}
        >
          ← {tCommon('back')}
        </Button>

        <h1 style={{
          fontSize: '2.5rem',
          fontFamily: 'var(--font-display)',
          color: 'var(--gold)',
          marginBottom: 'var(--spacing-xs)'
        }}>
          {t('title')}
        </h1>
        <p style={{ color: 'var(--majaz-text-muted)' }}>
          Choose your service and get an instant quote
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: 'var(--spacing-xl)'
        }}>
          {/* Form Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
            {/* Mode Selection */}
            <GlassCard>
              <h2 style={{
                fontSize: '1.25rem',
                color: 'var(--gold)',
                marginBottom: 'var(--spacing-md)',
                fontFamily: 'var(--font-display)'
              }}>
                {t('mode.label')}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                {modeOptions.map((option) => (
                  <label
                    key={option.value}
                    style={{
                      padding: 'var(--spacing-md)',
                      background: selectedMode === option.value ? 'rgba(212, 175, 55, 0.15)' : 'rgba(212, 175, 55, 0.05)',
                      border: `2px solid ${selectedMode === option.value ? 'var(--gold)' : 'rgba(212, 175, 55, 0.2)'}`,
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-base)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 'var(--spacing-md)'
                    }}
                  >
                    <input
                      type="radio"
                      value={option.value}
                      {...register('mode')}
                      style={{ marginTop: '4px' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-sm)',
                        marginBottom: 'var(--spacing-xs)'
                      }}>
                        <span style={{ fontSize: '1.5rem' }}>{option.icon}</span>
                        <span style={{
                          color: 'var(--majaz-ivory)',
                          fontWeight: '600',
                          fontSize: '1rem'
                        }}>
                          {option.label}
                        </span>
                      </div>
                      <p style={{
                        color: 'var(--majaz-text-muted)',
                        fontSize: '0.875rem',
                        lineHeight: '1.5'
                      }}>
                        {option.description}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </GlassCard>

            {/* Tier Selection */}
            <GlassCard>
              <h2 style={{
                fontSize: '1.25rem',
                color: 'var(--gold)',
                marginBottom: 'var(--spacing-md)',
                fontFamily: 'var(--font-display)'
              }}>
                {t('tier.label')}
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                gap: 'var(--spacing-md)'
              }}>
                {tierOptions.map((option) => (
                  <label
                    key={option.value}
                    style={{
                      padding: 'var(--spacing-md)',
                      background: selectedTier === option.value ? 'rgba(212, 175, 55, 0.15)' : 'rgba(212, 175, 55, 0.05)',
                      border: `2px solid ${selectedTier === option.value ? 'var(--gold)' : 'rgba(212, 175, 55, 0.2)'}`,
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-base)',
                      textAlign: 'center'
                    }}
                  >
                    <input
                      type="radio"
                      value={option.value}
                      {...register('tier')}
                      style={{ display: 'none' }}
                    />
                    <div style={{
                      color: selectedTier === option.value ? 'var(--gold)' : 'var(--majaz-ivory)',
                      fontWeight: '600',
                      fontSize: '0.875rem'
                    }}>
                      {option.label}
                    </div>
                  </label>
                ))}
              </div>
            </GlassCard>

            {/* URL Input (for Remote/Onsite) */}
            {selectedMode !== 'sourcing' && (
              <GlassCard>
                <h2 style={{
                  fontSize: '1.25rem',
                  color: 'var(--gold)',
                  marginBottom: 'var(--spacing-md)',
                  fontFamily: 'var(--font-display)'
                }}>
                  {t('url.label')}
                </h2>

                <input
                  type="url"
                  placeholder={t('url.placeholder')}
                  {...register('url')}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    background: 'rgba(212, 175, 55, 0.05)',
                    border: `1px solid ${errors.url ? '#111111' : 'rgba(212, 175, 55, 0.3)'}`,
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--majaz-ivory)',
                    fontSize: '0.875rem'
                  }}
                />
                {errors.url && (
                  <p style={{ color: '#111111', fontSize: '0.875rem', marginTop: 'var(--spacing-xs)' }}>
                    {errors.url.message}
                  </p>
                )}
              </GlassCard>
            )}

            {/* Brief Input (for Sourcing) */}
            {selectedMode === 'sourcing' && (
              <GlassCard>
                <h2 style={{
                  fontSize: '1.25rem',
                  color: 'var(--gold)',
                  marginBottom: 'var(--spacing-md)',
                  fontFamily: 'var(--font-display)'
                }}>
                  {t('brief.label')}
                </h2>

                <textarea
                  placeholder={t('brief.placeholder')}
                  {...register('brief')}
                  style={{
                    width: '100%',
                    minHeight: '150px',
                    padding: 'var(--spacing-md)',
                    background: 'rgba(212, 175, 55, 0.05)',
                    border: `1px solid ${errors.brief ? '#111111' : 'rgba(212, 175, 55, 0.3)'}`,
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--majaz-ivory)',
                    fontSize: '0.875rem',
                    resize: 'vertical'
                  }}
                />
                {errors.brief && (
                  <p style={{ color: '#111111', fontSize: '0.875rem', marginTop: 'var(--spacing-xs)' }}>
                    {errors.brief.message}
                  </p>
                )}
              </GlassCard>
            )}
          </div>

          {/* Quote Preview Section */}
          <div>
            <GlassCard style={{ position: 'sticky', top: 'var(--spacing-xl)' }}>
              <h2 style={{
                fontSize: '1.5rem',
                color: 'var(--gold)',
                marginBottom: 'var(--spacing-lg)',
                fontFamily: 'var(--font-display)'
              }}>
                {t('quote')} Preview
              </h2>

              {loadingQuote ? (
                <div style={{
                  textAlign: 'center',
                  padding: 'var(--spacing-2xl)',
                  color: 'var(--majaz-text-muted)'
                }}>
                  {tCommon('loading')}
                </div>
              ) : quote ? (
                <>
                  <div style={{
                    padding: 'var(--spacing-lg)',
                    background: 'rgba(212, 175, 55, 0.1)',
                    borderRadius: 'var(--radius-lg)',
                    border: '2px solid var(--gold)',
                    marginBottom: 'var(--spacing-lg)',
                    textAlign: 'center'
                  }}>
                    <p style={{
                      color: 'var(--majaz-text-muted)',
                      fontSize: '0.875rem',
                      marginBottom: 'var(--spacing-xs)'
                    }}>
                      Total Price
                    </p>
                    <p style={{
                      fontSize: '3rem',
                      fontWeight: '700',
                      color: 'var(--gold)',
                      fontFamily: 'var(--font-display)',
                      marginBottom: 'var(--spacing-xs)'
                    }}>
                      AED {quote.price}
                    </p>
                    <p style={{
                      color: 'var(--majaz-text-muted)',
                      fontSize: '0.875rem'
                    }}>
                      SLA: {quote.sla}
                    </p>
                  </div>

                  <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <h3 style={{
                      color: 'var(--gold)',
                      fontSize: '1rem',
                      marginBottom: 'var(--spacing-md)',
                      fontWeight: '600'
                    }}>
                      What's Included:
                    </h3>
                    <ul style={{
                      listStyle: 'none',
                      padding: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--spacing-sm)'
                    }}>
                      {quote.features.map((feature, index) => (
                        <li
                          key={index}
                          style={{
                            color: 'var(--majaz-ivory)',
                            fontSize: '0.875rem',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 'var(--spacing-sm)'
                          }}
                        >
                          <span style={{ color: 'var(--gold)' }}>✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={submitting}
                    disabled={submitting}
                  >
                    {submitting ? 'Processing...' : t('proceed')}
                  </Button>

                  <div style={{
                    marginTop: 'var(--spacing-md)',
                    padding: 'var(--spacing-md)',
                    background: 'rgba(212, 175, 55, 0.05)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(212, 175, 55, 0.2)'
                  }}>
                    <p style={{
                      color: 'var(--majaz-text-muted)',
                      fontSize: '0.75rem',
                      lineHeight: '1.6'
                    }}>
                      <strong style={{ color: 'var(--gold)' }}>Secure Payment:</strong> You will be redirected to Stripe for secure payment processing. Your card information is never stored on our servers.
                    </p>
                  </div>
                </>
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: 'var(--spacing-2xl)',
                  color: 'var(--majaz-text-muted)'
                }}>
                  Select service options to see pricing
                </div>
              )}
            </GlassCard>
          </div>
        </div>
      </form>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
