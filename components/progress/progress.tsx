import React from 'react'

import styles from './styles.module.sass'

interface ProgressProps {
    value?: number
}

const Progress: React.FC<ProgressProps> = ({ value }) => (
    <div className={styles.progress}>
        <div
            className={styles.line}
            style={{ width: `${value ?? 0}%` }}
        />
    </div>
)

export default Progress
