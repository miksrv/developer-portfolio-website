import React from 'react'
import { motion } from 'framer-motion'

import { ProgressProps } from './types'

import styles from './styles.module.sass'

export const Progress: React.FC<ProgressProps> = ({ value = 0 }) => {
    const segments = 10

    return (
        <div
            className={styles.progress}
            role={'progressbar'}
        >
            {Array(segments)
                .fill(0)
                .map((_, i) => {
                    const isActive = value >= (i + 1) * 10

                    return (
                        <motion.span
                            key={`progress-segment-${i}`}
                            className={isActive ? styles.active : undefined}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isActive ? 1 : 0.1 }}
                            transition={{
                                duration: 0.3,
                                delay: 0.8 + (isActive ? i * 0.05 : 0.3)
                            }}
                        />
                    )
                })}
        </div>
    )
}
