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

// Luxury package image prompts for all 5 brands
const PACKAGE_PROMPTS = {
  majaz: {
    'remote-assessment': {
      prompt: "Elegant luxury vehicle assessment scene with professional inspector in black suit examining sleek Mercedes-Benz S-Class on polished marble surface, warm golden hour lighting through floor-to-ceiling windows, luxury showroom environment with soft ivory walls, inspector holding premium digital tablet showing vehicle report, sophisticated black and gold aesthetic with warm ivory accents, shot on Hasselblad H6D medium format camera with 80mm lens at f/2.8 for shallow depth, editorial luxury photography style, professional concierge service aesthetic",
      aspectRatio: '4:5',
      filename: 'remote-assessment.webp'
    },
    'onsite-inspection': {
      prompt: "Professional pre-purchase vehicle inspection scene with luxury Range Rover in pristine white climate-controlled inspection bay, expert technician in premium black uniform using advanced diagnostic equipment with gold accents, sophisticated inspection tools arranged precisely on ivory workbench, warm professional lighting highlighting vehicle details, ultra-premium automotive service photography, shot on Phase One IQ4 with 55mm lens at f/4, clean and luxurious aesthetic with black/gold/ivory color palette",
      aspectRatio: '4:5',
      filename: 'onsite-inspection.webp'
    },
    'gold-concierge': {
      prompt: "Exclusive automotive concierge service scene with professional in elegant black suit presenting luxury vehicle portfolio to discerning client in premium lounge with floor-to-ceiling Dubai city views, sophisticated interior with ivory leather furniture and gold accent lighting, Bentley Continental visible through showroom glass in background, warm and welcoming atmosphere, ultra-premium hospitality aesthetic, shot on Canon EOS R5 with 50mm f/1.2 lens for beautiful bokeh, editorial luxury lifestyle photography",
      aspectRatio: '3:2',
      filename: 'gold-concierge.webp'
    },
    'platinum-concierge': {
      prompt: "Ultra-premium VIP concierge experience with luxury automotive specialist in bespoke black suit conducting private consultation in exclusive penthouse office overlooking Dubai skyline at sunset, floor-to-ceiling windows with golden hour light flooding elegant space, client seated in ivory leather executive chair, rare Rolls-Royce Phantom VIII visible in private showroom below through glass floor panel, sophisticated black walnut desk with gold accents, shot on Leica SL2 with 50mm Summilux at f/1.4, ultra-exclusive UHNW aesthetic",
      aspectRatio: '3:2',
      filename: 'platinum-concierge.webp'
    },
    'diamond-concierge': {
      prompt: "Ultimate automotive concierge experience featuring private helicopter landing on Dubai rooftop helipad at golden hour, luxury automotive specialist in impeccable black suit welcoming UHNW client, collection of ultra-rare hypercars (Bugatti Chiron, Pagani Huayra, Koenigsegg Jesko) visible in exclusive climate-controlled penthouse garage below, dramatic sunset lighting casting warm gold across polished marble surfaces, shot on Arri Alexa Mini cinema camera with 32mm prime lens at f/2.0, cinematic ultra-luxury lifestyle editorial style",
      aspectRatio: '16:9',
      filename: 'diamond-concierge.webp'
    },
    'sovereign-collection': {
      prompt: "Ultimate automotive sovereignty experience with private museum-grade vault showcasing priceless heritage vehicle collection including Ferrari 250 GTO, Mercedes 300SL, Jaguar D-Type under precision spotlight array, ultra-UHNW client in bespoke suit examining rare vehicle with white-gloved curator, polished black marble floor with gold veining, atmospheric museum lighting, warm gold accents on architectural details, shot on Phase One IQ4 with tilt-shift 90mm lens at f/5.6 for perfect clarity, museum-quality automotive art photography",
      aspectRatio: '16:9',
      filename: 'sovereign-collection.webp'
    }
  },

  avtocert: {
    'standard-inspection': {
      prompt: "Professional automotive inspection scene with modern sedan Toyota Camry in bright white inspection bay, certified technician in clean azure blue uniform conducting thorough OBD-II diagnostic scan with professional equipment, clipboard with official certification checklist visible, bright professional workshop lighting with azure blue accent lights, organized professional service environment, shot on Canon EOS R5 with 24-70mm lens at f/5.6, clean corporate automotive service photography",
      aspectRatio: '4:5',
      filename: 'standard-inspection.webp'
    },
    'premium-certification': {
      prompt: "Advanced automotive certification scene with executive sedan BMW 5-Series elevated on professional hydraulic lift in modern Azerbaijan inspection facility, multiple certified technicians in azure blue uniforms conducting comprehensive multi-point inspection, advanced diagnostic screens showing vehicle telemetry, professional certification equipment arranged precisely, bright technical lighting with subtle azure accents, shot on Sony A7R IV with 35mm lens at f/8, professional technical documentation photography",
      aspectRatio: '3:2',
      filename: 'premium-certification.webp'
    },
    'express-service': {
      prompt: "Fast-paced professional automotive service scene with modern SUV in dynamic Azerbaijan service center, efficient technician team in azure blue uniforms working simultaneously on quick inspection process, professional diagnostic tools connected, bright energetic lighting suggesting speed and efficiency, clean modern service facility with corporate branding, shot on Sony A9 III with 24mm lens at f/4 using fast shutter speed, dynamic professional service photography",
      aspectRatio: '4:5',
      filename: 'express-service.webp'
    },
    'corporate-fleet': {
      prompt: "Professional corporate fleet inspection with row of five identical executive sedans Mercedes-Benz E-Class in organized service facility in Baku, team of certified technicians in matching azure blue uniforms conducting systematic fleet inspection, professional management clipboards and digital tablets showing fleet status, modern corporate environment with clean lines and professional azure blue accent lighting, shot on Nikon Z9 with 24-70mm lens at f/8, corporate fleet management photography",
      aspectRatio: '16:9',
      filename: 'corporate-fleet.webp'
    },
    'export-international': {
      prompt: "International automotive export certification scene with luxury vehicle Mercedes-Benz S-Class being prepared for international shipping in modern Baku logistics facility, professional inspector in azure blue uniform reviewing official export documentation and certification papers, international shipping container visible in background, professional office environment with maps showing international routes, official certification stamps and documents prominently displayed, shot on Canon EOS R5 with 50mm lens at f/2.8, professional international business photography",
      aspectRatio: '3:2',
      filename: 'export-international.webp'
    }
  },

  bakuDriveLab: {
    'quantum-protocol': {
      prompt: "High-tech performance vehicle diagnostics scene with modified Nissan GT-R on advanced dynamometer in dark cyberpunk-style performance lab, technician in tactical black uniform with neon cyan accents monitoring glowing holographic performance displays, multiple LED screens showing real-time telemetry data with cyan interface graphics, atmospheric smoke and neon cyan underglow lighting creating sci-fi atmosphere, shot on RED Komodo 6K with anamorphic lens at f/2.8, cyberpunk automotive tech aesthetic",
      aspectRatio: '4:5',
      filename: 'quantum-protocol.webp'
    },
    'apex-dyno': {
      prompt: "Intense performance testing scene with BMW M4 Competition strapped to professional rolling road dynamometer with wheels spinning in motion blur, bright exhaust flames and heat shimmer visible from titanium exhaust tips, technicians in black tactical gear monitoring glowing cyan data screens showing power curves and torque readings, dark industrial garage with dramatic neon cyan edge lighting, atmospheric smoke effects, shot on RED V-Raptor 8K at high frame rate with f/2.0, high-energy automotive performance photography",
      aspectRatio: '3:2',
      filename: 'apex-dyno.webp'
    },
    'hyperloop-matrix': {
      prompt: "Futuristic automotive VR simulation training center with professional race driver in full racing suit seated in advanced motion simulator cockpit surrounded by glowing cyan holographic displays projecting virtual race track, multiple technicians monitoring performance data on illuminated cyan screens, dark high-tech training facility with neon accent lighting, atmospheric fog and dramatic cyan light beams, shot on Sony A7S III with 35mm f/1.4 lens, sci-fi racing technology aesthetic",
      aspectRatio: '16:9',
      filename: 'hyperloop-matrix.webp'
    },
    'omega-vip': {
      prompt: "Exclusive private performance garage VIP experience with single Lamborghini Aventador SVJ under dramatic white spotlight from above in otherwise completely dark industrial space, VIP client in sophisticated attire consulting with performance specialist beside vehicle, precision neon cyan edge lighting outlining hypercar silhouette creating tron-like effect, industrial raw concrete walls with geometric patterns, ultra-moody and exclusive atmosphere, shot on Arri Alexa Mini with 50mm prime at f/2.0, cinematic ultra-premium performance aesthetic",
      aspectRatio: '3:2',
      filename: 'omega-vip.webp'
    },
    'infinite-hypercar': {
      prompt: "Ultimate hypercar performance laboratory with Bugatti Chiron Super Sport on specialized testing platform in ultra-advanced facility, multiple engineers in high-tech uniforms analyzing holographic performance projections floating in air around vehicle, floor-to-ceiling LED walls displaying complex aerodynamic simulations with cyan data visualization, atmospheric smoke with dramatic cyan light beams, futuristic underground facility aesthetic, shot on RED Komodo with cinema prime lens at f/2.8, sci-fi automotive engineering photography",
      aspectRatio: '16:9',
      filename: 'infinite-hypercar.webp'
    }
  },

  eurograde: {
    'continental-standard': {
      prompt: "Professional European automotive certification scene with executive Volkswagen Passat in pristine white certification bay, certified inspector in professional navy blue uniform examining vehicle with official EU inspection checklist, official certification documents and stamps prominently displayed on desk, professional workshop with clean white walls and deep blue accent lighting, organized and precise Germanic aesthetic, shot on Hasselblad H6D with 80mm lens at f/5.6, professional European automotive documentation photography",
      aspectRatio: '4:5',
      filename: 'continental-standard.webp'
    },
    'nordic-excellence': {
      prompt: "Scandinavian premium automotive inspection with Volvo XC90 in minimalist white Nordic inspection facility with natural blonde wood accents, inspector in clean navy blue uniform conducting precise multi-point inspection, large floor-to-ceiling windows with soft natural daylight, extremely clean and organized environment with subtle blue accent lighting, peaceful professional Scandinavian design aesthetic, shot on Phase One IQ4 with 55mm lens at f/8, Nordic minimalist professional photography",
      aspectRatio: '3:2',
      filename: 'nordic-excellence.webp'
    },
    'alpine-precision': {
      prompt: "High-precision German automotive engineering inspection with Mercedes-Benz E-Class undergoing advanced laser measurement and alignment in state-of-the-art Swiss facility, professional technician in immaculate navy blue technical uniform operating precision blue laser scanning equipment projecting geometric grid on vehicle bodywork, advanced calibration tools and measurement devices visible, technical scientific environment with steel grey and deep blue color scheme, shot on Canon EOS R5 C with 24mm tilt-shift lens at f/11, technical engineering documentation photography",
      aspectRatio: '4:5',
      filename: 'alpine-precision.webp'
    },
    'executive-fleet': {
      prompt: "Professional European executive fleet management scene with lineup of premium German executive sedans BMW 7-Series, Mercedes S-Class, Audi A8 in modern underground Munich corporate garage, professional fleet manager in navy blue business suit reviewing certification documents on tablet, dramatic architectural concrete and steel environment with professional deep blue accent lighting, organized corporate fleet aesthetic, shot on Sony A1 with 24mm lens at f/8, corporate European automotive fleet photography",
      aspectRatio: '16:9',
      filename: 'executive-fleet.webp'
    },
    'bespoke-heritage': {
      prompt: "Ultimate European heritage vehicle certification with rare classic Porsche 911 from 1970s in prestigious German automotive museum certification facility, expert in formal navy blue suit with white inspection gloves examining vintage vehicle alongside curator, pristine museum environment with dramatic spotlight lighting and subtle blue accents, polished concrete floor perfectly reflecting vehicle, documentation showing historical provenance and certification papers, shot on Leica SL2 with 50mm APO-Summicron at f/4, museum-quality heritage automotive photography",
      aspectRatio: '3:2',
      filename: 'bespoke-heritage.webp'
    }
  },

  sandvault: {
    'obsidian-chamber': {
      prompt: "Secure underground luxury vehicle storage vault with single Ferrari F40 under single dramatic overhead spotlight in otherwise completely dark chamber, client in sophisticated black attire conducting inspection with vault manager in formal security uniform, warm gold accent lighting on polished concrete floor, smoke grey reinforced concrete walls barely visible, mysterious and ultra-secure Swiss vault aesthetic, shot on RED V-Raptor 8K with 50mm lens at f/1.8, moody ultra-secure vault photography",
      aspectRatio: '4:5',
      filename: 'obsidian-chamber.webp'
    },
    'titanium-biometric': {
      prompt: "High-security automotive vault access scene with UHNW client using advanced biometric hand scanner with warm gold illumination on matte obsidian black wall, sophisticated multi-factor security system with retinal scanner and DNA verification visible, rare Pagani Huayra barely visible through thick vault glass in background, luxury security technology aesthetic with gold and black color scheme, shot on Sony A7R V with 85mm f/1.4 lens, ultra-secure luxury technology photography",
      aspectRatio: '3:2',
      filename: 'titanium-biometric.webp'
    },
    'sovereign-corridor': {
      prompt: "Underground luxury vehicle vault corridor with dramatic receding perspective, private climate-controlled storage chambers visible on both sides through thick reinforced glass walls, ultra-rare vehicles Bugatti Chiron and Koenigsegg barely visible in individual chambers creating mystery, continuous warm gold LED lighting strips along obsidian black architectural walls, smoke grey polished reflective floor perfectly mirroring lights, shot on Arri Alexa Mini with 14mm ultra-wide lens at f/5.6, dramatic architectural security photography",
      aspectRatio: '16:9',
      filename: 'sovereign-corridor.webp'
    },
    'black-sanctum': {
      prompt: "Ultimate private automotive vault wing with single Koenigsegg Jesko hypercar on motorized rotating display platform in military-grade underground bunker, UHNW client in bespoke black suit with white gloves examining hypercar with vault security specialist, visible reinforced steel beams and security systems, minimal warm gold accent lighting revealing only edges and highlights with mostly darkness, ultra-exclusive mysterious atmosphere, shot on RED Komodo with vintage Cooke anamorphic lens at f/2.0, ultra-luxury security vault photography",
      aspectRatio: '3:2',
      filename: 'black-sanctum.webp'
    },
    'eternal-fortress': {
      prompt: "Ultimate underground automotive fortress vault with massive Swiss bank-style circular vault door slowly opening to reveal private collection wing housing multiple ultra-rare hypercars Bugatti Divo, Pagani Imola, McLaren Speedtail in pristine climate-controlled chamber, dramatic spotlight beams illuminating vehicles through vault door opening, rest of massive underground facility in near-darkness with subtle warm gold architectural accent lighting, atmospheric mist creating mystery, shot on Arri Alexa 65 IMAX camera with 32mm prime lens at f/2.0, cinematic ultra-secure vault cinematography",
      aspectRatio: '16:9',
      filename: 'eternal-fortress.webp'
    }
  }
};

