'use client'

import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { CONTACT_WHATSAPP_NUMBER } from '@/lib/constants'

export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500)
    return () => clearTimeout(t)
  }, [])

  const href = `https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola, quería preguntarte sobre...')}`

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-30 w-14 h-14 rounded-full bg-success text-cream shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          aria-label="Contactanos por WhatsApp"
        >
          <MessageCircle size={26} strokeWidth={1.5} />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
