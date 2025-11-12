# Reelmatic ESLint Configuration Analysis

## Executive Summary
Reelmatic uses a sophisticated ESLint setup with **ESLint 9** (flat config format) and a custom `eslint-plugin-product-quality` plugin. The configuration focuses on **brand consistency, accessibility, UX quality, and content validation**—all excellent principles to adopt for MAJAZ's luxury brand positioning.

---

## Configuration Files

### 1. Primary ESLint Configurations
- **`eslint.config.mjs`** - Standard Next.js config (production)
- **`eslint.config.product.mjs`** - Enhanced product quality config (recommended)
- **`.eslintrc.product.json`** - Legacy format version of product config

### 2. Custom Plugin
- **`eslint-plugin-product-quality/index.js`** - 14 custom ESLint rules

---

## ESLint Version & Setup

| Aspect | Details |
|--------|---------|
| **ESLint Version** | 9.38.0 (latest flat config format) |
| **Config Format** | Flat config (ESLint 9+) in `.mjs` files |
| **TypeScript Support** | Yes - `@typescript-eslint/parser` v5 |
| **Framework** | Next.js 15.5.6 with `eslint-config-next` |
| **TypeScript Version** | 5.9.3 |
| **Node.js Modules** | ES modules (`.mjs` extension) |

---

## Base Configurations

### Standard Configuration (`eslint.config.mjs`)
```javascript
Extends:
  - "next/core-web-vitals" (Next.js web vitals rules)
  - "next/typescript" (TypeScript support for Next.js)

Environment:
  - Ignores: node_modules, .next, build, next-env.d.ts
```

### Rules (Standard Config)
```javascript
"react/no-unescaped-entities": "off"
"@typescript-eslint/no-unused-vars": "warn"
"@typescript-eslint/no-explicit-any": "warn"
"@next/next/no-img-element": "warn"
```

---

## Custom Product Quality Rules

### Rule Categories & Implementation

#### 1. LINK VALIDATION (Critical for UX)

**`no-broken-internal-links`** - ERROR in components
- Validates all internal href attributes point to existing pages
- Checks for Next.js app router structure with dynamic routes
- Supports:
  - `app/[locale]/...` (dynamic segments)
  - `app/(auth)/...` (route groups)
  - `app/(marketing)/...` (grouping)
