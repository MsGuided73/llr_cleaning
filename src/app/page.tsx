'use client'

import { MobileNav } from '@/components/layout/MobileNav'
import { VoiceButton } from '@/components/layout/VoiceButton'
import { Plus, TrendingUp, Wallet, MapPin, ChevronRight, Clock, Star, Sparkles, Shield, DollarSign, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Home() {
  return (
    <main className="main-content">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        {/* Profile & Greeting Section */}
        <motion.header variants={item} className="flex flex-col gap-6 px-1">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop"
                alt="Lori"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-0.5">
              <h1 className="text-xl font-medium text-[hsl(var(--muted-foreground))]">Hi, Lori!</h1>
              <p className="text-3xl font-black tracking-tight leading-none text-black dark:text-white">
                How can I help you?
              </p>
            </div>
          </div>
        </motion.header>

        {/* Priority Alert - Tiered Glass Hierarchy */}
        <motion.section variants={item}>
          <div className="glass-pane bg-rose-50/40 dark:bg-rose-950/20 border-rose-100/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="glass-icon-sq bg-rose-100 text-rose-600 border-rose-200">
                  <Shield size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Payment Alert</h3>
                  <p className="text-[10px] font-bold text-rose-500/80 uppercase tracking-widest">Action Needed</p>
                </div>
              </div>
              <div className="glass-icon-sq w-10 h-10 bg-white text-black shadow-lg">
                <ArrowUpRight size={18} />
              </div>
            </div>

            <div className="glass-inner p-6 mb-6 sage-teal-glow">
              <h4 className="font-black text-xl leading-tight">Mrs. Davis (Yesterday)</h4>
              <p className="text-xs text-[hsl(var(--primary))] font-bold mt-1">$180.00 Outstanding</p>
            </div>

            <Link href="/finances/remind">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="premium-button-3d w-full h-16 text-xs"
              >
                Send Reminder
              </motion.button>
            </Link>
          </div>
        </motion.section>

        {/* Primary Focus Card - Tiered Glass Hierarchy */}
        <motion.section variants={item}>
          <div className="glass-pane">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="glass-icon-sq">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Next Cleaning</h3>
                  <p className="text-[10px] font-bold text-[hsl(var(--primary))] uppercase tracking-widest">9:30 AM Today</p>
                </div>
              </div>
              <div className="glass-icon-sq w-10 h-10 bg-white text-black shadow-lg">
                <ArrowUpRight size={18} />
              </div>
            </div>

            <div className="glass-inner p-6 mb-6 flex items-end justify-between min-h-[140px] sage-teal-glow">
              <div className="space-y-1">
                <h3 className="text-2xl font-black tracking-tight">Mrs. Johnson</h3>
                <div className="flex items-center gap-2 text-xs font-medium opacity-60">
                  <MapPin size={14} /> Highland Park, 123 Maple
                </div>
              </div>
              <div className="w-14 h-14 rounded-2xl border-4 border-white shadow-2xl overflow-hidden flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1541339907198-e08756ebafe1?w=100&h=100&fit=crop" alt="Property" className="w-full h-full object-cover" />
              </div>
            </div>

            <Link href="https://www.google.com/maps/dir/?api=1&destination=123+Maple,+Highland+Park" target="_blank">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="premium-button-3d w-full h-18 text-xs bg-[hsl(var(--primary))]"
              >
                Start Heading There
              </motion.button>
            </Link>
          </div>
        </motion.section>

        {/* Stats Grid */}
        <motion.section variants={item} className="grid grid-cols-2 gap-4 pb-12">
          <div className="glass-pane p-6 flex flex-col items-center gap-4 text-center">
            <div className="glass-icon-sq bg-[hsl(var(--background))] text-[hsl(var(--primary))]">
              <Wallet size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">Revenue</p>
              <p className="text-xl font-black">$450.00</p>
            </div>
          </div>
          <div className="glass-pane p-6 flex flex-col items-center gap-4 text-center">
            <div className="glass-icon-sq bg-[hsl(var(--background))] text-[hsl(var(--primary))]">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">Mileage</p>
              <p className="text-xl font-black">12.4 mi</p>
            </div>
          </div>
        </motion.section>

        {/* Global Action Add */}
        <motion.div variants={item} className="fixed bottom-32 right-6 z-50">
          <Link href="/schedule/new">
            <motion.button
              whileTap={{ scale: 0.8 }}
              className="w-20 h-20 rounded-[2.5rem] bg-black dark:bg-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center justify-center text-white dark:text-black"
            >
              <Plus size={40} strokeWidth={3} />
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      <MobileNav />
      <VoiceButton />
    </main>
  )
}
