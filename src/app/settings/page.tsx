'use client'

import { MobileNav } from '@/components/layout/MobileNav'
import { VoiceButton } from '@/components/layout/VoiceButton'
import { User, Bell, Shield, Moon, Sun, ChevronRight, LogOut, Heart, Sparkles, Tag } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '@/components/layout/ThemeProvider'

export default function Settings() {
    const { theme, toggleTheme, fontSize, setFontSize } = useTheme()

    return (
        <main className="main-content">
            <header className="mb-8 p-1">
                <h1 className="text-3xl font-black bg-gradient-to-r from-[hsl(var(--foreground))] to-[hsl(var(--foreground),0.4)] bg-clip-text text-transparent">
                    Settings
                </h1>
                <p className="text-[10px] font-black uppercase tracking-widest text-[hsl(var(--primary))] mt-0.5">Lori&apos;s LLR Profile</p>
            </header>

            <section className="space-y-8 pb-20">
                {/* Accessibility Block */}
                <div className="space-y-4">
                    <h2 className="section-header">
                        <Tag size={14} /> Accessibility
                    </h2>
                    <div className="glass-pane p-6 space-y-4">
                        <div className="flex flex-col gap-4">
                            <div>
                                <h3 className="font-bold text-sm">Text Size</h3>
                                <p className="text-[10px] text-[hsl(var(--muted-foreground))] font-black uppercase tracking-wider mt-0.5">
                                    Make LLR easier to read
                                </p>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { id: 'standard', label: 'Aa', sub: 'Standard' },
                                    { id: 'large', label: 'Aa', sub: 'Large' },
                                    { id: 'xlarge', label: 'Aa', sub: 'Extra' },
                                ].map((size) => (
                                    <motion.button
                                        key={size.id}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setFontSize(size.id as any)}
                                        className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all ${fontSize === size.id
                                            ? 'premium-button-3d bg-[hsl(var(--primary))] text-white shadow-xl translate-y-[-2px]'
                                            : 'glass-inner text-[hsl(var(--muted-foreground))] opacity-60'
                                            }`}
                                    >
                                        <span className={`font-black ${size.id === 'standard' ? 'text-xs' : size.id === 'large' ? 'text-lg' : 'text-2xl'}`}>
                                            {size.label}
                                        </span>
                                        <span className="text-[8px] font-bold uppercase tracking-widest">{size.sub}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Global Options Block */}
                <div className="space-y-4">
                    <h2 className="section-header">
                        <User size={14} /> My Profile
                    </h2>
                    <div className="dimensional-card divide-y divide-black/[0.03] dark:divide-white/[0.03] overflow-hidden">
                        {[
                            { icon: Heart, label: 'Lori\'s Preferences', sub: 'Defaults & Shortcuts' },
                            { icon: Bell, label: 'Alerts', sub: 'Job Reminders' },
                            { icon: Shield, label: 'Security', sub: 'Login & Safety' },
                        ].map((item, i) => (
                            <motion.button
                                key={item.label}
                                whileTap={{ scale: 0.98 }}
                                className="w-full p-6 flex items-center justify-between interactive-block text-left"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-black/5 dark:bg-white/5 rounded-2xl text-[hsl(var(--muted-foreground))]">
                                        <item.icon size={22} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm">{item.label}</h3>
                                        <p className="text-[10px] text-[hsl(var(--muted-foreground))] font-black uppercase tracking-widest mt-0.5">{item.sub}</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="text-[hsl(var(--muted-foreground))]/40" />
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Branding Footer Block */}
                <div className="py-4 text-center">
                    <div className="dimensional-card p-8 bg-gradient-to-br from-[hsl(var(--primary)/0.05)] to-transparent border-dashed">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[hsl(var(--muted-foreground))] mb-2 text-center">Powered By</h4>
                        <p className="text-xl font-black italic tracking-tighter text-center">LLR Cleaners <span className="text-[hsl(var(--primary))]">v1.0</span></p>
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="w-full mt-8 p-6 dimensional-card flex items-center justify-center gap-4 text-rose-500 border-rose-500/10 active:bg-rose-500/5 transition-colors"
                    >
                        <LogOut size={22} />
                        <span className="font-black uppercase tracking-widest text-xs">Sign Out</span>
                    </motion.button>
                </div>
            </section>

            <MobileNav />
            <VoiceButton />
        </main>
    )
}
