'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BarChart3,
  ShoppingBag,
  Package,
  FolderTree,
  Sparkles,
  Boxes,
  Star,
  Settings,
  LogOut,
} from 'lucide-react'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { Logo } from '@/components/store/Logo'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: BarChart3, exact: true },
  { href: '/admin/productos', label: 'Productos', icon: Package },
  { href: '/admin/inventario', label: 'Inventario', icon: Boxes },
  { href: '/admin/categorias', label: 'Categorías', icon: FolderTree },
  { href: '/admin/colecciones', label: 'Colecciones', icon: Sparkles },
  { href: '/admin/ordenes', label: 'Órdenes', icon: ShoppingBag },
  { href: '/admin/reviews', label: 'Reviews', icon: Star },
  { href: '/admin/configuracion', label: 'Configuración', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function logout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    toast.success('Sesión cerrada')
    router.push('/auth/login')
    router.refresh()
  }

  return (
    <aside className="w-64 bg-ink text-cream flex flex-col flex-shrink-0 min-h-screen">
      <div className="p-6 border-b border-warm-gray-500/20">
        <Link href="/admin">
          <Logo
            variant="horizontal"
            size="md"
            textColor="#F5EFE7"
            heartColor="#C9A96E"
          />
        </Link>
        <p className="text-[10px] uppercase tracking-eyebrow text-champagne mt-2">
          Panel admin
        </p>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {NAV.map((item) => {
          const Icon = item.icon
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 text-sm transition-colors rounded-sm',
                isActive
                  ? 'bg-champagne/20 text-cream'
                  : 'text-warm-gray-300 hover:bg-noir hover:text-cream'
              )}
            >
              <Icon size={16} strokeWidth={1.5} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-3 border-t border-warm-gray-500/20 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 text-xs text-warm-gray-300 hover:text-cream transition-colors"
        >
          ← Ver la tienda
        </Link>
        <button
          type="button"
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 text-xs text-warm-gray-300 hover:text-error transition-colors"
        >
          <LogOut size={14} strokeWidth={1.5} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
