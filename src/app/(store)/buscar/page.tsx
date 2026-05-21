import { ProductGrid } from '@/components/store/ProductGrid'
import { getFilteredProducts } from '@/lib/queries/products'

export const metadata = {
  title: 'Buscar',
}

interface Props {
  searchParams: { q?: string }
}

export default async function BuscarPage({ searchParams }: Props) {
  const query = searchParams.q ?? ''
  const { products, total } = query
    ? await getFilteredProducts({ search: query, limit: 48 })
    : { products: [], total: 0 }

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <header className="mb-10 text-center">
        <p className="text-[11px] uppercase tracking-eyebrow text-champagne font-medium mb-3">
          Búsqueda
        </p>
        <h1 className="font-display italic text-5xl md:text-6xl text-ink">
          {query ? <>«{query}»</> : 'Buscar'}
        </h1>
        {query && (
          <p className="text-sm text-warm-gray-500 mt-3">
            {total} {total === 1 ? 'resultado' : 'resultados'}
          </p>
        )}
      </header>
      <ProductGrid
        products={products}
        empty={
          !query ? (
            <p className="text-warm-gray-500">Ingresá un término en la barra de búsqueda.</p>
          ) : undefined
        }
      />
    </div>
  )
}
