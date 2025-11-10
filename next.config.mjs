import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['replicate.delivery', 'pbxt.replicate.delivery'],
    formats: ['image/avif', 'image/webp']
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb'
    }
  }
}

export default withNextIntl(nextConfig)
