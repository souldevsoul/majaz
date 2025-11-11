# MAJAZ Packages & E-Commerce Implementation Plan

## Overview
Build complete packages page with pricing, e-commerce checkout, AI agent interview system, and membership gating.

---

## Phase 1: Packages Page Design & Data Structure ✅

### 1.1 Package Data Structure ✅
- [x] Create `/data/packages.ts` with all package definitions
- [x] Define pricing tiers: Basic, Standard, Premium, Gold, Platinum, Diamond
- [x] Set pricing for monthly/quarterly/annual durations
- [x] Write image generation prompts for each package

### 1.2 Package Types
**Individual Services:**
- Remote Assessment (49 AED)
- Remote Express (89 AED)
- Remote Same-Day (129 AED)
- On-Site Inspection (169 AED)
- On-Site Express (209 AED)

**Concierge Memberships:**
- Gold Concierge (36,700 AED/year)
- Platinum Concierge (91,750 AED/year)
- Diamond Concierge (183,500+ AED/year - custom)

---

## Phase 2: Generate Package Images with Replicate

### 2.1 Set Up Image Generation Script
```bash
/scripts/generate-package-images.ts
```

**Requirements:**
- Use existing `/lib/replicate.ts`
- Access Replicate API via MCP tool
- Generate 9 images (one per package)
- Download to `/public/images/packages/`
- Update package data with image paths

### 2.2 Image Specifications
- **Dimensions**: 1200x800px (3:2 ratio)
- **Style**: Ultra-premium editorial photography
- **Lighting**: Golden hour Dubai aesthetic
- **Quality**: Phase One IQ4 camera level
- **Model**: Google Imagen-4-ultra or SDXL

### 2.3 Prompts (already in `/data/packages.ts`)
- Remote services: Professional in Dubai office with laptop/iPad
- On-site services: Inspector with vehicle and diagnostic tools
- Gold: Gold card with Ferrari/Lamborghini keys
- Platinum: Platinum card with Bugatti/McLaren collection
- Diamond: Diamond-encrusted card with hypercars

---

## Phase 3: Packages Page UI Components

### 3.1 Create Components
```
/components/packages/
├── PackageCard.tsx          - Individual package card
├── PackageGrid.tsx          - Grid layout for packages
├── DurationToggle.tsx       - Monthly/Quarterly/Annual toggle
├── PricingDisplay.tsx       - Price with currency formatting
├── FeaturesList.tsx         - Features list with checkmarks
├── PackageBadge.tsx         - "Popular", "Exclusive", etc badges
└── PackageImage.tsx         - Image with lazy loading
```

### 3.2 Page Structure
```
/app/[locale]/packages/page.tsx
```

**Sections:**
1. **Hero**: "Choose Your MAJAZ Experience"
2. **Duration Toggle**: Monthly / Quarterly / Annual
3. **Package Grid**:
   - Individual Services (5 cards)
   - Concierge Memberships (3 cards)
4. **Comparison Table**: Feature comparison
5. **FAQ Section**: Common questions
6. **CTA**: "Apply for Membership" button

