import React from 'react'

import { useSiteData } from '@/utils'

import { Progress } from '../progress'

import { SkillGroupType, SkillItemType } from './types'

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
                                        <label className={styles.label}>{skill.name}</label>
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
