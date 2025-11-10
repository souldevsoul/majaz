# MAJAZ - Implementation Checklist

## 🎨 Phase 1: Brand Identity & RTL Foundation

### Color System
- [ ] Update `app/globals.css` with MAJAZ color variables
  - Primary: `#111111` (Black)
  - Gold: `#D4AF37`
  - Ivory: `#FFFFF0`
  - Background: `#0A0A0A` (Rich Black)
  - Surface: `#1A1A1A` (Dark Grey)
- [ ] Create glass morphism utility classes
- [ ] Add gold gradient utilities
- [ ] Create dark theme variants

### Typography & Fonts
- [ ] Add Playfair Display (Google Fonts) - headlines
- [ ] Add Inter (Google Fonts) - body text
- [ ] Add IBM Plex Sans Arabic (Google Fonts) - Arabic support
- [ ] Update `app/layout.js` with font imports
- [ ] Create bilingual typography scale
- [ ] Set up font-display: swap for performance

### RTL (Right-to-Left) Setup
- [ ] Install next-intl or react-intl
- [ ] Create `[locale]` dynamic route structure
- [ ] Set up locale detection middleware
- [ ] Create RTL CSS utilities
- [ ] Add `dir="rtl"` support to HTML element
- [ ] Create language toggle component
- [ ] Test layout mirroring

### Component Styling
- [ ] Create glass morphism card component
- [ ] Add backdrop-filter support with fallbacks
- [ ] Design gold-accent buttons
- [ ] Create luxury form inputs (gold focus states)
- [ ] Add smooth transitions (300-500ms)
- [ ] Design Arabic geometric pattern overlays
- [ ] Create shield/crest badge components

### Images & Assets
- [ ] Generate hero image (Dubai golden hour luxury SUV)
- [ ] Generate report card images (ivory/gold theme)
- [ ] Generate landing banner
- [ ] Create MAJAZ logo (gold, elegant)
- [ ] Create favicon
- [ ] Source Arabic geometric patterns (SVG)
- [ ] Optimize all images for web (WebP)

## 🌐 Phase 2: Internationalization (i18n)

### Translation Setup
- [ ] Create `/public/locales/en.json`
- [ ] Create `/public/locales/ar.json`
- [ ] Set up translation keys structure
- [ ] Configure next-intl provider
- [ ] Add locale switcher to header
- [ ] Set up locale persistence (cookies)

### English Content
- [ ] Homepage hero headline
- [ ] Features section
- [ ] How it works
- [ ] Pricing section
- [ ] FAQ
- [ ] Footer links
- [ ] Button labels
- [ ] Form placeholders
- [ ] Error messages

### Arabic Translation
- [ ] Professional Arabic translation of all content
- [ ] Verify right-to-left layout
- [ ] Test Arabic typography
- [ ] Verify gold/ivory contrast with Arabic
- [ ] Test form validation in Arabic
- [ ] Review with native speaker

### RTL Layout Testing
- [ ] Test navigation menu (RTL)
- [ ] Test cards grid (RTL)
- [ ] Test forms (RTL alignment)
- [ ] Test modals/drawers (slide from right)
- [ ] Test tooltips/popovers (RTL positioning)
- [ ] Test icons (flip arrows/chevrons)
- [ ] Mobile menu (RTL behavior)

## 📐 Phase 3: Premium Layout & UX

### Hero Section
- [ ] Create full-bleed hero component
- [ ] Add golden hour Dubai imagery
- [ ] Implement minimal text overlay
- [ ] Add elegant scroll indicator
- [ ] Create animated hero CTA
- [ ] Test on mobile (full bleed)

### Glass Morphism Components
- [ ] Create reusable GlassCard component
- [ ] Add backdrop-blur with fallback
- [ ] Create GlassModal component
- [ ] Add subtle border glow (gold)
- [ ] Test performance (backdrop-filter)
- [ ] Add hover states

### Spacing & Typography
- [ ] Increase white space (premium feel)
- [ ] Create luxury typography scale
- [ ] Add elegant section dividers
- [ ] Implement large, bold headings
- [ ] Add subtle text shadows for contrast
- [ ] Test readability (dark background)

