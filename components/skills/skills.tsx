import React from 'react'

import Progress from '../progress'

import { data } from './data'
import styles from './styles.module.sass'

import Icon from '@/components/icon'

const Skills: React.FC = () => (
    <section>
        <div className={styles.skillContainer}>
            <ul className={styles.skillList}>
                {data.map((item, i) => (
                    <li key={`skill-${i}`}>
                        <div className={styles.label}>
                            {item.icon?.map((icon, n) => (
                                <Icon
                                    key={`icon-${i}-${n}`}
                                    name={icon}
                                />
                            ))}
                            <label>{item.name}</label>
                        </div>

                        <Progress value={item.level} />
                    </li>
                ))}
            </ul>
        </div>
    </section>
)

export default Skills
