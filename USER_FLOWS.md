# MAJAZ - Complete User Flows & Journeys

*A comprehensive guide to all user paths through the MAJAZ platform*

---

## 🎯 Core User Flows

### **Flow 1: Discovery → AI Interview → Package Purchase**

**Start:** User lands on homepage
**Goal:** User completes AI interview and purchases package
**Pages:** 4 pages, ~5-10 minutes

```
┌──────────────────────────────────────────────────────────┐
│                   1. HOMEPAGE (/en)                      │
│  "Never Buy or Sell a Car Alone Again"                   │
│                                                          │
│  User sees:                                              │
│  - Hero with luxury vehicle image                       │
│  - Value prop: "Inspections • Intelligence • Auction"   │
│  - Pricing context: "From 49 AED to $10k/year"          │
│  - Trust indicators: 5000+ vehicles, 98% accuracy       │
│                                                          │
│  CTAs:                                                   │
│  ┌────────────────────┐  ┌─────────────────────┐        │
│  │ Speak with AI      │  │ Explore Services    │        │
│  │ Advisor ✨         │  │                     │        │
│  └────────┬───────────┘  └────────┬────────────┘        │
└───────────│──────────────────────┬──────────────────────┘
            │                      │
            v                      v
┌───────────────────────┐  ┌─────────────────────────────┐
│ 2A. AI INTERVIEW      │  │ 2B. WHAT WE OFFER           │
│ (/interview)          │  │ (/what-we-offer)            │
│                       │  │                             │
│ - Voice conversation  │  │ Hero Section:               │
│ - Microphone button   │  │ - "Bespoke Solutions"       │
│ - Voice visualizer    │  │ - 8 packages displayed      │
│ - 5 questions:        │  │                             │
│   1. What are you     │  │ Individual Services:        │
│      looking for?     │  │ 1. Remote Assessment 49     │
│   2. Vehicle type?    │  │ 2. Remote Express 89        │
│   3. Budget range?    │  │ 3. Remote Same-Day 129      │
│   4. Timeline?        │  │ 4. On-Site 169              │
│   5. Previous exp?    │  │ 5. On-Site Express 209      │
│                       │  │                             │
│ - AI recommendation   │  │ Concierge Memberships:      │
│ - Transcript display  │  │ 6. Gold Concierge 36.7k     │
│                       │  │ 7. Platinum 91.7k           │
│ CTA: "View Packages"  │  │ 8. Diamond 183.5k+          │
└───────────┬───────────┘  │                             │
            │              │ CTA: "Start Voice           │
            │              │      Conversation"          │
            └──────────────┴───────┬─────────────────────┘
                                  │
                                  v
            ┌──────────────────────────────────────┐
            │    3. PACKAGES PAGE (/packages)      │
            │                                      │
            │ Duration Toggle:                     │
            │ ┌─────────┬──────────┬──────────┐   │
            │ │ Monthly │Quarterly │ Annual   │   │
            │ └─────────┴──────────┴──────────┘   │
            │                                      │
            │ Individual Services Grid:            │
            │ [Remote Assessment] [Remote Express] │
            │ [Remote Same-Day] [On-Site]          │
            │ [On-Site Express]                    │
            │                                      │
            │ Concierge Memberships Grid:          │
            │ [Gold] [Platinum] [Diamond]          │
            │                                      │
            │ Each card shows:                     │
            │ - Professional AI image              │
            │ - Title & description                │
            │ - Features list                      │
            │ - Price (updates with duration)      │
            │ - "Select Package" button            │
            │                                      │
            │ FAQ Section (4 questions)            │
            │ AI Interview CTA Section             │
            └──────────────┬───────────────────────┘
                           │
                           v
            ┌──────────────────────────────────────┐
            │  4. CHECKOUT (/checkout/[slug])      │
            │                                      │
            │ Left Side:                           │
            │ - Contact form                       │
            │   • Full name                        │
            │   • Email                            │
            │   • Phone (+971)                     │
            │   • Vehicle details (if applicable)  │
            │ - Terms & Conditions checkbox        │
            │ - Stripe payment form                │
            │                                      │
            │ Right Side (Sticky):                 │
            │ - Order Summary card                 │
            │   • Package image                    │
            │   • Package name                     │
            │   • Duration badge                   │
            │   • Features list                    │
            │   • Price breakdown                  │
            │   • Subtotal                         │
            │   • VAT (5%)                         │
            │   • Total in AED                     │
            │                                      │
            │ CTA: "Complete Purchase"             │
            └──────────────┬───────────────────────┘
                           │
                           v
            ┌──────────────────────────────────────┐
            │   5. SUCCESS / DASHBOARD             │
            │                                      │
            │ - Payment confirmation               │
            │ - Email sent                         │
            │ - Account created/login              │
            │ - Redirect to dashboard              │
            └──────────────────────────────────────┘
```

