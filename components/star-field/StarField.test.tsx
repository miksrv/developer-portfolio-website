import React from 'react'

import { render, screen } from '@testing-library/react'

import { StarField } from './StarField'

describe('StarField Component', () => {
    // eslint-disable-next-line jest/no-hooks
    beforeAll(() => {
        const mockGetContext = jest.fn().mockReturnValue({
            fillRect: jest.fn(),
            clearRect: jest.fn()
        })
        Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
            value: mockGetContext,
            writable: true
        })
    })

    beforeEach(() => {
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => {
            return setTimeout(() => cb(performance.now()), 16) as unknown as number
        })
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    it('renders a canvas element', () => {
        render(<StarField />)
        const canvas = screen.getByRole('img')
        expect(canvas).toBeInTheDocument()
        expect(canvas.tagName).toBe('CANVAS')
    })

    it('applies the correct styles to the canvas element', () => {
        render(<StarField />)
        const canvas = screen.getByRole('img')
        expect(canvas).toHaveStyle({
            position: 'fixed',
            top: '0',
            right: '0',
            bottom: '0',
            left: '0',
            zIndex: '1',
            pointerEvents: 'none',
            mixBlendMode: 'screen'
        })
    })

    it('canvas resizes on window resize', () => {
        render(<StarField />)

        const canvas = document.querySelector('#starfield') as HTMLCanvasElement

        const initialWidth = 300
        const initialHeight = 150

        Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: initialWidth })
        Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: initialHeight })

        const newWidth = 500
        const newHeight = 400

        Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: newWidth })
        Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: newHeight })

        window.dispatchEvent(new Event('resize'))

        expect(canvas.width).toBe(newWidth)
        expect(canvas.height).toBe(newHeight)
    })

    it('handles custom props correctly', () => {
        render(
            <StarField
                speedFactor={0.1}
                backgroundColor='blue'
                starColor={[100, 150, 200]}
                starCount={1000}
            />
        )

        const canvas = screen.getByRole('img')
        expect(canvas).toBeInTheDocument()
    })

    it('executes the animation tick and draws to the canvas', () => {
        const mockCtx = { fillRect: jest.fn(), fillStyle: '' }
        Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
            value: jest.fn().mockReturnValue(mockCtx),
            writable: true,
            configurable: true
        })

        let rafFired = false
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
            if (!rafFired) {
                rafFired = true
                cb(0)
            }
            return 0
        })
        jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})

        render(<StarField />)

        expect(mockCtx.fillRect).toHaveBeenCalled()
    })

    it('logs an error when the 2D rendering context is unavailable', () => {
        Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
            value: jest.fn().mockReturnValue(null),
            writable: true,
            configurable: true
        })
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 0)
        jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

        render(<StarField />)

        expect(consoleSpy).toHaveBeenCalledWith('Could not get 2d context from canvas element')
    })
})