### Animations & Transitions
- [ ] Add smooth scroll behavior
- [ ] Create fade-in-up animations
- [ ] Add gold shimmer effects
- [ ] Implement elegant hover states
- [ ] Add loading animations (luxury spinners)
- [ ] Create page transition effects

## ✍️ Phase 4: Content & Messaging

### Homepage (Bilingual)
- [ ] Hero: "Premium Vehicle Concierge for UAE" / Arabic
- [ ] Subheadline (luxury tone)
- [ ] Features: Trust, Expertise, Bespoke Service
- [ ] How It Works (concierge approach)
- [ ] Testimonials (UAE clients)
- [ ] CTA: "Begin Your Assessment" / Arabic

### Brand Voice
- [ ] Write About page (luxury, trust)
- [ ] Create service descriptions (concierge tone)
- [ ] Write FAQ (warm, sophisticated)
- [ ] Create email templates (premium)
- [ ] Write WhatsApp message templates
- [ ] Design report intro/conclusion copy

### Legal & Disclaimers
- [ ] Terms of Service (UAE law)
- [ ] Privacy Policy (UAE GDPR equivalent)
- [ ] Refund policy (bilingual)
- [ ] Assessment disclaimers (Arabic + English)
- [ ] Cookie policy

## 🔧 Phase 5: Core Functionality

### Request System
- [ ] Create Request model (Prisma)
- [ ] Build "Paste Link" form (bilingual)
- [ ] Implement UAE platform detection
- [ ] Create AED currency calculator
- [ ] Build request dashboard (RTL-aware)
- [ ] Add status timeline (bilingual)

### UAE Auction Integrations
- [ ] Emirates Auction scraper
- [ ] Awalmaz ad scraper
- [ ] dubizzle Motors scraper
- [ ] CarSwitch scraper
- [ ] AutoTrader UAE scraper
- [ ] Generic UAE listing scraper

### Scraping & AI
- [ ] Set up Firecrawl (UAE proxies if needed)
- [ ] OpenAI extraction (detect Arabic text)
- [ ] Perplexity comps (UAE/GCC market)
- [ ] Pricing engine (AED)
- [ ] Handle bilingual listings

### Reports
- [ ] Design luxury report template (HTML)
- [ ] Add Arabic report variant
- [ ] Implement PDF generation (bilingual)
- [ ] Add gold accent styling
- [ ] Create report preview page (RTL-aware)
- [ ] Build email delivery system

### Payments (AED)
- [ ] Stripe integration (AED currency)
- [ ] Service fee checkout (bilingual)
- [ ] Deposit hold system (20%)
- [ ] Refund processing
- [ ] Invoice generation (Arabic option)
- [ ] Payment confirmation emails (bilingual)

## 📱 Phase 6: UAE-Specific Features

### WhatsApp Integration
- [ ] Set up WhatsApp Business API
- [ ] Create message templates
- [ ] Implement click-to-WhatsApp buttons
- [ ] Build WhatsApp notification system
- [ ] Add WhatsApp support chat

### Regional Settings
- [ ] AED currency formatting
- [ ] UAE date format (DD/MM/YYYY)
- [ ] UAE phone format (+971-XX-XXX-XXXX)
- [ ] UAE address format
- [ ] Metric units (km, liters)
- [ ] Weekend: Friday-Saturday

### Cultural Adaptations
- [ ] Prayer times integration (optional notifications)
- [ ] Ramadan mode (adjusted messaging)
- [ ] Arabic calendar support
- [ ] Local payment methods (if applicable)
- [ ] Emirates ID field (optional)

## 🔐 Phase 7: Authentication & Dashboard

### Auth System
- [ ] Password-based auth (bilingual)
- [ ] OAuth (Google) - future
- [ ] Registration flow (RTL forms)
- [ ] Login page (luxury styling)
- [ ] Password reset (bilingual emails)
- [ ] Email verification

### User Dashboard
- [ ] Create dashboard layout (RTL-aware)
- [ ] Build requests list (bilingual)
- [ ] Request detail page (RTL)
- [ ] Chat/messaging (RTL, WhatsApp integration)
- [ ] File uploads (photos/videos)
- [ ] Billing section (AED)
- [ ] Profile settings (language preference)

## 📊 Phase 8: Admin Panel

