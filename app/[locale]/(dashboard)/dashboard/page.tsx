'use client'

import React, { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import GlassCard from '@/components/majaz/GlassCard'
import Button from '@/components/majaz/Button'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface StatCard {
  label: string
  value: string | number
  change?: string
  icon: string
}

interface Request {
  id: string
  vehicle: string
  status: string
  date: string
  amount: string
}

export default function DashboardPage() {
  const t = useTranslations('dashboard')
  const tRequests = useTranslations('requests')
  const tCommon = useTranslations('common')

  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState('Guest')
  const [stats, setStats] = useState<StatCard[]>([])
  const [recentRequests, setRecentRequests] = useState<Request[]>([])

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setUserName('Ahmed')
      setStats([
        { label: t('stats.activeRequests'), value: 3, change: '+2', icon: '📋' },
        { label: t('stats.completedRequests'), value: 12, change: '+5', icon: '✅' },
        { label: t('stats.totalSpent'), value: 'AED 1,247', icon: '💰' },
        { label: t('stats.savedVehicles'), value: 8, icon: '⭐' }
      ])
      setRecentRequests([
        {
          id: 'REQ-001',
          vehicle: '2023 Toyota Land Cruiser',
          status: 'completed',
          date: '2024-11-05',
          amount: 'AED 169'
        },
        {
          id: 'REQ-002',
          vehicle: '2022 Mercedes-Benz G-Class',
          status: 'analyzing',
          date: '2024-11-07',
          amount: 'AED 209'
        },
        {
          id: 'REQ-003',
          vehicle: '2024 Porsche Cayenne',
          status: 'scraping',
          date: '2024-11-08',
          amount: 'AED 89'
        },
        {
          id: 'REQ-004',
          vehicle: '2023 Range Rover Sport',
          status: 'pending_payment',
          date: '2024-11-09',
          amount: 'AED 49'
        },
        {
          id: 'REQ-005',
          vehicle: '2022 BMW X7',
          status: 'completed',
          date: '2024-11-03',
          amount: 'AED 169'
        }
      ])
      setLoading(false)
    }, 500)
  }, [t])

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
    datasets: [
      {
        label: 'Assessments',
        data: [2, 3, 1, 4, 2, 5, 3, 4, 6, 5, 8],
        borderColor: 'rgb(212, 175, 55)',
        backgroundColor: 'rgba(212, 175, 55, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(26, 26, 26, 0.9)',
        titleColor: '#D4AF37',
        bodyColor: '#FFFFF0',
        borderColor: '#D4AF37',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(212, 175, 55, 0.1)'
        },
        ticks: {
          color: '#FFFFF0'
        }
      },
      y: {
        grid: {
          color: 'rgba(212, 175, 55, 0.1)'
        },
        ticks: {
          color: '#FFFFF0'
        }
      }
    }
  }

  const getStatusBadge = (status: string) => {
    // Using MAJAZ brand colors only - Gold (#D4AF37) with varying opacity for status
    const statusConfig: Record<string, { bg: string; color: string; border: string }> = {
      completed: {
        bg: 'rgba(212, 175, 55, 0.2)',
        color: '#D4AF37',
        border: 'rgba(212, 175, 55, 0.4)'
      },
      analyzing: {
        bg: 'rgba(212, 175, 55, 0.15)',
        color: '#D4AF37',
        border: 'rgba(212, 175, 55, 0.3)'
      },
      scraping: {
        bg: 'rgba(212, 175, 55, 0.1)',
        color: '#D4AF37',
        border: 'rgba(212, 175, 55, 0.25)'
      },
      pending_payment: {
        bg: 'rgba(255, 255, 240, 0.1)',
        color: '#FFFFF0',
        border: 'rgba(255, 255, 240, 0.2)'
      },
      failed: {
        bg: 'rgba(17, 17, 17, 0.3)',
        color: '#FFFFF0',
        border: 'rgba(17, 17, 17, 0.5)'
      }
    }

    const config = statusConfig[status] || {
      bg: 'rgba(26, 26, 26, 0.3)',
      color: '#FFFFF0',
      border: 'rgba(26, 26, 26, 0.5)'
    }

    return (
      <span
        style={{
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '600',
          backgroundColor: config.bg,
          color: config.color,
          border: `1px solid ${config.border}`
        }}
      >
        {tRequests(`status.${status}`)}
      </span>
    )
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--majaz-gold)'
      }}>
        <div>{tCommon('loading')}</div>
      </div>
    )
  }

  return (
    <div style={{ padding: 'var(--spacing-2xl)', minHeight: '100vh' }}>
      {/* Welcome Header */}
      <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontFamily: 'var(--font-display)',
          color: 'var(--majaz-gold)',
          marginBottom: 'var(--spacing-sm)'
        }}>
          {t('welcome', { name: userName })}
        </h1>
        <p style={{ color: 'var(--majaz-text-muted)', fontSize: '1.1rem' }}>
          {t('title')}
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 'var(--spacing-lg)',
        marginBottom: 'var(--spacing-2xl)'
      }}>
        {stats.map((stat, index) => (
          <GlassCard key={index} hover={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{
                  color: 'var(--majaz-text-muted)',
                  fontSize: '0.875rem',
                  marginBottom: 'var(--spacing-xs)'
                }}>
                  {stat.label}
                </p>
                <h3 style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: 'var(--majaz-gold)',
                  marginBottom: 'var(--spacing-xs)'
                }}>
                  {stat.value}
                </h3>
                {stat.change && (
                  <span style={{
                    color: '#10B981',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    {stat.change} this month
                  </span>
                )}
              </div>
              <div style={{ fontSize: '2rem' }}>{stat.icon}</div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Chart */}
      <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
        <GlassCard>
          <h2 style={{
            fontSize: '1.5rem',
            color: 'var(--majaz-gold)',
            marginBottom: 'var(--spacing-lg)',
            fontFamily: 'var(--font-display)'
          }}>
            Requests Over Time
          </h2>
          <div style={{ height: '300px' }}>
            <Line data={chartData} options={chartOptions} />
          </div>
        </GlassCard>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
        gap: 'var(--spacing-xl)'
      }}>
        {/* Recent Requests */}
        <GlassCard>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 'var(--spacing-lg)'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              color: 'var(--majaz-gold)',
              fontFamily: 'var(--font-display)'
            }}>
              {t('recentRequests')}
            </h2>
            <Button variant="outline" size="sm" href="/dashboard/requests">
              {t('quickActions.viewAll')}
            </Button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            {recentRequests.map((request) => (
              <div
                key={request.id}
                style={{
                  padding: 'var(--spacing-md)',
                  background: 'rgba(212, 175, 55, 0.05)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-base)'
                }}
                onClick={() => window.location.href = `/dashboard/requests/${request.id}`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--majaz-gold)'
                  e.currentTarget.style.transform = 'translateX(4px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.2)'
                  e.currentTarget.style.transform = 'translateX(0)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      color: 'var(--majaz-ivory)',
                      fontSize: '1rem',
                      marginBottom: 'var(--spacing-xs)'
                    }}>
                      {request.vehicle}
                    </h4>
                    <p style={{
                      color: 'var(--majaz-text-muted)',
                      fontSize: '0.875rem',
                      marginBottom: 'var(--spacing-xs)'
                    }}>
                      {request.id} • {request.date}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    {getStatusBadge(request.status)}
                    <p style={{
                      color: 'var(--majaz-gold)',
                      fontSize: '0.875rem',
                      marginTop: 'var(--spacing-xs)',
                      fontWeight: '600'
                    }}>
                      {request.amount}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Quick Actions */}
        <GlassCard>
          <h2 style={{
            fontSize: '1.5rem',
            color: 'var(--majaz-gold)',
            marginBottom: 'var(--spacing-lg)',
            fontFamily: 'var(--font-display)'
          }}>
            {t('quickActions.title')}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            <Button variant="primary" size="lg" href="/dashboard/requests/new">
              {t('quickActions.newAssessment')}
            </Button>
            <Button variant="secondary" size="md" href="/dashboard/requests">
              {t('quickActions.viewAll')}
            </Button>
            <Button variant="outline" size="md" href="/contact">
              {t('quickActions.contactSupport')}
            </Button>
          </div>

          <div style={{
            marginTop: 'var(--spacing-xl)',
            padding: 'var(--spacing-md)',
            background: 'rgba(212, 175, 55, 0.1)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(212, 175, 55, 0.3)'
          }}>
            <h3 style={{
              color: 'var(--majaz-gold)',
              fontSize: '1rem',
              marginBottom: 'var(--spacing-sm)'
            }}>
              Need Help?
            </h3>
            <p style={{
              color: 'var(--majaz-text-muted)',
              fontSize: '0.875rem',
              marginBottom: 'var(--spacing-md)',
              lineHeight: '1.6'
            }}>
              Our concierge team is available to assist you with any questions about your assessments.
            </p>
            <Button variant="outline" size="sm" href="/contact">
              Contact Concierge
            </Button>
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
