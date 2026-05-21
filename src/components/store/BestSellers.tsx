'use client'

import { useCallback } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Product } from '@/types'
import { ProductCard } from './ProductCard'

interface BestSellersProps {
  products: Product[]
}

export function BestSellers({ products }: BestSellersProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    dragFree: true,
    slidesToScroll: 1,
  })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  if (products.length === 0) return null

  return (
    <section className="py-16 lg:py-24 bg-cream">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-10 px-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-[11px] uppercase tracking-eyebrow text-champagne font-medium mb-3">
              Las más amadas
            </p>
            <h2 className="font-display italic text-4xl md:text-5xl text-ink">
              Best sellers
            </h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              type="button"
              aria-label="Anterior"
              onClick={scrollPrev}
              className="w-11 h-11 inline-flex items-center justify-center border border-ink text-ink hover:bg-ink hover:text-cream transition-colors"
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              aria-label="Siguiente"
              onClick={scrollNext}
              className="w-11 h-11 inline-flex items-center justify-center border border-ink text-ink hover:bg-ink hover:text-cream transition-colors"
            >
              <ArrowRight size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="overflow-hidden pl-4 sm:pl-6 lg:pl-8" ref={emblaRef}>
          <div className="flex gap-5">
            {products.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex-shrink-0 w-[260px] md:w-[300px]"
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
            <div className="flex-shrink-0 w-4 lg:w-8" />
          </div>
        </div>

        <div className="text-center mt-12 px-4">
          <Link
            href="/productos?sort=bestselling"
            className="inline-block text-[12px] uppercase tracking-eyebrow font-medium border-b border-ink pb-1 hover:text-champagne hover:border-champagne transition-colors"
          >
            Ver todos los más vendidos
          </Link>
        </div>
      </div>
    </section>
  )
}
