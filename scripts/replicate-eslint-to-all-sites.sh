#!/bin/bash

# Script to replicate ESLint enforcement to all 4 other sites

echo "🔄 Replicating ESLint enforcement to all sites..."

MAJAZ_ROOT="/Users/rentamac/Documents/repos/repos/carbox/majaz"
SITES=("avtocert" "baku-drive-lab" "eurograde" "sandvault")

for site in "${SITES[@]}"; do
    SITE_ROOT="/Users/rentamac/Documents/repos/repos/carbox/$site"

    echo ""
    echo "📋 Processing $site..."

    # Create eslint-plugin-product-quality directory
    mkdir -p "$SITE_ROOT/eslint-plugin-product-quality"

    # Copy the plugin
    cp "$MAJAZ_ROOT/eslint-plugin-product-quality/index.js" "$SITE_ROOT/eslint-plugin-product-quality/index.js"

    # Copy ESLint config
    cp "$MAJAZ_ROOT/eslint.config.mjs" "$SITE_ROOT/eslint.config.mjs"

    echo "✅ Copied ESLint plugin and config to $site"
done

echo ""
echo "🎉 ESLint enforcement replicated to all sites!"
echo ""
echo "Next steps:"
echo "1. Customize brand colors in each site's eslint-plugin-product-quality/index.js"
echo "2. Update forbidden mentions for each site"
echo "3. Run fixes on each site"
