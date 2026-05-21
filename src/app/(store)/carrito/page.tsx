'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useCartStore } from '@/lib/store/cart'
import { formatPriceARS } from '@/lib/utils'
import { FREE_SHIPPING_THRESHOLD } from '@/lib/constants'

export default function CarritoPage() {
  const items = useCartStore((s) => s.items)
  const updateQty = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)
  const subtotal = useCartStore((s) => s.getSubtotal())
  const shippingEstimate = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 4500

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-4 text-center min-h-[60vh] flex flex-col justify-center">
        <p className="font-accent text-base tracking-eyebrow uppercase text-champagne mb-3">
          Tu bolsa
        </p>
        <h1 className="font-display italic text-5xl text-ink mb-4">
          Está vacía por ahora
        </h1>
        <p className="text-warm-gray-500 mb-8">
          Andá, mirá lo nuevo. Te enamorás de algo en menos de un minuto.
        </p>
        <Link href="/productos" className="inline-block self-center">
          <Button variant="primary" size="lg">
            Explorar la tienda
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <h1 className="font-display italic text-4xl md:text-5xl text-ink mb-10 text-center">
        Tu bolsa
      </h1>

      <div className="grid lg:grid-cols-[1fr,400px] gap-10">
        {/* Items */}
        <div className="space-y-4">
          {items.map((item, i) => (
            <motion.div
              key={item.variant.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="flex gap-4 lg:gap-6 p-4 lg:p-6 border border-warm-gray-100 bg-ivory"
            >
              <div className="relative w-24 lg:w-32 aspect-[3/4] flex-shrink-0 bg-warm-gray-100">
                {item.product.image_url && (
                  <Image
                    src={item.product.image_url}
                    alt={item.product.name}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <Link
                    href={`/productos/${item.product.slug}`}
                    className="font-display italic text-xl md:text-2xl text-ink hover:text-champagne transition-colors leading-tight"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-xs text-warm-gray-500 mt-1">
                    Talle {item.variant.size}{item.variant.cup ?? ''} · Color {item.variant.color}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="inline-flex items-center border border-warm-gray-300">
                    <button
                      type="button"
                      onClick={() => updateQty(item.variant.id, item.quantity - 1)}
                      className="w-8 h-8 inline-flex items-center justify-center hover:bg-warm-gray-100"
                      aria-label="Disminuir"
                    >
                      <Minus size={12} strokeWidth={1.5} />
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQty(item.variant.id, item.quantity + 1)}
                      className="w-8 h-8 inline-flex items-center justify-center hover:bg-warm-gray-100"
                      aria-label="Aumentar"
                    >
                      <Plus size={12} strokeWidth={1.5} />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-base font-medium text-ink">
                      {formatPriceARS(item.product.price * item.quantity)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(item.variant.id)}
                      aria-label="Eliminar"
                      className="text-warm-gray-500 hover:text-error transition-colors"
                    >
                      <Trash2 size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          <Link
            href="/productos"
            className="inline-block mt-4 text-sm text-soft-black hover:text-champagne underline-offset-4 hover:underline transition-colors"
          >
            ← Seguir mirando
          </Link>
        </div>

        {/* Resumen */}
        <aside className="lg:sticky lg:top-24 self-start">
          <div className="bg-cream border border-warm-gray-100 p-6 space-y-4">
            <h3 className="font-display italic text-xl text-ink">Resumen</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-soft-black">
                <span>Subtotal</span>
                <span>{formatPriceARS(subtotal)}</span>
              </div>
              <div className="flex justify-between text-soft-black">
                <span>Envío estimado</span>
                <span>
                  {shippingEstimate === 0 ? 'Gratis' : formatPriceARS(shippingEstimate)}
                </span>
              </div>
              {subtotal < FREE_SHIPPING_THRESHOLD && (
                <p className="text-xs text-warm-gray-500 pt-1">
                  Sumá {formatPriceARS(FREE_SHIPPING_THRESHOLD - subtotal)} para envío gratis.
                </p>
              )}
            </div>
            <div className="pt-4 border-t border-warm-gray-100 flex justify-between font-medium text-lg text-ink">
              <span>Total</span>
              <span>{formatPriceARS(subtotal + shippingEstimate)}</span>
            </div>
            <Link href="/checkout" className="block pt-2">
              <Button variant="primary" fullWidth size="lg" className="hover:bg-champagne hover:text-ink">
                Ir al checkout
              </Button>
            </Link>
            <div className="pt-3 space-y-2">
              <label className="block text-[11px] uppercase tracking-eyebrow text-soft-black/80 font-medium">
                ¿Tenés un código de descuento?
              </label>
              <div className="flex gap-2">
                <Input placeholder="Código" className="h-10" />
                <Button variant="ghost">Aplicar</Button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
