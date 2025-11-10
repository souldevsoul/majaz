# MAJAZ Implementation Plan

## Template Analysis Complete ✓

### Pages We KEEP & Repurpose

#### Public Pages
1. **/** (app/page.jsx) → Landing page with MAJAZ branding
2. **/about** → About MAJAZ service
3. **/how-it-works** → Service explanation (repurpose from features)
4. **/pricing** → Service pricing tiers
5. **/faq** → Common questions
6. **/contact** → Contact form
7. **/terms** → Terms of Service
8. **/login** → Authentication
9. **/404** → Error page

#### Authenticated Pages
10. **/dashboard** → User dashboard (view all requests)
11. **/dashboard/requests/new** → Submit new assessment request
12. **/dashboard/requests/[id]** → View assessment detail + report
13. **/dashboard/profile** → User profile settings
14. **/dashboard/messages** → Chat/messages (repurpose existing)

### Pages We DELETE

- All blog pages (`(blogs)/*`)
- All car listing pages (`(car-listings)/*`)
- All car single pages (`(car-singles)/*`)
- All shop pages (`(shop)/*`)
- Multiple home variations (home-2 through home-10)
- Dealer pages
- Team pages
- Add listings
- Favorites
- Saved
- Compare
- Loan calculator
- Invoice (will generate programmatically)
- UI elements demo

---

## Database Schema (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// User Management
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  emailVerified DateTime?
  name          String?
  phone         String?
  password      String?
  image         String?
  locale        String    @default("en") // en or ar
  countryPref   String    @default("UAE")

  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  accounts      Account[]
  sessions      Session[]
  requests      Request[]

  @@map("users")
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

// Assessment Request System
enum RequestStatus {
  PENDING_PAYMENT
  PAYMENT_RECEIVED
  SCRAPING
  PARSING
  ANALYZING
  GENERATING_REPORT
  COMPLETED
  FAILED
  REFUNDED
}

enum RequestMode {
  REMOTE_ASSESSMENT    // Paste link, get report
  ONSITE_INSPECTION    // Physical inspection
  SOURCING            // We find the car
  DELEGATED_BIDDING   // We bid on behalf
}

enum ServiceTier {
  REMOTE_48H
  REMOTE_24H
  REMOTE_SAME_DAY
  ONSITE_48H
  ONSITE_24H
}

model Request {
  id              String         @id @default(cuid())
  userId          String
  user            User           @relation(fields: [userId], references: [id], onDelete: Cascade)

  // Request Details
  mode            RequestMode
  status          RequestStatus  @default(PENDING_PAYMENT)
  serviceTier     ServiceTier
  country         String         // UAE, KSA, etc

  // Pricing
  serviceFeeAED   Decimal        @db.Decimal(10, 2)
  depositAED      Decimal?       @db.Decimal(10, 2)
  depositPct      Int?           // Usually 20%
  currency        String         @default("AED")

  // Payment
  stripePaymentId String?
  stripeDepositId String?
  paidAt          DateTime?

  // For sourcing requests
  sourcingBrief   String?        @db.Text

  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt
  completedAt     DateTime?

  // Relations
  listing         Listing?
  vehicle         Vehicle?
  estimate        Estimate?
  reports         Report[]
  events          Event[]
  messages        Message[]

  @@map("requests")
}

// Listing (auction/marketplace link)
enum ListingSource {
  EMIRATES_AUCTION
  AWAL_MAZAD
  DUBIZZLE
  CAR_SWITCH
  AUTO_TRADER_UAE
  MARHABA
  TURBO_AZ
  MOBILE_DE
  AUTOSCOUT24
  OTHER
}

enum TitleStatus {
  CLEAN
  SALVAGE
  REBUILT
  LIEN
  UNKNOWN
}

model Listing {
  id              String         @id @default(cuid())
  requestId       String         @unique
  request         Request        @relation(fields: [requestId], references: [id], onDelete: Cascade)

  source          ListingSource
  url             String
  lotId           String?
  sellerType      String?        // dealer, fleet, bank, government, private
  titleStatus     TitleStatus?
  location        String?
  auctionCloseAt  DateTime?

  // Scraped data
  rawHtml         String?        @db.Text
  rawJson         Json?
  photos          String[]       // Array of URLs
  scrapedAt       DateTime?

  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt

  @@map("listings")
}

