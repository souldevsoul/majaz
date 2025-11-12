# Reelmatic ESLint Rules - MAJAZ Implementation Matrix

## Rule Implementation Priority & Mapping

### Category 1: Brand Consistency (Critical for Luxury)

| Rule | Severity | Reelmatic Config | MAJAZ Config | Business Impact |
|------|----------|------------------|--------------|-----------------|
| `use-styleguide-colors-only` | ERROR | `warn` in base | **ERROR** | Black/Gold/Ivory enforced, no off-brand colors |
| `consistent-company-info` | ERROR | `warn` in base | **ERROR** | "MAJAZ" + "support@majaz.ae" only |
| `consistent-payment-providers` | WARN | `warn` | **WARN** | Single payment gateway messaging |

**Rationale**: Luxury brands lose value through color dilution. Enforce at ERROR level.

---

### Category 2: Link & Navigation (Trust Critical)

| Rule | Severity | Reelmatic Config | MAJAZ Config | Business Impact |
|------|----------|------------------|--------------|-----------------|
| `no-broken-internal-links` | WARN/ERROR | `warn` in base | **ERROR** | No 404s before deploy, luxury expectation |

**Component-Level Override**:
```javascript
files: ["components/**/*.{ts,tsx}"],
rules: { "product-quality/no-broken-internal-links": "error" }
```

**Rationale**: Broken links to assessment pages = lost revenue. ERROR in components.

---

### Category 3: Accessibility (Legal + RTL)

| Rule | Severity | Reelmatic Config | MAJAZ Config | Business Impact |
|------|----------|------------------|--------------|-----------------|
| `no-missing-alt-text` | ERROR | `error` | **ERROR** | SEO for vehicle listings, screen readers |
| `require-aria-label-on-icon-buttons` | WARN | `warn` | **ERROR** | Arabic accessibility critical |

**RTL Note**: Icon buttons MUST have aria-labels in both AR and EN.

**Rationale**: UAE market = accessibility requirement. Luxury = inclusive.

---

### Category 4: Form & Button UX (Conversion Critical)

| Rule | Severity | Reelmatic Config | MAJAZ Config | Business Impact |
|------|----------|------------------|--------------|-----------------|
| `no-form-without-submit` | ERROR | `error` | **ERROR** | Assessment request forms must work |
| `no-button-without-handler` | WARN | `warn` | **ERROR** | All CTAs must function (no fake buttons) |
| `no-generic-placeholders` | WARN | `warn` | **WARN** | "Enter auction link" vs "Enter text" |
| `require-loading-state-on-async-button` | WARN | `warn` | **WARN** | Payment button feedback |

**Rationale**: Non-functional forms = zero conversions. Assessment requests = revenue.

---

### Category 5: Error Handling & Graceful Degradation

| Rule | Severity | Reelmatic Config | MAJAZ Config | Business Impact |
|------|----------|------------------|--------------|-----------------|
| `require-try-catch-fetch` | WARN | `warn` | **WARN** | API failures (OpenAI, Perplexity, scrapers) handled |
| `require-empty-state` | WARN | `warn` | **WARN** | "No assessments yet" message, not empty |

**Rationale**: Premium service = reliable. Users expect graceful error messages.

---

### Category 6: Performance & Modern Best Practices

| Rule | Severity | Reelmatic Config | MAJAZ Config | Business Impact |
|------|----------|------------------|--------------|-----------------|
| `require-image-optimization` | WARN | `warn` | **WARN** | Use Next.js Image for hero photos |

**Rationale**: Hero images critical for luxury brand. Must load fast.

---

## Severity Strategy for MAJAZ

### ERROR (Build-Breaking)
These violations prevent deployment:

```
1. use-styleguide-colors-only         [Brand enforcement]
2. consistent-company-info            [Brand consistency]
3. no-broken-internal-links           [User trust]
4. no-missing-alt-text                [Accessibility]
5. require-aria-label-on-icon-buttons [RTL accessibility]
6. no-form-without-submit             [Conversion]
7. no-button-without-handler          [UX clarity]
```

### WARN (PR Review)
These need fixing but don't block:

```
1. no-generic-placeholders            [UX polish]
2. require-loading-state-on-async-button [UX feedback]
3. consistent-payment-providers       [Content clarity]
4. require-try-catch-fetch            [Robustness]
5. require-empty-state                [Completeness]
6. require-image-optimization         [Performance]
```

---

## Rule Application by File Type

### Pages (app/*/page.tsx)
```javascript
{
  files: ['app/**/page.{ts,tsx}'],
  rules: {
    'product-quality/no-broken-internal-links': 'error',
    'product-quality/use-styleguide-colors-only': 'error',
    'product-quality/no-generic-placeholders': 'error',
  }
}
```

### Components (components/**/*.tsx)
```javascript
{
  files: ['components/**/*.{ts,tsx}'],
  rules: {
    'product-quality/use-styleguide-colors-only': 'error',
    'product-quality/no-broken-internal-links': 'error',
    'product-quality/no-missing-alt-text': 'error',
    'product-quality/require-aria-label-on-icon-buttons': 'error',
  }
}
```