async function downloadImage(url, filepath) {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(filepath, Buffer.from(buffer));
}

async function generateImage(brand, packageName, config) {
  console.log(`\n🎨 Generating ${brand}/${packageName}...`);
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

    // Create brand packages directory if it doesn't exist
    const brandDir = path.join(__dirname, '..', 'public', 'images', 'packages', brand);
    fs.mkdirSync(brandDir, { recursive: true });

    // Download and save image
    const filepath = path.join(brandDir, config.filename);
    await downloadImage(output, filepath);

    console.log(`✅ Saved: ${filepath}`);
    return { success: true, brand, packageName, filepath };

  } catch (error) {
    console.error(`❌ Error generating ${brand}/${packageName}:`, error.message);
    return { success: false, brand, packageName, error: error.message };
  }
}

async function generateAllPackageImages() {
  console.log('🚀 Starting luxury package image generation...');
  console.log(`📸 Total package images to generate: ${Object.keys(PACKAGE_PROMPTS).reduce((sum, brand) => sum + Object.keys(PACKAGE_PROMPTS[brand]).length, 0)}`);

  const results = [];
  let successCount = 0;
  let failCount = 0;

  for (const [brand, packages] of Object.entries(PACKAGE_PROMPTS)) {
    console.log(`\n🏢 Processing ${brand.toUpperCase()} packages...`);

    for (const [packageName, config] of Object.entries(packages)) {
      const result = await generateImage(brand, packageName, config);
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

  console.log('\n\n📊 PACKAGE IMAGE GENERATION COMPLETE!');
  console.log(`✅ Success: ${successCount}/${successCount + failCount}`);
  console.log(`❌ Failed: ${failCount}/${successCount + failCount}`);

  if (failCount > 0) {
    console.log('\n❌ Failed images:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`   - ${r.brand}/${r.packageName}: ${r.error}`);
    });
  }

  console.log('\n🎉 All package images saved to public/images/packages/[brand]/');
}

// Run the generator
generateAllPackageImages().catch(console.error);
