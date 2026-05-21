'use client'

import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DrawerProps {
  open: boolean
  onClose: () => void
  side?: 'left' | 'right'
  title?: string
  children: ReactNode
  className?: string
}

export function Drawer({
  open,
  onClose,
  side = 'right',
  title,
  children,
  className,
}: DrawerProps) {
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

  if (typeof window === 'undefined') return null

  const initial = side === 'right' ? { x: '100%' } : { x: '-100%' }
  const animate = { x: 0 }
  const exit = side === 'right' ? { x: '100%' } : { x: '-100%' }

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[200]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-ink/55 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            initial={initial}
            animate={animate}
            exit={exit}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'absolute top-0 bottom-0 w-full sm:max-w-md bg-cream shadow-2xl flex flex-col',
              side === 'right' ? 'right-0' : 'left-0',
              className
            )}
          >
            <div className="flex items-center justify-between border-b border-warm-gray-100 px-6 py-4 flex-shrink-0">
              {title && (
                <h2 className="font-display text-xl italic text-ink">{title}</h2>
              )}
              <button
                type="button"
                aria-label="Cerrar"
                onClick={onClose}
                className="ml-auto p-1 text-soft-black hover:text-ink transition-colors"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{children}</div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}
