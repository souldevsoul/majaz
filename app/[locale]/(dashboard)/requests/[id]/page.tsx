'use client'

import React, { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import GlassCard from '@/components/majaz/GlassCard'
import Button from '@/components/majaz/Button'

interface RequestDetail {
  id: string
  vehicle: {
    make: string
    model: string
    year: number
    vin?: string
    mileage?: string
    color?: string
    transmission?: string
    fuelType?: string
  }
  status: string
  mode: string
  createdAt: string
  amount: string
  url?: string
  estimate?: {
    fairValue: { min: number; max: number }
    safeMaxBid: number
    marketAverage: number
  }
  timeline: Array<{
    status: string
    timestamp: string
    note?: string
  }>
  report?: {
    url: string
    generatedAt: string
  }
  payment?: {
    status: string
    method: string
    transactionId: string
  }
  messages: Array<{
    id: string
    from: string
    message: string
    timestamp: string
    attachments?: string[]
  }>
}

export default function RequestDetailPage() {
  const params = useParams()
  const requestId = params.id as string

  const t = useTranslations('requests')
  const tCommon = useTranslations('common')

  const [loading, setLoading] = useState(true)
  const [request, setRequest] = useState<RequestDetail | null>(null)
  const [activeTab, setActiveTab] = useState<string>('summary')
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockRequest: RequestDetail = {
        id: requestId,
        vehicle: {
          make: 'Toyota',
          model: 'Land Cruiser',
          year: 2023,
          vin: 'JT3HJ8BV7N4068284',
          mileage: '35,000 km',
          color: 'Pearl White',
          transmission: 'Automatic',
          fuelType: 'Petrol'
        },
        status: 'completed',
        mode: 'onsite_inspection',
        createdAt: '2024-11-05T10:30:00',
        amount: 'AED 169',
        url: 'https://emiratesauction.com/vehicle/123',
        estimate: {
          fairValue: { min: 285000, max: 310000 },
          safeMaxBid: 295000,
          marketAverage: 297500
        },
        timeline: [
          { status: 'completed', timestamp: '2024-11-06T16:30:00', note: 'Report generated and sent' },
          { status: 'generating_report', timestamp: '2024-11-06T14:00:00' },
          { status: 'analyzing', timestamp: '2024-11-06T11:00:00' },
          { status: 'scraping', timestamp: '2024-11-05T13:00:00' },
          { status: 'payment_received', timestamp: '2024-11-05T10:35:00' },
          { status: 'pending_payment', timestamp: '2024-11-05T10:30:00', note: 'Request created' }
        ],
        report: {
          url: '/reports/REQ-001.pdf',
          generatedAt: '2024-11-06T16:30:00'
        },
        payment: {
          status: 'completed',
          method: 'Stripe',
          transactionId: 'pi_3K2JxL2eZvKYlo2C0L9P8xYZ'
        },
        messages: [
          {
            id: 'msg-1',
            from: 'operator',
            message: 'Your assessment is complete! The vehicle shows signs of minor wear consistent with the mileage. Full report attached.',
            timestamp: '2024-11-06T16:35:00',
            attachments: ['report.pdf']
          },
          {
            id: 'msg-2',
            from: 'user',
            message: 'Can you check the service history?',
            timestamp: '2024-11-06T12:00:00'
          },
          {
            id: 'msg-3',
            from: 'operator',
            message: 'We have begun the on-site inspection. Will update you with findings shortly.',
            timestamp: '2024-11-05T15:00:00'
          }
        ]
      }
      setRequest(mockRequest)
      setLoading(false)
    }, 500)
  }, [requestId])

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, { bg: string; text: string }> = {
      completed: { bg: '#10B98140', text: '#10B981' },
      analyzing: { bg: '#3B82F640', text: '#3B82F6' },
      scraping: { bg: '#8B5CF640', text: '#8B5CF6' },
      pending_payment: { bg: '#F59E0B40', text: '#F59E0B' },
      payment_received: { bg: '#06B6D440', text: '#06B6D4' },
      generating_report: { bg: '#EC489940', text: '#EC4899' },
      failed: { bg: '#EF444440', text: '#EF4444' }
    }

    const colors = statusColors[status] || { bg: '#6B728040', text: '#6B7280' }

    return (
      <span style={{
        padding: '6px 14px',
        borderRadius: '12px',
        fontSize: '0.875rem',
        fontWeight: '600',
        backgroundColor: colors.bg,
        color: colors.text,
        border: `1px solid ${colors.text}60`
      }}>
        {t(`status.${status}`)}
      </span>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    // Here you would send the message to the API
    console.log('Sending message:', newMessage)
    setNewMessage('')
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

  if (!request) {
    return (
      <div style={{ padding: 'var(--spacing-2xl)' }}>
        <GlassCard>
          <p style={{ color: 'var(--majaz-ivory)', textAlign: 'center' }}>
            Request not found
          </p>
        </GlassCard>
      </div>
    )
  }

  const tabs = [
    { id: 'summary', label: 'Summary' },
    { id: 'vehicle', label: 'Vehicle Info' },
    { id: 'estimate', label: 'Estimate' },
    { id: 'report', label: 'Report' },
    { id: 'payment', label: 'Payment' },
    { id: 'messages', label: 'Messages' }
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

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 'var(--spacing-md)'
        }}>
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              fontFamily: 'var(--font-display)',
              color: 'var(--majaz-gold)',
              marginBottom: 'var(--spacing-xs)'
            }}>
              {request.vehicle.year} {request.vehicle.make} {request.vehicle.model}
            </h1>
            <p style={{ color: 'var(--majaz-text-muted)' }}>
              {t('details.requestId')}: <span style={{ color: 'var(--majaz-gold)' }}>{request.id}</span>
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            {getStatusBadge(request.status)}
            <p style={{
              color: 'var(--majaz-text-muted)',
              fontSize: '0.875rem',
              marginTop: 'var(--spacing-xs)'
            }}>
              {formatDate(request.createdAt)}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: 'var(--spacing-md)',
        marginBottom: 'var(--spacing-xl)',
        overflowX: 'auto',
        paddingBottom: 'var(--spacing-sm)'
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: 'var(--spacing-md) var(--spacing-lg)',
              background: activeTab === tab.id ? 'var(--majaz-gradient-gold)' : 'rgba(212, 175, 55, 0.1)',
              color: activeTab === tab.id ? 'var(--majaz-black)' : 'var(--majaz-gold)',
              border: `1px solid ${activeTab === tab.id ? 'var(--majaz-gold)' : 'rgba(212, 175, 55, 0.3)'}`,
              borderRadius: 'var(--radius-md)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all var(--transition-base)',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: 'var(--spacing-xl)'
      }}>
        {/* Main Content */}
        <div style={{ gridColumn: activeTab === 'messages' ? 'span 1' : 'span 1' }}>
          {activeTab === 'summary' && (
            <GlassCard>
              <h2 style={{
                fontSize: '1.5rem',
                color: 'var(--majaz-gold)',
                marginBottom: 'var(--spacing-lg)',
                fontFamily: 'var(--font-display)'
              }}>
                Request Summary
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                <InfoRow label="Service Type" value={t(`mode.${request.mode}`)} />
                <InfoRow label="Status" value={getStatusBadge(request.status)} />
                <InfoRow label="Created" value={formatDate(request.createdAt)} />
                <InfoRow label="Amount Paid" value={request.amount} />
                {request.url && <InfoRow label="Listing URL" value={
                  <a href={request.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--majaz-gold)' }}>
                    View Listing →
                  </a>
                } />}
              </div>
            </GlassCard>
          )}

          {activeTab === 'vehicle' && (
            <GlassCard>
              <h2 style={{
                fontSize: '1.5rem',
                color: 'var(--majaz-gold)',
                marginBottom: 'var(--spacing-lg)',
                fontFamily: 'var(--font-display)'
              }}>
                Vehicle Information
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                <InfoRow label="Make" value={request.vehicle.make} />
                <InfoRow label="Model" value={request.vehicle.model} />
                <InfoRow label="Year" value={request.vehicle.year} />
                {request.vehicle.vin && <InfoRow label="VIN" value={request.vehicle.vin} />}
                {request.vehicle.mileage && <InfoRow label="Mileage" value={request.vehicle.mileage} />}
                {request.vehicle.color && <InfoRow label="Color" value={request.vehicle.color} />}
                {request.vehicle.transmission && <InfoRow label="Transmission" value={request.vehicle.transmission} />}
                {request.vehicle.fuelType && <InfoRow label="Fuel Type" value={request.vehicle.fuelType} />}
              </div>
            </GlassCard>
          )}

          {activeTab === 'estimate' && (
            <GlassCard>
              <h2 style={{
                fontSize: '1.5rem',
                color: 'var(--majaz-gold)',
                marginBottom: 'var(--spacing-lg)',
                fontFamily: 'var(--font-display)'
              }}>
                Market Estimate
              </h2>

              {request.estimate ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                  <div style={{
                    padding: 'var(--spacing-lg)',
                    background: 'rgba(212, 175, 55, 0.1)',
                    borderRadius: 'var(--radius-lg)',
                    border: '2px solid var(--majaz-gold)'
                  }}>
                    <p style={{
                      color: 'var(--majaz-text-muted)',
                      fontSize: '0.875rem',
                      marginBottom: 'var(--spacing-xs)'
                    }}>
                      Safe Maximum Bid
                    </p>
                    <p style={{
                      fontSize: '2.5rem',
                      fontWeight: '700',
                      color: 'var(--majaz-gold)',
                      fontFamily: 'var(--font-display)'
                    }}>
                      AED {request.estimate.safeMaxBid.toLocaleString()}
                    </p>
                  </div>

                  <InfoRow
                    label="Fair Value Range"
                    value={`AED ${request.estimate.fairValue.min.toLocaleString()} - ${request.estimate.fairValue.max.toLocaleString()}`}
                  />
                  <InfoRow
                    label="Market Average"
                    value={`AED ${request.estimate.marketAverage.toLocaleString()}`}
                  />

                  <div style={{
                    padding: 'var(--spacing-md)',
                    background: 'rgba(16, 185, 129, 0.1)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}>
                    <p style={{ color: '#10B981', fontSize: '0.875rem', lineHeight: '1.6' }}>
                      <strong>Recommendation:</strong> Based on market analysis, we recommend not exceeding the safe maximum bid of AED {request.estimate.safeMaxBid.toLocaleString()}.
                    </p>
                  </div>
                </div>
              ) : (
                <p style={{ color: 'var(--majaz-text-muted)' }}>
                  Estimate not yet available
                </p>
              )}
            </GlassCard>
          )}

          {activeTab === 'report' && (
            <GlassCard>
              <h2 style={{
                fontSize: '1.5rem',
                color: 'var(--majaz-gold)',
                marginBottom: 'var(--spacing-lg)',
                fontFamily: 'var(--font-display)'
              }}>
                Assessment Report
              </h2>

              {request.report ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                  <InfoRow label="Generated" value={formatDate(request.report.generatedAt)} />

                  <div style={{
                    padding: 'var(--spacing-lg)',
                    background: 'rgba(212, 175, 55, 0.1)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>📄</div>
                    <h3 style={{
                      color: 'var(--majaz-gold)',
                      fontSize: '1.125rem',
                      marginBottom: 'var(--spacing-md)'
                    }}>
                      Your comprehensive report is ready
                    </h3>
                    <Button variant="primary" href={request.report.url}>
                      {t('actions.downloadPDF')}
                    </Button>
                  </div>
                </div>
              ) : (
                <p style={{ color: 'var(--majaz-text-muted)' }}>
                  Report is being generated. You will be notified when it's ready.
                </p>
              )}
            </GlassCard>
          )}

          {activeTab === 'payment' && (
            <GlassCard>
              <h2 style={{
                fontSize: '1.5rem',
                color: 'var(--majaz-gold)',
                marginBottom: 'var(--spacing-lg)',
                fontFamily: 'var(--font-display)'
              }}>
                Payment Details
              </h2>

              {request.payment && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                  <InfoRow label="Amount" value={request.amount} />
                  <InfoRow label="Status" value={
                    <span style={{
                      color: request.payment.status === 'completed' ? '#10B981' : '#F59E0B',
                      fontWeight: '600'
                    }}>
                      {request.payment.status === 'completed' ? 'Completed' : 'Pending'}
                    </span>
                  } />
                  <InfoRow label="Method" value={request.payment.method} />
                  <InfoRow label="Transaction ID" value={request.payment.transactionId} />
                </div>
              )}
            </GlassCard>
          )}

          {activeTab === 'messages' && (
            <GlassCard>
              <h2 style={{
                fontSize: '1.5rem',
                color: 'var(--majaz-gold)',
                marginBottom: 'var(--spacing-lg)',
                fontFamily: 'var(--font-display)'
              }}>
                Messages
              </h2>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-md)',
                marginBottom: 'var(--spacing-lg)'
              }}>
                {request.messages.map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      padding: 'var(--spacing-md)',
                      background: msg.from === 'operator' ? 'rgba(212, 175, 55, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                      borderRadius: 'var(--radius-md)',
                      border: `1px solid ${msg.from === 'operator' ? 'rgba(212, 175, 55, 0.3)' : 'rgba(59, 130, 246, 0.3)'}`,
                      marginLeft: msg.from === 'user' ? 'var(--spacing-2xl)' : '0',
                      marginRight: msg.from === 'operator' ? 'var(--spacing-2xl)' : '0'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 'var(--spacing-xs)'
                    }}>
                      <span style={{
                        color: 'var(--majaz-gold)',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                      }}>
                        {msg.from === 'operator' ? 'MAJAZ Team' : 'You'}
                      </span>
                      <span style={{
                        color: 'var(--majaz-text-muted)',
                        fontSize: '0.75rem'
                      }}>
                        {formatDate(msg.timestamp)}
                      </span>
                    </div>
                    <p style={{ color: 'var(--majaz-ivory)', lineHeight: '1.6' }}>
                      {msg.message}
                    </p>
                    {msg.attachments && msg.attachments.length > 0 && (
                      <div style={{ marginTop: 'var(--spacing-sm)' }}>
                        {msg.attachments.map((attachment, i) => (
                          <a
                            key={i}
                            href="#"
                            style={{
                              color: 'var(--majaz-gold)',
                              fontSize: '0.875rem',
                              textDecoration: 'underline'
                            }}
                          >
                            📎 {attachment}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* New Message Form */}
              <div style={{
                padding: 'var(--spacing-md)',
                background: 'rgba(212, 175, 55, 0.05)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(212, 175, 55, 0.3)'
              }}>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  style={{
                    width: '100%',
                    minHeight: '100px',
                    padding: 'var(--spacing-md)',
                    background: 'rgba(212, 175, 55, 0.05)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--majaz-ivory)',
                    fontSize: '0.875rem',
                    resize: 'vertical',
                    marginBottom: 'var(--spacing-md)'
                  }}
                />
                <Button variant="primary" size="md" onClick={handleSendMessage}>
                  Send Message
                </Button>
              </div>
            </GlassCard>
          )}
        </div>

        {/* Timeline Sidebar */}
        {activeTab !== 'messages' && (
          <GlassCard>
            <h2 style={{
              fontSize: '1.5rem',
              color: 'var(--majaz-gold)',
              marginBottom: 'var(--spacing-lg)',
              fontFamily: 'var(--font-display)'
            }}>
              Timeline
            </h2>

            <div style={{ position: 'relative' }}>
              {request.timeline.map((event, index) => (
                <div
                  key={index}
                  style={{
                    position: 'relative',
                    paddingLeft: 'var(--spacing-xl)',
                    paddingBottom: 'var(--spacing-lg)',
                    borderLeft: index === request.timeline.length - 1 ? 'none' : '2px solid rgba(212, 175, 55, 0.3)'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    left: '-8px',
                    top: '4px',
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: index === 0 ? 'var(--majaz-gold)' : 'rgba(212, 175, 55, 0.5)',
                    border: '2px solid var(--majaz-background)'
                  }} />

                  <div>
                    <p style={{
                      color: 'var(--majaz-ivory)',
                      fontWeight: '600',
                      marginBottom: 'var(--spacing-xs)'
                    }}>
                      {t(`status.${event.status}`)}
                    </p>
                    <p style={{
                      color: 'var(--majaz-text-muted)',
                      fontSize: '0.75rem',
                      marginBottom: 'var(--spacing-xs)'
                    }}>
                      {formatDate(event.timestamp)}
                    </p>
                    {event.note && (
                      <p style={{
                        color: 'var(--majaz-text-muted)',
                        fontSize: '0.875rem',
                        fontStyle: 'italic'
                      }}>
                        {event.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        )}
      </div>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 'var(--spacing-md)',
      background: 'rgba(212, 175, 55, 0.05)',
      borderRadius: 'var(--radius-md)',
      border: '1px solid rgba(212, 175, 55, 0.2)'
    }}>
      <span style={{ color: 'var(--majaz-text-muted)', fontSize: '0.875rem' }}>
        {label}
      </span>
      <span style={{ color: 'var(--majaz-ivory)', fontWeight: '600', textAlign: 'right' }}>
        {value}
      </span>
    </div>
  )
}
