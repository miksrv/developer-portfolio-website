import React from 'react'

import Link from 'next/link'
import { NextSeo } from 'next-seo'

import { Experience, Icon, iconNames, PageTransition } from '@/components'
import { useSiteData } from '@/utils'

import styles from './styles/experience.module.sass'

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

const ExperiencePage: React.FC = () => {
    const data = useSiteData()

    return (
        <>
            <NextSeo
                title={data?.seo?.experience?.title}
                description={data?.seo?.experience?.description}
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
                <section className={styles.pageHeader}>
                    <div>
                        <h1 className={'pageTitle'}>{data?.seo?.experience?.title}</h1>
                        <p>{data?.seo?.experience?.description}</p>
                    </div>
                    <button
                        className={styles.printButton}
                        onClick={() => window.print()}
                        title={'Download Resume as PDF'}
                    >
                        {printIcon}
                        {'Print Resume'}
                    </button>
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
            </PageTransition>
        </>
    )
}

export default ExperiencePage
