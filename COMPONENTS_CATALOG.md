# MAJAZ Components Catalog

*A comprehensive reference of all reusable components in the MAJAZ design system*

---

## Layout Components

### **Header**
**Location:** `components/majaz/Header.tsx`

**Features:**
- Transparent on scroll, glass on scroll
- White nav links with gold hover
- Logo: MAJAZ | مجاز
- Language toggle (EN/AR)
- Currency selector
- Mobile hamburger menu
- RTL support

**Usage:**
```tsx
import Header from '@/components/majaz/Header'

<Header isAuthenticated={true} />
```

**Variants:**
- Default (transparent)
- Scrolled (glass morphism)

---

### **Footer**
**Location:** `components/majaz/Footer.tsx`

**Features:**
- 4-column grid (About, Quick Links, Services, Newsletter)
- MAJAZ branding
- Social media links
- Newsletter signup
- UAE flag badge
- Legal links
- Language toggle
- RTL support

**Usage:**
```tsx
import Footer from '@/components/majaz/Footer'

<Footer />
```

---

### **MobileMenu**
**Location:** `components/majaz/MobileMenu.tsx`

**Features:**
- Full-screen overlay
- Animated slide-in
- Navigation links
- Language/currency controls
- Close button
- Glass morphism background

---

## UI Components

### **GlassCard**
**Location:** `components/majaz/GlassCard.tsx`

**Features:**
- Glass morphism effect
- Backdrop blur
- Gold border
- Custom padding via className
- Hover state optional

**Usage:**
```tsx
import GlassCard from '@/components/majaz/GlassCard'

<GlassCard className="p-8">
  <h2>Content here</h2>
</GlassCard>
```

**Variants:**
- Standard (0.6 opacity)
- Strong (0.8 opacity)
- Featured (thicker border)

---

### **Button**
**Location:** `components/majaz/Button.tsx`

