'use client'

import React, { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import GlassCard from '@/components/majaz/GlassCard'
import Button from '@/components/majaz/Button'

interface Message {
  id: string
  from: 'user' | 'operator'
  message: string
  timestamp: string
  attachments?: string[]
  read: boolean
}

interface MessageThread {
  requestId: string
  requestTitle: string
  status: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  messages: Message[]
}

export default function MessagesPage() {
  const t = useTranslations('navigation')
  const tCommon = useTranslations('common')

  const [loading, setLoading] = useState(true)
  const [threads, setThreads] = useState<MessageThread[]>([])
  const [selectedThread, setSelectedThread] = useState<MessageThread | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    // Simulate API call to fetch message threads
    setTimeout(() => {
      const mockThreads: MessageThread[] = [
        {
          requestId: 'REQ-001',
          requestTitle: '2023 Toyota Land Cruiser',
          status: 'completed',
          lastMessage: 'Your assessment is complete! The vehicle shows signs...',
          lastMessageTime: '2024-11-06T16:35:00',
          unreadCount: 0,
          messages: [
            {
              id: 'msg-1',
              from: 'operator',
              message: 'Your assessment is complete! The vehicle shows signs of minor wear consistent with the mileage. Full report attached.',
              timestamp: '2024-11-06T16:35:00',
              attachments: ['report.pdf'],
              read: true
            },
            {
              id: 'msg-2',
              from: 'user',
              message: 'Can you check the service history?',
              timestamp: '2024-11-06T12:00:00',
              read: true
            },
            {
              id: 'msg-3',
              from: 'operator',
              message: 'We have begun the on-site inspection. Will update you with findings shortly.',
              timestamp: '2024-11-05T15:00:00',
              read: true
            }
          ]
        },
        {
          requestId: 'REQ-002',
          requestTitle: '2022 Mercedes-Benz G-Class',
          status: 'analyzing',
          lastMessage: 'We are currently analyzing the market data for your...',
          lastMessageTime: '2024-11-07T10:20:00',
          unreadCount: 2,
          messages: [
            {
              id: 'msg-4',
              from: 'operator',
              message: 'We are currently analyzing the market data for your Mercedes-Benz G-Class. The initial findings show strong demand in the UAE market.',
              timestamp: '2024-11-07T10:20:00',
              read: false
            },
            {
              id: 'msg-5',
              from: 'operator',
              message: 'Thank you for your payment. Your request is now being processed.',
              timestamp: '2024-11-07T09:15:00',
              read: false
            },
            {
              id: 'msg-6',
              from: 'user',
              message: 'Looking forward to the assessment results.',
              timestamp: '2024-11-07T09:00:00',
              read: true
            }
          ]
        },
        {
          requestId: 'REQ-003',
          requestTitle: '2024 Porsche Cayenne',
          status: 'scraping',
          lastMessage: 'Your request has been received. Processing...',
          lastMessageTime: '2024-11-08T09:20:00',
          unreadCount: 1,
          messages: [
            {
              id: 'msg-7',
              from: 'operator',
              message: 'Your request has been received. We are currently extracting data from the listing.',
              timestamp: '2024-11-08T09:20:00',
              read: false
            }
          ]
        }
      ]

      setThreads(mockThreads)
      setLoading(false)
    }, 500)
  }, [])

  const handleThreadSelect = (thread: MessageThread) => {
    setSelectedThread(thread)
    // Mark messages as read
    const updatedThreads = threads.map(t => {
      if (t.requestId === thread.requestId) {
        return {
          ...t,
          unreadCount: 0,
          messages: t.messages.map(m => ({ ...m, read: true }))
        }
      }
      return t
    })
    setThreads(updatedThreads)
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedThread) return

    setSending(true)

    // Simulate sending message
    setTimeout(() => {
      const newMsg: Message = {
        id: `msg-${Date.now()}`,
        from: 'user',
        message: newMessage,
        timestamp: new Date().toISOString(),
        read: true
      }

      // Update selected thread
      const updatedThread = {
        ...selectedThread,
        messages: [...selectedThread.messages, newMsg],
        lastMessage: newMessage,
        lastMessageTime: newMsg.timestamp
      }

      setSelectedThread(updatedThread)

      // Update threads list
      const updatedThreads = threads.map(t =>
        t.requestId === selectedThread.requestId ? updatedThread : t
      )
      setThreads(updatedThreads)

      setNewMessage('')
      setSending(false)
    }, 500)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
      return `${diffInMinutes}m ago`
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
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

  const totalUnread = threads.reduce((sum, thread) => sum + thread.unreadCount, 0)

  return (
    <div style={{ padding: 'var(--spacing-2xl)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontFamily: 'var(--font-display)',
          color: 'var(--majaz-gold)',
          marginBottom: 'var(--spacing-xs)'
        }}>
          {t('messages')}
        </h1>
        <p style={{ color: 'var(--majaz-text-muted)' }}>
          {threads.length} {threads.length === 1 ? 'conversation' : 'conversations'}
          {totalUnread > 0 && ` • ${totalUnread} unread`}
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedThread ? '350px 1fr' : '1fr',
        gap: 'var(--spacing-xl)',
        minHeight: '600px'
      }}>
        {/* Thread List */}
        <GlassCard style={{ height: 'fit-content', maxHeight: '80vh', overflow: 'auto' }}>
          <h2 style={{
            fontSize: '1.25rem',
            color: 'var(--majaz-gold)',
            marginBottom: 'var(--spacing-lg)',
            fontFamily: 'var(--font-display)',
            position: 'sticky',
            top: 0,
            background: 'var(--majaz-bg-surface)',
            paddingBottom: 'var(--spacing-md)',
            borderBottom: '1px solid rgba(212, 175, 55, 0.2)'
          }}>
            All Conversations
          </h2>

          {threads.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: 'var(--spacing-2xl)',
              color: 'var(--majaz-text-muted)'
            }}>
              <p>No messages yet</p>
              <Button
                variant="primary"
                size="sm"
                href="/dashboard/requests/new"
                style={{ marginTop: 'var(--spacing-md)' }}
              >
                Create Assessment
              </Button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
              {threads.map((thread) => (
                <div
                  key={thread.requestId}
                  onClick={() => handleThreadSelect(thread)}
                  style={{
                    padding: 'var(--spacing-md)',
                    background: selectedThread?.requestId === thread.requestId
                      ? 'rgba(212, 175, 55, 0.15)'
                      : 'rgba(212, 175, 55, 0.05)',
                    border: `1px solid ${
                      selectedThread?.requestId === thread.requestId
                        ? 'var(--majaz-gold)'
                        : 'rgba(212, 175, 55, 0.2)'
                    }`,
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-base)',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedThread?.requestId !== thread.requestId) {
                      e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.5)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedThread?.requestId !== thread.requestId) {
                      e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.2)'
                    }
                  }}
                >
                  {thread.unreadCount > 0 && (
                    <div style={{
                      position: 'absolute',
                      top: 'var(--spacing-sm)',
                      right: 'var(--spacing-sm)',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: 'var(--majaz-gold)',
                      color: 'var(--majaz-black)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: '700'
                    }}>
                      {thread.unreadCount}
                    </div>
                  )}

                  <h3 style={{
                    color: 'var(--majaz-ivory)',
                    fontSize: '1rem',
                    fontWeight: '600',
                    marginBottom: 'var(--spacing-xs)'
                  }}>
                    {thread.requestTitle}
                  </h3>

                  <p style={{
                    color: 'var(--majaz-text-muted)',
                    fontSize: '0.75rem',
                    marginBottom: 'var(--spacing-xs)'
                  }}>
                    {thread.requestId}
                  </p>

                  <p style={{
                    color: 'var(--majaz-text-muted)',
                    fontSize: '0.875rem',
                    marginBottom: 'var(--spacing-xs)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    fontWeight: thread.unreadCount > 0 ? '600' : '400'
                  }}>
                    {thread.lastMessage}
                  </p>

                  <p style={{
                    color: 'var(--majaz-gold)',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {formatDate(thread.lastMessageTime)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </GlassCard>

        {/* Message Thread */}
        {selectedThread && (
          <GlassCard style={{
            display: 'flex',
            flexDirection: 'column',
            height: '80vh',
            overflow: 'hidden'
          }}>
            {/* Thread Header */}
            <div style={{
              paddingBottom: 'var(--spacing-md)',
              marginBottom: 'var(--spacing-md)',
              borderBottom: '1px solid rgba(212, 175, 55, 0.2)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h2 style={{
                    fontSize: '1.5rem',
                    color: 'var(--majaz-gold)',
                    marginBottom: 'var(--spacing-xs)',
                    fontFamily: 'var(--font-display)'
                  }}>
                    {selectedThread.requestTitle}
                  </h2>
                  <p style={{ color: 'var(--majaz-text-muted)', fontSize: '0.875rem' }}>
                    {selectedThread.requestId}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  href={`/dashboard/requests/${selectedThread.requestId}`}
                >
                  View Request
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-md)',
              marginBottom: 'var(--spacing-md)',
              paddingRight: 'var(--spacing-sm)'
            }}>
              {selectedThread.messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    padding: 'var(--spacing-md)',
                    background: msg.from === 'operator'
                      ? 'rgba(212, 175, 55, 0.1)'
                      : 'rgba(59, 130, 246, 0.1)',
                    borderRadius: 'var(--radius-md)',
                    border: `1px solid ${
                      msg.from === 'operator'
                        ? 'rgba(212, 175, 55, 0.3)'
                        : 'rgba(59, 130, 246, 0.3)'
                    }`,
                    marginLeft: msg.from === 'user' ? 'var(--spacing-2xl)' : '0',
                    marginRight: msg.from === 'operator' ? 'var(--spacing-2xl)' : '0',
                    alignSelf: msg.from === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '80%'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 'var(--spacing-xs)',
                    alignItems: 'center'
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

                  <p style={{
                    color: 'var(--majaz-ivory)',
                    lineHeight: '1.6',
                    fontSize: '0.875rem'
                  }}>
                    {msg.message}
                  </p>

                  {msg.attachments && msg.attachments.length > 0 && (
                    <div style={{
                      marginTop: 'var(--spacing-sm)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--spacing-xs)'
                    }}>
                      {msg.attachments.map((attachment, i) => (
                        <a
                          key={i}
                          href="#"
                          style={{
                            color: 'var(--majaz-gold)',
                            fontSize: '0.875rem',
                            textDecoration: 'underline',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-xs)'
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

            {/* Message Input */}
            <div style={{
              padding: 'var(--spacing-md)',
              background: 'rgba(212, 175, 55, 0.05)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(212, 175, 55, 0.3)'
            }}>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                placeholder="Type your message... (Press Enter to send)"
                style={{
                  width: '100%',
                  minHeight: '80px',
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

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <button
                  style={{
                    padding: 'var(--spacing-sm)',
                    background: 'transparent',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--majaz-gold)',
                    cursor: 'pointer',
                    fontSize: '1.5rem'
                  }}
                  title="Attach file"
                >
                  📎
                </button>

                <Button
                  variant="primary"
                  size="md"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || sending}
                  loading={sending}
                >
                  {sending ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </div>
          </GlassCard>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 968px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
