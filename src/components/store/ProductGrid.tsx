import type { Product } from '@/types'
import { ProductCard } from './ProductCard'
import { cn } from '@/lib/utils'

interface ProductGridProps {
  products: Product[]
  columns?: 2 | 3 | 4
  className?: string
  empty?: React.ReactNode
}

const columnsMap = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 md:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
}

export function ProductGrid({
  products,
  columns = 4,
  className,
  empty,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        {empty ?? (
          <div className="max-w-md mx-auto">
            <p className="font-display italic text-3xl text-ink mb-3">
              Nada por acá todavía
            </p>
            <p className="text-warm-gray-500">
              No encontramos productos con esos filtros. Probá con otros o mirá la colección completa.
            </p>
          </div>
        )}
      </div>
    )
  }
  return (
    <div className={cn('grid gap-6 lg:gap-8', columnsMap[columns], className)}>
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} priority={i < 4} />
      ))}
    </div>
  )
}
