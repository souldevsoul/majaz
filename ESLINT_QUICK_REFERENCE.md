# MAJAZ ESLint Quick Reference Guide

## At a Glance

**Reelmatic ESLint**: Modern, strict, luxury-focused quality checking
- **Version**: ESLint 9 (flat config)
- **TypeScript**: Yes
- **Custom Rules**: 13 product quality rules
- **Best For**: Premium brands needing brand consistency + accessibility

---

## The 13 Custom Rules (Product Quality Plugin)

### 1. Link Validation
```
no-broken-internal-links [WARN/ERROR]
- Checks: All href="/..." point to existing Next.js pages
- Smart: Handles [locale], (auth), (marketing) route patterns
- Impact: Prevents 404 errors before deployment
```

### 2. Brand Colors
```
use-styleguide-colors-only [WARN/ERROR]
- Checks: className colors match approved palette
- Smart: Ignores non-color utilities (text-xs, bg-gradient)
- Impact: Enforces black/gold/ivory palette automatically
```

### 3. Company Info
```
consistent-company-info [WARN]
- Checks: All emails and company names are consistent
- Config: companyName, email
- Impact: Prevents accidental brand variations
```

### 4. Payment Provider
```
consistent-payment-providers [WARN]
- Checks: Only one payment provider mentioned (stripe, paypal, etc)
- Config: provider: "stripe"
- Impact: Clear payment messaging
```

### 5. Button Handlers
```
no-button-without-handler [WARN/ERROR]
- Checks: <button> has onClick or type attribute
- Impact: No fake, non-interactive buttons
```

### 6. Form Submission
```
no-form-without-submit [ERROR]
- Checks: <form> has onSubmit handler or action
- Impact: Forms actually submit data
```

### 7. Image Alt Text
```
no-missing-alt-text [ERROR]
- Checks: <img> and <Image> have alt attribute
- Impact: Accessibility + SEO
```

### 8. Placeholder Text
```
no-generic-placeholders [WARN]
- Rejects: "click here", "enter text", "type here"
- Impact: Specific, clear prompts for users
```

### 9. Async Button Loading
```
require-loading-state-on-async-button [WARN]
- Checks: Async buttons show loading/disabled state
- Impact: Users see feedback during API calls
```

### 10. Icon Button Labels
```
require-aria-label-on-icon-buttons [WARN/ERROR]
- Checks: Icon-only buttons have aria-label
- Impact: Screen reader accessibility
```

### 11. Error Handling
```
require-try-catch-fetch [WARN]
- Checks: fetch() calls wrapped in try-catch
- Impact: Graceful error handling
```

### 12. Empty States
```
require-empty-state [WARN]
- Checks: .map() wrapped in length/isEmpty check
- Impact: Don't show empty lists without message
```

### 13. Image Optimization
```
require-image-optimization [WARN]
- Checks: Use Next.js <Image> not <img>
- Impact: Automatic optimization, faster pages
```

---

## MAJAZ Configuration Template

```javascript
// eslint.config.mjs
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
    plugins: { 'product-quality': productQuality },
    rules: {
      // BRAND (Strict)
      'product-quality/use-styleguide-colors-only': ['error', {
        allowedColors: [
          'black', 'white', 'gold', 'ivory',  // MAJAZ palette
          'gray-', 'slate-', 'zinc-', 'neutral-',  // Neutrals
        ],
      }],
      'product-quality/consistent-company-info': ['error', {
        companyName: 'MAJAZ',
        email: 'support@majaz.ae',
      }],

      // ACCESSIBILITY (Error)
      'product-quality/no-missing-alt-text': 'error',
      'product-quality/require-aria-label-on-icon-buttons': 'error',

      // LINKS (Error in components)
      'product-quality/no-broken-internal-links': 'error',

      // FORMS & BUTTONS (Error)
      'product-quality/no-form-without-submit': 'error',
      'product-quality/no-button-without-handler': 'error',

      // UX (Warn)
      'product-quality/no-generic-placeholders': 'warn',
      'product-quality/require-loading-state-on-async-button': 'warn',
      'product-quality/consistent-payment-providers': 'warn',

      // QUALITY (Warn)
      'product-quality/require-try-catch-fetch': 'warn',
      'product-quality/require-empty-state': 'warn',
      'product-quality/require-image-optimization': 'warn',
    },
  },
];
```

---

## Severity Levels for MAJAZ

### ERROR (Zero Tolerance)
- Brand colors only (use-styleguide-colors-only)
- Company info consistent (consistent-company-info)
- Broken links (no-broken-internal-links)
- Form submission works (no-form-without-submit)
- Image alt text (no-missing-alt-text)
- Icon buttons labeled (require-aria-label-on-icon-buttons)
- Buttons have handlers (no-button-without-handler)

