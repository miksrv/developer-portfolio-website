import { NextSeo } from 'next-seo'
import React from 'react'

import About from '@/components/about/about'
import Projects from '@/components/projects/projects'
import Skills from '@/components/skills/skills'
import SocialNetworks from '@/components/social-networks/socialNetworks'

export default function Page() {
    return (
        <div className={'wrapperContent'}>
            <NextSeo
                title='Hi, Im Misha - Programmer, Engineer and Dreamer'
                description='I am a developer, create interactive information systems and complex web projects from scratch, doing technical support. I am fond of programming, tourism, photography, astronomy, radio electronics and some other.'
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
            <SocialNetworks />
            <Projects />
            <Skills />
        </div>
    )
}
