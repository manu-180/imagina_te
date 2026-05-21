'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { toast } from 'sonner'
import type { Product } from '@/types'
import { useCartStore } from '@/lib/store/cart'
import { useCartAnimationStore } from '@/lib/store/cart-animation'
import { useWishlistStore } from '@/lib/store/wishlist'
import { formatPriceARS, calculateDiscount, cn } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'

interface ProductCardProps {
  product: Product
  priority?: boolean
  showQuickAdd?: boolean
}

export function ProductCard({
  product,
  priority = false,
  showQuickAdd = true,
}: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const addItem = useCartStore((s) => s.addItem)
  const triggerFly = useCartAnimationStore((s) => s.triggerFly)
  const wishlistToggle = useWishlistStore((s) => s.toggle)
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id))

  const images = product.images ?? []
  const primary = images[0]?.url ?? '/placeholder.svg'
  const secondary = images[1]?.url

  const discount = calculateDiscount(product.price, product.compare_at_price)
  const totalStock = (product.variants ?? []).reduce(
    (sum, v) => sum + (v.stock ?? 0),
    0
  )
  const isSoldOut = totalStock === 0

  function handleQuickAdd(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    e.stopPropagation()
    if (isSoldOut) return
    const inStock = (product.variants ?? []).find((v) => v.stock > 0)
    if (!inStock) {
      toast.error('Sin stock')
      return
    }
    const rect = e.currentTarget.getBoundingClientRect()
    triggerFly(rect.left + rect.width / 2, rect.top + rect.height / 2)
    addItem({
      product: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        compare_at_price: product.compare_at_price,
        image_url: primary,
      },
      variant: {
        id: inStock.id,
        size: inStock.size,
        cup: inStock.cup,
        color: inStock.color,
        color_hex: inStock.color_hex,
        stock: inStock.stock,
        sku: inStock.sku,
      },
      quantity: 1,
    })
    toast.success(`${product.name} agregado al carrito`)
  }

  function handleWishlist(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    e.stopPropagation()
    wishlistToggle(product.id)
    toast.success(
      isInWishlist
        ? 'Sacado de favoritos'
        : 'Guardado en favoritos ♥'
    )
  }

  return (
    <Link
      href={`/productos/${product.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-warm-gray-100">
        {/* Imagen primaria */}
        <Image
          src={primary}
          alt={images[0]?.alt ?? product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={cn(
            'object-cover transition-all duration-700',
            hovered && secondary ? 'opacity-0' : 'opacity-100',
            'group-hover:scale-[1.03]'
          )}
        />
        {/* Imagen secundaria */}
        {secondary && (
          <Image
            src={secondary}
            alt={images[1]?.alt ?? product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={cn(
              'object-cover transition-opacity duration-700',
              hovered ? 'opacity-100' : 'opacity-0'
            )}
          />
        )}

        {/* Badges arriba izquierda */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.is_new && (
            <Badge variant="new" rotated>
              Nuevo
            </Badge>
          )}
          {discount > 0 && <Badge variant="sale">-{discount}%</Badge>}
          {product.is_bestseller && !product.is_new && (
            <Badge variant="bestseller">Bestseller</Badge>
          )}
        </div>

        {/* Wishlist arriba derecha */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={isInWishlist ? 'Sacar de favoritos' : 'Guardar en favoritos'}
          className={cn(
            'absolute top-3 right-3 w-9 h-9 z-10 inline-flex items-center justify-center',
            'bg-cream/85 backdrop-blur-sm hover:bg-cream transition-colors',
            'opacity-0 group-hover:opacity-100 sm:opacity-100'
          )}
        >
          <Heart
            size={16}
            strokeWidth={1.5}
            className={cn(
              'transition-colors',
              isInWishlist ? 'fill-burgundy text-burgundy' : 'text-ink'
            )}
          />
        </button>

        {/* Agotado */}
        {isSoldOut && (
          <div className="absolute inset-0 bg-cream/85 backdrop-blur-[2px] flex items-center justify-center z-20">
            <span className="text-[11px] uppercase tracking-eyebrow text-ink font-medium">
              Agotado
            </span>
          </div>
        )}

        {/* Quick add overlay */}
        {showQuickAdd && !isSoldOut && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-0 left-0 right-0 px-3 pb-3 z-10 pointer-events-none"
          >
            <button
              type="button"
              onClick={handleQuickAdd}
              className="w-full h-11 bg-ink text-cream text-[11px] uppercase tracking-eyebrow font-medium hover:bg-champagne hover:text-ink transition-colors pointer-events-auto"
            >
              Agregar rápido
            </button>
          </motion.div>
        )}
      </div>

      {/* Info */}
      <div className="pt-4 space-y-1">
        <h3 className="font-display italic text-lg text-ink leading-tight">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2">
          {product.compare_at_price && product.compare_at_price > product.price && (
            <span className="text-sm text-warm-gray-500 line-through">
              {formatPriceARS(product.compare_at_price)}
            </span>
          )}
          <span
            className={cn(
              'text-base font-medium',
              discount > 0 ? 'text-burgundy' : 'text-ink'
            )}
          >
            {formatPriceARS(product.price)}
          </span>
        </div>
        {/* Color swatches */}
        {(product.variants ?? []).length > 0 && (
          <div className="flex gap-1.5 pt-1">
            {Array.from(
              new Map(
                (product.variants ?? []).map((v) => [v.color, v.color_hex])
              ).entries()
            )
              .slice(0, 5)
              .map(([color, hex]) => (
                <span
                  key={color}
                  title={color}
                  className="w-3.5 h-3.5 rounded-full border border-warm-gray-300"
                  style={{ backgroundColor: hex }}
                />
              ))}
          </div>
        )}
      </div>
    </Link>
  )
}
