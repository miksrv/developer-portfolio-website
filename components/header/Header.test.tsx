import React from 'react'
import { usePathname } from 'next/navigation'

import '@testing-library/jest-dom'

import Header from './Header'
import { menu } from './menu'

import { render, screen } from '@testing-library/react'

jest.mock('next/navigation', () => ({
    usePathname: jest.fn()
}))

describe('Header Component', () => {
    it('renders all menu links', () => {
        ;(usePathname as jest.Mock).mockReturnValue('/')

        render(<Header />)

        menu.forEach((link) => {
            const menuItem = screen.getByText(link.label)
            expect(menuItem).toBeInTheDocument()
            expect(menuItem).toHaveAttribute('href', link.url)
        })
    })

    it('applies active class to the link matching the current pathname', () => {
        const activePath = '/about'
        ;(usePathname as jest.Mock).mockReturnValue(activePath)

        render(<Header />)

        menu.forEach((link) => {
            if (link.label !== 'About') {
                const menuItem = screen.getByText(link.label)
                expect(menuItem).not.toHaveClass('active')
            }
        })
    })
})
