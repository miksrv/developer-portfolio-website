'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import styles from './styles.module.css'

import { headerLinks } from '@/data/headerLinks'

export const Header: React.FC = () => {
    const pathname = usePathname()

    return (
        <div className={styles.header}>
            <div className={'wrapperContent'}>
                <div className={styles.links}>
                    {headerLinks.map((link) => (
                        <Link
                            key={link.url}
                            href={link.url}
                            className={pathname === link.url ? styles.active : undefined}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
