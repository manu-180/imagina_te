import { TopBar } from '@/components/admin/TopBar'
import { Badge } from '@/components/ui/Badge'
import { createClient } from '@/lib/supabase/server'
import { compareSizes } from '@/lib/utils'

interface VariantRow {
  id: string
  size: string
  cup: string | null
  color: string
  color_hex: string
  stock: number
  sku: string
  product: { id: string; name: string; slug: string } | null
}

export const dynamic = 'force-dynamic'

export default async function InventarioPage() {
  const supabase = createClient()
  const { data } = await supabase
    .from('lenceria_product_variants')
    .select(`
      id, size, cup, color, color_hex, stock, sku,
      product:lenceria_products(id, name, slug)
    `)
    .order('stock', { ascending: true })

  const rows = (data ?? []) as unknown as VariantRow[]
  const outOfStock = rows.filter((r) => r.stock === 0)
  const lowStock = rows.filter((r) => r.stock > 0 && r.stock < 3)

  return (
    <>
      <TopBar
        title="Inventario"
        description={`${rows.length} variantes · ${outOfStock.length} agotadas · ${lowStock.length} bajo stock`}
      />
      <div className="p-6 lg:p-10 space-y-8">
        {/* Bajo stock */}
        {(outOfStock.length > 0 || lowStock.length > 0) && (
          <section className="bg-burgundy/10 border border-burgundy/30 p-5">
            <h2 className="font-display italic text-2xl text-burgundy mb-3">
              Atención
            </h2>
            <p className="text-sm text-soft-black mb-4">
              Estas variantes están agotadas o con poco stock. Reponé pronto.
            </p>
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {[...outOfStock, ...lowStock].map((v) => (
                <div
                  key={v.id}
                  className="flex justify-between items-center bg-cream px-4 py-2.5 text-sm"
                >
                  <div>
                    <p className="font-medium text-ink">{v.product?.name}</p>
                    <p className="text-xs text-warm-gray-500">
                      {v.size}{v.cup ?? ''} · {v.color} · SKU {v.sku}
                    </p>
                  </div>
                  {v.stock === 0 ? (
                    <Badge variant="sale">Agotado</Badge>
                  ) : (
                    <Badge variant="default">Quedan {v.stock}</Badge>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Lista completa */}
        <section>
          <h2 className="font-display italic text-2xl text-ink mb-4">
            Todas las variantes
          </h2>
          <div className="overflow-x-auto bg-cream border border-warm-gray-100">
            <table className="w-full text-sm">
              <thead className="bg-ink text-cream">
                <tr>
                  <th className="text-left px-4 py-3 text-[11px] uppercase tracking-eyebrow">Producto</th>
                  <th className="text-left px-4 py-3 text-[11px] uppercase tracking-eyebrow">Talle</th>
                  <th className="text-left px-4 py-3 text-[11px] uppercase tracking-eyebrow">Color</th>
                  <th className="text-left px-4 py-3 text-[11px] uppercase tracking-eyebrow">SKU</th>
                  <th className="text-right px-4 py-3 text-[11px] uppercase tracking-eyebrow">Stock</th>
                </tr>
              </thead>
              <tbody>
                {[...rows].sort((a, b) => compareSizes(a.size, b.size)).map((r, i) => (
                  <tr
                    key={r.id}
                    className={i % 2 === 0 ? 'bg-cream' : 'bg-ivory'}
                  >
                    <td className="px-4 py-3 font-medium text-ink">
                      {r.product?.name ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-soft-black">
                      {r.size}{r.cup ?? ''}
                    </td>
                    <td className="px-4 py-3 text-soft-black">
                      <span className="inline-flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full border border-warm-gray-300"
                          style={{ backgroundColor: r.color_hex }}
                        />
                        {r.color}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-warm-gray-500 text-xs">{r.sku}</td>
                    <td className="px-4 py-3 text-right">
                      <span
                        className={
                          r.stock === 0
                            ? 'text-error font-medium'
                            : r.stock < 3
                              ? 'text-burgundy font-medium'
                              : 'text-ink'
                        }
                      >
                        {r.stock}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  )
}
