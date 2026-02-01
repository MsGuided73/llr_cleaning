'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Calendar, Users, Wallet, Settings } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

const navItems = [
    { label: 'Home', href: '/', icon: LayoutDashboard },
    { label: 'Schedule', href: '/schedule', icon: Calendar },
    { label: 'Clients', href: '/clients', icon: Users },
    { label: 'Finances', href: '/finances', icon: Wallet },
    { label: 'Settings', href: '/settings', icon: Settings },
]

export function MobileNav() {
    const pathname = usePathname()

    return (
        <nav className="nav-dock">
            {navItems.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-2 relative px-3 py-2 rounded-2xl transition-all"
                    >
                        {isActive && (
                            <motion.div
                                layoutId="active-tab"
                                className="absolute inset-0 bg-[hsl(var(--primary)/0.15)] border border-[hsl(var(--primary)/0.2)] rounded-2xl -z-10"
                                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                            />
                        )}
                        <motion.div
                            whileTap={{ scale: 0.85 }}
                            className={cn(
                                "transition-colors duration-300",
                                isActive ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--muted-foreground))]"
                            )}
                        >
                            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                        </motion.div>
                        {isActive && (
                            <motion.span
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: 'auto' }}
                                className="text-[10px] font-black uppercase tracking-widest text-[hsl(var(--foreground))]"
                            >
                                {item.label}
                            </motion.span>
                        )}
                    </Link>
                )
            })}
        </nav>
    )
}