**Conversion Metrics:**
- Homepage → Interview: 15% target
- Interview → Packages: 60% target
- Packages → Checkout: 25% target
- Checkout → Purchase: 70% target
- **Overall conversion: 1.6% (homepage to purchase)**

---

### **Flow 2: Quick Service Purchase (Individual Service)**

**Start:** User needs one-time inspection
**Goal:** Purchase 49 AED remote assessment
**Time:** 2-3 minutes

```
Homepage → Explore Services → What We Offer → Select "Remote Assessment"
→ Checkout → Payment → Confirmation
```

**Steps:**
1. **Homepage** - Click "Explore Services"
2. **What We Offer** - Browse individual services, click "Select Remote Assessment"
3. **Checkout** - Fill form, pay 49 AED
4. **Dashboard** - Request created, status: "Pending"

**User receives:**
- Confirmation email
- Request ID
- 48-hour delivery promise
- Inspector assignment notification

---

### **Flow 3: Premium Membership Journey (Gold Concierge)**

**Start:** UHNW individual wants full service
**Goal:** Subscribe to Gold Concierge (36,700 AED/year)
**Time:** 15-30 minutes (discovery + decision)

```
┌─────────────────────────────────────────────────────┐
│ Discovery Phase (Homepage)                          │
│                                                     │
│ User Profile:                                       │
│ - UHNW individual (5M+ net worth)                  │
│ - Owns 3-5 luxury vehicles (Ferrari, G-Wagon, etc)│
│ - Values white-glove service                       │
│ - Time-conscious                                    │
│                                                     │
│ Journey:                                            │
│ 1. Lands on homepage                               │
│ 2. Reads "Never Buy or Sell a Car Alone"          │
│ 3. Sees "$10k/year" pricing → intrigued            │
│ 4. Clicks "Speak with AI Advisor"                  │
└─────────────┬───────────────────────────────────────┘
              v
┌─────────────────────────────────────────────────────┐
│ Qualification Phase (AI Interview)                  │
│                                                     │
│ AI asks:                                            │
│ Q1: "Looking to buy, sell, or manage collection?"  │
│ A1: "Manage my collection + occasional purchases"  │
│                                                     │
│ Q2: "How many vehicles do you currently own?"      │
│ A2: "5 vehicles - 3 exotics, 2 SUVs"              │
│                                                     │
│ Q3: "Budget range for new acquisitions?"           │
│ A3: "500k - 2M AED per vehicle"                    │
│                                                     │
│ Q4: "How often do you buy/sell?"                   │
│ A4: "2-3 purchases per year, 1-2 sales"           │
│                                                     │
│ Q5: "Current pain points?"                         │
│ A5: "Time wasted on tire-kickers, worried about    │
│      overpaying, want expert help"                 │
│                                                     │
│ AI Recommendation:                                  │
│ "Based on your profile, Gold Concierge saves you   │
│ 100+ hours/year and typically 200k+ AED through    │
│ better deals. Let me show you..."                  │
└─────────────┬───────────────────────────────────────┘
              v
┌─────────────────────────────────────────────────────┐
│ Education Phase (What We Offer / Packages)          │
│                                                     │
│ User compares tiers:                                │
│                                                     │
│ Remote Express (89 AED) ❌ "Too basic"             │
│ Gold Concierge (36.7k) ✅ "Perfect fit"            │
│ Platinum (91.7k) ⚠️ "Maybe overkill for now"      │
│                                                     │
│ Gold Concierge features that resonate:              │
│ ✅ Unlimited inspections → "Worth it for peace"   │
│ ✅ Personal concierge → "Saves me time"            │
│ ✅ Auction bidding → "I hate auctions"             │
│ ✅ Professional selling → "Always struggle here"   │
│ ✅ VIP events → "Good networking"                  │
│                                                     │
│ Value calculation in user's mind:                   │
│ - 10 inspections/year = 1,690 AED saved           │
│ - Better deal on 1 purchase = 50,000 AED saved    │
│ - Selling service = 5,000 AED saved                │
│ - Time saved = priceless                           │
│ Total perceived value: 100k+ AED                   │
│ Cost: 36,700 AED                                    │
│ ROI: 200%+ easy                                     │
│                                                     │
│ Decision: "This is worth it"                        │
│ Click: "Select Gold Concierge - Annual"            │
└─────────────┬───────────────────────────────────────┘
              v
┌─────────────────────────────────────────────────────┐
│ Purchase Phase (Checkout)                           │
│                                                     │
│ Contact Form:                                       │
│ - Name: Ahmed Al Maktoum                           │
│ - Email: ahmed@example.ae                          │
│ - Phone: +971 50 123 4567                          │
│ - Current vehicles: "Ferrari 488, G-Wagon, etc"   │
│                                                     │
│ Order Summary:                                      │
│ Gold Concierge (Annual)                            │
│ Subtotal: 36,700 AED                               │
│ VAT (5%): 1,835 AED                                │
│ Total: 38,535 AED                                  │
│                                                     │
│ Payment: Stripe (card) or bank transfer            │
│ Terms: ✅ Accepted                                 │
│                                                     │
│ Click: "Complete Purchase"                          │
└─────────────┬───────────────────────────────────────┘
              v
┌─────────────────────────────────────────────────────┐
│ Onboarding Phase (Post-Purchase)                    │
│                                                     │
│ Immediate:                                          │
│ - Payment confirmation email                        │
│ - Welcome email with Gold card digital copy        │
│ - Calendar invite: Concierge intro call (30 min)   │
│                                                     │
│ Within 24 hours:                                    │
│ - Assigned concierge manager: "Fatima Al Zeyoudi"  │
│ - WhatsApp added to VIP group                      │
│ - Dashboard access with portfolio view             │
│ - Physical Gold card shipped (1-2 days)            │
│                                                     │
│ Within 1 week:                                      │
│ - Intro call completed                             │
│ - Current garage inventory added                   │
│ - Market valuations generated                      │
│ - Upcoming events calendar shared                  │
│                                                     │
│ Ongoing:                                            │
│ - Monthly market intelligence reports              │
│ - Proactive sourcing opportunities                 │
│ - Event invitations (track days, dinners)          │
│ - 24/7 concierge access via WhatsApp              │
└─────────────────────────────────────────────────────┘
```

