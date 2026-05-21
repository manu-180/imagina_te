import { formatPriceARS } from '@/lib/utils'

interface TopProductsProps {
  products: { id: string; name: string; quantity: number; revenue: number }[]
}

export function TopProducts({ products }: TopProductsProps) {
  return (
    <div className="bg-cream border border-warm-gray-100 p-6">
      <h3 className="font-display italic text-xl text-ink mb-1">
        Top 5 productos
      </h3>
      <p className="text-xs text-warm-gray-500 mb-5">
        Por cantidad vendida
      </p>
      {products.length === 0 ? (
        <p className="text-sm text-warm-gray-500">
          Todavía sin ventas registradas.
        </p>
      ) : (
        <ul className="space-y-3">
          {products.map((p, i) => (
            <li key={p.id} className="flex items-center gap-3">
              <span className="font-display italic text-2xl text-champagne w-6">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ink truncate">{p.name}</p>
                <p className="text-xs text-warm-gray-500">
                  {p.quantity} unidades · {formatPriceARS(p.revenue)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
