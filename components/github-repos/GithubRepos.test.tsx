import React from 'react'

import { render, screen } from '@testing-library/react'

import { GithubRepos } from './GithubRepos'

jest.mock('@/utils', () => ({
    useGithubData: jest.fn()
}))

jest.mock('framer-motion', () => {
    const FRAMER_PROPS = new Set(['initial', 'animate', 'exit', 'variants', 'whileInView', 'viewport', 'transition'])
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const React = require('react')

    return {
        motion: {
            li: ({ children, ...rest }: React.HTMLAttributes<HTMLLIElement>) => {
                const domProps = Object.fromEntries(Object.entries(rest).filter(([k]) => !FRAMER_PROPS.has(k)))
                return React.createElement('li', domProps, children)
            },
            ul: ({ children, ...rest }: React.HTMLAttributes<HTMLUListElement>) => {
                const domProps = Object.fromEntries(Object.entries(rest).filter(([k]) => !FRAMER_PROPS.has(k)))
                return React.createElement('ul', domProps, children)
            }
        }
    }
})

const mockUseGithubData = require('@/utils').useGithubData

const mockRepos = [
    {
        description: 'A cool project',
        forks: 3,
        language: 'TypeScript',
        name: 'repo-one',
        stars: 42,
        url: 'https://github.com/test/repo-one'
    },
    {
        description: null,
        forks: 1,
        language: 'Go',
        name: 'repo-two',
        stars: 10,
        url: 'https://github.com/test/repo-two'
    }
]

describe('GithubRepos', () => {
    afterEach(() => jest.clearAllMocks())

    it('renders section heading', () => {
        mockUseGithubData.mockReturnValue({ topRepos: mockRepos })
        render(<GithubRepos />)
        expect(screen.getByRole('heading', { level: 2, name: /Top Repositories/i })).toBeInTheDocument()
    })

    it('renders repo names', () => {
        mockUseGithubData.mockReturnValue({ topRepos: mockRepos })
        render(<GithubRepos />)
        expect(screen.getByText('repo-one')).toBeInTheDocument()
        expect(screen.getByText('repo-two')).toBeInTheDocument()
    })

    it('renders repo descriptions', () => {
        mockUseGithubData.mockReturnValue({ topRepos: mockRepos })
        render(<GithubRepos />)
        expect(screen.getByText('A cool project')).toBeInTheDocument()
    })

    it('renders repo links with correct href', () => {
        mockUseGithubData.mockReturnValue({ topRepos: mockRepos })
        render(<GithubRepos />)
        const link = screen.getByRole('link', { name: /repo-one/i })
        expect(link).toHaveAttribute('href', 'https://github.com/test/repo-one')
    })

    it('renders star and fork counts', () => {
        mockUseGithubData.mockReturnValue({ topRepos: mockRepos })
        render(<GithubRepos />)
        expect(screen.getByText('42')).toBeInTheDocument()
        expect(screen.getByText('10')).toBeInTheDocument()
    })

    it('returns null when no repos', () => {
        mockUseGithubData.mockReturnValue({ topRepos: [] })
        const { container } = render(<GithubRepos />)
        expect(container.firstChild).toBeNull()
    })

    it('returns null when github data is null', () => {
        mockUseGithubData.mockReturnValue(null)
        const { container } = render(<GithubRepos />)
        expect(container.firstChild).toBeNull()
    })
})
