import React from 'react'

import Link from 'next/link'
import { NextSeo } from 'next-seo'

import { Icon, iconNames, PageTransition, Skills, SkillsCloud } from '@/components'

const SkillsPage: React.FC = () => (
    <>
        <NextSeo
            title={'My technical skills'}
            description={
                'With over 19+ years of experience in software development for clients ranging from government agencies to private companies, I’ve built a broad skill set across various technologies. Below is a summary of my key technical skills, ranked by usage frequency and proficiency based on past projects. My expertise spans frontend and backend development, analytics, DevOps, database architecture, web design, and API development, all of which I regularly employ in both professional work and personal projects.'
            }
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
                <h1 className={'pageTitle'}>{'My technical skills'}</h1>
                <p>
                    {
                        'With over 19+ years of experience in software development for clients ranging from government agencies to private companies, I’ve built a broad skill set across various technologies. Below is a summary of my key technical skills, ranked by usage frequency and proficiency based on past projects. My expertise spans frontend and backend development, analytics, DevOps, database architecture, web design, and API development, all of which I regularly employ in both professional work and personal projects. Here’s a look at the tech stack I rely on the most.'
                    }
                </p>
            </section>

            <Skills />

            <SkillsCloud />

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

export default SkillsPage
