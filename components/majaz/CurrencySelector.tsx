'use client'

import { useState, useRef, useEffect } from 'react'

type Currency = 'AED' | 'USD' | 'EUR'

interface CurrencyOption {
  code: Currency
  symbol: string
  flag: string
  name: string
}

const currencies: CurrencyOption[] = [
  { code: 'AED', symbol: 'د.إ', flag: '🇦🇪', name: 'UAE Dirham' },
  { code: 'USD', symbol: '$', flag: '🇺🇸', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', flag: '🇪🇺', name: 'Euro' },
]

export default function CurrencySelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('AED')
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Load currency from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('majaz-currency') as Currency
    if (stored && ['AED', 'USD', 'EUR'].includes(stored)) {
      setSelectedCurrency(stored)
    }
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleCurrencyChange = (currency: Currency) => {
    setSelectedCurrency(currency)
    localStorage.setItem('majaz-currency', currency)
    setIsOpen(false)

    // Dispatch custom event for other components to listen
    window.dispatchEvent(new CustomEvent('currency-change', { detail: currency }))
  }

  const currentCurrency = currencies.find(c => c.code === selectedCurrency) || currencies[0]

  return (
    <div className="currency-selector" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="currency-trigger"
        aria-label="Select currency"
        aria-expanded={isOpen}
      >
        <span className="currency-flag">{currentCurrency.flag}</span>
        <span className="currency-code">{currentCurrency.code}</span>
        <svg
          className={`currency-chevron ${isOpen ? 'open' : ''}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="currency-dropdown">
          {currencies.map((currency) => (
            <button
              key={currency.code}
              onClick={() => handleCurrencyChange(currency.code)}
              className={`currency-option ${selectedCurrency === currency.code ? 'active' : ''}`}
            >
              <span className="currency-flag">{currency.flag}</span>
              <div className="currency-info">
                <span className="currency-code">{currency.code}</span>
                <span className="currency-name">{currency.name}</span>
              </div>
              {selectedCurrency === currency.code && (
                <svg
                  className="currency-check"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5 4L6 11.5L2.5 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}

      <style jsx>{`
        .currency-selector {
          position: relative;
        }

        .currency-trigger {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: transparent;
          border: 1px solid var(--majaz-border);
          border-radius: var(--radius-md);
          color: var(--majaz-gold);
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-base);
          min-width: 110px;
        }

        .currency-trigger:hover {
          background: rgba(212, 175, 55, 0.1);
          border-color: var(--majaz-border-strong);
        }

        .currency-flag {
          font-size: 1.25rem;
          line-height: 1;
        }

        .currency-code {
          font-size: 0.875rem;
          font-weight: 600;
        }

        .currency-chevron {
          color: var(--majaz-gold);
          transition: transform var(--transition-base);
          margin-left: auto;
        }

        .currency-chevron.open {
          transform: rotate(180deg);
        }

        .currency-dropdown {
          position: absolute;
          top: calc(100% + 0.5rem);
          right: 0;
          min-width: 200px;
          background: var(--majaz-glass-bg);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid var(--majaz-glass-border);
          border-radius: var(--radius-md);
          box-shadow: 0 8px 32px var(--majaz-glass-shadow);
          overflow: hidden;
          z-index: var(--z-dropdown);
          animation: slideDown var(--transition-fast) ease-out;
        }

        .currency-option {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.75rem 1rem;
          background: transparent;
          border: none;
          color: var(--majaz-text-primary);
          text-align: left;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .currency-option:hover {
          background: rgba(212, 175, 55, 0.1);
        }

        .currency-option.active {
          background: rgba(212, 175, 55, 0.15);
          color: var(--majaz-gold);
        }

        .currency-info {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
          flex: 1;
        }

        .currency-option .currency-code {
          font-size: 0.875rem;
          font-weight: 600;
        }

        .currency-name {
          font-size: 0.75rem;
          color: var(--majaz-text-muted);
        }

        .currency-check {
          color: var(--majaz-gold);
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .currency-trigger {
            padding: 0.4rem 0.8rem;
            min-width: 90px;
          }

          .currency-dropdown {
            right: 0;
            left: auto;
          }
        }

        [dir="rtl"] .currency-dropdown {
          right: auto;
          left: 0;
        }

        [dir="rtl"] .currency-option {
          text-align: right;
        }

        [dir="rtl"] .currency-chevron {
          margin-left: 0;
          margin-right: auto;
        }
      `}</style>
    </div>
  )
}
