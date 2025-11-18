import React from 'react'

import '@testing-library/jest-dom'
import '@testing-library/jest-dom/jest-globals'

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

jest.mock('next/link', () => ({
    __esModule: true,
    default: ({ href, children, ...props }: any) => (
        <a
            href={href}
            {...props}
        >
            {children}
        </a>
    )
}))

jest.mock('react-github-calendar', () => ({
    GitHubCalendar: () => <div data-testid='github-calendar' />
}))
