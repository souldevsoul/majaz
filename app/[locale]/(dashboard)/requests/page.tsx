'use client'

import React, { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import GlassCard from '@/components/majaz/GlassCard'
import Button from '@/components/majaz/Button'

interface Request {
  id: string
  vehicle: {
    make: string
    model: string
    year: number
  }
  status: string
  mode: string
  createdAt: string
  amount: string
  url?: string
}

export default function RequestsPage() {
  const t = useTranslations('requests')
  const tCommon = useTranslations('common')

  const [loading, setLoading] = useState(true)
  const [requests, setRequests] = useState<Request[]>([])
  const [filteredRequests, setFilteredRequests] = useState<Request[]>([])

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [modeFilter, setModeFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '',
    end: ''
  })

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockRequests: Request[] = [
        {
          id: 'REQ-001',
          vehicle: { make: 'Toyota', model: 'Land Cruiser', year: 2023 },
          status: 'completed',
          mode: 'onsite_inspection',
          createdAt: '2024-11-05T10:30:00',
          amount: 'AED 169',
          url: 'https://emiratesauction.com/vehicle/123'
        },
        {
          id: 'REQ-002',
          vehicle: { make: 'Mercedes-Benz', model: 'G-Class', year: 2022 },
          status: 'analyzing',
          mode: 'remote_assessment',
          createdAt: '2024-11-07T14:20:00',
          amount: 'AED 209'
        },
        {
          id: 'REQ-003',
          vehicle: { make: 'Porsche', model: 'Cayenne', year: 2024 },
          status: 'scraping',
          mode: 'remote_assessment',
          createdAt: '2024-11-08T09:15:00',
          amount: 'AED 89'
        },
        {
          id: 'REQ-004',
          vehicle: { make: 'Range Rover', model: 'Sport', year: 2023 },
          status: 'pending_payment',
          mode: 'onsite_inspection',
          createdAt: '2024-11-09T11:45:00',
          amount: 'AED 49'
        },
        {
          id: 'REQ-005',
          vehicle: { make: 'BMW', model: 'X7', year: 2022 },
          status: 'completed',
          mode: 'remote_assessment',
          createdAt: '2024-11-03T16:00:00',
          amount: 'AED 169'
        },
        {
          id: 'REQ-006',
          vehicle: { make: 'Audi', model: 'Q8', year: 2023 },
          status: 'completed',
          mode: 'onsite_inspection',
          createdAt: '2024-10-28T13:30:00',
          amount: 'AED 209'
        },
        {
          id: 'REQ-007',
          vehicle: { make: 'Lexus', model: 'LX 600', year: 2024 },
          status: 'failed',
          mode: 'remote_assessment',
          createdAt: '2024-10-25T08:45:00',
          amount: 'AED 89'
        },
        {
          id: 'REQ-008',
          vehicle: { make: 'Nissan', model: 'Patrol', year: 2023 },
          status: 'completed',
          mode: 'sourcing',
          createdAt: '2024-10-20T10:00:00',
          amount: 'AED 59'
        }
      ]
      setRequests(mockRequests)
      setFilteredRequests(mockRequests)
      setLoading(false)
    }, 500)
  }, [])

  useEffect(() => {
    let filtered = [...requests]

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(req => req.status === statusFilter)
    }

    // Mode filter
    if (modeFilter !== 'all') {
      filtered = filtered.filter(req => req.mode === modeFilter)
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(req =>
        req.vehicle.make.toLowerCase().includes(query) ||
        req.vehicle.model.toLowerCase().includes(query) ||
        req.id.toLowerCase().includes(query)
      )
    }

    // Date range filter
    if (dateRange.start) {
      filtered = filtered.filter(req =>
        new Date(req.createdAt) >= new Date(dateRange.start)
      )
    }
    if (dateRange.end) {
      filtered = filtered.filter(req =>
        new Date(req.createdAt) <= new Date(dateRange.end)
      )
    }

    setFilteredRequests(filtered)
    setCurrentPage(1)
  }, [statusFilter, modeFilter, searchQuery, dateRange, requests])

  const getStatusBadge = (status: string) => {
    // Using MAJAZ brand colors only - Gold (#D4AF37) with varying opacity for different statuses
    const statusColors: Record<string, { bg: string; text: string }> = {
      completed: { bg: 'rgba(212, 175, 55, 0.2)', text: '#D4AF37' },
      analyzing: { bg: 'rgba(212, 175, 55, 0.15)', text: '#D4AF37' },
      scraping: { bg: 'rgba(212, 175, 55, 0.1)', text: '#D4AF37' },
      pending_payment: { bg: 'rgba(255, 255, 240, 0.1)', text: '#FFFFF0' },
      payment_received: { bg: 'rgba(212, 175, 55, 0.25)', text: '#D4AF37' },
      generating_report: { bg: 'rgba(212, 175, 55, 0.18)', text: '#D4AF37' },
      failed: { bg: 'rgba(17, 17, 17, 0.5)', text: '#111111' },
      refunded: { bg: 'rgba(26, 26, 26, 0.8)', text: '#1A1A1A' }
    }

    const colors = statusColors[status] || { bg: 'rgba(26, 26, 26, 0.5)', text: '#1A1A1A' }

    return (
      <span style={{
        padding: '6px 14px',
        borderRadius: '12px',
        fontSize: '0.75rem',
        fontWeight: '600',
        backgroundColor: colors.bg,
        color: colors.text,
        border: `1px solid ${colors.text}60`,
        whiteSpace: 'nowrap'
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

  // Pagination
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage)
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

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
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 'var(--spacing-xl)',
        flexWrap: 'wrap',
        gap: 'var(--spacing-md)'
      }}>
        <div>
          <h1 style={{
            fontSize: '2.5rem',
            fontFamily: 'var(--font-display)',
            color: 'var(--gold)',
            marginBottom: 'var(--spacing-xs)'
          }}>
            {t('title')}
          </h1>
          <p style={{ color: 'var(--majaz-text-muted)' }}>
            {filteredRequests.length} {filteredRequests.length === 1 ? 'request' : 'requests'}
          </p>
        </div>
        <Button variant="primary" href="/dashboard/requests/new">
          {t('new')}
        </Button>
      </div>

      {/* Filters */}
      <GlassCard style={{ marginBottom: 'var(--spacing-xl)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--spacing-md)'
        }}>
          {/* Search */}
          <div>
            <label style={{
              display: 'block',
              color: 'var(--gold)',
              fontSize: '0.875rem',
              marginBottom: 'var(--spacing-xs)',
              fontWeight: '600'
            }}>
              {tCommon('search')}
            </label>
            <input
              type="text"
              placeholder="Search by make, model, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: 'var(--spacing-sm)',
                background: 'rgba(212, 175, 55, 0.05)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--majaz-ivory)',
                fontSize: '0.875rem'
              }}
            />
          </div>

          {/* Status Filter */}
          <div>
            <label style={{
              display: 'block',
              color: 'var(--gold)',
              fontSize: '0.875rem',
              marginBottom: 'var(--spacing-xs)',
              fontWeight: '600'
            }}>
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                width: '100%',
                padding: 'var(--spacing-sm)',
                background: 'rgba(212, 175, 55, 0.05)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--majaz-ivory)',
                fontSize: '0.875rem'
              }}
            >
              <option value="all">All Statuses</option>
              <option value="pending_payment">Pending Payment</option>
              <option value="payment_received">Payment Received</option>
              <option value="scraping">Analyzing Listing</option>
              <option value="analyzing">Generating Estimate</option>
              <option value="generating_report">Creating Report</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>

          {/* Mode Filter */}
          <div>
            <label style={{
              display: 'block',
              color: 'var(--gold)',
              fontSize: '0.875rem',
              marginBottom: 'var(--spacing-xs)',
              fontWeight: '600'
            }}>
              Service Type
            </label>
            <select
              value={modeFilter}
              onChange={(e) => setModeFilter(e.target.value)}
              style={{
                width: '100%',
                padding: 'var(--spacing-sm)',
                background: 'rgba(212, 175, 55, 0.05)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--majaz-ivory)',
                fontSize: '0.875rem'
              }}
            >
              <option value="all">All Types</option>
              <option value="remote_assessment">Remote Assessment</option>
              <option value="onsite_inspection">On-Site Inspection</option>
              <option value="sourcing">Vehicle Sourcing</option>
              <option value="delegated_bidding">Delegated Bidding</option>
            </select>
          </div>

          {/* Date Range */}
          <div>
            <label style={{
              display: 'block',
              color: 'var(--gold)',
              fontSize: '0.875rem',
              marginBottom: 'var(--spacing-xs)',
              fontWeight: '600'
            }}>
              Date From
            </label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              style={{
                width: '100%',
                padding: 'var(--spacing-sm)',
                background: 'rgba(212, 175, 55, 0.05)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--majaz-ivory)',
                fontSize: '0.875rem'
              }}
            />
          </div>
        </div>

        {/* Clear Filters */}
        {(statusFilter !== 'all' || modeFilter !== 'all' || searchQuery || dateRange.start) && (
          <div style={{ marginTop: 'var(--spacing-md)' }}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setStatusFilter('all')
                setModeFilter('all')
                setSearchQuery('')
                setDateRange({ start: '', end: '' })
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </GlassCard>

      {/* Requests Table */}
      <GlassCard>
        {paginatedRequests.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: 'var(--spacing-2xl)',
            color: 'var(--majaz-text-muted)'
          }}>
            <p style={{ fontSize: '1.125rem', marginBottom: 'var(--spacing-md)' }}>
              No requests found
            </p>
            <Button variant="primary" href="/dashboard/requests/new">
              Create Your First Assessment
            </Button>
          </div>
        ) : (
          <>
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                minWidth: '800px'
              }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(212, 175, 55, 0.2)' }}>
                    <th style={tableHeaderStyle}>ID</th>
                    <th style={tableHeaderStyle}>Vehicle</th>
                    <th style={tableHeaderStyle}>Status</th>
                    <th style={tableHeaderStyle}>Service Type</th>
                    <th style={tableHeaderStyle}>Date</th>
                    <th style={tableHeaderStyle}>Amount</th>
                    <th style={tableHeaderStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedRequests.map((request) => (
                    <tr
                      key={request.id}
                      style={{
                        borderBottom: '1px solid rgba(212, 175, 55, 0.1)',
                        cursor: 'pointer',
                        transition: 'all var(--transition-base)'
                      }}
                      onClick={() => window.location.href = `/dashboard/requests/${request.id}`}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.05)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }}
                    >
                      <td style={tableCellStyle}>
                        <span style={{ color: 'var(--gold)', fontWeight: '600' }}>
                          {request.id}
                        </span>
                      </td>
                      <td style={tableCellStyle}>
                        <div>
                          <div style={{ color: 'var(--majaz-ivory)', fontWeight: '600' }}>
                            {request.vehicle.year} {request.vehicle.make}
                          </div>
                          <div style={{ color: 'var(--majaz-text-muted)', fontSize: '0.875rem' }}>
                            {request.vehicle.model}
                          </div>
                        </div>
                      </td>
                      <td style={tableCellStyle}>
                        {getStatusBadge(request.status)}
                      </td>
                      <td style={tableCellStyle}>
                        <span style={{ color: 'var(--majaz-ivory)' }}>
                          {t(`mode.${request.mode}`)}
                        </span>
                      </td>
                      <td style={tableCellStyle}>
                        <span style={{ color: 'var(--majaz-text-muted)', fontSize: '0.875rem' }}>
                          {formatDate(request.createdAt)}
                        </span>
                      </td>
                      <td style={tableCellStyle}>
                        <span style={{ color: 'var(--gold)', fontWeight: '600' }}>
                          {request.amount}
                        </span>
                      </td>
                      <td style={tableCellStyle}>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e?.stopPropagation()
                            window.location.href = `/dashboard/requests/${request.id}`
                          }}
                        >
                          {tCommon('view')}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 'var(--spacing-md)',
                marginTop: 'var(--spacing-xl)',
                paddingTop: 'var(--spacing-lg)',
                borderTop: '1px solid rgba(212, 175, 55, 0.2)'
              }}>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  {tCommon('previous')}
                </Button>

                <span style={{ color: 'var(--majaz-ivory)' }}>
                  Page {currentPage} of {totalPages}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  {tCommon('next')}
                </Button>
              </div>
            )}
          </>
        )}
      </GlassCard>
    </div>
  )
}

const tableHeaderStyle: React.CSSProperties = {
  padding: 'var(--spacing-md)',
  textAlign: 'left',
  color: 'var(--gold)',
  fontSize: '0.875rem',
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: '0.05em'
}

const tableCellStyle: React.CSSProperties = {
  padding: 'var(--spacing-md)',
  color: 'var(--majaz-ivory)'
}
