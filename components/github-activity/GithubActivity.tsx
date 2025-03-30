import React from 'react'
import { ThemeInput } from 'react-activity-calendar'
import GitHubCalendar from 'react-github-calendar'

import styles from './styles.module.sass'

const explicitTheme: ThemeInput = {
    light: ['#1b1b1b', '#524508', '#6C590A', '#867C0C', '#FFC107'],
    dark: ['#1b1b1b', '#524508', '#6C590A', '#867C0C', '#FFC107']
}

export const GithubActivity: React.FC = () => (
    <section className={styles.activitySection}>
        <h2 className={'pageTitle'}>{'Work activity'}</h2>
        <GitHubCalendar
            colorScheme={'dark'}
            username={'miksrv'}
            theme={explicitTheme}
        />
    </section>
)

export default GithubActivity
