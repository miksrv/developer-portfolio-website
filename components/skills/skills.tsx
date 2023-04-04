import React from 'react'

import Progress from '@/components/progress/progress'
import SvgIcons from '@/components/svgIcons/svgIcons'

import { skillList } from '@/data/skillList'

import styles from './skills.module.css'

const Skills: React.FC = () => (
    <section>
        <div className={styles.skills}>
            {skillList.map((item) => (
                <div
                    className={styles.item}
                    key={item.name}
                >
                    {item.icon ? (
                        Array.isArray(item.icon) ? (
                            item.icon.map((icon) => (
                                <SvgIcons
                                    name={icon}
                                    key={icon}
                                />
                            ))
                        ) : (
                            <SvgIcons name={item.icon} />
                        )
                    ) : (
                        ''
                    )}
                    <label>{item.name}</label>
                    <Progress value={item.level} />
                </div>
            ))}
        </div>
    </section>
)

export default Skills
