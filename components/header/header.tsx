'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { headerLinks } from '@/data/headerLinks'

import styles from './header.module.css'

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
                            className={
                                pathname === link.url
                                    ? styles.active
                                    : undefined
                            }
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
