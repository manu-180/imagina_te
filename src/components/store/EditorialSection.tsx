'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Collection } from '@/types'

interface EditorialSectionProps {
  collection: Collection
  reverse?: boolean
}

export function EditorialSection({ collection, reverse = false }: EditorialSectionProps) {
  return (
    <section className="py-16 lg:py-28 bg-cream overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${reverse ? 'lg:[direction:rtl]' : ''}`}
        >
          <motion.div
            initial={{ opacity: 0, x: reverse ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] [direction:ltr]"
          >
            {(collection.hero_image_url || collection.image_url) && (
              <Image
                src={collection.hero_image_url || collection.image_url!}
                alt={collection.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="[direction:ltr]"
          >
            <p className="text-[11px] uppercase tracking-eyebrow text-champagne font-medium mb-4">
              {collection.season ?? 'Colección destacada'}
            </p>
            <h2 className="font-display italic text-5xl md:text-6xl lg:text-7xl text-ink leading-[1]">
              {collection.name}
            </h2>
            {collection.description && (
              <p className="mt-6 text-base lg:text-lg text-soft-black leading-relaxed max-w-md">
                {collection.description}
              </p>
            )}
            <Link
              href={`/colecciones/${collection.slug}`}
              className="inline-flex items-center mt-8 h-12 px-7 bg-ink text-cream text-[12px] uppercase tracking-eyebrow font-medium hover:bg-champagne hover:text-ink transition-colors"
            >
              Ver la colección
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
