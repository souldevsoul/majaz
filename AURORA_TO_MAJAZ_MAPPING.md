# Aurora ESLint Rules → MAJAZ Implementation Mapping

## Executive Summary

Aurora's ESLint configuration provides an excellent template for MAJAZ. The plugin-based approach with custom rules enables brand-specific validation perfect for a luxury automotive concierge service.

---

## Direct Implementation Rules (Copy As-Is)

### 1. Form Validation
**Aurora Rule:** `no-form-without-submit`
**Applies to MAJAZ:** ✅ 100% Applicable
**Severity:** ERROR (build-blocking)

**MAJAZ Use Cases:**
- Vehicle assessment request form
- Price quote submission
- Payment processing forms
- Service booking forms
- Contact/inquiry forms

**Code Example:**
```jsx
// ✅ GOOD - Form has submission handler
<form onSubmit={handleAssessment}>
  <input name="carUrl" required />
  <button type="submit">Get Assessment</button>
</form>

// ❌ BAD - No submission handler
<form>
  <input name="carUrl" />
  <button>Get Assessment</button>
</form>
```

---

### 2. Image Accessibility
**Aurora Rule:** `no-missing-alt-text`
**Applies to MAJAZ:** ✅ 100% Applicable
**Severity:** ERROR (build-blocking)

**MAJAZ Use Cases:**
- Vehicle photos in listings
- Before/after assessment images
- Brand imagery (Dubai, marble, golden hour)
- Testimonial photos
- Process step graphics

**Code Example:**
```jsx
// ✅ GOOD - Alt text describes image
<Image
  src="/vehicle-mercedes.jpg"
  alt="2022 Mercedes-Benz S-Class in Dubai showroom"
  width={400}
  height={300}
/>

// ❌ BAD - Missing alt attribute
<Image src="/vehicle-mercedes.jpg" width={400} height={300} />
```

---

### 3. Interactive Buttons
**Aurora Rule:** `no-button-without-handler`
**Applies to MAJAZ:** ✅ 100% Applicable
**Severity:** Warning

**MAJAZ Use Cases:**
- Assessment submission buttons
- Language toggle (AR/EN)
- Navigation buttons
- CTA buttons (Book Assessment, Get Quote)
- Social sharing buttons

**Code Example:**
```jsx
// ✅ GOOD - Button has click handler
<Button onClick={() => submitAssessment(carUrl)}>
  Request Assessment
</Button>

// ✅ ALSO GOOD - Submit button
<button type="submit">Submit</button>

// ❌ BAD - No interaction
<button>Request Assessment</button>
```

---

### 4. Async Button Feedback
**Aurora Rule:** `require-loading-state-on-async-button`
**Applies to MAJAZ:** ✅ 100% Applicable
**Severity:** Warning

**MAJAZ Use Cases:**
- Assessment submission (wait for Firecrawl + OpenAI)
- Payment processing (Stripe integration)
- Fetching market comps (Perplexity API)
- Generating PDF reports
- WhatsApp booking requests

**Code Example:**
```jsx
// ✅ GOOD - Shows loading state during async operation
const [isLoading, setIsLoading] = useState(false);

<Button
  onClick={async () => {
    setIsLoading(true);
    try {
      await submitAssessment(carUrl);
    } finally {
      setIsLoading(false);
    }
  }}
  disabled={isLoading}
>
  {isLoading ? 'Processing...' : 'Submit Assessment'}
</Button>

// ❌ BAD - No feedback during fetch
<Button onClick={async () => {
  const response = await fetch('/api/assess', {...});
}}>
  Submit Assessment
</Button>
```

---

### 5. Network Error Handling
**Aurora Rule:** `require-try-catch-fetch`
**Applies to MAJAZ:** ✅ 100% Applicable
**Severity:** Warning

**MAJAZ Use Cases:**
- API calls to scrape auction listings
- Firecrawl integration
- OpenAI structured extraction
- Perplexity market comps
- Stripe payment processing
- WhatsApp integration

**Code Example:**
```jsx
// ✅ GOOD - Fetch wrapped in try-catch
async function scrapeAuctionListing(url) {
  try {
    const response = await fetch('/api/scrape', {
      method: 'POST',
      body: JSON.stringify({ url })
    });

    if (!response.ok) {
      throw new Error(`Failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Scraping failed:', error);
    showErrorNotification('Unable to process URL. Please try again.');
    throw error;
  }
}

