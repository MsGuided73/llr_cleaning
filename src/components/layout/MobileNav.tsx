'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Calendar, Users, Settings } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

const navItems = [
    { label: 'DASH', href: '/', icon: LayoutDashboard },
    { label: 'PLAN', href: '/schedule', icon: Calendar },
    { label: 'CLIENT', href: '/clients', icon: Users },
    { label: 'TOOLS', href: '/settings', icon: Settings },
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
                        className={cn(
                            "flex flex-col items-center justify-center p-2 pt-3 transition-all",
                            isActive ? "text-[var(--primary)]" : "text-black"
                        )}
                    >
                        <div className={cn(
                            "mb-1 pb-1 px-3",
                            isActive ? "bg-[#e5ecff] border-2 border-transparent" : "border-2 border-transparent" // Light blue bg for active
                        )}>
                            <Icon size={24} strokeWidth={isActive ? 3 : 2} />
                        </div>
                        <span
                            className={cn(
                                "text-xs font-black uppercase tracking-wider",
                            )}
                        >
                            {item.label}
                        </span>
                    </Link>
                )
            })}
        </nav>
    )
}
