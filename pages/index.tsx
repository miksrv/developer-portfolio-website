import React from 'react'
import { motion, Variants } from 'framer-motion'

import { type GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import { NextSeo } from 'next-seo'

import { About, Contact, Experience, Introduce, Projects, Skills, SkillsCloud, Stats } from '@/components'
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

const printIcon = (
    <svg
        viewBox={'0 0 24 24'}
        fill={'none'}
        stroke={'currentColor'}
        strokeWidth={2}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
    >
        <polyline points={'6 9 6 2 18 2 18 9'} />
        <path d={'M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2'} />
        <rect
            x={'6'}
            y={'14'}
            width={'12'}
            height={'8'}
        />
    </svg>
)

const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
}

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
                            url: 'https://miksoft.pro/avatar.jpg',
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
                <GithubCalendar />
            </div>

            {/* ── Projects ────────────────────────────────────────────── */}
            <motion.div
                id={'projects'}
                className={styles.sectionBlock}
                aria-label={'Projects'}
                initial={'hidden'}
                whileInView={'visible'}
                viewport={{ once: true, amount: 0.08 }}
                variants={sectionVariants}
            >
                <section>
                    <h2 className={'pageTitle'}>{data?.seo?.projects?.title}</h2>
                    <p>{data?.seo?.projects?.description}</p>
                </section>

                <Projects />
            </motion.div>

            {/* ── Experience ──────────────────────────────────────────── */}
            <motion.div
                id={'experience'}
                className={styles.sectionBlock}
                aria-label={'Experience'}
                initial={'hidden'}
                whileInView={'visible'}
                viewport={{ once: true, amount: 0.04 }}
                variants={sectionVariants}
            >
                <section className={styles.sectionHeader}>
                    <div>
                        <h2 className={'pageTitle'}>{data?.seo?.experience?.title}</h2>
                        <p>{data?.seo?.experience?.description}</p>
                    </div>
                </section>

                <Experience />
            </motion.div>

            {/* ── Skills ──────────────────────────────────────────────── */}
            <motion.div
                id={'skills'}
                className={styles.sectionBlock}
                initial={'hidden'}
                whileInView={'visible'}
                viewport={{ once: true, amount: 0.04 }}
                variants={sectionVariants}
            >
                <section>
                    <h2 className={'pageTitle'}>{data?.seo?.skills?.title}</h2>
                    <p>{data?.seo?.skills?.skillsIntro}</p>
                </section>

                <SkillsCloud />

                <Skills />
            </motion.div>

            {/* ── Contact ─────────────────────────────────────────────── */}
            <motion.div
                id={'contact'}
                className={styles.sectionBlock}
                initial={'hidden'}
                whileInView={'visible'}
                viewport={{ once: true, amount: 0.1 }}
                variants={sectionVariants}
            >
                <Contact />
            </motion.div>
        </GithubDataProvider>
    )
}

export const getStaticProps: GetStaticProps<MainPageProps> = async () => {
    const githubData = await fetchGithubData()

    return { props: { githubData } }
}

export default MainPage
