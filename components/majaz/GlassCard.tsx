'use client'

import React from 'react'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

export default function GlassCard({ children, className = '', hover = true, onClick }: GlassCardProps) {
  return (
    <div
      className={`glass-card ${hover ? 'glass-card-hover' : ''} ${className}`}
      onClick={onClick}
      style={{
        cursor: onClick ? 'pointer' : 'default'
      }}
    >
      {children}

      <style jsx>{`
        .glass-card {
          background: var(--majaz-glass-bg);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid var(--majaz-glass-border);
          border-radius: var(--radius-lg);
          padding: var(--spacing-xl);
          box-shadow: 0 8px 32px var(--majaz-glass-shadow);
          transition: all var(--transition-base);
        }

        .glass-card-hover:hover {
          border-color: var(--majaz-border-strong);
          box-shadow: var(--majaz-shadow-gold);
          transform: translateY(-4px);
        }
      `}</style>
    </div>
  )
}