// ❌ BAD - Unhandled fetch error
async function scrapeAuctionListing(url) {
  const response = await fetch('/api/scrape', {
    method: 'POST',
    body: JSON.stringify({ url })
  });
  return await response.json();
}
```

---

### 6. Empty State Handling
**Aurora Rule:** `require-empty-state`
**Applies to MAJAZ:** ✅ 100% Applicable
**Severity:** Warning

**MAJAZ Use Cases:**
- Empty assessment history
- Empty saved vehicles
- Empty market comps list
- Empty testimonials/reviews
- Empty price history

**Code Example:**
```jsx
// ✅ GOOD - Check length before rendering
function VehicleHistory({ assessments }) {
  if (!assessments?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gold">No assessments yet</p>
        <p className="text-sm">Submit your first vehicle for evaluation</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {assessments.map(a => (
        <AssessmentCard key={a.id} assessment={a} />
      ))}
    </div>
  );
}

// ❌ BAD - Empty list shows nothing
function VehicleHistory({ assessments }) {
  return (
    <div className="grid gap-4">
      {assessments.map(a => (
        <AssessmentCard key={a.id} assessment={a} />
      ))}
    </div>
  );
}
```

---

### 7. Accessibility: Icon Buttons
**Aurora Rule:** `require-aria-label-on-icon-buttons`
**Applies to MAJAZ:** ✅ 100% Applicable
**Severity:** Warning

**MAJAZ Use Cases:**
- Language toggle button (AR/EN icons)
- Menu button (hamburger)
- Close/dismiss buttons
- Social media share buttons
- Copy-to-clipboard buttons

**Code Example:**
```jsx
// ✅ GOOD - Icon button has aria-label
<button
  aria-label="Switch to Arabic"
  onClick={() => toggleLanguage('ar')}
  className="p-2"
>
  <Globe className="w-5 h-5" />
</button>

// ✅ ALSO GOOD - Text visible
<button className="flex items-center gap-2">
  <Menu className="w-5 h-5" />
  <span>Menu</span>
</button>

// ❌ BAD - Icon only with no label
<button onClick={() => toggleLanguage('ar')}>
  <Globe className="w-5 h-5" />
</button>
```

---

### 8. Generic Placeholder Text
**Aurora Rule:** `no-generic-placeholders`
**Applies to MAJAZ:** ✅ 100% Applicable
**Severity:** Warning

**MAJAZ Use Cases:**
- Auction/marketplace URL input
- Email subscription
- Search forms
- Contact inquiry forms
- Bid estimation inputs

**Code Example:**
```jsx
// ✅ GOOD - Specific placeholder
<input
  type="url"
  placeholder="Paste Emirates Auction URL"
  value={carUrl}
  onChange={(e) => setCarUrl(e.target.value)}
/>

// ❌ BAD - Generic placeholder
<input
  type="text"
  placeholder="Enter text"
  value={carUrl}
/>
```

---

### 9. Image Optimization
**Aurora Rule:** `require-image-optimization`
**Applies to MAJAZ:** ✅ 100% Applicable
**Severity:** Warning

**MAJAZ Use Cases:**
- Golden hour vehicle photography
- Dubai marble forecourt backgrounds
- Premium brand imagery
- Vehicle comparison images
- Testimonial portraits

**Code Example:**
```jsx
// ✅ GOOD - Next.js Image component
import Image from 'next/image';

<Image
  src="/hero-majaz-dubai.jpg"
  alt="Luxury SUV on marble forecourt"
  width={1920}
  height={1080}
  priority
  quality={85}
/>

// ❌ BAD - HTML img tag
<img
  src="/hero-majaz-dubai.jpg"
  alt="Luxury SUV on marble forecourt"
  width={1920}
  height={1080}
/>
```

---

## Customized Rules (Adapt for MAJAZ)

### 10. Brand Color Enforcement
**Aurora Rule:** `use-styleguide-colors-only`
**Applies to MAJAZ:** ✅ Must Customize for Gold/Black/Ivory
**Severity:** Warning

**Aurora Colors:** Purple, Violet, Pink
**MAJAZ Colors:** Black, Gold, Ivory + Grayscale

**MAJAZ Configuration:**
```javascript
'product-quality/use-styleguide-colors-only': ['warn', {
  allowedColors: [
    // Always allowed
    'black', 'white', 'transparent', 'current', 'inherit',

    // MAJAZ brand colors ONLY
    'yellow-',      // Primary gold (#D4AF37) - use yellow-500, yellow-600
    'amber-',       // Gold alternatives - use amber-600, amber-700
    'stone-',       // Ivory (#FFFFF0) - use stone-50, stone-100

    // Utility colors
    'gray-',        // Secondary neutrals
    'slate-',
    'zinc-',
    'neutral-',

    // Error states only
    'red-'
  ]
}]
```

**MAJAZ Use Cases:**
```jsx
// ✅ GOOD - Brand colors only
<div className="bg-black text-yellow-500 border-amber-700">
  Premium Assessment
</div>

// ✅ ALSO GOOD - Neutral grays
<div className="bg-slate-900 text-stone-50">
  Concierge Service