### API Routes (app/api/**/route.ts)
```javascript
{
  files: ['app/api/**/route.{ts,tsx}'],
  rules: {
    'product-quality/require-try-catch-fetch': 'error',
  }
}
```

---

## Rule Configuration Details

### 1. use-styleguide-colors-only
```javascript
'product-quality/use-styleguide-colors-only': ['error', {
  allowedColors: [
    'black',          // Primary
    'white',          // Backgrounds
    'gold',           // Accent
    'ivory',          // Accent
    'transparent',    // Special
    'current',        // Inherited
    'inherit',        // Inherited
    'gray-',          // Neutral support
    'slate-',         // Neutral support
    'zinc-',          // Neutral support
    'neutral-',       // Neutral support
  ],
}],
```

**Smart Features**:
- Only checks actual color utilities (bg-*, text-*, border-*)
- Ignores non-color utilities: text-xs, text-lg, bg-gradient, bg-opacity
- Catches arbitrary values: bg-[#FF0000], bg-[rgb(...)]

---

### 2. consistent-company-info
```javascript
'product-quality/consistent-company-info': ['error', {
  companyName: 'MAJAZ',
  email: 'support@majaz.ae',
}],
```

**Coverage**:
- Detects any email address in strings/comments
- Flags mismatches (e.g., support@other.com)
- Ignores example.com domains

---

### 3. consistent-payment-providers
```javascript
'product-quality/consistent-payment-providers': ['warn', {
  provider: 'stripe',  // Could be: stripe, paypal, ecommpay, square
}],
```

**Coverage**:
- Finds all provider mentions in code
- Case-insensitive detection
- Encourages consistent messaging

---

### 4. no-broken-internal-links
```javascript
'product-quality/no-broken-internal-links': 'error',
```

**Smart Features**:
- Checks both `/app` and `/src/app` directories
- Handles dynamic routes: `[locale]`, `[id]`
- Handles route groups: `(auth)`, `(marketing)`
- Ignores query strings and hash fragments
- Checks both .tsx and .jsx extensions

**Examples Caught**:
```javascript
// WRONG - no route exists
<Link href="/assessments/404page">Assessment</Link>

// RIGHT - route exists at app/assessments/page.tsx
<Link href="/assessments">My Assessments</Link>

// RIGHT - dynamic route at app/[locale]/assessments/[id]/page.tsx
<Link href={`/${locale}/assessments/${id}`}>View</Link>
```

---

### 5. no-missing-alt-text
```javascript
'product-quality/no-missing-alt-text': 'error',
```

**Coverage**:
- Both `<img>` and Next.js `<Image>`
- Requires alt attribute (can be empty for decorative: `alt=""`)

**Examples**:
```javascript
// WRONG
<Image src={car} alt="" />  // Missing vehicle description

// RIGHT
<Image 
  src={car} 
  alt="Luxury white Range Rover on marble forecourt in Dubai" 
/>
```

---

### 6. require-aria-label-on-icon-buttons
```javascript
'product-quality/require-aria-label-on-icon-buttons': 'error',
```

**Smart Detection**:
- Identifies icon patterns: Icon, SVG, Ri*, Lucide, Menu, X, Close, Search, Arrow
- Exempts buttons with visible text
- Requires aria-label or aria-labelledby

**Examples**:
```javascript
// WRONG - icon button, no label
<Button>
  <ChevronDown />
</Button>

// RIGHT - icon button with label
<Button aria-label="View more options">
  <ChevronDown />
</Button>

// RIGHT - has visible text
<Button>
  Download <DownloadIcon />
</Button>
```

---

### 7. no-form-without-submit
```javascript
'product-quality/no-form-without-submit': 'error',
```

**Coverage**:
- Requires either onSubmit handler or action attribute
- Catches incomplete form implementations

**Examples**:
```javascript
// WRONG
<form>
  <input name="email" />
  <button>Submit</button>
</form>

// RIGHT - with onSubmit
<form onSubmit={handleSubmit}>
  <input name="email" />
  <button type="submit">Submit</button>
</form>

// RIGHT - with Server Action
<form action={submitAssessment}>
  <input name="email" />
  <button type="submit">Submit</button>
</form>
```

---

### 8. no-button-without-handler
```javascript
'product-quality/no-button-without-handler': 'error',
```

**Coverage**:
- Requires onClick, type, or asChild attribute
- Prevents disabled/non-functional buttons

**Examples**:
```javascript
// WRONG
<button>Request Assessment</button>

// RIGHT - with onClick
<button onClick={requestAssessment}>
  Request Assessment
</button>

// RIGHT - with type
<button type="submit">Request Assessment</button>

// RIGHT - as Link (asChild pattern)
<Button asChild>
  <Link href="/request">Request Assessment</Link>
</Button>
```

---

### 9. no-generic-placeholders
```javascript
'product-quality/no-generic-placeholders': ['warn', {
  rejects: [
    'click here',
    'click me',
    'enter text',
    'type here',
    'input text',
    'enter value',
  ]
}],
```

**Purpose**: Luxury brand requires specific, helpful guidance.

**Examples**:
```javascript
// WRONG - generic
<input placeholder="Enter text" />

// RIGHT - specific
<input placeholder="Enter auction link or vehicle ID" />

// WRONG - generic
<button>Click here</button>

// RIGHT - action-oriented
<button>Request Assessment</button>
```

---

### 10. require-loading-state-on-async-button
```javascript
'product-quality/require-loading-state-on-async-button': 'warn',
```

**Detection**:
- Finds async/await, fetch(), .then() patterns
- Checks for loading, isLoading, or disabled props

**Examples**:
```javascript
// WRONG - no feedback
<button onClick={async () => {
  await requestAssessment();
}}>
  Request Assessment
</button>

// RIGHT - shows loading
<button 
  onClick={async () => {
    await requestAssessment();
  }}
  disabled={isLoading}
>
  {isLoading ? 'Processing...' : 'Request Assessment'}
</button>
```

---

### 11. require-try-catch-fetch
```javascript
'product-quality/require-try-catch-fetch': 'warn',
```

**Coverage**:
- Finds fetch() calls
- Requires try-catch wrapper
- Critical for API calls to OpenAI, Perplexity, auction scrapers

**Examples**:
```javascript
// WRONG - unhandled error
const assessment = await fetch('/api/assess');

// RIGHT - error handling
try {
  const assessment = await fetch('/api/assess');
  if (!assessment.ok) throw new Error('Assessment failed');
} catch (error) {
  console.error('Assessment error:', error);
  // Show error to user
}
```

---

### 12. require-empty-state
```javascript
'product-quality/require-empty-state': 'warn',
```

**Detection**:
- Finds .map() calls
- Requires length/isEmpty/hasData check

**Examples**:
```javascript
// WRONG - empty array renders nothing
{assessments.map(a => (
  <AssessmentCard key={a.id} assessment={a} />
))}

// RIGHT - shows message when empty
{assessments.length > 0 ? (
  assessments.map(a => (
    <AssessmentCard key={a.id} assessment={a} />
  ))
) : (
  <EmptyState message="No assessments yet. Start your first assessment!" />
)}
```

---

### 13. require-image-optimization
```javascript
'product-quality/require-image-optimization': 'warn',
```

**Coverage**:
- Warns about `<img>` tags in app/pages/src directories
- Recommends Next.js `<Image>` component

**Examples**:
```javascript
// WRONG - unoptimized
<img src={heroImage} alt="Luxury car" />

// RIGHT - Next.js optimized
<Image 
  src={heroImage} 
  alt="Luxury car" 
  width={1920}
  height={1080}
  priority
/>
```

---

## Implementation Checklist for MAJAZ

### Phase 1: Setup (Day 1)
- [ ] Copy `eslint-plugin-product-quality` from Reelmatic
- [ ] Rename to `eslint-plugin-majaz`
- [ ] Update package.json (name, description)
- [ ] Create `eslint.config.mjs` with MAJAZ settings
- [ ] Install ESLint 9 and dependencies
- [ ] Add npm scripts: lint, lint:fix

### Phase 2: Testing (Day 2)
- [ ] Run `npm run lint` on existing codebase
- [ ] Document violations by type
- [ ] Prioritize fixes (colors > forms > polish)
- [ ] Fix all ERROR violations
- [ ] Fix high-value WARN violations

### Phase 3: Integration (Day 3)
- [ ] Add to package.json: `"pre-commit": "npm run lint:fix"`
- [ ] Add to CI/CD pipeline
- [ ] Update team guidelines
- [ ] Create ESLINT_RULES_GUIDE.md for team

### Phase 4: Extension (Future)
- [ ] Add RTL-specific rules
- [ ] Add AED currency validation rule
- [ ] Add bilingual content rules
- [ ] Add vehicle detail requirements
- [ ] Add privacy/terms link rules

---

## Success Metrics

### Immediate (Week 1)
- All ERROR violations fixed
- 100% code compliance with brand colors
- All forms have onSubmit handlers
- All images have alt text

### Short-term (Month 1)
- 90% WARN violations fixed
- All async buttons show loading states
- All lists handle empty states
- All broken links prevented

### Long-term (Quarter 1)
- ESLint rules enforced in CI/CD
- 0 errors on every PR
- RTL-specific rules added
- Team trained on all rules

---

## References

- **Full Analysis**: `/Users/rentamac/Documents/repos/repos/carbox/majaz/REELMATIC_ESLINT_ANALYSIS.md`
- **Quick Reference**: `/Users/rentamac/Documents/repos/repos/carbox/majaz/ESLINT_QUICK_REFERENCE.md`
- **Executive Summary**: `/Users/rentamac/Documents/repos/repos/carbox/majaz/ESLINT_ANALYSIS_SUMMARY.txt`
- **Reelmatic Source**: `/Users/rentamac/Documents/repos/repos/reelmatic/eslint-plugin-product-quality/index.js`

