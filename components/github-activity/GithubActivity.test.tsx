import React from 'react'

import { render, screen } from '@testing-library/react'

import GithubActivity from './GithubActivity'

import '@testing-library/jest-dom'

jest.mock('react-github-calendar', () => ({
    __esModule: true,
    default: (props: React.ReactElement) => (
        <div
            data-testid='github-calendar'
            {...props}
        />
    )
}))

describe('GithubActivity Component', () => {
    it('renders the section title', () => {
        render(<GithubActivity />)
        const titleElement = screen.getByText(/Work activity/i)
        expect(titleElement).toBeInTheDocument()
    })

    it('renders the GitHub calendar', () => {
        render(<GithubActivity />)
        const calendarElement = screen.getByTestId('github-calendar')
        expect(calendarElement).toBeInTheDocument()
    })
})
