import React, { useEffect } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { Icon, IconTypes } from '@/components'
import { experience } from '@/data/experience'
import avatarPic from '@/public/avatar.jpg'
import { update } from '@/update'
import { useSiteData } from '@/utils'

import { FactType } from './types'
import { findEarliestDate } from './utils'

import styles from './styles.module.sass'

const divisor = 1000 * 60 * 60 * 24 * 365.2421897
const birthTime = new Date('1989-09-09T05:15:00').getTime()
const expTime = new Date(findEarliestDate(experience) ?? '2007-10-15T10:00:00').getTime()

export const Introduce: React.FC = () => {
    const data = useSiteData()

    const [myAge, setMyAge] = React.useState<string>('')
    const [myExp, setMyExp] = React.useState<string>('')

    const dateUpdate = new Date(update).toLocaleDateString('en-us', {
        day: 'numeric',
        month: 'short',
        weekday: 'long',
        year: 'numeric'
    })

    const tick = () => {
        const ageCalc = ((Date.now() - birthTime) / divisor).toFixed(9)
        const expCalc = ((Date.now() - expTime) / divisor).toFixed(9)

        setMyAge(ageCalc)
        setMyExp(expCalc)
    }

    const factsList: FactType[] = [
        {
            title: 'My age',
            value: myAge
        },
        {
            title: 'Experience',
            value: myExp
        },
        {
            title: 'Location',
            value: data?.biography?.location
        },
        {
            title: 'Timezone',
            value: data?.biography?.timezone
        },
        {
            title: 'Updated',
            value: dateUpdate
        }
    ]

    useEffect(() => {
        const timer = setInterval(() => tick(), 50)

        return () => clearInterval(timer)
    }, [])

    return (
        <section className={styles.introduceSection}>
            <div className={styles.avatarContainer}>
                <Image
                    src={avatarPic}
                    layout={'fill'}
                    objectFit={'cover'}
                    // eslint-disable-next-line quotes
                    alt={"Hi I'm - Misha - Picture of the author"}
                />
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <h1>
                            {/* eslint-disable-next-line quotes */}
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
                                    target={'_blank'}
                                    className={styles.link}
                                >
                                    <Icon name={item.icon as IconTypes} />
                                </Link>
                            ))}
                        </div>
                    </div>
                    <h3 className={styles.subTitle}>{data?.biography?.title}</h3>
                </div>

                <ul className={styles.factsList}>
                    {factsList?.map(({ title, value }) => (
                        <li key={`fact-${String(title)}`}>
                            <div className={styles.key}>{title}</div>
                            <div className={styles.value}>{value}</div>
                        </li>
                    ))}
                </ul>

                <div className={styles.description}>
                    <p>
                        {'I’m a'} <b>{'Fullstack Software Engineer'}</b>{' '}
                        {'specializing in scalable web applications, working across both'} <b>{'frontend'}</b> and{' '}
                        <b>{'backend'}</b>{' '}
                        {
                            'development. With a focus on delivering efficient and high-quality solutions, I manage projects for clients in various industries.'
                        }
                    </p>
                    <p>
                        {
                            'In my free time, you can often find me exploring the night skies with my homemade observatory or enjoying travel adventures with my family.'
                        }
                    </p>
                </div>
            </div>
        </section>
    )
}
