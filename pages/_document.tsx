import { Head, Html, Main, NextScript } from 'next/document'

import data from '@/public/data.json'

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: data.biography.name,
    jobTitle: data.biography.title,
    url: 'https://miksoft.pro',
    image: 'https://miksoft.pro/avatar.webp',
    address: {
        '@type': 'PostalAddress',
        addressLocality: data.biography.location
    },
    sameAs: data.contactLinks.map((l) => l.link)
}

export default function Document() {
    return (
        <Html lang={'en'}>
            <Head>
                <link
                    rel={'preconnect'}
                    href={'https://api.github.com'}
                />
                <script
                    type={'application/ld+json'}
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
