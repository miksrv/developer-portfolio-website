import React from 'react'

import '@testing-library/jest-dom'

import About from './About'

import { render, screen } from '@testing-library/react'

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
        return (
            <img
                alt=''
                {...props}
            />
        )
    }
}))

jest.mock('./photo.jpg', () => ({
    __esModule: true,
    default: 'mocked-photo.jpg'
}))

describe('About Component', () => {
    it('renders the section title', () => {
        render(<About />)
        const titleElement = screen.getByText(/About me/i)
        expect(titleElement).toBeInTheDocument()
    })

    it('renders the image with correct alt text', () => {
        render(<About />)
        const imageElement = screen.getByAltText(/Photo of me/i)
        expect(imageElement).toBeInTheDocument()
    })

    it('renders the first paragraph about programming', () => {
        render(<About />)
        const firstParagraph = screen.getByText(/Programming is both my profession and my hobby/i)
        expect(firstParagraph).toBeInTheDocument()
    })

    it('renders the second paragraph about hobbies and family', () => {
        render(<About />)
        const secondParagraph = screen.getByText(/Outside of coding, my hobbies are a big part of my life/i)
        expect(secondParagraph).toBeInTheDocument()
    })
})
