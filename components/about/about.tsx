'use client'

import Image from 'next/image'
import React from 'react'

import avatarPic from '@/public/avatar.jpg'

import { update } from '@/update'

import styles from './about.module.css'

export const About: React.FC = () => {
    const [myAge, setMyAge] = React.useState<string>('')
    const [myExp, setMyExp] = React.useState<string>('')

    const divisor = 1000 * 60 * 60 * 24 * 365.2421897
    const birthTime = new Date('1989-09-09T05:15:00').getTime()
    const expTime = new Date('2007-10-15T10:00:00').getTime()

    const tick = () => {
        const ageCalc = ((Date.now() - birthTime) / divisor).toFixed(9)
        const expCalc = ((Date.now() - expTime) / divisor).toFixed(9)

        setMyAge(ageCalc)
        setMyExp(expCalc)
    }

    React.useEffect(() => {
        const timer = setInterval(() => tick(), 50)

        return () => clearInterval(timer)
    })

    return (
        <section>
            <div className={styles.grid}>
                <Image
                    className={styles.avatar}
                    src={avatarPic}
                    alt="Hi I'm - Misha - Picture of the author"
                    width={278}
                    height={360}
                />
                <div className={styles.describe}>
                    <h1 className={styles.sectionTitle}>
                        Hi I&apos;m -{' '}
                        <span className={styles.sectionTitleSecond}>Misha</span>
                    </h1>
                    <h3 className={styles.subTitle}>
                        Programmer, Engineer and Dreamer
                    </h3>
                    <div className={styles.divider} />
                    <div className={styles.gridList}>
                        <div className={styles.gridKey}>My age</div>
                        <div className={styles.gridValue}>{myAge}</div>
                    </div>
                    <div className={styles.gridList}>
                        <div className={styles.gridKey}>Experience</div>
                        <div className={styles.gridValue}>{myExp}</div>
                    </div>
                    <div className={styles.gridList}>
                        <div className={styles.gridKey}>Updated</div>
                        <div className={styles.gridValue}>{update}</div>
                    </div>
                    <p className={styles.description}>
                        I am a developer, create interactive information systems
                        and complex web projects from scratch, doing technical
                        support. I am fond of programming, tourism, photography,
                        astronomy, radio electronics and some other.
                    </p>
                    <p className={styles.description}>
                        I run my own projects and am always ready to communicate
                        with interesting people. You can Contact me in any
                        convenient way.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default About