### WARN (Recommended)
- Generic placeholders (improve them)
- Async loading states (better UX)
- Error handling on fetch (don't break)
- Empty states (show messages)
- Next.js Image optimization (performance)

---

## Common Issues & Fixes

### "Unauthorized color 'blue-500'"
```jsx
// WRONG: blue-500 not in palette
<div className="bg-blue-500">Report</div>

// RIGHT: Use gold/black/ivory only
<div className="bg-gold-500">Report</div>
```

### "Button has no onClick handler"
```jsx
// WRONG: No interaction defined
<button>Get Assessment</button>

// RIGHT: Add handler or type
<button onClick={requestAssessment}>Get Assessment</button>
<button type="submit">Get Assessment</button>
```

### "Image missing alt attribute"
```jsx
// WRONG: No alt text
<Image src={car} width={800} height={600} />

// RIGHT: Descriptive alt
<Image
  src={car}
  width={800}
  height={600}
  alt="Luxury SUV on marble forecourt in Dubai golden hour"
/>
```

### "Form has no onSubmit handler"
```jsx
// WRONG: Form doesn't submit
<form>
  <input name="email" />
  <button>Submit</button>
</form>

// RIGHT: Add onSubmit or action
<form onSubmit={handleSubmit}>
  <input name="email" />
  <button type="submit">Submit</button>
</form>
```

### "Async button missing loading state"
```jsx
// WRONG: No feedback during loading
<button onClick={async () => {
  await requestAssessment();
}}>
  Request Assessment
</button>

// RIGHT: Show loading state
<button
  onClick={async () => {
    await requestAssessment();
  }}
  disabled={isLoading}
>
  {isLoading ? 'Processing...' : 'Request Assessment'}
</button>
```

### "Email doesn't match configured email"
```jsx
// WRONG: Different email
<a href="mailto:contact@other.com">Contact</a>

// RIGHT: Use configured email
<a href="mailto:support@majaz.ae">Contact</a>
```

---

## Installation Steps

```bash
# 1. Copy plugin from Reelmatic
cp -r ~/repos/reelmatic/eslint-plugin-product-quality ./eslint-plugin-majaz

# 2. Update plugin package.json
# name: "eslint-plugin-majaz"
# description: "MAJAZ luxury brand ESLint plugin"

# 3. Create eslint.config.mjs (use template above)

# 4. Install dependencies
npm install --save-dev eslint@9 @typescript-eslint/parser

# 5. Add to package.json scripts
# "lint": "eslint .",
# "lint:fix": "eslint . --fix"

# 6. Run!
npm run lint
```

---

## Testing the Config

```bash
# Check entire project
npm run lint

# Fix automatically (colors, formatting)
npm run lint:fix

# Check specific file
npx eslint app/page.tsx

# Show rules for a file
npx eslint app/page.tsx --debug
```

---

## For RTL (Arabic) Support

Consider adding custom rules:
```javascript
// Future: 'require-rtl-support' - check flex-row-reverse, text-right
// Future: 'no-icon-flip-needed' - warn about ltr-only icons in RTL
// Future: 'require-bidirectional-testing' - check both AR and EN
```

---

## Next.js Integration

MAJAZ should inherit these configs:
```javascript
// In eslint.config.mjs
import nextConfig from 'eslint-config-next';

// And override with product quality rules
export default [
  ...nextConfig,
  {
    rules: {
      'product-quality/use-styleguide-colors-only': 'error',
      // ... rest of MAJAZ rules
    }
  }
];
```

---

## Key Takeaways

1. **Copy the plugin** - Reelmatic's `eslint-plugin-product-quality` is production-ready
2. **Customize for MAJAZ** - Update colors, company info, locale
3. **Strict on brand** - ERROR on color palette, links, forms
4. **Helpful on UX** - WARN on placeholders, loading states, image optimization
5. **Accessibility first** - ERROR on alt text, aria labels
6. **Automate enforcement** - Rules run on every lint, every PR can enforce
7. **RTL-ready** - Plugin structure supports custom RTL rules later

---

## Resources

- Full Analysis: `/Users/rentamac/Documents/repos/repos/carbox/majaz/REELMATIC_ESLINT_ANALYSIS.md`
- Reelmatic Source: `/Users/rentamac/Documents/repos/repos/reelmatic/`
- ESLint Docs: https://eslint.org/docs/latest/use/configure/configuration-files
- Next.js ESLint: https://nextjs.org/docs/app/building-your-application/configuring/eslint
