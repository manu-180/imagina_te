import { getAllSizeGuideEntries } from '@/lib/queries/size-guide'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export const metadata = {
  title: 'Guía de talles',
  description: 'Encontrá tu talle ideal con nuestra guía completa.',
}

export default async function GuiaTallesPage() {
  const entries = await getAllSizeGuideEntries()

  const byCategory = entries.reduce(
    (acc, e) => {
      if (!acc[e.category]) acc[e.category] = []
      acc[e.category].push(e)
      return acc
    },
    {} as Record<string, typeof entries>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <header className="text-center mb-12">
        <p className="text-[11px] uppercase tracking-eyebrow text-champagne font-medium mb-3">
          Cómo te queda
        </p>
        <h1 className="font-display italic text-5xl md:text-6xl text-ink mb-4">
          Guía de talles
        </h1>
        <p className="text-warm-gray-500 max-w-xl mx-auto">
          Conocer tu talle es el primer paso para sentirte cómoda. Si tenés dudas, escribinos por WhatsApp y te asesoramos.
        </p>
      </header>

      {/* Cómo medirte */}
      <section className="bg-ivory border border-warm-gray-100 p-6 lg:p-10 mb-12">
        <h2 className="font-display italic text-3xl text-ink mb-6">
          Cómo medirte
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-sm text-soft-black">
          <div>
            <p className="font-medium text-ink mb-2">1. Bajo busto</p>
            <p className="leading-relaxed">
              Pasá el centímetro justo debajo del pecho, donde apoya el corpiño. Mantenelo paralelo al piso.
            </p>
          </div>
          <div>
            <p className="font-medium text-ink mb-2">2. Busto</p>
            <p className="leading-relaxed">
              Sobre la parte más prominente del pecho, sin apretar. El centímetro tiene que estar relajado.
            </p>
          </div>
          <div>
            <p className="font-medium text-ink mb-2">3. Cadera</p>
            <p className="leading-relaxed">
              Sobre la parte más amplia de la cadera, parada con los pies juntos.
            </p>
          </div>
        </div>
      </section>

      {/* Tablas por categoría */}
      {Object.entries(byCategory).map(([cat, rows]) => (
        <section key={cat} className="mb-10">
          <h2 className="font-display italic text-3xl text-ink mb-4 capitalize">
            Talles de {cat}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-ink text-cream">
                <tr>
                  <th className="text-left px-4 py-3 text-[11px] uppercase tracking-eyebrow font-medium">
                    Talle
                  </th>
                  {cat === 'corpiño' ? (
                    <>
                      <th className="text-left px-4 py-3 text-[11px] uppercase tracking-eyebrow font-medium">
                        Bajo busto (cm)
                      </th>
                      <th className="text-left px-4 py-3 text-[11px] uppercase tracking-eyebrow font-medium">
                        Busto (cm)
                      </th>
                      <th className="text-left px-4 py-3 text-[11px] uppercase tracking-eyebrow font-medium">
                        Copa
                      </th>
                    </>
                  ) : (
                    <>
                      <th className="text-left px-4 py-3 text-[11px] uppercase tracking-eyebrow font-medium">
                        Cadera (cm)
                      </th>
                      <th className="text-left px-4 py-3 text-[11px] uppercase tracking-eyebrow font-medium">
                        Notas
                      </th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr
                    key={r.id}
                    className={i % 2 === 0 ? 'bg-cream' : 'bg-ivory'}
                  >
                    <td className="px-4 py-3 font-medium text-ink">{r.size_label}</td>
                    {cat === 'corpiño' ? (
                      <>
                        <td className="px-4 py-3 text-soft-black">
                          {r.underbust_cm_min}-{r.underbust_cm_max}
                        </td>
                        <td className="px-4 py-3 text-soft-black">
                          {r.bust_cm_min}-{r.bust_cm_max}
                        </td>
                        <td className="px-4 py-3 text-soft-black">{r.cup}</td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-3 text-soft-black">
                          {r.hip_cm_min}-{r.hip_cm_max}
                        </td>
                        <td className="px-4 py-3 text-warm-gray-500 text-xs">
                          {r.notes}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      <div className="mt-12 text-center bg-blush/40 p-8 border border-rose/30">
        <p className="font-display italic text-2xl text-ink mb-3">
          ¿Seguís con dudas?
        </p>
        <p className="text-soft-black max-w-md mx-auto mb-6">
          Escribinos por WhatsApp y te ayudamos a elegir el talle perfecto.
        </p>
        <Link href="https://wa.me/5491161755668" target="_blank" rel="noopener noreferrer">
          <Button variant="primary">Hablar por WhatsApp</Button>
        </Link>
      </div>
    </div>
  )
}
