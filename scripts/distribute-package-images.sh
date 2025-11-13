#!/bin/bash

# Distribute package images to all sites

echo "📦 Distributing package images to all sites..."

# Source directory
SOURCE_DIR="/Users/rentamac/Documents/repos/repos/carbox/majaz/public/images/packages"

# Copy to AVTOCERT
echo "📋 Copying to AVTOCERT..."
mkdir -p "/Users/rentamac/Documents/repos/repos/carbox/avtocert/public/images/packages"
cp -r "$SOURCE_DIR/avtocert" "/Users/rentamac/Documents/repos/repos/carbox/avtocert/public/images/packages/"

# Copy to BAKU DRIVE LAB
echo "🏎️  Copying to BAKU DRIVE LAB..."
mkdir -p "/Users/rentamac/Documents/repos/repos/carbox/baku-drive-lab/public/images/packages"
cp -r "$SOURCE_DIR/bakuDriveLab" "/Users/rentamac/Documents/repos/repos/carbox/baku-drive-lab/public/images/packages/"

# Copy to EUROGRADE
echo "🇪🇺 Copying to EUROGRADE..."
mkdir -p "/Users/rentamac/Documents/repos/repos/carbox/eurograde/public/images/packages"
cp -r "$SOURCE_DIR/eurograde" "/Users/rentamac/Documents/repos/repos/carbox/eurograde/public/images/packages/"

# Copy to SANDVAULT
echo "🔒 Copying to SANDVAULT..."
mkdir -p "/Users/rentamac/Documents/repos/repos/carbox/sandvault/public/images/packages"
cp -r "$SOURCE_DIR/sandvault" "/Users/rentamac/Documents/repos/repos/carbox/sandvault/public/images/packages/"

# Copy main site images too
echo "🏠 Copying main site images..."
cp -r "$SOURCE_DIR/majaz" "/Users/rentamac/Documents/repos/repos/carbox/majaz/public/images/packages/"
cp -r "$SOURCE_DIR/../majaz" "/Users/rentamac/Documents/repos/repos/carbox/avtocert/public/images/"
cp -r "$SOURCE_DIR/../avtocert" "/Users/rentamac/Documents/repos/repos/carbox/avtocert/public/images/"
cp -r "$SOURCE_DIR/../bakuDriveLab" "/Users/rentamac/Documents/repos/repos/carbox/baku-drive-lab/public/images/"
cp -r "$SOURCE_DIR/../eurograde" "/Users/rentamac/Documents/repos/repos/carbox/eurograde/public/images/"
cp -r "$SOURCE_DIR/../sandvault" "/Users/rentamac/Documents/repos/repos/carbox/sandvault/public/images/"

echo "✅ All package images distributed successfully!"
