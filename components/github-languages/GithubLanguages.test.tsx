import React from 'react'

import { render, screen } from '@testing-library/react'

import { GithubLanguages } from './GithubLanguages'

jest.mock('@/utils', () => ({
    useGithubData: jest.fn()
}))

jest.mock('framer-motion', () => {
    const FRAMER_PROPS = new Set([
        'initial',
        'animate',
        'exit',
        'variants',
        'whileInView',
        'viewport',
        'transition',
        'transformOrigin'
    ])
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const React = require('react')

    return {
        motion: {
            div: ({ children, ...rest }: React.HTMLAttributes<HTMLDivElement>) => {
                const domProps = Object.fromEntries(Object.entries(rest).filter(([k]) => !FRAMER_PROPS.has(k)))
                return React.createElement('div', domProps, children)
            }
        }
    }
})

const mockUseGithubData = require('@/utils').useGithubData

const mockData = {
    contributions: null,
    stats: {
        languageDistribution: { TypeScript: 20, JavaScript: 15, Python: 10, Go: 5 },
        totalForks: 0,
        totalStars: 0
    },
    user: null
}

describe('GithubLanguages', () => {
    afterEach(() => jest.clearAllMocks())

    it('renders the section heading', () => {
        mockUseGithubData.mockReturnValue(mockData)
        render(<GithubLanguages />)
        expect(screen.getByRole('heading', { level: 2, name: /Top Languages/i })).toBeInTheDocument()
    })

    it('renders language names', () => {
        mockUseGithubData.mockReturnValue(mockData)
        render(<GithubLanguages />)
        expect(screen.getByText('TypeScript')).toBeInTheDocument()
        expect(screen.getByText('JavaScript')).toBeInTheDocument()
        expect(screen.getByText('Python')).toBeInTheDocument()
    })

    it('renders percentage values', () => {
        mockUseGithubData.mockReturnValue(mockData)
        render(<GithubLanguages />)
        // TypeScript: 20/50 = 40%
        expect(screen.getByText('40%')).toBeInTheDocument()
    })

    it('returns null when no data', () => {
        mockUseGithubData.mockReturnValue(null)
        const { container } = render(<GithubLanguages />)
        expect(container.firstChild).toBeNull()
    })

    it('returns null when distribution is empty', () => {
        mockUseGithubData.mockReturnValue({
            contributions: null,
            stats: { languageDistribution: {}, totalForks: 0, totalStars: 0 },
            user: null
        })
        const { container } = render(<GithubLanguages />)
        expect(container.firstChild).toBeNull()
    })

    it('limits to max 8 languages', () => {
        const manyLangs: Record<string, number> = {}
        for (let i = 0; i < 12; i++) manyLangs[`Lang${i}`] = 10 - i
        mockUseGithubData.mockReturnValue({
            contributions: null,
            stats: { languageDistribution: manyLangs, totalForks: 0, totalStars: 0 },
            user: null
        })
        render(<GithubLanguages />)
        const items = document.querySelectorAll('li')
        expect(items.length).toBeLessThanOrEqual(8)
    })
})
