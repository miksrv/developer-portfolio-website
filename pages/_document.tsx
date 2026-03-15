import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang={'en'}>
            <Head>
                <link
                    rel={'preconnect'}
                    href={'https://api.github.com'}
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
