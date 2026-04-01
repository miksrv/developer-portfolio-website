import React from 'react'

import { render, screen } from '@testing-library/react'

import { Stats } from './Stats'

beforeEach(() => {
    global.IntersectionObserver = jest.fn().mockImplementation(() => ({
        disconnect: jest.fn(),
        observe: jest.fn(),
        unobserve: jest.fn()
    }))
})

afterEach(() => {
    jest.restoreAllMocks()
})

jest.mock('@/utils', () => ({
    useSiteData: () => ({
        experience: [
            { period: ['06/01/2005'], role: 'Eng', duties: '', skills: [] },
            { period: ['01/01/2010', '01/01/2015'], role: 'Dev', duties: '', skills: [] }
        ],
        projects: [{ title: 'P1' }, { title: 'P2' }, { title: 'P3' }]
    }),
    useGithubData: () => null
}))

jest.mock('@/utils/github-streak', () => ({
    calculateStreak: () => ({ currentStreak: 5, longestStreak: 14, totalContributions: 300 })
}))

jest.mock('@/components/introduce/utils', () => ({
    findEarliestDate: () => '2005-06-01'
}))

describe('Stats', () => {
    it('renders all stat labels', () => {
        render(<Stats />)
        expect(screen.getByText('Years of experience')).toBeInTheDocument()
        expect(screen.getByText('Roles & companies')).toBeInTheDocument()
        expect(screen.getByText('Pet projects')).toBeInTheDocument()
        expect(screen.getByText('Current streak (days)')).toBeInTheDocument()
        expect(screen.getByText('Longest streak (days)')).toBeInTheDocument()
    })

    it('renders the stats section container', () => {
        render(<Stats />)
        expect(document.querySelector('section')).toBeInTheDocument()
    })
})
