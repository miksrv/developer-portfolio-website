import React from 'react'

import '@testing-library/jest-dom'

import Projects from './Projects'
import styles from './styles.module.sass'

import { render, screen } from '@testing-library/react'

jest.mock('next/image', () => ({
    __esModule: true,
    default: jest.fn(({ src, alt }) => (
        <img
            src={src}
            alt={alt}
            data-testid='project-image'
        />
    ))
}))

jest.mock('./data', () => ({
    data: [
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
}))

describe('Projects Component', () => {
    it('renders the projects correctly', () => {
        render(<Projects />)

        expect(screen.getByText('Project 1')).toBeInTheDocument()
        expect(screen.getByText('Project 2')).toBeInTheDocument()

        expect(screen.getByText('Description for Project 1')).toBeInTheDocument()
        expect(screen.getByText('Description for Project 2')).toBeInTheDocument()
    })

    it('renders project images correctly', () => {
        render(<Projects />)

        const projectImages = screen.getAllByTestId('project-image')
        expect(projectImages[0]).toHaveAttribute('src', '/images/project1.png')
        expect(projectImages[0]).toHaveAttribute('alt', 'Project 1')
        expect(projectImages[1]).toHaveAttribute('src', '/images/project2.png')
        expect(projectImages[1]).toHaveAttribute('alt', 'Project 2')
    })

    it('renders project links correctly', () => {
        render(<Projects />)

        const links = screen.getAllByRole('link')
        expect(links[0]).toHaveAttribute('href', 'https://project1.com')
        expect(links[2]).toHaveAttribute('href', 'https://project2.com')
    })

    it('applies correct styles based on even/odd index', () => {
        const { container } = render(<Projects />)

        const evenProject = container.querySelector(`.${styles.even}`)
        const oddProject = container.querySelector(`.${styles.odd}`)
        expect(evenProject).toBeInTheDocument()
        expect(oddProject).toBeInTheDocument()
    })
})
