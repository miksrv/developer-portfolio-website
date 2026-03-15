import React from 'react'

import Link from 'next/link'
import { NextSeo } from 'next-seo'

import { Icon, iconNames, PageTransition, Skills, SkillsCloud } from '@/components'
import { useSiteData } from '@/utils'

const SkillsPage: React.FC = () => {
    const data = useSiteData()

    return (
        <>
            <NextSeo
                title={data?.seo?.skills?.title}
                description={data?.seo?.skills?.description}
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
                    <h1 className={'pageTitle'}>{data?.seo?.skills?.title}</h1>
                    <p>{data?.seo?.skills?.skillsIntro}</p>
                </section>

                <SkillsCloud />

                <Skills />

                <section className={'footerLinks'}>
                    <Link
                        href={'/experience'}
                        title={'View my experience'}
                    >
                        <Icon name={iconNames.left} />
                        {'Experience'}
                    </Link>
                </section>
            </PageTransition>
        </>
    )
}

export default SkillsPage
