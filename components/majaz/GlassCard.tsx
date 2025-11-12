'use client'

import React from 'react'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
  style?: React.CSSProperties
}

export default function GlassCard({ children, className = '', hover = true, onClick, style }: GlassCardProps) {
  return (
    <div
      className={`glass-card ${hover ? 'glass-card-hover' : ''} ${className}`}
      onClick={onClick}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        ...style
      }}
    >
      {children}

      <style jsx>{`
        .glass-card {
          background: rgba(26, 26, 26, 0.75);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border: 1px solid rgba(212, 175, 55, 0.25);
          border-radius: var(--radius-xl);
          padding: var(--spacing-2xl);
          box-shadow:
            0 12px 48px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.05) inset;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glass-card-hover:hover {
          background: rgba(26, 26, 26, 0.85);
          border-color: rgba(212, 175, 55, 0.5);
          box-shadow:
            0 20px 60px rgba(212, 175, 55, 0.3),
            0 0 0 1px rgba(212, 175, 55, 0.2) inset;
          transform: translateY(-8px) scale(1.02);
        }
      `}</style>
    </div>
  )
}
