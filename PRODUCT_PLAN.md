# MAJAZ - Complete Product Plan & Architecture

## Current Status ✅
- **Header/Footer**: Single MAJAZ Header and Footer applied across all pages via `/app/[locale]/layout.tsx`
- **Marketing Pages**: About, Pricing, FAQ, Contact (all styled consistently)
- **Homepage**: Luxury styling with Facts, Features, Trending Vehicles, Testimonials

## Product Architecture

### 1. Authentication System 🔐

#### Pages to Build:
```
/[locale]/login          - Login page with email/password
/[locale]/register       - Registration with email verification
/[locale]/forgot-password - Password reset flow
/[locale]/verify-email   - Email verification page
```

#### Features:
- **Email/Password Auth** via NextAuth.js
- **Social Login**: Google, Apple (UAE market preference)
- **2FA Option**: SMS verification (UAE phone numbers)
- **Session Management**: Secure JWT tokens
- **Role-Based Access**: Customer, Inspector, Admin

#### Database Schema (Supabase/PostgreSQL):
```sql
-- Users table
users (
  id, email, password_hash, name, phone,
  role (customer/inspector/admin),
  email_verified, phone_verified,
  created_at, updated_at
)
```

---

### 2. User Dashboard System 📊

#### Dashboard Pages:
```
/[locale]/dashboard                    - Overview with stats
/[locale]/dashboard/requests           - All inspection requests
/[locale]/dashboard/requests/new       - Create new request
/[locale]/dashboard/requests/[id]      - Single request detail
/[locale]/dashboard/reports            - All completed reports
/[locale]/dashboard/reports/[id]       - View/download report
/[locale]/dashboard/profile            - Edit profile
/[locale]/dashboard/billing            - Payment history
/[locale]/dashboard/settings           - Account settings
```

#### Core Features:

**A. Inspection Request Management**
- **Create Request**:
  - Paste auction/marketplace URL (Emirates Auction, dubizzle, etc.)
  - Auto-scrape vehicle details via Firecrawl
  - Select service tier (Remote/On-Site/Sourcing)
  - Choose turnaround time (48h/24h/same-day)
  - Upload additional images

- **Request Tracking**:
  - Status: Pending → Assigned → In Progress → Completed
  - Real-time updates via WebSocket
  - Inspector assignment notification
  - Estimated completion time

- **Request Types**:
  1. **Remote Assessment** (49-129 AED)
     - Link analysis only
     - Market comp research
     - Fair value calculation

  2. **On-Site Inspection** (169-209 AED)
     - Physical inspection at location
     - 200+ point checklist
     - Photo documentation

  3. **Vehicle Sourcing** (59 AED + 20% deposit)
     - Find specific vehicle
     - Handle auction bidding
     - Negotiate with sellers

**B. Report Viewing System**
- **PDF Reports** with:
  - Vehicle condition summary
  - 200-point inspection checklist
  - Market analysis (UAE/GCC comps)
  - Fair value & safe bid recommendation
  - Photo gallery with annotations
  - Warranty disclaimer

- **Report Features**:
  - Download PDF (EN/AR)
  - Share via link (password-protected)
  - Print-friendly format
  - Mobile-optimized viewing

**C. Dashboard Widgets**
```
- Active Requests Count
- Completed Inspections
- Saved Listings
- Upcoming Appointments
- Recent Activity Feed
- Quick Actions (New Request, View Reports)
```

---

### 3. Premium Digital Product ($10,000 USD) 💎

## **"MAJAZ FLEET INTELLIGENCE PLATFORM"**

### Product Overview:
**Enterprise SaaS platform for car dealerships, fleet managers, and high-volume buyers in UAE/GCC market**

### Target Customers:
- Pre-owned car dealerships (50-500+ vehicles/month)
- Fleet management companies
- Car rental companies
- Vehicle financing institutions
- Corporate fleet buyers

### Core Features (Justifying $10k/year):

