#!/usr/bin/env node

import Replicate from 'replicate';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// High-fashion luxury prompts for all 5 brands
const IMAGE_PROMPTS = {
  majaz: {
    'hero-homepage': {
      prompt: "Ultra-luxury SUV Rolls-Royce Cullinan parked on polished black marble forecourt with subtle gold inlay patterns, Dubai golden hour sunset with warm ivory and rich gold color palette, shot on Phase One IQ4 150MP camera with Cooke S4i 50mm prime lens at f/2.8, shallow depth of field, Burj Khalifa softly blurred in distant background, high fashion automotive editorial style like Vogue magazine, cinematic lighting, ultra-premium photography, no logos, no license plates, no people, no text, 8K resolution, professional color grading",
      aspectRatio: '16:9',
      filename: 'hero-luxury-suv.webp'
    },
    'assessment-service': {
      prompt: "Close-up detail shot of luxury vehicle hood ornament in golden hour light casting warm glow on polished black metallic paint with gold reflections, pristine marble surface reflection visible below, ivory leather interior glimpsed through windshield, shot on Hasselblad H6D with 80mm lens at f/1.8 creating beautiful bokeh, editorial luxury magazine photography style, warm blacks and rich gold color grading, ultra-sharp detail, vertical composition, no branding visible",
      aspectRatio: '4:5',
      filename: 'assessment-detail.webp'
    },
    'concierge-membership': {
      prompt: "Elegant overhead architectural shot of vintage luxury sports car 1960s Jaguar E-Type style on cream-colored sandstone surface with geometric gold panel lines forming abstract pattern, minimal shadows, clean minimalist composition, top-down drone perspective perfectly parallel, gradient background from ivory to soft warm gold, luxury minimalist aesthetic, shot on Phase One with 35mm tilt-shift lens, sharp from edge to edge, suitable for UI design integration, no text or logos",
      aspectRatio: '16:9',
      filename: 'membership-overhead.webp'
    },
    'vip-access': {
      prompt: "Private automotive viewing lounge with floor-to-ceiling windows, single luxury vehicle Bentley Continental under dramatic spotlight, rest of elegant room bathed in soft shadow, sophisticated gold accent lighting on architectural edges, black polished marble floor with natural gold veining, ivory leather lounge seating in blurred background, cinematic movie poster composition, moody and ultra-exclusive atmosphere, shot on RED Komodo cinema camera with vintage Cooke anamorphic lens, 2.39:1 ultra-wide cinematic aspect ratio, film noir lighting",
      aspectRatio: '16:9',
      filename: 'vip-lounge.webp'
    },
    'heritage-collection': {
      prompt: "Classic luxury car collection featuring Ferrari 250 GTO, Mercedes 300SL Gullwing, and Porsche 356 Speedster in pristine temperature-controlled vault with sophisticated museum lighting, polished concrete floor perfectly reflecting vehicles, minimal and clean gallery aesthetic, strategic golden accent lighting highlighting elegant curves and chrome details, black walls with subtle gold trim, shot on Phase One IQ4 with 90mm lens at f/4 for extended depth of field, gallery exhibition photography style, rich blacks and warm gold tones",
      aspectRatio: '3:2',
      filename: 'heritage-vault.webp'
    }
  },

  avtocert: {
    'hero-professional': {
      prompt: "Modern executive sedan Toyota Camry on clean pure white seamless background, professional automotive inspection tools arranged artistically in organized geometric pattern around vehicle, bright professional studio lighting from above creating clean shadows, azure blue accent lighting from sides, professional catalog photography style, shot on Canon EOS R5 with 24-70mm lens at f/8 for maximum sharpness throughout, clean bright color grade with azure blue highlights, 16:9 landscape format, suitable for professional corporate website",
      aspectRatio: '16:9',
      filename: 'hero-inspection.webp'
    },
    'standard-inspection': {
      prompt: "Close-up professional shot of modern automotive diagnostic OBD-II scanner tool plugged into car dashboard port, bright blue LED lights illuminated and active, technician hand in clean white inspection glove visible holding device, professional shallow depth of field with smooth bokeh background, shot on Sony A7R IV with 85mm f/1.4 lens, professional automotive service photography, azure blue and white color scheme, vertical 4:5 composition for service card",
      aspectRatio: '4:5',
      filename: 'diagnostic-tool.webp'
    },
    'premium-certification': {
      prompt: "Professional split-screen composition: left half shows vehicle exterior being inspected by technician with professional equipment in bright workshop, right half displays detailed close-up of clean engine components being examined, bright professional automotive workshop lighting throughout, azure blue and white corporate color scheme, subtle technical diagram overlay graphics, clean and modern professional aesthetic, shot on multiple professional cameras composited seamlessly, horizontal 16:9 format for premium services showcase",
      aspectRatio: '16:9',
      filename: 'premium-split.webp'
    },
    'express-service': {
      prompt: "Modern sedan in dynamic motion with controlled motion blur on Azerbaijan mountain highway, dramatic Caucasus mountains visible in background, bright daylight with clear blue sky, sense of speed and professional urgency, azure blue motion blur trail effects, shot on high-speed Sony A9 III camera using professional panning technique at 1/60s, f/11 for sharp vehicle with artistically blurred background showing movement, 16:9 cinematic automotive action photography",
      aspectRatio: '16:9',
      filename: 'express-motion.webp'
    },
    'corporate-fleet': {
      prompt: "Geometric row of six identical commercial delivery vans parked in professional corporate fleet yard, perfect aerial drone shot from directly above, mathematically precise symmetrical arrangement, bright Azerbaijan sunlight creating clean shadows, subtle azure blue corporate branding elements visible on vehicles, shot on DJI Inspire 3 with Zenmuse X9-8K cinema camera, perfectly vertical top-down composition, professional fleet management photography, 1:1 square format for corporate presentations",
      aspectRatio: '1:1',
      filename: 'fleet-aerial.webp'
    }
  },

  bakuDriveLab: {
    'hero-cyberpunk': {
      prompt: "Modified Nissan GT-R sports car with vibrant neon cyan underglow lighting, dark urban night environment with rain-slicked streets perfectly reflecting electric teal and cyber blue neon lights, atmospheric smoke and fog creating depth, shot on RED Komodo 6K cinema camera with anamorphic lens creating signature lens flares, aggressive color grade with crushed blacks and vibrant neon cyan highlights, Blade Runner Tokyo nights aesthetic, 2.39:1 ultra-wide cinematic format, high contrast cyberpunk mood, no people visible",
      aspectRatio: '16:9',
      filename: 'hero-cyberpunk.webp'
    },
    'quantum-protocol': {
      prompt: "Extreme close-up of futuristic digital car dashboard display showing performance metrics and data, glowing cyber blue holographic interface elements, analog speedometer and digital tachometer with neon accents, all reflected in racing helmet visor in foreground, helmet visor takes up bottom third showing reflections, shot on Sony A7S III with 50mm f/1.2 lens for extremely shallow depth of field, neon cyan and electric teal color grade, vertical 9:16 mobile-first composition, sci-fi racing aesthetic",
      aspectRatio: '9:16',
      filename: 'quantum-dashboard.webp'
    },
    'apex-dyno': {
      prompt: "High-performance sports car BMW M4 on dynamometer rolling road with rear wheels spinning showing motion blur, bright colored exhaust flames and heat shimmer visible from exhaust tips, multiple LED data screens in background showing telemetry, technicians in dramatic silhouette backlit by screens, intense cyber blue accent lighting from sides, atmospheric smoke and heat distortion effects, high-energy dramatic composition, shot on RED camera at high frame rate with f/2.8 for shallow depth, horizontal 16:9 format, cyberpunk garage aesthetic, saturated neon colors",
      aspectRatio: '16:9',
      filename: 'apex-dyno.webp'
    },
    'hyperloop-matrix': {
      prompt: "Futuristic racing cockpit interior first-person driver POV with advanced HUD heads-up display overlay projected on windshield, professional racing steering wheel with illuminated LED shift lights active, real-time telemetry data and racing line projected in augmented reality, race track visible through windshield with motion blur, neon cyan and steel grey color scheme, sci-fi racing game aesthetic, shot on GoPro Hero 12 with custom wide-angle lens modification, desaturated base with vibrant neon cyan highlights color grade, 16:9 immersive action camera style",
      aspectRatio: '16:9',
      filename: 'hyperloop-hud.webp'
    },
    'omega-vip': {
      prompt: "Exclusive private performance garage with single Lamborghini Aventador hypercar under single dramatic white spotlight from above, entire rest of space in near-complete darkness, precision neon cyan edge lighting outlining vehicle silhouette creating tron-like effect, industrial raw concrete walls with geometric grid pattern, futuristic minimalist warehouse aesthetic, shot on Arri Alexa Mini cinema camera with prime lens at f/2.0 for atmospheric depth, ultra-moody and exclusive VIP atmosphere, 3:2 aspect ratio, can crop to 21:9 ultra-wide for cinematic effect",
      aspectRatio: '3:2',
      filename: 'omega-exclusive.webp'
    }
  },

  eurograde: {
    'hero-german-precision': {
      prompt: "Executive Mercedes-Benz E-Class sedan in professional photography studio with seamless white cyclorama background, sophisticated gradient lighting from top to bottom, deep navy blue key light from front, cool steel grey fill light from sides, technical and precise German engineering aesthetic, shot on Hasselblad H6D-400c with 80mm lens at f/11 for absolute maximum sharpness, every technical detail perfectly in focus, catalog-quality professional automotive photography, 16:9 landscape format, cool color grade with deep blue professional accents",
      aspectRatio: '16:9',
      filename: 'hero-precision.webp'
    },
    'continental-standard': {
      prompt: "Professional close-up macro shot of vehicle VIN identification plate and official inspection certification stickers, technical clipboard with detailed certification form clearly readable but generic, prominent deep blue official inspection stamp visible on documents, professional automotive documentation photography, shot on Nikon Z9 with 105mm macro lens at f/5.6 for technical detail clarity, clean and professional corporate aesthetic, vertical 4:5 composition suitable for certification services card display",
      aspectRatio: '4:5',
      filename: 'continental-docs.webp'
    },
    'nordic-excellence': {
      prompt: "Modern Volvo electric vehicle in minimalist Scandinavian interior space, pure white walls, natural light wood flooring, massive floor-to-ceiling windows with soft diffused natural daylight, single sculptural potted plant in corner, extremely clean and minimal Nordic composition, shot on Phase One IQ4 with 55mm lens at f/8 for perfect clarity, bright whites with soft natural shadows, subtle hint of deep blue accent, horizontal 16:9 format, peaceful premium Scandinavian design aesthetic, no clutter",
      aspectRatio: '16:9',
      filename: 'nordic-clean.webp'
    },
    'alpine-precision': {
      prompt: "Vehicle undergoing precision laser measurement and alignment with advanced blue laser scanning equipment, technical grid projection on vehicle bodywork showing perfect geometric alignment, professional technical environment with calibrated measurement tools visible, deep blue laser light beams creating technical atmosphere, shot on Canon EOS R5 C cinema camera with 24mm tilt-shift lens for perfect perspective control, technical and scientific aesthetic with steel grey color grade, horizontal 16:9 format for technical precision service showcase",
      aspectRatio: '16:9',
      filename: 'alpine-laser.webp'
    },
    'executive-fleet': {
      prompt: "Professional lineup of five luxury executive sedans BMW 7-Series, Mercedes S-Class, Audi A8 in modern underground parking garage with architectural exposed concrete, dramatic directional professional lighting creating strong geometric shadows, deep blue professional lighting accents highlighting vehicles, industrial steel and polished concrete textures, shot on Sony A1 with 16-35mm f/2.8 lens at f/8 for edge-to-edge sharpness, professional automotive fleet photography for corporate clients, 21:9 ultra-wide cinematic crop for maximum impact",
      aspectRatio: '16:9',
      filename: 'executive-lineup.webp'
    }
  },

  sandvault: {
    'hero-vault': {
      prompt: "Massive circular Swiss bank-style vault door slowly opening to reveal ultra-rare vehicles Bugatti Chiron and Pagani Huayra in pristine climate-controlled underground chamber, single dramatic spotlight beam illuminating vehicles through opening vault door, rest of scene in near-complete darkness, obsidian black walls with subtle warm gold metallic accents, atmospheric mist and smoke for mystery, ultra-cinematic composition, shot on Arri Alexa 65 IMAX camera with 32mm prime lens at f/2.0 for shallow cinematic depth, crushed blacks with rich warm gold highlights color grade, 2.39:1 anamorphic cinema scope ratio",
      aspectRatio: '16:9',
      filename: 'hero-vault-door.webp'
    },
    'obsidian-chamber': {
      prompt: "Single classic Ferrari Daytona in pristine condition under single overhead spotlight in completely dark underground vault, warm gold accent lighting on polished concrete floor creating subtle atmospheric glow, smoke grey reinforced concrete walls barely visible at frame edges, minimalist and mysterious Swiss vault aesthetic, shot on RED V-Raptor 8K camera with 50mm lens at f/1.8 for dramatic light falloff, moody underground vault atmosphere with maximum black crush, vertical 4:5 ratio perfect for premium package card display",
      aspectRatio: '4:5',
      filename: 'obsidian-single.webp'
    },
    'titanium-biometric': {
      prompt: "Futuristic biometric hand scanner with warm gold illumination mounted on matte obsidian black wall, high-tech vault keypad with gold backlit numbers slightly out of focus in background, precision engineered security technology aesthetic, shot on Sony A7R V with 90mm macro lens at f/2.8 for technical detail, deep blacks with warm gold accent lighting, square 1:1 composition for social media and security technology showcase, mysterious and secure atmosphere",
      aspectRatio: '1:1',
      filename: 'titanium-security.webp'
    },
    'sovereign-corridor': {
      prompt: "Underground vault corridor with dramatic receding perspective, private vault chambers visible on both sides through thick reinforced glass panels, ultra-rare vehicles barely visible in each chamber creating mystery, continuous warm gold LED lighting strips along walls, obsidian black architectural walls, smoke grey polished reflective floor mirroring lights perfectly, shot on Arri Alexa Mini with 14mm ultra-wide lens at f/5.6 for deep focus, dramatic architecture photography emphasizing scale and security, horizontal 16:9 format for corridor depth",
      aspectRatio: '16:9',
      filename: 'sovereign-corridor.webp'
    },
    'black-sanctum': {
      prompt: "Ultimate private vault wing with single Koenigsegg Jesko hypercar on motorized rotating display platform, DNA biometric scanner in extreme foreground out of focus, underground military bunker aesthetic with visible reinforced steel beams, minimal warm gold accent lighting revealing only edges and highlights, mostly darkness with strategic reveals, shot on RED Komodo with vintage Cooke anamorphic lens for cinematic character and lens flares, ultra-exclusive and mysterious UHNW atmosphere, 2.39:1 cinema scope aspect ratio, maximum black crush with reserved gold highlights in color grade",
      aspectRatio: '16:9',
      filename: 'sanctum-ultimate.webp'
    }
  }
};

