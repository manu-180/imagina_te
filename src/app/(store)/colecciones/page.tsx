import Image from 'next/image'
import Link from 'next/link'
import { getAllCollections } from '@/lib/queries/collections'

export const metadata = {
  title: 'Colecciones',
  description: 'Explorá las colecciones curadas de Imagina te.',
}

export default async function ColeccionesPage() {
  const collections = await getAllCollections()

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <header className="mb-12 text-center">
        <p className="text-[11px] uppercase tracking-eyebrow text-champagne font-medium mb-3">
          Curaduría
        </p>
        <h1 className="font-display italic text-5xl md:text-6xl text-ink">
          Las colecciones
        </h1>
        <p className="text-sm text-warm-gray-500 mt-4 max-w-xl mx-auto">
          Cada colección cuenta una historia. Elegí la que conversa con tu momento.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
        {collections.map((c) => (
          <Link
            key={c.id}
            href={`/colecciones/${c.slug}`}
            className="group block"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-warm-gray-100">
              {(c.hero_image_url || c.image_url) && (
                <Image
                  src={c.hero_image_url || c.image_url!}
                  alt={c.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 text-cream">
                <p className="text-[11px] uppercase tracking-eyebrow text-champagne mb-2">
                  {c.season ?? 'Colección'}
                </p>
                <h2 className="font-display italic text-4xl md:text-5xl mb-3">
                  {c.name}
                </h2>
                {c.description && (
                  <p className="text-sm text-cream/85 max-w-md leading-relaxed line-clamp-2">
                    {c.description}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
