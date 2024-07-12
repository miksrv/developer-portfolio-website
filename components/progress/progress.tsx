import React from 'react'

import styles from './progress.module.css'

import { IProgress } from '@/types'

const Progress: React.FC<IProgress> = ({ value }) => (
    <div className={styles.progress}>
        <div
            className={styles.barLine}
            style={{ width: `${value}%` }}
        />
    </div>
)

export default Progress