async function downloadImage(url, filepath) {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(filepath, Buffer.from(buffer));
}

async function generateImage(brand, imageName, config) {
  console.log(`\n🎨 Generating ${brand}/${imageName}...`);
  console.log(`📝 Prompt: ${config.prompt.substring(0, 100)}...`);

  try {
    const output = await replicate.run(
      "black-forest-labs/flux-1.1-pro",
      {
        input: {
          prompt: config.prompt,
          aspect_ratio: config.aspectRatio,
          output_format: "webp",
          output_quality: 95,
          safety_tolerance: 2,
        }
      }
    );

    // Create brand directory if it doesn't exist
    const brandDir = path.join(__dirname, '..', 'public', 'images', brand);
    fs.mkdirSync(brandDir, { recursive: true });

    // Download and save image
    const filepath = path.join(brandDir, config.filename);
    await downloadImage(output, filepath);

    console.log(`✅ Saved: ${filepath}`);
    return { success: true, brand, imageName, filepath };

  } catch (error) {
    console.error(`❌ Error generating ${brand}/${imageName}:`, error.message);
    return { success: false, brand, imageName, error: error.message };
  }
}

async function generateAllImages() {
  console.log('🚀 Starting high-fashion luxury image generation...');
  console.log(`📸 Total images to generate: ${Object.keys(IMAGE_PROMPTS).reduce((sum, brand) => sum + Object.keys(IMAGE_PROMPTS[brand]).length, 0)}`);

  const results = [];
  let successCount = 0;
  let failCount = 0;

  for (const [brand, images] of Object.entries(IMAGE_PROMPTS)) {
    console.log(`\n🏢 Processing ${brand.toUpperCase()}...`);

    for (const [imageName, config] of Object.entries(images)) {
      const result = await generateImage(brand, imageName, config);
      results.push(result);

      if (result.success) {
        successCount++;
      } else {
        failCount++;
      }

      // Rate limit: wait 3 seconds between requests
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }

  console.log('\n\n📊 GENERATION COMPLETE!');
  console.log(`✅ Success: ${successCount}/${successCount + failCount}`);
  console.log(`❌ Failed: ${failCount}/${successCount + failCount}`);

  if (failCount > 0) {
    console.log('\n❌ Failed images:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`   - ${r.brand}/${r.imageName}: ${r.error}`);
    });
  }

  console.log('\n🎉 All images saved to public/images/[brand]/');
}

// Run the generator
generateAllImages().catch(console.error);
