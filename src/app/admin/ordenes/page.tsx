import Link from 'next/link'
import { Eye } from 'lucide-react'
import { TopBar } from '@/components/admin/TopBar'
import { DataTable, type Column } from '@/components/admin/DataTable'
import { Badge } from '@/components/ui/Badge'
import { getAllOrders } from '@/lib/queries/orders'
import { formatPriceARS, formatDateTime } from '@/lib/utils'
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from '@/lib/constants'
import type { Order } from '@/types'

export const dynamic = 'force-dynamic'

export default async function AdminOrdenesPage() {
  const orders = await getAllOrders()

  const columns: Column<Order>[] = [
    {
      key: 'order_number',
      header: 'Nº',
      render: (o) => (
        <Link
          href={`/admin/ordenes/${o.id}`}
          className="font-medium text-ink hover:text-champagne transition-colors"
        >
          {o.order_number}
        </Link>
      ),
    },
    {
      key: 'customer',
      header: 'Cliente',
      render: (o) => (
        <div>
          <p className="text-ink">{o.customer_name}</p>
          <p className="text-xs text-warm-gray-500">{o.customer_email}</p>
        </div>
      ),
    },
    {
      key: 'total',
      header: 'Total',
      render: (o) => <span className="font-medium">{formatPriceARS(o.total)}</span>,
    },
    {
      key: 'status',
      header: 'Estado',
      render: (o) => (
        <span
          className={`inline-block px-2 py-0.5 text-[10px] uppercase tracking-eyebrow ${
            ORDER_STATUS_COLORS[o.status] ?? 'bg-warm-gray-100 text-ink'
          }`}
        >
          {ORDER_STATUS_LABELS[o.status] ?? o.status}
        </span>
      ),
    },
    {
      key: 'created_at',
      header: 'Fecha',
      render: (o) => (
        <span className="text-xs text-warm-gray-500">
          {formatDateTime(o.created_at)}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (o) => (
        <Link
          href={`/admin/ordenes/${o.id}`}
          className="inline-flex items-center text-warm-gray-500 hover:text-ink transition-colors"
          aria-label="Ver"
        >
          <Eye size={14} strokeWidth={1.5} />
        </Link>
      ),
    },
  ]

  return (
    <>
      <TopBar
        title="Órdenes"
        description={`${orders.length} órdenes en total`}
      />
      <div className="p-6 lg:p-10">
        <DataTable
          data={orders}
          columns={columns}
          emptyMessage="Todavía no hay órdenes. Cuando tengás la primera, va a aparecer acá."
        />
      </div>
    </>
  )
}
