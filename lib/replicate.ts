import Replicate from 'replicate'

if (!process.env.REPLICATE_API_TOKEN) {
  throw new Error('REPLICATE_API_TOKEN is not set in environment variables')
}

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

export interface GenerateImageOptions {
  prompt: string
  negativePrompt?: string
  width?: number
  height?: number
  numOutputs?: number
}

/**
 * Generate images using SDXL model on Replicate
 * Optimized for MAJAZ brand: luxury automotive photography
 */
export async function generateImage(options: GenerateImageOptions) {
  const {
    prompt,
    negativePrompt = "no logos, no license plates, no people, no cartoon style, no toy plastic look, no unrealistic CG lighting, no text overlays, no watermark, no stretched proportions, no extreme fisheye",
    width = 1920,
    height = 1080,
    numOutputs = 1
  } = options

  try {
    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          prompt,
          negative_prompt: negativePrompt,
          width,
          height,
          num_outputs: numOutputs,
          scheduler: "K_EULER",
          num_inference_steps: 50,
          guidance_scale: 7.5,
          refine: "expert_ensemble_refiner",
          high_noise_frac: 0.8
        }
      }
    ) as string[]

    return output
  } catch (error) {
    console.error('Replicate image generation error:', error)
    throw new Error('Failed to generate image')
  }
}

/**
 * MAJAZ Brand-specific image generation with golden hour Dubai aesthetic
 */
export async function generateMAJAZHeroImage() {
  const prompt = "Luxury SUV parked on polished marble forecourt in Dubai golden hour, ivory / gold palette, medium format Phase One IQ4 ultra-premium editorial, Cooke S4i primes, no branding, no plates, no text, luxury high fashion auto photography, cinematic 16:9, ultra detailed, photorealistic, professional color grading"

  return generateImage({
    prompt,
    width: 1920,
    height: 1080,
    numOutputs: 1
  })
}

/**
 * Generate report card image for vehicle assessment
 */
export async function generateReportCardImage() {
  const prompt = "Top-down angled render of a luxury SUV on a sand-stone textured plane with thin gold panel outlines, minimal shadows, background ivory, intended for right-to-left UI integration, clean and premium, medium format photography aesthetic, professional automotive editorial"

  return generateImage({
    prompt,
    width: 1200,
    height: 800,
    numOutputs: 1
  })
}

/**
 * Generate landing banner image
 */
export async function generateLandingBanner() {
  const prompt = "Minimalist luxury SUV silhouette in black/gold (#D4AF37), abstract marble texture background, high contrast premium aesthetic, ultra clean, professional editorial photography"

  return generateImage({
    prompt,
    width: 1920,
    height: 400,
    numOutputs: 1
  })
}

/**
 * Generate team member/inspector photo placeholders
 */
export async function generateTeamMemberPhoto(description: string) {
  const prompt = `Professional headshot photograph of ${description}, standing in modern Dubai office with marble accents, golden hour lighting, medium format Hasselblad portrait photography, professional business attire, confident pose, clean background, ultra detailed, photorealistic`

  return generateImage({
    prompt,
    width: 800,
    height: 1000,
    numOutputs: 1
  })
}

export default replicate
