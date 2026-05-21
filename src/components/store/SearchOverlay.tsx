'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, X } from 'lucide-react'

const POPULARES = [
  'corpiño negro',
  'conjunto encaje',
  'pijama satén',
  'robe kimono',
  'bodysuit',
  'liguero',
]

interface SearchOverlayProps {
  open: boolean
  onClose: () => void
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const router = useRouter()
  const [q, setQ] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200)
    } else {
      setQ('')
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  function submit(query: string) {
    const value = query.trim()
    if (!value) return
    router.push(`/buscar?q=${encodeURIComponent(value)}`)
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[300] bg-cream/98 backdrop-blur-md flex flex-col"
        >
          <div className="flex items-center justify-end px-4 py-4">
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-ink hover:text-champagne transition-colors"
              aria-label="Cerrar búsqueda"
            >
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>
          <div className="flex-1 max-w-2xl mx-auto w-full px-6 pt-8">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                submit(q)
              }}
              className="border-b-2 border-ink flex items-center gap-3 pb-3"
            >
              <Search size={22} strokeWidth={1.5} className="text-ink" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="¿Qué andás buscando hoy?"
                className="flex-1 bg-transparent font-display italic text-2xl md:text-3xl text-ink placeholder:text-warm-gray-500 focus:outline-none"
              />
            </form>
            <div className="mt-8">
              <p className="text-[11px] uppercase tracking-eyebrow text-warm-gray-500 mb-3">
                Búsquedas populares
              </p>
              <div className="flex flex-wrap gap-2">
                {POPULARES.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => submit(p)}
                    className="px-4 py-2 border border-warm-gray-300 text-sm text-ink hover:bg-ink hover:text-cream transition-colors"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
