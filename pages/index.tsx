import { NextSeo } from 'next-seo'
import React from 'react'

import About from '@/components/about/about'
import Projects from '@/components/projects/projects'
import Skills from '@/components/skills/skills'
import SocialNetworks from '@/components/social-networks/socialNetworks'

const Page: React.FC = () => {
    return (
        <div className={'wrapperContent'}>
            <NextSeo
                title='Hi, Im Misha - Programmer, Engineer and Dreamer'
                description='Hi, my name is Misha and Im a senior software engineer. Welcome to my personal website!'
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
            <h2 className={'subTitle'}>What I do</h2>
            <Projects />
            <h2 className={'subTitle'}>My Experience</h2>
            <p className={'subTitleInfo'}>
                I have over 15 years of experience in creating software for a
                variety of clients - from government agencies to private
                companies. Below is a brief overview of my main technical skills
                and technologies that I use most frequently. I set the level of
                technology proficiency to be approximate, depending on the
                number of projects in which this technology was used and how
                often I use it. The longer I do not use any technology, the
                lower the level will be.
            </p>
            <Skills />
        </div>
    )
}

export default Page
