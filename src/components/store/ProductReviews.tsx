'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import type { Review } from '@/types'
import { StarRating } from '@/components/ui/StarRating'
import { formatDate, cn } from '@/lib/utils'

interface ProductReviewsProps {
  reviews: Review[]
  ratingAvg: number
  ratingCount: number
}

export function ProductReviews({ reviews, ratingAvg, ratingCount }: ProductReviewsProps) {
  const [filter, setFilter] = useState<number | null>(null)
  const filtered = filter
    ? reviews.filter((r) => r.rating === filter)
    : reviews

  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length
    const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0
    return { star, count, pct }
  })

  if (reviews.length === 0) {
    return (
      <section className="py-12 lg:py-16 border-t border-warm-gray-100">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="font-display italic text-3xl text-ink mb-3">
            Todavía sin reviews
          </h2>
          <p className="text-warm-gray-500">
            Sé la primera en contarnos qué te pareció.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 lg:py-16 border-t border-warm-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display italic text-3xl md:text-4xl text-ink mb-8">
          Reviews ({ratingCount})
        </h2>

        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Resumen */}
          <div>
            <div className="flex items-baseline gap-3">
              <p className="font-display text-5xl text-ink font-medium">
                {ratingAvg.toFixed(1)}
              </p>
              <p className="text-warm-gray-500 text-sm">/ 5</p>
            </div>
            <StarRating rating={ratingAvg} showCount={false} size={20} />
            <p className="text-sm text-warm-gray-500 mt-2">
              Basado en {ratingCount} reseñas
            </p>
          </div>

          {/* Distribución */}
          <div className="md:col-span-2 space-y-2">
            {distribution.map((d) => (
              <button
                key={d.star}
                type="button"
                onClick={() => setFilter(filter === d.star ? null : d.star)}
                className="w-full flex items-center gap-3 text-sm group"
              >
                <span className="w-3 text-ink">{d.star}</span>
                <StarRating rating={1} showCount={false} size={11} />
                <div className="flex-1 h-1.5 bg-warm-gray-100 overflow-hidden">
                  <div
                    className={cn(
                      'h-full transition-all',
                      filter === d.star ? 'bg-ink' : 'bg-champagne group-hover:bg-ink'
                    )}
                    style={{ width: `${d.pct}%` }}
                  />
                </div>
                <span className="w-8 text-right text-warm-gray-500">{d.count}</span>
              </button>
            ))}
            {filter !== null && (
              <button
                type="button"
                onClick={() => setFilter(null)}
                className="text-xs text-champagne mt-2"
              >
                Mostrar todas
              </button>
            )}
          </div>
        </div>

        {/* Lista de reviews */}
        <div className="space-y-8">
          {filtered.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
              className="border-b border-warm-gray-100 pb-8 last:border-0"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-ink">{r.customer_name}</p>
                    {r.is_verified && (
                      <span className="inline-flex items-center gap-1 text-xs text-success">
                        <CheckCircle2 size={12} strokeWidth={1.5} />
                        Compra verificada
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-warm-gray-500 mt-0.5">
                    {formatDate(r.created_at)}
                    {r.size_purchased ? ` · Talle ${r.size_purchased}` : ''}
                  </p>
                </div>
                <StarRating rating={r.rating} showCount={false} size={14} />
              </div>
              {r.title && (
                <p className="font-display italic text-xl text-ink mb-2">{r.title}</p>
              )}
              {r.body && (
                <p className="text-sm text-soft-black leading-relaxed">{r.body}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
