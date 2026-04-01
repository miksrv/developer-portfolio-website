import React from 'react'

import { render, screen } from '@testing-library/react'

import * as utils from '@/utils'

import { About } from './About'

jest.mock('next/image', () => ({
    __esModule: true,
    // eslint-disable-next-line next/no-img-element
    default: jest.fn(({ alt }: { alt: string }) => <img alt={alt} />)
}))

jest.mock('@/utils', () => ({
    useSiteData: () => ({
        biography: {
            bio: {
                lead: 'I architect and deliver full-stack systems — from greenfield design to production.',
                bullets: [
                    'Full-stack ownership: system architecture, REST APIs, and frontend products',
                    'Engineering leadership across government agencies, media companies, and tech startups'
                ]
            }
        }
    })
}))

describe('About Component', () => {
    afterEach(() => {
        jest.restoreAllMocks()
    })

    it('renders the section title', () => {
        render(<About />)
        expect(screen.getByRole('heading', { level: 2, name: /About me/i })).toBeInTheDocument()
    })

    it('renders the image with correct alt text', () => {
        render(<About />)
        expect(screen.getByAltText(/Photo of me/i)).toBeInTheDocument()
    })

    it('renders the lead paragraph from data', () => {
        render(<About />)
        expect(screen.getByText(/I architect and deliver full-stack systems/i)).toBeInTheDocument()
    })

    it('renders bullet highlights from data', () => {
        render(<About />)
        expect(screen.getByText(/Full-stack ownership/i)).toBeInTheDocument()
        expect(screen.getByText(/Engineering leadership/i)).toBeInTheDocument()
    })

    it('renders nothing when bio is absent', () => {
        jest.spyOn(utils, 'useSiteData').mockReturnValue({ biography: {} })
        render(<About />)
        expect(screen.getByRole('heading', { level: 2, name: /About me/i })).toBeInTheDocument()
    })

    it('matches the snapshot', () => {
        const { asFragment } = render(<About />)
        expect(asFragment()).toMatchSnapshot()
    })
})
