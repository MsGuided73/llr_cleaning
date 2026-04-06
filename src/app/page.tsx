'use client'

import { MobileNav } from '@/components/layout/MobileNav'
import { MapPin, Phone, Play, Clock, Menu, User } from 'lucide-react'

export default function Home() {
  return (
    <main className="main-content">
      
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <button aria-label="Menu">
          <Menu size={32} strokeWidth={3} className="text-black" />
        </button>
        
        <div className="text-center font-black flex flex-col items-center">
            <h1 className="text-4xl text-[var(--primary)] leading-none tracking-wide">LUXE CLEAN</h1>
            <div className="bg-[var(--accent-yellow)] px-2 py-0.5 mt-1 border-t-2 border-b-2 border-black inline-block">
                <span className="text-xs font-bold tracking-[0.15em] text-black">PROFESSIONAL CARE</span>
            </div>
        </div>
        
        <div className="w-12 h-12 brutal-icon-box white rounded-none">
           <User size={28} strokeWidth={2.5} className="text-black" />
        </div>
      </header>

      {/* Main Area */}
      <section className="space-y-6">
        <div>
           <div className="text-sm font-bold tracking-widest text-[#555] uppercase mb-1">Morning Dispatch</div>
           <h2 className="text-5xl font-black leading-[0.9] uppercase tracking-wide">Current<br/>Assignment</h2>
        </div>

        {/* The Dashed Decorator Box */}
        <div className="brutal-card-dashed mt-6">
            <div className="brutal-card-inner">
                {/* Title & Badge */}
                <div className="flex justify-between items-start mb-8 gap-2">
                    <h3 className="text-[2.5rem] font-bold text-[var(--primary)] leading-none uppercase">Eleanor Rigby</h3>
                    <div className="pill-badge pink whitespace-nowrap mt-1">
                        ID: #8821
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Address Line */}
                    <div className="flex gap-4 items-start">
                        <div className="brutal-icon-box yellow mt-1 shrink-0 w-12 h-12">
                            <MapPin strokeWidth={3} />
                        </div>
                        <div>
                            <div className="text-xs font-bold text-gray-500 tracking-wider">ADDRESS</div>
                            <div className="font-bold text-2xl leading-none italic mt-1 capitalize">123 Penny Lane,<br/>Liverpool</div>
                        </div>
                    </div>

                    {/* Time Line */}
                    <div className="flex gap-4 items-start">
                        <div className="brutal-icon-box pink mt-1 shrink-0 w-12 h-12">
                            <Clock strokeWidth={3} />
                        </div>
                        <div>
                            <div className="text-xs font-bold text-gray-500 tracking-wider">SCHEDULED TIME</div>
                            <div className="font-bold text-2xl leading-none mt-1 text-[var(--primary)]">10:00 AM — 2:00 PM</div>
                        </div>
                    </div>
                </div>

                <hr className="my-6 border-[1.5px] border-black" />
                <hr className="my-1 border-t-[1px] border-black" style={{ marginTop: '-20px', marginBottom: '24px' }} />

                {/* Footer Badges */}
                <div className="flex justify-between items-center mb-4">
                    <div className="brutal-icon-box pink text-xl w-12 h-12 font-black italic">ER</div>
                    <div className="pill-badge yellow text-lg uppercase text-black font-black">
                        Deep Clean Premium
                    </div>
                </div>

                {/* Bottom Stripe Decorator */}
                <div className="stripe-decorator border-t-2 border-black"></div>
            </div>
        </div>

        {/* Start Job Button */}
        <button className="brutal-button w-full mt-8">
            START JOB 
            <Play fill="white" size={24} className="ml-2" />
        </button>

        {/* Action Grid */}
        <div className="grid grid-cols-2 gap-4 mt-6">
            <button className="brutal-button yellow py-6 flex-col">
                <MapPin size={32} strokeWidth={3} fill="currentColor" />
                <span className="text-xl mt-1">MAP</span>
            </button>
            <button className="brutal-button white py-6 flex-col">
                <Phone size={32} strokeWidth={3} fill="currentColor" />
                <span className="text-xl mt-1">CALL</span>
            </button>
        </div>

        {/* Notification Toast */}
        <div className="mt-8">
            <div className="brutal-card flex items-center justify-center p-4">
               <div className="w-5 h-5 bg-pink-400 border-2 border-black mr-3"></div>
               <span className="font-bold text-lg tracking-wider">1 NEW SCHEDULE UPDATE</span>
            </div>
        </div>

      </section>

      <MobileNav />
    </main>
  )
}