- Resolves page.tsx/page.jsx in both `app` and `src/app`
- Ignores hash fragments (#) and query params (?)
- **Why it matters**: Broken links destroy trust and UX

---

#### 2. BRAND CONSISTENCY (Critical for Luxury Brands)

**`use-styleguide-colors-only`** - ERROR in components, WARN elsewhere
- Enforces strict color palette compliance
- Prevents arbitrary color values like `bg-[#FF0000]`
- Only checks actual Tailwind color utilities (not spacing/sizing)
- **Smart implementation**: Filters out non-color utilities like:
  - `text-xs`, `text-sm`, `text-lg` (sizing, not color)
  - `bg-gradient-`, `bg-opacity-`, `bg-clip-` (effects, not colors)
  - `border-solid`, `border-dashed` (styles, not colors)

**Allowed Color Prefixes** (from ReelMatic config):
```javascript
black, white, transparent, current, inherit
gray-, slate-, zinc-, neutral-, stone-
blue-, cyan-, sky-, indigo-
purple-, violet-, fuchsia-
pink-, rose-, red-, orange-, amber-, yellow-
lime-, green-, emerald-, teal-
primary, secondary, accent, muted, destructive
border, input, card, popover, sidebar
```

---

#### 3. CONTENT CONSISTENCY (Brand Voice)

**`consistent-company-info`** - WARN
- Detects hardcoded company emails
- Flags inconsistent contact information
- Config: `email: "support@reelmatic.ai"`
- Ignores example.com domains
- **Why it matters**: Consistency builds trust

**`consistent-payment-providers`** - WARN
- Ensures single payment gateway mentioned
- Config: `provider: "stripe"`
- Detects: stripe, ecommpay, paypal, square
- **Why it matters**: Multiple payment mentions confuse users

---

#### 4. UX CONSISTENCY RULES (NEW!)

**`no-button-without-handler`** - WARN
- Buttons must have `onClick`, `type`, or `asChild` attribute
- Prevents non-interactive fake buttons
- **Impact**: Users don't know if button works

**`no-form-without-submit`** - ERROR
- Forms must have `onSubmit` handler or `action` attribute
- Ensures forms handle submission explicitly
- **Impact**: Broken form submission = conversion loss

**`no-missing-alt-text`** - ERROR
- Images must have alt attribute (or `alt=""` for decorative)
- Applies to both `<img>` and Next.js `<Image>`
- **Impact**: Accessibility + SEO + screen reader support

**`no-generic-placeholders`** - WARN
- Rejects: "click here", "click me", "enter text", "type here", "input text", "enter value"
- Requires specific, contextual placeholder text
- **Example**: "Enter your email address" instead of "Enter text"
- **Impact**: Better UX, clearer intent

**`require-loading-state-on-async-button`** - WARN
- Async buttons must show loading state
- Detects: `async`, `await`, `fetch()`, `.then()`
- Looks for: `loading`, `isLoading`, or `disabled` props
- **Impact**: Users know request is processing

**`require-aria-label-on-icon-buttons`** - WARN
- Icon-only buttons need `aria-label` attribute
- Detects icon patterns: Icon, SVG, Ri*, Lucide, Menu, X, Close, Search, Arrow
- **Impact**: Screen reader accessibility

---

#### 5. ERROR HANDLING & QUALITY

**`require-try-catch-fetch`** - WARN
- All `fetch()` calls must be wrapped in try-catch
- Prevents unhandled API failures
- **Impact**: Graceful error handling

**`require-empty-state`** - WARN
- Array `.map()` must be wrapped in length/existence check
- Requires `.length`, `?.length`, `isEmpty`, or `hasData` check
- Prevents rendering empty lists without message
- **Impact**: Better UX when data is empty

---

#### 6. PERFORMANCE

**`require-image-optimization`** - WARN
- Use Next.js `<Image>` instead of `<img>` tag
- Only checks files in `/app/`, `/pages/`, or `/src/`
- **Impact**: Automatic optimization, smaller bundles, better LCP

---

## Complete Rule List (Severity)

| Rule | Severity | Category |
|------|----------|----------|
| `no-broken-internal-links` | ⚠️ WARN (default) / 🔴 ERROR (components) | Link Validation |
| `use-styleguide-colors-only` | ⚠️ WARN (default) / 🔴 ERROR (components) | Brand Consistency |
| `consistent-company-info` | ⚠️ WARN | Content Consistency |
| `consistent-payment-providers` | ⚠️ WARN | Content Consistency |
| `no-button-without-handler` | ⚠️ WARN | UX Consistency |
| `no-form-without-submit` | 🔴 ERROR | UX Consistency |
| `no-missing-alt-text` | 🔴 ERROR | Accessibility |
| `no-generic-placeholders` | ⚠️ WARN | UX Consistency |
| `require-loading-state-on-async-button` | ⚠️ WARN | UX Consistency |
| `require-aria-label-on-icon-buttons` | ⚠️ WARN | Accessibility |
| `require-try-catch-fetch` | ⚠️ WARN | Error Handling |
| `require-empty-state` | ⚠️ WARN | UX Consistency |
| `require-image-optimization` | ⚠️ WARN | Performance |

---

## Recommended Rules for MAJAZ

### High Priority (Luxury Brand)

1. **`use-styleguide-colors-only`** - CRITICAL
   - MAJAZ brand colors: Black (#111111), Gold (#D4AF37), Ivory (#FFFFF0)
   - Enforce strict adherence to luxury palette
   - Prevent off-brand color experimentation

   ```javascript
   'product-quality/use-styleguide-colors-only': ['error', {
     allowedColors: [
       'black',
       'white',
       'transparent',
       'current',
       'inherit',
       'gold',
       'ivory',
       'gray-',
       'slate-',
       'zinc-',
       'neutral-',
     ],
   }],
   ```

2. **`consistent-company-info`** - CRITICAL
   - Ensure consistent Arabic/English company name
   - Single email: support@majaz.ae (or verified domain)
   - Prevent accidental variations in branding

   ```javascript
   'product-quality/consistent-company-info': ['error', {
     companyName: 'MAJAZ',
     email: 'support@majaz.ae',
   }],
   ```

3. **`no-broken-internal-links`** - ERROR in components
   - Broken links = 404 errors = lost trust
   - Especially critical for premium service
   - Premium concierge experiences don't have dead links

4. **`no-missing-alt-text`** - ERROR
   - All product/vehicle imagery needs descriptive alt text
   - SEO essential for finding specific vehicle assessments
   - Accessibility for all users

### High Priority (RTL/Bilingual)

5. **`require-aria-label-on-icon-buttons`** - ERROR
   - Icon-only buttons in RTL layout need clear labels
   - Arabic language requires proper accessibility
   - Screen readers must work in both AR and EN

### Medium Priority (UX/Luxury)

6. **`no-form-without-submit`** - ERROR
   - Assessment request form must handle submission
   - Payment form must process correctly
   - Contact form must deliver messages

7. **`no-button-without-handler`** - ERROR
   - Every CTA button must do something
   - No fake buttons in luxury interface
   - Clear user intent on interaction

8. **`no-generic-placeholders`** - WARN
   - Replace generic text with specific, action-oriented placeholders
   - Example: "Enter vehicle auction link" vs "Enter text"
   - Shows attention to detail (luxury brand signal)

9. **`require-loading-state-on-async-button`** - WARN
   - Payment buttons, assessment requests need loading state
   - User should see feedback during processing
   - Prevents double-clicks and confusion

10. **`require-try-catch-fetch`** - WARN
    - Assessment scrapers, payment processing must handle errors
    - Graceful error messages for users
    - API failures shouldn't break the interface

---

## Parser Settings (TypeScript)

```javascript
languageOptions: {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,  // React/JSX support
    },
  },
}
```

---

## Project-Specific Quality Rules (Reelmatic)

**Payment Consistency**:
- `consistent-payment-providers`: stripe (MAJAZ could use: stripe, emirates-nbd, adib, fab)

**Company Info**:
- ReelMatic: "support@reelmatic.ai"
- MAJAZ should use: "support@majaz.ae" (UAE domain)

**Allowed Colors** (Reelmatic extended palette):
- Base: black, white, transparent
- Neutral: gray, slate, zinc, neutral
- Brand: blue, cyan, sky, purple, indigo
- Semantic: red, orange, amber, yellow, lime, green, emerald, teal, pink, rose

---

## Installation for MAJAZ

### Step 1: Copy the Plugin
```bash
cp -r reelmatic/eslint-plugin-product-quality ./eslint-plugin-majaz
# Update package.json in plugin:
# "name": "eslint-plugin-majaz"
# "description": "ESLint plugin for MAJAZ luxury brand quality"
```

### Step 2: Create MAJAZ ESLint Config
```bash
# Create eslint.config.mjs in majaz root
cat > eslint.config.mjs << 'EOF'
import tsParser from '@typescript-eslint/parser';
import productQuality from './eslint-plugin-majaz/index.js';

export default [
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      'product-quality': productQuality,
    },
    rules: {
      // Brand Colors (MAJAZ: Black, Gold, Ivory)
      'product-quality/use-styleguide-colors-only': ['error', {
        allowedColors: [
          'black', 'white', 'transparent', 'current', 'inherit',
          'gold', 'ivory', 'gray-', 'slate-', 'zinc-', 'neutral-',
        ],
      }],

      // Brand Consistency
      'product-quality/consistent-company-info': ['error', {
        companyName: 'MAJAZ',
        email: 'support@majaz.ae',
      }],
      'product-quality/consistent-payment-providers': ['error', {
        provider: 'stripe',
      }],

      // Link Validation
      'product-quality/no-broken-internal-links': 'error',

      // Accessibility (Critical for RTL)
      'product-quality/no-missing-alt-text': 'error',
      'product-quality/require-aria-label-on-icon-buttons': 'error',

      // UX Consistency
      'product-quality/no-button-without-handler': 'error',
      'product-quality/no-form-without-submit': 'error',
      'product-quality/no-generic-placeholders': 'warn',
      'product-quality/require-loading-state-on-async-button': 'warn',

      // Error Handling
      'product-quality/require-try-catch-fetch': 'warn',
      'product-quality/require-empty-state': 'warn',

      // Performance
      'product-quality/require-image-optimization': 'warn',
    },
  },
];
EOF
```

### Step 3: Install Dependencies
```bash
npm install --save-dev eslint@9 @typescript-eslint/parser typescript
npm install --save-dev eslint-config-next eslint-config-prettier prettier
```

### Step 4: Add Lint Scripts
```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "lint:report": "eslint . --format html --output-file eslint-report.html"
  }
}
```

---

## Advanced Customization for MAJAZ

### RTL-Specific Rules
Consider adding custom rules for:
- Bidirectional text handling
- Icon flip detection (arrows shouldn't point wrong direction)
- Right-to-left flex/grid layouts

### Locale-Specific Rules
```javascript
// Check for English/Arabic copy consistency
// Example: Contact form has both AR and EN versions
```

### Luxury Brand Rules
```javascript
// Ideas for custom rules:
// - no-placeholder-images (use premium photography)
// - require-loading-skeleton (premium UX feedback)
// - require-smooth-transitions (elegant animations)
// - no-generic-button-text ("Learn More" → "Get Assessment" → specific CTAs)
// - require-pricing-display (transparency on service fees)
// - require-testimonials-on-landing (luxury brand trust signals)
```

### Payment/Auction Rules
```javascript
// Ideas:
// - require-aed-currency (all prices in AED)
// - require-secure-payment-badge (trust signals)
// - no-broken-payment-links (critical for conversion)
// - require-terms-acceptance (legal compliance)
// - require-privacy-policy-link (GDPR/UAE law)
```

---

## Plugins to Install

```bash
# Core ESLint
npm install --save-dev eslint@9 @typescript-eslint/parser @typescript-eslint/eslint-plugin

# Next.js/React
npm install --save-dev eslint-config-next eslint-plugin-react eslint-plugin-react-hooks

# Code Quality
npm install --save-dev eslint-plugin-import eslint-plugin-jsx-a11y

# Formatting (pairs with prettier)
npm install --save-dev eslint-config-prettier eslint-plugin-prettier prettier

# Optional: Accessibility deeper checks
npm install --save-dev eslint-plugin-jsx-a11y

# Optional: Performance
npm install --save-dev eslint-plugin-react/hooks
```

---

## Best Practices from Reelmatic

### 1. Strict Color Enforcement
- Prevents brand dilution through consistent color palette
- Reelmatic allows Tailwind standard colors (safety)
- MAJAZ should be even stricter: black, gold, ivory only

### 2. Component-Level Rules
```javascript
overrides: [
  {
    files: ["components/**/*.tsx"],
    rules: {
      "product-quality/use-styleguide-colors-only": "error",
      "product-quality/no-broken-internal-links": "error",
    }
  }
]
```

### 3. Page-Specific Rules
```javascript
overrides: [
  {
    files: ["app/**/page.tsx"],
    rules: {
      "product-quality/require-proper-page-structure": "error",
      "product-quality/no-generic-placeholders": "error",
    }
  }
]
```

### 4. Dynamic Route Support
- Handles `[locale]` segments (critical for RTL)
- Supports route groups `(auth)`, `(marketing)`
- Prevents false positives on dynamic routes

### 5. Smart Color Checking
- Only validates actual color utilities
- Ignores sizing: `text-xs`, `text-sm`
- Ignores effects: `bg-gradient`, `bg-opacity`
- Ignores styles: `border-solid`, `border-dashed`

---

## Reelmatic ESLint Config Comparison

| Aspect | Standard | Product Quality |
|--------|----------|-----------------|
| **Base** | Next.js core | Custom + TypeScript |
| **Rules** | 4 custom | 13 custom rules |
| **Brand** | None | Strict color palette |
| **UX** | None | 6 UX consistency rules |
| **Accessibility** | Basic | Comprehensive (alt, aria-labels) |
| **Links** | None | Broken link detection |
| **Forms** | None | Submit handler required |
| **Error Handling** | None | Try-catch for fetch |
| **Performance** | None | Next.js Image only |

---

## Summary & Recommendations

**For MAJAZ Luxury Brand Implementation:**

1. **Copy** Reelmatic's `eslint-plugin-product-quality` as base
2. **Customize** color palette: Black (#111111), Gold (#D4AF37), Ivory (#FFFFF0)
3. **Update** company info: MAJAZ, support@majaz.ae
4. **Add** payment provider: Stripe or UAE-specific gateway
5. **Extend** with RTL-specific rules for Arabic support
6. **Enforce** ERROR level on brand consistency rules (zero tolerance)
7. **Configure** component overrides for stricter rules
8. **Document** in project README: MAJAZ brand compliance via ESLint

**Key Quality Improvements:**
- Broken links are caught before deployment
- Brand colors enforced automatically
- All images require alt text (accessibility + SEO)
- Forms must handle submission
- API calls must handle errors
- Loading states required for async operations
- Icon buttons accessible to screen readers

---

## Files Reference
- **Reelmatic Root**: `/Users/rentamac/Documents/repos/repos/reelmatic/`
- **Standard Config**: `eslint.config.mjs`
- **Product Config**: `eslint.config.product.mjs`
- **Plugin Code**: `eslint-plugin-product-quality/index.js`
- **Plugin Config**: `.eslintrc.product.json`
