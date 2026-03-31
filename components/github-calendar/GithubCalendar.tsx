import React, { useMemo } from 'react'

import { motion, Variants } from 'framer-motion'

import { useGithubData } from '@/utils'

import { buildCalendarWeeks, formatTooltip, getTotalThisYear } from './utils'

import styles from './styles.module.sass'

const WEEKS_COUNT = 53

const LEVEL_COLORS = ['#2a2a2a', '#524508', '#6C590A', '#907F0D', '#FFC107'] as const

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            delayChildren: 0.05,
            staggerChildren: 0.012
        }
    }
}

const weekVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.25 } }
}

export const GithubCalendar: React.FC = () => {
    const githubData = useGithubData()
    const contributions = useMemo(() => githubData?.contributions?.contributions ?? [], [githubData])
    const total = useMemo(() => githubData?.contributions?.total ?? {}, [githubData])

    const weeks = useMemo(() => buildCalendarWeeks(contributions, WEEKS_COUNT), [contributions])
    const totalThisYear = useMemo(() => getTotalThisYear(total), [total])
    const currentYear = new Date().getFullYear()

    return (
        <section
            className={styles.calendarSection}
            aria-label={'GitHub contribution activity'}
        >
            <h2 className={'pageTitle'}>{'Work activity'}</h2>

            <div className={styles.calendarScroll}>
                <div className={styles.calendarInner}>
                    {/* Month labels row */}
                    <div
                        className={styles.monthRow}
                        aria-hidden={'true'}
                    >
                        {weeks.map((week, i) => (
                            <div
                                key={i}
                                className={styles.monthLabel}
                            >
                                {week.monthLabel}
                            </div>
                        ))}
                    </div>

                    {/* Contribution grid */}
                    <motion.div
                        className={styles.weeksContainer}
                        variants={containerVariants}
                        initial={'hidden'}
                        whileInView={'visible'}
                        viewport={{ once: true, amount: 0.3 }}
                        role={'grid'}
                        aria-label={`${totalThisYear} contributions in ${currentYear}`}
                    >
                        {weeks.map((week, weekIndex) => (
                            <motion.div
                                key={weekIndex}
                                className={styles.week}
                                variants={weekVariants}
                                role={'row'}
                            >
                                {week.days.map((day, dayIndex) => {
                                    if (!day) {
                                        return (
                                            <div
                                                key={dayIndex}
                                                className={styles.cellEmpty}
                                                role={'gridcell'}
                                                aria-hidden={'true'}
                                            />
                                        )
                                    }

                                    return (
                                        <div
                                            key={dayIndex}
                                            className={styles.cell}
                                            role={'gridcell'}
                                            aria-label={formatTooltip(day)}
                                            title={formatTooltip(day)}
                                            style={{ backgroundColor: LEVEL_COLORS[day.level] }}
                                        />
                                    )
                                })}
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Footer: total count + legend */}
                    <div className={styles.footer}>
                        <span className={styles.totalLabel}>
                            {totalThisYear > 0
                                ? `${totalThisYear.toLocaleString()} contributions in ${currentYear}`
                                : `${currentYear}`}
                        </span>

                        <div
                            className={styles.legend}
                            aria-label={'Contribution level legend'}
                        >
                            <span className={styles.legendText}>{'Less'}</span>
                            {LEVEL_COLORS.map((color, level) => (
                                <div
                                    key={level}
                                    className={styles.legendCell}
                                    style={{ backgroundColor: color }}
                                    aria-label={`Level ${level}`}
                                />
                            ))}
                            <span className={styles.legendText}>{'More'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default GithubCalendar
