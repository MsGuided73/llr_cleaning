'use client'

import { MobileNav } from '@/components/layout/MobileNav'
import { VoiceButton } from '@/components/layout/VoiceButton'
import { Search, Plus, User, Phone, MapPin, ChevronRight, Filter, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const clients = [
    { id: 1, name: "Mrs. Johnson", address: "123 Maple St", phone: "(555) 123-4567", frequency: "Weekly", type: "Residential" },
    { id: 2, name: "The Smith Residence", address: "456 Oak Ave", phone: "(555) 987-6543", frequency: "Monthly", type: "Estate" },
    { id: 3, name: "Downtown Office", address: "789 Pine Rd", phone: "(555) 555-5555", frequency: "Bi-Weekly", type: "Commercial" },
]

export default function Clients() {
    return (
        <main className="main-content">
            <header className="mb-8 p-1">
                <h1 className="text-3xl font-black bg-gradient-to-r from-[hsl(var(--foreground))] to-[hsl(var(--foreground),0.4)] bg-clip-text text-transparent">
                    My Clients
                </h1>
            </header>

            {/* Search & Filter Block */}
            <section className="mb-8">
                <div className="dimensional-card p-4 flex items-center gap-3">
                    <Search className="text-[hsl(var(--muted-foreground))]" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name or street..."
                        className="bg-transparent border-none w-full text-sm font-medium focus:ring-0 outline-none"
                    />
                    <button className="p-2 bg-black/5 dark:bg-white/5 rounded-xl"><Filter size={18} /></button>
                </div>
            </section>

            {/* Client List Block */}
            <section className="space-y-6">
                <h2 className="section-header">
                    <User size={14} /> Active Portfolio
                </h2>
                <div className="space-y-4">
                    {clients.map((client) => (
                        <motion.div
                            key={client.id}
                            whileTap={{ scale: 0.98 }}
                            className="dimensional-card p-6 interactive-block"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary)/0.15)] to-[hsl(var(--primary)/0.05)] flex items-center justify-center text-[hsl(var(--primary))] border border-[hsl(var(--primary)/0.1)]">
                                        <User size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{client.name}</h3>
                                        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[hsl(var(--primary))]">
                                            <Star size={10} className="fill-[hsl(var(--primary))]" /> {client.type}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-[hsl(var(--muted-foreground))] bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-full">
                                    {client.frequency}
                                </div>
                            </div>

                            <div className="space-y-3 mb-2">
                                <div className="flex items-center gap-3 text-sm text-[hsl(var(--muted-foreground))] font-medium">
                                    <MapPin size={16} className="text-rose-400" />
                                    <span>{client.address}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-[hsl(var(--muted-foreground))] font-medium">
                                    <Phone size={16} className="text-sky-400" />
                                    <span>{client.phone}</span>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[hsl(var(--primary))] active:opacity-60">
                                    View History <ChevronRight size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Link href="/clients/add">
                <motion.button
                    whileTap={{ scale: 0.8 }}
                    className="fixed bottom-28 right-6 w-16 h-16 rounded-2xl premium-gradient shadow-2xl flex items-center justify-center text-black z-50"
                >
                    <Plus size={32} strokeWidth={3} />
                </motion.button>
            </Link>

            <MobileNav />
            <VoiceButton />
        </main>
    )
}
