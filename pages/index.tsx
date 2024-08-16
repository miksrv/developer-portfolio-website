import React from 'react'
import { NextSeo } from 'next-seo'

import About from '@/components/about/about'
import Projects from '@/components/projects/projects'
import Skills from '@/components/skills/skills'
import SkillsCloud from '@/components/skills-cloud/skillsCloud'
import SocialNetworks from '@/components/social-networks/socialNetworks'

const Page: React.FC = () => (
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
        <p className={'subTitleInfo'}>
            This is a small part of my amateur projects that I continue to support. My hobbies are astronomy and
            programming and this is perfectly reflected in the following projects:
        </p>
        <Projects />
        <h2 className={'subTitle'}>My Experience</h2>
        <p className={'subTitleInfo'}>
            I have over 16 years of experience in creating software for a variety of clients - from government agencies
            to private companies. Below is a brief overview of my main technical skills and technologies that I use most
            frequently. I set the level of technology proficiency to be approximate, depending on the number of projects
            in which this technology was used and how often I use it. The longer I do not use any technology, the lower
            the level will be.
        </p>
        <Skills />
        <h2 className={'subTitle'}>Technical Skills Cloud</h2>
        <p className={'subTitleInfo'}>
            In my work and hobbies, I use not only the skills of a front-end developer, but also those who know the
            areas of analytics, devops engineering, database architect, web designer, API backend development and much
            more. Here is the stack of useful technologies I use the most.
        </p>
        <SkillsCloud />
    </div>
)

export default Page
