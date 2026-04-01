import React, { useEffect, useMemo } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { Icon, IconTypes } from '@/components'
import avatarPic from '@/public/avatar.webp'
import { update } from '@/update'
import { useSiteData } from '@/utils'

import { findEarliestDate } from './utils'

import styles from './styles.module.sass'

const divisor = 1000 * 60 * 60 * 24 * 365.2421897

export const Introduce: React.FC = () => {
    const data = useSiteData()

    const [myAge, setMyAge] = React.useState<string>('')
    const [myExp, setMyExp] = React.useState<string>('')

    const expTime = useMemo(() => {
        const firstDate = data?.experience?.[0]?.period ? findEarliestDate(data.experience) : null

        return new Date(firstDate ?? '2007-10-15T10:00:00').getTime()
    }, [data?.experience])

    const birthTime = useMemo(() => {
        return new Date(data?.biography?.birthDate ?? '1989-09-09T05:15:00').getTime()
    }, [data?.biography?.birthDate])

    const dateUpdate = new Date(update).toLocaleDateString('en-us', {
        day: 'numeric',
        month: 'short',
        weekday: 'long',
        year: 'numeric'
    })

    const tick = () => {
        setMyAge(((Date.now() - birthTime) / divisor).toFixed(9))
        setMyExp(((Date.now() - expTime) / divisor).toFixed(9))
    }

    useEffect(() => {
        const timer = setInterval(() => tick(), 100)

        return () => clearInterval(timer)
    }, [birthTime, expTime])

    return (
        <section className={styles.introduceSection}>
            {/* Avatar with animated glow ring */}
            <div className={styles.avatarWrapper}>
                <div
                    className={styles.avatarGlow}
                    aria-hidden={'true'}
                />
                <div className={styles.avatarContainer}>
                    <Image
                        src={avatarPic}
                        fill
                        sizes={'(max-width: 768px) 240px, 45vw'}
                        style={{ objectFit: 'cover' }}
                        alt={"Hi I'm - Misha - Picture of the author"}
                        priority
                    />
                </div>
            </div>

            <div className={styles.infoContainer}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <h1>
                            {"Hi I'm - "}
                            {/* eslint-disable-next-line react/jsx-max-depth */}
                            <span>{data?.biography?.name}</span>
                        </h1>

                        <div className={styles.links}>
                            {data?.contactLinks?.map((item) => (
                                <Link
                                    key={`link-${String(item.link)}`}
                                    href={item.link}
                                    title={item.label}
                                    aria-label={item.label}
                                    target={'_blank'}
                                    rel={'noopener noreferrer'}
                                    className={styles.link}
                                >
                                    <Icon name={item.icon as IconTypes} />
                                </Link>
                            ))}
                        </div>
                    </div>
                    <h3 className={styles.subTitle}>{data?.biography?.title}</h3>
                    {data?.biography?.availableForWork && (
                        <div
                            className={styles.openToWork}
                            title={'Open to new opportunities'}
                        >
                            <span
                                className={styles.openToWorkDot}
                                aria-hidden={'true'}
                            />
                            {'Open to opportunities'}
                        </div>
                    )}
                </div>

                {/* Live counter pills */}
                <div className={styles.counterPills}>
                    <div className={styles.pill}>
                        <span className={styles.pillValue}>{myAge}</span>
                        <span className={styles.pillLabel}>{'My age'}</span>
                    </div>
                    <div className={styles.pill}>
                        <span className={styles.pillValue}>{myExp}</span>
                        <span className={styles.pillLabel}>{'Experience'}</span>
                    </div>
                </div>

                {/* Location / Timezone / Updated */}
                <ul className={styles.factsList}>
                    {[
                        { title: 'Location', value: data?.biography?.location },
                        { title: 'Timezone', value: data?.biography?.timezone },
                        { title: 'Updated', value: dateUpdate }
                    ].map(({ title, value }) => (
                        <li key={`fact-${title}`}>
                            <div className={styles.key}>{title}</div>
                            <div className={styles.value}>{value}</div>
                        </li>
                    ))}
                </ul>

                <div className={styles.description}>
                    <p>
                        {'I design systems, define'} <b>{'technical direction'}</b>
                        {', and lead engineering teams through complete delivery cycles — from the first'}{' '}
                        <b>{'architecture decision'}</b> {'to live production at scale.'}
                    </p>
                    <p>
                        {
                            '19+ years of end-to-end ownership across government, media, and tech. I take products from 0 to launch and build the teams that sustain them.'
                        }
                    </p>
                </div>

                {/* CTA buttons */}
                <div className={styles.ctaGroup}>
                    <a
                        href={'#projects'}
                        className={styles.ctaPrimary}
                    >
                        {'View My Work'}
                    </a>
                    <a
                        href={'/'}
                        className={styles.ctaSecondary}
                        onClick={(event) => {
                            event.preventDefault()
                            window.print()
                        }}
                    >
                        {'Download CV'}
                    </a>
                    <a
                        href={'#contact'}
                        className={styles.ctaTertiary}
                    >
                        {'Contact Me'}
                    </a>
                </div>
            </div>
        </section>
    )
}
