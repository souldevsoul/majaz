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

## **"MAJAZ CONCIERGE MEMBERSHIP"**

### Product Overview:
**Ultra-premium annual membership for high-net-worth individuals who want white-glove vehicle acquisition and ownership services**

### Target Customers:
- Ultra-High-Net-Worth Individuals (UHNW) in UAE/GCC
- Exotic/luxury car collectors (Ferrari, Lamborghini, Rolls-Royce owners)
- Multi-vehicle households (5+ vehicles)
- International buyers purchasing UAE vehicles
- Royal family members and business tycoons

### Core Features (Justifying $10k/year):

#### **1. Unlimited Premium Inspections**
- **Unlimited on-site inspections** (normally 169-209 AED each)
- **Same-day priority service** (no extra charge)
- **24/7 emergency inspection** availability
- **International inspections**: Europe, USA, Japan for import vehicles
- **Pre-delivery inspection** for new exotic cars

**Value**: 50+ inspections/year = 10,000 AED saved at standard rates

#### **2. Personal Vehicle Concierge**
- **Dedicated concierge manager** (WhatsApp, phone, email)
- **Vehicle sourcing service**: Find rare/specific models globally
- **Auction bidding representation**: Emirates Auction, RM Sotheby's, Bring a Trailer
- **Negotiation on your behalf**: With dealers and private sellers
- **Test drive coordination**: We arrange and accompany
- **Delivery & registration handling**: Complete white-glove service

**Services Include**:
- "Find me a 2020 Porsche 911 GT3 RS in Miami Blue"
- "Bid up to 450k AED on this Ferrari at Emirates Auction"
- "Negotiate this G-Wagon down from 550k to 480k AED"

#### **3. Portfolio Management Dashboard**
```
/dashboard/concierge/garage        - Your vehicle portfolio (photos, docs, valuations)
/dashboard/concierge/valuations    - Real-time market value tracking
/dashboard/concierge/maintenance   - Service history & upcoming maintenance
/dashboard/concierge/marketplace   - Curated listings matching your taste
/dashboard/concierge/concierge     - Direct messaging with your concierge
```

**Features**:
- Track current market value of your entire collection
- Get alerts when value changes ±10%
- Service reminder notifications
- Insurance renewal tracking
- Registration expiry alerts
- Personalized acquisition opportunities

#### **4. VIP Market Intelligence**
- **Exclusive Market Reports**: Monthly insights on luxury/exotic segment
- **Pre-Market Opportunities**: First access to off-market vehicles
- **Import Analysis**: Best countries to source specific models
- **Investment Advice**: Which vehicles will appreciate vs depreciate
- **Celebrity/Royal Provenance**: Track ownership history of special vehicles

**Intelligence Includes**:
- "Porsche 911 GT3 RS values up 15% this quarter in UAE"
- "Off-market: Sheikh's low-mileage Aventador SVJ available"
- "Best time to buy Urus: September (post-summer dip)"

#### **5. Luxury Seller Services**
- **Professional photography**: 50+ image studio shoot
- **Video walkaround**: 4K cinematic video production
- **Marketing copywriting**: Compelling vehicle descriptions
- **Multi-platform listing**: dubizzle, CarSwitch, AutoTrader, international sites
- **Buyer vetting**: We screen and qualify potential buyers
- **Negotiation handling**: We deal with tire-kickers
- **Paperwork & transfer**: Complete transaction management

**Value**: Professional listing package alone worth 5,000 AED

#### **6. Exclusive Events & Networking**
- **Private viewings**: Early access to auction vehicles
- **VIP lounge access**: Emirates Auction VIP area
- **Quarterly member events**: Drives, dinners, track days
- **Global automotive events**: Introduce to Pebble Beach, Goodwood, Geneva connections
- **Member-only marketplace**: Buy/sell within MAJAZ network

#### **7. Lifestyle Concierge Add-Ons**
- **Supercar track day booking**: Yas Marina, Dubai Autodrome
- **Exotic car rental coordination**: For international travel
- **Driving experience gifts**: For family/clients
- **Collection insurance**: Specialized coverage recommendations
- **Secure storage solutions**: Climate-controlled garage referrals

