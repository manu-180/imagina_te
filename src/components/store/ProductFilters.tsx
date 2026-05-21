'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback, useState } from 'react'
import { X } from 'lucide-react'
import { Drawer } from '@/components/ui/Drawer'
import type { Category, Collection } from '@/types'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { cn } from '@/lib/utils'

interface ProductFiltersProps {
  categories: Category[]
  collections: Collection[]
  sizes: string[]
  colors: { name: string; hex: string }[]
  open: boolean
  onClose: () => void
}

export function ProductFilters({
  categories,
  collections,
  sizes,
  colors,
  open,
  onClose,
}: ProductFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function setParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString())
    if (value === null || value === '') params.delete(key)
    else params.set(key, value)
    params.delete('page')
    router.push(`${pathname}?${params.toString()}`)
  }

  const activeCategory = searchParams.get('categoria') ?? ''
  const activeCollection = searchParams.get('coleccion') ?? ''
  const activeSize = searchParams.get('talle') ?? ''
  const activeColor = searchParams.get('color') ?? ''
  const activeNuevos = searchParams.get('nuevos') === '1'
  const activeSale = searchParams.get('sale') === '1'

  function clearAll() {
    router.push(pathname)
    onClose()
  }

  return (
    <Drawer open={open} onClose={onClose} side="left" title="Filtros">
      <div className="px-6 py-4 space-y-7">
        {/* Categoría */}
        <div>
          <h3 className="text-[11px] uppercase tracking-eyebrow text-soft-black/80 font-medium mb-3">
            Categoría
          </h3>
          <div className="space-y-1.5">
            {categories.map((c) => (
              <label
                key={c.id}
                className={cn(
                  'flex items-center gap-2 text-sm cursor-pointer hover:text-champagne transition-colors',
                  activeCategory === c.slug ? 'text-ink font-medium' : 'text-soft-black'
                )}
              >
                <input
                  type="radio"
                  name="categoria"
                  value={c.slug}
                  checked={activeCategory === c.slug}
                  onChange={() => setParam('categoria', c.slug)}
                  className="accent-ink"
                />
                {c.name}
              </label>
            ))}
            {activeCategory && (
              <button
                type="button"
                onClick={() => setParam('categoria', null)}
                className="text-xs text-champagne mt-1"
              >
                Limpiar categoría
              </button>
            )}
          </div>
        </div>

        {/* Colección */}
        <div>
          <h3 className="text-[11px] uppercase tracking-eyebrow text-soft-black/80 font-medium mb-3">
            Colección
          </h3>
          <div className="space-y-1.5">
            {collections.map((c) => (
              <label
                key={c.id}
                className={cn(
                  'flex items-center gap-2 text-sm cursor-pointer hover:text-champagne transition-colors',
                  activeCollection === c.slug ? 'text-ink font-medium' : 'text-soft-black'
                )}
              >
                <input
                  type="radio"
                  name="coleccion"
                  value={c.slug}
                  checked={activeCollection === c.slug}
                  onChange={() => setParam('coleccion', c.slug)}
                  className="accent-ink"
                />
                {c.name}
              </label>
            ))}
            {activeCollection && (
              <button
                type="button"
                onClick={() => setParam('coleccion', null)}
                className="text-xs text-champagne mt-1"
              >
                Limpiar colección
              </button>
            )}
          </div>
        </div>

        {/* Talle */}
        {sizes.length > 0 && (
          <div>
            <h3 className="text-[11px] uppercase tracking-eyebrow text-soft-black/80 font-medium mb-3">
              Talle
            </h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setParam('talle', activeSize === s ? null : s)}
                  className={cn(
                    'min-w-[44px] h-9 px-3 border text-xs transition-colors',
                    activeSize === s
                      ? 'bg-ink text-cream border-ink'
                      : 'border-warm-gray-300 hover:border-ink'
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Color */}
        {colors.length > 0 && (
          <div>
            <h3 className="text-[11px] uppercase tracking-eyebrow text-soft-black/80 font-medium mb-3">
              Color
            </h3>
            <div className="flex flex-wrap gap-2">
              {colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  title={c.name}
                  onClick={() =>
                    setParam('color', activeColor === c.name ? null : c.name)
                  }
                  className={cn(
                    'w-8 h-8 rounded-full transition-transform hover:scale-110',
                    activeColor === c.name &&
                      'ring-2 ring-ink ring-offset-2 ring-offset-cream'
                  )}
                  style={{ backgroundColor: c.hex }}
                  aria-label={c.name}
                />
              ))}
            </div>
          </div>
        )}

        {/* Toggles */}
        <div className="space-y-2.5 pt-2 border-t border-warm-gray-100">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={activeNuevos}
              onChange={(e) => setParam('nuevos', e.target.checked ? '1' : null)}
              className="accent-ink"
            />
            Solo nuevos
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={activeSale}
              onChange={(e) => setParam('sale', e.target.checked ? '1' : null)}
              className="accent-ink"
            />
            En oferta
          </label>
        </div>

        <div className="flex gap-2 pt-4">
          <Button variant="ghost" onClick={clearAll}>
            <X size={14} strokeWidth={1.5} className="mr-1" />
            Limpiar
          </Button>
          <Button variant="primary" fullWidth onClick={onClose}>
            Aplicar
          </Button>
        </div>
      </div>
    </Drawer>
  )
}

export function ProductSort() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const sort = searchParams.get('sort') ?? 'newest'

  const setSort = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('sort', value)
      params.delete('page')
      router.push(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams]
  )

  return (
    <Select
      value={sort}
      onChange={(e) => setSort(e.target.value)}
      className="w-auto h-10 text-xs"
    >
      <option value="newest">Más nuevos</option>
      <option value="price-asc">Precio: menor a mayor</option>
      <option value="price-desc">Precio: mayor a menor</option>
      <option value="bestselling">Más vendidos</option>
      <option value="rating">Mejor calificados</option>
    </Select>
  )
}

export function FiltersTrigger({ onClick, count }: { onClick: () => void; count: number }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="inline-flex items-center gap-2 h-10 px-4 border border-ink text-xs uppercase tracking-eyebrow font-medium hover:bg-ink hover:text-cream transition-colors"
    >
      Filtros
      {count > 0 && (
        <span
          className={cn(
            'inline-flex items-center justify-center w-5 h-5 text-[10px]',
            hover ? 'bg-cream text-ink' : 'bg-ink text-cream'
          )}
        >
          {count}
        </span>
      )}
    </button>
  )
}