**Lifetime Value Calculation:**
- Year 1: 38,535 AED
- Renewal Rate: 80% (Gold tier)
- Year 2-5: 38,535 × 4 × 0.8 = 123,312 AED
- **Total LTV: 161,847 AED (~$44k USD)**

**Upgrade Path:**
- 20% of Gold members upgrade to Platinum within 18 months
- Platinum LTV: 400k+ AED

---

### **Flow 4: Authentication & Dashboard Access**

**Start:** User wants to check past reports
**Goal:** Login and view dashboard

```
Homepage → Login → Dashboard → View Requests/Reports
```

**Login Options:**
1. **Email/Password**
   - Email: user@example.com
   - Password: ********
   - 2FA (optional): SMS code

2. **Social Login**
   - Google OAuth
   - Apple Sign-In

**Dashboard Structure:**

```
┌─────────────────────────────────────────────────────┐
│ MAJAZ Dashboard                                     │
│                                                     │
│ ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│ │ Active      │  │ Completed   │  │ Total       │ │
│ │ Requests    │  │ Reports     │  │ Spent       │ │
│ │     3       │  │     12      │  │  2,450 AED  │ │
│ └─────────────┘  └─────────────┘  └─────────────┘ │
│                                                     │
│ Recent Requests:                                    │
│ ┌─────────────────────────────────────────────────┐│
│ │ ⏳ 2021 Porsche 911 - Remote Assessment         ││
│ │    Status: In Progress (24h remaining)          ││
│ │    Inspector: Mohammed Al Ali                   ││
│ └─────────────────────────────────────────────────┘│
│ ┌─────────────────────────────────────────────────┐│
│ │ ✅ 2020 G-Wagon - On-Site Inspection           ││
│ │    Completed: 2 days ago                        ││
│ │    [View Report] [Download PDF]                 ││
│ └─────────────────────────────────────────────────┘│
│                                                     │
│ Quick Actions:                                      │
│ [+ New Request] [View All Reports] [Profile]       │
└─────────────────────────────────────────────────────┘
```