</div>

// ❌ BAD - Unauthorized colors
<div className="bg-purple-900 text-blue-500">
  Wrong colors!
</div>
```

**Implementation Note:**
- Update Tailwind config to restrict color usage
- Enforce gold (#D4AF37) across all CTAs
- Use ivory for text on dark backgrounds
- Reserve red for error states only
- Use grayscale for secondary elements

---

### 11. Company Information Consistency
**Aurora Rule:** `consistent-company-info`
**Applies to MAJAZ:** ✅ Must Customize with MAJAZ Details
**Severity:** Warning

**Aurora Configuration:**
```javascript
'product-quality/consistent-company-info': ['warn', {
  companyName: 'Aurora',
  email: 'support@auroradev.com'
}]
```

**MAJAZ Configuration:**
```javascript
'product-quality/consistent-company-info': ['warn', {
  companyName: 'MAJAZ',
  email: 'concierge@majaz.ae'  // Adjust to actual email
}]
```

**MAJAZ Use Cases:**
```jsx
// ✅ GOOD - Consistent email
<a href="mailto:concierge@majaz.ae">Contact Us</a>

// ❌ BAD - Different email
<a href="mailto:support@auroradev.com">Contact Us</a>
```

---

### 12. Payment Provider Consistency
**Aurora Rule:** `consistent-payment-providers`
**Applies to MAJAZ:** ✅ 100% Applicable (Stripe)
**Severity:** Warning

**MAJAZ Configuration:**
```javascript
'product-quality/consistent-payment-providers': ['warn', {
  provider: 'stripe'  // Consistent payment processing
}]
```

**MAJAZ Use Cases:**
```jsx
// ✅ GOOD - Stripe only
"We accept Stripe for secure payments"
"Powered by Stripe"

// ❌ BAD - Mixed payment mentions
"We accept PayPal and Square"
"Processed by Ecommpay"
```

---

## New Rules to Add (MAJAZ-Specific)

### 13. Internal Link Validation
**Aurora Rule:** `no-broken-internal-links`
**Applies to MAJAZ:** ✅ Valuable for SPA Navigation
**Severity:** Warning

**MAJAZ Use Cases:**
- Link to assessment results
- Link to pricing page
- Link to "How It Works"
- Link to FAQ
- Link to payment confirmation

**Implementation:** Copy directly from Aurora plugin

---

### 14. Bilingual Content Rules (Custom - NEW)
**Rule:** `require-arabic-translation`
**Applies to MAJAZ:** ✅ Critical for UAE Market
**Severity:** Warning

**MAJAZ Use Cases:**
```jsx
// ✅ GOOD - Bilingual
const content = {
  en: "Premium Vehicle Concierge",
  ar: "خدمة تقييم المركبات الفاخرة"
}

// ❌ BAD - English only
const content = "Premium Vehicle Concierge"
```

---

### 15. RTL Support Validation (Custom - NEW)
**Rule:** `validate-rtl-layout`
**Applies to MAJAZ:** ✅ Required for Arabic
**Severity:** Warning

**MAJAZ Use Cases:**
- Flex direction reversal in Arabic
- Margin/padding mirroring
- Icon direction flipping
- Text alignment changes

**Implementation Pattern:**
```jsx
// ✅ GOOD - RTL-aware
<div className={cn(
  "flex gap-4",
  isArabic && "flex-row-reverse"
)}>
  <Button>Start</Button>
  <Icon />
</div>

// ❌ BAD - Fixed direction
<div className="flex gap-4">
  <Button>Start</Button>
  <Icon />
</div>
```

---

### 16. UAE Phone Number Format (Custom - NEW)
**Rule:** `validate-uae-phone-format`
**Applies to MAJAZ:** ✅ UAE-Specific
**Severity:** Warning

**MAJAZ Use Cases:**
```jsx
// ✅ GOOD - UAE format
const phone = "+971501234567";
placeholder="Your phone (+971)"

// ❌ BAD - Wrong format
const phone = "0501234567";
placeholder="Your phone"
```

---

### 17. Currency Consistency (Custom - NEW)
**Rule:** `currency-consistency-aed`
**Applies to MAJAZ:** ✅ Critical for Pricing
**Severity:** Warning

**MAJAZ Configuration:**
```javascript
'majaz-quality/currency-consistency': ['warn', {
  currency: 'AED',
  currencySymbol: 'د.إ'
}]
```

**MAJAZ Use Cases:**
```jsx
// ✅ GOOD - AED only
"49 AED Remote Assessment"
"د.إ 49 تقييم عن بعد"

