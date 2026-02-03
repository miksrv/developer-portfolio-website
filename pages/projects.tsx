import React from 'react'

import Link from 'next/link'
import { NextSeo } from 'next-seo'

import { Icon, iconNames, PageTransition, Projects } from '@/components'
import { useSiteData } from '@/utils'

const ProjectsPage: React.FC = () => {
    const data = useSiteData()

    return (
        <>
            <NextSeo
                title={data?.seo?.projects?.title}
                description={data?.seo?.projects?.description}
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
                <section>
                    <h1 className={'pageTitle'}>{data?.seo?.projects?.title}</h1>
                    <p>{data?.seo?.projects?.description}</p>
                </section>
            </PageTransition>

            <Projects />

            <PageTransition>
                <section className={'footerLinks'}>
                    <Link
                        href={'/'}
                        title={'View about me'}
                    >
                        <Icon name={iconNames.left} />
                        {'About me'}
                    </Link>

                    <Link
                        href={'/experience'}
                        title={'View my experience'}
                    >
                        {'Experience'}
                        <Icon name={iconNames.right} />
                    </Link>
                </section>
            </PageTransition>
        </>
    )
}

export default ProjectsPage
