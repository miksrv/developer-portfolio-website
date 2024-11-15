import React from 'react'

import '@testing-library/jest-dom'

import Experience from './Experience'

import { experience } from '@/data/experience'
import { render, screen } from '@testing-library/react'

jest.mock('@/utils/date', () => ({
    formatDate: jest.fn((date, format) => `${date}-${format}`),
    formatPeriod: jest.fn(() => 'mocked period')
}))

describe('Experience Component', () => {
    it('renders without crashing', () => {
        render(<Experience />)
        const sectionElement = screen.getAllByText('Senior Frontend Developer')
        expect(sectionElement.length).toBeGreaterThan(0)
    })

    it('renders each experience item with correct dates, role, and duties', () => {
        render(<Experience />)

        experience.forEach((item) => {
            const formattedStartDate = `${item.period?.[0]}-MMM YYYY`
            const formattedEndDate = item.period?.[1] ? `${item.period?.[1]}-MMM YYYY` : 'Present'

            const dateElement = screen.getByText(`${formattedStartDate} - ${formattedEndDate}`)
            expect(dateElement).toBeInTheDocument()

            const dutiesElement = screen.getByText(item.duties)
            expect(dutiesElement).toBeInTheDocument()
        })
    })

    it('renders skills if they exist', () => {
        render(<Experience />)

        experience.forEach((item) => {
            item?.skills?.forEach((skill) => {
                const skillAreaElements = screen.getAllByText(`${skill.area}:`)
                expect(skillAreaElements.length).toBeGreaterThan(0)

                skillAreaElements.forEach((skillAreaElement) => {
                    expect(skillAreaElement).toBeInTheDocument()

                    // const stackElement = skillAreaElement.nextElementSibling
                    // expect(stackElement).toHaveTextContent(skill.stack.join(', '))
                })
            })
        })
    })
})
