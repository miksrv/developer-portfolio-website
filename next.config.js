/** @type {import('next').NextConfig} */
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const nextConfig = {
    output: 'export',
    bundlePagesRouterDependencies: true,
    serverExternalPackages: ['react-activity-calendar', 'react-github-calendar'],
    images: {
        unoptimized: true
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.module.rules.forEach((rule) => {
                if (rule.oneOf) {
                    rule.oneOf.forEach((one) => {
                        if (one.use && one.use.loader === 'next-style-loader') {
                            one.use.loader = MiniCssExtractPlugin.loader
                        }
                    })
                }
            })

            config.plugins.push(
                new MiniCssExtractPlugin({
                    filename: 'static/css/[name].[contenthash].css'
                })
            )
        }

        return config
    }
}

module.exports = nextConfig
