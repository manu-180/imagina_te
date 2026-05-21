import { Truck, CreditCard, Repeat, MessageCircle } from 'lucide-react'

const BENEFITS = [
  {
    icon: Truck,
    title: 'Envío discreto',
    desc: 'Tu compra viaja en caja neutra, sin nombre de la marca.',
  },
  {
    icon: CreditCard,
    title: 'Cuotas sin interés',
    desc: 'Pagá hasta en 6 cuotas con Mercado Pago.',
  },
  {
    icon: Repeat,
    title: 'Cambios fáciles',
    desc: 'Hasta 15 días para cambiar talle o color.',
  },
  {
    icon: MessageCircle,
    title: 'Atención por WhatsApp',
    desc: 'Te asesoramos en cada compra, sin algoritmos.',
  },
]

export function BenefitsStrip() {
  return (
    <section className="py-12 lg:py-16 border-y border-warm-gray-100 bg-ivory px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
        {BENEFITS.map((b) => {
          const Icon = b.icon
          return (
            <div key={b.title} className="text-center lg:text-left">
              <div className="inline-flex items-center justify-center lg:justify-start w-full lg:w-auto mb-3 text-champagne">
                <Icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="font-display italic text-xl text-ink mb-1">{b.title}</h3>
              <p className="text-xs text-warm-gray-500 leading-relaxed">{b.desc}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
