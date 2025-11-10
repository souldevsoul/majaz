// Export all Prisma generated types
export type {
  User,
  Account,
  Session,
  VerificationToken,
  Request,
  RequestStatus,
  RequestMode,
  ServiceTier,
  Listing,
  ListingSource,
  TitleStatus,
  Vehicle,
  FuelType,
  Transmission,
  DriveType,
  Estimate,
  Report,
  ReportLanguage,
  Event,
  EventType,
  Message,
  TeamMember,
  TeamRole
} from '@prisma/client'

import type { Request, Listing, Vehicle, Estimate, Report, Event, Message, User } from '@prisma/client'

// ============================================
// EXTENDED/COMBINED TYPES
// ============================================

export interface RequestWithDetails extends Request {
  listing?: Listing | null
  vehicle?: Vehicle | null
  estimate?: Estimate | null
  reports?: Report[]
  events?: Event[]
  messages?: Message[]
  user?: User
}

export interface MessageWithSender extends Message {
  sender?: User | null
}

// ============================================
// API REQUEST/RESPONSE TYPES
// ============================================

export interface PricingQuote {
  serviceTier: string
  serviceFeeAED: number
  slaHours: number
  description: string
  descriptionAr?: string
}

export interface CreateRequestInput {
  mode: 'REMOTE_ASSESSMENT' | 'ONSITE_INSPECTION' | 'SOURCING' | 'DELEGATED_BIDDING'
  serviceTier: 'REMOTE_48H' | 'REMOTE_24H' | 'REMOTE_SAME_DAY' | 'ONSITE_48H' | 'ONSITE_24H'
  country: string
  url?: string          // For assessment mode
  sourcingBrief?: string // For sourcing mode
}

export interface QuoteRequestInput {
  mode: string
  serviceTier: string
  country: string
  hasDeposit?: boolean
}

export interface QuoteResponse {
  serviceFeeAED: number
  depositAED?: number
  slaHours: number
  total: number
  currency: string
}

// ============================================
// SCRAPING & PARSING TYPES
// ============================================

export interface ScrapedData {
  url: string
  html: string
  photos: string[]
  meta: {
    title?: string
    description?: string
  }
  detectedLanguage?: string
}

export interface ParsedVehicle {
  vin?: string
  year?: number
  make?: string
  model?: string
  trim?: string
  bodyType?: string
  mileage?: number
  fuel?: 'PETROL' | 'DIESEL' | 'HYBRID' | 'ELECTRIC' | 'CNG' | 'LPG'
  transmission?: 'AUTOMATIC' | 'MANUAL' | 'CVT' | 'DCT'
  drivetrain?: 'FWD' | 'RWD' | 'AWD' | 'FOURWD'
  engineSize?: string
  horsepower?: number
  color?: string
  interiorColor?: string
  options?: Record<string, any>
  damageNotes?: string
  serviceHistory?: string
}

export interface ParsedListing {
  source: string
  lotId?: string
  sellerType?: string
  titleStatus?: 'CLEAN' | 'SALVAGE' | 'REBUILT' | 'LIEN' | 'UNKNOWN'
  location?: string
  auctionCloseAt?: string
}

// ============================================
// ESTIMATION TYPES
// ============================================

export interface ComparableSale {
  date: string
  source: string
  url?: string
  price: number
  currency: string
  mileage?: number
  condition: 'clean' | 'salvage' | 'rebuilt'
  notes?: string
  year?: number
  trim?: string
}

export interface EstimateInput {
  vehicle: ParsedVehicle
  listing: ParsedListing
  comps: ComparableSale[]
}

export interface EstimateOutput {
  fairLow: number
  fairHigh: number
  safeMaxBid: number
  riskScore: number
  repairBudget?: number
  warnings: string[]
  notes?: string
}

// ============================================
// REPORT TYPES
// ============================================

export interface ReportSection {
  title: string
  titleAr?: string
  content: string
  contentAr?: string
}

export interface ReportData {
  vehicle: Vehicle
  listing: Listing
  estimate: Estimate
  sections: ReportSection[]
  generatedAt: Date
  language: 'EN' | 'AR'
}

// ============================================
// PAYMENT TYPES
// ============================================

export interface PaymentIntent {
  clientSecret: string
  amount: number
  currency: string
}

export interface DepositHold {
  id: string
  amount: number
  status: 'held' | 'released' | 'applied'
  createdAt: Date
}

// ============================================
// IMAGE GENERATION TYPES
// ============================================

export interface ImageGenerationInput {
  prompt: string
  negativePrompt?: string
  width?: number
  height?: number
  numOutputs?: number
}

export interface GeneratedImage {
  url: string
  prompt: string
  createdAt: Date
}

// ============================================
// DASHBOARD TYPES
// ============================================

export interface DashboardStats {
  totalRequests: number
  activeRequests: number
  completedRequests: number
  pendingPayments: number
}

export interface RequestListItem {
  id: string
  status: string
  mode: string
  createdAt: Date
  vehicle?: {
    year?: number
    make?: string
    model?: string
  }
  estimate?: {
    safeMaxBid: number
  }
}

// ============================================
// FORM VALIDATION TYPES
// ============================================

export interface LoginFormData {
  email: string
  password: string
}

export interface RegisterFormData {
  name: string
  email: string
  phone?: string
  password: string
  confirmPassword: string
  locale: 'en' | 'ar'
}

export interface NewRequestFormData {
  mode: string
  serviceTier: string
  country: string
  url?: string
  sourcingBrief?: string
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  language: 'en' | 'ar'
}

// ============================================
// LOCALE/I18N TYPES
// ============================================

export type Locale = 'en' | 'ar'

export interface LocaleMessages {
  common: Record<string, string>
  navigation: Record<string, string>
  home: Record<string, string>
  pricing: Record<string, string>
  dashboard: Record<string, string>
  forms: Record<string, string>
  errors: Record<string, string>
}

// ============================================
// TEAM MEMBER TYPES
// ============================================

export interface TeamMemberDisplay {
  id: string
  name: string
  nameAr?: string
  role: string
  title: string
  titleAr?: string
  bio?: string
  bioAr?: string
  image?: string
  location?: string
  inspectionsCompleted: number
  rating?: number
}

// ============================================
// API RESPONSE WRAPPERS
// ============================================

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: any
  }
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