// ❌ BAD - Mixed currencies
"$49 Assessment"
"Assessment costs €45"
```

---

### 18. Platform URL Validation (Custom - NEW)
**Rule:** `validate-supported-auction-platforms`
**Applies to MAJAZ:** ✅ Core Feature Validation
**Severity:** Error (build-blocking)

**MAJAZ Supported Platforms:**
- Emirates Auction
- Awalmaz
- dubizzle Motors
- CarSwitch
- AutoTrader UAE
- Other GCC platforms

**Implementation Example:**
```jsx
// ✅ GOOD - Supported platform
const url = "https://emiratesauction.ae/listings/...";

// ❌ BAD - Unsupported platform
const url = "https://craigslist.org/...";
```

---

## Configuration Priority by Phase

### Phase 1: Critical Brand Foundation (Must Have)
- ✅ Color palette enforcement
- ✅ Company email consistency
- ✅ Form submission handling
- ✅ Image alt text
- ✅ Link validation

### Phase 2: UX Excellence (Should Have)
- ⚠️ Icon button accessibility
- ⚠️ Async button loading states
- ⚠️ Empty state handling
- ⚠️ Network error handling
- ⚠️ Placeholder text quality

### Phase 3: Bilingual/RTL (Must Have for UAE)
- 🌍 Arabic translation validation
- 🌍 RTL layout validation
- 🌍 Language toggle functionality

### Phase 4: Market-Specific (UAE Requirements)
- 🇦🇪 Phone number format
- 🇦🇪 Currency consistency (AED)
- 🇦🇪 Auction platform validation

### Phase 5: Performance & Optimization (Nice to Have)
- ⚡ Image optimization
- ⚡ Generic placeholder detection

---

## Implementation Timeline

| Phase | Duration | Rules | Priority |
|-------|----------|-------|----------|
| 1 | Week 1 | Colors, Email, Forms, Images | CRITICAL |
| 2 | Week 1-2 | Accessibility, Loading, Empty | HIGH |
| 3 | Week 2-3 | Bilingual, RTL, Localization | CRITICAL |
| 4 | Week 3 | UAE-specific (Phone, Currency) | HIGH |
| 5 | Week 4 | Performance, Polish | MEDIUM |

---

## Summary: Aurora Rules for MAJAZ

| Aurora Rule | MAJAZ Application | Custom Config? | Severity |
|-------------|-------------------|----------------|----------|
| no-form-without-submit | ✅ Copy as-is | No | ERROR |
| no-missing-alt-text | ✅ Copy as-is | No | ERROR |
| no-button-without-handler | ✅ Copy as-is | No | WARN |
| require-loading-state-on-async-button | ✅ Copy as-is | No | WARN |
| require-try-catch-fetch | ✅ Copy as-is | No | WARN |
| require-empty-state | ✅ Copy as-is | No | WARN |
| require-aria-label-on-icon-buttons | ✅ Copy as-is | No | WARN |
| no-generic-placeholders | ✅ Copy as-is | No | WARN |
| require-image-optimization | ✅ Copy as-is | No | WARN |
| use-styleguide-colors-only | ⚠️ Customize | Yes (colors) | WARN |
| consistent-company-info | ⚠️ Customize | Yes (email) | WARN |
| consistent-payment-providers | ✅ Copy as-is | No (already Stripe) | WARN |
| no-broken-internal-links | ✅ Copy as-is | No | WARN |
| **NEW: require-arabic-translation** | ✅ Create | Yes | WARN |
| **NEW: validate-rtl-layout** | ✅ Create | Yes | WARN |
| **NEW: validate-uae-phone-format** | ✅ Create | Yes | WARN |
| **NEW: currency-consistency-aed** | ✅ Create | Yes | WARN |
| **NEW: validate-auction-platforms** | ✅ Create | Yes | ERROR |

---

## Quick Start Checklist

- [ ] Copy `eslint.config.mjs` from Aurora
- [ ] Copy `eslint.config.product.mjs` from Aurora
- [ ] Copy `eslint-plugin-product-quality/` from Aurora
- [ ] Rename plugin to `eslint-plugin-majaz-quality`
- [ ] Update color configuration (gold/ivory/black)
- [ ] Update company email (concierge@majaz.ae)
- [ ] Create new custom rules (Arabic, RTL, UAE)
- [ ] Run `npm run lint` on MAJAZ codebase
- [ ] Fix all errors (forms, images)
- [ ] Address warnings (colors, accessibility)
- [ ] Add pre-commit hook
- [ ] Document for team

---

**Aurora Configuration Files:**
- `/batch-3/aurora/eslint.config.mjs` - Base config
- `/batch-3/aurora/eslint.config.product.mjs` - Product quality rules
- `/batch-3/aurora/eslint-plugin-product-quality/index.js` - Custom plugin (735 lines)

**MAJAZ Implementation:**
Start with Aurora's configuration and customize for MAJAZ brand, UAE market, and bilingual requirements.

