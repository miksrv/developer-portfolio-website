import React from 'react'

import { SkillGroupType, SkillItemType } from '@/components/skills/types'
import { useSiteData } from '@/utils'

import { Progress } from '../progress'

import styles from './styles.module.sass'

export const Skills: React.FC = () => {
    const data = useSiteData()

    return (
        !!data?.skills?.length && (
            <section>
                <div className={styles.skillContainer}>
                    {data?.skills?.map((group: SkillGroupType, i) => (
                        <div
                            key={`group-${String(i)}`}
                            className={styles.skillGroup}
                        >
                            <h3>{group.group}</h3>
                            <ul className={styles.skillList}>
                                {group?.skills?.map((skill: SkillItemType, j) => (
                                    <li key={`skill-${String(i)}-${String(j)}`}>
                                        <div className={styles.label}>
                                            <label>{skill.name}</label>
                                        </div>
                                        <Progress value={skill.level} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        )
    )
}
