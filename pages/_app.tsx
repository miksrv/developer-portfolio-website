import React from 'react'

import { AppProps } from 'next/app'
import Head from 'next/head'

import { Header, StarField } from '@/components'

import '@/styles/theme.css'
import '@/styles/globals.sass'

const App = ({ Component, pageProps }: AppProps) => (
    <>
        <Head>
            <meta
                name={'mobile-web-app-capable'}
                content={'yes'}
            />
            <meta
                name={'viewport'}
                content={'width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no'}
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

        <Header />

        <StarField
            starCount={1000}
            starColor={[255, 255, 255]}
            speedFactor={0.05}
            backgroundColor={'black'}
        />

        <main>
            <Component {...pageProps} />
        </main>

        {process.env.NODE_ENV === 'production' && (
            <div
                dangerouslySetInnerHTML={{
                    __html: '<!-- Yandex.Metrika counter --> <script type="text/javascript" > (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)}; m[i].l=1*new Date(); for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }} k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)}) (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym"); ym(67613284, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true }); </script> <noscript><div><img src="https://mc.yandex.ru/watch/67613284" style="position:absolute; left:-9999px;" alt="" /></div></noscript> <!-- /Yandex.Metrika counter -->'
                }}
            />
        )}
    </>
)

export default App
