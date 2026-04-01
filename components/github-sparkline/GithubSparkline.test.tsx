import React from 'react'

import { render, screen } from '@testing-library/react'

import { useGithubData } from '@/utils'

import { GithubSparkline } from './GithubSparkline'

jest.mock('@/utils', () => ({
    useGithubData: jest.fn()
}))

jest.mock('framer-motion', () => {
    const FRAMER_PROPS = new Set(['initial', 'animate', 'exit', 'variants', 'whileInView', 'viewport', 'transition'])
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
    const React = require('react')

    return {
        motion: {
            polygon: ({ children, ...rest }: React.SVGAttributes<SVGPolygonElement>) => {
                const domProps = Object.fromEntries(Object.entries(rest).filter(([k]) => !FRAMER_PROPS.has(k)))
                return React.createElement('polygon', domProps, children)
            },
            polyline: ({ children, ...rest }: React.SVGAttributes<SVGPolylineElement>) => {
                const domProps = Object.fromEntries(Object.entries(rest).filter(([k]) => !FRAMER_PROPS.has(k)))
                return React.createElement('polyline', domProps, children)
            }
        }
    }
})

const mockUseGithubData = useGithubData as jest.Mock

const makeContributions = (count = 30) =>
    Array.from({ length: count }, (_, i) => {
        const d = new Date()
        d.setDate(d.getDate() - i)
        const pad = (n: number) => String(n).padStart(2, '0')
        const dateStr = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
        return { count: (i % 5) + 1, date: dateStr, level: 1 as const }
    })

describe('GithubSparkline', () => {
    afterEach(() => jest.clearAllMocks())

    it('renders the section heading', () => {
        mockUseGithubData.mockReturnValue(null)
        render(<GithubSparkline />)
        expect(screen.getByRole('heading', { level: 2, name: /Commit Activity/i })).toBeInTheDocument()
    })

    it('renders the subtitle', () => {
        mockUseGithubData.mockReturnValue(null)
        render(<GithubSparkline />)
        expect(screen.getByText(/Last 52 weeks/i)).toBeInTheDocument()
    })

    it('renders SVG element', () => {
        mockUseGithubData.mockReturnValue(null)
        render(<GithubSparkline />)
        expect(screen.getByRole('img', { name: /sparkline/i })).toBeInTheDocument()
    })

    it('renders path when data has activity', () => {
        mockUseGithubData.mockReturnValue({
            contributions: { contributions: makeContributions(60), total: {} },
            stats: null,
            user: null
        })
        render(<GithubSparkline />)
        expect(document.querySelector('path')).toBeInTheDocument()
    })

    it('renders no path when no activity', () => {
        mockUseGithubData.mockReturnValue({
            contributions: { contributions: [], total: {} },
            stats: null,
            user: null
        })
        render(<GithubSparkline />)
        expect(document.querySelector('path')).not.toBeInTheDocument()
    })

    it('renders gracefully with null data', () => {
        mockUseGithubData.mockReturnValue(null)
        render(<GithubSparkline />)
        expect(document.querySelector('svg')).toBeInTheDocument()
    })
})
