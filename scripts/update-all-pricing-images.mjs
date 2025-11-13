#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const carboxRoot = '/Users/rentamac/Documents/repos/repos/carbox';

// Mapping of package IDs to image filenames
const imageMapping = {
  avtocert: {
    'standart': 'standard-inspection.webp',
    'premium': 'premium-certification.webp',
    'ekspres': 'express-service.webp',
    'kommersia': 'corporate-fleet.webp',
    'korporativ': 'export-international.webp'
  },
  bakuDriveLab: {
    'quantum': 'quantum-protocol.webp',
    'apex': 'apex-dyno.webp',
    'hyperloop': 'hyperloop-matrix.webp',
    'omega': 'omega-vip.webp',
    'infinite': 'infinite-hypercar.webp'
  },
  eurograde: {
    'continental': 'continental-standard.webp',
    'nordic': 'nordic-excellence.webp',
    'alpine': 'alpine-precision.webp',
    'executive': 'executive-fleet.webp',
    'bespoke': 'bespoke-heritage.webp'
  },
  sandvault: {
    'obsidian': 'obsidian-chamber.webp',
    'titanium': 'titanium-biometric.webp',
    'sovereign': 'sovereign-corridor.webp',
    'black': 'black-sanctum.webp',
    'eternal': 'eternal-fortress.webp'
  }
};

console.log('🔄 Updating pricing files with package image paths...\n');

// AVTOCERT
console.log('📋 AVTOCERT - Adding imagePath fields...');
const avtocertPath = path.join(carboxRoot, 'avtocert', 'data', 'pricing.js');
let avtocertContent = fs.readFileSync(avtocertPath, 'utf8');

// Add imagePath after strip PriceId for each package
avtocertContent = avtocertContent.replace(
  /stripePriceId: "price_standard_inspection"/,
  `stripePriceId: "price_standard_inspection",\n    imagePath: "/images/packages/avtocert/standard-inspection.webp"`
);
avtocertContent = avtocertContent.replace(
  /stripePriceId: "price_premium_certification"/,
  `stripePriceId: "price_premium_certification",\n    imagePath: "/images/packages/avtocert/premium-certification.webp"`
);
avtocertContent = avtocertContent.replace(
  /stripePriceId: "price_express_service"/,
  `stripePriceId: "price_express_service",\n    imagePath: "/images/packages/avtocert/express-service.webp"`
);
avtocertContent = avtocertContent.replace(
  /stripePriceId: "price_commercial_fleet"/,
  `stripePriceId: "price_commercial_fleet",\n    imagePath: "/images/packages/avtocert/corporate-fleet.webp"`
);
avtocertContent = avtocertContent.replace(
  /stripePriceId: "price_corporate_program"/,
  `stripePriceId: "price_corporate_program",\n    imagePath: "/images/packages/avtocert/export-international.webp"`
);

fs.writeFileSync(avtocertPath, avtocertContent);
console.log('✅ AVTOCERT pricing updated\n');

// BAKU DRIVE LAB
console.log('🏎️  BAKU DRIVE LAB - Updating innovationPackages.js...');
const bakuPath = path.join(carboxRoot, 'baku-drive-lab', 'data', 'innovationPackages.js');
let bakuContent = fs.readFileSync(bakuPath, 'utf8');

