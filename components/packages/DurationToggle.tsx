'use client'

import { useState } from 'react'

interface DurationToggleProps {
  value: 'monthly' | 'quarterly' | 'annual'
  onChange: (value: 'monthly' | 'quarterly' | 'annual') => void
  locale?: string
}

export default function DurationToggle({
  value,
  onChange,
  locale = 'en'
}: DurationToggleProps) {
  const isArabic = locale === 'ar'

  const options = [
    {
      value: 'monthly' as const,
      label: isArabic ? 'شهري' : 'Monthly',
      save: null
    },
    {
      value: 'quarterly' as const,
      label: isArabic ? 'ربع سنوي' : 'Quarterly',
      save: isArabic ? 'وفر 5%' : 'Save 5%'
    },
    {
      value: 'annual' as const,
      label: isArabic ? 'سنوي' : 'Annual',
      save: isArabic ? 'وفر 15%' : 'Save 15%'
    }
  ]

  return (
    <div className="duration-toggle">
      <div className="toggle-container">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`toggle-option ${value === option.value ? 'active' : ''}`}
          >
            <span className="option-label">{option.label}</span>
            {option.save && (
              <span className="option-save">{option.save}</span>
            )}
          </button>
        ))}
      </div>

      <style jsx>{`
        .duration-toggle {
          display: flex;
          justify-content: center;
          margin-bottom: 3rem;
        }

        .toggle-container {
          display: inline-flex;
          background: rgba(26, 26, 26, 0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(212, 175, 55, 0.15);
          border-radius: 16px;
          padding: 6px;
          gap: 6px;
        }

        .toggle-option {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 14px 32px;
          background: transparent;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          min-width: 140px;
        }

        .toggle-option:hover {
          background: rgba(212, 175, 55, 0.08);
        }

        .toggle-option.active {
          background: linear-gradient(135deg, #D4AF37 0%, #B8941E 100%);
          box-shadow: 0 4px 16px rgba(212, 175, 55, 0.3);
        }

        .option-label {
          font-weight: 600;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: rgba(255, 255, 240, 0.7);
          transition: color 0.3s ease;
        }

        .toggle-option.active .option-label {
          color: #111111;
        }

        .option-save {
          font-size: 0.75rem;
          font-weight: 600;
          color: rgba(212, 175, 55, 0.8);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: color 0.3s ease;
        }

        .toggle-option.active .option-save {
          color: #111111;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .toggle-container {
            flex-direction: column;
            width: 100%;
            max-width: 320px;
          }

          .toggle-option {
            width: 100%;
            min-width: auto;
            padding: 16px 24px;
          }
        }

        /* RTL Support */
        [dir="rtl"] .duration-toggle {
          direction: rtl;
        }
      `}</style>
    </div>
  )
}
