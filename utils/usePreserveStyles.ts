import { useEffect } from 'react'

const usePreserveStyles = () => {
    useEffect(() => {
        const styles = document.querySelectorAll<HTMLStyleElement>('style[data-n-href]')
        const clonedStyles: HTMLStyleElement[] = Array.from(styles).map((style) =>
            style.cloneNode(true) as HTMLStyleElement
        )

        return () => {
            clonedStyles.forEach((style) => document.head.appendChild(style))
            setTimeout(() => {
                clonedStyles.forEach((style) => style.remove())
            }, 500)
        }
    }, [])
}

export default usePreserveStyles
