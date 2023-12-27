/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["images.unsplash.com"]
  },
  env: {
    PRIVATE_KEY: 'YOUR_PRIVATE_KEY',
    ALCHEMY_GOERLI_KEY: 'YOUR_ALCHEMY_GOERLI_KEY',
  }
}

module.exports = nextConfig
