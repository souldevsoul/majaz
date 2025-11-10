# MAJAZ - Brand Identity & Implementation Guide

## Brand Overview
**Market:** United Arab Emirates (UAE)
**Tone:** Luxury concierge
**Positioning:** Premium vehicle assessment service for discerning UAE buyers

## Brand Identity

### Color Palette
- **Primary:** Black `#111111`
- **Secondary:** Gold `#D4AF37`
- **Accent:** Ivory `#FFFFF0`
- **Background:** Rich Black `#0A0A0A`
- **Surface:** Dark Grey `#1A1A1A`

### Typography
- **Display:** Playfair Display (headlines only)
- **Body:** Inter (all weights)
- **Accent:** Space Grotesk (optional for technical specs)
- **Arabic:** IBM Plex Sans Arabic or Tajawal

### Visual Style
- Golden hour marble forecourt aesthetic
- Premium editorial photography
- Glass morphism cards
- Full bleed hero sections
- Luxury concierge mood
- Subtle Arabic geometric patterns

## Image Generation Prompts

### Hero Image Prompt
```
"Luxury SUV parked on polished marble forecourt in Dubai golden hour, ivory / gold palette, medium format Phase One IQ4 ultra-premium editorial, Cooke S4i primes, no branding, no plates, no text, luxury high fashion auto photography, cinematic 16:9."
```

### Report Card Image Prompt
```
"Top-down angled render of a luxury SUV on a sand-stone textured plane with thin gold panel outlines, minimal shadows, background ivory; intended for right-to-left UI integration; clean and premium."
```

### Landing Page Banner Prompt
```
"Minimalist luxury SUV silhouette in black/gold (#D4AF37), abstract marble texture background, high contrast premium aesthetic, sized for 1920×400."
```

### Global Negative Prompt
```
"no logos, no license plates, no people, no cartoon style, no toy plastic look, no unrealistic CG lighting, no text overlays, no watermark, no stretched proportions, no extreme fisheye"
```

## Design Modifications from Boxcar Base

### Layout Changes
1. Implement **full bleed hero** sections with premium imagery
2. Add **glass morphism cards** (backdrop-blur, subtle transparency)
3. Increase white space for premium feel
4. Use larger, bolder typography
5. Add subtle **Arabic geometric patterns** as overlays

### Component Adjustments
- **Cards:** Glass morphism effect, subtle borders, soft shadows
- **Buttons:** Elegant with gold accents, smooth hover transitions
- **Forms:** Premium styling with gold focus states
- **Hero:** Full-width, minimal text overlay, golden hour imagery
- **Icons:** Elegant line-based icons with gold accents
- **Badges:** Shield/crest style with gold borders

### RTL (Right-to-Left) Support
- **CRITICAL:** Full RTL layout support for Arabic
- Mirror all asymmetric layouts
- Reverse flex/grid directions
- Flip icons and arrows
- Right-align text in Arabic mode
- Test all components in both LTR and RTL

### Color Application
```css
:root {
  --primary: #111111;
  --gold: #D4AF37;
  --ivory: #FFFFF0;
  --background: #0A0A0A;
  --surface: #1A1A1A;
  --text-primary: #FFFFF0;
  --text-secondary: #D4AF37;
  --border: rgba(212, 175, 55, 0.2);
}
```

### Glass Morphism Effect
```css
.glass-card {
  background: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(212, 175, 55, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}
```

## Content Tone & Copy

### Messaging (English)
- "Premium Vehicle Concierge for UAE"
- "Your Trusted Automotive Advisor"
- "Exquisite Pre-Purchase Assessment"
- "Bespoke Vehicle Intelligence"

### Messaging (Arabic)
- "خدمة تقييم المركبات الفاخرة"
- "مستشارك الموثوق للسيارات"
- "تقييم شامل قبل الشراء"

### Voice Guidelines
- Warm, sophisticated, welcoming
- Use luxury terminology
- Emphasize trust and personal service
- Cultural respect for UAE market
- Avoid overly technical jargon
- Focus on peace of mind, confidence

## Core Functionality

### Request Flow
1. User pastes UAE auction/marketplace link (Emirates Auction, Awalmaz ad, etc.)
2. System scrapes listing via Firecrawl
3. OpenAI structured extraction
4. Perplexity comps (UAE/GCC market)
5. Fair value + safe bid in AED
6. User pays service fee (49 AED remote / 169 AED on-site)
7. Optional 20% deposit for delegated bidding
8. Premium PDF report with Arabic option

### Supported Platforms (UAE)
- Emirates Auction
- Awalmaz ad
- dubizzle Motors
- CarSwitch
- AutoTrader UAE
- Other GCC platforms

### Pricing (AED)
- **Remote Assessment:** 49 AED (48h SLA) / 89 AED (24h) / 129 AED (same-day)
- **On-Site Pre-Purchase:** 169 AED (48h) / 209 AED (24h)
- **Sourcing Service:** 59 AED + 20% deposit
- **Deposit:** 20% of max bid (refundable per outcome)

