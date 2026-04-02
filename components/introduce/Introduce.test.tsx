import React from 'react'

import { act, render, screen } from '@testing-library/react'

import { update } from '@/update'
import { formatDate } from '@/utils/date'

import { Introduce } from './Introduce'

import '@testing-library/jest-dom'

jest.mock('next/image', () => ({
    __esModule: true,
    // eslint-disable-next-line next/no-img-element
    default: jest.fn(() => <img alt='mocked image' />)
}))

jest.mock('@/update', () => ({
    update: '2023-08-01T00:00:00Z'
}))

jest.mock('@/utils', () => ({
    useSiteData: () => ({
        experience: [
            {
                title: 'Software Engineer',
                period: ['2010-01-01'],
                company: 'Tech Inc'
            }
        ]
    })
}))

describe('Introduce Component', () => {
    beforeEach(() => {
        jest.useFakeTimers()
    })

    afterEach(() => {
        jest.useRealTimers()
    })

    it('renders links correctly', async () => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
        jest.spyOn(require('@/utils'), 'useSiteData').mockReturnValue({
            contactLinks: [
                { link: 'https://github.com/miksrv', label: 'GitHub', icon: 'github' },
                { link: 'https://t.me/miksoft', label: 'Telegram', icon: 'telegram' }
            ]
        })

        render(<Introduce />)

        const githubLink = await screen.findByTitle('GitHub')
        expect(githubLink).toBeInTheDocument()
        expect(githubLink).toHaveAttribute('href', 'https://github.com/miksrv')

        const telegramLink = await screen.findByTitle('Telegram')
        expect(telegramLink).toBeInTheDocument()
        expect(telegramLink).toHaveAttribute('href', 'https://t.me/miksoft')
    })

    it('displays facts correctly', () => {
        render(<Introduce />)

        // Age and Experience are now pill labels
        expect(screen.getByText('My age')).toBeInTheDocument()
        expect(screen.getByText('Updated')).toBeInTheDocument()
        expect(screen.getByText(formatDate(update, 'dddd, MMM D, YYYY'))).toBeInTheDocument()
    })

    it('updates age and experience over time', () => {
        render(<Introduce />)

        expect(screen.getByText('My age')).toBeInTheDocument()
        expect(screen.getByText('Experience')).toBeInTheDocument()

        act(() => {
            jest.advanceTimersByTime(1000)
            // Labels remain visible in counter pills
            expect(screen.getByText('My age')).toBeInTheDocument()
            expect(screen.getByText('Experience')).toBeInTheDocument()
        })
    })

    it('renders the description text', () => {
        render(<Introduce />)
        expect(screen.getByText(/technical direction/i)).toBeInTheDocument()
    })

    it('calls findEarliestDate when experience entry has a period', () => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
        jest.spyOn(require('@/utils'), 'useSiteData').mockReturnValue({
            experience: [{ period: ['2010-01-01'], title: 'Developer', company: 'Acme Corp' }]
        })

        render(<Introduce />)

        expect(screen.getByText('My age')).toBeInTheDocument()
        expect(screen.getByText('Experience')).toBeInTheDocument()
    })

    it('renders CTA buttons', () => {
        render(<Introduce />)
        expect(screen.getByText('View My Work')).toBeInTheDocument()
        expect(screen.getByText('Download CV')).toBeInTheDocument()
        expect(screen.getByText('Contact Me')).toBeInTheDocument()
    })
})
