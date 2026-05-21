'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import type { Category, Collection } from '@/types'
import {
  FiltersTrigger,
  ProductFilters,
  ProductSort,
} from '@/components/store/ProductFilters'

interface ProductCatalogControlsProps {
  categories: Category[]
  collections: Collection[]
  sizes: string[]
  colors: { name: string; hex: string }[]
}

export function ProductCatalogControls({
  categories,
  collections,
  sizes,
  colors,
}: ProductCatalogControlsProps) {
  const [open, setOpen] = useState(false)
  const searchParams = useSearchParams()

  const activeFilters = [
    searchParams.get('categoria'),
    searchParams.get('coleccion'),
    searchParams.get('talle'),
    searchParams.get('color'),
    searchParams.get('nuevos') === '1' ? 'nuevos' : null,
    searchParams.get('sale') === '1' ? 'sale' : null,
  ].filter(Boolean).length

  return (
    <>
      <div className="flex justify-between items-center gap-4 border-y border-warm-gray-100 py-4">
        <FiltersTrigger onClick={() => setOpen(true)} count={activeFilters} />
        <ProductSort />
      </div>
      <ProductFilters
        categories={categories}
        collections={collections}
        sizes={sizes}
        colors={colors}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  )
}
