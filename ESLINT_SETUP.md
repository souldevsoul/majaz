# ESLint Setup for MAJAZ - Product Quality Rules

This document describes the custom ESLint configuration for MAJAZ, a luxury vehicle assessment service in the UAE. The setup includes 13 custom product quality rules specifically designed to maintain brand integrity and code quality.

## Table of Contents
- [Overview](#overview)
- [Installation](#installation)
- [Running ESLint](#running-eslint)
- [Custom Product Quality Rules](#custom-product-quality-rules)
- [Common Issues & Fixes](#common-issues--fixes)
- [Pre-commit Hook Setup](#pre-commit-hook-setup)
- [Configuration Reference](#configuration-reference)

## Overview

MAJAZ uses a comprehensive ESLint setup that includes:
- **13 Custom Product Quality Rules** - Brand-specific enforcement
- **TypeScript Support** - Full TS/TSX linting
- **Next.js Plugin** - Next.js best practices
- **React Hooks Rules** - Proper hooks usage
- **Accessibility Plugin (jsx-a11y)** - WCAG compliance
- **Code Quality Rules** - Best practices and patterns

### Initial Lint Report Summary

**Total Issues:** 3,120 (as of initial setup)
- **Errors:** 1,479
- **Warnings:** 1,641

### Top 5 Most Common Issues

1. **no-unused-vars (686)** - Unused imports and variables
2. **product-quality/use-styleguide-colors-only (676)** - Non-brand colors used
3. **jsx-a11y/anchor-is-valid (348)** - Invalid anchor tags
4. **product-quality/no-missing-alt-text (285)** - Missing image alt text
5. **product-quality/consistent-company-info (239)** - Inconsistent brand naming

## Installation

Dependencies are already installed via package.json:

```bash
npm install
```

Key packages:
- `eslint@^8.57.0`
- `@typescript-eslint/eslint-plugin@^7.0.0`
- `@typescript-eslint/parser@^7.0.0`
- `@next/eslint-plugin-next@^14.2.8`
- `eslint-plugin-jsx-a11y@^6.8.0`
- `eslint-plugin-react-hooks@^4.6.0`

## Running ESLint

### Available Scripts

```bash
# Check all files (allows up to 50 warnings)
npm run lint

# Auto-fix issues where possible
npm run lint:fix

# Strict mode - zero warnings allowed (CI/CD)
npm run lint:strict
```

### Checking Specific Files

```bash
# Single file
npx eslint app/[locale]/page.tsx

# Directory
npx eslint app/components/

# Pattern
npx eslint "**/*.tsx"
```

## Custom Product Quality Rules

All 13 custom rules are defined in `eslint-plugin-product-quality/index.js`

### 1. use-styleguide-colors-only (ERROR)

**Purpose:** Enforce MAJAZ brand colors only

**Allowed Colors:**
- `#111111` - Primary Black
- `#D4AF37` - Secondary Gold
- `#FFFFF0` - Accent Ivory
- `#0A0A0A` - Background Rich Black
- `#1A1A1A` - Surface Dark Grey
- `rgba(26, 26, 26, 0.8)` - Glass morphism background
- `rgba(212, 175, 55, 0.2)` - Gold border
- Plus `transparent`, `currentColor`, `inherit`

**Example Violation:**
```jsx
// BAD
<div style={{ color: '#3B82F6' }}>Blue text</div>
<div style={{ background: '#EF4444' }}>Red background</div>

// GOOD
<div style={{ color: '#D4AF37' }}>Gold text</div>
<div style={{ background: '#1A1A1A' }}>Dark surface</div>
```

**How to Fix:**
- Replace all colors with MAJAZ brand palette
- Use CSS variables: `var(--primary)`, `var(--gold)`, `var(--ivory)`
- Check design system in CLAUDE.md

---

### 2. consistent-company-info (ERROR)

**Purpose:** Enforce consistent MAJAZ branding

**Valid Values:**
- Company name: `MAJAZ` (English) or `مجاز` (Arabic)
- Email: `support@majaz.ae`
- Phone: `+971` format

**Example Violation:**
```jsx
// BAD
<p>Contact Majaz for more info</p>
<a href="mailto:info@majaz.ae">Email us</a>
<p>Call us: +1-555-1234</p>

// GOOD
<p>Contact MAJAZ for more info</p>
<a href="mailto:support@majaz.ae">Email us</a>
<p>Call us: +971 XX XXX XXXX</p>
```

**Note:** CSS variable names like `--majaz-gold` trigger false positives. This is acceptable for variable naming.

---

### 3. no-broken-internal-links (WARNING)

**Purpose:** Verify internal links exist in routing structure

**Known Routes:**
- `/en/*` and `/ar/*` localized routes
- `/en/contact`, `/ar/contact`
- `/en/about`, `/ar/about`
- `/en/pricing`, `/ar/pricing`
- `/en/dashboard`, `/ar/dashboard`
- etc.

**Example Violation:**
```jsx
// BAD
<Link href="/en/non-existent-page">Link</Link>

// GOOD
<Link href="/en/contact">Contact Us</Link>
```

**How to Fix:**
- Verify route exists in `app/[locale]/` directory
- Check for typos in route names
- Update known routes list if adding new pages

---

### 4. no-missing-alt-text (ERROR)

**Purpose:** All images must have alt text (accessibility + SEO)

**Example Violation:**
```jsx
// BAD
<img src="/car.jpg" />
<Image src="/logo.png" width={100} height={100} />

// GOOD
<img src="/car.jpg" alt="Luxury SUV on marble forecourt" />
<Image
  src="/logo.png"
  width={100}
  height={100}
  alt="MAJAZ luxury vehicle assessment logo"
/>

// Decorative images (use sparingly)
<img src="/pattern.svg" alt="" role="presentation" />
```

**How to Fix:**
- Add descriptive alt text to every image
- For decorative images, use `alt=""` with `role="presentation"`
- Alt text should describe the image content, not just say "image"

---

### 5. require-aria-label-on-icon-buttons (ERROR)

**Purpose:** Icon buttons need labels for screen readers

**Example Violation:**
```jsx
// BAD
<button onClick={handleDelete}>
  <TrashIcon />
</button>

// GOOD
<button onClick={handleDelete} aria-label="Delete request">
  <TrashIcon />
</button>

// Alternative: visible text
<button onClick={handleDelete}>
  <TrashIcon />
  <span>Delete</span>
</button>
```

**How to Fix:**
- Add `aria-label` to icon-only buttons
- Or include visible text next to icon
- Describe the action, not the icon ("Delete request" not "Trash icon")

---

### 6. no-form-without-submit (ERROR)

**Purpose:** All forms must handle submission

**Example Violation:**
```jsx
// BAD
<form>
  <input type="text" />
  <button>Submit</button>
</form>

// GOOD
<form onSubmit={handleSubmit}>
  <input type="text" />
  <button type="submit">Submit</button>
</form>
```

**How to Fix:**
- Add `onSubmit` handler to every `<form>`
- Prevent default: `e.preventDefault()`
- Show loading state during submission

---

### 7. no-button-without-handler (WARNING)

**Purpose:** Buttons must have interaction logic

**Example Violation:**
```jsx
// BAD
<button>Click me</button>

// GOOD
<button onClick={handleClick}>Click me</button>
<button type="submit">Submit form</button>
<Link href="/contact">
  <button>Contact us</button>
</Link>
```

**How to Fix:**
- Add `onClick` handler
- Or set `type="submit"` for form buttons
- Or use link component instead

---

### 8. no-generic-placeholders (WARNING)

**Purpose:** Avoid generic placeholder text

**Forbidden Patterns:**
- "Lorem ipsum"
- "TODO"
- "FIXME"
- "placeholder text"
- "sample text"
- "test test"

**Example Violation:**
```jsx
// BAD
<p>Lorem ipsum dolor sit amet...</p>
<h1>TODO: Add title here</h1>

// GOOD
<p>Premium vehicle assessment for discerning UAE buyers</p>
<h1>Luxury Pre-Purchase Vehicle Inspection</h1>
```

**How to Fix:**
- Replace with actual content
- For Arabic: Get professional translation
- Use MAJAZ brand voice (see CLAUDE.md)

---

### 9. require-loading-state-on-async-button (WARNING)

**Purpose:** Async buttons should show loading feedback

**Example Violation:**
```jsx
// BAD
<button onClick={async () => {
  await fetchData();
}}>
  Load Data
</button>

// GOOD
const [loading, setLoading] = useState(false);

<button
  onClick={async () => {
    setLoading(true);
    await fetchData();
    setLoading(false);
  }}
  disabled={loading}
>
  {loading ? 'Loading...' : 'Load Data'}
</button>
```

**How to Fix:**
- Add loading state: `useState(false)`
- Disable button during loading
- Show loading text or spinner
- Re-enable after completion/error

---

### 10. require-try-catch-fetch (ERROR)

**Purpose:** All API calls must handle errors

**Example Violation:**
```jsx
// BAD
const data = await fetch('/api/data');
const json = await data.json();

// GOOD
try {
  const data = await fetch('/api/data');
  if (!data.ok) throw new Error('Fetch failed');
  const json = await data.json();
} catch (error) {
  console.error('Error fetching data:', error);
  toast.error('Failed to load data');
}
```

**How to Fix:**
- Wrap fetch/axios calls in try-catch
- Check response status: `if (!response.ok)`
- Show user-friendly error messages
- Log errors for debugging

---

### 11. require-image-optimization (WARNING)

**Purpose:** Use Next.js Image component for optimization

**Example Violation:**
```jsx
// BAD
<img src="/car.jpg" alt="Luxury car" />

// GOOD
import Image from 'next/image';

<Image
  src="/car.jpg"
  alt="Luxury car"
  width={800}
  height={600}
  priority // for above-fold images
/>
```

**How to Fix:**
- Replace `<img>` with Next.js `<Image>`
- Specify width and height
- Use `priority` for above-fold images
- Use `quality={90}` for high-quality brand images

---

### 12. require-empty-state (WARNING)

**Purpose:** Lists should handle empty data gracefully

**Example Violation:**
```jsx
// BAD
{requests.map(request => (
  <RequestCard key={request.id} {...request} />
))}

// GOOD
{requests.length === 0 ? (
  <EmptyState
    title="No requests yet"
    message="Start by creating your first assessment request"
    action={<Button href="/requests/new">New Request</Button>}
  />
) : (
  requests.map(request => (
    <RequestCard key={request.id} {...request} />
  ))
)}
```

**How to Fix:**
- Check array length before mapping
- Show helpful empty state component
- Include call-to-action button
- Use MAJAZ luxury styling

---

### 13. consistent-payment-providers (ERROR)

**Purpose:** Use only Stripe for payments (MAJAZ standard)

**Forbidden Providers:**
- PayPal
- Square
- Braintree
- Authorize.net
- Paddle

**Example Violation:**
```jsx
// BAD
import { PayPalButton } from 'paypal-sdk';

// GOOD
import { loadStripe } from '@stripe/stripe-js';
```

**How to Fix:**
- Use Stripe exclusively
- Remove other payment provider code
- Update documentation to reference Stripe only

---

## Common Issues & Fixes

### Issue: CSS Variable Names Triggering consistent-company-info

**Problem:**
```jsx
style={{ color: 'var(--majaz-gold)' }} // Triggers rule
```

**Solution:**
This is a false positive for CSS variables. It's acceptable to have `--majaz-*` variable names. You can:
1. Ignore specific line: `// eslint-disable-next-line product-quality/consistent-company-info`
2. Or update rule to be less strict (in plugin)

### Issue: setTimeout is not defined

**Problem:**
```jsx
setTimeout(() => {}, 1000); // 'setTimeout' is not defined
```

**Solution:**
Add to languageOptions.globals in eslint.config.mjs:
```js
globals: {
  setTimeout: 'readonly',
  setInterval: 'readonly',
  clearTimeout: 'readonly',
  clearInterval: 'readonly',
}
```

### Issue: Too Many Unused Vars

**Problem:**
```jsx
import { Header, Footer } from './components'; // Both unused
```

**Solution:**
```bash
# Auto-fix removes unused imports
npm run lint:fix

# Or prefix with underscore if intentionally unused
import { Header as _Header } from './components';
```

### Issue: Anchor Tag Warnings

**Problem:**
```jsx
<a href="#">Link</a> // jsx-a11y/anchor-is-valid
```

**Solution:**
```jsx
// Use Link component
import Link from 'next/link';
<Link href="/contact">Contact</Link>

// Or use button for non-navigation
<button onClick={handleClick}>Open Modal</button>
```

## Pre-commit Hook Setup

### Using Husky + lint-staged

1. **Install packages:**
```bash
npm install --save-dev husky lint-staged
```

2. **Initialize Husky:**
```bash
npx husky init
```

3. **Create pre-commit hook:**
```bash
echo "npx lint-staged" > .husky/pre-commit
```

4. **Add to package.json:**
```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "git add"
    ]
  }
}
```

Now ESLint will run automatically on staged files before each commit.

### Manual Pre-commit Check

```bash
# Before committing, run:
npm run lint

# Fix auto-fixable issues:
npm run lint:fix

# Verify zero warnings:
npm run lint:strict
```

## Configuration Reference

### File Structure

```
majaz/
├── eslint-plugin-product-quality/
│   └── index.js                    # 13 custom rules
├── eslint.config.mjs               # Flat config (ESLint 8)
├── .eslintignore                   # Ignored files/dirs
├── package.json                    # Dependencies + scripts
└── ESLINT_SETUP.md                 # This file
```

### ESLint Scripts (package.json)

```json
{
  "scripts": {
    "lint": "eslint . --max-warnings 50",
    "lint:fix": "eslint . --fix",
    "lint:strict": "eslint . --max-warnings 0"
  }
}
```

### Rule Severity Levels

- **error** - Must fix (breaks build)
- **warn** - Should fix (doesn't break build)
- **off** - Disabled

### Disabling Rules

```jsx
// Disable for one line
// eslint-disable-next-line product-quality/use-styleguide-colors-only
<div style={{ color: '#123456' }}>Special case</div>

// Disable for entire file (use sparingly!)
/* eslint-disable product-quality/use-styleguide-colors-only */
```

### Modifying Rules

Edit `eslint.config.mjs`:

```js
rules: {
  // Change severity
  'product-quality/no-generic-placeholders': 'off',

  // Customize options
  'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
}
```

### Adding New Rules

1. Edit `eslint-plugin-product-quality/index.js`
2. Add rule to `rules` object
3. Implement `create()` function with AST traversal
4. Add to `eslint.config.mjs` rules section
5. Document in this file

### VS Code Integration

Install ESLint extension and add to `.vscode/settings.json`:

```json
{
  "eslint.enable": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Roadmap

### Phase 1 - Fix Critical Errors (Priority)
- [ ] Fix 676 color violations → use brand palette
- [ ] Add 285 missing alt texts → improve accessibility
- [ ] Fix 85 icon button aria-labels → screen reader support

### Phase 2 - Fix Warnings
- [ ] Remove 686 unused imports/vars
- [ ] Fix 348 invalid anchors → use Link or button
- [ ] Add 177 empty states → better UX

### Phase 3 - Code Quality
- [ ] Review 163 label associations
- [ ] Add keyboard handlers where needed
- [ ] Improve form submissions

### Phase 4 - Strict Mode
- [ ] Achieve zero warnings
- [ ] Enable `lint:strict` in CI/CD
- [ ] Set up pre-commit hooks

## Getting Help

### Resources
- ESLint Docs: https://eslint.org/docs/latest/
- Next.js ESLint: https://nextjs.org/docs/app/building-your-application/configuring/eslint
- jsx-a11y: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
- MAJAZ Brand Guide: See CLAUDE.md

### Common Commands

```bash
# Get help
npx eslint --help

# List all rules
npx eslint --print-config eslint.config.mjs

# Check version
npx eslint --version

# Debug config
npx eslint --debug app/page.tsx
```

### Troubleshooting

**Problem:** ESLint not finding config
**Solution:** Ensure `eslint.config.mjs` is in project root

**Problem:** TypeScript parsing errors
**Solution:** Check `tsconfig.json` exists and is valid

**Problem:** Too many errors to fix
**Solution:**
```bash
# Fix auto-fixable first
npm run lint:fix

# Then tackle remaining by priority
# 1. Errors > Warnings
# 2. Product quality > Other rules
# 3. One file at a time
```

---

## Summary

MAJAZ ESLint setup provides comprehensive code quality enforcement with:
- 13 custom rules for brand integrity
- TypeScript/React/Next.js best practices
- Accessibility compliance (WCAG)
- 3,120 initial issues identified for improvement

Run `npm run lint` to check your code, and `npm run lint:fix` to auto-fix issues.

For questions about brand guidelines, see CLAUDE.md.
For technical ESLint questions, see official docs or this file.

**Remember:** These rules help maintain MAJAZ's luxury brand identity and deliver a premium user experience to UAE customers.
