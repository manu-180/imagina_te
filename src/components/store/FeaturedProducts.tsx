'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Product } from '@/types'
import { ProductCard } from './ProductCard'

interface FeaturedProductsProps {
  products: Product[]
  title?: string
  eyebrow?: string
  ctaHref?: string
  ctaLabel?: string
}

export function FeaturedProducts({
  products,
  title = 'Nuestros favoritos',
  eyebrow = 'Curaduría',
  ctaHref = '/productos',
  ctaLabel = 'Ver toda la tienda',
}: FeaturedProductsProps) {
  if (products.length === 0) return null

  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-ivory">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-eyebrow text-champagne font-medium mb-3">
            {eyebrow}
          </p>
          <h2 className="font-display italic text-4xl md:text-5xl text-ink">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <ProductCard product={p} priority={i < 4} />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href={ctaHref}
            className="inline-block text-[12px] uppercase tracking-eyebrow font-medium border-b border-ink pb-1 hover:text-champagne hover:border-champagne transition-colors"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
