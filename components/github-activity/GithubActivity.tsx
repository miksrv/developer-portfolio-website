import React from 'react'
import { ThemeInput } from 'react-activity-calendar'
import GitHubCalendar from 'react-github-calendar'

import styles from './styles.module.sass'

const explicitTheme: ThemeInput = {
    light: ['#f0f0f0', '#c4edde', '#7ac7c4', '#f73859', '#384259'],
    dark: ['#1b1b1b', '#524508', '#6C590A', '#867C0C', '#FFC107']
}

export const GithubActivity: React.FC = () => (
    <section className={styles.activitySection}>
        <h2 className={'pageTitle'}>{'Work activity'}</h2>
        <GitHubCalendar
            username={'miksrv'}
            theme={explicitTheme}
        />
    </section>
)

export default GithubActivity
