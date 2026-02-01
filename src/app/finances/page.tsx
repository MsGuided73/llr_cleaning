'use client'

import { MobileNav } from '@/components/layout/MobileNav'
import { VoiceButton } from '@/components/layout/VoiceButton'
import { TrendingUp, Wallet, Receipt, Calendar, ArrowUpRight, ArrowDownRight, Sparkles, PieChart } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const transactions = [
    { id: 1, label: "Mrs. Johnson", amount: 150.00, type: "income", date: "Today" },
    { id: 2, label: "Cleaning Supplies", amount: -45.20, type: "expense", date: "Yesterday" },
    { id: 3, label: "The Smith Residence", amount: 200.00, type: "income", date: "Jan 29" },
]

export default function Finances() {
    return (
        <main className="main-content">
            <header className="mb-8 p-1">
                <h1 className="text-3xl font-black bg-gradient-to-r from-[hsl(var(--foreground))] to-[hsl(var(--foreground),0.4)] bg-clip-text text-transparent">
                    Finances
                </h1>
                <p className="text-[10px] font-black uppercase tracking-widest text-[hsl(var(--primary))] mt-0.5">Lori&apos;s Business Pulse</p>
            </header>

            <section className="space-y-8 pb-20">
                {/* Main Stats Block */}
                <div className="space-y-4">
                    <h2 className="section-header">
                        <TrendingUp size={14} /> Monthly Overview
                    </h2>
                    <div className="glass-pane p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <TrendingUp size={120} />
                        </div>
                        <div className="relative z-10">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))] mb-2">Total Balance</p>
                            <h3 className="text-4xl font-black mb-6">$3,240.50</h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/10">
                                    <div className="flex items-center gap-2 text-emerald-500 mb-1">
                                        <ArrowUpRight size={14} />
                                        <span className="text-[10px] font-black uppercase">Revenue</span>
                                    </div>
                                    <p className="font-bold">+$4,500</p>
                                </div>
                                <div className="p-3 bg-rose-500/10 rounded-2xl border border-rose-500/10">
                                    <div className="flex items-center gap-2 text-rose-500 mb-1">
                                        <ArrowDownRight size={14} />
                                        <span className="text-[10px] font-black uppercase">Expenses</span>
                                    </div>
                                    <p className="font-bold">-$1,259</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions Block */}
                <div className="space-y-4">
                    <h2 className="section-header">
                        <Sparkles size={14} /> Actions
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/finances/log">
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                className="glass-pane p-5 w-full flex flex-col items-center gap-3 hover:translate-y-[-2px] transition-transform"
                            >
                                <div className="glass-icon-sq bg-rose-500/10 text-rose-500">
                                    <Receipt size={22} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-center">Log Expense</span>
                            </motion.button>
                        </Link>
                        <Link href="/finances/income">
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                className="glass-pane p-5 w-full flex flex-col items-center gap-3 hover:translate-y-[-2px] transition-transform"
                            >
                                <div className="glass-icon-sq bg-emerald-500/10 text-emerald-500">
                                    <Wallet size={22} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-center">Income Tracker</span>
                            </motion.button>
                        </Link>
                    </div>
                </div>

                {/* Recent Activity Block */}
                <div className="space-y-4">
                    <h2 className="section-header">
                        <Calendar size={14} /> Recent Activity
                    </h2>
                    <div className="space-y-3">
                        {transactions.map((tx) => (
                            <motion.div
                                key={tx.id}
                                whileTap={{ scale: 0.98 }}
                                className="glass-pane p-5 flex items-center justify-between hover:bg-white/5 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`glass-icon-sq w-10 h-10 ${tx.type === 'income' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                        {tx.type === 'income' ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm">{tx.label}</h3>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-[hsl(var(--muted-foreground))]">{tx.date}</p>
                                    </div>
                                </div>
                                <span className={`font-black ${tx.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    {tx.type === 'income' ? '+' : ''}{tx.amount.toFixed(2)}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <MobileNav />
            <VoiceButton />
        </main>
    )
}
