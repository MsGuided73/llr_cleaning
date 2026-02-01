'use client'

import { Mic } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function VoiceButton() {
    const [isListening, setIsListening] = useState(false)

    const toggleListening = () => {
        setIsListening(!isListening)
        // Speech API logic remains in Phase 6
    }

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleListening}
            className="voice-button-liquid"
            aria-label="Voice Commands"
        >
            <AnimatePresence>
                {isListening && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="voice-pulse-liquid"
                    />
                )}
            </AnimatePresence>
            <div className="relative z-10 flex items-center justify-center">
                <motion.div
                    animate={isListening ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <Mic size={28} className="text-white" />
                </motion.div>
            </div>
        </motion.button>
    )
}
