import React from 'react'

import { data } from './data'
import styles from './styles.module.sass'

const SkillsCloud: React.FC = () => (
    <section>
        <ul className={styles.tagsCloud}>
            {data.map((item, i) => (
                <li key={`cloud-item-${i}`}>{item}</li>
            ))}
        </ul>
    </section>
)

export default SkillsCloud
