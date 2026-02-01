'use client'

import { MobileNav } from '@/components/layout/MobileNav'
import { VoiceButton } from '@/components/layout/VoiceButton'
import { ChevronLeft, Receipt, Tag, DollarSign, Camera, Save, MapPin, Sparkles, HelpCircle, X, Check, Loader2, Edit2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const categories = [
    { id: 'supplies', label: 'Supplies', icon: Tag, color: 'text-amber-400' },
    { id: 'fuel', label: 'Fuel', icon: MapPin, color: 'text-sky-400' },
    { id: 'marketing', label: 'Marketing', icon: Sparkles, color: 'text-purple-400' },
    { id: 'other', label: 'Other', icon: HelpCircle, color: 'text-zinc-400' },
]

export default function LogExpense() {
    const router = useRouter()
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState('')
    const [loading, setLoading] = useState(false)
    const [isScanning, setIsScanning] = useState(false)
    const [uploadedImage, setUploadedImage] = useState<string | null>(null)
    const [parsedItems, setParsedItems] = useState<{ id: number, name: string, price: number }[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setUploadedImage(reader.result as string)
                startScan()
            }
            reader.readAsDataURL(file)
        }
    }

    const startScan = () => {
        setIsScanning(true)
        // Simulate AI parsing time
        setTimeout(() => {
            const mockItems = [
                { id: 1, name: "Windex Original (26oz)", price: 4.29 },
                { id: 2, name: "Microfiber Towels (12pk)", price: 12.99 },
                { id: 3, name: "Murphy Oil Soap", price: 6.50 },
            ]
            setParsedItems(mockItems)
            recalculateTotal(mockItems)
            setIsScanning(false)
            setCategory('supplies') // Auto-categorize trigger
        }, 2500)
    }

    const recalculateTotal = (items: typeof parsedItems) => {
        const total = items.reduce((acc, curr) => acc + curr.price, 0)
        setAmount(total.toFixed(2))
    }

    const updateItem = (id: number, field: 'name' | 'price', value: string) => {
        const newItems = parsedItems.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    [field]: field === 'price' ? parseFloat(value) || 0 : value
                }
            }
            return item
        })
        setParsedItems(newItems)
        if (field === 'price') recalculateTotal(newItems)
    }

    const handleSave = async () => {
        if (!amount || !category) return
        setLoading(true)

        const { error } = await supabase.from('llr_expenses').insert([{
            total_amount: parseFloat(amount),
            category,
            merchant: 'Scanned Receipt', // Could be parsed AI field later
            date: new Date().toISOString(),
            items: parsedItems
        }])

        setLoading(false)

        if (!error) {
            alert('Expense saved successfully!')
            router.push('/finances')
        } else {
            console.error(error)
            alert('Error saving expense.')
        }
    }

    const clearScan = () => {
        setUploadedImage(null)
        setParsedItems([])
        setAmount('')
        setCategory('')
        setIsScanning(false)
        if (fileInputRef.current) fileInputRef.current.value = ''
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
                    Receipt Tracker
                </h1>
            </header>

            <section className="space-y-8 pb-32">
                {/* Receipt Upload/Scanner Area */}
                <div className="space-y-4">
                    <h2 className="section-header">Step 1: Snap or Upload</h2>
                    <div className="glass-pane p-1 relative min-h-[200px] flex items-center justify-center overflow-hidden">
                        <AnimatePresence mode="wait">
                            {!uploadedImage ? (
                                <motion.button
                                    key="upload"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full h-48 border-2 border-dashed border-black/5 dark:border-white/10 rounded-[2rem] flex flex-col items-center justify-center gap-3 text-xs font-black uppercase tracking-widest text-[hsl(var(--muted-foreground))]"
                                >
                                    <Camera size={32} className="text-[hsl(var(--primary))]" />
                                    <span>Scan Receipt for Taxes</span>
                                </motion.button>
                            ) : (
                                <motion.div
                                    key="preview"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="relative w-full h-64 rounded-[2rem] overflow-hidden"
                                >
                                    <img src={uploadedImage} alt="Receipt" className="w-full h-full object-cover" />

                                    {/* Scanning Animation */}
                                    {isScanning && (
                                        <motion.div
                                            initial={{ top: 0 }}
                                            animate={{ top: '100%' }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            className="absolute left-0 right-0 h-1 bg-[hsl(var(--primary))] shadow-[0_0_20px_hsl(var(--primary))] z-10"
                                        />
                                    )}

                                    <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] flex flex-col items-center justify-center">
                                        {isScanning ? (
                                            <div className="flex flex-col items-center gap-2 bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/30 text-white">
                                                <Loader2 className="animate-spin" size={24} />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Parsing Supplies...</span>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={clearScan}
                                                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center"
                                            >
                                                <X size={20} />
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </div>
                </div>

                {/* Parsed Items Breakdown (Editable) */}
                {parsedItems.length > 0 && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="space-y-4"
                    >
                        <h2 className="section-header">Cleaning Supplies Found (Tap to Edit)</h2>
                        <div className="glass-pane space-y-2">
                            {parsedItems.map((item) => (
                                <div key={item.id} className="glass-inner p-4 flex items-center justify-between group">
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center flex-shrink-0">
                                            <Check size={14} />
                                        </div>
                                        <input
                                            className="bg-transparent border-none text-xs font-bold w-full focus:ring-0 outline-none text-[hsl(var(--foreground))]"
                                            value={item.name}
                                            onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                                        />
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-xs font-black text-emerald-600">$</span>
                                        <input
                                            type="number"
                                            className="bg-transparent border-none text-xs font-black w-12 text-right focus:ring-0 outline-none text-emerald-600"
                                            value={item.price}
                                            onChange={(e) => updateItem(item.id, 'price', e.target.value)}
                                        />
                                    </div>
                                </div>
                            ))}
                            <div className="p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 flex items-center justify-center gap-2">
                                <Sparkles size={14} className="text-emerald-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Tax Categorized: Cleaning Supplies</span>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Dynamic Amount Section */}
                <div className="space-y-4">
                    <h2 className="section-header text-center">Step 2: Review Total</h2>
                    <div className="glass-pane p-8 flex flex-col items-center justify-center">
                        <div className="flex items-center gap-3">
                            <span className="text-3xl font-black text-[hsl(var(--primary))]">$</span>
                            <input
                                type="text"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                className="bg-transparent border-none text-6xl font-black w-48 text-center focus:ring-0 outline-none placeholder:text-black/5"
                            />
                        </div>
                        {isScanning && <p className="text-[10px] font-black text-[hsl(var(--primary))] uppercase tracking-widest animate-pulse mt-2">AI Calculating...</p>}
                    </div>
                </div>

                {/* Category & Save */}
                <div className="space-y-4">
                    <h2 className="section-header">Step 3: Categorize & Save</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {categories.map((cat) => (
                            <motion.button
                                key={cat.id}
                                onClick={() => setCategory(cat.id)}
                                whileTap={{ scale: 0.95 }}
                                className={`glass-pane p-6 flex flex-col items-center gap-4 transition-all ${(!amount || isScanning) ? 'opacity-50 grayscale' : 'hover:scale-[1.02]'
                                    } ${category === cat.id ? 'ring-2 ring-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.05)]' : ''}`}
                            >
                                <div className={`p-4 bg-[hsl(var(--background))] rounded-2xl ${cat.color} border border-white/5`}>
                                    <cat.icon size={26} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest">{cat.label}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>

                <motion.button
                    onClick={handleSave}
                    whileTap={{ scale: 0.95 }}
                    disabled={!amount || isScanning || loading || !category}
                    className={`premium-button-3d w-full h-18 text-sm ${(!amount || isScanning || loading || !category) ? 'opacity-50 grayscale' : ''}`}
                >
                    {loading ? <Loader2 className="animate-spin" /> : <><Save size={22} className="mr-2" /> Save to LLR Records</>}
                </motion.button>
            </section>

            <MobileNav />
            <VoiceButton />
        </main>
    )
}
