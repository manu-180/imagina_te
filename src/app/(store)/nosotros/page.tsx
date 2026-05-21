import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export const metadata = {
  title: 'Nosotros',
  description: 'La historia detrás de Imagina te.',
}

export default function NosotrosPage() {
  return (
    <>
      <section className="relative h-[55vh] min-h-[440px] overflow-hidden bg-ink">
        <Image
          src="https://images.unsplash.com/photo-1591348122769-7f3e75c0afe1?auto=format&fit=crop&w=1920&q=85"
          alt="Detalle de un robe de satén champagne"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 to-ink/70" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 text-cream">
          <p className="text-[11px] uppercase tracking-eyebrow text-champagne mb-4">
            La historia
          </p>
          <h1 className="font-display italic text-6xl md:text-7xl">
            Imagina te
          </h1>
          <p className="font-accent italic text-2xl md:text-3xl mt-4 text-cream/90">
            Para vos, primero
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-6 text-base text-soft-black leading-relaxed">
          <p>
            <strong className="text-ink font-display italic text-xl">Imagina te</strong> nació en Bynnon 3623, en un local físico que recibe clientas hace más de diez años. Valeria, su fundadora, atiende personalmente. Conoce a las que vuelven. Escucha lo que cada una busca.
          </p>
          <p>
            Renueva tu interior es nuestro mantra, y no es solo un eslogan: es una invitación a que la lencería que elegís sea para vos antes que para nadie. Para sentirte cómoda en tu propia piel, sentada en el sillón del living o saliendo a comer. Para el momento en que te vestís sin que te mire nadie y querés que igual sea hermoso.
          </p>
          <p>
            Curamos cada pieza con criterio: encajes franceses, microfibras técnicas, satenes de viscosa, algodón pima. Diseños que duran porque las telas duran. Cortes pensados para silueta argentina real, no para la fantasía de un patrón europeo.
          </p>
          <p>
            Hacemos envíos discretos a todo el país, pero también te abrimos la puerta del local cuando querés probarte algo. Atendemos por WhatsApp con respuestas humanas. Y si una prenda no te queda como esperabas, te ayudamos a cambiarla sin preguntas incómodas.
          </p>

          <div className="pt-6 border-t border-warm-gray-100">
            <p className="font-display italic text-2xl text-ink">
              «Mi sueño siempre fue que cada mujer se sienta acompañada en el momento más íntimo: cuando se elige a sí misma.»
            </p>
            <p className="text-sm text-warm-gray-500 mt-3">
              — Valeria, fundadora
            </p>
          </div>

          <div className="pt-8 text-center">
            <Link href="/productos">
              <Button variant="primary" size="lg">
                Conocé la colección
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
