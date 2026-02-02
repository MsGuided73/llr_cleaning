'use client'

import { MobileNav } from '@/components/layout/MobileNav'
import { VoiceButton } from '@/components/layout/VoiceButton'
import { Plus, Calendar as CalendarIcon, Clock, MapPin, ChevronRight, CheckCircle2, MoreVertical, ArrowUpRight, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { format } from 'date-fns'

type Job = {
    id: string
    start_time: string
    end_time: string
    status: string
    service_notes: string | null
    client: {
        name: string
        address: string
    }
}

export default function Schedule() {
    const [jobs, setJobs] = useState<Job[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const { data, error } = await supabase
                    .from('llr_appointments')
                    .select(`
                        *,
                        client:llr_clients ( name, address )
                    `)
                    .order('start_time', { ascending: true })

                if (error) throw error
                // Supabase returns 'client' as an object or array depending on relation, usually object here since it's foreign key
                if (data) setJobs(data as any)
            } catch (error) {
                console.error('Error fetching jobs:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchJobs()
    }, [])

    const getRandomColor = (id: string) => {
        const colors = ['emerald', 'sky', 'purple', 'rose', 'amber']
        const index = id.charCodeAt(0) % colors.length
        return colors[index]
    }

    const getRandomImage = (id: string) => {
        const images = [
            'https://images.unsplash.com/photo-1541339907198-e08756ebafe1?w=100&h=100&fit=crop',
            'https://images.unsplash.com/photo-1513584684374-8bdb7483fe8f?w=100&h=100&fit=crop',
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=100&h=100&fit=crop',
            'https://images.unsplash.com/photo-1600596542815-27b88e31e971?w=100&h=100&fit=crop',
        ]
        const index = id.charCodeAt(0) % images.length
        return images[index]
    }

    return (
        <main className="main-content">
            <header className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-[hsl(var(--foreground))]">Schedule</h1>
                    <div className="flex items-center gap-2 text-xs font-bold text-[hsl(var(--muted-foreground))] uppercase tracking-widest mt-1">
                        <CalendarIcon size={14} className="text-[hsl(var(--primary))]" />
                        {format(new Date(), 'EEEE, MMM d')}
                    </div>
                </div>
                <Link href="/schedule/new">
                    <motion.div whileTap={{ scale: 0.8 }} className="icon-circle bg-black dark:bg-white text-white dark:text-black shadow-xl">
                        <Plus size={24} strokeWidth={3} />
                    </motion.div>
                </Link>
            </header>

            <section className="space-y-6 pb-32">
                {loading ? (
                    <div className="flex justify-center p-8">
                        <Loader2 className="animate-spin text-[hsl(var(--muted-foreground))]" size={32} />
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="text-center p-8 opacity-50">
                        <p>No jobs scheduled.</p>
                        <p className="text-xs">Tap the + button to add one.</p>
                    </div>
                ) : (
                    jobs.map((job) => {
                        const color = getRandomColor(job.id)
                        const img = getRandomImage(job.id)

                        return (
                            <motion.div
                                key={job.id}
                                whileTap={{ scale: 0.98 }}
                                className="airy-card group"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`icon-circle bg-${color}-100 text-${color}-600 dark:bg-${color}-900/50 dark:text-${color}-400`}>
                                            <Clock size={20} />
                                        </div>
                                        <span className="text-sm font-bold">
                                            {format(new Date(job.start_time), 'h:mm a')}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {job.service_notes && (
                                            <div className="px-3 py-1 rounded-full bg-[hsl(var(--muted))] text-[10px] font-bold uppercase tracking-widest max-w-[100px] truncate">
                                                {job.service_notes}
                                            </div>
                                        )}
                                        <div className="icon-circle w-10 h-10 bg-white shadow-sm text-black">
                                            <ArrowUpRight size={16} />
                                        </div>
                                    </div>
                                </div>

                                <div className={`glow-box p-6 flex items-center gap-5 bg-gradient-to-br from-${color}-50/60 to-white dark:from-${color}-900/20 dark:to-transparent border border-${color}-100/30`}>
                                    <div className="w-16 h-16 rounded-full border-4 border-white shadow-xl overflow-hidden flex-shrink-0">
                                        <img src={img} alt={job.client?.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="space-y-1 overflow-hidden">
                                        <h3 className="text-xl font-black tracking-tight truncate">{job.client?.name || 'Unknown Client'}</h3>
                                        <p className="flex items-center gap-2 text-xs font-medium text-[hsl(var(--muted-foreground))]">
                                            <MapPin size={14} /> {job.client?.address || 'No Address'}
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
                        )
                    })
                )}
            </section>

            <MobileNav />
            <VoiceButton />
        </main>
    )
}
