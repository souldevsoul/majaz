#!/bin/bash

# MAJAZ Package Image Generation Script
# Uses Ideogram V3 Turbo for high-quality, fast generation

API_KEY="${REPLICATE_API_TOKEN}"
MODEL="ideogram-ai/ideogram-v3-turbo"
OUTPUT_DIR="public/images/packages"

# Create output directory
mkdir -p "$OUTPUT_DIR"

echo "🚀 Starting MAJAZ package image generation with Ideogram V3 Turbo"
echo "📦 Generating 8 images..."
echo ""

# Function to generate and download image
generate_image() {
    local filename=$1
    local prompt=$2
    local style_type=${3:-"Realistic"}

    echo "🎨 Generating: $filename"
    echo "   Prompt: ${prompt:0:80}..."

    # Create prediction with Prefer: wait for synchronous response
    response=$(curl -s -X POST \
        -H "Authorization: Bearer $API_KEY" \
        -H "Content-Type: application/json" \
        -H "Prefer: wait" \
        -d "{
            \"version\": \"$MODEL\",
            \"input\": {
                \"prompt\": \"$prompt\",
                \"aspect_ratio\": \"3:2\",
                \"style_type\": \"$style_type\",
                \"magic_prompt_option\": \"On\"
            }
        }" \
        https://api.replicate.com/v1/predictions)

    # Extract image URL
    image_url=$(echo "$response" | jq -r '.output // .output[0] // empty')

    if [ -z "$image_url" ] || [ "$image_url" = "null" ]; then
        echo "   ❌ Failed to generate image"
        echo "   Response: $response"
        return 1
    fi

    # Download image
    curl -s "$image_url" -o "$OUTPUT_DIR/$filename"

    if [ -f "$OUTPUT_DIR/$filename" ]; then
        file_size=$(ls -lh "$OUTPUT_DIR/$filename" | awk '{print $5}')
        echo "   ✅ Downloaded: $filename ($file_size)"
    else
        echo "   ❌ Failed to download: $filename"
        return 1
    fi

    # Small delay to avoid rate limiting
    sleep 2

    return 0
}

# Track success/failure
success_count=0
total_count=8

# 1. Remote Assessment
if generate_image "remote-assessment.jpg" \
    "Professional businessman in tailored suit analyzing vehicle data on MacBook laptop in modern Dubai office with floor-to-ceiling windows, golden hour sunlight streaming through glass, luxury white marble desk, multiple digital screens displaying car analytics and charts, ultra detailed, cinematic commercial photography, Phase One IQ4 150MP camera, professional color grading" \
    "Realistic"; then
    ((success_count++))
fi

# 2. Remote Express
if generate_image "remote-express.jpg" \
    "Automotive inspector in pristine white lab coat holding iPad Pro examining luxury sports car in ultra-modern Dubai showroom, morning golden sunlight, polished marble floors reflecting vehicle, professional automotive photography, medium format Hasselblad H6D-400c, ultra detailed, premium aesthetic, commercial quality" \
    "Realistic"; then
    ((success_count++))
fi

# 3. Remote Same-Day
if generate_image "remote-same-day.jpg" \
    "Close-up photograph of manicured hands holding luxury iPad Pro displaying professional vehicle inspection report with graphs and car images, blurred luxury Dubai office in background, golden hour warm natural lighting, shallow depth of field f/1.4, professional editorial photography, Phase One IQ4, Zeiss Otus lens" \
    "Realistic"; then
    ((success_count++))
fi

# 4. On-Site Inspection
if generate_image "onsite-inspection.jpg" \
    "Professional certified vehicle inspector in MAJAZ branded uniform examining luxury car engine bay with professional diagnostic OBD2 scanner tools, modern Dubai service center garage, dramatic side lighting, ultra detailed automotive photography, cinematic composition, Phase One IQ4 camera, commercial automotive editorial" \
    "Realistic"; then
    ((success_count++))
fi

# 5. On-Site Express
if generate_image "onsite-express.jpg" \
    "Senior master inspector in premium MAJAZ attire using advanced professional diagnostic computer scanner on exotic luxury sports car, high-end authorized Dubai dealership service bay, cinematic dramatic lighting, ultra sharp details, professional automotive photography, medium format camera" \
    "Realistic"; then
    ((success_count++))
fi

# 6. Gold Concierge
if generate_image "gold-concierge.jpg" \
    "Elegant matte gold metallic membership card lying on polished black marble surface next to Ferrari and Lamborghini car keys with prancing horse logo, Dubai Burj Khalifa skyline at golden hour sunset in soft focus background, ultra premium luxury product photography, Phase One IQ4 150MP, perfect studio lighting, shallow depth of field, museum quality" \
    "Realistic"; then
    ((success_count++))
fi

# 7. Platinum Concierge
if generate_image "platinum-concierge.jpg" \
    "Platinum brushed metal membership card on white Carrara marble surface, blurred background showing exotic hypercar collection Bugatti Chiron McLaren P1 Rolls-Royce in private climate-controlled Dubai garage vault, cinematic three-point lighting, ultra luxury product photography, Phase One IQ4, museum quality, perfect composition" \
    "Realistic"; then
    ((success_count++))
fi

# 8. Diamond Concierge
if generate_image "diamond-concierge.jpg" \
    "Black obsidian membership card with embedded diamonds on dark polished stone pedestal, ultra-rare million-dollar hypercar collection Koenigsegg Jesko Pagani Huayra one-off custom cars in private underground vault, dramatic museum spotlighting, ultra luxury product photography, Phase One IQ4 camera, Hasselblad quality, cinematic lighting" \
    "Realistic"; then
    ((success_count++))
fi

echo ""
echo "============================================================"
echo "📊 GENERATION SUMMARY"
echo "============================================================"
echo "Success: $success_count / $total_count"
echo "Failed: $((total_count - success_count)) / $total_count"
echo "============================================================"
echo ""
echo "📁 Images saved to: $OUTPUT_DIR/"
echo ""

if [ $success_count -eq $total_count ]; then
    echo "🎉 All images generated successfully!"
    ls -lh "$OUTPUT_DIR/"
else
    echo "⚠️  Some images failed to generate. Check output above."
fi
