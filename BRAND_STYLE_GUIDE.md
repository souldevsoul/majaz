# MAJAZ Brand Style Guide

## Brand Identity

### **Positioning**
MAJAZ is the Amex Black Card of automotive ownership - an ultra-premium concierge service for high-net-worth individuals in UAE/GCC who demand excellence in vehicle acquisition and ownership.

### **Target Audience**
- Ultra-High-Net-Worth Individuals (UHNW)
- Exotic car collectors (Ferrari, Lamborghini, Rolls-Royce owners)
- Multi-vehicle households (5+ vehicles)
- International luxury car buyers
- Royal family members and business tycoons

### **Brand Personality**
- **Sophisticated** - Refined, cultured, worldly
- **Exclusive** - Members-only, by invitation, selective
- **Trustworthy** - Reliable, transparent, expert
- **Warm** - Welcoming, personal, attentive
- **Innovative** - AI-powered, cutting-edge, forward-thinking

---

## Visual Identity

### **Color Palette**

#### Primary Colors
```css
--majaz-black: #111111        /* Primary text, backgrounds */
--majaz-gold: #D4AF37         /* Primary brand color */
--majaz-ivory: #FFFFF0        /* Light text, highlights */
```

#### Secondary Colors
```css
--majaz-rich-black: #0A0A0A   /* Deep backgrounds */
--majaz-dark-grey: #1A1A1A    /* Surface colors */
--majaz-gold-dark: #B8941E    /* Gradient end, hover states */
```

#### Transparent Overlays
```css
--majaz-glass-bg: rgba(26, 26, 26, 0.6)
--majaz-glass-border: rgba(212, 175, 55, 0.15)
--majaz-glass-border-strong: rgba(212, 175, 55, 0.4)
```

