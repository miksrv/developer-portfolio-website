import React from 'react'
import { motion } from 'framer-motion'

import { useGithubData } from '@/utils'

import styles from './styles.module.sass'

const LANGUAGE_COLORS: Record<string, string> = {
    C: '#555555',
    'C#': '#178600',
    'C++': '#f34b7d',
    CSS: '#563d7c',
    Go: '#00ADD8',
    HTML: '#e34c26',
    Java: '#b07219',
    JavaScript: '#f1e05a',
    Kotlin: '#A97BFF',
    PHP: '#4F5D95',
    Python: '#3572A5',
    Ruby: '#701516',
    Rust: '#dea584',
    SCSS: '#c6538c',
    Shell: '#89e051',
    Swift: '#F05138',
    TypeScript: '#3178c6',
    Vue: '#41b883'
}

const DEFAULT_COLOR = '#ffc107'
const MAX_LANGUAGES = 8

export const GithubLanguages: React.FC = () => {
    const githubData = useGithubData()
    const distribution = githubData?.stats?.languageDistribution ?? {}

    const sorted = Object.entries(distribution)
        .sort(([, a], [, b]) => b - a)
        .slice(0, MAX_LANGUAGES)

    const total = sorted.reduce((sum, [, v]) => sum + v, 0)

    if (!sorted.length) {
        return null
    }

    return (
        <section className={styles.languagesSection}>
            <h2 className={'pageTitle'}>{'Top Languages'}</h2>

            <div className={styles.barTrack}>
                {sorted.map(([lang, count], i) => (
                    <motion.div
                        key={lang}
                        className={styles.barSegment}
                        title={`${lang}: ${Math.round((count / total) * 100)}%`}
                        style={{
                            backgroundColor: LANGUAGE_COLORS[lang] ?? DEFAULT_COLOR,
                            width: `${(count / total) * 100}%`,
                            transformOrigin: 'left'
                        }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6, delay: i * 0.06, ease: 'easeOut' }}
                    />
                ))}
            </div>

            <ul className={styles.legend}>
                {sorted.map(([lang, count]) => (
                    <li
                        key={lang}
                        className={styles.legendItem}
                    >
                        <span
                            className={styles.legendDot}
                            style={{ backgroundColor: LANGUAGE_COLORS[lang] ?? DEFAULT_COLOR }}
                        />
                        <span className={styles.legendName}>{lang}</span>
                        <span className={styles.legendPercent}>{Math.round((count / total) * 100)}%</span>
                    </li>
                ))}
            </ul>
        </section>
    )
}
