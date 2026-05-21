'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Drawer } from '@/components/ui/Drawer'
import { Button } from '@/components/ui/Button'
import { useCartStore } from '@/lib/store/cart'
import { formatPriceARS } from '@/lib/utils'
import { FREE_SHIPPING_THRESHOLD } from '@/lib/constants'

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isDrawerOpen)
  const close = useCartStore((s) => s.closeDrawer)
  const items = useCartStore((s) => s.items)
  const updateQty = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)
  const subtotal = useCartStore((s) => s.getSubtotal())

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  )

  return (
    <Drawer open={isOpen} onClose={close} title="Tu bolsa ♥" side="right">
      <div className="flex flex-col h-full">
        {items.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="font-display italic text-2xl text-ink mb-2">
              Tu bolsa está vacía
            </p>
            <p className="text-sm text-warm-gray-500 mb-6">
              Empezá a explorar la colección y guardá lo que te enamora.
            </p>
            <Button variant="primary" fullWidth onClick={close}>
              <Link href="/productos" className="block w-full">
                Explorar la tienda
              </Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Progress envío gratis */}
            <div className="px-6 py-4 border-b border-warm-gray-100 bg-ivory">
              {remainingForFreeShipping > 0 ? (
                <p className="text-xs text-soft-black mb-2">
                  Te faltan <strong>{formatPriceARS(remainingForFreeShipping)}</strong> para el envío gratis
                </p>
              ) : (
                <p className="text-xs text-success font-medium mb-2">
                  ¡Tenés envío gratis ♥
                </p>
              )}
              <div className="h-1 bg-warm-gray-100 overflow-hidden">
                <div
                  className="h-full bg-champagne transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto divide-y divide-warm-gray-100">
              {items.map((item) => (
                <div key={item.variant.id} className="px-6 py-4 flex gap-4">
                  <div className="w-20 h-24 relative flex-shrink-0 bg-warm-gray-100">
                    {item.product.image_url && (
                      <Image
                        src={item.product.image_url}
                        alt={item.product.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/productos/${item.product.slug}`}
                      onClick={close}
                      className="font-display italic text-base text-ink hover:text-champagne transition-colors block leading-tight"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-warm-gray-500 mt-0.5">
                      {item.variant.size}
                      {item.variant.cup ? item.variant.cup : ''} · {item.variant.color}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-center border border-warm-gray-300">
                        <button
                          type="button"
                          onClick={() =>
                            updateQty(item.variant.id, item.quantity - 1)
                          }
                          className="w-7 h-7 inline-flex items-center justify-center hover:bg-warm-gray-100"
                          aria-label="Disminuir"
                        >
                          <Minus size={12} strokeWidth={1.5} />
                        </button>
                        <span className="w-7 text-center text-sm">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQty(item.variant.id, item.quantity + 1)
                          }
                          className="w-7 h-7 inline-flex items-center justify-center hover:bg-warm-gray-100"
                          aria-label="Aumentar"
                        >
                          <Plus size={12} strokeWidth={1.5} />
                        </button>
                      </div>
                      <span className="text-sm font-medium">
                        {formatPriceARS(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.variant.id)}
                    className="self-start p-1 text-warm-gray-500 hover:text-error transition-colors"
                    aria-label="Eliminar"
                  >
                    <Trash2 size={14} strokeWidth={1.5} />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-5 border-t border-warm-gray-100 bg-cream space-y-3">
              <div className="flex justify-between font-medium">
                <span>Subtotal</span>
                <span>{formatPriceARS(subtotal)}</span>
              </div>
              <p className="text-xs text-warm-gray-500">
                Envío e impuestos se calculan en el checkout
              </p>
              <div className="space-y-2">
                <Link href="/checkout" onClick={close} className="block">
                  <Button variant="primary" fullWidth>
                    Ir al checkout
                  </Button>
                </Link>
                <Link href="/carrito" onClick={close} className="block">
                  <Button variant="ghost" fullWidth>
                    Ver el carrito
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </Drawer>
  )
}
