import React from 'react'

import Progress from '@/components/progress/progress'

import { skillList } from '@/data/skillList'
import { skillTags } from '@/data/skillTags'

import styles from './skills.module.css'

const Skills: React.FC = () => {
    return (
        <>
            <section>
                <div className={styles.skills}>
                    {skillList.map((item) => (
                        <div
                            className={styles.item}
                            key={item.name}
                        >
                            <label>{item.name}</label>
                            <Progress value={item.level} />
                        </div>
                    ))}
                </div>
            </section>
            <div className={styles.tagsCloud}>
                {skillTags.map((item) => (
                    <div
                        key={item}
                        className={styles.label}
                    >
                        {item}
                    </div>
                ))}
            </div>
        </>
    )
}

export default Skills
