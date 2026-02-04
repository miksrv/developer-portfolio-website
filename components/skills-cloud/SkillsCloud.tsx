import React from 'react'
import { motion } from 'framer-motion'

import { Backend, DevOps, Frontend, Testing } from '@/data/skills'

import styles from './styles.module.sass'

export const SkillsCloud: React.FC = () => (
    <section>
        <ul className={styles.tagsCloud}>
            {[
                ...Object.values(Frontend),
                ...Object.values(Backend),
                ...Object.values(Testing),
                ...Object.values(DevOps)
            ].map((item, i) => (
                <motion.li
                    key={`cloud-item-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                >
                    {item}
                </motion.li>
            ))}
        </ul>
    </section>
)
