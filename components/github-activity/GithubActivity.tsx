import React from 'react'
import GitHubCalendar from 'react-github-calendar'

import styles from './styles.module.sass'

export const GithubActivity: React.FC = () => {
    return (
        <section className={styles.activitySection}>
            <h2 className={'pageTitle'}>{'Work activity'}</h2>
            <GitHubCalendar username={'miksrv'} />
        </section>
    )
}

export default GithubActivity
