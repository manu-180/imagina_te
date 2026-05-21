'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Lock, Truck, CreditCard, User } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { Toggle } from '@/components/ui/Toggle'
import { useCartStore } from '@/lib/store/cart'
import { createClient } from '@/lib/supabase/client'
import {
  FREE_SHIPPING_THRESHOLD,
  PAYMENT_METHODS,
  PROVINCIAS_AR,
  SHIPPING_OPTIONS,
} from '@/lib/constants'
import { formatPriceARS, cn } from '@/lib/utils'

export function CheckoutPage() {
  const router = useRouter()
  const items = useCartStore((s) => s.items)
  const subtotal = useCartStore((s) => s.getSubtotal())
  const clearCart = useCartStore((s) => s.clearCart)

  const [submitting, setSubmitting] = useState(false)
  const [shippingMethod, setShippingMethod] = useState<string>(SHIPPING_OPTIONS[0].id)
  const [paymentMethod, setPaymentMethod] = useState<string>(PAYMENT_METHODS[0].id)
  const [discreet, setDiscreet] = useState(true)
  const [discountCode, setDiscountCode] = useState('')
  const [discountApplied, setDiscountApplied] = useState(0)

  const [form, setForm] = useState({
    email: '',
    nombre: '',
    apellido: '',
    telefono: '',
    dni: '',
    direccion: '',
    direccion_extra: '',
    ciudad: '',
    provincia: 'Buenos Aires',
    cp: '',
    notas: '',
  })

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  const shippingOption = SHIPPING_OPTIONS.find((o) => o.id === shippingMethod)!
  const shippingPrice =
    subtotal >= FREE_SHIPPING_THRESHOLD && shippingOption.id !== 'retiro-local'
      ? 0
      : shippingOption.price
  const total = subtotal + shippingPrice - discountApplied

  function applyDiscount() {
    if (discountCode.trim().toUpperCase() === 'IMAGINATE10') {
      setDiscountApplied(Math.round(subtotal * 0.1))
      toast.success('Código aplicado: 10% off ♥')
    } else {
      setDiscountApplied(0)
      toast.error('Código inválido')
    }
  }

  async function submit() {
    if (items.length === 0) {
      toast.error('Tu bolsa está vacía')
      return
    }
    if (!form.email || !form.nombre || !form.apellido) {
      toast.error('Completá los datos de contacto')
      return
    }
    if (shippingMethod !== 'retiro-local') {
      if (!form.direccion || !form.ciudad || !form.cp) {
        toast.error('Completá la dirección de envío')
        return
      }
    }

    setSubmitting(true)
    try {
      const supabase = createClient()

      const orderPayload = {
        customer_email: form.email,
        customer_name: `${form.nombre} ${form.apellido}`.trim(),
        customer_phone: form.telefono || null,
        customer_dni: form.dni || null,
        subtotal,
        shipping: shippingPrice,
        shipping_method: shippingOption.label,
        discount: discountApplied,
        total,
        status: 'pending',
        payment_method: PAYMENT_METHODS.find((p) => p.id === paymentMethod)?.label,
        payment_status: 'pending',
        shipping_address:
          shippingMethod === 'retiro-local'
            ? null
            : {
                line1: form.direccion,
                line2: form.direccion_extra,
                city: form.ciudad,
                state: form.provincia,
                postal_code: form.cp,
                country: 'Argentina',
              },
        discreet_packaging: discreet,
        notes: form.notas || null,
      }

      const { data: order, error } = await supabase
        .from('lenceria_orders')
        .insert(orderPayload)
        .select('id, order_number')
        .single()

      if (error || !order) {
        console.error(error)
        toast.error('No pudimos crear el pedido. Probá de nuevo.')
        setSubmitting(false)
        return
      }

      const orderItemsPayload = items.map((it) => ({
        order_id: order.id,
        product_id: it.product.id,
        variant_id: it.variant.id,
        product_name: it.product.name,
        variant_size: it.variant.size,
        variant_cup: it.variant.cup,
        variant_color: it.variant.color,
        product_image_url: it.product.image_url,
        quantity: it.quantity,
        unit_price: it.product.price,
      }))

      const { error: itemsError } = await supabase
        .from('lenceria_order_items')
        .insert(orderItemsPayload)

      if (itemsError) {
        console.error(itemsError)
      }

      clearCart()
      router.push(
        `/checkout/confirmacion?order=${encodeURIComponent(order.order_number)}`
      )
    } catch (e) {
      console.error(e)
      toast.error('Algo salió mal. Intentá de nuevo.')
      setSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-4 text-center">
        <p className="font-display italic text-4xl text-ink mb-3">
          Tu bolsa está vacía
        </p>
        <p className="text-warm-gray-500 mb-6">
          No podés hacer checkout sin productos.
        </p>
        <Button variant="primary" onClick={() => router.push('/productos')}>
          Volver a la tienda
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <h1 className="font-display italic text-4xl md:text-5xl text-ink mb-2 text-center">
        Checkout
      </h1>
      <p className="text-center text-sm text-warm-gray-500 mb-10 flex items-center justify-center gap-1.5">
        <Lock size={12} strokeWidth={1.5} /> Conexión segura
      </p>

      <div className="grid lg:grid-cols-[1fr,420px] gap-12">
        {/* Formulario */}
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={(e) => {
            e.preventDefault()
            submit()
          }}
          className="space-y-10"
        >
          {/* Contacto */}
          <section>
            <h2 className="font-display italic text-2xl text-ink mb-1 flex items-center gap-2">
              <User size={18} strokeWidth={1.5} /> 1. Contacto
            </h2>
            <p className="text-xs text-warm-gray-500 mb-5">
              Te enviamos el confirmation por email.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Email"
                type="email"
                required
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                className="sm:col-span-2"
              />
              <Input
                label="Nombre"
                required
                value={form.nombre}
                onChange={(e) => update('nombre', e.target.value)}
              />
              <Input
                label="Apellido"
                required
                value={form.apellido}
                onChange={(e) => update('apellido', e.target.value)}
              />
              <Input
                label="Teléfono"
                value={form.telefono}
                onChange={(e) => update('telefono', e.target.value)}
                placeholder="+54 9 11 ..."
              />
              <Input
                label="DNI"
                value={form.dni}
                onChange={(e) => update('dni', e.target.value)}
                placeholder="Solo números"
              />
            </div>
          </section>

          {/* Envío */}
          <section>
            <h2 className="font-display italic text-2xl text-ink mb-5 flex items-center gap-2">
              <Truck size={18} strokeWidth={1.5} /> 2. Envío
            </h2>
            <div className="space-y-2 mb-5">
              {SHIPPING_OPTIONS.map((opt) => (
                <label
                  key={opt.id}
                  className={cn(
                    'flex items-start gap-3 p-4 border cursor-pointer transition-all',
                    shippingMethod === opt.id
                      ? 'border-ink bg-ivory'
                      : 'border-warm-gray-300'
                  )}
                >
                  <input
                    type="radio"
                    name="shipping"
                    value={opt.id}
                    checked={shippingMethod === opt.id}
                    onChange={() => setShippingMethod(opt.id)}
                    className="mt-1 accent-ink"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-ink">{opt.label}</p>
                    <p className="text-xs text-warm-gray-500">{opt.description}</p>
                  </div>
                  <p className="font-medium text-ink">
                    {opt.price === 0
                      ? 'Gratis'
                      : subtotal >= FREE_SHIPPING_THRESHOLD
                        ? <span className="text-success">Gratis</span>
                        : formatPriceARS(opt.price)}
                  </p>
                </label>
              ))}
            </div>

            {shippingMethod !== 'retiro-local' && (
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Calle y número"
                  required
                  value={form.direccion}
                  onChange={(e) => update('direccion', e.target.value)}
                  className="sm:col-span-2"
                />
                <Input
                  label="Piso / Depto (opcional)"
                  value={form.direccion_extra}
                  onChange={(e) => update('direccion_extra', e.target.value)}
                  className="sm:col-span-2"
                />
                <Input
                  label="Ciudad"
                  required
                  value={form.ciudad}
                  onChange={(e) => update('ciudad', e.target.value)}
                />
                <Select
                  label="Provincia"
                  value={form.provincia}
                  onChange={(e) => update('provincia', e.target.value)}
                >
                  {PROVINCIAS_AR.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </Select>
                <Input
                  label="Código postal"
                  required
                  value={form.cp}
                  onChange={(e) => update('cp', e.target.value)}
                />
              </div>
            )}

            <div className="mt-6 p-4 bg-blush/40 border border-rose/30">
              <Toggle
                checked={discreet}
                onChange={setDiscreet}
                label="Envío en packaging discreto ♥"
                description="Tu compra viaja en caja neutra, sin nombre de la marca ni indicios del contenido."
              />
            </div>

            <Textarea
              label="Notas para el envío (opcional)"
              value={form.notas}
              onChange={(e) => update('notas', e.target.value)}
              className="mt-5"
              placeholder="¿Algo que tengamos que saber?"
            />
          </section>

          {/* Pago */}
          <section>
            <h2 className="font-display italic text-2xl text-ink mb-5 flex items-center gap-2">
              <CreditCard size={18} strokeWidth={1.5} /> 3. Pago
            </h2>
            <div className="space-y-2">
              {PAYMENT_METHODS.map((opt) => (
                <label
                  key={opt.id}
                  className={cn(
                    'flex items-start gap-3 p-4 border cursor-pointer transition-all',
                    paymentMethod === opt.id
                      ? 'border-ink bg-ivory'
                      : 'border-warm-gray-300'
                  )}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={opt.id}
                    checked={paymentMethod === opt.id}
                    onChange={() => setPaymentMethod(opt.id)}
                    className="mt-1 accent-ink"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-ink">{opt.label}</p>
                    <p className="text-xs text-warm-gray-500">{opt.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </section>

          <Button
            type="submit"
            size="lg"
            variant="primary"
            fullWidth
            loading={submitting}
            className="hover:bg-champagne hover:text-ink"
          >
            Confirmar pedido · {formatPriceARS(total)}
          </Button>
        </motion.form>

        {/* Resumen sticky */}
        <aside className="lg:sticky lg:top-24 self-start">
          <div className="bg-ivory border border-warm-gray-100 p-6 space-y-4">
            <h3 className="font-display italic text-xl text-ink">Tu pedido</h3>

            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {items.map((it) => (
                <div key={it.variant.id} className="flex gap-3">
                  <div className="relative w-16 h-20 flex-shrink-0 bg-warm-gray-100">
                    {it.product.image_url && (
                      <Image
                        src={it.product.image_url}
                        alt={it.product.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    )}
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-ink text-cream text-[10px] rounded-full inline-flex items-center justify-center">
                      {it.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink truncate">
                      {it.product.name}
                    </p>
                    <p className="text-xs text-warm-gray-500">
                      {it.variant.size}
                      {it.variant.cup ?? ''} · {it.variant.color}
                    </p>
                    <p className="text-sm mt-0.5">
                      {formatPriceARS(it.product.price * it.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-warm-gray-100 space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Código de descuento"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="h-10"
                />
                <Button variant="ghost" onClick={applyDiscount}>
                  Aplicar
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t border-warm-gray-100 space-y-2 text-sm">
              <div className="flex justify-between text-soft-black">
                <span>Subtotal</span>
                <span>{formatPriceARS(subtotal)}</span>
              </div>
              <div className="flex justify-between text-soft-black">
                <span>Envío</span>
                <span>
                  {shippingPrice === 0 ? 'Gratis' : formatPriceARS(shippingPrice)}
                </span>
              </div>
              {discountApplied > 0 && (
                <div className="flex justify-between text-success">
                  <span>Descuento</span>
                  <span>-{formatPriceARS(discountApplied)}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-warm-gray-100 font-medium text-lg text-ink">
                <span>Total</span>
                <span>{formatPriceARS(total)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
