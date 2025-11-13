'use client'

import React, { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import GlassCard from '@/components/majaz/GlassCard'
import Button from '@/components/majaz/Button'

// Profile form validation schema
const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  language: z.enum(['en', 'ar']),
  currency: z.enum(['AED', 'USD', 'EUR'])
})

type ProfileFormData = z.infer<typeof profileSchema>

// Password change validation schema
const passwordSchema = z.object({
  currentPassword: z.string().min(8, 'Password must be at least 8 characters'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Password must be at least 8 characters')
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

type PasswordFormData = z.infer<typeof passwordSchema>

export default function ProfilePage() {
  const t = useTranslations('navigation')
  const tAuth = useTranslations('auth.register')
  const tCommon = useTranslations('common')

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [changingPassword, setChangingPassword] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  // Profile form
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
    reset: resetProfile
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      language: 'en',
      currency: 'AED'
    }
  })

  // Password form
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    reset: resetPassword
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema)
  })

  useEffect(() => {
    // Simulate loading user data
    setTimeout(() => {
      resetProfile({
        name: 'Ahmed Al-Rashid',
        email: 'ahmed@example.com',
        phone: '+971501234567',
        language: 'en',
        currency: 'AED'
      })
      setLoading(false)
    }, 500)
  }, [resetProfile])

  const onSubmitProfile = async (data: ProfileFormData) => {
    setSaving(true)

    // Simulate API call
    setTimeout(() => {
      console.log('Saving profile:', data)
      alert('Profile updated successfully!')
      setSaving(false)
    }, 1000)
  }

  const onSubmitPassword = async (data: PasswordFormData) => {
    setChangingPassword(true)

    // Simulate API call
    setTimeout(() => {
      console.log('Changing password')
      alert('Password changed successfully!')
      resetPassword()
      setChangingPassword(false)
    }, 1000)
  }

  const handleDeleteAccount = async () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true)
      return
    }

    // Simulate API call
    console.log('Deleting account...')
    alert('Account deletion requested. You will receive a confirmation email.')
    setShowDeleteConfirm(false)
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--gold)'
      }}>
        <div>{tCommon('loading')}</div>
      </div>
    )
  }

  return (
    <div style={{ padding: 'var(--spacing-2xl)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontFamily: 'var(--font-display)',
          color: 'var(--gold)',
          marginBottom: 'var(--spacing-xs)'
        }}>
          {t('profile')}
        </h1>
        <p style={{ color: 'var(--majaz-text-muted)' }}>
          Manage your account settings and preferences
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
        gap: 'var(--spacing-xl)'
      }}>
        {/* Profile Information */}
        <GlassCard>
          <h2 style={{
            fontSize: '1.5rem',
            color: 'var(--gold)',
            marginBottom: 'var(--spacing-lg)',
            fontFamily: 'var(--font-display)'
          }}>
            Profile Information
          </h2>

          <form onSubmit={handleSubmitProfile(onSubmitProfile)}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
              {/* Name */}
              <div>
                <label style={{
                  display: 'block',
                  color: 'var(--gold)',
                  fontSize: '0.875rem',
                  marginBottom: 'var(--spacing-xs)',
                  fontWeight: '600'
                }}>
                  {tAuth('name')}
                </label>
                <input
                  type="text"
                  {...registerProfile('name')}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    background: 'rgba(212, 175, 55, 0.05)',
                    border: `1px solid ${profileErrors.name ? '#D4AF37' : 'rgba(212, 175, 55, 0.3)'}`,
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--majaz-ivory)',
                    fontSize: '0.875rem'
                  }}
                />
                {profileErrors.name && (
                  <p style={{ color: '#D4AF37', fontSize: '0.75rem', marginTop: 'var(--spacing-xs)' }}>
                    {profileErrors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label style={{
                  display: 'block',
                  color: 'var(--gold)',
                  fontSize: '0.875rem',
                  marginBottom: 'var(--spacing-xs)',
                  fontWeight: '600'
                }}>
                  {tAuth('email')}
                </label>
                <input
                  type="email"
                  {...registerProfile('email')}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    background: 'rgba(212, 175, 55, 0.05)',
                    border: `1px solid ${profileErrors.email ? '#D4AF37' : 'rgba(212, 175, 55, 0.3)'}`,
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--majaz-ivory)',
                    fontSize: '0.875rem'
                  }}
                />
                {profileErrors.email && (
                  <p style={{ color: '#D4AF37', fontSize: '0.75rem', marginTop: 'var(--spacing-xs)' }}>
                    {profileErrors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label style={{
                  display: 'block',
                  color: 'var(--gold)',
                  fontSize: '0.875rem',
                  marginBottom: 'var(--spacing-xs)',
                  fontWeight: '600'
                }}>
                  {tAuth('phone')}
                </label>
                <input
                  type="tel"
                  {...registerProfile('phone')}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    background: 'rgba(212, 175, 55, 0.05)',
                    border: `1px solid ${profileErrors.phone ? '#D4AF37' : 'rgba(212, 175, 55, 0.3)'}`,
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--majaz-ivory)',
                    fontSize: '0.875rem'
                  }}
                />
                {profileErrors.phone && (
                  <p style={{ color: '#D4AF37', fontSize: '0.75rem', marginTop: 'var(--spacing-xs)' }}>
                    {profileErrors.phone.message}
                  </p>
                )}
              </div>

              {/* Language */}
              <div>
                <label style={{
                  display: 'block',
                  color: 'var(--gold)',
                  fontSize: '0.875rem',
                  marginBottom: 'var(--spacing-xs)',
                  fontWeight: '600'
                }}>
                  {tAuth('language')}
                </label>
                <select
                  {...registerProfile('language')}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    background: 'rgba(212, 175, 55, 0.05)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--majaz-ivory)',
                    fontSize: '0.875rem'
                  }}
                >
                  <option value="en">English</option>
                  <option value="ar">العربية (Arabic)</option>
                </select>
              </div>

              {/* Currency */}
              <div>
                <label style={{
                  display: 'block',
                  color: 'var(--gold)',
                  fontSize: '0.875rem',
                  marginBottom: 'var(--spacing-xs)',
                  fontWeight: '600'
                }}>
                  {tCommon('currency')}
                </label>
                <select
                  {...registerProfile('currency')}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    background: 'rgba(212, 175, 55, 0.05)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--majaz-ivory)',
                    fontSize: '0.875rem'
                  }}
                >
                  <option value="AED">AED (UAE Dirham)</option>
                  <option value="USD">USD (US Dollar)</option>
                  <option value="EUR">EUR (Euro)</option>
                </select>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={saving}
                disabled={saving}
              >
                {saving ? 'Saving...' : tCommon('save')}
              </Button>
            </div>
          </form>
        </GlassCard>

        {/* Password Change */}
        <GlassCard>
          <h2 style={{
            fontSize: '1.5rem',
            color: 'var(--gold)',
            marginBottom: 'var(--spacing-lg)',
            fontFamily: 'var(--font-display)'
          }}>
            Change Password
          </h2>

          <form onSubmit={handleSubmitPassword(onSubmitPassword)}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
              {/* Current Password */}
              <div>
                <label style={{
                  display: 'block',
                  color: 'var(--gold)',
                  fontSize: '0.875rem',
                  marginBottom: 'var(--spacing-xs)',
                  fontWeight: '600'
                }}>
                  Current Password
                </label>
                <input
                  type="password"
                  {...registerPassword('currentPassword')}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    background: 'rgba(212, 175, 55, 0.05)',
                    border: `1px solid ${passwordErrors.currentPassword ? '#D4AF37' : 'rgba(212, 175, 55, 0.3)'}`,
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--majaz-ivory)',
                    fontSize: '0.875rem'
                  }}
                />
                {passwordErrors.currentPassword && (
                  <p style={{ color: '#D4AF37', fontSize: '0.75rem', marginTop: 'var(--spacing-xs)' }}>
                    {passwordErrors.currentPassword.message}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label style={{
                  display: 'block',
                  color: 'var(--gold)',
                  fontSize: '0.875rem',
                  marginBottom: 'var(--spacing-xs)',
                  fontWeight: '600'
                }}>
                  New Password
                </label>
                <input
                  type="password"
                  {...registerPassword('newPassword')}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    background: 'rgba(212, 175, 55, 0.05)',
                    border: `1px solid ${passwordErrors.newPassword ? '#D4AF37' : 'rgba(212, 175, 55, 0.3)'}`,
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--majaz-ivory)',
                    fontSize: '0.875rem'
                  }}
                />
                {passwordErrors.newPassword && (
                  <p style={{ color: '#D4AF37', fontSize: '0.75rem', marginTop: 'var(--spacing-xs)' }}>
                    {passwordErrors.newPassword.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label style={{
                  display: 'block',
                  color: 'var(--gold)',
                  fontSize: '0.875rem',
                  marginBottom: 'var(--spacing-xs)',
                  fontWeight: '600'
                }}>
                  Confirm New Password
                </label>
                <input
                  type="password"
                  {...registerPassword('confirmPassword')}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    background: 'rgba(212, 175, 55, 0.05)',
                    border: `1px solid ${passwordErrors.confirmPassword ? '#D4AF37' : 'rgba(212, 175, 55, 0.3)'}`,
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--majaz-ivory)',
                    fontSize: '0.875rem'
                  }}
                />
                {passwordErrors.confirmPassword && (
                  <p style={{ color: '#D4AF37', fontSize: '0.75rem', marginTop: 'var(--spacing-xs)' }}>
                    {passwordErrors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="secondary"
                size="lg"
                loading={changingPassword}
                disabled={changingPassword}
              >
                {changingPassword ? 'Changing...' : 'Change Password'}
              </Button>
            </div>
          </form>
        </GlassCard>

        {/* Delete Account */}
        <GlassCard>
          <h2 style={{
            fontSize: '1.5rem',
            color: '#D4AF37',
            marginBottom: 'var(--spacing-lg)',
            fontFamily: 'var(--font-display)'
          }}>
            Danger Zone
          </h2>

          <div style={{
            padding: 'var(--spacing-lg)',
            background: 'rgba(212, 175, 55, 0.1)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            marginBottom: 'var(--spacing-md)'
          }}>
            <h3 style={{
              color: '#D4AF37',
              fontSize: '1rem',
              marginBottom: 'var(--spacing-sm)',
              fontWeight: '600'
            }}>
              Delete Account
            </h3>
            <p style={{
              color: 'var(--majaz-text-muted)',
              fontSize: '0.875rem',
              lineHeight: '1.6',
              marginBottom: 'var(--spacing-md)'
            }}>
              Once you delete your account, there is no going back. All your data, including assessment history and reports, will be permanently deleted.
            </p>

            {showDeleteConfirm && (
              <div style={{
                padding: 'var(--spacing-md)',
                background: 'rgba(212, 175, 55, 0.2)',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--spacing-md)'
              }}>
                <p style={{
                  color: '#D4AF37',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  marginBottom: 'var(--spacing-sm)'
                }}>
                  Are you absolutely sure?
                </p>
                <p style={{
                  color: 'var(--majaz-text-muted)',
                  fontSize: '0.75rem',
                  marginBottom: 'var(--spacing-md)'
                }}>
                  This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
                </p>
              </div>
            )}

            <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
              {showDeleteConfirm ? (
                <>
                  <button
                    onClick={handleDeleteAccount}
                    style={{
                      padding: 'var(--spacing-md) var(--spacing-lg)',
                      background: '#D4AF37',
                      color: 'white',
                      border: 'none',
                      borderRadius: 'var(--radius-md)',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}
                  >
                    Yes, Delete My Account
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    style={{
                      padding: 'var(--spacing-md) var(--spacing-lg)',
                      background: 'transparent',
                      color: 'var(--majaz-ivory)',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      borderRadius: 'var(--radius-md)',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleDeleteAccount}
                  style={{
                    padding: 'var(--spacing-md) var(--spacing-lg)',
                    background: 'transparent',
                    color: '#D4AF37',
                    border: '2px solid #D4AF37',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                  }}
                >
                  Delete Account
                </button>
              )}
            </div>
          </div>
        </GlassCard>

        {/* Account Stats */}
        <GlassCard>
          <h2 style={{
            fontSize: '1.5rem',
            color: 'var(--gold)',
            marginBottom: 'var(--spacing-lg)',
            fontFamily: 'var(--font-display)'
          }}>
            Account Overview
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            <div style={{
              padding: 'var(--spacing-md)',
              background: 'rgba(212, 175, 55, 0.05)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(212, 175, 55, 0.2)'
            }}>
              <p style={{
                color: 'var(--majaz-text-muted)',
                fontSize: '0.75rem',
                marginBottom: 'var(--spacing-xs)'
              }}>
                Member Since
              </p>
              <p style={{
                color: 'var(--majaz-ivory)',
                fontSize: '1rem',
                fontWeight: '600'
              }}>
                October 2024
              </p>
            </div>

            <div style={{
              padding: 'var(--spacing-md)',
              background: 'rgba(212, 175, 55, 0.05)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(212, 175, 55, 0.2)'
            }}>
              <p style={{
                color: 'var(--majaz-text-muted)',
                fontSize: '0.75rem',
                marginBottom: 'var(--spacing-xs)'
              }}>
                Total Assessments
              </p>
              <p style={{
                color: 'var(--majaz-ivory)',
                fontSize: '1rem',
                fontWeight: '600'
              }}>
                15 Requests
              </p>
            </div>

            <div style={{
              padding: 'var(--spacing-md)',
              background: 'rgba(212, 175, 55, 0.05)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(212, 175, 55, 0.2)'
            }}>
              <p style={{
                color: 'var(--majaz-text-muted)',
                fontSize: '0.75rem',
                marginBottom: 'var(--spacing-xs)'
              }}>
                Total Spent
              </p>
              <p style={{
                color: 'var(--gold)',
                fontSize: '1.25rem',
                fontWeight: '700'
              }}>
                AED 1,893
              </p>
            </div>

            <div style={{
              padding: 'var(--spacing-md)',
              background: 'rgba(212, 175, 55, 0.1)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(212, 175, 55, 0.3)'
            }}>
              <p style={{
                color: '#D4AF37',
                fontSize: '0.875rem',
                lineHeight: '1.6'
              }}>
                <strong>Premium Member</strong><br />
                You're eligible for priority support and exclusive offers.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

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
