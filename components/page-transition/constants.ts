export const parentVariants = {
    fade: {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        },
        exit: { opacity: 0 }
    },
    slide: {
        initial: { x: '-100vw', opacity: 0 },
        animate: {
            x: '0',
            opacity: 1,
            transition: {
                stiffness: 50,
                staggerChildren: 0.3,
                delayChildren: 0.5
            }
        },
        exit: { x: '100vw', opacity: 0 }
    }
}

export const childVariants = {
    fade: {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    },
    slide: {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0, transition: { duration: 0.5 } }
    }
}
