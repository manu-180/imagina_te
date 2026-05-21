import Image from 'next/image'
import { TopBar } from '@/components/admin/TopBar'
import { getAllCategories } from '@/lib/queries/categories'

export const dynamic = 'force-dynamic'

export default async function CategoriasPage() {
  const categories = await getAllCategories()

  return (
    <>
      <TopBar
        title="Categorías"
        description={`${categories.length} categorías`}
      />
      <div className="p-6 lg:p-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((c) => (
            <div
              key={c.id}
              className="bg-cream border border-warm-gray-100 overflow-hidden"
            >
              <div className="relative aspect-[4/3] bg-warm-gray-100">
                {c.image_url && (
                  <Image
                    src={c.image_url}
                    alt={c.name}
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="p-4">
                <p className="font-display italic text-xl text-ink">{c.name}</p>
                <p className="text-xs text-warm-gray-500 mt-0.5">/{c.slug}</p>
                {c.description && (
                  <p className="text-xs text-soft-black mt-2 line-clamp-2">
                    {c.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-warm-gray-500 mt-6">
          Las categorías iniciales se cargan vía seed. Para esta demo, la edición
          completa de categorías se hace directo desde Supabase.
        </p>
      </div>
    </>
  )
}