## Technical Implementation Priorities

### Phase 1 - Brand Identity & RTL
- [ ] Update color variables (black/gold/ivory)
- [ ] Implement Playfair Display + Inter fonts
- [ ] Add IBM Plex Sans Arabic for RTL
- [ ] Create glass morphism card components
- [ ] Add Arabic geometric pattern overlays
- [ ] Generate hero images (golden hour Dubai)
- [ ] **Set up RTL layout system (dir="rtl")**
- [ ] Create language toggle component

### Phase 2 - Layout Premium-ization
- [ ] Implement full bleed hero sections
- [ ] Add glass morphism effects to cards
- [ ] Increase spacing for premium feel
- [ ] Create luxury typography scale
- [ ] Add smooth transitions/animations
- [ ] Implement marble/gold texture overlays

### Phase 3 - Bilingual Content
- [ ] Set up next-intl for AR/EN
- [ ] Write English copy (luxury tone)
- [ ] Professional Arabic translation
- [ ] Test RTL layout thoroughly
- [ ] Create bilingual CTAs
- [ ] Add language persistence

### Phase 4 - UAE-Specific Features
- [ ] UAE auction platform integrations
- [ ] AED currency handling
- [ ] UAE/GCC market comps (Perplexity)
- [ ] Dubai-focused imagery
- [ ] UAE phone number format (+971)
- [ ] Emirates ID validation (optional)

### Phase 5 - Premium UX
- [ ] Smooth scroll animations
- [ ] Elegant loading states
- [ ] Premium micro-interactions
- [ ] Concierge chat interface
- [ ] WhatsApp integration (UAE preference)
- [ ] Video call booking (optional)

## File Structure Priority

```
majaz/
├── app/
│   ├── [locale]/          # RTL/LTR routing
│   │   ├── layout.js      # Locale-aware layout
│   │   ├── page.js        # Bilingual homepage
│   │   └── ...
│   ├── globals.css        # Black/gold theme, RTL styles
│   └── ...
├── components/
│   ├── common/
│   │   ├── Header.js      # Bilingual header with lang toggle
│   │   ├── Footer.js      # RTL-aware footer
│   │   └── LanguageToggle.js
│   ├── home/
│   │   ├── Hero.js        # Full bleed golden hour hero
│   │   ├── GlassCard.js   # Glass morphism card component
│   │   └── Features.js    # Luxury features grid
│   └── ...
├── public/
│   ├── images/
│   │   ├── hero-majaz-dubai.jpg
│   │   ├── logo-majaz-gold.svg
│   │   └── patterns/
│   │       └── arabic-geometric.svg
│   └── locales/
│       ├── en.json
│       └── ar.json
└── ...
```

## RTL Implementation Checklist

### CSS/Styling
- [ ] Add `dir="rtl"` support to html element
- [ ] Create RTL-specific utility classes
- [ ] Mirror padding/margin (padding-left ↔ padding-right)
- [ ] Reverse flex directions
- [ ] Flip background positions
- [ ] Mirror transform origins
- [ ] Test all animations in RTL

### Components
- [ ] Reverse icon directions (arrows, chevrons)
- [ ] Mirror asymmetric layouts
- [ ] Adjust text-align for RTL
- [ ] Test form layouts
- [ ] Verify navigation menus
- [ ] Check modal/drawer slide directions

### Typography
- [ ] Load Arabic font (IBM Plex Sans Arabic)
- [ ] Set proper line-height for Arabic
- [ ] Adjust letter-spacing (usually 0 for Arabic)
- [ ] Test font weights in Arabic
- [ ] Verify heading hierarchy

## Next Steps
1. Run `npm install` or `yarn install`
2. Set up next-intl for bilingual support
3. Update color scheme to black/gold/ivory
4. Generate Dubai golden hour imagery
5. Implement glass morphism components
6. Add Arabic translations
7. **Test RTL layout thoroughly**
8. Set up UAE auction scrapers
9. Configure AED currency
10. Deploy with Arabic support

## Resources
- Boxcar Template: Original Next.js base
- Fonts: Playfair Display, Inter, IBM Plex Sans Arabic (Google Fonts)
- RTL: next-intl or react-intl
- Image Generation: Use golden hour Dubai prompts
- Icons: Lucide React (elegant, line-based)
- Arabic Patterns: Geometric SVG overlays
- WhatsApp API: For UAE customer preference

## Cultural Considerations
- **Prayer times:** Consider timing for notifications
- **Weekend:** Friday-Saturday in UAE
- **Ramadan:** Adjust messaging during holy month
- **Language:** Arabic default for UAE users
- **Currency:** Always show AED prominently
- **Trust:** Emphasize local presence, UAE expertise
