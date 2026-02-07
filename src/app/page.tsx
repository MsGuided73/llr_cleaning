'use client'

import { MobileNav } from '@/components/layout/MobileNav'
import { VoiceButton } from '@/components/layout/VoiceButton'
import { Plus, TrendingUp, MapPin, Clock, Sparkles, Loader2, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { format } from 'date-fns'

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
  const [loading, setLoading] = useState(true)
  const [nextJob, setNextJob] = useState<any>(null)
  const [paymentAlert, setPaymentAlert] = useState<any>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const today = new Date().toISOString()

        // 1. Next Job
        const { data: upcoming } = await supabase
          .from('llr_appointments')
          .select('*, client:llr_clients(name, address, phone)')
          .gte('start_time', today)
          .order('start_time', { ascending: true })
          .limit(1)
          .single()

        if (upcoming) setNextJob(upcoming)

        // 2. Payment Alert (Unpaid completed jobs)
        const { data: unpaid } = await supabase
          .from('llr_appointments')
          .select('*, client:llr_clients(name)')
          .eq('status', 'completed')
          .eq('payment_status', 'pending')
          .limit(1)
          .single()

        if (unpaid) setPaymentAlert(unpaid)

      } catch (error) {
        console.error('Error loading dashboard:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

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

        {loading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="animate-spin text-[hsl(var(--muted-foreground))]" size={32} />
          </div>
        ) : (
          <>
            <motion.div variants={item} className="flex items-center justify-between mb-2 px-1">
                <h2 className="text-3xl font-medium tracking-tight">My Work</h2>
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center">
                        <TrendingUp size={20} className="opacity-50" />
                    </div>
                     <div className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center">
                        <Clock size={20} className="opacity-50" />
                    </div>
                </div>
            </motion.div>

            {/* Daily Timeline - To evoke the list feel */}
            <div className="flex justify-between px-2 mb-6">
                 <span className="text-sm font-bold opacity-40">Today</span>
            </div>

            {/* Primary Active Card (Next Job) */}
            <motion.section variants={item}>
              {nextJob ? (
                 <div className="airy-card active min-h-[180px] flex flex-col justify-between">
                    {/* Top Row: Badges */}
                    <div className="flex justify-between items-start mb-4">
                        <div className="pill-badge">
                            Next Job
                        </div>
                        <div className="pill-badge bg-white/90 text-black">
                            {format(new Date(nextJob.start_time), 'h:mm a')}
                        </div>
                    </div>

                    {/* Middle Row: Content */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-black/10 overflow-hidden flex-shrink-0 border-2 border-white/20">
                             <img 
                                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" 
                                alt="Client"
                                className="w-full h-full object-cover"
                             />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold leading-tight mb-1">{nextJob.client?.name}</h3>
                            <p className="opacity-70 font-medium text-sm">Standard Cleaning</p>
                        </div>
                    </div>

                    {/* Bottom Row: Actions */}
                    <div className="flex items-center justify-between">
                         <div className="status-chip dark">
                            90
                         </div>
                         
                         <div className="flex gap-2">
                            <Link href={`tel:${nextJob.client?.phone || ''}`}>
                                <button className="action-circle light">
                                    <Phone size={20} />
                                </button>
                            </Link>
                             <Link href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(nextJob.client?.address || '')}`} target="_blank">
                                <button className="action-circle dark">
                                    <MapPin size={20} />
                                </button>
                            </Link>
                         </div>
                    </div>
                 </div>
              ) : (
                <div className="airy-card min-h-[140px] flex flex-col items-center justify-center text-center opacity-70">
                    <Sparkles size={32} className="mb-2 opacity-50"/>
                    <h3 className="font-bold">All caught up!</h3>
                    <p className="text-sm">Enjoy your day off.</p>
                </div>
              )}
            </motion.section>

            {/* Secondary List Items (Payment Alert) */}
            {paymentAlert && (
                <motion.section variants={item}>
                    <div className="airy-card flex flex-col gap-4">
                         <div className="flex justify-between items-start">
                            <div className="pill-badge bg-rose-100 text-rose-600">
                                Payment Due
                            </div>
                            <span className="text-xs font-bold opacity-40">Overdue</span>
                        </div>

                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-rose-50 overflow-hidden flex-shrink-0 flex items-center justify-center text-rose-500 font-bold text-lg">
                                 {paymentAlert.client?.name?.[0] || '!'}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold leading-tight">{paymentAlert.client?.name}</h3>
                                <p className="opacity-50 text-sm font-medium">Pending Invoice</p>
                            </div>
                            <div className="status-chip lime text-black">
                                $
                            </div>
                        </div>
                        
                         <Link href="/finances/remind" className="w-full">
                            <button className="w-full py-3 rounded-xl bg-black text-white font-bold text-sm">
                                Review Invoice
                            </button>
                        </Link>
                    </div>
                </motion.section>
            )}

            {/* Mock Future Job to show list aesthetic */}
             <motion.section variants={item}>
                 <div className="airy-card flex items-center justify-between opacity-60 grayscale-[0.5]">
                      <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden flex-shrink-0 flex items-center justify-center font-bold text-gray-400">
                                JL
                            </div>
                            <div>
                                <h3 className="text-lg font-bold leading-tight">Josiah Love</h3>
                                <p className="opacity-50 text-sm font-medium">First customer call</p>
                            </div>
                        </div>
                         <div className="status-chip bg-gray-100 text-gray-500 text-xs">
                            83
                         </div>
                 </div>
             </motion.section>
          </>
        )}

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
