import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { Icon } from '@/components/icon'
import { iconNames } from '@/components/icon/types'
import { PageTransition } from '@/components/page-transition'
import { useSiteData } from '@/utils'
import { cn } from '@/utils/tools'

import { ProjectType } from './data'

// import { data } from './data'
import styles from './styles.module.sass'

export const Projects: React.FC = () => {
    const data = useSiteData()

    return (
        <section className={styles.projectsContainer}>
            <PageTransition>
                {data?.projects.map((item: ProjectType, i) => (
                    <div
                        key={`project-${item?.link}`}
                        className={cn(styles.item, styles[i % 2 === 0 ? 'even' : 'odd'])}
                    >
                        <Link
                            href={item.link}
                            title={item.title}
                            target={'_blank'}
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                width={176}
                                height={176}
                            />
                        </Link>

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
                                        >
                                            {item.link.replace(/^https?:\/\//, '').replace(/\/$/, '')}
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
