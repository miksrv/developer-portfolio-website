import React from 'react'

import '@testing-library/jest-dom'
import '@testing-library/jest-dom/jest-globals'

jest.mock('next/image', () => ({
    __esModule: true,
    default: jest.fn(({ src, alt }) => (
        // eslint-disable-next-line next/no-img-element
        <img
            src={src}
            alt={alt}
            data-testid='project-image'
        />
    ))
}))

jest.mock('next/link', () => ({
    __esModule: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
