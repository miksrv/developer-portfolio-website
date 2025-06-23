import React from 'react'

import { render, screen } from '@testing-library/react'

import SkillsCloud from './SkillsCloud'

import '@testing-library/jest-dom'

import styles from './SkillsCloud.module.css'

jest.mock('@/data/skills', () => ({
    Frontend: {
        skill1: 'React',
        skill2: 'JavaScript'
    },
    Backend: {
        skill1: 'Node.js',
        skill2: 'Express'
    },
    Testing: {
        skill1: 'Jest',
        skill2: 'Cypress'
    },
    DevOps: {
        skill1: 'Docker',
        skill2: 'Kubernetes'
    }
}))

describe('SkillsCloud Component', () => {
    it('renders without crashing', () => {
        render(<SkillsCloud />)
        const skillsSection = screen.getByRole('list')
        expect(skillsSection).toBeInTheDocument()
    })

    it('renders all skills from Frontend, Backend, Testing, and DevOps', () => {
        render(<SkillsCloud />)

        // Проверяем наличие каждого навыка
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
        expect(skillItems).toHaveLength(8) // 2 skills in each section (Frontend, Backend, Testing, DevOps)
    })

    it('applies correct styles to the skills list', () => {
        const { container } = render(<SkillsCloud />)
        const tagsCloud = container.querySelector(`.${styles.tagsCloud as string}`)
        expect(tagsCloud).toBeInTheDocument()
    })
})