#### **1. Bulk Assessment Engine**
- Upload 100+ listings at once (CSV/Excel)
- Automated scraping & analysis
- Batch market comparison
- Risk scoring algorithm
- Priority queue management

#### **2. AI-Powered Valuation System**
- **Machine Learning Model**:
  - Trained on 50,000+ UAE vehicle sales
  - Predicts fair market value ±3% accuracy
  - Considers: mileage, age, spec, accident history
  - Real-time market trends integration

- **Dynamic Pricing**:
  - Seasonal demand factors (Ramadan, summer)
  - Supply/demand by model
  - Export market pricing (Africa, Central Asia)

#### **3. Fleet Dashboard & Analytics**
```
/dashboard/fleet/overview          - Portfolio value tracking
/dashboard/fleet/inventory         - Active listings management
/dashboard/fleet/acquisition       - Purchase recommendations
/dashboard/fleet/analytics         - Market insights & trends
/dashboard/fleet/team              - Inspector assignment
```

**Analytics Features**:
- Portfolio value trends over time
- Best performing models/segments
- Average days in inventory
- Margin analysis by vehicle type
- Market share by competitor
- Predictive demand forecasting

#### **4. API Access for Integration**
```javascript
// REST API Example
POST /api/v1/assessments/bulk
GET  /api/v1/market-data/trends
GET  /api/v1/vehicles/valuation/{vin}
```

**Integration Capabilities**:
- Connect to dealership DMS (Dealer Management System)
- Auto-sync inventory to dubizzle/CarSwitch
- WhatsApp Business API for notifications
- Webhook support for real-time updates

#### **5. White-Label Inspection Reports**
- Branded PDFs with dealership logo
- Custom color schemes & styling
- Embed in dealership website
- Co-branded certificates of inspection

#### **6. Dedicated Account Management**
- Assigned account manager
- Priority support (24/7)
- Quarterly business reviews
- Custom training for team
- On-site integration support

#### **7. Advanced Features**
- **OCR Document Scanning**: Auto-extract VIN, registration from photos
- **Accident History Check**: Integration with UAE RTA database
- **Service History Verification**: Via authorized service centers
- **Stolen Vehicle Check**: Police database integration
- **Insurance Claims Lookup**: Pre-accident checks

#### **8. Multi-Location Support**
- Manage inspections across UAE (Dubai, Abu Dhabi, Sharjah)
- Inspector dispatch management
- Regional pricing differences
- Location-based inventory insights

### Pricing Model:
```
MAJAZ Fleet Intelligence Platform

Tier 1: Dealer ($10,000/year)
- Up to 500 assessments/month
- 3 user accounts
- API access (5000 calls/month)
- Standard support

Tier 2: Fleet Pro ($25,000/year)
- Unlimited assessments
- 10 user accounts
- API access (unlimited)
- White-label reports
- Dedicated account manager
- Priority inspection queue

Tier 3: Enterprise ($50,000+/year)
- Custom volume
- Unlimited users
- Full API access
- Custom integrations
- On-premise deployment option
- SLA guarantees
```

### Why Worth $10k/year?
1. **ROI**: Saves 20+ hours/week on manual research
2. **Accuracy**: Reduces bad purchases by 30%
3. **Speed**: 10x faster than manual valuation
4. **Scale**: Handles 500+ vehicles/month vs 50 manually
5. **Insights**: Market intelligence worth $50k+ if built in-house

### Competitive Advantage:
- **Local Expertise**: Deep UAE/GCC market knowledge
- **Real-Time Data**: Live auction results, listing trends
- **Inspector Network**: Physical verification on-demand
- **Bilingual**: Full Arabic support (rare in automotive SaaS)
- **Mobile-First**: iPad app for on-site inspections

---

## Technical Implementation Plan

### Phase 1: Authentication & Core Dashboard (Week 1-2)
```
✅ Set up NextAuth.js with email/password
✅ Create login/register pages
✅ Build dashboard layout with sidebar nav
✅ User profile management
```