**Navigation:**
```
Sidebar:
├── 📊 Dashboard (overview)
├── 📝 Requests (all inspection requests)
│   ├── Create New
│   └── View All
├── 📄 Reports (completed reports)
├── 💳 Billing (payment history)
├── 👤 Profile (account settings)
└── 🏆 Membership (if Gold/Platinum/Diamond)
    ├── Concierge Chat
    ├── My Garage
    ├── Market Intelligence
    └── Events
```

---

### **Flow 5: Creating New Inspection Request**

**Start:** User has vehicle listing URL
**Goal:** Submit inspection request and pay

```
Dashboard → New Request → Auto-scrape → Review → Pay → Confirmation
```

**Step-by-Step:**

```
┌─────────────────────────────────────────────────────┐
│ Step 1: Paste URL                                   │
│                                                     │
│ Paste listing URL:                                  │
│ ┌─────────────────────────────────────────────────┐│
│ │ https://emiratesauction.com/vehicle/12345       ││
│ └─────────────────────────────────────────────────┘│
│                                                     │
│ [Auto-Scrape Details]                               │
└─────────────┬───────────────────────────────────────┘
              v
┌─────────────────────────────────────────────────────┐
│ Step 2: Verify Details (Auto-filled)               │
│                                                     │
│ Vehicle Information:                                │
│ - Make: Porsche                                     │
│ - Model: 911 Carrera S                             │
│ - Year: 2020                                        │
│ - Mileage: 15,000 km                               │
│ - Color: GT Silver                                  │
│ - VIN: WP0AB2A99LS123456                           │
│ - Asking Price: 450,000 AED                         │
│ - Location: Dubai, UAE                              │
│                                                     │
│ [Edit if needed]                                    │
└─────────────┬───────────────────────────────────────┘
              v
┌─────────────────────────────────────────────────────┐
│ Step 3: Select Service                              │
│                                                     │
│ Choose Service:                                     │
│ ○ Remote Assessment (49 AED - 48h)                 │
│ ○ Remote Express (89 AED - 24h)                    │
│ ● Remote Same-Day (129 AED - same day)             │
│ ○ On-Site Inspection (169 AED - 48h)               │
│ ○ On-Site Express (209 AED - 24h)                  │
│                                                     │
│ Selected: Remote Same-Day (129 AED)                │
└─────────────┬───────────────────────────────────────┘
              v
┌─────────────────────────────────────────────────────┐
│ Step 4: Additional Information (Optional)           │
│                                                     │
│ Questions for inspector:                            │
│ ┌─────────────────────────────────────────────────┐│
│ │ Please focus on paint condition and service     ││
│ │ history. Concerned about accident history.      ││
│ └─────────────────────────────────────────────────┘│
│                                                     │
│ Upload additional photos (optional):                │
│ [+ Add Photos]                                      │
│                                                     │
│ Your budget/max bid:                                │
│ ┌─────────────────┐                                │
│ │ 420,000 AED     │                                │
│ └─────────────────┘                                │
└─────────────┬───────────────────────────────────────┘
              v
┌─────────────────────────────────────────────────────┐
│ Step 5: Payment                                     │
│                                                     │
│ Order Summary:                                      │
│ Remote Same-Day Inspection                          │
│                                                     │
│ Subtotal:     129.00 AED                           │
│ VAT (5%):       6.45 AED                           │
│ Total:        135.45 AED                           │
│                                                     │
│ Payment Method:                                     │
│ ● Credit Card (Stripe)                             │
│ ○ Apple Pay                                         │
│ ○ Bank Transfer                                     │
│                                                     │
│ [Complete Payment]                                  │
└─────────────┬───────────────────────────────────────┘
              v
┌─────────────────────────────────────────────────────┐
│ Step 6: Confirmation                                │
│                                                     │
│ ✅ Request Created Successfully!                   │
│                                                     │
│ Request ID: #MAJ-20250111-4521                     │
│ Status: Pending Assignment                          │
│ Expected Delivery: Today, 11:59 PM GST             │
│                                                     │
│ What happens next:                                  │
│ 1. ✅ Inspector assigned (within 1 hour)          │
│ 2. ⏳ Analysis in progress (same day)              │
│ 3. ⏳ Report delivered (by 11:59 PM)               │
│                                                     │
│ You'll receive:                                     │
│ - Email confirmation                                │
│ - SMS updates                                       │
│ - WhatsApp notifications (if opted in)             │
│                                                     │
│ [View Request] [Back to Dashboard]                 │
└─────────────────────────────────────────────────────┘
```

