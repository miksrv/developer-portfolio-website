import React from 'react'
import Link from 'next/link'

import data from './data'
import styles from './styles.module.sass'

import Icon from '@/components/icon'

const ExternalLinks: React.FC = () => (
    <section>
        <div className={styles.externalLinksContainer}>
            {data?.map((item) => (
                <Link
                    key={item.link}
                    href={item.link}
                    title={item.label}
                    target={'_blank'}
                    className={styles.link}
                >
                    <Icon name={item.icon} />
                </Link>
            ))}
        </div>
    </section>
)

export default ExternalLinks
