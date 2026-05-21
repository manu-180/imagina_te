import type { Product } from '@/types'
import { ProductCard } from './ProductCard'

interface RelatedProductsProps {
  products: Product[]
  title?: string
}

export function RelatedProducts({
  products,
  title = 'Completá tu look',
}: RelatedProductsProps) {
  if (products.length === 0) return null

  return (
    <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8 border-t border-warm-gray-100">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="font-display italic text-3xl md:text-4xl text-ink mb-8 text-center">
          {title}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