#### **8. International Vehicle Import Service**
- **Global sourcing**: USA, Japan, Europe, UK
- **Shipping coordination**: Container booking, customs clearance
- **Homologation assistance**: UAE compliance modifications
- **RTA registration**: Fast-track import registration
- **Pre-shipment inspection**: Local expert inspection before you commit

**Example**: "Find and import a 2015 Lexus LFA from Japan"
- We find vehicle, inspect, negotiate, ship, register in UAE

#### **9. Legal & Documentation Support**
- **Ownership history verification**: Full background check
- **Fraud protection**: Certificate of authenticity for special vehicles
- **Contract review**: Purchase agreement legal review
- **Warranty coordination**: Extended warranty recommendations
- **Export documentation**: If selling internationally

#### **10. Family Fleet Management**
- **Multi-vehicle coordination**: Manage spouse/children's vehicles too
- **Driver vetting**: Check backgrounds of new drivers
- **Maintenance scheduling**: Coordinate services across all vehicles
- **Insurance optimization**: Group policy recommendations
- **Teenager car advice**: Safe, appropriate vehicle recommendations

### Pricing Model:
```
MAJAZ CONCIERGE MEMBERSHIP

Gold Tier: $10,000 USD/year (36,700 AED)
✅ Unlimited on-site inspections (same-day priority)
✅ Personal vehicle concierge (WhatsApp/phone)
✅ Portfolio management dashboard
✅ Monthly market intelligence reports
✅ Vehicle sourcing (up to 3 searches/year)
✅ Professional seller services (1 vehicle/year)
✅ Member events access
✅ 24/7 support
🚫 International inspections (add-on available)

Platinum Tier: $25,000 USD/year (91,750 AED)
✅ Everything in Gold, PLUS:
✅ Unlimited vehicle sourcing
✅ International inspections (USA, Europe, Japan)
✅ Global import service (1 vehicle/year)
✅ Auction representation (unlimited)
✅ Professional seller services (unlimited vehicles)
✅ VIP event access (Pebble Beach invites, etc.)
✅ Direct mobile line to your concierge
✅ Guaranteed 2-hour response time

Diamond Tier: $50,000+ USD/year (Custom)
✅ Everything in Platinum, PLUS:
✅ Dedicated full-time concierge (exclusive to you)
✅ Unlimited international inspections
✅ Unlimited global imports
✅ Private jet coordination for vehicle viewings
✅ Bespoke automotive experiences
✅ Direct relationships with exotic dealers globally
✅ First access to ultra-rare vehicles
✅ Annual portfolio review with CEO

One-Time Experiences (Non-Members):
- Single International Import: $5,000
- Auction Representation: $3,000
- Professional Seller Package: $5,000
```

### Why Worth $10k/year for Individuals?

**ROI Breakdown (Gold Tier @ $10k/year):**

1. **Inspection Savings**:
   - 50 inspections/year × 200 AED = 10,000 AED saved
   - Same-day priority (normally +40 AED) × 50 = 2,000 AED saved

2. **Time Savings**:
   - 100+ hours saved on research/coordination
   - Your time worth 500-1000 AED/hour? = 50,000-100,000 AED value

3. **Negotiation Advantage**:
   - Average savings per vehicle: 15,000-50,000 AED
   - Just 1 purchase = membership pays for itself
   - Avoid 1 bad purchase = 100,000-500,000 AED saved

4. **Professional Services**:
   - Photography + listing package: 5,000 AED value
   - Market intelligence reports: 2,000 AED/month value
   - Legal/documentation support: 10,000 AED/year value

5. **Exclusive Access**:
   - Pre-market opportunities: Priceless
   - Off-market vehicles: Often 10-20% below market
   - International sourcing: Access to global inventory

6. **Peace of Mind**:
   - No fraudulent purchases
   - No undisclosed damage
   - No overpaying
   - White-glove service = stress-free ownership

**Example Member Journey:**
```
Meet Ahmed - MAJAZ Gold Member

January: Joined membership - $10,000
February: Sourced off-market 2021 Urus - Saved 80,000 AED vs market
March: Inspected 3 potential G-Wagons before finding perfect one
April: Sold his 2019 911 using pro photography - Sold 50k AED above asking
June: Imported 2016 Nissan GT-R from Japan - Saved 120,000 AED vs UAE market
August: Used concierge to negotiate new Range Rover - Saved 60,000 AED
October: Inspections for son's first car - Found hidden accident damage
December: Year-end portfolio value: +18% despite market being flat

Total value received: 310,000+ AED
Membership cost: 36,700 AED
ROI: 845%
```

