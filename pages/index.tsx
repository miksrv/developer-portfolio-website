import React from 'react'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

import { About, Icon, iconNames, Introduce, PageTransition } from '@/components'
import { useSiteData } from '@/utils'

const GithubActivity = dynamic(() => import('@/components/github-activity/GithubActivity'), { ssr: false })

const MainPage: React.FC = () => {
    const data = useSiteData()

    return (
        <>
            <NextSeo
                title={data?.seo?.index?.title}
                description={data?.seo?.index?.description}
                openGraph={{
                    images: [
                        {
                            height: 1333,
                            url: 'https://miksoft.pro/avatar.jpg',
                            width: 1000
                        }
                    ],
                    locale: 'en-US',
                    siteName: 'miksoft.pro'
                }}
            />

            <PageTransition>
                <Introduce />

                <About />

                <GithubActivity />

                <section className={'footerLinks'}>
                    <Link
                        href={'/projects'}
                        title={'View my pet projects'}
                    >
                        {'Projects'}
                        <Icon name={iconNames.right} />
                    </Link>
                </section>
            </PageTransition>
        </>
    )
}

export default MainPage