**Props:**
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  href?: string
  onClick?: () => void
  disabled?: boolean
  className?: string
}
```

**Variants:**

**Primary:**
```css
background: linear-gradient(135deg, #D4AF37 0%, #B8941E 100%);
color: #111111;
box-shadow: 0 4px 16px rgba(212, 175, 55, 0.3);
```

**Secondary:**
```css
background: rgba(255, 255, 255, 0.05);
color: #D4AF37;
border: 2px solid rgba(212, 175, 55, 0.3);
```

**Ghost:**
```css
background: transparent;
color: #D4AF37;
border: none;
```

**Usage:**
```tsx
<Button variant="primary" size="lg">
  Click Me
</Button>

<Button variant="secondary" href="/contact">
  Learn More
</Button>
```

---

### **LanguageToggle**
**Location:** `components/majaz/LanguageToggle.tsx`

**Features:**
- EN / AR switcher
- Globe icon
- Dropdown menu
- Current language indicator
- Smooth transition

---

### **CurrencySelector**
**Location:** `components/majaz/CurrencySelector.tsx`

**Features:**
- AED / USD / EUR
- Dropdown selector
- Currency symbol display
- Persistent selection

---

## Package Components

### **PackageCard**
**Location:** `components/packages/PackageCard.tsx`

**Props:**
```typescript
interface PackageCardProps {
  package: Package
  duration: 'monthly' | 'quarterly' | 'annual'
  locale?: string
  featured?: boolean
}
```

**Features:**
- Hero image with overlay
- Tier color indicator
- Popular/Exclusive badge
- Package name & description
- Dynamic pricing display
- Feature list with icons
- Gold gradient CTA button
- Hover: lift + scale + glow
- RTL support

**Usage:**
```tsx
<PackageCard
  package={pkg}
  duration="annual"
  locale="en"
  featured={true}
/>
```

**Anatomy:**
1. Badge (top-right)
2. Tier indicator (top-left)
3. Hero image (240px height)
4. Content area:
   - Name (1.75rem, gold)
   - Description (0.9375rem)
   - Price (2.5rem, gold)
   - Features list (checkmarks)
   - CTA button

---

### **DurationToggle**
**Location:** `components/packages/DurationToggle.tsx`

**Props:**
```typescript
interface DurationToggleProps {
  value: 'monthly' | 'quarterly' | 'annual'
  onChange: (value) => void
  locale?: string
}
```

**Features:**
- 3 options: Monthly / Quarterly / Annual
- Save % badges
- Active state with gold gradient
- Glass morphism background
- Smooth transitions
- Mobile: vertical stack

**Usage:**
```tsx
const [duration, setDuration] = useState('annual')

<DurationToggle
  value={duration}
  onChange={setDuration}
  locale="en"
/>
```

---

## Interview Components

### **VoiceVisualizer**
**Location:** `components/interview/VoiceVisualizer.tsx`

**Props:**
```typescript
interface VoiceVisualizerProps {
  isActive: boolean
  isSpeaking?: boolean
}
```

**Features:**
- Canvas-based rendering
- 40 circular frequency bars
- Gold gradient colors
- Smooth 60fps animation
- requestAnimationFrame
- Idle state (small circle)
- Active state (dynamic bars)
- Speaking state (larger amplitude)

**Usage:**
```tsx
<VoiceVisualizer
  isActive={isListening}
  isSpeaking={isSpeaking}
/>
```

**Technical:**
- Canvas: 400x400px
- 40 bars radiating from center
- Radius: 80px idle, 80-160px active
- Animation: Math.sin wave functions
- Gold gradient on each bar

---

## Checkout Components

### **StripeCheckoutForm**
**Location:** `components/checkout/StripeCheckoutForm.tsx`

**Props:**
```typescript
interface StripeCheckoutFormProps {
  amount: number
  currency: string
  packageName: string
  locale: string
  onSuccess?: () => void
}
```

**Features:**
- Stripe Elements integration
- Payment card input
- Error handling
- Processing state
- Success callback
- Mobile responsive

**Usage:**
```tsx
<Elements stripe={stripePromise}>
  <StripeCheckoutForm
    amount={36700}
    currency="AED"
    packageName="Gold Concierge"
    locale="en"
    onSuccess={() => router.push('/success')}
  />
</Elements>
```

---

## Utility Components

### **LoadingSpinner**
```tsx
// To be created
<div className="spinner">
  <div className="spin-circle" />
</div>
```

**Style:**
```css
.spin-circle {
  border: 3px solid rgba(212, 175, 55, 0.3);
  border-top-color: #D4AF37;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}
```

---

### **Badge**
```tsx
<span className="badge badge-gold">
  EXCLUSIVE
</span>
```

**Variants:**
- `badge-gold` - Gold gradient
- `badge-success` - Green
- `badge-warning` - Yellow
- `badge-info` - Blue

---

### **StatusBadge**
```tsx
<span className="status-badge status-completed">
  Completed
</span>
```

**States:**
- `pending` - Gold
- `in-progress` - Yellow
- `completed` - Green
- `failed` - Red

---

## Form Components

### **Input**
```tsx
<div className="form-group">
  <label htmlFor="email">Email</label>
  <input
    id="email"
    type="email"
    placeholder="your@email.com"
    className="form-input"
  />
</div>
```

**Style:**
```css
.form-input {
  padding: 0.875rem 1rem;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 8px;
  color: #FFFFF0;
}

.form-input:focus {
  border-color: #D4AF37;
  background: rgba(0, 0, 0, 0.6);
}
```

---

### **Checkbox**
```tsx
<label className="checkbox-label">
  <input type="checkbox" />
  <span>I agree to terms</span>
</label>
```

---

### **Select / Dropdown**
```tsx
<select className="form-select">
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</select>
```

---

## Data Display Components

### **StatCard**
```tsx
<div className="stat-card">
  <div className="stat-value">5000+</div>
  <div className="stat-label">VEHICLES ASSESSED</div>
</div>
```

**Style:**
```css
.stat-value {
  font-family: var(--font-display);
  font-size: 3.5rem;
  font-weight: 300;
  color: #D4AF37;
  letter-spacing: 0.05em;
}

.stat-label {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #D4AF37;
  margin-top: 1rem;
}
```

---

### **FeatureList**
```tsx
<ul className="feature-list">
  <li>
    <svg className="feature-icon">...</svg>
    <span>Feature description</span>
  </li>
</ul>
```

**Style:**
```css
.feature-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feature-list li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 240, 0.85);
}

.feature-icon {
  color: #D4AF37;
  width: 20px;
  height: 20px;
}
```

---

### **PriceDisplay**
```tsx
<div className="price-display">
  <span className="price-amount">36,700 AED</span>
  <span className="price-period">/year</span>
</div>
```

**Style:**
```css
.price-amount {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 600;
  color: #D4AF37;
}

.price-period {
  font-size: 1rem;
  color: rgba(255, 255, 240, 0.7);
}
```

---

## Animation Components

### **FadeIn** (WOW.js)
```tsx
<div className="wow fadeInUp" data-wow-delay="200ms">
  Content
