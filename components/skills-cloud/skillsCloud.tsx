import React from 'react'

import { skillTags } from '@/data/skillTags'

import styles from './skillsCloud.module.css'

const SkillsCloud: React.FC = () => (
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
)
export default SkillsCloud
