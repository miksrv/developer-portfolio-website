import React from 'react'

import { render, screen } from '@testing-library/react'

import { Skills } from './Skills'

// Mock data
jest.mock('./types', () => ({
    data: [
        {
            group: 'Frontend',
            skills: [
                { name: 'React', level: 90 },
                { name: 'TypeScript', level: 80 }
            ]
        },
        {
            group: 'Backend',
            skills: [{ name: 'Node.js', level: 70 }]
        }
    ]
}))

// Mock Progress component
jest.mock('../progress', () => ({
    Progress: ({ value }: { value: number }) => (
        <div
            data-testid='progress'
            data-value={value}
        />
    )
}))

jest.mock('@/utils', () => ({
    useSiteData: () => ({
        skills: [
            {
                group: 'Frontend',
                skills: [
                    { name: 'React', level: 90 },
                    { name: 'TypeScript', level: 80 }
                ]
            },
            {
                group: 'Backend',
                skills: [{ name: 'Node.js', level: 70 }]
            }
        ]
    })
}))

describe('Skills', () => {
    it('renders all skill groups', () => {
        render(<Skills />)
        expect(screen.getByText('Frontend')).toBeInTheDocument()
        expect(screen.getByText('Backend')).toBeInTheDocument()
    })

    it('renders all skills with correct labels', () => {
        render(<Skills />)
        expect(screen.getByText('React')).toBeInTheDocument()
        expect(screen.getByText('TypeScript')).toBeInTheDocument()
        expect(screen.getByText('Node.js')).toBeInTheDocument()
    })

    it('renders a Progress component for each skill with correct value', () => {
        render(<Skills />)
        const progresses = screen.getAllByTestId('progress')
        expect(progresses).toHaveLength(3)
        expect(progresses[0]).toHaveAttribute('data-value', '90')
        expect(progresses[1]).toHaveAttribute('data-value', '80')
        expect(progresses[2]).toHaveAttribute('data-value', '70')
    })

    it('renders correct structure and class names', () => {
        render(<Skills />)
        expect(document.querySelector('section')).toBeInTheDocument()
        expect(document.querySelector('.skillContainer')).toBeInTheDocument()
        expect(document.querySelectorAll('.skillGroup')).toHaveLength(2)
        expect(document.querySelectorAll('.skillList')).toHaveLength(2)
        expect(document.querySelectorAll('.label')).toHaveLength(3)
    })

    it('matches snapshot', () => {
        const { asFragment } = render(<Skills />)
        expect(asFragment()).toMatchSnapshot()
    })
})
