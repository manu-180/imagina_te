'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { Logo } from './Logo'
import { useCartStore } from '@/lib/store/cart'
import { useCartAnimationStore } from '@/lib/store/cart-animation'
import { useWishlistStore } from '@/lib/store/wishlist'
import { cn } from '@/lib/utils'
import { Drawer } from '@/components/ui/Drawer'
import { SearchOverlay } from './SearchOverlay'

const NAV_LINKS = [
  { href: '/productos', label: 'Tienda' },
  { href: '/colecciones', label: 'Colecciones' },
  { href: '/productos?nuevos=1', label: 'Nuevos' },
  { href: '/guia-talles', label: 'Guía de talles' },
  { href: '/nosotros', label: 'Nosotros' },
]

interface NavbarProps {
  /** Si true, arranca transparente sobre hero oscuro */
  transparentOnTop?: boolean
}

export function Navbar({ transparentOnTop = false }: NavbarProps) {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const itemCount = useCartStore((s) => s.getItemCount())
  const openCart = useCartStore((s) => s.openDrawer)
  const wishlistCount = useWishlistStore((s) => s.productIds.length)
  const bagGlowCount = useCartAnimationStore((s) => s.bagGlowCount)
  const [bagKey, setBagKey] = useState(0)

  // Backdrop sólido on scroll
  const bgOpacity = useTransform(scrollY, [0, 80], [transparentOnTop ? 0 : 1, 1])
  const shadowOpacity = useTransform(scrollY, [0, 80], [0, 0.1])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (bagGlowCount === 0) return
    setBagKey((k) => k + 1)
  }, [bagGlowCount])

  const transparent = transparentOnTop && !scrolled
  const textClass = transparent ? 'text-cream' : 'text-ink'

  return (
    <>
      <motion.header
        className={cn(
          'sticky top-0 z-50 w-full transition-colors duration-300',
          transparent ? 'bg-transparent' : 'bg-cream/95 backdrop-blur-md'
        )}
        style={{
          boxShadow: useTransform(
            shadowOpacity,
            (o) => `0 1px 12px rgba(14, 11, 10, ${o})`
          ) as unknown as string,
        }}
      >
        <motion.div
          className="absolute inset-0 bg-cream"
          style={{ opacity: bgOpacity }}
        />
        <nav
          className={cn(
            'relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-20 flex items-center justify-between',
            textClass
          )}
        >
          {/* Mobile menu button */}
          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 -ml-2"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>

          {/* Desktop nav links izquierda */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[12px] uppercase tracking-eyebrow font-medium hover:text-champagne transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Logo centrado */}
          <Link
            href="/"
            aria-label="Imagina te — Inicio"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Logo
              variant="horizontal"
              size="md"
              textColor={transparent ? '#F5EFE7' : '#0E0B0A'}
              heartColor="#C9A96E"
            />
          </Link>

          {/* Acciones derecha */}
          <div className="flex items-center gap-1 lg:gap-2">
            <button
              type="button"
              aria-label="Buscar"
              onClick={() => setSearchOpen(true)}
              className="p-2 hover:text-champagne transition-colors"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>
            <Link
              href="/auth/login"
              aria-label="Cuenta"
              className="hidden sm:inline-flex p-2 hover:text-champagne transition-colors"
            >
              <User size={20} strokeWidth={1.5} />
            </Link>
            <Link
              href="/productos?favoritos=1"
              aria-label="Favoritos"
              className="hidden sm:inline-flex relative p-2 hover:text-champagne transition-colors"
            >
              <Heart size={20} strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-champagne text-ink text-[9px] font-medium rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              data-cart-bag
              aria-label="Carrito"
              onClick={openCart}
              className="relative p-2 hover:text-champagne transition-colors"
            >
              <motion.span
                key={bagKey}
                animate={bagKey > 0 ? { scale: [1, 1.22, 1] } : {}}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
              </motion.span>
              {itemCount > 0 && (
                <motion.span
                  key={`badge-${bagKey}`}
                  animate={bagKey > 0 ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.5 }}
                  className="absolute top-1 right-1 bg-champagne text-ink text-[9px] font-medium rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)} side="left">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center mb-6">
            <Logo variant="horizontal" size="md" />
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1"
              aria-label="Cerrar"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>
          <nav className="space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 font-display italic text-2xl text-ink hover:text-champagne transition-colors border-b border-warm-gray-100"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contacto"
              onClick={() => setMobileOpen(false)}
              className="block py-3 font-display italic text-2xl text-ink hover:text-champagne transition-colors border-b border-warm-gray-100"
            >
              Contacto
            </Link>
          </nav>
          <div className="mt-8 space-y-3">
            <Link
              href="/auth/login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 py-2 text-sm text-ink"
            >
              <User size={18} strokeWidth={1.5} />
              Mi cuenta
            </Link>
            <Link
              href="/productos?favoritos=1"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 py-2 text-sm text-ink"
            >
              <Heart size={18} strokeWidth={1.5} />
              Favoritos ({wishlistCount})
            </Link>
          </div>
        </div>
      </Drawer>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
