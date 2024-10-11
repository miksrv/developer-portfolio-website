import React from 'react'

import { data } from './data'
import styles from './styles.module.sass'

const Experience: React.FC = () => (
    <section>
        <ul className={styles.experienceList}>
            {data?.map((item, i) => (
                <li
                    className={styles.experienceRole}
                    key={`experience-${i}`}
                >
                    <div className={styles.period}>{item.period}</div>
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
