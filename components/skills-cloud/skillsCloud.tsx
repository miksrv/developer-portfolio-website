import React from 'react'

import styles from './skillsCloud.module.css'

import { skillTags } from '@/data/skillTags'

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
