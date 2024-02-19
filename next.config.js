/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    // unoptimized - When true, the source image will be served as-is instead of changing quality,
    // size, or format. Defaults to false.
    images: {
        unoptimized: true
    }
}

module.exports = nextConfig