</div>
```

**Delays:**
- 0ms - Instant
- 100ms - Quick
- 200ms - Standard
- 300ms - Delayed
- 400ms - Very delayed

---

### **PulseAnimation**
```css
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.05); }
}

.pulse {
  animation: pulse 2s infinite;
}
```

---

## Component Composition Patterns

### **Hero Section**
```tsx
<section className="hero-section">
  <Image src="..." fill className="hero-bg" />
  <div className="hero-overlay" />
  <div className="hero-content">
    <h1 className="hero-title">Title</h1>
    <p className="hero-subtitle">Subtitle</p>
    <div className="hero-actions">
      <Button variant="primary">CTA</Button>
    </div>
  </div>
</section>
```

---

### **Feature Grid**
```tsx
<section className="features-section">
  <div className="section-header">
    <h2 className="section-title">Features</h2>
    <p className="section-description">Description</p>
  </div>
  <div className="features-grid">
    {features.map(f => (
      <GlassCard key={f.id}>
        <h3>{f.title}</h3>
        <p>{f.description}</p>
      </GlassCard>
    ))}
  </div>
</section>
```

---

### **CTA Section**
```tsx
<section className="cta-section">
  <GlassCard className="cta-card">
    <div className="cta-icon">{icon}</div>
    <h2 className="cta-title">Title</h2>
    <p className="cta-description">Description</p>
    <Button variant="primary" size="lg">CTA</Button>
  </GlassCard>
</section>
```

---

## Component File Organization

```
components/
├── majaz/                  # Core brand components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── MobileMenu.tsx
│   ├── LanguageToggle.tsx
│   ├── CurrencySelector.tsx
│   ├── GlassCard.tsx
│   └── Button.tsx
│
├── packages/               # Package-specific components
│   ├── PackageCard.tsx
│   └── DurationToggle.tsx
│
├── checkout/               # Checkout flow components
│   └── StripeCheckoutForm.tsx
│
├── interview/              # AI interview components
│   └── VoiceVisualizer.tsx
│
├── dashboard/              # Dashboard components (future)
│   ├── Sidebar.tsx
│   ├── RequestCard.tsx
│   └── ReportViewer.tsx
│
├── common/                 # Shared utilities
│   └── Counter.tsx
│
└── homes/                  # Homepage sections
    └── home-1/
        ├── Hero.jsx
        ├── Facts.jsx
        ├── Features.jsx
        ├── Features2.jsx
        ├── TrendingVehicles.jsx
        └── Testimonials.jsx
```

---

## Styling Patterns

### **Standard Component Structure**

```tsx
'use client'

import { useState } from 'react'

interface ComponentProps {
  // Props here
}

export default function Component({ prop1, prop2 }: ComponentProps) {
  return (
    <div className="component-wrapper">
      {/* Content */}

      <style jsx>{`
        .component-wrapper {
          /* Styles */
        }

        /* Mobile */
        @media (max-width: 768px) {
          .component-wrapper {
            /* Mobile styles */
          }
        }

        /* RTL */
        [dir="rtl"] .component-wrapper {
          /* RTL styles */
        }
      `}</style>
    </div>
  )
}
```

---

### **Glass Morphism Pattern**

```css
background: rgba(26, 26, 26, 0.6);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border: 1px solid rgba(212, 175, 55, 0.15);
border-radius: 24px;
transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
```

**On hover:**
```css
border-color: rgba(212, 175, 55, 0.4);
box-shadow: 0 20px 60px rgba(212, 175, 55, 0.15);
```

---

### **Gold Gradient Pattern**

```css
background: linear-gradient(135deg, #D4AF37 0%, #B8941E 100%);
color: #111111;
box-shadow: 0 4px 16px rgba(212, 175, 55, 0.3);
```

**On hover:**
```css
transform: translateY(-2px);
box-shadow: 0 8px 24px rgba(212, 175, 55, 0.4);
```

---

### **Hover Lift Pattern**

```css
.card {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-8px);
}

.card .image {
  transition: transform 0.6s ease;
}

.card:hover .image {
  transform: scale(1.08);
}
```

---

## Responsive Patterns

### **Grid Collapse**

```css
/* Desktop: 3 columns */
grid-template-columns: repeat(3, 1fr);

/* Tablet: 2 columns */
@media (max-width: 1024px) {
  grid-template-columns: repeat(2, 1fr);
}

