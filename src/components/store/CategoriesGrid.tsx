'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { Category } from '@/types'

interface CategoriesGridProps {
  categories: Category[]
  limit?: number
}

export function CategoriesGrid({ categories, limit = 4 }: CategoriesGridProps) {
  const shown = categories.slice(0, limit)
  if (shown.length === 0) return null

  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-cream">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-eyebrow text-champagne font-medium mb-3">
            Explorar
          </p>
          <h2 className="font-display italic text-4xl md:text-5xl text-ink">
            Cada estilo, su categoría
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {shown.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Link href={`/productos?categoria=${cat.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-warm-gray-100">
                  {cat.image_url && (
                    <Image
                      src={cat.image_url}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-cream">
                    <h3 className="font-display italic text-2xl md:text-3xl mb-1">
                      {cat.name}
                    </h3>
                    <div className="inline-flex items-center gap-1 text-[11px] uppercase tracking-eyebrow opacity-90 group-hover:gap-2 transition-all">
                      Ver
                      <ArrowUpRight size={12} strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
