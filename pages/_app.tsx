import React, { useEffect, useState } from 'react'

import { AppProps, NextWebVitalsMetric } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'

import { Footer, Header, PrintResume, StarField } from '@/components'
import { DataProvider, ThemeProvider } from '@/utils'

import '@/styles/theme.css'
import '@/styles/globals.sass'

const App = ({ Component, pageProps }: AppProps) => {
    const [starCount, setStarCount] = useState(1000)
    const router = useRouter()
    const is404 = router.pathname === '/404'

    useEffect(() => {
        if (window.innerWidth <= 768) {
            setStarCount(400)
        }
    }, [])

    return (
        <>
            <Head>
                <meta
                    name={'mobile-web-app-capable'}
                    content={'yes'}
                />
                <meta
                    name={'viewport'}
                    content={'width=device-width, initial-scale=1, shrink-to-fit=no'}
                />
                <meta
                    name={'apple-mobile-web-app-status-bar-style'}
                    content={'black-translucent'}
                />
                <meta
                    name={'theme-color'}
                    content={'#1b1b1b'}
                    media={'(prefers-color-scheme: dark)'}
                />
                <meta
                    name={'theme-color'}
                    content={'#1b1b1b'}
                />
                <link
                    rel={'apple-touch-icon'}
                    sizes={'180x180'}
                    href={'/apple-touch-icon.png'}
                />
                <link
                    rel={'icon'}
                    type={'image/png'}
                    sizes={'32x32'}
                    href={'/favicon-32x32.png'}
                />
                <link
                    rel={'icon'}
                    type={'image/png'}
                    sizes={'16x16'}
                    href={'/favicon-16x16.png'}
                />
                <link
                    rel={'icon'}
                    href={'/favicon.ico'}
                    type={'image/x-icon'}
                />
                <link
                    rel={'manifest'}
                    href={'/site.webmanifest'}
                />
            </Head>

            <StarField
                starCount={starCount}
                starColor={[255, 255, 255]}
                speedFactor={0.05}
                backgroundColor={'black'}
            />

            <ThemeProvider>
                <DataProvider>
                    <a
                        href={'#main-content'}
                        className={'skipLink'}
                    >
                        {'Skip to main content'}
                    </a>

                    {!is404 && <Header />}

                    <main id={'main-content'}>
                        <Component {...pageProps} />
                    </main>

                    {!is404 && <PrintResume />}
                    {!is404 && <Footer />}
                </DataProvider>
            </ThemeProvider>

            {process.env.NODE_ENV === 'production' && (
                <>
                    {/* Yandex.Metrika counter */}
                    <Script
                        id={'yandex-metrika'}
                        strategy={'afterInteractive'}
                    >
                        {`
                            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                            m[i].l=1*new Date();
                            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                            ym(67613284, "init", {
                                clickmap:true,
                                referrer: document.referrer,
                                url: location.href,
                                accurateTrackBounce:true,
                                trackLinks:true
                            });
                        `}
                    </Script>
                    <noscript>
                        <div>
                            <img
                                src={'https://mc.yandex.ru/watch/67613284'}
                                style={{ position: 'absolute', left: '-9999px' }}
                                alt={''}
                            />
                        </div>
                    </noscript>
                </>
            )}
        </>
    )
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
    if (process.env.NODE_ENV === 'production') {
        // eslint-disable-next-line no-console
        console.log(metric)
    }
}

export default App