### Competitive Advantage:
- **No one else offers this in UAE**: First-to-market luxury vehicle concierge
- **White-glove service**: Not just inspection, full ownership lifecycle
- **Global reach**: International inspections + import service
- **Relationship-based**: Personal concierge who knows your taste
- **Exclusive network**: Member-only marketplace and events
- **Status symbol**: MAJAZ Gold card = automotive sophistication

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
   - Target: 1,000 requests/month → 150k AED/month = 1.8M AED/year ($490k USD)

2. **Gold Members** ($10k/year)
   - Target: 50 members × $10k = $500k USD/year
   - Realistic in Dubai (15,000+ Lamborghini/Ferrari owners)

3. **Platinum Members** ($25k/year)
   - Target: 10 members × $25k = $250k USD/year
   - Ultra-premium tier for serious collectors

4. **Diamond Members** ($50k+/year)
   - Target: 2 members × $75k avg = $150k USD/year
   - Royal family, major collectors

5. **One-Time Premium Services**
   - 20 imports/year × $5k = $100k USD
   - 30 seller packages/year × $5k = $150k USD

**Total Year 1 ARR**: ~$1.54M USD

**Year 3 Target**: $5M USD
- 200 Gold members
- 30 Platinum members
- 5 Diamond members
- 3,000 individual requests/month

---

## Marketing Strategy for Premium Membership

### Sales Approach:
1. **Exclusivity Marketing**:
   - Invitation-only launch (first 100 members)
   - Application process with interview
   - "By referral only" positioning

2. **High-Touch Outreach**:
   - Target: Lamborghini/Ferrari/Rolls owners via RTA database partnerships
   - Personal letters to villa addresses in Emirates Hills, Palm Jumeirah
   - Private lunch invitations (not sales pitches)
   - Partnerships with luxury car dealers (referral program)

3. **Content & Thought Leadership**:
   - Instagram: @majaz.concierge with exotic car content
   - YouTube: "Inside a $10M Car Collection in Dubai"
   - Podcast: Interviews with major collectors
   - WhatsApp channel: Daily exotic car market updates

4. **Strategic Partnerships**:
   - **Emirates Auction**: VIP lounge sponsorship
   - **Luxury hotels**: Concierge desk partnerships (Burj Al Arab, Atlantis)
   - **Private banks**: Coutts, Julius Baer client referrals
   - **Exotic dealers**: Official inspection partner (Al Tayer Motors, Arabian Automobiles)

5. **Events & Experiences**:
   - Quarterly members-only drive: Jebel Jais, Liwa Desert
   - Annual gala dinner at Burj Khalifa
   - Private track day at Yas Marina Circuit
   - Bring members to Monterey Car Week

6. **Proof Points**:
   - Feature founding members' collections (with permission)
   - Case studies: "How MAJAZ saved this collector 500k AED"
   - Testimonials from royal family members (if possible)
   - Press coverage: Arabian Business, Gulf News, Bloomberg Middle East

### Key Selling Points:
- **"The Amex Black Card of Car Ownership"**
- "Never buy or sell a car alone again"
- "We bought a GT3 RS from Miami, inspected it there, shipped it, and registered it in Dubai - you didn't lift a finger"
- "Members have saved an average of 180,000 AED in their first year"
- "Your time is worth more than researching dubizzle"
- "Join the UAE's most exclusive automotive community"

### Conversion Funnel:
1. **Awareness**: Luxury lifestyle content
2. **Interest**: "Apply for membership" landing page
3. **Application**: Share your collection, automotive goals
4. **Interview**: 30-min call with founder
5. **Invitation**: Personal invitation letter + Gold card
6. **Onboarding**: White-glove concierge intro call
7. **Activation**: First service within 7 days

### Pricing Psychology:
- Frame as **36,700 AED/year** (sounds less than 10k USD)
- Compare to:
  - One G-Wagon payment (60k AED)
  - Monthly parking in downtown Dubai (3k AED/month = 36k/year)
  - Insurance for exotic car (40-60k AED/year)
- Position: "Less than the cost of one bad purchase"

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
