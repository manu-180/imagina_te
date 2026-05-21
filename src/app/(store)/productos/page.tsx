import { Suspense } from 'react'
import { ProductGrid } from '@/components/store/ProductGrid'
import { ProductCatalogControls } from './ProductCatalogControls'
import {
  getFilteredProducts,
  getAvailableSizes,
  getAvailableColors,
  type ProductsFilter,
} from '@/lib/queries/products'
import { getAllCategories } from '@/lib/queries/categories'
import { getAllCollections } from '@/lib/queries/collections'

export const metadata = {
  title: 'Tienda',
  description: 'Explorá toda la colección Imagina te.',
}

type Sort = 'newest' | 'price-asc' | 'price-desc' | 'bestselling' | 'rating'

interface PageProps {
  searchParams: {
    categoria?: string
    coleccion?: string
    talle?: string
    color?: string
    nuevos?: string
    sale?: string
    sort?: Sort
    q?: string
    page?: string
  }
}

export default async function ProductosPage({ searchParams }: PageProps) {
  const page = Math.max(1, parseInt(searchParams.page ?? '1', 10))
  const limit = 24
  const offset = (page - 1) * limit

  const filter: ProductsFilter = {
    category: searchParams.categoria,
    collection: searchParams.coleccion,
    size: searchParams.talle,
    color: searchParams.color,
    isNew: searchParams.nuevos === '1',
    onSale: searchParams.sale === '1',
    search: searchParams.q,
    sort: searchParams.sort ?? 'newest',
    limit,
    offset,
  }

  const [{ products, total }, categories, collections, sizes, colors] =
    await Promise.all([
      getFilteredProducts(filter),
      getAllCategories(),
      getAllCollections(),
      getAvailableSizes(),
      getAvailableColors(),
    ])

  const totalPages = Math.max(1, Math.ceil(total / limit))

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <header className="mb-10 text-center">
        <p className="text-[11px] uppercase tracking-eyebrow text-champagne font-medium mb-3">
          La tienda
        </p>
        <h1 className="font-display italic text-5xl md:text-6xl text-ink">
          {searchParams.categoria
            ? categories.find((c) => c.slug === searchParams.categoria)?.name
            : searchParams.coleccion
              ? `Colección ${collections.find((c) => c.slug === searchParams.coleccion)?.name}`
              : 'Todos los productos'}
        </h1>
        <p className="text-sm text-warm-gray-500 mt-3">
          {total} {total === 1 ? 'producto' : 'productos'}
        </p>
      </header>

      <Suspense fallback={null}>
        <ProductCatalogControls
          categories={categories}
          collections={collections}
          sizes={sizes}
          colors={colors}
        />
      </Suspense>

      <div className="mt-10">
        <ProductGrid products={products} columns={4} />
      </div>

      {totalPages > 1 && (
        <nav className="mt-12 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => {
            const p = i + 1
            const params = new URLSearchParams()
            Object.entries(searchParams).forEach(([k, v]) => {
              if (v) params.set(k, v as string)
            })
            params.set('page', String(p))
            const isCurrent = p === page
            return (
              <a
                key={p}
                href={`/productos?${params.toString()}`}
                className={
                  isCurrent
                    ? 'w-10 h-10 inline-flex items-center justify-center bg-ink text-cream text-sm'
                    : 'w-10 h-10 inline-flex items-center justify-center border border-warm-gray-300 text-sm hover:border-ink'
                }
              >
                {p}
              </a>
            )
          })}
        </nav>
      )}
    </div>
  )
}