---

## 📱 Mobile User Flows

All flows are **100% mobile responsive** with optimized layouts:

### Mobile-Specific Considerations:

```
Mobile Homepage:
┌──────────────────┐
│ [MAJAZ Logo]     │
│ ☰ Menu           │
├──────────────────┤
│                  │
│  Hero Image      │
│  (Full Width)    │
│                  │
├──────────────────┤
│ Never Buy or Sell│
│ a Car Alone Again│
│                  │
│ [Speak with AI]  │
│ [Explore]        │
├──────────────────┤
│ 🌟 5000+ Vehicles│
│ 🌟 98% Accuracy  │
└──────────────────┘

Mobile AI Interview:
┌──────────────────┐
│ Question 1 of 5  │
│ ████░░░░░░ 20%   │
├──────────────────┤
│                  │
│   [  🎙️  ]      │
│    (Tap to       │
│     speak)       │
│                  │
│ ▂▃▅▇▅▃▂▃▅▇▅▃    │
│ (Voice bars)     │
├──────────────────┤
│ Transcript:      │
│ "I'm looking to  │
│ buy a used       │
│ Porsche..."      │
└──────────────────┘
```

**Mobile Optimizations:**
- Touch-friendly buttons (48px minimum)
- Swipeable package cards
- Sticky checkout summary
- One-tap WhatsApp contact
- Apple Pay / Google Pay support
- Simplified forms (fewer fields)

---

## 🌐 RTL Arabic Flows

All flows support **full RTL layout** for Arabic users:

### RTL Considerations:

```
Arabic Homepage:
┌──────────────────────────────┐
│           قائمة ☰    MAJAZ  │ (Flipped header)
├──────────────────────────────┤
│        لا تشتري أو تبيع      │ (RTL text)
│        سيارة بمفردك أبداً    │
│                              │
│  [استكشف الخدمات] [تحدث]    │ (RTL buttons)
└──────────────────────────────┘

Arabic Price Display:
٣٦٬٧٠٠ درهم / سنوياً        (Arabic numerals optional)
36,700 AED / annually         (English numerals default)
```

**RTL Flow Differences:**
- Navigation: Right to left
- Forms: Right-aligned labels
- Cards: Right-to-left reading
- Icons: Mirrored arrows
- Dates: Hijri calendar option
- Numbers: Western Arabic numerals (default)

---

## 🎨 Key Interaction Patterns

### Glass Morphism Hover States

```
Card at Rest:
┌─────────────────────────────┐
│ background: rgba(26,26,26,  │
│             0.6)             │
│ blur: 20px                   │
│ border: 1px gold 20%         │
└─────────────────────────────┘

Card on Hover:
┌─────────────────────────────┐
│ transform: translateY(-8px) │
│ scale: 1.02                  │
│ shadow: 0 12px 40px gold    │
│ border: 1px gold 40%         │
│ transition: 0.4s ease        │
└─────────────────────────────┘
```

### Button States

```
Primary Button (Gold):
Normal:   background: linear-gradient(135deg, #D4AF37, #B8941E)
Hover:    transform: translateY(-2px), glow
Active:   transform: scale(0.98)
Disabled: opacity: 0.5, cursor: not-allowed

Secondary Button (Outline):
Normal:   border: 2px solid gold, transparent bg
Hover:    background: rgba(212,175,55,0.1)
Active:   border-width: 3px
```

### Voice Visualizer Animation

```
Idle State:
▂▂▂▂▂▂▂▂▂▂ (flat bars, pulsing microphone)

Listening State:
▂▃▅▇▅▃▂▃▅▇ (animated bars, 60fps)

Speaking State:
▃▅▇█▇▅▃▅▇█ (dynamic bars matching audio)
```

---

## 🔄 State Management Flows

### Package Selection State

```
User Journey:
1. View packages → State: browsing
2. Toggle duration → State: duration = "annual"
3. Click "Select" → State: selected = "gold-concierge"
4. Add to cart → State: cart = {...packageData}
5. Navigate checkout → State: checkout.step = 1
```

### Checkout Flow State

```
Checkout Steps:
Step 1: Contact Info
  - Form validation
  - State: contactInfo = {name, email, phone}

Step 2: Payment
  - Stripe initialization
  - State: paymentIntent = {...}

Step 3: Confirmation
  - Payment processing
  - State: status = "processing" | "success" | "error"

Step 4: Success
  - Redirect to dashboard
  - State: order = {...orderDetails}
```

