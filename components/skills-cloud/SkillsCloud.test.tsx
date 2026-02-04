import React from 'react'

import { render, screen } from '@testing-library/react'

import { SkillsCloud } from './SkillsCloud'

import styles from './SkillsCloud.module.css'

// Mock useSiteData to provide experience data
jest.mock('@/utils', () => ({
    useSiteData: () => ({
        experience: [
            {
                period: ['2020', '2021'],
                role: 'Frontend Developer',
                duties: 'Developed UI',
                skills: [{ area: 'Frontend', stack: ['React', 'JavaScript'] }]
            },
            {
                period: ['2021', '2022'],
                role: 'Backend Developer',
                duties: 'Developed API',
                skills: [{ area: 'Backend', stack: ['Node.js', 'Express'] }]
            },
            {
                period: ['2022', '2023'],
                role: 'QA Engineer',
                duties: 'Tested apps',
                skills: [{ area: 'Testing', stack: ['Jest', 'Cypress'] }]
            },
            {
                period: ['2023', '2024'],
                role: 'DevOps',
                duties: 'Maintained infra',
                skills: [{ area: 'DevOps', stack: ['Docker', 'Kubernetes'] }]
            }
        ]
    })
}))

describe('SkillsCloud Component', () => {
    it('renders without crashing', () => {
        render(<SkillsCloud />)
        const skillsSection = screen.getByRole('list')
        expect(skillsSection).toBeInTheDocument()
    })

    it('renders all skills from experience', () => {
        render(<SkillsCloud />)
        expect(screen.getByText('React')).toBeInTheDocument()
        expect(screen.getByText('JavaScript')).toBeInTheDocument()
        expect(screen.getByText('Node.js')).toBeInTheDocument()
        expect(screen.getByText('Express')).toBeInTheDocument()
        expect(screen.getByText('Jest')).toBeInTheDocument()
        expect(screen.getByText('Cypress')).toBeInTheDocument()
        expect(screen.getByText('Docker')).toBeInTheDocument()
        expect(screen.getByText('Kubernetes')).toBeInTheDocument()
    })

    it('renders the correct number of skills', () => {
        render(<SkillsCloud />)
        const skillItems = screen.getAllByRole('listitem')
        expect(skillItems).toHaveLength(8)
    })

    it('applies correct styles to the skills list', () => {
        const { container } = render(<SkillsCloud />)
        const tagsCloud = container.querySelector(`.${styles.tagsCloud as string}`)
        expect(tagsCloud).toBeInTheDocument()
    })
})
