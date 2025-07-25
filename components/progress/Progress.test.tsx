import React from 'react'

import { render, screen } from '@testing-library/react'

import Progress from './Progress'

import '@testing-library/jest-dom'

import styles from './styles.module.sass'

describe('Progress Component', () => {
    it('renders 10 segments for progress bar', () => {
        render(<Progress value={50} />)

        const segments = screen.getByRole('progressbar').children
        expect(segments).toHaveLength(10)
    })

    it('applies active class to segments based on the value', () => {
        const { container } = render(<Progress value={50} />)

        const activeSegments = container.querySelectorAll(`.${styles.active}`)
        expect(activeSegments).toHaveLength(5)
    })

    it('renders with no active segments if value is 0 or undefined', () => {
        const { container } = render(<Progress value={0} />)
        const activeSegments = container.querySelectorAll(`.${styles.active}`)
        expect(activeSegments).toHaveLength(0)

        const { container: containerUndefined } = render(<Progress />)
        const activeSegmentsUndefined = containerUndefined.querySelectorAll(`.${styles.active}`)
        expect(activeSegmentsUndefined).toHaveLength(0)
    })

    it('renders all segments as active if value is 100', () => {
        const { container } = render(<Progress value={100} />)
        const activeSegments = container.querySelectorAll(`.${styles.active}`)
        expect(activeSegments).toHaveLength(10)
    })
})