### Operator Views
- [ ] Admin layout (RTL option)
- [ ] Request triage dashboard
- [ ] Status management (bilingual)
- [ ] Manual overrides (with notes)
- [ ] Finance/deposit management
- [ ] Error logs viewer
- [ ] Arabic content moderation tools

## 🧪 Phase 9: Testing & Quality

### RTL Testing
- [ ] All pages in Arabic
- [ ] Navigation (RTL)
- [ ] Forms (RTL)
- [ ] Modals/drawers (RTL)
- [ ] Mobile layouts (RTL)
- [ ] Print styles (RTL)

### Cross-Browser Testing
- [ ] Chrome (desktop + mobile)
- [ ] Safari (iOS - common in UAE)
- [ ] Firefox
- [ ] Edge
- [ ] Test on Arabic keyboards

### Performance
- [ ] Optimize images (WebP, AVIF)
- [ ] Lazy load heavy assets
- [ ] Test backdrop-filter performance
- [ ] Optimize font loading
- [ ] Lighthouse audit (>90 score)
- [ ] Test on slow connections

### Translation Quality
- [ ] Native Arabic speaker review
- [ ] Check cultural appropriateness
- [ ] Verify technical terms
- [ ] Test with UAE users
- [ ] Proofread all content

## 🚀 Phase 10: Deployment

### Setup
- [ ] Production environment (Vercel/AWS)
- [ ] Environment variables
- [ ] Database (PostgreSQL)
- [ ] Redis (queues)
- [ ] Error tracking (Sentry)
- [ ] CDN for UAE (low latency)

### Deploy
- [ ] Deploy to production
- [ ] Custom domain (majaz.ae or similar)
- [ ] SSL/HTTPS
- [ ] CDN configuration
- [ ] Email service (Arabic support)
- [ ] WhatsApp Business setup

### Post-Launch
- [ ] Analytics (bilingual tracking)
- [ ] Uptime monitoring
- [ ] Backup system
- [ ] Support documentation (AR/EN)
- [ ] Train operators (bilingual)
- [ ] Marketing assets (luxury focus)

## 📝 Documentation

- [ ] API documentation
- [ ] Component documentation (RTL notes)
- [ ] Deployment guide
- [ ] User manual (AR/EN)
- [ ] Translation workflow guide
- [ ] Troubleshooting guide (bilingual)

## 🎯 Quick Start Checklist

1. **Install Dependencies**
   ```bash
   cd majaz
   npm install
   npm install next-intl
   ```

2. **Set Up i18n**
   - Create locale folders
   - Configure next-intl
   - Add middleware for locale detection

3. **Update Brand Colors**
   - Edit `app/globals.css`
   - Black/Gold/Ivory palette
   - Add glass morphism classes

4. **Add Fonts**
   - Playfair Display (headlines)
   - Inter (body)
   - IBM Plex Sans Arabic

5. **Generate Images**
   - Dubai golden hour hero
   - Luxury SUV imagery
   - Gold accent graphics

6. **Create Translation Files**
   - `/public/locales/en.json`
   - `/public/locales/ar.json`

7. **Test RTL**
   ```bash
   npm run dev
   # Navigate to /ar to test RTL
   ```

8. **Commit**
   ```bash
   git add .
   git commit -m "Initial MAJAZ brand with RTL support"
   ```

---

**Priority Order:**
1. **Phase 1 (Brand + RTL)** - **START HERE** - CRITICAL
2. **Phase 2 (i18n)** - Parallel with Phase 1
3. **Phase 4 (Content)** - Early copy review
4. **Phase 3 (Premium UX)** - After RTL working
5. **Phase 5 (Core Features)** - Backend
6. Phases 6-10 - Progressive enhancement

**Estimated Timeline:**
- Phase 1-2: 5-7 days (RTL + i18n is complex)
- Phase 3: 3-4 days (premium styling)
- Phase 4: 2-3 days (translation + review)
- Phase 5: 5-7 days (core features)
- Phase 6-7: 4-5 days (UAE specific + auth)
- Phase 8-10: 5-7 days (admin + deploy)
- **Total: ~4-6 weeks for RTL-ready MVP**

**RTL is CRITICAL - Allocate extra time for testing!**
