import Image from 'next/image'
import { TopBar } from '@/components/admin/TopBar'
import { Badge } from '@/components/ui/Badge'
import { getAllCollections } from '@/lib/queries/collections'

export const dynamic = 'force-dynamic'

export default async function ColeccionesAdminPage() {
  const collections = await getAllCollections()

  return (
    <>
      <TopBar
        title="Colecciones"
        description={`${collections.length} colecciones activas`}
      />
      <div className="p-6 lg:p-10">
        <div className="grid md:grid-cols-2 gap-6">
          {collections.map((c) => (
            <div
              key={c.id}
              className="bg-cream border border-warm-gray-100 overflow-hidden flex flex-col md:flex-row"
            >
              <div className="relative aspect-[4/3] md:w-48 flex-shrink-0 bg-warm-gray-100">
                {c.image_url && (
                  <Image
                    src={c.image_url}
                    alt={c.name}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="p-5 flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <p className="font-display italic text-2xl text-ink">{c.name}</p>
                  {c.is_active && <Badge variant="success">Activa</Badge>}
                </div>
                {c.season && (
                  <p className="text-[11px] uppercase tracking-eyebrow text-champagne mb-2">
                    {c.season}
                  </p>
                )}
                {c.description && (
                  <p className="text-sm text-soft-black leading-relaxed line-clamp-3">
                    {c.description}
                  </p>
                )}
                <p className="text-xs text-warm-gray-500 mt-3">/{c.slug}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
