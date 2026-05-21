import Link from 'next/link'
import { Plus, Edit3, Eye } from 'lucide-react'
import { TopBar } from '@/components/admin/TopBar'
import { DataTable, type Column } from '@/components/admin/DataTable'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { getAllProducts } from '@/lib/queries/products'
import { formatPriceARS } from '@/lib/utils'
import { createClient } from '@/lib/supabase/server'
import type { Product } from '@/types'

export const dynamic = 'force-dynamic'

export default async function AdminProductosPage() {
  // Usar query con todos los productos (no solo active)
  const supabase = createClient()
  const { data } = await supabase
    .from('lenceria_products')
    .select(`
      *,
      images:lenceria_product_images(*),
      variants:lenceria_product_variants(*),
      category:lenceria_categories(name, slug)
    `)
    .order('created_at', { ascending: false })

  const products = (data ?? []) as Product[]

  const columns: Column<Product>[] = [
    {
      key: 'name',
      header: 'Producto',
      render: (p) => (
        <div>
          <p className="font-medium text-ink">{p.name}</p>
          <p className="text-xs text-warm-gray-500">/{p.slug}</p>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Categoría',
      render: (p) => (
        <span className="text-soft-black">{p.category?.name ?? '—'}</span>
      ),
    },
    {
      key: 'price',
      header: 'Precio',
      render: (p) => <span className="font-medium">{formatPriceARS(p.price)}</span>,
    },
    {
      key: 'stock',
      header: 'Stock total',
      render: (p) => {
        const total = (p.variants ?? []).reduce((s, v) => s + v.stock, 0)
        return (
          <span className={total === 0 ? 'text-error font-medium' : 'text-soft-black'}>
            {total}
          </span>
        )
      },
    },
    {
      key: 'status',
      header: 'Estado',
      render: (p) => {
        if (p.status === 'active') return <Badge variant="success">Activo</Badge>
        if (p.status === 'draft') return <Badge variant="default">Borrador</Badge>
        return <Badge variant="soldout">Archivado</Badge>
      },
    },
    {
      key: 'actions',
      header: '',
      className: 'text-right',
      render: (p) => (
        <div className="flex justify-end gap-2">
          <Link
            href={`/productos/${p.slug}`}
            target="_blank"
            className="p-1.5 text-warm-gray-500 hover:text-champagne transition-colors"
            aria-label="Ver"
          >
            <Eye size={14} strokeWidth={1.5} />
          </Link>
          <Link
            href={`/admin/productos/${p.id}`}
            className="p-1.5 text-warm-gray-500 hover:text-ink transition-colors"
            aria-label="Editar"
          >
            <Edit3 size={14} strokeWidth={1.5} />
          </Link>
        </div>
      ),
    },
  ]

  return (
    <>
      <TopBar
        title="Productos"
        description={`${products.length} productos en total`}
        action={
          <Link href="/admin/productos/nuevo">
            <Button variant="primary">
              <Plus size={14} strokeWidth={1.5} className="mr-1.5" />
              Nuevo producto
            </Button>
          </Link>
        }
      />
      <div className="p-6 lg:p-10">
        <DataTable
          data={products}
          columns={columns}
          emptyMessage="No hay productos todavía. Empezá creando uno."
        />
      </div>
    </>
  )
}
