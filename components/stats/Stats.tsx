import React, { useEffect, useRef } from 'react'
import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion'

import { findEarliestDate } from '@/components/introduce/utils'
import { useGithubData, useSiteData } from '@/utils'
import { calculateStreak } from '@/utils/github-streak'

import styles from './styles.module.sass'

type StatItemProps = {
    value: number
    suffix?: string
    label: string
    delay?: number
}

const StatItem: React.FC<StatItemProps> = ({ value, suffix = '', label, delay = 0 }) => {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true })
    const count = useMotionValue(0)
    const rounded = useTransform(count, (v) => Math.floor(v))

    useEffect(() => {
        if (!inView) {
            return
        }
        const controls = animate(count, value, { delay, duration: 1.5, ease: 'easeOut' })

        return controls.stop
    }, [inView, value, delay, count])

    return (
        <div
            ref={ref}
            className={styles.statItem}
        >
            <div className={styles.statNumber}>
                <motion.span>{rounded}</motion.span>
                {suffix && <span className={styles.suffix}>{suffix}</span>}
            </div>
            <div className={styles.statLabel}>{label}</div>
        </div>
    )
}

export const Stats: React.FC = () => {
    const data = useSiteData()
    const githubData = useGithubData()

    const yearsExp = React.useMemo(() => {
        const firstDate = data?.experience?.length ? findEarliestDate(data.experience) : null
        const start = new Date(firstDate ?? '2005-06-01').getTime()

        return Math.floor((Date.now() - start) / (365.25 * 24 * 3600 * 1000))
    }, [data?.experience])

    const streak = React.useMemo(() => {
        const contributions = githubData?.contributions?.contributions ?? []

        return calculateStreak(contributions)
    }, [githubData?.contributions?.contributions])

    const statItems = [
        { delay: 0, label: 'Years of experience', suffix: '+', value: yearsExp },
        { delay: 0.15, label: 'Roles & companies', value: data?.experience?.length ?? 0 },
        { delay: 0.3, label: 'Pet projects', value: data?.projects?.length ?? 0 },
        { delay: 0.45, label: 'Current streak', value: streak.currentStreak },
        { delay: 0.6, label: 'Longest streak', value: streak.longestStreak }
    ]

    return (
        <section className={styles.statsSection}>
            {statItems.map((stat) => (
                <StatItem
                    key={stat.label}
                    delay={stat.delay}
                    label={stat.label}
                    suffix={stat.suffix}
                    value={stat.value}
                />
            ))}
        </section>
    )
}
