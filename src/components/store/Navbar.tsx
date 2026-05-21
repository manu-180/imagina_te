'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  ArrowUpRight,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Search,
  ShoppingBag,
  Sparkles,
  Truck,
  User,
  X,
} from 'lucide-react'
import { Logo } from './Logo'
import { useCartStore } from '@/lib/store/cart'
import { useCartAnimationStore } from '@/lib/store/cart-animation'
import { useWishlistStore } from '@/lib/store/wishlist'
import { cn } from '@/lib/utils'
import { Drawer } from '@/components/ui/Drawer'
import { SearchOverlay } from './SearchOverlay'
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_INSTAGRAM,
  CONTACT_PHONE,
  CONTACT_WHATSAPP_NUMBER,
  FREE_SHIPPING_THRESHOLD,
} from '@/lib/constants'
import { formatPriceARS } from '@/lib/utils'

interface NavLink {
  href: string
  label: string
  tag: string
  badge?: string
}

const NAV_LINKS: readonly NavLink[] = [
  { href: '/productos', label: 'Tienda', tag: 'Todo el catálogo' },
  { href: '/colecciones', label: 'Colecciones', tag: 'Selecciones curadas' },
  { href: '/productos?nuevos=1', label: 'Nuevos', tag: 'Recién llegados', badge: 'NEW' },
  { href: '/guia-talles', label: 'Guía de talles', tag: 'Encontrá tu calce' },
  { href: '/nosotros', label: 'Nosotros', tag: 'Quiénes somos' },
  { href: '/contacto', label: 'Contacto', tag: 'Estamos para vos' },
]

const QUICK_CATEGORIES: readonly { slug: string; label: string }[] = [
  { slug: 'corpinos', label: 'Corpiños' },
  { slug: 'conjuntos', label: 'Conjuntos' },
  { slug: 'bodysuits', label: 'Bodys' },
  { slug: 'ropa-de-dormir', label: 'Dormir' },
  { slug: 'lenceria-novia', label: 'Novia' },
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
  const [drawerSearch, setDrawerSearch] = useState('')
  const itemCount = useCartStore((s) => s.getItemCount())
  const openCart = useCartStore((s) => s.openDrawer)
  const wishlistCount = useWishlistStore((s) => s.productIds.length)
  const bagGlowCount = useCartAnimationStore((s) => s.bagGlowCount)
  const [bagKey, setBagKey] = useState(0)

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

  const closeMobile = () => setMobileOpen(false)

  const onSubmitDrawerSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = drawerSearch.trim()
    if (!q) return
    closeMobile()
    window.location.href = `/productos?q=${encodeURIComponent(q)}`
  }

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
          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 -ml-2"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>

          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.slice(0, 5).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[12px] uppercase tracking-eyebrow font-medium hover:text-champagne transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

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

      <Drawer
        open={mobileOpen}
        onClose={closeMobile}
        side="left"
        hideHeader
        className="bg-gradient-to-b from-ivory via-cream to-cream"
      >
        <MobileMenuContent
          onClose={closeMobile}
          wishlistCount={wishlistCount}
          itemCount={itemCount}
          drawerSearch={drawerSearch}
          setDrawerSearch={setDrawerSearch}
          onSubmitSearch={onSubmitDrawerSearch}
          onOpenCart={() => {
            closeMobile()
            openCart()
          }}
        />
      </Drawer>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}

interface MobileMenuContentProps {
  onClose: () => void
  wishlistCount: number
  itemCount: number
  drawerSearch: string
  setDrawerSearch: (v: string) => void
  onSubmitSearch: (e: React.FormEvent) => void
  onOpenCart: () => void
}

