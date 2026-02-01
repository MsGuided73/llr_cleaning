'use client'

import { Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from './ThemeProvider'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="fixed top-5 left-5 z-[101] w-12 h-12 rounded-2xl dimensional-card flex items-center justify-center text-[hsl(var(--foreground))] transition-all active:bg-[hsl(var(--primary)/0.1)] overflow-hidden"
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={theme}
                    initial={{ y: 20, opacity: 0, rotate: -45 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -20, opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.3, ease: 'backOut' }}
                >
                    {theme === 'dark' ? (
                        <Moon size={22} className="text-sky-400" />
                    ) : (
                        <Sun size={22} className="text-amber-500" />
                    )}
                </motion.div>
            </AnimatePresence>
        </motion.button>
    )
}
