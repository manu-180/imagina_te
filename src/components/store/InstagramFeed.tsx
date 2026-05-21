'use client'

import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'
import Image from 'next/image'
import { CONTACT_INSTAGRAM } from '@/lib/constants'

const FEED_IMAGES = [
  'https://zrzpmgyafuesmakkoysn.supabase.co/storage/v1/object/public/lenceria-products/1000246751.jpg',
  'https://zrzpmgyafuesmakkoysn.supabase.co/storage/v1/object/public/lenceria-products/1000246750.jpg',
  'https://zrzpmgyafuesmakkoysn.supabase.co/storage/v1/object/public/lenceria-products/1000246749.jpg',
  'https://zrzpmgyafuesmakkoysn.supabase.co/storage/v1/object/public/unodeenero/WhatsApp%20Image%202026-05-06%20at%209.08.52%20AM.jpeg',
  'https://zrzpmgyafuesmakkoysn.supabase.co/storage/v1/object/public/unodeenero/WhatsApp%20Image%202026-05-06%20at%209.09.12%20AM.jpeg',
  'https://zrzpmgyafuesmakkoysn.supabase.co/storage/v1/object/public/unodeenero/WhatsApp%20Image%202026-05-06%20at%209.10.40%20AM.jpeg',
]

export function InstagramFeed() {
  return (
    <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-cream">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-10">
          <p className="text-[11px] uppercase tracking-eyebrow text-champagne font-medium mb-3">
            Comunidad
          </p>
          <h2 className="font-display italic text-4xl md:text-5xl text-ink mb-3">
            Imagina te en Instagram
          </h2>
          <a
            href={CONTACT_INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-soft-black hover:text-champagne transition-colors"
          >
            <Instagram size={14} strokeWidth={1.5} />
            @lenceria_imaginate
          </a>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {FEED_IMAGES.map((src, i) => (
            <motion.a
              key={i}
              href={CONTACT_INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="relative aspect-square bg-warm-gray-100 overflow-hidden group"
            >
              <Image
                src={src}
                alt={`Post de Instagram ${i + 1}`}
                fill
                sizes="(max-width: 768px) 33vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/30 transition-colors flex items-center justify-center">
                <Instagram
                  size={20}
                  strokeWidth={1.5}
                  className="text-cream opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
