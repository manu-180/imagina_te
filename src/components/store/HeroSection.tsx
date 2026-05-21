'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

const HERO_IMAGES = [
  'https://zrzpmgyafuesmakkoysn.supabase.co/storage/v1/object/public/lenceria-products/1000246751.jpg',
]

export function HeroSection() {
  return (
    <section className="relative h-[88vh] min-h-[640px] w-full overflow-hidden bg-ink -mt-16 lg:-mt-20">
      {/* Imagen */}
      <Image
        src={HERO_IMAGES[0]}
        alt="Imagina te lencería — Nueva colección 2026"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Overlay degradado */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/40 to-ink/70" />

      {/* Contenido */}
      <div className="relative h-full flex items-center justify-center px-6 pt-16 lg:pt-20">
        <div className="text-center max-w-3xl text-cream">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-accent text-base md:text-lg tracking-[0.4em] uppercase mb-6 text-champagne"
          >
            Nueva colección · 2026
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display italic text-6xl md:text-7xl lg:text-[110px] leading-[0.95] tracking-tight"
          >
            Imagina <span className="text-champagne not-italic">♥</span> te
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="font-accent italic text-2xl md:text-3xl lg:text-4xl mt-6 mb-10"
          >
            Renueva tu interior
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link
              href="/productos"
              className="inline-flex items-center justify-center h-12 px-8 bg-cream text-ink text-[12px] uppercase tracking-eyebrow font-medium hover:bg-champagne transition-colors"
            >
              Descubrí la colección
            </Link>
            <Link
              href="/colecciones/seduccion"
              className="inline-flex items-center justify-center h-12 px-8 border border-cream text-cream text-[12px] uppercase tracking-eyebrow font-medium hover:bg-cream hover:text-ink transition-colors"
            >
              Ver Seducción
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/70"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ArrowDown size={16} strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  )
}