/* Mobile: 1 column */
@media (max-width: 768px) {
  grid-template-columns: 1fr;
}
```

---

### **Auto-fit Grid**

```css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
gap: 2rem;
```

---

### **Flex Wrap**

```css
display: flex;
gap: 1.5rem;
flex-wrap: wrap;

@media (max-width: 768px) {
  flex-direction: column;
}
```

---

## RTL Patterns

### **Flex Reverse**
```css
[dir="rtl"] .flex-row {
  flex-direction: row-reverse;
}
```

### **Text Alignment**
```css
[dir="rtl"] .text-content {
  text-align: right;
}
```

### **Icon Flip**
```css
[dir="rtl"] .icon-arrow {
  transform: scaleX(-1);
}
```

### **Padding/Margin Swap**
```css
.element {
  padding-left: 2rem;
  padding-right: 0;
}

[dir="rtl"] .element {
  padding-left: 0;
  padding-right: 2rem;
}
```

---

## Canvas Components

### **CircularWaveform** (Voice Visualizer)

**Technique:**
- Canvas 2D context
- requestAnimationFrame loop
- Math.sin for wave motion
- Radial bar distribution
- Linear gradients per bar

**Code Pattern:**
```typescript
const draw = () => {
  ctx.clearRect(0, 0, width, height)

  for (let i = 0; i < barCount; i++) {
    const angle = (Math.PI * 2 / barCount) * i
    const wave = Math.sin(time * 0.1 + i * 0.3)
    const barHeight = wave * maxHeight

    // Draw bar from center outward
    const x1 = centerX + Math.cos(angle) * radius
    const y1 = centerY + Math.sin(angle) * radius
    const x2 = centerX + Math.cos(angle) * (radius + barHeight)
    const y2 = centerY + Math.sin(angle) * (radius + barHeight)

    ctx.strokeStyle = gradient
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
  }

  requestAnimationFrame(draw)
}
```

---

## Page Templates

### **Marketing Page Template**

```tsx
export default function Page() {
  const locale = useLocale()
  const isArabic = locale === 'ar'

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <section className="hero-section">
        <h1 className="page-title">Title</h1>
        <p className="page-subtitle">Subtitle</p>
      </section>

      {/* Content */}
      <section className="content-section">
        <div className="container">
          <GlassCard>
            {/* Content */}
          </GlassCard>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <Button variant="primary">CTA</Button>
      </section>

      <style jsx>{`
        .page-wrapper {
          min-height: 100vh;
          background: linear-gradient(to bottom, #000000 0%, #0A0A0A 50%, #000000 100%);
        }
      `}</style>
    </div>
  )
}
```

---

### **Dashboard Page Template**

```tsx
export default function DashboardPage() {
  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Title</h1>
        <Button variant="primary">Action</Button>
      </div>

      {/* Content Grid */}
      <div className="content-grid">
        <GlassCard>Content 1</GlassCard>
        <GlassCard>Content 2</GlassCard>
      </div>
    </div>
  )
}
```

---

## Component Checklist

### **Before Creating a Component:**
- [ ] Check if similar component exists
- [ ] Define TypeScript interface for props
- [ ] Plan responsive behavior
- [ ] Consider RTL requirements
- [ ] Add hover/focus states
- [ ] Include loading/error states
- [ ] Document props and usage

### **Component Quality Standards:**
- ✅ TypeScript typed
- ✅ Mobile responsive
- ✅ RTL compatible
- ✅ Accessible (WCAG AA)
- ✅ Performance optimized
- ✅ Consistent with brand
- ✅ Reusable and composable
- ✅ Documented

---

## Quick Reference

### **Common Classes**

```css
/* Containers */
.container { max-width: 1400px; margin: 0 auto; padding: 0 2rem; }
.section { padding: 5rem 0; }

/* Typography */
.heading-1 { font-size: 3.5rem; font-weight: 200; text-transform: uppercase; }
.heading-2 { font-size: 2.5rem; font-weight: 300; text-transform: uppercase; }
.body-text { font-size: 1rem; font-weight: 400; line-height: 1.6; }

/* Utilities */
.text-gold { color: #D4AF37; }
.text-ivory { color: #FFFFF0; }
.bg-glass { background: rgba(26, 26, 26, 0.6); backdrop-filter: blur(20px); }
.border-gold { border: 1px solid rgba(212, 175, 55, 0.15); }
```

---

*MAJAZ Components Catalog v1.0*
*Last Updated: 2025-01-11*
*All components production-ready*