### Phase 2: Inspection Request System (Week 3-4)
```
✅ Request creation form with URL input
✅ Firecrawl integration for auto-scraping
✅ Request status tracking
✅ Email notifications (Resend/SendGrid)
✅ Payment integration (Stripe for international, Checkout.com for local)
```

### Phase 3: Report Generation (Week 5-6)
```
✅ PDF template design (React-PDF)
✅ Market comp research (Perplexity API)
✅ Fair value calculation algorithm
✅ Report viewer component
✅ Download/share functionality
```

### Phase 4: Premium Features (Week 7-8)
```
✅ Bulk upload CSV parsing
✅ API endpoint development
✅ Analytics dashboard with charts
✅ Fleet management interface
✅ White-label report customization
```

### Phase 5: Mobile & Polish (Week 9-10)
```
✅ Mobile responsive improvements
✅ PWA setup for offline access
✅ Performance optimization
✅ Security audit
✅ Load testing
```

---

## Database Schema

### Core Tables:
```sql
-- Users & Auth
users (id, email, password_hash, name, phone, role, company_id)
companies (id, name, plan_tier, api_key, settings_json)

-- Inspection Requests
inspection_requests (
  id, user_id, vehicle_url, scrape_data_json,
  service_type, turnaround_time, status,
  assigned_inspector_id, price_aed,
  created_at, scheduled_at, completed_at
)

-- Reports
inspection_reports (
  id, request_id, pdf_url, fair_value_aed,
  market_comps_json, inspection_data_json,
  generated_at, expires_at
)

-- Fleet Features
fleet_vehicles (
  id, company_id, vin, listing_url,
  acquisition_price, current_value,
  status, last_assessed_at
)

-- Analytics
market_analytics (
  date, make, model, avg_price, listing_count,
  region, segment
)

-- API Usage
api_logs (
  company_id, endpoint, timestamp,
  response_time_ms, status_code
)
```

---

## Revenue Projections

### Customer Segments:
1. **Individual Buyers** (49-209 AED/request)
   - Target: 500 users/month → 25k AED/month

2. **Small Dealerships** (10k USD/year)
   - Target: 20 clients → 200k USD/year

3. **Fleet Enterprise** (25-50k USD/year)
   - Target: 5 clients → 150k USD/year

**Total Year 1 ARR**: ~$350,000 USD

---

## Marketing Strategy for Premium Product

### Sales Approach:
1. **Outbound**: Target top 100 UAE dealerships
2. **Content**: Case studies showing ROI
3. **Partnerships**: DMS providers, auction houses
4. **Events**: GITEX, Dubai Motor Show booth
5. **Free Trial**: 30-day with 50 assessments

### Key Selling Points:
- "Save 20 hours per week on vehicle research"
- "Reduce bad purchases by 30%"
- "Scale from 50 to 500 vehicles/month"
- "UAE's first AI-powered fleet intelligence"

---

## Next Steps - Implementation Order

1. ✅ Fix homepage nav links to gold
2. ✅ Verify footer consistency
3. 🔨 Build authentication system
4. 🔨 Create dashboard structure
5. 🔨 Implement request management
6. 🔨 Build report generation
7. 🔨 Develop premium features
8. 🔨 Launch beta with 5 pilot customers

---

## Technology Stack

**Frontend**:
- Next.js 14.2.8 (App Router)
- TypeScript
- Tailwind CSS + Custom Design System
- React Hook Form + Zod validation
- TanStack Query for data fetching
- Recharts for analytics

**Backend**:
- Next.js API Routes
- NextAuth.js for authentication
- Prisma ORM
- PostgreSQL (Supabase)

**External Services**:
- Firecrawl (web scraping)
- Perplexity API (market research)
- OpenAI (structured extraction)
- Stripe (payments)
- Resend (emails)
- Vercel (hosting)

**Premium Features**:
- Redis (caching & rate limiting)
- Meilisearch (fast vehicle search)
- React-PDF (report generation)
- AWS S3 (report storage)
