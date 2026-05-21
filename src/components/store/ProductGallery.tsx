'use client'

import Image from 'next/image'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import type { ProductImage } from '@/types'
import { cn } from '@/lib/utils'

interface ProductGalleryProps {
  images: ProductImage[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [active, setActive] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  if (images.length === 0) {
    return <div className="aspect-[3/4] bg-warm-gray-100" />
  }

  const current = images[active]

  function next() {
    setActive((a) => (a + 1) % images.length)
  }
  function prev() {
    setActive((a) => (a - 1 + images.length) % images.length)
  }

  return (
    <>
      <div className="lg:flex lg:gap-4">
        {/* Thumbnails desktop */}
        <div className="hidden lg:flex flex-col gap-3 w-20 flex-shrink-0">
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                'relative aspect-[3/4] overflow-hidden bg-warm-gray-100 transition-all',
                i === active
                  ? 'ring-2 ring-ink'
                  : 'opacity-70 hover:opacity-100'
              )}
              aria-label={`Imagen ${i + 1}`}
            >
              <Image
                src={img.url}
                alt={img.alt ?? productName}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {/* Imagen principal */}
        <div className="flex-1 relative aspect-[3/4] bg-warm-gray-100 overflow-hidden group">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              <Image
                src={current.url}
                alt={current.alt ?? productName}
                fill
                priority={active === 0}
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover cursor-zoom-in"
                onClick={() => setLightboxOpen(true)}
              />
            </motion.div>
          </AnimatePresence>

          {/* Botón zoom */}
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="absolute top-3 right-3 w-10 h-10 inline-flex items-center justify-center bg-cream/85 backdrop-blur-sm hover:bg-cream transition-colors"
            aria-label="Zoom"
          >
            <ZoomIn size={16} strokeWidth={1.5} />
          </button>

          {/* Indicador */}
          <span className="absolute bottom-3 right-3 px-3 py-1.5 bg-cream/85 backdrop-blur-sm text-[11px] uppercase tracking-eyebrow">
            {active + 1} / {images.length}
          </span>

          {/* Nav mobile */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                className="lg:hidden absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 inline-flex items-center justify-center bg-cream/85"
                aria-label="Anterior"
              >
                <ChevronLeft size={18} strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={next}
                className="lg:hidden absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 inline-flex items-center justify-center bg-cream/85"
                aria-label="Siguiente"
              >
                <ChevronRight size={18} strokeWidth={1.5} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Thumbnails mobile (debajo) */}
      <div className="lg:hidden flex gap-2 mt-3 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              'relative aspect-[3/4] w-16 flex-shrink-0 overflow-hidden bg-warm-gray-100',
              i === active ? 'ring-2 ring-ink' : 'opacity-70'
            )}
            aria-label={`Imagen ${i + 1}`}
          >
            <Image
              src={img.url}
              alt={img.alt ?? productName}
              fill
              sizes="64px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[400] bg-ink/95 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 text-cream"
              aria-label="Cerrar"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
            <div
              className="relative w-full max-w-3xl aspect-[3/4]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={current.url}
                alt={current.alt ?? productName}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
