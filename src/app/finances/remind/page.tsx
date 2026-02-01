'use client'

import { MobileNav } from '@/components/layout/MobileNav'
import { VoiceButton } from '@/components/layout/VoiceButton'
import { ChevronLeft, Camera, Send, Type, Image as ImageIcon, Sparkles, Share2, Copy } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import Link from 'next/link'

const presets = [
    { id: 'warm', label: 'Warm', color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { id: 'fresh', label: 'Fresh', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { id: 'modern', label: 'Modern', color: 'text-sky-500', bg: 'bg-sky-500/10' },
]

export default function ReminderCanvas() {
    const [message, setMessage] = useState("Hi! Just a friendly reminder that payment for today's clean is ready. Thank you!")
    const [selectedPreset, setSelectedPreset] = useState('warm')
    const [uploadedImage, setUploadedImage] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setUploadedImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <main className="main-content">
            <header className="flex items-center gap-4 mb-8">
                <Link href="/finances">
                    <motion.div whileTap={{ scale: 0.8 }} className="p-3 dimensional-card">
                        <ChevronLeft size={24} />
                    </motion.div>
                </Link>
                <h1 className="text-2xl font-black bg-gradient-to-r from-[hsl(var(--foreground))] to-[hsl(var(--foreground),0.4)] bg-clip-text text-transparent">
                    Creator
                </h1>
            </header>

            <section className="space-y-8 pb-24">
                {/* The "Canva" Canvas */}
                <div className="space-y-4">
                    <h2 className="section-header">
                        <Sparkles size={14} /> Preview
                    </h2>
                    <div className="relative aspect-square w-full rounded-[2.5rem] overflow-hidden dimensional-card p-0">
                        {/* Background Image/Color */}
                        <div className={`absolute inset-0 transition-colors duration-700 ${uploadedImage ? 'bg-black' : presets.find(p => p.id === selectedPreset)?.bg}`}>
                            {uploadedImage && (
                                <img src={uploadedImage} alt="Clean" className="w-full h-full object-cover opacity-60" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
                        </div>

                        {/* Overlays */}
                        <div className="absolute inset-0 p-8 flex flex-col justify-end">
                            <motion.div
                                key={message}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-2"
                            >
                                <div className="h-1 w-12 bg-[hsl(var(--primary))] rounded-full mb-4" />
                                <p className={`text-2xl font-black italic tracking-tight leading-tight text-white`}>
                                    &ldquo;{message}&rdquo;
                                </p>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Friendly Reminder from LLR</p>
                            </motion.div>
                        </div>

                        {/* Watermark */}
                        <div className="absolute top-6 left-6 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                                <Sparkles size={14} className="text-white" />
                            </div>
                            <span className="text-[10px] font-black text-white/80 uppercase tracking-widest">LLR Cleaners</span>
                        </div>
                    </div>
                </div>

                {/* Customization Controls */}
                <div className="space-y-6">
                    <div className="space-y-3">
                        <h3 className="section-header">Step 1: The Message</h3>
                        <div className="dimensional-card p-4">
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type your friendly message..."
                                rows={3}
                                className="w-full bg-transparent border-none text-sm font-bold focus:ring-0 outline-none resize-none px-2"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="section-header">Step 2: The Vibe</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {presets.map((p) => (
                                <motion.button
                                    key={p.id}
                                    onClick={() => setSelectedPreset(p.id)}
                                    whileTap={{ scale: 0.9 }}
                                    className={`p-4 rounded-2xl flex flex-col items-center gap-2 border-2 transition-all ${selectedPreset === p.id ? 'bg-[hsl(var(--primary)/0.15)] border-[hsl(var(--primary)/0.3)] shadow-lg' : 'bg-black/5 dark:bg-white/5 border-transparent'}`}
                                >
                                    <div className={`p-2 rounded-lg ${p.bg} ${p.color}`}>
                                        <Sparkles size={18} />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest">{p.label}</span>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="section-header">Step 3: Add Photo (Optional)</h3>
                        <div className="flex gap-4">
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => fileInputRef.current?.click()}
                                className="flex-1 h-16 dimensional-card flex items-center justify-center gap-3 text-sm font-black uppercase tracking-widest"
                            >
                                <Camera size={20} className="text-[hsl(var(--primary))]" /> {uploadedImage ? 'Change Photo' : 'Take Picture'}
                            </motion.button>
                            {uploadedImage && (
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setUploadedImage(null)}
                                    className="w-16 h-16 dimensional-card flex items-center justify-center text-rose-500 border-rose-500/20"
                                >
                                    <ImageIcon size={20} />
                                </motion.button>
                            )}
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </div>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="grid grid-cols-2 gap-4">
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="h-18 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center gap-3 font-black uppercase tracking-widest text-xs"
                    >
                        <Copy size={20} /> Copy Text
                    </motion.button>
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="h-18 rounded-2xl premium-gradient flex items-center justify-center gap-3 font-black uppercase tracking-widest text-xs text-black"
                    >
                        <Share2 size={20} /> Share Image
                    </motion.button>
                </div>
            </section>

            <MobileNav />
            <VoiceButton />
        </main>
    )
}
