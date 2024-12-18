import React from 'react'

import styles from './styles.module.sass'

import { experience } from '@/data/experience'
import { formatDate, formatPeriod } from '@/utils/date'

/**
 * The Experience component displays a list of professional experiences, including roles, dates, duties, and skills.
 *
 * @component
 * @example
 * return (
 *   <Experience />
 * )
 */
const Experience: React.FC = () => (
    <section>
        <ul className={styles.experienceList}>
            {experience?.map((item, i) => (
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
        </ul>
    </section>
)

export default Experience
