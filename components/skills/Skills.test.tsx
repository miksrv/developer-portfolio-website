import React from 'react'

import '@testing-library/jest-dom'

import Skills from './Skills'
import styles from './styles.module.sass'

import { render, screen } from '@testing-library/react'

jest.mock('../progress', () => ({
    __esModule: true,
    default: jest.fn(({ value }) => <div data-testid='progress-bar'>Progress: {value}</div>)
}))

jest.mock('./data', () => ({
    data: [
        {
            group: 'Frontend',
            skills: [
                { name: 'React', level: 80 },
                { name: 'JavaScript', level: 90 }
            ]
        },
        {
            group: 'Backend',
            skills: [
                { name: 'Node.js', level: 75 },
                { name: 'Express', level: 70 }
            ]
        }
    ]
}))

describe('Skills Component', () => {
    it('renders the skill groups and skills correctly', () => {
        render(<Skills />)

        expect(screen.getByText('Frontend')).toBeInTheDocument()
        expect(screen.getByText('Backend')).toBeInTheDocument()

        expect(screen.getByText('React')).toBeInTheDocument()
        expect(screen.getByText('JavaScript')).toBeInTheDocument()
        expect(screen.getByText('Node.js')).toBeInTheDocument()
        expect(screen.getByText('Express')).toBeInTheDocument()
    })

    it('renders Progress component with correct values for each skill', () => {
        render(<Skills />)

        const progressBars = screen.getAllByTestId('progress-bar')
        expect(progressBars[0]).toHaveTextContent('Progress: 80')
        expect(progressBars[1]).toHaveTextContent('Progress: 90')
        expect(progressBars[2]).toHaveTextContent('Progress: 75')
        expect(progressBars[3]).toHaveTextContent('Progress: 70')
    })

    it('renders the correct number of skill groups and skills', () => {
        render(<Skills />)

        const skillGroups = screen.getAllByRole('heading', { level: 3 })
        expect(skillGroups.length).toBe(2)

        const skillItems = screen.getAllByRole('listitem')
        expect(skillItems.length).toBe(4)
    })

    it('applies correct styles to the skill container', () => {
        const { container } = render(<Skills />)
        const skillContainer = container.querySelector(`.${styles.skillContainer}`)
        expect(skillContainer).toBeInTheDocument()
    })
})
