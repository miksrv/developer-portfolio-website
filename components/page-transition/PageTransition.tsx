import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { usePathname } from 'next/navigation'

import { childVariants, parentVariants } from './constants'

export const PageTransition: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children }) => {
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
