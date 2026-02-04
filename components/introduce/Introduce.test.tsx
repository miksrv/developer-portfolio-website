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

        const ageElement = screen.getByText('My age')
        expect(ageElement).toBeInTheDocument()

        const updatedElement = screen.getByText('Updated')
        expect(updatedElement).toBeInTheDocument()

        const updateValue = screen.getByText(formatDate(update, 'dddd, MMM D, YYYY'))
        expect(updateValue).toBeInTheDocument()
    })

    it('updates age and experience over time', () => {
        render(<Introduce />)

        expect(screen.getByText('My age')).toBeInTheDocument()
        expect(screen.getByText('Experience')).toBeInTheDocument()

        act(() => {
            jest.advanceTimersByTime(1000)

            const ageValue = screen.getByText(
                (content, element) => !!(element?.tagName === 'LI' && element.textContent?.startsWith('My age'))
            )
            expect(ageValue).toBeInTheDocument()

            const expValue = screen.getByText(
                (content, element) => !!(element?.tagName === 'LI' && element.textContent?.startsWith('Experience'))
            )
            expect(expValue).toBeInTheDocument()
        })
    })

    it('renders the description text', () => {
        render(<Introduce />)
        const description = screen.getByText(/Fullstack Software Engineer/i)
        expect(description).toBeInTheDocument()
    })
})
