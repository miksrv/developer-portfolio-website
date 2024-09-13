import React from 'react'
import { NextSeo } from 'next-seo'

import About from '@/components/about'
import ExternalLinks from '@/components/external-links'

const MainPage: React.FC = () => (
    <>
        <NextSeo
            title={'Hi, Im Misha - Programmer, Engineer and Dreamer'}
            description={'I am a software engineer specializing in frontend and backend development for scalable web applications. With extensive experience in application development, testing, and managing both development teams and projects, I am focused on delivering high-quality and efficient solutions.'}
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

        <About />
        <ExternalLinks />
    </>
)

export default MainPage
