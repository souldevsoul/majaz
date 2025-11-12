# Business Validation & ESLint Enforcement Plan

## Business Concept Validation

### 1. MAJAZ (UAE Luxury Concierge)
**Status:** ✅ Valid & Unique
- **Market:** UAE luxury vehicle buyers
- **Service:** Pre-purchase vehicle assessment + concierge membership
- **Differentiation:** High-end Amex Black Card equivalent for car ownership
- **Pricing:** 2,999 - 500,000 AED
- **Unique Value:** Golden hour Dubai aesthetic, Arabic/English bilingual

### 2. AVTOCERT (Azerbaijan Professional Certification)
**Status:** ✅ Valid & Unique
- **Market:** Azerbaijan used car buyers, commercial fleets
- **Service:** Professional vehicle inspection and certification
- **Differentiation:** Corporate fleet management, export certification
- **Pricing:** 100 - 5,000 AZN
- **Unique Value:** Azeri/Russian/English, turbo.az market integration

### 3. BAKU DRIVE LAB (Azerbaijan Performance Tuning)
**Status:** ✅ Valid & Unique
- **Market:** Azerbaijan performance car enthusiasts
- **Service:** Dyno testing, performance tuning, track preparation
- **Differentiation:** Cyberpunk aesthetic, VR simulation training
- **Pricing:** 200 - 10,000 AZN
- **Unique Value:** Blade Runner Tokyo nights aesthetic, gaming culture

### 4. EUROGRADE (European Standards Certification)
**Status:** ✅ Valid & Unique
- **Market:** European import/export, heritage vehicles
- **Service:** EU compliance certification, Nordic standards
- **Differentiation:** Scandinavian minimalism, Alpine precision
- **Pricing:** €199 - €19,999
- **Unique Value:** Multi-European standards (German, Nordic, Alpine)

### 5. SANDVAULT (UAE Ultra-Secure Storage)
**Status:** ✅ Valid & Unique
- **Market:** UAE UHNW individuals, ultra-rare hypercar collectors
- **Service:** Climate-controlled vault storage, biometric security
- **Differentiation:** Swiss bank-style vault, DNA verification
- **Pricing:** 5,000 - 150,000 AED
- **Unique Value:** Military-grade security, rotating display platforms

---

## Cross-Contamination Issues to Fix

### Potential Issues:
1. **Generic template content** - Remove "Boxcar" references
2. **Cross-project mentions** - No site should mention other brands
3. **Generic placeholder text** - Replace with brand-specific content
4. **Shared images** - Each brand needs unique imagery
5. **Generic email domains** - Each needs unique contact info

---

## ESLint Rules to Implement

### Rule 1: Brand Color Enforcement
Each site must ONLY use its brand colors:

**MAJAZ:**
```javascript
allowedColors: [
  '#111111', // Black
  '#D4AF37', // Gold
  '#FFFFF0', // Ivory
  '#0A0A0A', // Rich Black
  '#1A1A1A', // Surface
  '#FFFFFF'  // White
]
```

**AVTOCERT:**
```javascript
allowedColors: [
  '#FFFFFF', // White
  '#0078D4', // Azure Blue
  '#000000', // Black
  '#F5F5F5', // Light Grey
  '#1A1A1A'  // Dark Grey
]
```

**BAKU DRIVE LAB:**
```javascript
allowedColors: [
  '#000000', // Black
  '#00D9FF', // Cyber Blue
  '#00FFFF', // Neon Cyan
  '#0A0A0A', // Dark
  '#1A1A1A'  // Surface
]
```

**EUROGRADE:**
```javascript
allowedColors: [
  '#FFFFFF', // White
  '#003366', // Deep Navy Blue
  '#6C7A89', // Steel Grey
  '#F5F5F5', // Light Grey
  '#1A1A1A'  // Dark Grey
]
```

