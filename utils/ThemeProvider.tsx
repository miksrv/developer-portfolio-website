import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextValue {
    theme: Theme
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue>({
    theme: 'dark',
    toggleTheme: () => {}
})

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>('dark')

    useEffect(() => {
        const stored = document.documentElement.getAttribute('data-theme') as Theme | null
        if (stored === 'light' || stored === 'dark') {
            setTheme(stored)
        }
    }, [])

    const toggleTheme = () => {
        setTheme((prev) => {
            const next: Theme = prev === 'dark' ? 'light' : 'dark'
            document.documentElement.setAttribute('data-theme', next)
            try {
                localStorage.setItem('theme', next)
            } catch (_) {}
            return next
        })
    }

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeContextValue => useContext(ThemeContext)
