import React from 'react'

import Link from 'next/link'
import { NextSeo } from 'next-seo'

import { Experience, Icon, iconNames, PageTransition } from '@/components'
import { useSiteData } from '@/utils'

const ProjectsPage: React.FC = () => {
    const data = useSiteData()

    return (
        <>
            <NextSeo
                title={data?.seo?.experience?.title}
                description={data?.seo?.experience?.description}
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
                    <h1 className={'pageTitle'}>{data?.seo?.experience?.title}</h1>
                    <p>{data?.seo?.experience?.description}</p>
                </section>

                <Experience />

                <section className={'footerLinks'}>
                    <Link
                        href={'/projects'}
                        title={'View my pet projects'}
                    >
                        <Icon name={iconNames.left} />
                        {'Projects'}
                    </Link>

                    <Link
                        href={'/skills'}
                        title={'View my technical skills'}
                    >
                        {'Skills'}
                        <Icon name={iconNames.right} />
                    </Link>
                </section>
            </PageTransition>
        </>
    )
}

export default ProjectsPage
