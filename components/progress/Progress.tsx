import React from 'react'

import { ProgressProps } from './types'

import styles from './styles.module.sass'

export const Progress: React.FC<ProgressProps> = ({ value }) => (
    <div
        className={styles.progress}
        role={'progressbar'}
    >
        {Array(10)
            .fill(0)
            .map((val, i) => (
                <span
                    key={`progress-segment-${i}`}
                    className={(value || 0) >= (i + 1) * 10 ? styles.active : undefined}
                />
            ))}
    </div>
)
