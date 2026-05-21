'use client'

import { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { StarRating } from '@/components/ui/StarRating'

interface ReviewItem {
  id: string
  customer_name: string
  rating: number
  title: string | null
  body: string | null
  product_name: string
  product_slug: string
  size_purchased: string | null
}

interface ReviewsCarouselProps {
  reviews: ReviewItem[]
}

export function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const [emblaRef] = useEmblaCarousel(
    { align: 'start', loop: true },
    [Autoplay({ delay: 5500, stopOnInteraction: true })]
  )

  if (reviews.length === 0) return null

  return (
    <section className="py-16 lg:py-24 bg-ink text-cream overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12 px-4">
          <p className="text-[11px] uppercase tracking-eyebrow text-champagne font-medium mb-3">
            Lo que dicen
          </p>
          <h2 className="font-display italic text-4xl md:text-5xl">
            Las clientas hablan
          </h2>
        </div>

        <div className="overflow-hidden px-4 sm:px-6 lg:px-8" ref={emblaRef}>
          <div className="flex gap-6">
            {reviews.map((r, i) => (
              <motion.figure
                key={r.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex-shrink-0 w-[300px] md:w-[380px] bg-noir/40 border border-warm-gray-500/20 p-7 backdrop-blur-sm"
              >
                <Quote
                  size={28}
                  strokeWidth={1.5}
                  className="text-champagne mb-4"
                />
                <StarRating rating={r.rating} showCount={false} />
                {r.title && (
                  <p className="mt-3 font-display italic text-xl text-cream">
                    {r.title}
                  </p>
                )}
                {r.body && (
                  <blockquote className="mt-3 text-sm text-warm-gray-300 leading-relaxed">
                    {r.body}
                  </blockquote>
                )}
                <figcaption className="mt-5 pt-5 border-t border-warm-gray-500/30">
                  <p className="text-sm font-medium text-cream">
                    {r.customer_name}
                  </p>
                  <p className="text-xs text-warm-gray-500 mt-0.5">
                    {r.product_name}
                    {r.size_purchased ? ` · Talle ${r.size_purchased}` : ''}
                  </p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
