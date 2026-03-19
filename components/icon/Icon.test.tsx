import React from 'react'

import { render } from '@testing-library/react'

import { Icon } from './Icon'
import { iconNames } from './types'

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

    it('returns null for an unknown icon name', () => {
        const { container } = render(<Icon name={'unknown' as any} />)
        expect(container.firstChild).toBeNull()
    })

    it('logs a console warning in development mode for unknown icon names', () => {
        Object.defineProperty(process.env, 'NODE_ENV', { value: 'development', configurable: true, writable: true })
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

        render(<Icon name={'unknown' as any} />)

        expect(warnSpy).toHaveBeenCalledWith('Icon: unknown name "unknown"')

        warnSpy.mockRestore()
        Object.defineProperty(process.env, 'NODE_ENV', { value: 'test', configurable: true, writable: true })
    })
})
