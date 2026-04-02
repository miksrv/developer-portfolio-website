import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

import { useGithubData } from '@/utils'
import { type Contribution } from '@/utils/github-fetch'

import styles from './styles.module.sass'

const WIDTH = 600
const HEIGHT = 60
const WEEKS = 52
const PADDING = { bottom: 4, top: 4 }

function buildWeeklyTotals(contributions: Contribution[], weeksCount: number): number[] {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const pad = (n: number) => String(n).padStart(2, '0')
    const dateStr = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

    const lookup = new Map(contributions.map((c) => [c.date, c.count]))
    const totals: number[] = []

    for (let w = weeksCount - 1; w >= 0; w--) {
        let weekTotal = 0
        for (let d = 0; d < 7; d++) {
            const cursor = new Date(today)
            cursor.setDate(today.getDate() - w * 7 - d)
            weekTotal += lookup.get(dateStr(cursor)) ?? 0
        }
        totals.push(weekTotal)
    }

    return totals
}

function buildPolyline(totals: number[]): string {
    const max = Math.max(...totals, 1)
    const stepX = WIDTH / (totals.length - 1)

    return totals
        .map((v, i) => {
            const x = i * stepX
            const y = HEIGHT - PADDING.bottom - (v / max) * (HEIGHT - PADDING.top - PADDING.bottom)
            return `${x.toFixed(1)},${y.toFixed(1)}`
        })
        .join(' ')
}

function buildPath(totals: number[]): string {
    const max = Math.max(...totals, 1)
    const stepX = WIDTH / (totals.length - 1)

    return totals
        .map((v, i) => {
            const x = i * stepX
            const y = HEIGHT - PADDING.bottom - (v / max) * (HEIGHT - PADDING.top - PADDING.bottom)
            return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
        })
        .join(' ')
}

export const GithubSparkline: React.FC = () => {
    const githubData = useGithubData()
    const contributions = githubData?.contributions?.contributions ?? []

    const weeklyTotals = useMemo(() => buildWeeklyTotals(contributions, WEEKS), [contributions])
    const polylinePoints = useMemo(() => buildPolyline(weeklyTotals), [weeklyTotals])
    const pathD = useMemo(() => buildPath(weeklyTotals), [weeklyTotals])

    const hasActivity = weeklyTotals.some((v) => v > 0)

    return (
        <section className={styles.sparklineSection}>
            <div className={styles.sparklineHeader}>
                <h2 className={'pageTitle'}>{'Commit Activity'}</h2>
                <span className={styles.sparklineSubtitle}>{'Last 52 weeks'}</span>
            </div>

            <div className={styles.sparklineWrapper}>
                <svg
                    viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
                    preserveAspectRatio={'none'}
                    className={styles.sparklineSvg}
                    aria-label={'Weekly commit activity sparkline'}
                    role={'img'}
                >
                    {hasActivity && (
                        <>
                            {/* Area fill */}
                            <motion.polygon
                                points={`0,${HEIGHT} ${polylinePoints} ${WIDTH},${HEIGHT}`}
                                className={styles.sparklineArea}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                            />
                            {/* Line */}
                            <motion.path
                                d={pathD}
                                className={styles.sparklineLine}
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, ease: 'easeOut' }}
                            />
                        </>
                    )}
                </svg>
            </div>
        </section>
    )
}
