import React, { useEffect, useRef } from 'react'
import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion'

import { getTotalThisYear } from '@/components/github-calendar/utils'
import { useGithubData } from '@/utils'

import styles from './styles.module.sass'

type StatCardProps = {
    icon: React.ReactNode
    value: number
    label: string
    delay?: number
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, delay = 0 }) => {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true })
    const count = useMotionValue(0)
    const rounded = useTransform(count, (v) => Math.floor(v))

    useEffect(() => {
        if (!inView) {
            return
        }

        const controls = animate(count, value, { delay, duration: 1.4, ease: 'easeOut' })
        return controls.stop
    }, [inView, value, delay, count])

    return (
        <div
            ref={ref}
            className={styles.statCard}
        >
            <div className={styles.statIcon}>{icon}</div>
            <div className={styles.statValue}>
                <motion.span>{rounded}</motion.span>
            </div>
            <div className={styles.statLabel}>{label}</div>
        </div>
    )
}

const StarIcon = () => (
    <svg
        viewBox={'0 0 24 24'}
        fill={'currentColor'}
        aria-hidden={'true'}
    >
        <path d={'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'} />
    </svg>
)

const ForkIcon = () => (
    <svg
        viewBox={'0 0 24 24'}
        fill={'currentColor'}
        aria-hidden={'true'}
    >
        <path
            d={
                'M12 21a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-4-14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm8 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM8 7v1.5a4 4 0 0 0 3 3.87V17a4 4 0 0 0 2 0v-4.63A4 4 0 0 0 16 8.5V7'
            }
        />
    </svg>
)

const RepoIcon = () => (
    <svg
        viewBox={'0 0 24 24'}
        fill={'currentColor'}
        aria-hidden={'true'}
    >
        <path
            d={
                'M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-7-7zm-1 1.5L18.5 10H12V3.5zM6 20V4h4v8h8v8H6z'
            }
        />
    </svg>
)

const FollowerIcon = () => (
    <svg
        viewBox={'0 0 24 24'}
        fill={'currentColor'}
        aria-hidden={'true'}
    >
        <path
            d={
                'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm14 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75'
            }
        />
    </svg>
)

const CommitIcon = () => (
    <svg
        viewBox={'0 0 24 24'}
        fill={'currentColor'}
        aria-hidden={'true'}
    >
        <circle
            cx={'12'}
            cy={'12'}
            r={'4'}
        />
        <line
            x1={'1.05'}
            y1={'12'}
            x2={'7'}
            y2={'12'}
            stroke={'currentColor'}
            strokeWidth={'2'}
        />
        <line
            x1={'17.01'}
            y1={'12'}
            x2={'22.96'}
            y2={'12'}
            stroke={'currentColor'}
            strokeWidth={'2'}
        />
    </svg>
)

export const GithubStats: React.FC = () => {
    const githubData = useGithubData()

    const stats = [
        {
            delay: 0,
            icon: <StarIcon />,
            label: 'Total Stars',
            value: githubData?.stats?.totalStars ?? 0
        },
        {
            delay: 0.1,
            icon: <ForkIcon />,
            label: 'Total Forks',
            value: githubData?.stats?.totalForks ?? 0
        },
        {
            delay: 0.2,
            icon: <RepoIcon />,
            label: 'Public Repos',
            value: githubData?.user?.publicRepos ?? 0
        },
        {
            delay: 0.3,
            icon: <FollowerIcon />,
            label: 'Followers',
            value: githubData?.user?.followers ?? 0
        },
        {
            delay: 0.4,
            icon: <CommitIcon />,
            label: 'Contributions This Year',
            value: githubData?.contributions ? getTotalThisYear(githubData.contributions.total) : 0
        }
    ]

    return (
        <section className={styles.githubStatsSection}>
            <h2 className={'pageTitle'}>{'GitHub Stats'}</h2>
            <div className={styles.statsGrid}>
                {stats.map((s) => (
                    <StatCard
                        key={s.label}
                        icon={s.icon}
                        value={s.value}
                        label={s.label}
                        delay={s.delay}
                    />
                ))}
            </div>
        </section>
    )
}
