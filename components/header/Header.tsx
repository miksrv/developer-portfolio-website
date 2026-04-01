import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { useTheme } from '@/utils'

import { menu } from './menu'

import styles from './styles.module.sass'

const SunIcon = () => (
    <svg
        viewBox={'0 0 24 24'}
        fill={'none'}
        stroke={'currentColor'}
        strokeWidth={'2'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
        aria-hidden={'true'}
    >
        <circle
            cx={'12'}
            cy={'12'}
            r={'5'}
        />
        <line
            x1={'12'}
            y1={'1'}
            x2={'12'}
            y2={'3'}
        />
        <line
            x1={'12'}
            y1={'21'}
            x2={'12'}
            y2={'23'}
        />
        <line
            x1={'4.22'}
            y1={'4.22'}
            x2={'5.64'}
            y2={'5.64'}
        />
        <line
            x1={'18.36'}
            y1={'18.36'}
            x2={'19.78'}
            y2={'19.78'}
        />
        <line
            x1={'1'}
            y1={'12'}
            x2={'3'}
            y2={'12'}
        />
        <line
            x1={'21'}
            y1={'12'}
            x2={'23'}
            y2={'12'}
        />
        <line
            x1={'4.22'}
            y1={'19.78'}
            x2={'5.64'}
            y2={'18.36'}
        />
        <line
            x1={'18.36'}
            y1={'5.64'}
            x2={'19.78'}
            y2={'4.22'}
        />
    </svg>
)

const MoonIcon = () => (
    <svg
        viewBox={'0 0 24 24'}
        fill={'none'}
        stroke={'currentColor'}
        strokeWidth={'2'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
        aria-hidden={'true'}
    >
        <path d={'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'} />
    </svg>
)

export const Header: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string>('intro')
    const [scrolled, setScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const headerRef = useRef<HTMLElement>(null)
    const { theme, toggleTheme } = useTheme()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)

        window.addEventListener('scroll', handleScroll, { passive: true })

        const sectionIds = menu.map((item) => item.url.replace('#', ''))
        const sections = sectionIds
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el != null)

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id)
                    }
                })
            },
            { rootMargin: '-10% 0px -55% 0px', threshold: 0 }
        )

        sections.forEach((section) => observer.observe(section))

        return () => {
            window.removeEventListener('scroll', handleScroll)
            observer.disconnect()
        }
    }, [])

    // Close mobile menu on outside click
    useEffect(() => {
        if (!isMenuOpen) {
            return
        }

        const handler = (e: MouseEvent) => {
            if (!headerRef.current?.contains(e.target as Node)) {
                setIsMenuOpen(false)
            }
        }

        const timer = setTimeout(() => document.addEventListener('click', handler), 0)

        return () => {
            clearTimeout(timer)
            document.removeEventListener('click', handler)
        }
    }, [isMenuOpen])

    const handleLinkClick = () => setIsMenuOpen(false)

    return (
        <header
            ref={headerRef}
            className={`${styles.header}${scrolled ? ` ${styles.scrolled}` : ''}`}
        >
            <section>
                {/* Desktop navigation */}
                <nav className={styles.desktopNav}>
                    {menu.map((link) => (
                        <a
                            key={link.url}
                            href={link.url}
                            className={activeSection === link.url.replace('#', '') ? styles.active : undefined}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className={styles.headerActions}>
                    {/* Theme toggle */}
                    <button
                        className={styles.themeToggle}
                        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                        onClick={toggleTheme}
                    >
                        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                    </button>

                    {/* Hamburger button — mobile only */}
                    <button
                        className={styles.burgerButton}
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isMenuOpen}
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                    >
                        <span className={styles.burgerLine} />
                        <span className={styles.burgerLine} />
                        <span className={styles.burgerLine} />
                    </button>
                </div>
            </section>

            {/* Mobile dropdown navigation */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.nav
                        className={styles.mobileMenu}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                    >
                        {menu.map((link) => (
                            <a
                                key={link.url}
                                href={link.url}
                                className={activeSection === link.url.replace('#', '') ? styles.active : undefined}
                                onClick={handleLinkClick}
                            >
                                {link.label}
                            </a>
                        ))}
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    )
}
