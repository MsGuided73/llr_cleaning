'use client'

import { MobileNav } from '@/components/layout/MobileNav'
import { VoiceButton } from '@/components/layout/VoiceButton'
import { ChevronLeft, User, Calendar, Clock, MapPin, Sparkles, ChevronDown, Check, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function NewAppointment() {
    const router = useRouter()
    const [clients, setClients] = useState<{ id: string, name: string }[]>([])
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        client_id: '',
        date: new Date().toISOString().split('T')[0],
        time: '9:00 AM',
        notes: ''
    })

    useEffect(() => {
        const fetchClients = async () => {
            const { data } = await supabase.from('llr_clients').select('id, name')
            if (data) setClients(data)
        }
        fetchClients()
    }, [])

    const handleSubmit = async () => {
        if (!formData.client_id) return
        setLoading(true)

        const { error } = await supabase
            .from('llr_appointments')
            .insert([formData])

        setLoading(false)
        if (!error) {
            router.push('/schedule')
        } else {
            alert('Failed to schedule. Please try again.')
        }
    }

    return (
        <main className="main-content">
            <header className="flex items-center gap-4 mb-8">
                <Link href="/schedule">
                    <motion.div whileTap={{ scale: 0.8 }} className="glass-icon-sq">
                        <ChevronLeft size={24} />
                    </motion.div>
                </Link>
                <h1 className="text-2xl font-black bg-gradient-to-r from-[hsl(var(--foreground))] to-[hsl(var(--foreground),0.4)] bg-clip-text text-transparent">
                    New Appointment
                </h1>
            </header>

            <section className="space-y-8 pb-32">
                {/* Client Selector Block */}
                <div className="space-y-3">
                    <h2 className="section-header">
                        <User size={14} /> Who is it for?
                    </h2>
                    <div className="glass-pane p-6 space-y-4">
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" size={18} />
                            <select
                                value={formData.client_id}
                                onChange={(e) => setFormData({ ...formData, client_id: e.target.value })}
                                className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl py-5 pl-12 pr-10 text-sm font-bold focus:ring-2 focus:ring-[hsl(var(--primary)/0.3)] outline-none appearance-none text-[hsl(var(--foreground))]"
                            >
                                <option value="">Choose a client...</option>
                                {clients.map(client => (
                                    <option key={client.id} value={client.id}>{client.name}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-black/20 pointer-events-none" size={18} />
                        </div>
                        <Link href="/clients/add" className="text-[10px] text-[hsl(var(--primary))] font-black uppercase tracking-widest flex items-center justify-center gap-2 py-4 active:opacity-60 transition-opacity">
                            <Sparkles size={14} /> Create a new client profile
                        </Link>
                    </div>
                </div>

                {/* Date & Time Block */}
                <div className="space-y-3">
                    <h2 className="section-header">
                        <Calendar size={14} /> When?
                    </h2>
                    <div className="glass-pane p-6 space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[hsl(var(--muted-foreground))] ml-1">Appointment Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" size={18} />
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl py-5 pl-12 pr-4 text-sm font-bold focus:ring-0 outline-none text-[hsl(var(--foreground))]"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[hsl(var(--muted-foreground))] ml-1">Start Time</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['9:00 AM', '11:00 AM', '2:00 PM', '4:30 PM', '6:00 PM', 'Other'].map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => setFormData({ ...formData, time })}
                                        className={`py-4 rounded-xl text-[10px] font-black uppercase tracking-tighter border-2 ${formData.time === time ? 'bg-[hsl(var(--primary)/0.15)] border-[hsl(var(--primary)/0.3)] text-[hsl(var(--primary))]' : 'bg-black/5 dark:bg-white/5 border-transparent text-[hsl(var(--muted-foreground))]'}`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Confirm Button */}
                <motion.button
                    onClick={handleSubmit}
                    whileTap={{ scale: 0.95 }}
                    disabled={loading || !formData.client_id}
                    className={`premium-button-3d w-full h-18 text-sm ${loading || !formData.client_id ? 'opacity-50 grayscale' : ''}`}
                >
                    {loading ? <Loader2 className="animate-spin" /> : <><Check size={22} className="mr-2" /> Confirm Appointment</>}
                </motion.button>
            </section>

            <MobileNav />
            <VoiceButton />
        </main>
    )
}
