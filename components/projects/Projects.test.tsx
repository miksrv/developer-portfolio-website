import React from 'react'

import { render, screen } from '@testing-library/react'

import { Projects } from './Projects'

jest.mock('@/components/icon', () => ({
    Icon: ({ name }: { name: string }) => (
        <span
            data-testid='icon'
            data-name={name}
        />
    )
}))

jest.mock('@/components/page-transition', () => ({
    PageTransition: ({ children }: { children: React.ReactNode }) => <div data-testid='pagetransition'>{children}</div>
}))

jest.mock('@/utils', () => ({
    useSiteData: () => ({
        projects: [
            {
                title: 'Project 1',
                link: 'https://project1.com',
                image: '/images/project1.png',
                description: 'Description for Project 1'
            },
            {
                title: 'Project 2',
                link: 'https://project2.com',
                image: '/images/project2.png',
                description: 'Description for Project 2'
            }
        ]
    })
}))

jest.mock('./styles.module.sass', () => ({
    projectsContainer: 'projectsContainer',
    item: 'item',
    description: 'description',
    info: 'info'
}))

describe('Projects', () => {
    afterEach(() => {
        jest.restoreAllMocks()
    })

    it('renders all projects with titles and descriptions', () => {
        render(<Projects />)
        expect(screen.getByText('Project 1')).toBeInTheDocument()
        expect(screen.getByText('Project 2')).toBeInTheDocument()
        expect(screen.getByText('Description for Project 1')).toBeInTheDocument()
        expect(screen.getByText('Description for Project 2')).toBeInTheDocument()
    })

    it('renders project images with correct src and alt', () => {
        render(<Projects />)
        const images = screen.getAllByTestId('project-image')
        expect(images[0]).toHaveAttribute('src', '/images/project1.png')
        expect(images[0]).toHaveAttribute('alt', 'Project 1')
        expect(images[1]).toHaveAttribute('src', '/images/project2.png')
        expect(images[1]).toHaveAttribute('alt', 'Project 2')
    })

    it('renders project links with correct href', () => {
        render(<Projects />)
        // Image links are aria-hidden, so only the visible website links are accessible
        const links = screen.getAllByRole('link')
        expect(links[0]).toHaveAttribute('href', 'https://project1.com')
        expect(links[1]).toHaveAttribute('href', 'https://project2.com')
    })

    it('renders icon for each project', () => {
        render(<Projects />)
        const icons = screen.getAllByTestId('icon')
        expect(icons).toHaveLength(2)
    })

    it('renders PageTransition wrapper', () => {
        render(<Projects />)
        expect(screen.getByTestId('pagetransition')).toBeInTheDocument()
    })

    it('renders project container and description structure', () => {
        const { container } = render(<Projects />)
        expect(container.querySelector('.projectsContainer')).toBeInTheDocument()
        expect(container.querySelectorAll('.item')).toHaveLength(2)
        expect(container.querySelectorAll('.description')).toHaveLength(2)
        expect(container.querySelectorAll('.info')).toHaveLength(2)
    })

    it('matches snapshot', () => {
        const { asFragment } = render(<Projects />)
        expect(asFragment()).toMatchSnapshot()
    })

    it('renders GitHub repository link when project has github property', () => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        jest.spyOn(require('@/utils'), 'useSiteData').mockReturnValue({
            projects: [
                {
                    title: 'Open Source Project',
                    link: 'https://example.com',
                    image: '/images/project.png',
                    github: 'https://github.com/example/repo'
                }
            ]
        })

        render(<Projects />)
        expect(screen.getByText('GitHub Repository')).toBeInTheDocument()
        expect(screen.getByText('GitHub Repository').closest('a')).toHaveAttribute(
            'href',
            'https://github.com/example/repo'
        )
    })
})
