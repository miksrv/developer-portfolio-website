import React from 'react'

import styles from './styles.module.sass'

export const About: React.FC = () => {
    return (
        <section className={styles.aboutSection}>
            <h2 className={'pageTitle'}>{'About me'}</h2>
            <div className={styles.aboutContainer}>
                <p>
                    {
                        'Programming is both my profession and my hobby, which is why I truly enjoy my work as a developer. With over 14 years of experience, I have the skills to tackle a wide range of challenges, from building interactive web applications to leading development teams.'
                    }
                </p>
                <p>
                    {
                        'Outside of coding, my hobbies are a big part of my life. I’m an amateur astronomer and have built a fully automated remote observatory that I can control from anywhere in the world. I also love traveling, especially hiking and exploring nature with my family. My children are a constant source of inspiration, motivating me both in life and in work.'
                    }
                </p>
            </div>
        </section>
    )
}

export default About
