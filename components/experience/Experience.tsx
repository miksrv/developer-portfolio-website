import React, { useState } from 'react'

import { PageTransition } from '@/components'
import { childVariants, parentVariants } from '@/components/page-transition/constants'
import { useSiteData } from '@/utils'
import { formatDate, formatPeriod } from '@/utils/date'
import { cn } from '@/utils/tools'

import { ExperienceType } from './types'

import styles from './styles.module.sass'

export const Experience: React.FC = () => {
    const data = useSiteData()
    const [expanded, setExpanded] = useState<Set<number>>(new Set())

    const toggleExpanded = (i: number) => {
        setExpanded((prev) => {
            const next = new Set(prev)

            if (next.has(i)) {
                next.delete(i)
            } else {
                next.add(i)
            }

            return next
        })
    }

    return (
        <section>
            <ul className={styles.experienceList}>
                <PageTransition
                    parentVariants={parentVariants.slide}
                    childVariants={childVariants.slide}
                >
                    {data?.experience?.map((item: ExperienceType, i) => {
                        const isCurrent = !item.period?.[1]

                        return (
                            <li
                                className={styles.experienceRole}
                                key={`exp-${i}`}
                            >
                                <span
                                    className={styles.timelineDot}
                                    aria-hidden={'true'}
                                />

                                <div className={styles.dates}>
                                    <div className={styles.date}>
                                        {formatDate(item.period?.[0], 'MMM YYYY')}
                                        {' — '}
                                        {isCurrent ? 'Present' : formatDate(item.period?.[1], 'MMM YYYY')}
                                    </div>
                                    <div className={styles.period}>{formatPeriod(item.period)}</div>
                                </div>

                                <div className={styles.roleRow}>
                                    <h3 className={styles.role}>{item.role}</h3>
                                    {isCurrent && <span className={styles.currentBadge}>{'Current'}</span>}
                                </div>

                                <div className={cn(styles.duties, expanded.has(i) ? styles.expanded : undefined)}>
                                    {item.duties}
                                </div>
                                <button
                                    className={styles.showMore}
                                    onClick={() => toggleExpanded(i)}
                                    aria-expanded={expanded.has(i)}
                                >
                                    {expanded.has(i) ? 'Show less' : 'Show more'}
                                </button>

                                {!!item.skills?.length && (
                                    <ul className={styles.skills}>
                                        {item.skills.map((skill, skillIndex) => (
                                            <li key={`experience-${i}-skill-${skillIndex}`}>
                                                <span className={styles.area}>{skill.area}</span>
                                                <div className={styles.tagList}>
                                                    {skill.stack.map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className={styles.tag}
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        )
                    })}
                </PageTransition>
            </ul>
        </section>
    )
}
