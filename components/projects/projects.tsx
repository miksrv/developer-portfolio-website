import Image from 'next/image'
import React from 'react'

import styles from '@/components/projects/projects.module.css'

import { projects } from '@/data/projects'

const Projects: React.FC = () => (
    <div className={styles.projects}>
        {projects.map((item) => (
            <a
                className={styles.item}
                key={item.link}
                href={item.link}
                title={item.label}
            >
                <Image
                    className={styles.avatar}
                    src={item.image}
                    alt={item.label}
                    width={176}
                    height={176}
                />
            </a>
        ))}
    </div>
)

export default Projects
