import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { Icon } from '@/components/icon'
import { iconNames } from '@/components/icon/types'
import { PageTransition } from '@/components/page-transition'
import { childVariants, parentVariants } from '@/components/page-transition/constants'
import { useSiteData } from '@/utils'

import { ProjectType } from './types'

import styles from './styles.module.sass'

export const Projects: React.FC = () => {
    const data = useSiteData()

    return (
        <section className={styles.projectsContainer}>
            <PageTransition
                parentVariants={parentVariants.slide}
                childVariants={childVariants.slide}
            >
                {data?.projects.map((item: ProjectType) => (
                    <div
                        key={`project-${item?.link}`}
                        className={styles.item}
                    >
                        <div className={styles.imageWrapper}>
                            <Link
                                href={item.link}
                                title={item.title}
                                target={'_blank'}
                                rel={'noopener noreferrer'}
                                tabIndex={-1}
                                aria-hidden={'true'}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={176}
                                    height={176}
                                    loading={'lazy'}
                                />
                            </Link>
                            <div
                                className={styles.imageOverlay}
                                aria-hidden={'true'}
                            >
                                <span>{'View →'}</span>
                            </div>
                        </div>

                        <div className={styles.description}>
                            <div>
                                <h2>{item.title}</h2>
                                {item?.description && <p>{item.description}</p>}
                            </div>

                            <div className={styles.info}>
                                {item.github && (
                                    <div className={styles.infoItem}>
                                        <Icon name={iconNames.github} />
                                        <Link
                                            href={item.github}
                                            title={`${item.title} GitHub Source Code`}
                                            target={'_blank'}
                                            rel={'noopener noreferrer'}
                                        >
                                            {'GitHub Repository'}
                                        </Link>
                                    </div>
                                )}

                                {item.link && (
                                    <div className={styles.infoItem}>
                                        <Icon name={iconNames.web} />
                                        <Link
                                            href={item.link}
                                            title={`${item.title} Website Live`}
                                            target={'_blank'}
                                            rel={'noopener noreferrer'}
                                        >
                                            {item.link.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </PageTransition>
        </section>
    )
}
