import React from 'react'

import Image from 'next/image'

import photo from './photo.jpg'

import styles from './styles.module.sass'

/**
 * The About component displays information about the developer, including a photo and a brief description.
 *
 * @component
 * @example
 * return (
 *   <About />
 * )
 */
export const About: React.FC = () => (
    <section className={styles.aboutSection}>
        <h2 className={'pageTitle'}>{'About me'}</h2>
        <div className={styles.aboutContainer}>
            <Image
                src={photo}
                alt={'Photo of me'}
            />
            <div>
                <p>
                    {
                        'I architect and deliver full-stack systems — from greenfield design to production — and have led engineering teams for over 19 years across government infrastructure, media platforms, and tech products. My experience spans end-to-end ownership, including architecture, backend and frontend development, AI integration, and operational excellence.'
                    }
                </p>
                <p>
                    {
                        'Outside engineering, I design and operate a fully automated home observatory for remote astrophotography.'
                    }
                </p>
            </div>
        </div>
    </section>
)
