import Link from 'next/link'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { getOrderByNumber } from '@/lib/queries/orders'
import { formatPriceARS } from '@/lib/utils'

export const metadata = {
  title: 'Pedido confirmado',
}

interface PageProps {
  searchParams: { order?: string }
}

export default async function ConfirmacionPage({ searchParams }: PageProps) {
  const orderNumber = searchParams.order
  const order = orderNumber ? await getOrderByNumber(orderNumber) : null

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
      <div className="mx-auto w-20 h-20 rounded-full bg-champagne/20 flex items-center justify-center mb-8 animate-bloom-in">
        <Heart size={36} strokeWidth={1.5} className="text-champagne fill-champagne" />
      </div>

      <p className="font-accent text-base tracking-eyebrow uppercase text-champagne mb-3">
        Pedido confirmado
      </p>
      <h1 className="font-display italic text-5xl md:text-6xl text-ink mb-6">
        Gracias{order ? `, ${order.customer_name.split(' ')[0]}` : ''} ♥
      </h1>
      <p className="text-soft-black mb-2 max-w-md mx-auto">
        Tu pedido fue recibido. Te mandamos un email con los detalles a{' '}
        {order?.customer_email ?? 'tu casilla'}.
      </p>

      {order && (
        <>
          <div className="inline-block mt-6 px-6 py-4 bg-ivory border border-warm-gray-100">
            <p className="text-[11px] uppercase tracking-eyebrow text-warm-gray-500 mb-1">
              Número de orden
            </p>
            <p className="font-display italic text-3xl text-ink">
              {order.order_number}
            </p>
          </div>

          <div className="mt-10 text-left max-w-lg mx-auto bg-cream border border-warm-gray-100 p-6 space-y-3">
            <h2 className="font-display italic text-2xl text-ink mb-2">Resumen</h2>
            <div className="space-y-2">
              {(order.items ?? []).map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-soft-black">
                    {item.product_name}{' '}
                    <span className="text-warm-gray-500">
                      · {item.variant_size}{item.variant_cup ?? ''} · {item.variant_color} · x{item.quantity}
                    </span>
                  </span>
                  <span className="text-ink font-medium">
                    {formatPriceARS(item.line_total ?? 0)}
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-warm-gray-100 space-y-1 text-sm">
              <div className="flex justify-between text-soft-black">
                <span>Subtotal</span>
                <span>{formatPriceARS(order.subtotal ?? 0)}</span>
              </div>
              <div className="flex justify-between text-soft-black">
                <span>Envío</span>
                <span>
                  {(order.shipping ?? 0) === 0
                    ? 'Gratis'
                    : formatPriceARS(order.shipping)}
                </span>
              </div>
              {(order.discount ?? 0) > 0 && (
                <div className="flex justify-between text-success">
                  <span>Descuento</span>
                  <span>-{formatPriceARS(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between font-medium text-lg text-ink pt-2 border-t border-warm-gray-100">
                <span>Total</span>
                <span>{formatPriceARS(order.total ?? 0)}</span>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="mt-10">
        <Link href="/productos">
          <Button variant="primary" size="lg">
            Seguí explorando
          </Button>
        </Link>
      </div>
    </div>
  )
}