// Vehicle (extracted/parsed data)
enum FuelType {
  PETROL
  DIESEL
  HYBRID
  ELECTRIC
  CNG
  LPG
}

enum Transmission {
  AUTOMATIC
  MANUAL
  CVT
  DCT
}

enum DriveType {
  FWD
  RWD
  AWD
  FOURWD
}

model Vehicle {
  id              String         @id @default(cuid())
  requestId       String         @unique
  request         Request        @relation(fields: [requestId], references: [id], onDelete: Cascade)

  // Core specs
  vin             String?
  year            Int?
  make            String?
  model           String?
  trim            String?
  bodyType        String?
  mileage         Int?           // in km
  fuel            FuelType?
  transmission    Transmission?
  drivetrain      DriveType?
  engineSize      String?        // e.g., "2.0L"
  horsepower      Int?

  // Options/Features
  color           String?
  interiorColor   String?
  optionsJson     Json?          // Extracted features

  // Condition notes
  damageNotes     String?        @db.Text
  serviceHistory  String?        @db.Text

  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt

  @@map("vehicles")
}

// Estimate (pricing analysis)
model Estimate {
  id              String         @id @default(cuid())
  requestId       String         @unique
  request         Request        @relation(fields: [requestId], references: [id], onDelete: Cascade)

  // Fair value range
  fairLow         Decimal        @db.Decimal(10, 2)
  fairHigh        Decimal        @db.Decimal(10, 2)
  safeMaxBid      Decimal        @db.Decimal(10, 2)
  currency        String         @default("AED")

  // Risk assessment
  riskScore       Int            // 0-100
  repairBudget    Decimal?       @db.Decimal(10, 2)

  // Comparables
  comps           Json?          // Array of comparable sales
  compsSource     String?        // Perplexity, manual, etc

  // Analysis notes
  notes           String?        @db.Text
  warnings        String[]       // Safety/risk warnings

  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt

  @@map("estimates")
}

// Report (generated output)
enum ReportLanguage {
  EN
  AR
}

model Report {
  id              String          @id @default(cuid())
  requestId       String
  request         Request         @relation(fields: [requestId], references: [id], onDelete: Cascade)

  language        ReportLanguage  @default(EN)
  version         Int             @default(1)

  // Content
  htmlContent     String          @db.Text
  pdfUrl          String?

  // Metadata
  generatedAt     DateTime        @default(now())
  sentToUser      Boolean         @default(false)
  sentAt          DateTime?

  @@map("reports")
}

// Event log
enum EventType {
  REQUEST_CREATED
  PAYMENT_RECEIVED
  DEPOSIT_RECEIVED
  SCRAPING_STARTED
  SCRAPING_COMPLETED
  SCRAPING_FAILED
  PARSING_COMPLETED
  COMPS_FETCHED
  ESTIMATE_GENERATED
  REPORT_GENERATED
  REPORT_SENT
  STATUS_CHANGED
  MESSAGE_SENT
  REFUND_ISSUED
}

model Event {
  id              String         @id @default(cuid())
  requestId       String
  request         Request        @relation(fields: [requestId], references: [id], onDelete: Cascade)

  type            EventType
  description     String?
  payload         Json?

  createdAt       DateTime       @default(now())

  @@map("events")
}

// Messages/Chat
model Message {
  id              String         @id @default(cuid())
  requestId       String
  request         Request        @relation(fields: [requestId], references: [id], onDelete: Cascade)

  senderId        String         // userId or "system" or "operator"
  senderName      String
  senderType      String         // user, operator, system

  content         String         @db.Text
  attachments     String[]       // URLs to files

  read            Boolean        @default(false)
  readAt          DateTime?

  createdAt       DateTime       @default(now())

  @@map("messages")
}
```

---

## TypeScript Types

```typescript
// types/index.ts

export type {
  User,
  Account,
  Session,
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
  Message
} from '@prisma/client'