**SANDVAULT:**
```javascript
allowedColors: [
  '#000000', // Black
  '#D4AF37', // Warm Gold (different from MAJAZ gold)
  '#4A4A4A', // Smoke Grey
  '#0A0A0A', // Rich Black
  '#1A1A1A'  // Surface
]
```

### Rule 2: No Cross-Project Mentions
```javascript
{
  'no-cross-project-mentions': {
    forbiddenMentions: {
      majaz: ['avtocert', 'baku', 'eurograde', 'sandvault', 'boxcar'],
      avtocert: ['majaz', 'baku', 'eurograde', 'sandvault', 'boxcar'],
      bakuDriveLab: ['majaz', 'avtocert', 'eurograde', 'sandvault', 'boxcar'],
      eurograde: ['majaz', 'avtocert', 'baku', 'sandvault', 'boxcar'],
      sandvault: ['majaz', 'avtocert', 'baku', 'eurograde', 'boxcar']
    }
  }
}
```

### Rule 3: Company Info Consistency
```javascript
{
  'consistent-company-info': {
    companyName: 'MAJAZ', // Must match exactly
    domains: ['majaz.ae'],
    emails: ['info@majaz.ae', 'support@majaz.ae'],
    phones: ['+971'],
    socialHandles: ['@majazuae']
  }
}
```

### Rule 4: Brand-Specific Typography
```javascript
{
  'brand-typography': {
    majaz: {
      display: 'Playfair Display',
      body: 'Inter'
    },
    avtocert: {
      display: 'Montserrat',
      body: 'Open Sans'
    },
    bakuDriveLab: {
      display: 'Orbitron',
      body: 'Rajdhani'
    },
    eurograde: {
      display: 'Raleway',
      body: 'Lato'
    },
    sandvault: {
      display: 'Cinzel',
      body: 'Lato'
    }
  }
}
```

---

## Build Enforcement Strategy

### Step 1: Update ESLint Configs
- Add all brand color rules
- Add cross-mention detection
- Add company info validation
- Make all rules ERROR level (not WARNING)

### Step 2: Update Build Scripts
```json
{
  "scripts": {
    "build": "npm run lint && next build",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx --max-warnings 0"
  }
}
```

### Step 3: Pre-commit Hooks
```bash
#!/bin/sh
npm run lint || exit 1
npm run build || exit 1
```

---

## Content Uniqueness Validation

### Things to Check:
1. **Hero Headlines** - Must be brand-specific
2. **About Us** - Unique company story
3. **Service Descriptions** - No copy-paste between sites
4. **Team Members** - Different people or no team page
5. **Testimonials** - Brand-specific testimonials
6. **FAQ Content** - Service-specific questions
7. **Footer Links** - Brand-specific navigation
8. **Meta Descriptions** - Unique SEO content

---

## Implementation Order

1. ✅ Document business validation (this file)
2. Create enhanced ESLint plugin for each site
3. Add cross-project mention detection
4. Run builds and collect all errors
5. Fix MAJAZ errors one by one
6. Fix AVTOCERT errors one by one
7. Fix BAKU DRIVE LAB errors one by one
8. Fix EUROGRADE errors one by one
9. Fix SANDVAULT errors one by one
10. Verify all builds pass
11. Commit and push all fixes

---

## Expected Error Categories

### Color Violations
- Non-brand colors in CSS/inline styles
- RGB/RGBA variations outside tolerance
- Gradient colors not matching brand

### Cross-Contamination
- Mentions of other project names
- Shared email addresses
- Generic "Boxcar" references
- Copy-pasted content blocks

### Company Info Inconsistency
- Wrong company name
- Wrong domain/email
- Wrong phone format
- Wrong social handles

### Typography Violations
- Wrong font families
- Inconsistent font weights
- Missing brand fonts

---

## Success Criteria

✅ Each site has unique business concept
✅ Zero cross-project mentions
✅ All brand colors enforced
✅ All builds pass without errors
✅ Content is unique across sites
✅ ESLint catches all violations
✅ Pre-commit hooks prevent bad code

---

**Next Step:** Implement enhanced ESLint rules for each site
