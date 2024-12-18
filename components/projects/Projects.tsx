import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { data } from './data'
import styles from './styles.module.sass'

import Icon from '@/components/icon'
import { iconNames } from '@/components/icon/types'

const Projects: React.FC = () => (
    <section className={styles.projectsContainer}>
        {data?.map((item, i) => (
            <div
                key={`project-${item.link}`}
                className={styles[i % 2 === 0 ? 'even' : 'odd']}
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
                        <Icon name={iconNames.web} />
                        <Link
                            href={item.link}
                            title={item.title}
                            target={'_blank'}
                        >
                            {item.link.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                        </Link>
                    </div>
                </div>
            </div>
        ))}
    </section>
)

export default Projects