// Add imagePath for each package
bakuContent = bakuContent.replace(
  /(id: ["']quantum["'][\s\S]*?stripePrice.*?\n)/,
  `$1    imagePath: "/images/packages/bakuDriveLab/quantum-protocol.webp",\n`
);
bakuContent = bakuContent.replace(
  /(id: ["']apex["'][\s\S]*?stripePrice.*?\n)/,
  `$1    imagePath: "/images/packages/bakuDriveLab/apex-dyno.webp",\n`
);
bakuContent = bakuContent.replace(
  /(id: ["']hyperloop["'][\s\S]*?stripePrice.*?\n)/,
  `$1    imagePath: "/images/packages/bakuDriveLab/hyperloop-matrix.webp",\n`
);
bakuContent = bakuContent.replace(
  /(id: ["']omega["'][\s\S]*?stripePrice.*?\n)/,
  `$1    imagePath: "/images/packages/bakuDriveLab/omega-vip.webp",\n`
);
bakuContent = bakuContent.replace(
  /(id: ["']infinite["'][\s\S]*?stripePrice.*?\n)/,
  `$1    imagePath: "/images/packages/bakuDriveLab/infinite-hypercar.webp",\n`
);

fs.writeFileSync(bakuPath, bakuContent);
console.log('✅ BAKU DRIVE LAB packages updated\n');

// EUROGRADE
console.log('🇪🇺 EUROGRADE - Updating packages.ts...');
const eurogradePath = path.join(carboxRoot, 'eurograde', 'data', 'packages.ts');
let eurogradeContent = fs.readFileSync(eurogradePath, 'utf8');

// Add imagePath for each package (assuming similar structure)
eurogradeContent = eurogradeContent.replace(
  /(id: ['"]continental['"][\s\S]*?tier:.*?\n)/,
  `$1    imagePath: '/images/packages/eurograde/continental-standard.webp',\n`
);
eurogradeContent = eurogradeContent.replace(
  /(id: ['"]nordic['"][\s\S]*?tier:.*?\n)/,
  `$1    imagePath: '/images/packages/eurograde/nordic-excellence.webp',\n`
);
eurogradeContent = eurogradeContent.replace(
  /(id: ['"]alpine['"][\s\S]*?tier:.*?\n)/,
  `$1    imagePath: '/images/packages/eurograde/alpine-precision.webp',\n`
);
eurogradeContent = eurogradeContent.replace(
  /(id: ['"]executive['"][\s\S]*?tier:.*?\n)/,
  `$1    imagePath: '/images/packages/eurograde/executive-fleet.webp',\n`
);
eurogradeContent = eurogradeContent.replace(
  /(id: ['"]bespoke['"][\s\S]*?tier:.*?\n)/,
  `$1    imagePath: '/images/packages/eurograde/bespoke-heritage.webp',\n`
);

fs.writeFileSync(eurogradePath, eurogradeContent);
console.log('✅ EUROGRADE packages updated\n');

// SANDVAULT
console.log('🔒 SANDVAULT - Updating pricing.js...');
const sandvaultPath = path.join(carboxRoot, 'sandvault', 'data', 'pricing.js');
let sandvaultContent = fs.readFileSync(sandvaultPath, 'utf8');

// Add imagePath for each package
sandvaultContent = sandvaultContent.replace(
  /(id: ["']obsidian["'][\s\S]*?stripePrice.*?\n)/,
  `$1    imagePath: "/images/packages/sandvault/obsidian-chamber.webp",\n`
);
sandvaultContent = sandvaultContent.replace(
  /(id: ["']titanium["'][\s\S]*?stripePrice.*?\n)/,
  `$1    imagePath: "/images/packages/sandvault/titanium-biometric.webp",\n`
);
sandvaultContent = sandvaultContent.replace(
  /(id: ["']sovereign["'][\s\S]*?stripePrice.*?\n)/,
  `$1    imagePath: "/images/packages/sandvault/sovereign-corridor.webp",\n`
);
sandvaultContent = sandvaultContent.replace(
  /(id: ["']black["'][\s\S]*?stripePrice.*?\n)/,
  `$1    imagePath: "/images/packages/sandvault/black-sanctum.webp",\n`
);
sandvaultContent = sandvaultContent.replace(
  /(id: ["']eternal["'][\s\S]*?stripePrice.*?\n)/,
  `$1    imagePath: "/images/packages/sandvault/eternal-fortress.webp",\n`
);

fs.writeFileSync(sandvaultPath, sandvaultContent);
console.log('✅ SANDVAULT pricing updated\n');

console.log('🎉 All pricing files updated with package image paths!');
