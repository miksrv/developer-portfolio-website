/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: false
    },
    // unoptimized - When true, the source image will be served as-is instead of changing quality,
    // size, or format. Defaults to false.
    images: {
        unoptimized: true
    }
}

module.exports = nextConfig
