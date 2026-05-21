'use client'

import Link from 'next/link'
import { useMemo, useState, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { Heart, Minus, Plus, Ruler, Shield, Sparkles, Truck } from 'lucide-react'
import { toast } from 'sonner'
import type { Product, ProductVariant } from '@/types'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { StarRating } from '@/components/ui/StarRating'
import { Tabs } from '@/components/ui/Tabs'
import { useCartStore } from '@/lib/store/cart'
import { useCartAnimationStore } from '@/lib/store/cart-animation'
import { useWishlistStore } from '@/lib/store/wishlist'
import { calculateDiscount, cn, compareSizes, formatPriceARS } from '@/lib/utils'
import { FindMySize } from './FindMySize'

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const variants = product.variants ?? []
  const colors = useMemo(() => {
    const map = new Map<string, { name: string; hex: string }>()
    variants.forEach((v) => map.set(v.color, { name: v.color, hex: v.color_hex }))
    return Array.from(map.values())
  }, [variants])

  const [selectedColor, setSelectedColor] = useState<string | null>(
    colors[0]?.name ?? null
  )

  const sizes = useMemo(() => {
    return Array.from(
      new Set(
        variants
          .filter((v) => !selectedColor || v.color === selectedColor)
          .map((v) => `${v.size}${v.cup ?? ''}`)
      )
    ).sort(compareSizes)
  }, [variants, selectedColor])

  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [findMySizeOpen, setFindMySizeOpen] = useState(false)

  const selectedVariant: ProductVariant | undefined = useMemo(() => {
    return variants.find(
      (v) =>
        v.color === selectedColor &&
        `${v.size}${v.cup ?? ''}` === selectedSize
    )
  }, [variants, selectedColor, selectedSize])

  function getStockForSize(sizeLabel: string): number {
    const variant = variants.find(
      (v) =>
        v.color === selectedColor &&
        `${v.size}${v.cup ?? ''}` === sizeLabel
    )
    return variant?.stock ?? 0
  }

  const addItem = useCartStore((s) => s.addItem)
  const openCart = useCartStore((s) => s.openDrawer)
  const triggerFly = useCartAnimationStore((s) => s.triggerFly)
  const wishlistToggle = useWishlistStore((s) => s.toggle)
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id))

  const discount = calculateDiscount(product.price, product.compare_at_price)

  function handleAddToCart(e: MouseEvent<HTMLButtonElement>) {
    if (!selectedVariant) {
      toast.error('Elegí un talle primero')
      return
    }
    if (selectedVariant.stock === 0) {
      toast.error('Sin stock en este talle')
      return
    }
    const rect = e.currentTarget.getBoundingClientRect()
    triggerFly(rect.left + rect.width / 2, rect.top + rect.height / 2)
    const primaryImage = product.images?.[0]?.url ?? null
    addItem({
      product: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        compare_at_price: product.compare_at_price,
        image_url: primaryImage,
      },
      variant: {
        id: selectedVariant.id,
        size: selectedVariant.size,
        cup: selectedVariant.cup,
        color: selectedVariant.color,
        color_hex: selectedVariant.color_hex,
        stock: selectedVariant.stock,
        sku: selectedVariant.sku,
      },
      quantity,
    })
    toast.success(`${product.name} agregado a tu bolsa`, {
      action: {
        label: 'Ver bolsa',
        onClick: () => openCart(),
      },
    })
  }

  return (
    <div className="lg:sticky lg:top-24 space-y-6">
      {product.collection && (
        <Link
          href={`/colecciones/${product.collection.slug}`}
          className="inline-block text-[11px] uppercase tracking-eyebrow text-champagne hover:text-ink transition-colors"
        >
          Colección {product.collection.name}
        </Link>
      )}

      <h1 className="font-display italic text-3xl sm:text-4xl md:text-5xl leading-tight text-ink break-words">
        {product.name}
      </h1>

      <div className="flex items-center gap-4">
        <StarRating rating={product.rating_avg ?? 0} count={product.rating_count ?? 0} />
        {product.is_new && <Badge variant="new">Nuevo</Badge>}
        {product.is_bestseller && <Badge variant="bestseller">Bestseller</Badge>}
      </div>

      <div className="flex items-baseline gap-3">
        {product.compare_at_price && product.compare_at_price > product.price && (
          <span className="text-lg text-warm-gray-500 line-through">
            {formatPriceARS(product.compare_at_price)}
          </span>
        )}
        <span
          className={cn(
            'text-3xl font-medium',
            discount > 0 ? 'text-burgundy' : 'text-ink'
          )}
        >
          {formatPriceARS(product.price)}
        </span>
        {discount > 0 && <Badge variant="sale">-{discount}%</Badge>}
      </div>

      <p className="text-sm text-soft-black leading-relaxed">
        {product.short_description ?? product.description}
      </p>

      {/* Color */}
      {colors.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-eyebrow text-soft-black/80 font-medium">
              Color:
            </span>
            <span className="text-sm text-ink">{selectedColor}</span>
          </div>
          <div className="flex gap-2">
            {colors.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => {
                  setSelectedColor(c.name)
                  setSelectedSize(null)
                }}
                className={cn(
                  'relative w-9 h-9 rounded-full transition-transform hover:scale-110',
                  selectedColor === c.name &&
                    'ring-2 ring-ink ring-offset-2 ring-offset-cream'
                )}
                style={{ backgroundColor: c.hex }}
                aria-label={`Color ${c.name}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Talle */}
      {sizes.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-eyebrow text-soft-black/80 font-medium">
              Talle: {selectedSize && <span className="text-ink ml-1">{selectedSize}</span>}
            </span>
            <button
              type="button"
              onClick={() => setFindMySizeOpen(true)}
              className="text-xs text-champagne hover:text-ink underline-offset-2 hover:underline transition-colors flex items-center gap-1"
            >
              <Ruler size={12} strokeWidth={1.5} />
              ¿Cuál es tu talle?
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {sizes.map((sz) => {
              const stock = getStockForSize(sz)
              const isOut = stock === 0
              return (
                <button
                  key={sz}
                  type="button"
                  disabled={isOut}
                  onClick={() => setSelectedSize(sz)}
                  className={cn(
                    'min-w-[56px] h-11 px-3 border text-sm transition-all',
                    selectedSize === sz
                      ? 'bg-ink text-cream border-ink'
                      : 'border-warm-gray-300 hover:border-ink',
                    isOut &&
                      'opacity-40 line-through cursor-not-allowed hover:border-warm-gray-300'
                  )}
                >
                  {sz}
                </button>
              )
            })}
          </div>
          {selectedSize && selectedVariant?.stock !== undefined && selectedVariant.stock > 0 && selectedVariant.stock < 5 && (
            <p className="text-xs text-burgundy">
              ¡Quedan solo {selectedVariant.stock} en este talle!
            </p>
          )}
        </div>
      )}

      {/* Cantidad */}
      <div className="space-y-2">
        <span className="block text-[11px] uppercase tracking-eyebrow text-soft-black/80 font-medium">
          Cantidad
        </span>
        <div className="inline-flex items-center border border-warm-gray-300">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-11 h-11 inline-flex items-center justify-center hover:bg-warm-gray-100"
            aria-label="Disminuir"
          >
            <Minus size={14} strokeWidth={1.5} />
          </button>
          <span className="w-12 text-center text-sm">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="w-11 h-11 inline-flex items-center justify-center hover:bg-warm-gray-100"
            aria-label="Aumentar"
          >
            <Plus size={14} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* CTAs */}
      <motion.div whileTap={{ scale: 0.98 }} className="flex flex-col gap-3 pt-2">
        <Button
          size="lg"
          variant="primary"
          fullWidth
          onClick={handleAddToCart}
          disabled={!selectedVariant || selectedVariant.stock === 0}
          className="hover:bg-champagne hover:text-ink"
        >
          Agregar al carrito
        </Button>
        <button
          type="button"
          onClick={() => {
            wishlistToggle(product.id)
            toast.success(
              isInWishlist ? 'Sacado de favoritos' : 'Guardado en favoritos ♥'
            )
          }}
          className="inline-flex items-center justify-center h-12 gap-2 text-[12px] uppercase tracking-eyebrow font-medium text-ink hover:text-champagne transition-colors"
        >
          <Heart
            size={16}
            strokeWidth={1.5}
            className={cn(isInWishlist && 'fill-burgundy text-burgundy')}
          />
          {isInWishlist ? 'Guardado en favoritos' : 'Guardar en favoritos'}
        </button>
      </motion.div>

      {/* Trust strip */}
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-warm-gray-100">
        <div className="text-center">
          <Truck size={18} strokeWidth={1.5} className="mx-auto text-champagne mb-1" />
          <p className="text-[10px] uppercase tracking-eyebrow text-soft-black">Envío discreto</p>
        </div>
        <div className="text-center">
          <Sparkles size={18} strokeWidth={1.5} className="mx-auto text-champagne mb-1" />
          <p className="text-[10px] uppercase tracking-eyebrow text-soft-black">Cuotas s/interés</p>
        </div>
        <div className="text-center">
          <Shield size={18} strokeWidth={1.5} className="mx-auto text-champagne mb-1" />
          <p className="text-[10px] uppercase tracking-eyebrow text-soft-black">Cambios gratis</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        className="pt-4"
        tabs={[
          {
            id: 'description',
            label: 'Descripción',
            content: (
              <p className="text-sm text-soft-black leading-relaxed whitespace-pre-line">
                {product.description ?? 'Sin descripción.'}
              </p>
            ),
          },
          {
            id: 'composition',
            label: 'Composición y cuidado',
            content: (
              <div className="space-y-3 text-sm text-soft-black">
                {product.composition && (
                  <div>
                    <p className="font-medium text-ink mb-1">Composición</p>
                    <p className="leading-relaxed">{product.composition}</p>
                  </div>
                )}
                {product.care_instructions && (
                  <div>
                    <p className="font-medium text-ink mb-1">Cuidado</p>
                    <p className="leading-relaxed">{product.care_instructions}</p>
                  </div>
                )}
              </div>
            ),
          },
          {
            id: 'shipping',
            label: 'Envíos y cambios',
            content: (
              <div className="space-y-3 text-sm text-soft-black">
                <p><strong>Envíos a todo el país.</strong> Andreani y OCA. Envío gratis desde $35.000.</p>
                <p><strong>Packaging discreto.</strong> Tu compra viaja en caja neutra, sin nombre de la marca.</p>
                <p><strong>Cambios.</strong> 15 días para cambiar talle o color. Sin preguntas incómodas.</p>
              </div>
            ),
          },
        ]}
      />

      <FindMySize
        open={findMySizeOpen}
        onClose={() => setFindMySizeOpen(false)}
      />
    </div>
  )
}
