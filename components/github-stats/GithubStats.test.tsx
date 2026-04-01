import React from 'react'

import { render, screen } from '@testing-library/react'

import { GithubStats } from './GithubStats'

jest.mock('@/utils', () => ({
    useGithubData: jest.fn()
}))

jest.mock('@/components/github-calendar/utils', () => ({
    getTotalThisYear: jest.fn(() => 488)
}))

jest.mock('framer-motion', () => {
    const FRAMER_PROPS = new Set(['initial', 'animate', 'exit', 'variants', 'whileInView', 'viewport', 'transition'])
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const React = require('react')

    return {
        animate: jest.fn((_, toValue, opts) => {
            if (opts?.onUpdate) {
                opts.onUpdate(toValue)
            }
            return { stop: jest.fn() }
        }),
        motion: {
            span: ({ children, ...rest }: React.HTMLAttributes<HTMLSpanElement>) => {
                const domProps = Object.fromEntries(Object.entries(rest).filter(([k]) => !FRAMER_PROPS.has(k)))
                return React.createElement('span', domProps, children)
            }
        },
        useInView: jest.fn(() => true),
        useMotionValue: jest.fn(() => ({ get: () => 0, set: jest.fn() })),
        useTransform: jest.fn(() => 0)
    }
})

beforeEach(() => {
    global.IntersectionObserver = jest.fn().mockImplementation(() => ({
        disconnect: jest.fn(),
        observe: jest.fn(),
        unobserve: jest.fn()
    }))
})

const mockUseGithubData = require('@/utils').useGithubData

describe('GithubStats', () => {
    afterEach(() => jest.clearAllMocks())

    it('renders the section heading', () => {
        mockUseGithubData.mockReturnValue(null)
        render(<GithubStats />)
        expect(screen.getByRole('heading', { level: 2, name: /GitHub Stats/i })).toBeInTheDocument()
    })

    it('renders all stat labels', () => {
        mockUseGithubData.mockReturnValue(null)
        render(<GithubStats />)
        expect(screen.getByText('Total Stars')).toBeInTheDocument()
        expect(screen.getByText('Total Forks')).toBeInTheDocument()
        expect(screen.getByText('Public Repos')).toBeInTheDocument()
        expect(screen.getByText('Followers')).toBeInTheDocument()
        expect(screen.getByText('Contributions This Year')).toBeInTheDocument()
    })

    it('renders with github data', () => {
        mockUseGithubData.mockReturnValue({
            contributions: { contributions: [], total: { '2024': 321 } },
            stats: { totalStars: 42, totalForks: 10, languageDistribution: {} },
            user: { login: 'test', publicRepos: 30, followers: 100, following: 50 }
        })
        render(<GithubStats />)
        expect(screen.getByText('Total Stars')).toBeInTheDocument()
    })

    it('renders gracefully with null data', () => {
        mockUseGithubData.mockReturnValue(null)
        render(<GithubStats />)
        expect(document.querySelector('section')).toBeInTheDocument()
    })
})
