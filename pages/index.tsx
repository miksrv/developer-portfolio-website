import React from 'react'

import { type GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import { NextSeo } from 'next-seo'

import {
    About,
    Contact,
    Experience,
    GithubLanguages,
    GithubRepos,
    GithubSparkline,
    GithubStats,
    Introduce,
    Projects,
    Skills,
    SkillsCloud,
    Stats
} from '@/components'
import { GithubDataProvider, useSiteData } from '@/utils'
import { fetchGithubData, type GithubData } from '@/utils/github-fetch'

import styles from './styles/index.module.sass'

const GithubCalendar = dynamic(() => import('@/components/github-calendar/GithubCalendar'), {
    loading: () => (
        <section
            className={styles.githubSkeleton}
            aria-label={'Loading GitHub activity'}
            aria-busy={'true'}
            role={'status'}
        />
    ),
    ssr: false
})

type MainPageProps = {
    githubData: GithubData
}

const MainPage: React.FC<MainPageProps> = ({ githubData }) => {
    const data = useSiteData()

    return (
        <GithubDataProvider data={githubData}>
            <NextSeo
                title={data?.seo?.index?.title}
                description={data?.seo?.index?.description}
                openGraph={{
                    images: [
                        {
                            height: 1333,
                            url: 'https://miksoft.pro/avatar.webp',
                            width: 1000
                        }
                    ],
                    locale: 'en-US',
                    siteName: 'miksoft.pro'
                }}
            />

            {/* ── Hero / About me ─────────────────────────────────────── */}
            <div id={'intro'}>
                <Introduce />
                <Stats />
                <About />
            </div>

            {/* ── GitHub Activity ─────────────────────────────────────── */}
            <div
                id={'activity'}
                className={styles.sectionBlock}
                aria-label={'GitHub Activity'}
            >
                <section>
                    <h2 className={'pageTitle'}>{data?.seo?.activity?.title}</h2>
                    <p>{data?.seo?.activity?.description}</p>
                </section>
                <GithubCalendar />
                <GithubStats />
                <GithubLanguages />
                <GithubSparkline />
                <GithubRepos />
            </div>

            {/* ── Projects ────────────────────────────────────────────── */}
            <div
                id={'projects'}
                className={styles.sectionBlock}
                aria-label={'Projects'}
            >
                <section>
                    <h2 className={'pageTitle'}>{data?.seo?.projects?.title}</h2>
                    <p>{data?.seo?.projects?.description}</p>
                </section>

                <Projects />
            </div>

            {/* ── Experience ──────────────────────────────────────────── */}
            <div
                id={'experience'}
                className={styles.sectionBlock}
                aria-label={'Experience'}
            >
                <section className={styles.sectionHeader}>
                    <div>
                        <h2 className={'pageTitle'}>{data?.seo?.experience?.title}</h2>
                        <p>{data?.seo?.experience?.description}</p>
                    </div>
                </section>

                <Experience />
            </div>

            {/* ── Skills ──────────────────────────────────────────────── */}
            <div
                id={'skills'}
                className={styles.sectionBlock}
            >
                <section>
                    <h2 className={'pageTitle'}>{data?.seo?.skills?.title}</h2>
                    <p>{data?.seo?.skills?.skillsIntro}</p>
                </section>

                <SkillsCloud />

                <Skills />
            </div>

            {/* ── Contact ─────────────────────────────────────────────── */}
            <div
                id={'contact'}
                className={styles.sectionBlock}
            >
                <Contact />
            </div>
        </GithubDataProvider>
    )
}

export const getStaticProps: GetStaticProps<MainPageProps> = async () => {
    const githubData = await fetchGithubData()

    return { props: { githubData } }
}

export default MainPage
