'use client'

import { MobileNav } from '@/components/layout/MobileNav'
import { VoiceButton } from '@/components/layout/VoiceButton'
import { ChevronLeft, DollarSign, CheckCircle2, TrendingUp, Calendar, User, CreditCard } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Job {
    id: string
    date: string
    time: string
    client: { name: string }
    price: number
    payment_status: string
}

export default function Income() {
    const [jobs, setJobs] = useState<Job[]>([])
    const [selectedJob, setSelectedJob] = useState<Job | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchUnpaidJobs()
    }, [])

    const fetchUnpaidJobs = async () => {
        const { data } = await supabase
            .from('llr_appointments')
            .select('*, client:llr_clients(name)')
            .eq('payment_status', 'pending')
            .order('date', { ascending: false })

        if (data) setJobs(data as any)
        setLoading(false)
    }

    const markAsPaid = async (method: 'cash' | 'venmo') => {
        if (!selectedJob) return

        await supabase
            .from('llr_appointments')
            .update({
                payment_status: 'paid',
                payment_method: method,
                // price could be editable here too in a real app
            })
            .eq('id', selectedJob.id)

        setSelectedJob(null)
        fetchUnpaidJobs()
    }

    return (
        <main className="main-content">
            <header className="flex items-center gap-4 mb-8">
                <Link href="/finances">
                    <motion.div whileTap={{ scale: 0.8 }} className="glass-icon-sq">
                        <ChevronLeft size={24} />
                    </motion.div>
                </Link>
                <h1 className="text-2xl font-black bg-gradient-to-r from-[hsl(var(--foreground))] to-[hsl(var(--foreground),0.4)] bg-clip-text text-transparent">
                    Income Tracker
                </h1>
            </header>

            <section className="space-y-6 pb-32">
                <div className="glass-pane bg-emerald-500/5 border-emerald-500/20 p-6 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600/60">Pending Income</p>
                        <h2 className="text-3xl font-black text-emerald-600">${jobs.reduce((acc, job) => acc + (job.price || 0), 0).toFixed(2)}</h2>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <TrendingUp size={24} />
                    </div>
                </div>

                <h2 className="section-header">Unpaid Jobs ({jobs.length})</h2>

                {loading ? (
                    <div className="text-center py-10 opacity-50 font-bold text-xs">Loading...</div>
                ) : jobs.length === 0 ? (
                    <div className="glass-pane p-10 flex flex-col items-center justify-center text-center opacity-60">
                        <CheckCircle2 size={40} className="mb-4 text-emerald-500" />
                        <p className="font-bold">All caught up!</p>
                        <p className="text-xs mt-1">No pending payments found.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {jobs.map(job => (
                            <motion.div
                                key={job.id}
                                layoutId={job.id}
                                onClick={() => setSelectedJob(job)}
                                className="glass-pane p-5 flex items-center justify-between active:scale-[0.98] transition-transform"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="glass-icon-sq bg-[hsl(var(--background))]">
                                        <User size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold">{job.client?.name || 'Unknown Client'}</h3>
                                        <div className="flex items-center gap-2 text-xs opacity-60 font-medium">
                                            <Calendar size={12} /> {job.date}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="block font-black text-lg">${job.price?.toFixed(2) || '0.00'}</span>
                                    <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-2 py-1 rounded-lg">Pending</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>

            {/* Payment Modal */}
            {selectedJob && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-[hsl(var(--card))] w-full max-w-sm rounded-[2.5rem] p-6 shadow-2xl border border-[hsl(var(--border))]"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-black text-xl">Mark as Paid?</h3>
                            <button onClick={() => setSelectedJob(null)} className="p-2 bg-black/5 rounded-full"><XIcon /></button>
                        </div>

                        <div className="text-center mb-8">
                            <h4 className="text-sm font-bold opacity-60">Payment from {selectedJob.client?.name}</h4>
                            <p className="text-4xl font-black mt-2">${selectedJob.price?.toFixed(2) || '0.00'}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => markAsPaid('venmo')}
                                className="h-24 rounded-2xl bg-[#008CFF]/10 text-[#008CFF] font-black flex flex-col items-center justify-center gap-2 border-2 border-transparent hover:border-[#008CFF]"
                            >
                                <span className="text-xl">V</span>
                                Venmo
                            </button>
                            <button
                                onClick={() => markAsPaid('cash')}
                                className="h-24 rounded-2xl bg-emerald-500/10 text-emerald-600 font-black flex flex-col items-center justify-center gap-2 border-2 border-transparent hover:border-emerald-500"
                            >
                                <DollarSign size={24} />
                                Cash / Check
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            <MobileNav />
            <VoiceButton />
        </main>
    )
}

function XIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" /><path d="m6 6 18 18" />
        </svg>
    )
}
