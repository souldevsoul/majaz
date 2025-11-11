import Replicate from 'replicate'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { packages } from '../data/packages'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

async function downloadImage(url: string, filepath: string) {
  const response = await fetch(url)
  const buffer = await response.arrayBuffer()
  await writeFile(filepath, Buffer.from(buffer))
  console.log(`✅ Downloaded: ${filepath}`)
}

async function generatePackageImage(packageId: string, prompt: string, filename: string) {
  console.log(`\n🎨 Generating image for: ${packageId}`)
  console.log(`📝 Prompt: ${prompt.substring(0, 100)}...`)

  try {
    const output = await replicate.run(
      "google/imagen-4-ultra:e3a905e13f52f4dc43e84bb6e76e3e5fef3e0e4614f65a7d62e6aeb67419c5aa",
      {
        input: {
          prompt,
          output_format: "jpg",
          output_quality: 95,
          aspect_ratio: "3:2"
        }
      }
    ) as any

    const imageUrl = output.url || output[0] || output

    // Ensure directory exists
    const dir = join(process.cwd(), 'public', 'images', 'packages')
    await mkdir(dir, { recursive: true })

    // Download image
    const filepath = join(dir, filename)
    await downloadImage(imageUrl, filepath)

    return `/images/packages/${filename}`
  } catch (error) {
    console.error(`❌ Error generating ${packageId}:`, error)
    throw error
  }
}

async function main() {
  console.log('🚀 Starting package image generation...\n')
  console.log(`📦 Total packages to generate: ${packages.length}\n`)

  const results = []

  for (const pkg of packages) {
    const filename = `${pkg.slug}.jpg`

    try {
      const path = await generatePackageImage(
        pkg.id,
        pkg.imagePrompt,
        filename
      )

      results.push({
        id: pkg.id,
        name: pkg.name,
        path,
        success: true
      })

      // Wait 2 seconds between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000))
    } catch (error) {
      results.push({
        id: pkg.id,
        name: pkg.name,
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false
      })
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log('📊 GENERATION SUMMARY')
  console.log('='.repeat(60))
  console.log(`Total: ${results.length}`)
  console.log(`Success: ${results.filter(r => r.success).length}`)
  console.log(`Failed: ${results.filter(r => !r.success).length}`)
  console.log('='.repeat(60))

  console.log('\n✅ Successful generations:')
  results.filter(r => r.success).forEach(r => {
    console.log(`  - ${r.name}: ${r.path}`)
  })

  if (results.some(r => !r.success)) {
    console.log('\n❌ Failed generations:')
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.name}: ${r.error}`)
    })
  }

  console.log('\n🎉 Image generation complete!')
  console.log('📁 Images saved to: public/images/packages/')
  console.log('\n💡 Next step: Update data/packages.ts with image paths')
}

main().catch(console.error)
