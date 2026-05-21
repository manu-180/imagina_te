import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ProductGrid } from '@/components/store/ProductGrid'
import { getCollectionBySlug } from '@/lib/queries/collections'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props) {
  const data = await getCollectionBySlug(params.slug)
  if (!data) return { title: 'Colección no encontrada' }
  return {
    title: data.collection.name,
    description: data.collection.description ?? undefined,
  }
}

export default async function CollectionPage({ params }: Props) {
  const data = await getCollectionBySlug(params.slug)
  if (!data) notFound()
  const { collection, products } = data

  return (
    <>
      <section className="relative h-[60vh] min-h-[440px] overflow-hidden bg-ink">
        {(collection.hero_image_url || collection.image_url) && (
          <Image
            src={collection.hero_image_url || collection.image_url!}
            alt={collection.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 to-ink/80" />
        <div className="relative h-full flex flex-col items-center justify-center text-center text-cream px-6">
          <p className="text-[11px] uppercase tracking-eyebrow text-champagne mb-4">
            {collection.season ?? 'Colección'}
          </p>
          <h1 className="font-display italic text-6xl md:text-7xl mb-6">
            {collection.name}
          </h1>
          {collection.description && (
            <p className="max-w-xl text-base lg:text-lg leading-relaxed text-cream/90">
              {collection.description}
            </p>
          )}
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <ProductGrid products={products} columns={4} />
      </div>
    </>
  )
}