#### Usage Guidelines
- **Black (#111111)**: Body text, button text on gold backgrounds
- **Gold (#D4AF37)**: Headings, accents, CTAs, icons, active states
- **Ivory (#FFFFF0)**: Light text on dark backgrounds, card text
- **Rich Black (#0A0A0A)**: Page backgrounds, sections
- **Glass**: Overlays with backdrop-filter blur

---

## Typography

### **Font Families**

#### Display Font (Headings)
```css
--font-display: 'Raleway', sans-serif
```
**Usage:** H1-H6, Logo, Section titles, Package names
**Weights:** 200 (thin), 300 (light), 600 (semi-bold), 700 (bold)
**Features:** Uppercase, wide letter-spacing (0.05em - 0.15em)

#### Body Font (Text)
```css
--font-body: 'Raleway', sans-serif
```
**Usage:** Body text, descriptions, captions
**Weights:** 300 (light), 400 (regular), 500 (medium), 600 (semi-bold)

#### Arabic Font
```css
--font-arabic: 'IBM Plex Sans Arabic', sans-serif
```
**Usage:** All Arabic text (RTL mode)
**Weights:** 400 (regular), 600 (semi-bold), 700 (bold)

### **Type Scale**

```css
/* Hero/Display */
--text-6xl: 6rem      /* 96px - MAJAZ logo */
--text-5xl: 4rem      /* 64px - Hero headlines */
--text-4xl: 3.5rem    /* 56px - Section headlines */

/* Headings */
--text-3xl: 2.5rem    /* 40px - H1 */
--text-2xl: 2rem      /* 32px - H2 */
--text-xl: 1.5rem     /* 24px - H3 */
--text-lg: 1.25rem    /* 20px - H4 */

/* Body */
--text-base: 1rem     /* 16px - Body */
--text-sm: 0.9375rem  /* 15px - Small text */
--text-xs: 0.875rem   /* 14px - Captions */
--text-2xs: 0.75rem   /* 12px - Badges */
```

### **Typography Rules**

**Headings:**
- Always UPPERCASE
- Letter-spacing: 0.05em - 0.15em
- Line-height: 1.1 - 1.3
- Font-weight: 200-400 (thin/light for luxury feel)

**Body Text:**
- Sentence case
- Letter-spacing: 0 - 0.05em
- Line-height: 1.5 - 1.8
- Font-weight: 300-500

**Buttons/CTAs:**
- Always UPPERCASE
- Letter-spacing: 0.05em - 0.1em
- Font-weight: 600
- Font-size: 1rem - 1.125rem

---

## Design Elements

### **Glass Morphism**

#### Standard Glass Card
```css
background: rgba(26, 26, 26, 0.6);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border: 1px solid rgba(212, 175, 55, 0.15);
border-radius: 24px;
```

#### Strong Glass (Featured)
```css
background: rgba(26, 26, 26, 0.8);
border: 2px solid rgba(212, 175, 55, 0.4);
box-shadow: 0 12px 40px rgba(212, 175, 55, 0.15);
```

#### Glass on Light Background
```css
background: rgba(255, 255, 255, 0.05);
border: 1px solid rgba(212, 175, 55, 0.2);
```

### **Gradients**

#### Gold Gradient (Primary)
```css
background: linear-gradient(135deg, #D4AF37 0%, #B8941E 100%);
```
**Usage:** Primary buttons, CTAs, active states, badges

#### Dark Gradient (Backgrounds)
```css
background: linear-gradient(to bottom, #000000 0%, #0A0A0A 50%, #000000 100%);
```
**Usage:** Page backgrounds

#### Overlay Gradient
```css
background: linear-gradient(90deg,
  rgba(10, 10, 10, 0.8) 0%,
  rgba(10, 10, 10, 0.4) 50%,
  rgba(10, 10, 10, 0.1) 100%
);
```
**Usage:** Hero image overlays

#### Gold Radial (Sections)
```css
background: radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.05) 0%, transparent 70%);
```
**Usage:** Highlighting premium sections

---

## Shadows

### **Elevation Levels**

```css
/* Subtle */
--majaz-shadow-sm: 0 4px 16px rgba(212, 175, 55, 0.15);

/* Medium */
--majaz-shadow-md: 0 8px 24px rgba(212, 175, 55, 0.25);

/* Strong */
--majaz-shadow-lg: 0 12px 40px rgba(212, 175, 55, 0.3);

/* Gold Glow */
--majaz-shadow-gold: 0 8px 32px rgba(212, 175, 55, 0.5);

/* Button Hover */
box-shadow: 0 0 40px rgba(212, 175, 55, 0.4);
```

### **Text Shadows**

```css
/* Hero text glow */
text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);

/* Gold text glow */
text-shadow: 0 0 15px rgba(212, 175, 55, 0.8);

/* Readability on images */
text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
```

---

## Spacing System

### **Base Unit: 4px**

```css
--space-1: 0.25rem   /* 4px */
--space-2: 0.5rem    /* 8px */
--space-3: 0.75rem   /* 12px */
--space-4: 1rem      /* 16px */
--space-5: 1.25rem   /* 20px */
--space-6: 1.5rem    /* 24px */
--space-8: 2rem      /* 32px */
--space-10: 2.5rem   /* 40px */
--space-12: 3rem     /* 48px */
--space-16: 4rem     /* 64px */
--space-20: 5rem     /* 80px */
--space-24: 6rem     /* 96px */
```

### **Section Padding**
```css
/* Desktop */
padding: 5rem 0;      /* 80px vertical */

/* Mobile */
padding: 3rem 0;      /* 48px vertical */
```

### **Card Padding**
```css
/* Large cards */
padding: 3rem 2.5rem;

/* Standard cards */
padding: 2rem 1.75rem;

/* Compact cards */
padding: 1.5rem 1.25rem;
```

---

## Border Radius

```css
--radius-sm: 8px      /* Small buttons, inputs */
--radius-md: 12px     /* Standard buttons, cards */
--radius-lg: 16px     /* Large cards */
--radius-xl: 24px     /* Feature cards, major elements */
--radius-full: 9999px /* Badges, pills, circular buttons */
```

---

## Transitions

### **Standard Easing**
```css
--transition-fast: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
```

### **Animation Curves**
```css
/* Smooth ease */
cubic-bezier(0.4, 0, 0.2, 1)

/* Bounce */
cubic-bezier(0.68, -0.55, 0.265, 1.55)

/* Sharp */
cubic-bezier(0.4, 0, 0.6, 1)
```

### **Hover Transforms**
```css
/* Lift up */
transform: translateY(-4px);

/* Lift + scale */
transform: translateY(-8px) scale(1.02);

/* Scale only */
transform: scale(1.05);
```

---

## Buttons

### **Primary Button**
```css
background: linear-gradient(135deg, #D4AF37 0%, #B8941E 100%);
color: #111111;
padding: 1rem 2.5rem;
border-radius: 12px;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.1em;
box-shadow: 0 4px 16px rgba(212, 175, 55, 0.3);
transition: all 0.3s ease;
```

**Hover:**
```css
transform: translateY(-2px);
box-shadow: 0 8px 24px rgba(212, 175, 55, 0.4);
```

### **Secondary Button**
```css
background: rgba(255, 255, 255, 0.05);
color: #D4AF37;
border: 2px solid rgba(212, 175, 55, 0.3);
padding: 1rem 2.5rem;
border-radius: 12px;
backdrop-filter: blur(10px);
```

**Hover:**
```css
background: rgba(255, 255, 255, 0.1);
border-color: rgba(212, 175, 55, 0.5);
```

### **Button Sizes**

```css
/* Small */
padding: 0.75rem 1.5rem;
font-size: 0.9375rem;

/* Medium (default) */
padding: 1rem 2.5rem;
font-size: 1rem;

/* Large */
padding: 1.25rem 3rem;
font-size: 1.125rem;
```

---

## Cards

### **Package Card**
```css
background: rgba(26, 26, 26, 0.6);
backdrop-filter: blur(20px);
border: 1px solid rgba(212, 175, 55, 0.15);
border-radius: 24px;
transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
```

**Hover:**
```css
transform: translateY(-8px);
border-color: rgba(212, 175, 55, 0.4);
box-shadow: 0 20px 60px rgba(212, 175, 55, 0.15);
```

### **Featured Card**
```css
border-width: 2px;
border-color: rgba(212, 175, 55, 0.4);
box-shadow: 0 12px 40px rgba(212, 175, 55, 0.1);
```

---

## Icons

### **Style**
- Line-based (not filled)
- 1.5-2px stroke width
- Gold color (#D4AF37)
- 16px-24px size range
- Rounded caps and joins

### **Common Icons**
- Checkmark (features)
- Arrow right (CTAs)
- Microphone (AI interview)
- Star (ratings, premium)
- Shield (security)

---

## Badges

### **Premium Badge**
```css
background: linear-gradient(135deg, #D4AF37 0%, #B8941E 100%);
color: #111111;
font-size: 0.75rem;
font-weight: 700;
text-transform: uppercase;
letter-spacing: 0.1em;
padding: 6px 16px;
border-radius: 20px;
box-shadow: 0 4px 16px rgba(212, 175, 55, 0.3);
```

### **Status Badge**
```css
/* Success */
background: rgba(34, 197, 94, 0.2);
color: #22C55E;
border: 1px solid rgba(34, 197, 94, 0.3);

/* Warning */
background: rgba(234, 179, 8, 0.2);
color: #EAB308;
border: 1px solid rgba(234, 179, 8, 0.3);

/* Info */
background: rgba(212, 175, 55, 0.2);
color: #D4AF37;
border: 1px solid rgba(212, 175, 55, 0.3);
```

---

## Forms

### **Input Fields**
```css
padding: 0.875rem 1rem;
background: rgba(0, 0, 0, 0.4);
border: 1px solid rgba(212, 175, 55, 0.2);
border-radius: 8px;
color: #FFFFF0;
font-size: 1rem;
transition: all 0.3s ease;
```

**Focus State:**
```css
border-color: #D4AF37;
background: rgba(0, 0, 0, 0.6);
outline: none;
```

**Placeholder:**
```css
color: rgba(255, 255, 240, 0.4);
```

### **Labels**
```css
font-size: 0.9375rem;
font-weight: 600;
color: rgba(255, 255, 240, 0.9);
margin-bottom: 0.5rem;
```

---

## Imagery

### **Photography Style**

**Characteristics:**
- Golden hour lighting
- Dubai locations (Marina, Downtown, Palm)
- Professional editorial quality
- Phase One IQ4 / Hasselblad aesthetic
- Shallow depth of field (f/1.4 - f/2.8)
- Cinematic color grading
- Clean, minimal compositions

**Subjects:**
- Luxury vehicles (exotic, high-end)
- Membership cards on marble
- Dubai skylines and architecture
- Professional inspectors in branded attire
- Executive lifestyle imagery

**Technical Specs:**
- Aspect ratio: 3:2 or 16:9
- Resolution: Minimum 1920px wide
- Format: JPG (95% quality) or WebP
- Color space: sRGB
- Optimization: Next.js Image component

### **Image Treatment**

**Overlays:**
```css
/* Dark gradient overlay for text readability */
background: linear-gradient(to bottom,
  transparent 0%,
  rgba(10, 10, 10, 0.9) 100%
);
```

**Hover Effects:**
```css
/* Zoom on hover */
transform: scale(1.08);
transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
```

---

## Animations

### **Hover States**

**Cards:**
```css
.card {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(212, 175, 55, 0.15);
}
```

**Buttons:**
```css
.button {
  transition: all 0.3s ease;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(212, 175, 55, 0.4);
}
```

**Images:**
```css
.image {
  transition: transform 0.6s ease;
}

.card:hover .image {
  transform: scale(1.08);
}
```

### **Pulse Animation**
```css
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.05);
  }
}

animation: pulse 2s infinite;
```

### **Slide In**
```css
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## Layout

### **Container Widths**
```css
--container-sm: 640px
--container-md: 768px
--container-lg: 1024px
--container-xl: 1200px
--container-2xl: 1400px
```

### **Breakpoints**
```css
/* Mobile */
@media (max-width: 768px)

/* Tablet */
@media (min-width: 769px) and (max-width: 1024px)

/* Desktop */
@media (min-width: 1025px)

/* Large Desktop */
@media (min-width: 1440px)
```

### **Grid Systems**

**Package Grid:**
```css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
gap: 2rem;
```

**Membership Grid:**
```css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
gap: 2.5rem;
```

---

## RTL (Arabic) Support

### **Direction Handling**
```css
[dir="rtl"] {
  direction: rtl;
}

/* Mirror transforms */
[dir="rtl"] .element {
  transform: scaleX(-1);
}

/* Reverse flex */
[dir="rtl"] .flex-row {
  flex-direction: row-reverse;
}

/* Flip padding/margin */
[dir="rtl"] .element {
  padding-left: 0;
  padding-right: 2rem;
}
```

### **Typography**
```css
[dir="rtl"] {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  text-align: right;
}
```

---

## Voice & Tone

### **Writing Style**

**Headlines:**
- Short, impactful, uppercase
- Focus on benefits, not features
- Example: "NEVER BUY A CAR ALONE AGAIN"

**Body Copy:**
- Conversational but sophisticated
- Address reader directly ("you/your")
- Avoid jargon, explain value clearly
- Example: "Your dedicated concierge handles everything from sourcing to negotiation"

**CTAs:**
- Action-oriented verbs
- Create urgency without pressure
- Examples:
  - "Speak with AI Advisor"
  - "Begin Assessment"
  - "Start Voice Conversation"

### **Prohibited:**
- Overly technical jargon
- Aggressive sales language
- Cheap/discount positioning
- Comparisons to competitors
- Emojis (unless in specific contexts)

### **Preferred:**
- Luxury descriptors (bespoke, exclusive, premium)
- Trust indicators (expert, certified, verified)
- Exclusivity (members-only, by invitation)
- Service language (concierge, white-glove)

---

## Accessibility

### **Contrast Ratios**

**Text on Dark:**
- White (#FFFFF0) on Black (#111111): 19.47:1 ✅
- Gold (#D4AF37) on Black (#111111): 9.2:1 ✅

**Text on Gold:**
- Black (#111111) on Gold (#D4AF37): 9.2:1 ✅

**Minimum Target:** WCAG AA (4.5:1 for text)

### **Focus States**
```css
:focus-visible {
  outline: 2px solid #D4AF37;
  outline-offset: 2px;
}
```

### **Touch Targets**
- Minimum 48px × 48px
- Adequate spacing between clickable elements
- Clear hover/active states

---

## Responsive Design

### **Mobile-First Approach**

**Font Scaling:**
```css
/* Mobile */
h1: 2rem
h2: 1.75rem
body: 1rem

/* Tablet */
h1: 2.5rem
h2: 2rem
body: 1rem

/* Desktop */
h1: 3.5rem-6rem
h2: 2.5rem-4rem
body: 1rem-1.125rem
```

**Spacing Scaling:**
```css
/* Mobile */
section padding: 3rem 0
card padding: 1.5rem

/* Desktop */
section padding: 5-6rem 0
card padding: 2.5-3rem
```

**Grid Collapse:**
- 3-column → 2-column → 1-column
- Side-by-side → stacked
- Horizontal scroll on mobile for wide content

---

## Motion Design

### **Principles**
1. **Purposeful** - Every animation serves UX
2. **Smooth** - 60fps, hardware-accelerated
3. **Quick** - 200-400ms for interactions
4. **Elegant** - Subtle, not flashy

### **Do:**
- ✅ Lift cards on hover
- ✅ Fade in content on scroll
- ✅ Smooth page transitions
- ✅ Pulsing for active states
- ✅ Gentle scaling effects

### **Don't:**
- ❌ Spinning elements
- ❌ Excessive bouncing
- ❌ Jarring transitions
- ❌ Auto-playing videos
- ❌ Parallax overuse

---

## Brand Applications

### **Logo Usage**

**Primary Logo:**
```
MAJAZ | مجاز
```

**Lockup:**
- English (MAJAZ) in Raleway Bold, Gold
- Divider (|) in light grey/white
- Arabic (مجاز) in IBM Plex Sans Arabic, Gold

**Clear Space:**
- Minimum 1x logo height around logo
- Never stretch or skew
- Maintain aspect ratio

**Minimum Size:**
- 120px wide (digital)
- 40mm wide (print)

### **Color Variations**

**On Dark Backgrounds:**
- MAJAZ: Gold (#D4AF37)
- Divider: rgba(255, 255, 255, 0.5)
- مجاز: Ivory (#FFFFF0)

**On Light Backgrounds:**
- MAJAZ: Black (#111111)
- Divider: rgba(0, 0, 0, 0.3)
- مجاز: Black (#111111)

---

## Do's and Don'ts

### **Do:**
✅ Use glass morphism for depth
✅ Maintain generous white space
✅ Use thin/light font weights (200-400)
✅ Apply wide letter-spacing on headings
✅ Keep animations subtle and smooth
✅ Ensure RTL works perfectly
✅ Use gold sparingly for impact
✅ Test on mobile devices
✅ Optimize images for performance

### **Don't:**
❌ Use gradients everywhere
❌ Over-animate elements
❌ Mix too many font weights
❌ Ignore RTL requirements
❌ Use low-quality images
❌ Crowd the interface
❌ Forget hover states
❌ Skip loading states
❌ Neglect accessibility

---

## File Naming Conventions

### **Components**
```
PascalCase.tsx
Example: PackageCard.tsx, DurationToggle.tsx
```

### **Pages**
```
lowercase-with-hyphens/page.tsx
Example: what-we-offer/page.tsx
```

### **Images**
```
lowercase-with-hyphens.jpg
Example: gold-concierge.jpg, hero-majaz-dubai.jpg
```

### **Utilities**
```
camelCase.ts
Example: formatCurrency.ts, getPackageBySlug.ts
```

---

## Brand Voice Examples

### **Headlines**
- "Never Buy or Sell a Car Alone Again"
- "The Amex Black Card of Car Ownership"
- "Dubai's Premier Automotive Advisory"
- "Bespoke Vehicle Intelligence"

### **Value Props**
- "Unlimited inspections with same-day priority"
- "Your dedicated concierge handles everything"
- "Members save an average of 180,000 AED per year"
- "From sourcing to registration, we handle it all"

### **CTAs**
- "Speak with AI Advisor"
- "Begin Assessment"
- "Start Voice Conversation"
- "Explore Services"
- "Join the Community"

---

*MAJAZ Brand Style Guide v1.0*
*Last Updated: 2025-01-11*