// Extended types
export interface RequestWithDetails extends Request {
  listing?: Listing | null
  vehicle?: Vehicle | null
  estimate?: Estimate | null
  reports?: Report[]
  events?: Event[]
  messages?: Message[]
  user?: User
}

export interface PricingQuote {
  serviceTier: ServiceTier
  serviceFeeAED: number
  slaHours: number
  description: string
}

export interface CreateRequestInput {
  mode: RequestMode
  serviceTier: ServiceTier
  country: string
  url?: string          // For assessment mode
  sourcingBrief?: string // For sourcing mode
}

export interface ScrapedData {
  url: string
  html: string
  photos: string[]
  meta: {
    title?: string
    description?: string
  }
}

export interface ParsedVehicle {
  vin?: string
  year?: number
  make?: string
  model?: string
  trim?: string
  bodyType?: string
  mileage?: number
  fuel?: FuelType
  transmission?: Transmission
  drivetrain?: DriveType
  color?: string
  options?: any
  damageNotes?: string
}

export interface ComparableSale {
  date: string
  source: string
  url?: string
  price: number
  currency: string
  mileage?: number
  condition: 'clean' | 'salvage'
  notes?: string
}
```

---

## API Routes Structure

```
app/api/
├── auth/
│   ├── [...nextauth]/route.ts    # NextAuth
│   └── register/route.ts         # User registration
├── requests/
│   ├── route.ts                  # GET (list), POST (create)
│   ├── [id]/route.ts             # GET (detail), PATCH (update), DELETE
│   ├── [id]/report/route.ts      # GET report
│   └── quote/route.ts            # POST get pricing quote
├── webhooks/
│   └── stripe/route.ts           # Stripe payment webhooks
├── scrape/route.ts               # Internal: scrape listing
├── parse/route.ts                # Internal: parse vehicle data
├── estimate/route.ts             # Internal: generate estimate
├── report/route.ts               # Internal: generate report
└── messages/
    ├── route.ts                  # GET (list), POST (send)
    └── [id]/route.ts             # GET specific message
```

---

## Implementation Phases

### Phase 1: Core Setup ✓
- [x] Prisma schema designed
- [ ] Install dependencies
- [ ] Set up Prisma
- [ ] Create TypeScript types

### Phase 2: Remove Unnecessary Pages
- [ ] Delete blog pages
- [ ] Delete car listing pages
- [ ] Delete shop pages
- [ ] Delete dealer pages
- [ ] Delete extra home variations

### Phase 3: Brand Implementation
- [ ] Update colors (black/gold/ivory)
- [ ] Add fonts (Playfair Display, Inter, IBM Plex Sans Arabic)
- [ ] Set up i18n (next-intl)
- [ ] Create glass morphism components
- [ ] Generate brand images with Replicate

### Phase 4: Core Pages
- [ ] Landing page with MAJAZ branding
- [ ] Pricing page
- [ ] How it works
- [ ] FAQ
- [ ] Contact

### Phase 5: Authentication
- [ ] Set up NextAuth
- [ ] Login/register pages
- [ ] Email verification

### Phase 6: Request System
- [ ] Dashboard layout
- [ ] New request form
- [ ] Request detail page
- [ ] Status timeline

### Phase 7: Backend & APIs
- [ ] Stripe integration
- [ ] Firecrawl integration
- [ ] OpenAI integration
- [ ] Perplexity integration
- [ ] Report generation

---

## Dependencies to Add

```json
{
  "dependencies": {
    "@prisma/client": "^5.7.0",
    "next-auth": "^4.24.5",
    "next-intl": "^3.4.0",
    "@stripe/stripe-js": "^2.3.0",
    "stripe": "^14.9.0",
    "zod": "^3.22.4",
    "react-hook-form": "^7.49.2",
    "@hookform/resolvers": "^3.3.2",
    "axios": "^1.6.2",
    "date-fns": "^2.30.0",
    "replicate": "^0.25.0"
  },
  "devDependencies": {
    "prisma": "^5.7.0",
    "@types/node": "^20.10.5",
    "@types/react": "^18.2.45",
    "typescript": "^5.3.3"
  }
}
```
