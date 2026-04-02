import React from 'react'

import { render, screen } from '@testing-library/react'

import { Header } from './Header'
import { menu } from './menu'

const observeMock = jest.fn()
const disconnectMock = jest.fn()

beforeEach(() => {
    jest.spyOn(window, 'addEventListener').mockImplementation(() => {})
    jest.spyOn(window, 'removeEventListener').mockImplementation(() => {})

    global.IntersectionObserver = jest.fn().mockImplementation(() => ({
        disconnect: disconnectMock,
        observe: observeMock,
        unobserve: jest.fn()
    }))
})

afterEach(() => {
    jest.restoreAllMocks()
})

describe('Header Component', () => {
    it('renders all menu links', () => {
        render(<Header />)

        menu.forEach((link) => {
            const menuItem = screen.getByText(link.label)

            expect(menuItem).toBeInTheDocument()
            expect(menuItem).toHaveAttribute('href', link.url)
        })
    })

    it('sets up IntersectionObserver for section tracking', () => {
        render(<Header />)

        expect(global.IntersectionObserver).toHaveBeenCalledTimes(1)
    })

    it('registers scroll event listener on mount', () => {
        render(<Header />)

        expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true })
    })

    it('renders anchor links (not router links)', () => {
        render(<Header />)

        menu.forEach((link) => {
            const anchor = screen.getByText(link.label).closest('a')

            expect(anchor?.tagName).toBe('A')
            expect(anchor).toHaveAttribute('href', link.url)
        })
    })
})
