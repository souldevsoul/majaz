#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITES = {
  avtocert: {
    name: 'AVTOCERT',
    colors: {
      WHITE: [255, 255, 255],
      AZURE: [0, 120, 212],
      BLACK: [0, 0, 0],
      LIGHT_GREY: [245, 245, 245],
      DARK_GREY: [26, 26, 26]
    },
    hexColors: ['ffffff', '0078d4', '000000', 'f5f5f5', '1a1a1a'],
    forbiddenMentions: ['majaz', 'baku', 'eurograde', 'sandvault', 'boxcar']
  },
  'baku-drive-lab': {
    name: 'BAKU DRIVE LAB',
    colors: {
      BLACK: [0, 0, 0],
      CYBER_BLUE: [0, 217, 255],
      NEON_CYAN: [0, 255, 255],
      DARK: [10, 10, 10],
      SURFACE: [26, 26, 26]
    },
    hexColors: ['000000', '00d9ff', '00ffff', '0a0a0a', '1a1a1a'],
    forbiddenMentions: ['majaz', 'avtocert', 'eurograde', 'sandvault', 'boxcar']
  },
  eurograde: {
    name: 'EUROGRADE',
    colors: {
      WHITE: [255, 255, 255],
      NAVY: [0, 51, 102],
      STEEL: [108, 122, 137],
      LIGHT_GREY: [245, 245, 245],
      DARK_GREY: [26, 26, 26]
    },
    hexColors: ['ffffff', '003366', '6c7a89', 'f5f5f5', '1a1a1a'],
    forbiddenMentions: ['majaz', 'avtocert', 'baku', 'sandvault', 'boxcar']
  },
  sandvault: {
    name: 'SANDVAULT',
    colors: {
      BLACK: [0, 0, 0],
      GOLD: [212, 175, 55],
      SMOKE: [74, 74, 74],
      RICH_BLACK: [10, 10, 10],
      SURFACE: [26, 26, 26]
    },
    hexColors: ['000000', 'd4af37', '4a4a4a', '0a0a0a', '1a1a1a'],
    forbiddenMentions: ['majaz', 'avtocert', 'baku', 'eurograde', 'boxcar']
  }
};

function customizeESLintPlugin(siteKey, siteConfig) {
  const sitePath = `/Users/rentamac/Documents/repos/repos/carbox/${siteKey}`;
  const pluginPath = path.join(sitePath, 'eslint-plugin-product-quality', 'index.js');

  console.log(`\n🔧 Customizing ESLint plugin for ${siteConfig.name}...`);

  let content = fs.readFileSync(pluginPath, 'utf8');

  // Update brand name in descriptions
  content = content.replace(/MAJAZ/g, siteConfig.name);
  content = content.replace(/مجاز/g, ''); // Remove Arabic if not needed

  // Update brand colors section
  const colorNames = Object.keys(siteConfig.colors);
  const colorDefinitions = colorNames.map((name, idx) => {
    const rgb = siteConfig.colors[name];
    return `        const ${name} = [${rgb.join(', ')}]; // #${siteConfig.hexColors[idx] || 'color'}`;
  }).join('\n');

  content = content.replace(
    /const BLACK = \[17, 17, 17\];.*?const WHITE = \[255, 255, 255\];/s,
    colorDefinitions
  );

  // Update hex color validation
  content = content.replace(
    /return \['111111'.*?\].includes\(hex\);/,
    `return [${siteConfig.hexColors.map(c => `'${c}'`).join(', ')}].includes(hex);`
  );

  // Update forbidden mentions
  const forbiddenPatterns = siteConfig.forbiddenMentions.map(mention => {
    return `{ pattern: /\\b${mention}\\b/i, name: '${mention.toUpperCase()}' }`;
  }).join(',\n          ');

  content = content.replace(
    /const FORBIDDEN_MENTIONS = \[[\s\S]*?\];/,
    `const FORBIDDEN_MENTIONS = [\n          ${forbiddenPatterns}\n        ];`
  );

  fs.writeFileSync(pluginPath, content);
  console.log(`✅ Customized ESLint plugin for ${siteConfig.name}`);
}

function fixSiteContent(siteKey, siteConfig) {
  console.log(`\n🔨 Fixing content for ${siteConfig.name}...`);

  const sitePath = `/Users/rentamac/Documents/repos/repos/carbox/${siteKey}`;

  try {
    execSync(`cd "${sitePath}" && npm install`, { stdio: 'inherit' });
    console.log(`✅ Dependencies installed for ${siteConfig.name}`);
  } catch (error) {
    console.error(`⚠️  Error installing dependencies for ${siteConfig.name}`);
  }
}

async function main() {
  console.log('🚀 Starting comprehensive fix for all sites...\n');

  for (const [siteKey, siteConfig] of Object.entries(SITES)) {
    try {
      customizeESLintPlugin(siteKey, siteConfig);
      fixSiteContent(siteKey, siteConfig);
    } catch (error) {
      console.error(`❌ Error processing ${siteKey}:`, error.message);
    }
  }

  console.log('\n\n🎉 All sites processed!');
  console.log('\nNext steps:');
  console.log('1. Commit changes for each site');
  console.log('2. Push to their respective repositories');
}

main().catch(console.error);
