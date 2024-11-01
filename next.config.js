/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    // unoptimized - When true, the source image will be served as-is instead of changing quality,
    // size, or format. Defaults to false.
    // TODO: first needed to install 'babel-plugin-react-compiler'
    // experimental: {
    //     reactCompiler: true,
    // },
    // Automatically bundle external packages in the Pages Router:
    bundlePagesRouterDependencies: true,
    // Opt specific packages out of bundling for both App и Pages Router:
    serverExternalPackages: ['react-activity-calendar', 'react-github-calendar'],
    images: {
        unoptimized: true
    }
}

module.exports = nextConfig
