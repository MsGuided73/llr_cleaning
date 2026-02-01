'use client'

import { MobileNav } from '@/components/layout/MobileNav'
import { VoiceButton } from '@/components/layout/VoiceButton'
import { Plus, Calendar as CalendarIcon, Clock, MapPin, ChevronRight, CheckCircle2, MoreVertical, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const jobs = [
    {
        id: 1,
        time: '9:30 AM',
        client: 'Mrs. Johnson',
        address: 'Highland Park, 123 Maple',
        status: 'pending',
        type: 'Deep Clean',
        color: 'emerald',
        img: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe1?w=100&h=100&fit=crop'
    },
    {
        id: 2,
        time: '1:00 PM',
        client: 'The Miller Family',
        address: 'Oak Ridge Estates, #405',
        status: 'pending',
        type: 'Routine',
        color: 'sky',
        img: 'https://images.unsplash.com/photo-1513584684374-8bdb7483fe8f?w=100&h=100&fit=crop'
    }
]

export default function Schedule() {
    return (
        <main className="main-content">
            <header className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-[hsl(var(--foreground))]">Schedule</h1>
                    <div className="flex items-center gap-2 text-xs font-bold text-[hsl(var(--muted-foreground))] uppercase tracking-widest mt-1">
                        <CalendarIcon size={14} className="text-[hsl(var(--primary))]" />
                        Tuesday, Jan 31
                    </div>
                </div>
                <Link href="/schedule/new">
                    <motion.div whileTap={{ scale: 0.8 }} className="icon-circle bg-black dark:bg-white text-white dark:text-black shadow-xl">
                        <Plus size={24} strokeWidth={3} />
                    </motion.div>
                </Link>
            </header>

            <section className="space-y-6 pb-32">
                {jobs.map((job) => (
                    <motion.div
                        key={job.id}
                        whileTap={{ scale: 0.98 }}
                        className="airy-card group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`icon-circle bg-${job.color}-100 text-${job.color}-600 dark:bg-${job.color}-900/50 dark:text-${job.color}-400`}>
                                    <Clock size={20} />
                                </div>
                                <span className="text-sm font-bold">{job.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="px-3 py-1 rounded-full bg-[hsl(var(--muted))] text-[10px] font-bold uppercase tracking-widest">
                                    {job.type}
                                </div>
                                <div className="icon-circle w-10 h-10 bg-white shadow-sm text-black">
                                    <ArrowUpRight size={16} />
                                </div>
                            </div>
                        </div>

                        <div className={`glow-box p-6 flex items-center gap-5 bg-gradient-to-br from-${job.color}-50/60 to-white dark:from-${job.color}-900/20 dark:to-transparent border border-${job.color}-100/30`}>
                            <div className="w-16 h-16 rounded-full border-4 border-white shadow-xl overflow-hidden flex-shrink-0">
                                <img src={job.img} alt={job.client} className="w-full h-full object-cover" />
                            </div>
                            <div className="space-y-1 overflow-hidden">
                                <h3 className="text-xl font-black tracking-tight truncate">{job.client}</h3>
                                <p className="flex items-center gap-2 text-xs font-medium text-[hsl(var(--muted-foreground))]">
                                    <MapPin size={14} /> {job.address}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                            <div className="flex gap-2">
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 h-12 bg-black dark:bg-white text-white dark:text-black rounded-full text-[10px] font-black uppercase tracking-widest"
                                >
                                    Start Trip
                                </motion.button>
                            </div>
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                className="w-12 h-12 rounded-full border border-[hsl(var(--primary)/0.2)] text-[hsl(var(--primary))] flex items-center justify-center"
                            >
                                <CheckCircle2 size={22} />
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </section>

            <MobileNav />
            <VoiceButton />
        </main>
    )
}
