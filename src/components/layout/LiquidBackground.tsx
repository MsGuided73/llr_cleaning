'use client'

import { motion } from 'framer-motion'
import { useTheme } from './ThemeProvider'
import { useEffect, useState } from 'react'

export function LiquidBackground() {
    const { theme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const isDark = theme === 'dark'

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-[hsl(var(--background))] pointer-events-none transition-colors duration-1000">
            {/* Lavender Soft Blob */}
            <motion.div
                animate={{
                    x: [0, 60, 0],
                    y: [0, 40, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className={`absolute -top-[10%] -left-[10%] w-[90%] h-[90%] rounded-full opacity-40 transition-colors duration-1000 blur-[130px] will-change-transform ${isDark ? 'bg-purple-900/20' : 'bg-[#f3e8ff]'
                    }`}
            />

            {/* Parrot Mint Blob */}
            <motion.div
                animate={{
                    x: [0, -60, 0],
                    y: [0, 80, 0],
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 45,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5
                }}
                className={`absolute top-[30%] -right-[15%] w-[80%] h-[80%] rounded-full opacity-35 transition-colors duration-1000 blur-[150px] will-change-transform ${isDark ? 'bg-emerald-900/20' : 'bg-[#dcfce7]'
                    }`}
            />

            {/* Subtle Mist texture */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
        </div>
    )
}