---

## 📊 Conversion Optimization Points

### Critical Conversion Moments:

1. **Homepage → Interview (15% target)**
   - CTA: "Speak with AI Advisor" (microphone icon)
   - Optimization: Emotional headline, trust indicators
   - A/B test: Button copy, button color, placement

2. **Interview → Packages (60% target)**
   - CTA: "View Recommended Package"
   - Optimization: Personalized recommendation, urgency
   - A/B test: Recommendation phrasing, discount offers

3. **Packages → Checkout (25% target)**
   - CTA: "Select Gold Concierge"
   - Optimization: Value comparison, ROI calculator
   - A/B test: Pricing display, features highlighting

4. **Checkout → Purchase (70% target)**
   - CTA: "Complete Purchase"
   - Optimization: Trust signals, money-back guarantee
   - A/B test: Payment options, form length

**Overall Funnel:**
```
10,000 Homepage Visitors
    ↓ 15%
1,500 Start AI Interview
    ↓ 60%
900 View Packages
    ↓ 25%
225 Enter Checkout
    ↓ 70%
158 Complete Purchase

Conversion Rate: 1.58%
```

**Revenue Projection:**
- 158 purchases/month
- Average order: 45,000 AED (mix of individual + memberships)
- Monthly Revenue: 7.1M AED ($1.93M USD)
- Annual Revenue: 85M AED ($23M USD)

---

## 🎯 Edge Cases & Error Flows

### Failed Payment Flow

```
Checkout → Payment Failed
    ↓
Error Message: "Payment could not be processed"
    ↓
Options:
1. [Retry Payment]
2. [Try Different Card]
3. [Contact Support]
    ↓
If retry succeeds → Success flow
If retry fails 3× → Manual support contact
```

### Expired Session Flow

```
User inactive 30 minutes
    ↓
Session expires
    ↓
User tries to checkout
    ↓
Redirect to login
    ↓
After login → Return to cart (preserved)
```

### Network Error Flow

```
Request submission fails (offline)
    ↓
Show toast: "No internet connection"
    ↓
Retry automatically when online
    ↓
Show toast: "Request submitted successfully"
```

---

## ✅ Testing Checklist

### Flow Testing (per flow):

- [ ] Happy path works end-to-end
- [ ] All CTAs clickable and functional
- [ ] Forms validate correctly
- [ ] Payments process successfully
- [ ] Confirmations display
- [ ] Emails sent correctly
- [ ] Mobile responsive
- [ ] RTL Arabic works
- [ ] Back button works
- [ ] Refresh preserves state

### Specific Tests:

**AI Interview:**
- [ ] Microphone permission requested
- [ ] Voice visualization animates
- [ ] Transcript updates in real-time
- [ ] Progress indicator accurate
- [ ] Can restart interview
- [ ] Works on mobile Safari/Chrome
- [ ] Works with Bluetooth headphones

**Package Page:**
- [ ] Duration toggle updates prices
- [ ] All 8 packages display
- [ ] Images load correctly
- [ ] Hover effects smooth
- [ ] Mobile: Cards swipeable
- [ ] Arabic: RTL layout correct

**Checkout:**
- [ ] Stripe loads correctly
- [ ] Form validation works
- [ ] Price calculation correct
- [ ] Payment succeeds
- [ ] Webhooks fire
- [ ] Email confirmation sent
- [ ] Database record created

---

## 📈 Analytics Tracking Events

### Event Tracking Schema:

```javascript
// Homepage
track('homepage_viewed')
track('cta_clicked', {type: 'ai_interview' | 'explore'})
track('scroll_depth', {depth: '25%' | '50%' | '75%' | '100%'})

// AI Interview
track('interview_started')
track('interview_question_answered', {question: 1-5})
track('interview_completed')
track('interview_abandoned', {question: 1-5})

// Packages
track('packages_viewed')
track('duration_toggled', {duration: 'monthly' | 'quarterly' | 'annual'})
track('package_selected', {package: 'gold-concierge', price: 36700})

// Checkout
track('checkout_started', {package: 'gold-concierge', value: 36700})
track('checkout_info_completed')
track('checkout_payment_initiated')
track('checkout_completed', {package: 'gold-concierge', value: 36700})

// Errors
track('error_occurred', {page: '/checkout', error: 'payment_failed'})
```

---

*This document is the complete reference for all user flows in MAJAZ.*
*Last updated: 2025-01-11*
*Version: 1.0*
