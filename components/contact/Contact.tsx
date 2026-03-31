import React from 'react'

import Link from 'next/link'

import { Icon, IconTypes } from '@/components/icon'
import { useSiteData } from '@/utils'

import styles from './styles.module.sass'

export const Contact: React.FC = () => {
    const data = useSiteData()

    return (
        <section className={styles.contactSection}>
            <h2 className={'pageTitle'}>{'Get In Touch'}</h2>

            {data?.biography?.availableForWork && (
                <div className={styles.availableBadge}>
                    <span
                        className={styles.dot}
                        aria-hidden={'true'}
                    />
                    {'Open to new opportunities'}
                </div>
            )}

            <p className={styles.contactIntro}>
                {
                    "I'm always open to discussing new projects, creative ideas, or opportunities to build something great."
                }
            </p>

            <div className={styles.socialLinks}>
                {data?.contactLinks?.map((link) => (
                    <Link
                        key={link.link}
                        href={link.link}
                        target={'_blank'}
                        rel={'noopener noreferrer'}
                        className={styles.socialLink}
                        title={link.label}
                    >
                        <Icon name={link.icon as IconTypes} />
                        <span>{link.label}</span>
                    </Link>
                ))}
            </div>
        </section>
    )
}
