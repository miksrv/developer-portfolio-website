import React from 'react'

import Image from 'next/image'

import { useSiteData } from '@/utils'

import photo from './photo.webp'

import styles from './styles.module.sass'

export const About: React.FC = () => {
    const data = useSiteData()
    const bio = data?.biography?.bio

    return (
        <section className={styles.aboutSection}>
            <h2 className={'pageTitle'}>{'About me'}</h2>
            <div className={styles.aboutContainer}>
                <Image
                    src={photo}
                    alt={'Photo of me'}
                />
                <div>
                    {bio?.lead && <p>{bio.lead}</p>}
                    {bio?.bullets && bio.bullets.length > 0 && (
                        <ul className={styles.bioBullets}>
                            {bio.bullets.map((bullet, i) => (
                                <li key={i}>{bullet}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </section>
    )
}
