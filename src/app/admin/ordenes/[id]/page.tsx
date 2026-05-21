import { notFound } from 'next/navigation'
import Image from 'next/image'
import { TopBar } from '@/components/admin/TopBar'
import { OrderStatusControl } from './OrderStatusControl'
import { getOrderById, getOrderAuditLog } from '@/lib/queries/orders'
import { formatPriceARS, formatDateTime } from '@/lib/utils'

export const dynamic = 'force-dynamic'

interface Props {
  params: { id: string }
}

export default async function AdminOrdenDetalle({ params }: Props) {
  const [order, audit] = await Promise.all([
    getOrderById(params.id),
    getOrderAuditLog(params.id),
  ])
  if (!order) notFound()

  return (
    <>
      <TopBar title={order.order_number} description={formatDateTime(order.created_at)} />
      <div className="p-6 lg:p-10 grid lg:grid-cols-[1fr,360px] gap-6">
        <div className="space-y-6">
          {/* Cliente */}
          <section className="bg-cream border border-warm-gray-100 p-6">
            <h2 className="font-display italic text-xl text-ink mb-4">Cliente</h2>
            <dl className="space-y-2 text-sm">
              <div className="flex gap-2">
                <dt className="text-warm-gray-500 w-32">Nombre:</dt>
                <dd className="text-ink">{order.customer_name}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-warm-gray-500 w-32">Email:</dt>
                <dd className="text-ink">{order.customer_email}</dd>
              </div>
              {order.customer_phone && (
                <div className="flex gap-2">
                  <dt className="text-warm-gray-500 w-32">Teléfono:</dt>
                  <dd className="text-ink">{order.customer_phone}</dd>
                </div>
              )}
              {order.customer_dni && (
                <div className="flex gap-2">
                  <dt className="text-warm-gray-500 w-32">DNI:</dt>
                  <dd className="text-ink">{order.customer_dni}</dd>
                </div>
              )}
            </dl>
          </section>

          {/* Items */}
          <section className="bg-cream border border-warm-gray-100">
            <h2 className="font-display italic text-xl text-ink p-6 pb-0">Productos</h2>
            <div className="p-6 space-y-4">
              {(order.items ?? []).map((it) => (
                <div key={it.id} className="flex gap-4">
                  <div className="relative w-16 h-20 flex-shrink-0 bg-warm-gray-100">
                    {it.product_image_url && (
                      <Image
                        src={it.product_image_url}
                        alt={it.product_name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-ink">{it.product_name}</p>
                    <p className="text-xs text-warm-gray-500">
                      Talle {it.variant_size}{it.variant_cup ?? ''} · Color{' '}
                      {it.variant_color} · Cantidad {it.quantity}
                    </p>
                  </div>
                  <p className="text-ink font-medium">
                    {formatPriceARS(it.line_total)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Envío */}
          {order.shipping_address && (
            <section className="bg-cream border border-warm-gray-100 p-6">
              <h2 className="font-display italic text-xl text-ink mb-4">Envío</h2>
              <p className="text-sm">
                <strong className="text-ink">{order.shipping_method}</strong>
              </p>
              <p className="text-sm text-soft-black mt-1">
                {order.shipping_address.line1}
                {order.shipping_address.line2 ? `, ${order.shipping_address.line2}` : ''}<br />
                {order.shipping_address.city}, {order.shipping_address.state} ({order.shipping_address.postal_code})<br />
                {order.shipping_address.country}
              </p>
              {order.discreet_packaging && (
                <p className="mt-3 text-xs text-success">
                  ♥ Envío en packaging discreto
                </p>
              )}
              {order.notes && (
                <p className="mt-3 text-sm text-soft-black bg-ivory p-3">
                  <strong>Notas:</strong> {order.notes}
                </p>
              )}
            </section>
          )}

          {/* Audit log */}
          {audit.length > 0 && (
            <section className="bg-cream border border-warm-gray-100 p-6">
              <h2 className="font-display italic text-xl text-ink mb-4">
                Historial
              </h2>
              <ul className="space-y-3 text-sm">
                {audit.map((entry) => (
                  <li
                    key={entry.id}
                    className="border-l-2 border-champagne pl-4 py-1"
                  >
                    <p className="font-medium text-ink">{entry.action}</p>
                    <p className="text-xs text-warm-gray-500">
                      {entry.actor} · {formatDateTime(entry.created_at)}
                    </p>
                    {entry.notes && (
                      <p className="text-xs text-soft-black mt-1">{entry.notes}</p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Resumen y status */}
        <aside className="space-y-6 lg:sticky lg:top-6 self-start">
          <section className="bg-cream border border-warm-gray-100 p-6">
            <h2 className="font-display italic text-xl text-ink mb-4">Estado</h2>
            <OrderStatusControl
              orderId={order.id}
              currentStatus={order.status}
            />
          </section>

          <section className="bg-cream border border-warm-gray-100 p-6">
            <h2 className="font-display italic text-xl text-ink mb-4">Resumen</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-warm-gray-500">Subtotal</span>
                <span>{formatPriceARS(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-warm-gray-500">Envío</span>
                <span>
                  {Number(order.shipping) === 0 ? 'Gratis' : formatPriceARS(order.shipping)}
                </span>
              </div>
              {Number(order.discount) > 0 && (
                <div className="flex justify-between text-success">
                  <span>Descuento</span>
                  <span>-{formatPriceARS(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between font-medium pt-2 border-t border-warm-gray-100 text-base text-ink">
                <span>Total</span>
                <span>{formatPriceARS(order.total)}</span>
              </div>
            </div>
            <p className="text-xs text-warm-gray-500 mt-4">
              Método de pago: {order.payment_method ?? '—'}
            </p>
          </section>
        </aside>
      </div>
    </>
  )
}
