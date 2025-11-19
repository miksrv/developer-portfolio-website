import React from 'react'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

import { About, Icon, iconNames, Introduce, PageTransition } from '@/components'

const GithubActivity = dynamic(() => import('@/components/github-activity/GithubActivity'), { ssr: false })

const MainPage: React.FC = () => (
    <>
        <NextSeo
            title={'Hi, Im Misha - Programmer, Engineer and Dreamer'}
            description={
                'I am a software engineer specializing in frontend and backend development for scalable web applications. With extensive experience in application development, testing, and managing both development teams and projects, I am focused on delivering high-quality and efficient solutions.'
            }
            openGraph={{
                images: [
                    {
                        height: 1333,
                        url: 'https://miksoft.pro/avatar.jpeg',
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

export default MainPage