### 3.3 Design Specifications
- **Layout**: CSS Grid with responsive breakpoints
- **Cards**: Glass morphism with gold accents
- **Typography**: Raleway/Playfair Display
- **Colors**: Black, Gold (#D4AF37), Ivory (#FFFFF0)
- **Animations**: Smooth hover effects, scale on hover
- **Mobile**: Stack cards vertically, swipeable

---

## Phase 4: E-Commerce Checkout System

### 4.1 Database Schema (Supabase)
```sql
-- Packages table (already defined in packages.ts)

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  package_id VARCHAR NOT NULL,
  duration VARCHAR NOT NULL, -- monthly/quarterly/annual
  amount_aed DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'AED',
  status VARCHAR(50) DEFAULT 'pending', -- pending/paid/failed/refunded
  payment_intent_id VARCHAR, -- Stripe payment intent
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Subscriptions table (for recurring memberships)
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  package_id VARCHAR NOT NULL,
  duration VARCHAR NOT NULL,
  status VARCHAR(50) DEFAULT 'active', -- active/paused/cancelled
  current_period_start DATE,
  current_period_end DATE,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  stripe_subscription_id VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 4.2 Checkout Pages
```
/app/[locale]/checkout/[packageSlug]/page.tsx
```

**Sections:**
1. **Package Summary**: Selected package, duration, price
2. **User Information**: Name, email, phone (if not logged in)
3. **Payment Method**: Stripe Elements
4. **Terms & Conditions**: Checkbox with link
5. **Submit Button**: "Complete Purchase" or "Start Membership"

### 4.3 Payment Integration (Stripe)
```bash
npm install @stripe/stripe-js stripe
```

**Setup:**
- Create `/lib/stripe.ts` - Stripe client
- Create `/app/api/create-payment-intent/route.ts` - Server endpoint
- Create `/app/api/webhooks/stripe/route.ts` - Handle webhooks
- Add Stripe publishable key to `.env.local`

**Flow:**
1. User selects package + duration → `/checkout/[slug]`
2. User enters payment info → Create payment intent
3. Confirm payment → Redirect to success page
4. Stripe webhook → Update order status → Send confirmation email

### 4.4 Success/Failure Pages
```
/app/[locale]/checkout/success/page.tsx
/app/[locale]/checkout/cancelled/page.tsx
```

---

## Phase 5: AI Agent Interview System

### 5.1 ElevenLabs Voice AI Setup
```bash
npm install elevenlabs
```

**Configuration:**
- Add ELEVENLABS_API_KEY to `.env.local`
- Choose voice: "Adam" or "Bella" (professional British/American accent)
- Set up streaming for real-time responses

### 5.2 Interview Page Component
```
/app/[locale]/interview/page.tsx
```

**UI Elements:**
1. **Microphone Button**: Large circular button, pulsing animation
2. **Voice Visualization**: Audio waveform lines (canvas animation)
3. **Transcript Display**: Real-time speech-to-text
4. **Agent Avatar**: Animated circle that pulses when speaking
5. **Progress Indicator**: Interview completion percentage

### 5.3 Voice Visualization (Reference Nexus)
```typescript
/components/interview/VoiceVisualizer.tsx
```

**Features:**
- Canvas-based audio visualization
- Frequency bars that respond to audio level
- Smooth animations with requestAnimationFrame
- Gold color gradient (#D4AF37)
- Pulsing effect when agent speaks

**Inspiration**:
- Look for audio visualization in Nexus project
- Similar to Apple Siri or Google Assistant visualization
- Circular waveform radiating from center

### 5.4 Interview Logic
```typescript
/components/interview/InterviewAgent.tsx
```

**Questions Flow:**
1. "Welcome to MAJAZ. I'm here to help match you with the perfect package. May I have your name?"
2. "What type of vehicles are you interested in?"
3. "How many vehicles do you purchase or inspect per year?"
4. "Are you looking for one-time inspection or ongoing concierge service?"
5. "Do you need international vehicle sourcing?"
6. "Based on your needs, I recommend [Package Name]. Would you like to proceed?"

**Integration:**
- Speech-to-text: Web Speech API or OpenAI Whisper
- AI responses: OpenAI GPT-4 with MAJAZ personality
- Text-to-speech: ElevenLabs for natural voice
- Save transcript to database for review

### 5.5 Interview Result Page
```
/app/[locale]/interview/result/page.tsx
```

**Display:**
- Recommended package based on answers
- Reason for recommendation
- Alternative packages
- "Book Consultation" CTA
- "Purchase Now" CTA

---

## Phase 6: Membership Gating System

### 6.1 Membership Status Check
```typescript
/lib/membership.ts
```

**Functions:**
- `checkMembershipStatus(userId)` - Returns tier or null
- `hasConciergeAccess(userId)` - Boolean
- `getRemainingInspections(userId)` - Number (for Gold/Platinum)
- `canAccessFeature(userId, feature)` - Boolean

### 6.2 Protected Routes
```typescript
/middleware.ts (update)
```

**Protected Pages:**
- `/dashboard/*` - Requires login
- `/dashboard/concierge/*` - Requires Gold+ membership
- `/dashboard/portfolio/*` - Requires Gold+ membership
- `/dashboard/sourcing/*` - Requires Gold+ membership

### 6.3 Membership Gates
```
/components/gates/MembershipGate.tsx
```

**Usage:**
```tsx
<MembershipGate requiredTier="gold">
  <ConciergeFeature />
</MembershipGate>
```

**Fallback:**
- Show upgrade CTA
- Display locked feature preview
- "Upgrade to Gold" button

### 6.4 Membership Card Component
```
/components/membership/MembershipCard.tsx
```

**Display:**
- Member name
- Tier (Gold/Platinum/Diamond)
- Member since date
- Membership number
- QR code for verification
- Expiry date

---

## Phase 7: Dashboard Integration

### 7.1 Concierge Dashboard Pages
```
/app/[locale]/dashboard/concierge/
├── page.tsx                    - Concierge overview
├── garage/page.tsx             - Vehicle portfolio
├── valuations/page.tsx         - Market values
├── maintenance/page.tsx        - Service tracking
├── marketplace/page.tsx        - Curated listings
└── messages/page.tsx           - Direct concierge chat
```

### 7.2 Request Management (All Users)
```
/app/[locale]/dashboard/requests/
├── page.tsx                    - All inspection requests
├── new/page.tsx                - Create new request
└── [id]/page.tsx               - Request detail
```

### 7.3 Billing & Subscription
```
/app/[locale]/dashboard/billing/page.tsx
```

**Sections:**
- Current subscription
- Payment method
- Invoice history
- Usage statistics (for memberships)
- Upgrade/downgrade options

---

## Phase 8: Testing & Optimization

### 8.1 Testing Checklist
- [ ] Package cards render correctly on all screen sizes
- [ ] Duration toggle updates prices
- [ ] Checkout flow works end-to-end
- [ ] Stripe payment succeeds/fails gracefully
- [ ] AI interview records and transcribes correctly
- [ ] Voice visualization animates smoothly
- [ ] Membership gates work correctly
- [ ] Dashboard shows proper data based on tier
- [ ] Emails send after purchase
- [ ] Webhook handles all Stripe events

### 8.2 Performance Optimization
- Lazy load package images
- Preload critical fonts
- Optimize Stripe Elements loading
- Cache package data
- Use React.memo for heavy components
- Implement loading skeletons

### 8.3 SEO & Metadata
- Add metadata to packages page
- Generate sitemap with package URLs
- Add structured data for pricing
- Optimize images (WebP format)

---

## Implementation Order

### Week 1: Foundation
1. ✅ Create package data structure
2. ⏳ Generate all package images with Replicate
3. ⏳ Build PackageCard component
4. ⏳ Build packages page UI
5. ⏳ Add duration toggle functionality

### Week 2: E-Commerce
6. ⏳ Set up Stripe integration
7. ⏳ Create checkout page
8. ⏳ Implement payment flow
9. ⏳ Add webhook handling
10. ⏳ Create success/failure pages

### Week 3: AI Interview
11. ⏳ Set up ElevenLabs integration
12. ⏳ Build interview page UI
13. ⏳ Implement voice visualization
14. ⏳ Create interview logic
15. ⏳ Build result page

### Week 4: Membership System
16. ⏳ Implement membership checking
17. ⏳ Add protected routes
18. ⏳ Create membership gates
19. ⏳ Build concierge dashboard
20. ⏳ Add billing management

### Week 5: Polish & Launch
21. ⏳ End-to-end testing
22. ⏳ Performance optimization
23. ⏳ SEO implementation
24. ⏳ Documentation
25. ⏳ Production deployment

---

## Environment Variables Needed

```env
# Stripe
STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# ElevenLabs
ELEVENLABS_API_KEY=...

# OpenAI (for AI interview)
OPENAI_API_KEY=sk-...

# Database
DATABASE_URL=...

# Email (Resend)
RESEND_API_KEY=...
```

---

## Design Assets Needed

### Images (via Replicate)
- [x] Remote Assessment hero (1200x800)
- [x] Remote Express hero (1200x800)
- [x] Remote Same-Day hero (1200x800)
- [x] On-Site Inspection hero (1200x800)
- [x] On-Site Express hero (1200x800)
- [x] Gold Concierge card (1200x800)
- [x] Platinum Concierge card (1200x800)
- [x] Diamond Concierge card (1200x800)

### Icons
- Checkmark icon (features list)
- Currency icon (pricing)
- Clock icon (duration)
- Shield icon (guarantee)
- Star icon (premium badge)

---

## Success Metrics

### Phase 1-2 (Packages Page)
- Page load time < 2s
- 80%+ scroll depth
- 10%+ click-through to checkout

### Phase 3 (Checkout)
- 60%+ checkout completion rate
- Payment success rate > 95%

### Phase 4 (AI Interview)
- 50%+ interview completion
- 80%+ match satisfaction

### Phase 5 (Memberships)
- 5+ Gold signups in month 1
- 1+ Platinum signup in quarter 1

---

## Next Immediate Steps

1. **Run Replicate image generation** for all 9 packages
2. **Create PackageCard component** with glass morphism
3. **Build packages page** with duration toggle
4. **Test responsive design** on mobile/tablet
5. **Set up Stripe** integration and test checkout

---

## Notes

- All prices in AED (UAE Dirhams)
- Support both English and Arabic
- RTL layout for Arabic
- Mobile-first responsive design
- Accessibility: WCAG 2.1 AA compliance
- Performance: Lighthouse score 90+
