import React from 'react'

import { render, screen } from '@testing-library/react'

import { useGithubData } from '@/utils'

import { GithubCalendar } from './GithubCalendar'

// ── Mocks ──────────────────────────────────────────────────────────────────────

jest.mock('@/utils', () => ({
    useGithubData: jest.fn()
}))

jest.mock('framer-motion', () => {
    const FRAMER_PROPS = new Set(['initial', 'animate', 'exit', 'variants', 'whileInView', 'viewport', 'transition'])
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
    const React = require('react')

    return {
        Variants: {},
        motion: {
            div: ({ children, ...rest }: React.HTMLAttributes<HTMLDivElement>) => {
                const domProps = Object.fromEntries(Object.entries(rest).filter(([k]) => !FRAMER_PROPS.has(k)))
                return React.createElement('div', domProps, children)
            }
        }
    }
})

const mockUseGithubData = useGithubData as jest.Mock

const makeContributions = (days = 30) =>
    Array.from({ length: days }, (_, i) => {
        const d = new Date()
        d.setDate(d.getDate() - i)
        const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
        return { count: i % 5, date: dateStr, level: (i % 5) as 0 | 1 | 2 | 3 | 4 }
    })

// ── Tests ──────────────────────────────────────────────────────────────────────

describe('GithubCalendar', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders the section heading', () => {
        mockUseGithubData.mockReturnValue(null)
        render(<GithubCalendar />)
        expect(screen.getByRole('heading', { level: 2, name: /Work activity/i })).toBeInTheDocument()
    })

    it('renders the contribution grid', () => {
        mockUseGithubData.mockReturnValue({
            contributions: { contributions: makeContributions(90), total: { '2024': 321 } },
            stats: null,
            user: null
        })
        render(<GithubCalendar />)
        expect(screen.getByRole('grid')).toBeInTheDocument()
    })

    it('renders total contributions when data is present', () => {
        const year = new Date().getFullYear()
        mockUseGithubData.mockReturnValue({
            contributions: { contributions: makeContributions(30), total: { [year]: 488 } },
            stats: null,
            user: null
        })
        render(<GithubCalendar />)
        expect(screen.getByText(/488/)).toBeInTheDocument()
        expect(screen.getByText(new RegExp(String(year)))).toBeInTheDocument()
    })

    it('renders legend with Less and More labels', () => {
        mockUseGithubData.mockReturnValue(null)
        render(<GithubCalendar />)
        expect(screen.getByText('Less')).toBeInTheDocument()
        expect(screen.getByText('More')).toBeInTheDocument()
    })

    it('renders gracefully with null github data', () => {
        mockUseGithubData.mockReturnValue(null)
        render(<GithubCalendar />)
        expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    })

    it('renders gracefully with empty contributions', () => {
        mockUseGithubData.mockReturnValue({
            contributions: { contributions: [], total: {} },
            stats: null,
            user: null
        })
        render(<GithubCalendar />)
        expect(screen.getByRole('grid')).toBeInTheDocument()
    })

    it('matches snapshot', () => {
        mockUseGithubData.mockReturnValue(null)
        const { asFragment } = render(<GithubCalendar />)
        expect(asFragment()).toMatchSnapshot()
    })
})
