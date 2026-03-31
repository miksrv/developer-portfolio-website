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
    })
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
    })

    it('renders the stats section container', () => {
        render(<Stats />)
        expect(document.querySelector('section')).toBeInTheDocument()
    })
})
