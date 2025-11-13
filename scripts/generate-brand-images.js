/**
 * MAJAZ Brand Image Generation Script
 *
 * This script uses Replicate AI to generate brand-consistent images
 * for the MAJAZ platform (luxury SUV, golden hour Dubai aesthetic)
 *
 * Usage:
 * 1. Set REPLICATE_API_TOKEN in .env
 * 2. Run: node scripts/generate-brand-images.js
 */

require('dotenv').config();
const Replicate = require('replicate');
const fs = require('fs');
const path = require('path');
const https = require('https');

// Check for API token
if (!process.env.REPLICATE_API_TOKEN) {
  console.error('❌ Error: REPLICATE_API_TOKEN not found in environment variables');
  console.log('👉 Please create a .env file with your Replicate API token');
  console.log('   Get your token at: https://replicate.com/account/api-tokens');
  process.exit(1);
}

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Download image from URL
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve(filepath);
        });
      } else {
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

// Generate image with Replicate
async function generateImage(prompt, filename, width = 1920, height = 1080) {
  console.log(`\n🎨 Generating: ${filename}`);
  console.log(`📝 Prompt: ${prompt.substring(0, 100)}...`);

  const negativePrompt = "no logos, no license plates, no people, no cartoon style, no toy plastic look, no unrealistic CG lighting, no text overlays, no watermark, no stretched proportions, no extreme fisheye";

  try {
    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          prompt,
          negative_prompt: negativePrompt,
          width,
          height,
          num_outputs: 1,
          scheduler: "K_EULER",
          num_inference_steps: 50,
          guidance_scale: 7.5,
          refine: "expert_ensemble_refiner",
          high_noise_frac: 0.8
        }
      }
    );

    if (output && output[0]) {
      const imageUrl = output[0];
      const filepath = path.join(__dirname, '..', 'public', 'images', 'brand', filename);

      console.log(`⬇️  Downloading image...`);
      await downloadImage(imageUrl, filepath);
      console.log(`✅ Saved: ${filepath}`);

      return filepath;
    } 
      throw new Error('No output from Replicate');
    
  } catch (error) {
    console.error(`❌ Error generating ${filename}:`, error.message);
    throw error;
  }
}

// Main execution
async function main() {
  console.log('🚀 MAJAZ Brand Image Generation');
  console.log('================================\n');

  const images = [
    {
      name: 'hero-majaz-dubai.jpg',
      prompt: 'Luxury SUV parked on polished marble forecourt in Dubai golden hour, ivory and gold palette, medium format Phase One IQ4 ultra-premium editorial photography, Cooke S4i prime lens character, soft golden light, no branding, no license plates, no text, luxury high fashion automotive photography, cinematic 16:9, ultra detailed, photorealistic, professional color grading, warm tones, shallow depth of field',
      width: 1920,
      height: 1080
    },
    {
      name: 'landing-banner-majaz.jpg',
      prompt: 'Minimalist luxury SUV silhouette on polished marble surface, black and gold color scheme, abstract marble texture background, high contrast premium aesthetic, ultra clean, professional editorial automotive photography, golden hour lighting, sophisticated and elegant, no text, no logos, cinematic wide aspect ratio',
      width: 1920,
      height: 400
    },
    {
      name: 'report-card-luxury-suv.jpg',
      prompt: 'Top-down angled view of luxury SUV on sand-stone textured surface, thin gold panel accent lines overlaid, minimal shadows, ivory background, clean and premium presentation, medium format photography aesthetic, professional automotive editorial style, technical diagram feel, ultra detailed, photorealistic',
      width: 1200,
      height: 800
    },
    {
      name: 'about-section-team.jpg',
      prompt: 'Modern Dubai office interior with floor-to-ceiling windows overlooking city skyline, golden hour natural lighting, polished marble floors, contemporary luxury furniture, professional business environment, ultra premium, photorealistic, architectural photography, wide angle, no people',
      width: 1920,
      height: 1080
    },
    {
      name: 'service-inspection-car.jpg',
      prompt: 'Luxury sedan in professional automotive inspection garage, clean modern facility, bright even lighting, technical equipment visible, Dubai setting, premium service environment, professional automotive photography, ultra detailed, photorealistic, no people, no text',
      width: 1200,
      height: 800
    }
  ];

  let successCount = 0;
  let failCount = 0;

  for (const image of images) {
    try {
      await generateImage(image.prompt, image.name, image.width, image.height);
      successCount++;

      // Add delay between requests to avoid rate limiting
      if (images.indexOf(image) < images.length - 1) {
        console.log('⏳ Waiting 5 seconds before next generation...');
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    } catch (error) {
      failCount++;
      console.error(`Failed to generate ${image.name}`);
    }
  }

  console.log('\n================================');
  console.log(`✅ Successfully generated: ${successCount} images`);
  if (failCount > 0) {
    console.log(`❌ Failed: ${failCount} images`);
  }
  console.log('================================\n');
  console.log('📁 Images saved to: public/images/brand/');
  console.log('🎉 Done!');
}

// Run the script
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
