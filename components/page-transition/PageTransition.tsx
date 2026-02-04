import React from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion'

import { usePathname } from 'next/navigation'

import { childVariants as defaultChildVariants, parentVariants as defaultParentVariants } from './constants'

type PageTransitionProps = React.HTMLAttributes<HTMLDivElement> & {
    parentVariants?: Variants
    childVariants?: Variants
}

export const PageTransition: React.FC<PageTransitionProps> = ({
    children,
    parentVariants = defaultParentVariants.fade,
    childVariants = defaultChildVariants.fade
}) => {
    const pathname = usePathname()

    return (
        <AnimatePresence mode={'wait'}>
            <motion.div
                key={pathname}
                initial={'initial'}
                animate={'animate'}
                exit={'exit'}
                variants={parentVariants}
            >
                {React.Children.map(children, (child, index) => (
                    <motion.div
                        key={index}
                        variants={childVariants}
                    >
                        {child}
                    </motion.div>
                ))}
            </motion.div>
        </AnimatePresence>
    )
}
