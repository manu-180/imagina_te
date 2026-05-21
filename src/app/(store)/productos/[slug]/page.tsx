import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductGallery } from '@/components/store/ProductGallery'
import { ProductInfo } from '@/components/store/ProductInfo'
import { ProductReviews } from '@/components/store/ProductReviews'
import { RelatedProducts } from '@/components/store/RelatedProducts'
import { getProductBySlug, getRelatedProducts } from '@/lib/queries/products'
import { getReviewsByProduct } from '@/lib/queries/reviews'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.slug)
  if (!product) return { title: 'Producto no encontrado' }
  return {
    title: product.name,
    description: product.short_description ?? product.description ?? undefined,
    openGraph: {
      title: product.name,
      description: product.short_description ?? '',
      images: product.images?.[0]?.url ? [{ url: product.images[0].url }] : [],
    },
  }
}

export default async function PDPPage({ params }: Props) {
  const product = await getProductBySlug(params.slug)
  if (!product) notFound()

  const [reviews, related] = await Promise.all([
    getReviewsByProduct(product.id),
    getRelatedProducts(product.id, product.collection_id ?? null, 4),
  ])

  return (
    <>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <nav className="text-xs text-warm-gray-500 mb-8 flex items-center gap-1.5">
          <a href="/" className="hover:text-ink transition-colors">Inicio</a>
          <span>/</span>
          <a href="/productos" className="hover:text-ink transition-colors">Tienda</a>
          {product.category && (
            <>
              <span>/</span>
              <a
                href={`/productos?categoria=${product.category.slug}`}
                className="hover:text-ink transition-colors"
              >
                {product.category.name}
              </a>
            </>
          )}
          <span>/</span>
          <span className="text-ink truncate">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-[1.4fr,1fr] gap-10 lg:gap-16">
          <ProductGallery images={product.images ?? []} productName={product.name} />
          <ProductInfo product={product} />
        </div>
      </div>

      <RelatedProducts products={related} title="Completá tu look" />

      <ProductReviews
        reviews={reviews}
        ratingAvg={product.rating_avg ?? 0}
        ratingCount={product.rating_count ?? 0}
      />
    </>
  )
}
