import React from 'react'

import '@testing-library/jest-dom'
import '@testing-library/jest-dom/jest-globals'

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
        // eslint-disable-next-line next/no-img-element
        <img
            alt=''
            {...props}
        />
    )
}))

jest.mock('react-github-calendar', () => ({
    GitHubCalendar: () => <div data-testid='github-calendar' />
}))
