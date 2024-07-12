import React from 'react'

import styles from './socialNetworks.module.css'

import SvgIcons from '@/components/svgIcons/svgIcons'
import { socialNetworks } from '@/data/socialNetworks'

const SocialNetworks: React.FC = () => (
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

export default SocialNetworks
