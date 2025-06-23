import React from 'react'

import { Backend, DevOps, Frontend, Testing } from '@/data/skills'

import styles from './styles.module.sass'

const SkillsCloud: React.FC = () => (
    <section>
        <ul className={styles.tagsCloud}>
            {[
                ...Object.values(Frontend),
                ...Object.values(Backend),
                ...Object.values(Testing),
                ...Object.values(DevOps)
            ].map((item, i) => (
                <li key={`cloud-item-${i}`}>{item}</li>
            ))}
        </ul>
    </section>
)

export default SkillsCloud