function MobileMenuContent({
  onClose,
  wishlistCount,
  itemCount,
  drawerSearch,
  setDrawerSearch,
  onSubmitSearch,
  onOpenCart,
}: MobileMenuContentProps) {
  return (
    <div className="relative min-h-full flex flex-col">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-champagne/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -left-32 w-72 h-72 rounded-full bg-rose/10 blur-3xl"
      />

      <div className="relative flex items-center justify-between px-6 pt-5 pb-4">
        <Link href="/" onClick={onClose} aria-label="Imagina te — Inicio">
          <Logo variant="horizontal" size="md" />
        </Link>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar menú"
          className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-ink/5 hover:bg-ink/10 text-ink transition-colors"
        >
          <X size={18} strokeWidth={1.6} />
        </button>
      </div>

      <div className="relative px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-champagne/60 to-transparent" />
      </div>

      <AnimatePresence>
        <motion.div
          key="mobile-menu-body"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.045, delayChildren: 0.05 },
            },
          }}
          className="relative flex-1 px-6 pt-6 pb-10 space-y-7"
        >
          <FadeItem>
            <form onSubmit={onSubmitSearch} className="relative">
              <Search
                size={16}
                strokeWidth={1.5}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-warm-gray-500"
              />
              <input
                type="search"
                value={drawerSearch}
                onChange={(e) => setDrawerSearch(e.target.value)}
                placeholder="Buscar corpiños, conjuntos…"
                className="w-full h-11 pl-10 pr-4 bg-cream border border-warm-gray-100 focus:border-champagne focus:outline-none text-sm placeholder:text-warm-gray-500 transition-colors"
              />
            </form>
          </FadeItem>

          <FadeItem>
            <SectionLabel>Categorías</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {QUICK_CATEGORIES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/productos?categoria=${c.slug}`}
                  onClick={onClose}
                  className="text-[12px] tracking-wide px-3 py-1.5 border border-warm-gray-100 bg-white/60 backdrop-blur-sm hover:border-champagne hover:text-champagne transition-colors text-ink"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </FadeItem>

          <FadeItem>
            <SectionLabel>Explorar</SectionLabel>
            <ul className="space-y-1">
              {NAV_LINKS.map((link, i) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="group relative flex items-center gap-4 py-3 border-b border-warm-gray-100/70"
                  >
                    <span className="text-[10px] tracking-eyebrow text-champagne font-medium w-6">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-display italic text-2xl text-ink leading-tight group-hover:text-champagne transition-colors">
                          {link.label}
                        </span>
                        {link.badge && (
                          <span className="inline-flex items-center gap-1 text-[9px] tracking-widest uppercase font-medium px-1.5 py-0.5 bg-burgundy text-cream">
                            <Sparkles size={8} strokeWidth={2} />
                            {link.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-warm-gray-500 mt-0.5">
                        {link.tag}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.4}
                      className="text-warm-gray-300 group-hover:text-champagne group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </FadeItem>

          <FadeItem>
            <SectionLabel>Tu espacio</SectionLabel>
            <div className="grid grid-cols-3 gap-2">
              <QuickActionLink
                href="/auth/login"
                onClick={onClose}
                icon={<User size={18} strokeWidth={1.4} />}
                label="Mi cuenta"
              />
              <QuickActionLink
                href="/productos?favoritos=1"
                onClick={onClose}
                icon={<Heart size={18} strokeWidth={1.4} />}
                label="Favoritos"
                badge={wishlistCount}
              />
              <QuickActionButton
                onClick={onOpenCart}
                icon={<ShoppingBag size={18} strokeWidth={1.4} />}
                label="Carrito"
                badge={itemCount}
              />
            </div>
          </FadeItem>

          <FadeItem>
            <div className="relative overflow-hidden rounded-sm bg-ink text-cream px-5 py-4 flex items-center gap-3">
              <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-champagne/15 to-transparent" />
              <Truck size={20} strokeWidth={1.4} className="text-champagne flex-shrink-0" />
              <div className="relative">
                <p className="text-[10px] uppercase tracking-eyebrow text-champagne font-medium">
                  Envío gratis
                </p>
                <p className="text-sm leading-tight mt-0.5">
                  En compras desde{' '}
                  <span className="font-medium">
                    {formatPriceARS(FREE_SHIPPING_THRESHOLD)}
                  </span>{' '}
                  a todo el país
                </p>
              </div>
            </div>
          </FadeItem>

          <FadeItem>
            <SectionLabel>Contacto</SectionLabel>
            <div className="space-y-3">
              <a
                href={`https://wa.me/${CONTACT_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="group flex items-center gap-3 px-4 h-12 bg-success text-cream hover:bg-success/90 transition-colors"
              >
                <MessageCircle size={18} strokeWidth={1.5} />
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-eyebrow opacity-80">
                    Chat directo
                  </p>
                  <p className="text-sm font-medium leading-none mt-0.5">
                    Escribinos por WhatsApp
                  </p>
                </div>
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.5}
                  className="opacity-80 group-hover:translate-x-0.5 transition-transform"
                />
              </a>
              <ContactRow
                icon={<Phone size={14} strokeWidth={1.5} />}
                label={CONTACT_PHONE}
                href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`}
              />
              <ContactRow
                icon={<Mail size={14} strokeWidth={1.5} />}
                label={CONTACT_EMAIL}
                href={`mailto:${CONTACT_EMAIL}`}
              />
              <ContactRow
                icon={<MapPin size={14} strokeWidth={1.5} />}
                label={CONTACT_ADDRESS}
              />
            </div>
          </FadeItem>

          <FadeItem>
            <SectionLabel>Seguinos</SectionLabel>
            <div className="flex items-center gap-3">
              <a
                href={CONTACT_INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group inline-flex items-center gap-2 px-3 h-10 border border-warm-gray-100 hover:border-champagne hover:text-champagne transition-colors text-ink"
              >
                <Instagram size={16} strokeWidth={1.5} />
                <span className="text-xs tracking-wide">@lenceria_imaginate</span>
              </a>
            </div>
          </FadeItem>

          <FadeItem>
            <div className="pt-2 border-t border-warm-gray-100/70">
              <p className="text-[10px] tracking-eyebrow uppercase text-warm-gray-500 mt-3">
                Imagina te — Renueva tu interior
              </p>
              <p className="text-[10px] text-warm-gray-500 mt-1">
                © {new Date().getFullYear()} · Hecho en Argentina
              </p>
            </div>
          </FadeItem>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] uppercase tracking-eyebrow text-warm-gray-500 font-medium mb-3">
      {children}
    </p>
  )
}

function FadeItem({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 14 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

interface QuickActionProps {
  icon: React.ReactNode
  label: string
  badge?: number
}

function QuickActionLink({
  href,
  onClick,
  icon,
  label,
  badge,
}: QuickActionProps & { href: string; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="relative flex flex-col items-center gap-1.5 py-3 bg-white/70 backdrop-blur-sm border border-warm-gray-100 hover:border-champagne hover:bg-white transition-colors"
    >
      <span className="text-ink">{icon}</span>
      <span className="text-[11px] tracking-wide text-ink">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 inline-flex items-center justify-center bg-champagne text-ink text-[9px] font-medium rounded-full">
          {badge}
        </span>
      )}
    </Link>
  )
}

function QuickActionButton({
  onClick,
  icon,
  label,
  badge,
}: QuickActionProps & { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex flex-col items-center gap-1.5 py-3 bg-white/70 backdrop-blur-sm border border-warm-gray-100 hover:border-champagne hover:bg-white transition-colors"
    >
      <span className="text-ink">{icon}</span>
      <span className="text-[11px] tracking-wide text-ink">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 inline-flex items-center justify-center bg-champagne text-ink text-[9px] font-medium rounded-full">
          {badge}
        </span>
      )}
    </button>
  )
}

function ContactRow({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode
  label: string
  href?: string
}) {
  const inner = (
    <div className="flex items-center gap-3 py-1">
      <span className="w-7 h-7 inline-flex items-center justify-center border border-warm-gray-100 text-warm-gray-500">
        {icon}
      </span>
      <span className="text-xs text-ink">{label}</span>
    </div>
  )
  if (href) {
    return (
      <a href={href} className="block hover:text-champagne transition-colors">
        {inner}
      </a>
    )
  }
  return inner
}
