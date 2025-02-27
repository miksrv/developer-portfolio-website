import React, { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

const variants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7 } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.7 } }
}

interface PageTransitionProps {
    children: ReactNode
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
    const pathname = usePathname()

    return (
        <AnimatePresence mode={'wait'}>
            <motion.div
                key={pathname}
                initial={'initial'}
                animate={'animate'}
                exit={'exit'}
                layout
                variants={variants}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}

export default PageTransition
