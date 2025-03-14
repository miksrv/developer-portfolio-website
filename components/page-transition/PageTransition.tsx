import React, { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

const parentVariants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
            delayChildren: 0.2
        }
    },
    exit: { opacity: 0 }
}

const childVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
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

export default PageTransition
