import React from 'react'

import '@testing-library/jest-dom/jest-globals'
import '@testing-library/jest-dom'

import Icon from './Icon'
import { iconNames } from './types'

import { render } from '@testing-library/react'

describe('Icon Component', () => {
    const iconKeys = Object.keys(iconNames) as Array<keyof typeof iconNames>

    iconKeys.forEach((iconKey) => {
        it(`renders the ${iconKey} icon correctly`, () => {
            const { container } = render(<Icon name={iconNames[iconKey]} />)
            const svgElement = container.querySelector('svg')
            expect(svgElement).toBeInTheDocument()
        })
    })

    it('renders with default props if no additional props are provided', () => {
        const { container } = render(<Icon name={iconNames.telegram} />)

        const svgElement = container.querySelector('svg')
        expect(svgElement).toHaveAttribute('viewBox', '140 136 240 240')
    })
})
