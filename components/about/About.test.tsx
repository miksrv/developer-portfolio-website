import React from 'react'

import { render, screen } from '@testing-library/react'

import { About } from './About'

jest.mock('./photo.jpg', () => ({
    __esModule: true,
    default: 'mocked-photo.jpg'
}))

describe('About Component', () => {
    it('renders the section title', () => {
        render(<About />)
        expect(screen.getByRole('heading', { level: 2, name: /About me/i })).toBeInTheDocument()
    })

    it('renders the image with correct alt text and src', () => {
        render(<About />)
        const image = screen.getByAltText(/Photo of me/i)
        expect(image).toBeInTheDocument()
        expect(image.getAttribute('src')).toContain('mocked-photo.jpg')
    })

    it('renders the first paragraph about programming', () => {
        render(<About />)
        expect(screen.getByText(/Programming is both my profession and my hobby/i)).toBeInTheDocument()
    })

    it('renders the second paragraph about hobbies and family', () => {
        render(<About />)
        expect(screen.getByText(/Outside of coding, my hobbies are a big part of my life/i)).toBeInTheDocument()
    })

    it('matches the snapshot', () => {
        const { asFragment } = render(<About />)
        expect(asFragment()).toMatchSnapshot()
    })
})
