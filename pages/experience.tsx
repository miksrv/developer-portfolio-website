import React from 'react'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

import Experience from '@/components/experience'
import Icon from '@/components/icon'
import { iconNames } from '@/components/icon/types'

const ProjectsPage: React.FC = () => (
    <>
        <NextSeo
            title={'Experience'}
            description={''}
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

        <section>
            <h1 className={'pageTitle'}>{'My experience'}</h1>
            <p>
                {
                    'Over the course of my career as a Fullstack Developer, I’ve had the opportunity to work on a wide range of projects, from scalable web applications to custom backend systems. I specialize in frontend development but have significant experience across the full technology stack. Throughout my roles, I’ve consistently delivered efficient and robust solutions while leading teams, mentoring developers, and collaborating with cross-functional teams to achieve project goals.'
                }
            </p>
            <br />
            <p>
                {
                    'My work has spanned various industries, including media, fintech, and e-commerce, where I’ve been responsible for everything from developing new features to optimizing large-scale applications for performance and reliability.'
                }
            </p>
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
    </>
)

export default ProjectsPage
