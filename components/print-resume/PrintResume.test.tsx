import React from 'react'

import { render, screen } from '@testing-library/react'

import { PrintResume } from './PrintResume'

jest.mock('@/public/avatar.jpg', () => ({
    __esModule: true,
    default: 'mocked-avatar.jpg'
}))

jest.mock('@/utils', () => ({
    useSiteData: () => ({
        biography: {
            name: 'John Doe',
            title: 'Software Engineer',
            location: 'New York, USA'
        },
        contactLinks: [
            { icon: 'github', label: 'GitHub', link: 'https://github.com/johndoe' },
            { icon: 'linkedin', label: 'LinkedIn', link: 'https://linkedin.com/in/johndoe' }
        ],
        seo: {
            experience: {
                description: 'Experienced full-stack developer with 10+ years.'
            }
        },
        experience: [
            {
                period: ['2020-01-01', '2022-12-31'],
                role: 'Senior Developer',
                duties: 'Led development of web applications.',
                skills: [
                    { area: 'Frontend', stack: ['React', 'TypeScript'] },
                    { area: 'Backend', stack: ['Node.js', 'PostgreSQL'] }
                ]
            },
            {
                period: ['2018-06-01'],
                role: 'Junior Developer',
                duties: 'Assisted in building REST APIs.',
                skills: []
            }
        ],
        skills: [
            {
                group: 'Frontend',
                skills: [
                    { name: 'React', level: 90 },
                    { name: 'TypeScript', level: 85 }
                ]
            },
            {
                group: 'Backend',
                skills: [{ name: 'Node.js', level: 80 }]
            }
        ]
    })
}))

describe('PrintResume', () => {
    afterEach(() => {
        jest.restoreAllMocks()
    })

    it('renders the print resume container with correct id', () => {
        render(<PrintResume />)
        expect(document.getElementById('print-resume')).toBeInTheDocument()
    })

    it('renders biography name and title', () => {
        render(<PrintResume />)
        expect(screen.getByRole('heading', { level: 1, name: 'John Doe', hidden: true })).toBeInTheDocument()
        expect(screen.getByText('Software Engineer')).toBeInTheDocument()
    })

    it('renders biography location', () => {
        render(<PrintResume />)
        expect(screen.getByText('New York, USA')).toBeInTheDocument()
    })

    it('renders contact links with labels and values', () => {
        render(<PrintResume />)
        expect(screen.getByText('GitHub:')).toBeInTheDocument()
        expect(screen.getByText('https://github.com/johndoe')).toBeInTheDocument()
        expect(screen.getByText('LinkedIn:')).toBeInTheDocument()
        expect(screen.getByText('https://linkedin.com/in/johndoe')).toBeInTheDocument()
    })

    it('renders the summary description', () => {
        render(<PrintResume />)
        expect(screen.getByText('Experienced full-stack developer with 10+ years.')).toBeInTheDocument()
    })

    it('renders the Experience section heading', () => {
        render(<PrintResume />)
        expect(screen.getByRole('heading', { level: 2, name: 'Experience', hidden: true })).toBeInTheDocument()
    })

    it('renders experience roles', () => {
        render(<PrintResume />)
        expect(screen.getByRole('heading', { level: 3, name: 'Senior Developer', hidden: true })).toBeInTheDocument()
        expect(screen.getByRole('heading', { level: 3, name: 'Junior Developer', hidden: true })).toBeInTheDocument()
    })

    it('renders experience duties', () => {
        render(<PrintResume />)
        expect(screen.getByText('Led development of web applications.')).toBeInTheDocument()
        expect(screen.getByText('Assisted in building REST APIs.')).toBeInTheDocument()
    })

    it('renders skill stacks for experience entries with skills', () => {
        const { container } = render(<PrintResume />)
        expect(container.textContent).toContain('Frontend:')
        expect(container.textContent).toContain('React, TypeScript')
        expect(container.textContent).toContain('Backend:')
        expect(container.textContent).toContain('Node.js, PostgreSQL')
    })

    it('does not render a skill list for experience with empty skills', () => {
        const { container } = render(<PrintResume />)
        // Experience[0] has 2 skill areas (Frontend, Backend), experience[1] has none.
        // Each skill area name is wrapped in <strong>, so there should be exactly 2.
        const strongs = container.querySelectorAll('strong')
        expect(strongs).toHaveLength(2)
    })

    it('renders "Present" for an ongoing experience with no end date', () => {
        const { container } = render(<PrintResume />)
        expect(container.textContent).toContain('Present')
    })

    it('renders formatted start and end dates for completed experience', () => {
        const { container } = render(<PrintResume />)
        expect(container.textContent).toContain('Jan 2020')
        expect(container.textContent).toContain('Dec 2022')
    })

    it('renders the Skills section heading', () => {
        render(<PrintResume />)
        expect(screen.getByRole('heading', { level: 2, name: 'Skills', hidden: true })).toBeInTheDocument()
    })

    it('renders skill group titles', () => {
        render(<PrintResume />)
        // h3 headings include experience roles and skill group titles
        const h3s = screen.getAllByRole('heading', { level: 3, hidden: true })
        const names = h3s.map((h) => h.textContent)
        expect(names).toContain('Frontend')
        expect(names).toContain('Backend')
    })

    it('renders individual skill names with level bars', () => {
        render(<PrintResume />)
        expect(screen.getByText('React')).toBeInTheDocument()
        expect(screen.getByText('TypeScript')).toBeInTheDocument()
        expect(screen.getByText('Node.js')).toBeInTheDocument()
    })

    it('applies inline width style to skill fill bars based on level', () => {
        const { container } = render(<PrintResume />)
        // skillFill spans are the only spans with an inline style
        const styledSpans = Array.from(container.querySelectorAll('span[style]'))
        const widths = styledSpans.map((el) => (el as HTMLElement).style.width)
        expect(widths).toContain('90%')
        expect(widths).toContain('85%')
        expect(widths).toContain('80%')
    })

    it('renders the avatar image with the biography name as alt text', () => {
        render(<PrintResume />)
        const images = screen.getAllByTestId('project-image')
        expect(images[0]).toHaveAttribute('alt', 'John Doe')
    })

    it('falls back to "Photo" as avatar alt text when biography name is absent', () => {
        jest.spyOn(require('@/utils'), 'useSiteData').mockReturnValue({
            biography: { title: 'Developer', location: 'Remote' }
        })

        render(<PrintResume />)

        const images = screen.getAllByTestId('project-image')
        expect(images[0]).toHaveAttribute('alt', 'Photo')
    })

    it('matches snapshot', () => {
        const { asFragment } = render(<PrintResume />)
        expect(asFragment()).toMatchSnapshot()
    })
})
