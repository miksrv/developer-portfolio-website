import React from 'react'

import Progress from '../progress'

import { data } from './data'
import styles from './styles.module.sass'

const Skills: React.FC = () => (
    <section>
        <div className={styles.skillContainer}>
            {data.map((group, i) => (
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

export default Skills
