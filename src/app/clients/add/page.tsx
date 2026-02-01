'use client'

import { MobileNav } from '@/components/layout/MobileNav'
import { VoiceButton } from '@/components/layout/VoiceButton'
import { ChevronLeft, User, MapPin, Phone, MessageSquare, Save, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AddClient() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        notes: ''
    })

    const handleSubmit = async () => {
        if (!formData.name) return
        setLoading(true)

        const { error } = await supabase
            .from('llr_clients')
            .insert([formData])

        setLoading(false)

        if (!error) {
            router.push('/schedule/new')
        } else {
            alert('Error saving client. Please try again.')
        }
    }

    return (
        <main className="main-content">
            <header className="flex items-center gap-4 mb-8">
                <Link href="/schedule/new">
                    <motion.div whileTap={{ scale: 0.8 }} className="glass-icon-sq">
                        <ChevronLeft size={24} />
                    </motion.div>
                </Link>
                <h1 className="text-2xl font-black bg-gradient-to-r from-[hsl(var(--foreground))] to-[hsl(var(--foreground),0.4)] bg-clip-text text-transparent">
                    New Client Profile
                </h1>
            </header>

            <section className="space-y-6 pb-32">
                {/* Name Input */}
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[hsl(var(--muted-foreground))] ml-4">Full Name</label>
                    <div className="glass-pane p-0 flex items-center pr-4">
                        <div className="w-14 h-14 flex items-center justify-center text-[hsl(var(--primary))] border-r border-black/5 dark:border-white/5">
                            <User size={20} />
                        </div>
                        <input
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. The Smith Family"
                            className="flex-1 bg-transparent border-none h-14 px-4 font-bold focus:ring-0 outline-none text-[hsl(var(--foreground))]"
                        />
                    </div>
                </div>

                {/* Address Input */}
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[hsl(var(--muted-foreground))] ml-4">Property Address</label>
                    <div className="glass-pane p-0 flex items-center pr-4">
                        <div className="w-14 h-14 flex items-center justify-center text-[hsl(var(--primary))] border-r border-black/5 dark:border-white/5">
                            <MapPin size={20} />
                        </div>
                        <input
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            placeholder="123 Maple Dr..."
                            className="flex-1 bg-transparent border-none h-14 px-4 font-bold focus:ring-0 outline-none text-[hsl(var(--foreground))]"
                        />
                    </div>
                </div>

                {/* Phone Input */}
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[hsl(var(--muted-foreground))] ml-4">Phone Number</label>
                    <div className="glass-pane p-0 flex items-center pr-4">
                        <div className="w-14 h-14 flex items-center justify-center text-[hsl(var(--primary))] border-r border-black/5 dark:border-white/5">
                            <Phone size={20} />
                        </div>
                        <input
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="(555) 123-4567"
                            className="flex-1 bg-transparent border-none h-14 px-4 font-bold focus:ring-0 outline-none text-[hsl(var(--foreground))]"
                        />
                    </div>
                </div>

                {/* Notes Input */}
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[hsl(var(--muted-foreground))] ml-4">Private Notes</label>
                    <div className="glass-pane p-4">
                        <textarea
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            placeholder="Gate code, preferences, etc..."
                            rows={4}
                            className="w-full bg-transparent border-none font-medium focus:ring-0 outline-none text-[hsl(var(--foreground))] resize-none placeholder:text-[hsl(var(--muted-foreground))/50]"
                        />
                    </div>
                </div>

                <motion.button
                    onClick={handleSubmit}
                    disabled={loading || !formData.name}
                    whileTap={{ scale: 0.95 }}
                    className={`premium-button-3d w-full h-16 text-sm ${loading || !formData.name ? 'opacity-50 grayscale' : ''}`}
                >
                    {loading ? <Loader2 className="animate-spin" /> : <><Save size={20} className="mr-2" /> Save Client</>}
                </motion.button>

            </section>

            <MobileNav />
            <VoiceButton />
        </main>
    )
}
