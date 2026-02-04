import React from 'react'

import { PageTransition } from '@/components'
import { childVariants, parentVariants } from '@/components/page-transition/constants'
import { useSiteData } from '@/utils'
import { formatDate, formatPeriod } from '@/utils/date'

import { ExperienceType } from './types'

import styles from './styles.module.sass'

export const Experience: React.FC = () => {
    const data = useSiteData()

    return (
        <section>
            <ul className={styles.experienceList}>
                <PageTransition
                    parentVariants={parentVariants.slide}
                    childVariants={childVariants.slide}
                >
                    {data?.experience?.map((item: ExperienceType, i) => (
                        <li
                            className={styles.experienceRole}
                            key={`${item.period?.[0]}-${item.period?.[1]}`}
                        >
                            <div className={styles.dates}>
                                <div className={styles.date}>
                                    {formatDate(item.period?.[0], 'MMM YYYY')}
                                    {' - '}
                                    {item.period?.[1] ? formatDate(item.period?.[1], 'MMM YYYY') : 'Present'}
                                </div>
                                <div className={styles.period}>{formatPeriod(item.period)}</div>
                            </div>
                            <h3 className={styles.role}>{item.role}</h3>
                            <div className={styles.duties}>{item.duties}</div>

                            {!!item.skills?.length && (
                                <ul className={styles.skills}>
                                    {item.skills.map((skill, skillIndex) => (
                                        <li key={`experience-${i}-skill-${skillIndex}`}>
                                            <span className={styles.area}>{skill.area}:</span>
                                            <span className={styles.stack}>{skill.stack.join(', ')}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </PageTransition>
            </ul>
        </section>
    )
}
