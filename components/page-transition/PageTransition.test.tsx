import React from 'react'

import { render, screen } from '@testing-library/react'

import { PageTransition } from './PageTransition'

// Mock framer-motion to render plain divs with props for inspection
jest.mock('framer-motion', () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    AnimatePresence: ({ children }: any) => <div data-testid='animate-presence'>{children}</div>,
    motion: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        div: ({ children, ...props }: any) => (
            <div
                data-testid='motion-div'
                {...props}
            >
                {children}
            </div>
        )
    }
}))

// Mock usePathname
jest.mock('next/navigation', () => ({
    usePathname: () => '/test-path'
}))

// Mock animation variants
jest.mock('./constants', () => ({
    parentVariants: { initial: {}, animate: {}, exit: {} },
    childVariants: { initial: {}, animate: {}, exit: {} }
}))

describe('PageTransition', () => {
    it('renders AnimatePresence and motion.div with correct key', () => {
        render(
            <PageTransition>
                <div>Child 1</div>
                <div>Child 2</div>
            </PageTransition>
        )
        expect(screen.getByTestId('animate-presence')).toBeInTheDocument()
        const motionDivs = screen.getAllByTestId('motion-div')
        expect(motionDivs[0]).toHaveAttribute('initial', 'initial')
        expect(motionDivs[0]).toHaveAttribute('animate', 'animate')
        expect(motionDivs[0]).toHaveAttribute('exit', 'exit')
    })

    it('maps children and wraps each in a motion.div with correct key', () => {
        render(
            <PageTransition>
                <div>Child A</div>
                <div>Child B</div>
            </PageTransition>
        )
        const motionDivs = screen.getAllByTestId('motion-div')
        // The first is parent, next are children
        expect(motionDivs[1]).toHaveTextContent('Child A')
        expect(motionDivs[2]).toHaveTextContent('Child B')
    })

    it('renders nothing if no children are passed', () => {
        const { container } = render(<PageTransition />)
        expect(container).toBeInTheDocument()
    })

    it('matches snapshot', () => {
        const { asFragment } = render(
            <PageTransition>
                <div>Snapshot Child</div>
            </PageTransition>
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
