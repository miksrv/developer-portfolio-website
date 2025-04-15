const fs = require('fs')
const path = require('path')

const BASE_URL = 'https://miksoft.pro'
const staticPages = ['', 'experience', 'projects', 'skills']

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
    .map((page) => {
        const route = page ? `/${page}` : ''
        return `  <url>
    <loc>${BASE_URL}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    })
    .join('\n')}
</urlset>`

const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml')
fs.writeFileSync(outputPath, sitemap.trim())

console.info(`✅ Sitemap successfully created: ${outputPath}`)
