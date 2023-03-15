import React from 'react'

import { IProgress } from '@/types'

import styles from './progress.module.css'

const Progress: React.FC<IProgress> = ({ value }) => (
    <div className={styles.progress}>
        <div
            className={styles.barLine}
            style={{ width: `${value}%` }}
        />
    </div>
)

export default Progress
