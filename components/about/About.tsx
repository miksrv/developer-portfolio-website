import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import styles from './styles.module.sass'

import Icon from '@/components/icon'
import { IconTypes } from '@/components/icon/types'
import avatarPic from '@/public/avatar.jpg'
import { update } from '@/update'

type FactType = {
    title?: string
    value?: string
}

type LinkType = {
    link: string
    label: string
    icon: IconTypes
}

export const About: React.FC = () => {
    const [myAge, setMyAge] = React.useState<string>('')
    const [myExp, setMyExp] = React.useState<string>('')

    const divisor = 1000 * 60 * 60 * 24 * 365.2421897
    const birthTime = new Date('1989-09-09T05:15:00').getTime()
    const expTime = new Date('2007-10-15T10:00:00').getTime()

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
            value: 'California, USA'
        },
        {
            title: 'Updated',
            value: dateUpdate
        }
    ]

    const linksList: LinkType[] = [
        {
            icon: 'github',
            label: 'GitHub',
            link: 'https://github.com/miksrv'
        },
        {
            icon: 'telegram',
            label: 'Telegram',
            link: 'https://t.me/miksoft'
        },
        {
            icon: 'facebook',
            label: 'Facebook',
            link: 'https://facebook.com/miksoft.pro'
        },
        {
            icon: 'linkedin',
            label: 'LinkedIn',
            link: 'https://www.linkedin.com/in/mikcatsvill/'
        }
    ]

    React.useEffect(() => {
        const timer = setInterval(() => tick(), 50)

        return () => clearInterval(timer)
    }, [])

    return (
        <section className={styles.aboutSection}>
            <div className={styles.avatarContainer}>
                <Image
                    className={styles.avatar}
                    src={avatarPic}
                    layout={'fill'}
                    objectFit={'cover'}
                    alt={"Hi I'm - Misha - Picture of the author"}
                />
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <h1>
                            {"Hi I'm - "}
                            <span>{'Misha'}</span>
                        </h1>

                        <div className={styles.links}>
                            {linksList?.map((item, i) => (
                                <Link
                                    key={`link-${i}`}
                                    href={item.link}
                                    title={item.label}
                                    target={'_blank'}
                                    className={styles.link}
                                >
                                    <Icon name={item.icon} />
                                </Link>
                            ))}
                        </div>
                    </div>
                    <h3 className={styles.subTitle}>{'Software Engineer, Astronomer and Dreamer'}</h3>
                </div>

                <ul className={styles.factsList}>
                    {factsList?.map(({ title, value }, i) => (
                        <li key={`fact-${i}`}>
                            <div className={styles.key}>{title}</div>
                            <div className={styles.value}>{value}</div>
                        </li>
                    ))}
                </ul>

                <div className={styles.description}>
                    <p>
                        {
                            'I am a software engineer specializing in frontend and backend development for scalable web applications. With extensive experience in application development, testing, and managing both development teams and projects, I am focused on delivering high-quality and efficient solutions.'
                        }
                    </p>
                    <p>
                        {
                            'Outside of work, I enjoy traveling and amateur astronomy with my family. You can learn more about my personal projects on this website.'
                        }
                    </p>
                </div>
            </div>
        </section>
    )
}

export default About
