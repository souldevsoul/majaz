# MAJAZ Brand Image Generation

## Quick Start

### 1. Get Replicate API Token

1. Visit https://replicate.com/account/api-tokens
2. Sign up/Login
3. Create a new API token
4. Copy the token (starts with `r8_...`)

### 2. Add Token to .env

Open `.env` file and update:
```
REPLICATE_API_TOKEN="r8_your_actual_token_here"
```

### 3. Run Image Generation

```bash
node scripts/generate-brand-images.js
```

This will generate:
- `hero-majaz-dubai.jpg` - Main hero image (1920x1080)
- `landing-banner-majaz.jpg` - Landing banner (1920x400)
- `report-card-luxury-suv.jpg` - Report card (1200x800)
- `about-section-team.jpg` - About/team background (1920x1080)
- `service-inspection-car.jpg` - Inspection service image (1200x800)

## Images Generated

All images follow MAJAZ brand guidelines:
- **Color Palette**: Black (#111111), Gold (#D4AF37), Ivory (#FFFFF0)
- **Aesthetic**: Golden hour Dubai, luxury concierge
- **Style**: Medium format photography (Phase One IQ4 quality)
- **Subjects**: Luxury SUVs, marble surfaces, premium environments
- **No**: Logos, license plates, people, text overlays

## Cost Estimate

- Each image costs approximately $0.02-0.05 on Replicate
- Total for 5 images: ~$0.10-0.25

## Troubleshooting

### "REPLICATE_API_TOKEN not found"
- Make sure you've updated the `.env` file with your actual token
- Token should start with `r8_`

### Rate Limiting
- Script includes 5-second delays between generations
- If you hit rate limits, wait a few minutes and try again

### Failed Generations
- Check your Replicate account balance
- Verify the token is valid and active
- Check network connection

## Alternative: Use Your Own Images

If you prefer to use your own images:

1. Place images in `public/images/brand/` with these names:
   - `hero-majaz-dubai.jpg`
   - `landing-banner-majaz.jpg`
   - `report-card-luxury-suv.jpg`
   - `about-section-team.jpg`
   - `service-inspection-car.jpg`

2. Ensure images match the dimensions specified above

3. Follow MAJAZ brand guidelines for consistency
