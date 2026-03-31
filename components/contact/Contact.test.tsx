import React from 'react'

import { render, screen } from '@testing-library/react'

import { Contact } from './Contact'

jest.mock('@/utils', () => ({
    useSiteData: () => ({
        biography: { availableForWork: true },
        contactLinks: [
            { icon: 'github', label: 'GitHub', link: 'https://github.com/miksrv' },
            { icon: 'telegram', label: 'Telegram', link: 'https://t.me/miksoft' }
        ]
    })
}))

describe('Contact', () => {
    it('renders section title', () => {
        render(<Contact />)
        expect(screen.getByText('Get In Touch')).toBeInTheDocument()
    })

    it('renders available for work badge when true', () => {
        render(<Contact />)
        expect(screen.getByText('Open to new opportunities')).toBeInTheDocument()
    })

    it('renders all social links', () => {
        render(<Contact />)
        expect(screen.getByText('GitHub')).toBeInTheDocument()
        expect(screen.getByText('Telegram')).toBeInTheDocument()
    })

    it('renders social links with correct hrefs', () => {
        render(<Contact />)
        expect(screen.getByTitle('GitHub')).toHaveAttribute('href', 'https://github.com/miksrv')
        expect(screen.getByTitle('Telegram')).toHaveAttribute('href', 'https://t.me/miksoft')
    })
})
