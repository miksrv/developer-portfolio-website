import React from 'react'

import styles from './styles.module.sass'

export const Footer: React.FC = () => {
    const handleBackToTop = () => {
        window.scrollTo({ behavior: 'smooth', top: 0 })
    }

    return (
        <footer className={styles.footer}>
            <section>
                <span className={styles.copyright}>
                    {'© '}
                    {new Date().getFullYear()}
                    {' Misha. Built with '}
                    <span>{'Next.js'}</span>
                    {' & '}
                    <span>{'TypeScript'}</span>
                    {'.'}
                </span>
                <button
                    className={styles.backToTop}
                    onClick={handleBackToTop}
                    aria-label={'Back to top'}
                >
                    {'↑ Back to top'}
                </button>
            </section>
        </footer>
    )
}
