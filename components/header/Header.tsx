import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { Icon } from '@/components/icon'
import { useTheme } from '@/utils'
import { cn } from '@/utils/tools'

import { menu } from './menu'

import styles from './styles.module.sass'

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
            className={cn(styles.header, scrolled && styles.scrolled)}
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

                    {/* Theme toggle */}
                    <button
                        className={styles.themeToggle}
                        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                        onClick={toggleTheme}
                    >
                        <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
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
