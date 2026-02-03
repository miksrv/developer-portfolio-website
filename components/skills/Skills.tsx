import React from 'react'

import { useSiteData } from '@/utils'

import { Progress } from '../progress'

// import { data } from './data'
import styles from './styles.module.sass'

export const Skills: React.FC = () => {
    const data = useSiteData()

    return (
        <section>
            <div className={styles.skillContainer}>
                {data?.skills?.map((group, i) => (
                    <div
                        key={`group-${i}`}
                        className={styles.skillGroup}
                    >
                        <h3>{group.group}</h3> {/* Заголовок группы */}
                        <ul className={styles.skillList}>
                            {group.skills.map((skill, j) => (
                                <li key={`skill-${i}-${j}`}>
                                    <div className={styles.label}>
                                        <label>{skill.name}</label>
                                    </div>
                                    <Progress value={skill.level} /> {/* Компонент прогресса */}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    )
}
