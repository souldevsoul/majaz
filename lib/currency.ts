/**
 * Multi-Currency Support for MAJAZ
 * Supports: AED (UAE Dirham), USD, EUR
 */

export type Currency = 'AED' | 'USD' | 'EUR'

export interface CurrencyConfig {
  code: Currency
  symbol: string
  name: string
  nameAr: string
  locale: string
  decimals: number
}

export const CURRENCIES: Record<Currency, CurrencyConfig> = {
  AED: {
    code: 'AED',
    symbol: 'د.إ',
    name: 'UAE Dirham',
    nameAr: 'درهم إماراتي',
    locale: 'ar-AE',
    decimals: 2
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    nameAr: 'دولار أمريكي',
    locale: 'en-US',
    decimals: 2
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    nameAr: 'يورو',
    locale: 'de-DE',
    decimals: 2
  }
}

// Exchange rates (update from API in production)
export const EXCHANGE_RATES: Record<Currency, Record<Currency, number>> = {
  AED: {
    AED: 1,
    USD: 0.27,  // 1 AED = 0.27 USD
    EUR: 0.25   // 1 AED = 0.25 EUR
  },
  USD: {
    AED: 3.67,  // 1 USD = 3.67 AED
    USD: 1,
    EUR: 0.92   // 1 USD = 0.92 EUR
  },
  EUR: {
    AED: 4.00,  // 1 EUR = 4.00 AED
    USD: 1.09,  // 1 EUR = 1.09 USD
    EUR: 1
  }
}

/**
 * Convert amount from one currency to another
 */
export function convertCurrency(
  amount: number,
  from: Currency,
  to: Currency
): number {
  if (from === to) return amount
  const rate = EXCHANGE_RATES[from][to]
  return Number((amount * rate).toFixed(2))
}

/**
 * Format currency for display
 */
export function formatCurrency(
  amount: number,
  currency: Currency,
  locale: 'en' | 'ar' = 'en'
): string {
  const config = CURRENCIES[currency]

  // Format number
  const formatted = new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.code,
    minimumFractionDigits: config.decimals,
    maximumFractionDigits: config.decimals
  }).format(amount)

  // For Arabic, add RTL mark
  if (locale === 'ar') {
    return `\u202B${formatted}\u202C`
  }

  return formatted
}

/**
 * Get currency symbol
 */
export function getCurrencySymbol(currency: Currency, locale: 'en' | 'ar' = 'en'): string {
  const config = CURRENCIES[currency]
  return config.symbol
}

/**
 * Get currency name
 */
export function getCurrencyName(currency: Currency, locale: 'en' | 'ar' = 'en'): string {
  const config = CURRENCIES[currency]
  return locale === 'ar' ? config.nameAr : config.name
}

/**
 * Get user's preferred currency based on country
 */
export function getDefaultCurrency(country: string): Currency {
  const countryMap: Record<string, Currency> = {
    'UAE': 'AED',
    'KSA': 'AED',
    'SAU': 'AED',
    'QAT': 'AED',
    'KWT': 'AED',
    'BHR': 'AED',
    'OMN': 'AED',
    'USA': 'USD',
    'US': 'USD',
    'UK': 'EUR',
    'GB': 'EUR',
    'DE': 'EUR',
    'FR': 'EUR',
    'IT': 'EUR',
    'ES': 'EUR',
    'NL': 'EUR',
    'BE': 'EUR',
    'AT': 'EUR'
  }

  return countryMap[country?.toUpperCase()] || 'AED'
}

/**
 * Service tier pricing in base currency (AED)
 */
export const SERVICE_PRICING_AED = {
  REMOTE_48H: 49,
  REMOTE_24H: 89,
  REMOTE_SAME_DAY: 129,
  ONSITE_48H: 169,
  ONSITE_24H: 209
}

/**
 * Get pricing in any currency
 */
export function getServicePricing(
  tier: keyof typeof SERVICE_PRICING_AED,
  currency: Currency
): number {
  const basePrice = SERVICE_PRICING_AED[tier]
  return convertCurrency(basePrice, 'AED', currency)
}
