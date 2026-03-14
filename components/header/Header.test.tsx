import React from 'react'

import { usePathname } from 'next/navigation'
import { render, screen } from '@testing-library/react'

import { Header } from './Header'
import { menu } from './menu'

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

    it('applies active class only to the link matching the current pathname', () => {
        ;(usePathname as jest.Mock).mockReturnValue('/projects')

        render(<Header />)

        menu.forEach((link) => {
            const menuItem = screen.getByText(link.label)

            if (link.url === '/projects') {
                expect(menuItem).toHaveClass('active')
            } else {
                expect(menuItem).not.toHaveClass('active')
            }
        })
    })
})
