import React from 'react'

import { render, screen } from '@testing-library/react'

import { GithubActivity } from './GithubActivity'

// Mock styles
jest.mock('./styles.module.sass', () => ({
    activitySection: 'activitySection'
}))

// Mock GitHubCalendar
const mockGitHubCalendar = jest.fn(() => <div data-testid='github-calendar' />)
jest.mock('react-github-calendar', () => ({
    GitHubCalendar: () => mockGitHubCalendar()
}))

describe('GithubActivity', () => {
    beforeEach(() => {
        mockGitHubCalendar.mockClear()
    })

    it('renders the section with correct class', () => {
        render(<GithubActivity />)
        const section = document.querySelector('section')
        expect(section).toBeInTheDocument()
        expect(section).toHaveClass('activitySection')
    })

    it('renders the heading', () => {
        render(<GithubActivity />)
        expect(screen.getByRole('heading', { level: 2, name: /Work activity/i })).toBeInTheDocument()
    })

    it('renders the GitHubCalendar component', () => {
        render(<GithubActivity />)
        expect(screen.getByTestId('github-calendar')).toBeInTheDocument()
    })

    it('passes correct props to GitHubCalendar', () => {
        render(<GithubActivity />)
        expect(mockGitHubCalendar).toHaveBeenCalledWith()
    })

    it('matches snapshot', () => {
        const { asFragment } = render(<GithubActivity />)
        expect(asFragment()).toMatchSnapshot()
    })
})
