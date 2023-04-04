import React from 'react'

import SvgIcons from '@/components/svgIcons/svgIcons'

import { socialNetworks } from '@/data/socialNetworks'

import styles from './socialNetworks.module.css'

const SocialNetworks: React.FC = () => {
    return (
        <div className={styles.social}>
            {socialNetworks.map((item) => (
                <a
                    href={item.link}
                    title={item.label}
                    key={item.link}
                    className={styles.link}
                >
                    <SvgIcons name={item.icon} />
                </a>
            ))}
        </div>
    )
}

export default SocialNetworks
