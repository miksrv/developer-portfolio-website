import React from 'react'
import { motion } from 'framer-motion'

import { ExperienceType } from '@/components/experience/types'
import { useSiteData } from '@/utils'

import styles from './styles.module.sass'

export const SkillsCloud: React.FC = () => {
    const data = useSiteData()

    // Collect all unique skills from data?.experience
    const skillsSet = new Set<string>()

    data?.experience?.forEach((exp: ExperienceType) => {
        exp.skills?.forEach((area) => {
            area.stack?.forEach((skill: string) => {
                skillsSet.add(skill)
            })
        })
    })

    const allSkills = Array.from(skillsSet)

    return (
        <section>
            <ul className={styles.tagsCloud}>
                {allSkills.map((item, i) => (
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
}
