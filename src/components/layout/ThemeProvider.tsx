'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
type FontSize = 'standard' | 'large' | 'xlarge'

interface ThemeContextType {
    theme: Theme
    fontSize: FontSize
    toggleTheme: () => void
    setFontSize: (size: FontSize) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('light')
    const [fontSize, setFontSizeState] = useState<FontSize>('standard')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const savedTheme = localStorage.getItem('theme') as Theme
        const savedFontSize = localStorage.getItem('fontSize') as FontSize

        if (savedTheme) setTheme(savedTheme)
        if (savedFontSize) setFontSizeState(savedFontSize)
    }, [])

    useEffect(() => {
        if (!mounted) return
        const root = window.document.documentElement

        // Theme logic
        root.classList.remove('light', 'dark')
        root.classList.add(theme)
        localStorage.setItem('theme', theme)

        // Font size logic
        root.classList.remove('font-standard', 'font-large', 'font-xlarge')
        root.classList.add(`font-${fontSize}`)
        localStorage.setItem('fontSize', fontSize)
    }, [theme, fontSize, mounted])

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light')
    }

    const setFontSize = (size: FontSize) => {
        setFontSizeState(size)
    }

    return (
        <ThemeContext.Provider value={{ theme, fontSize, toggleTheme, setFontSize }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) throw new Error('useTheme must be used within ThemeProvider')
    return context
}
