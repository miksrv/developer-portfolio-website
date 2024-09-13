import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { menu } from './menu'
import styles from './styles.module.sass'

export const Header: React.FC = () => {
    const pathname = usePathname()

    return (
        <header className={styles.header}>
            <section>
                {menu?.map((link) => (
                    <Link
                        key={link.url}
                        href={link.url}
                        className={pathname === link.url ? styles.active : undefined}
                    >
                        {link.label}
                    </Link>
                ))}
            </section>
        </header>
    )
}

export default Header
