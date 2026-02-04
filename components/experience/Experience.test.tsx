import React from 'react'

import { render, screen } from '@testing-library/react'

import { Experience } from './Experience'

// Define mock experience data
const mockExperience = [
    {
        period: ['2020-01-01', '2021-01-01'],
        role: 'Frontend Developer',
        duties: 'Developed UI components',
        skills: [
            { area: 'Frontend', stack: ['React', 'TypeScript'] },
            { area: 'Testing', stack: ['Jest', 'RTL'] }
        ]
    },
    {
        period: ['2021-02-01', null],
        role: 'Fullstack Developer',
        duties: 'Built APIs',
        skills: []
    }
]

// Mock useSiteData to provide experience data
jest.mock('@/utils', () => ({
    useSiteData: () => ({
        experience: mockExperience
    })
}))

jest.mock('@/utils/date', () => ({
    formatDate: (date: string, _format: string) => (date == null ? 'Present' : `formatted-${date}`),
    formatPeriod: (period: [string, string | null]) => `period-${period[0]}-${period[1]}`
}))

describe('Experience', () => {
    it('renders a section and experience list', () => {
        render(<Experience />)
        expect(screen.getAllByRole('list').length).toBeGreaterThan(0)
    })

    it('renders all experience items', () => {
        render(<Experience />)
        // Find all listitems with a role and check for the role class
        const items = screen.getAllByRole('listitem').filter((li) => li.className.includes('experienceRole'))
        expect(items).toHaveLength(mockExperience.length)
    })

    it('renders role, duties, and dates for each experience', () => {
        render(<Experience />)
        mockExperience.forEach((item) => {
            expect(screen.getByText(item.role)).toBeInTheDocument()
            expect(screen.getByText(item.duties)).toBeInTheDocument()
            expect(
                screen.getByText(
                    `formatted-${item.period[0]} - ${item.period[1] ? `formatted-${item.period[1]}` : 'Present'}`
                )
            ).toBeInTheDocument()
            expect(screen.getByText(`period-${item.period[0]}-${item.period[1]}`)).toBeInTheDocument()
        })
    })

    it('renders skills if present', () => {
        render(<Experience />)
        expect(screen.getByText('Frontend:')).toBeInTheDocument()
        expect(screen.getByText('React, TypeScript')).toBeInTheDocument()
        expect(screen.getByText('Testing:')).toBeInTheDocument()
        expect(screen.getByText('Jest, RTL')).toBeInTheDocument()
    })

    it('does not render skills list if skills are empty', () => {
        render(<Experience />)
        // Only one experience has skills, so only one skills list should be present
        // Find all ul elements with the skills class
        const skillsLists = document.querySelectorAll('ul[class*="skills"]')
        expect(skillsLists).toHaveLength(1)
    })

    it('matches snapshot', () => {
        const { asFragment } = render(<Experience />)
        expect(asFragment()).toMatchSnapshot()
    })
})
