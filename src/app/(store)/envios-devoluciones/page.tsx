export const metadata = {
  title: 'Envíos y devoluciones',
  description: 'Cómo te llega tu pedido y cómo hacés cambios o devoluciones.',
}

export default function EnviosPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <header className="text-center mb-12">
        <p className="text-[11px] uppercase tracking-eyebrow text-champagne font-medium mb-3">
          Cómo funciona
        </p>
        <h1 className="font-display italic text-5xl md:text-6xl text-ink mb-4">
          Envíos y devoluciones
        </h1>
      </header>

      <div className="space-y-12">
        <section>
          <h2 className="font-display italic text-3xl text-ink mb-4">
            Envíos
          </h2>
          <div className="space-y-3 text-soft-black leading-relaxed">
            <p>
              Hacemos envíos a todo el país con Andreani y OCA. El plazo es de 3 a 5 días hábiles para entregas estándar, 1 a 2 días para express.
            </p>
            <p>
              <strong className="text-ink">Envío gratis</strong> en compras superiores a $35.000.
            </p>
            <p>
              Si vivís en CABA o GBA, podés <strong className="text-ink">retirar en el local</strong> de Bynnon 3623 esq. Martín Arín sin costo.
            </p>
          </div>
        </section>

        <section className="bg-blush/40 p-8 border border-rose/30">
          <h2 className="font-display italic text-3xl text-ink mb-4">
            Packaging discreto
          </h2>
          <p className="text-soft-black leading-relaxed">
            Todos nuestros envíos van en caja neutra, sin nombre de marca ni indicios del contenido. Tu privacidad es prioridad. El packaging interior sí es nuestro: cuidado, en papel madera y con un mensaje escrito a mano.
          </p>
        </section>

        <section>
          <h2 className="font-display italic text-3xl text-ink mb-4">
            Cambios y devoluciones
          </h2>
          <div className="space-y-3 text-soft-black leading-relaxed">
            <p>
              Tenés <strong className="text-ink">15 días corridos</strong> desde la recepción del pedido para cambiar talle o color.
            </p>
            <p>
              La prenda tiene que estar sin uso, con etiquetas y en su packaging original.
            </p>
            <p>
              Por motivos de higiene, no aceptamos cambios ni devoluciones en bombachas y bodysuits si la etiqueta sanitaria fue removida.
            </p>
            <p>
              Para iniciar el cambio, escribinos a <a href="mailto:hola@imaginate-lenceria.com.ar" className="text-champagne underline-offset-4 hover:underline">hola@imaginate-lenceria.com.ar</a> o por WhatsApp.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-display italic text-3xl text-ink mb-4">
            Tabla de costos
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-ink text-cream">
                <tr>
                  <th className="text-left px-4 py-3 text-[11px] uppercase tracking-eyebrow font-medium">
                    Servicio
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] uppercase tracking-eyebrow font-medium">
                    Tiempo
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] uppercase tracking-eyebrow font-medium">
                    Costo
                  </th>
                </tr>
              </thead>
              <tbody className="text-soft-black">
                <tr className="bg-cream">
                  <td className="px-4 py-3 font-medium">Andreani Estándar</td>
                  <td className="px-4 py-3">3-5 días hábiles</td>
                  <td className="px-4 py-3">$4.500</td>
                </tr>
                <tr className="bg-ivory">
                  <td className="px-4 py-3 font-medium">Andreani Express</td>
                  <td className="px-4 py-3">1-2 días hábiles</td>
                  <td className="px-4 py-3">$7.800</td>
                </tr>
                <tr className="bg-cream">
                  <td className="px-4 py-3 font-medium">OCA</td>
                  <td className="px-4 py-3">3-5 días hábiles</td>
                  <td className="px-4 py-3">$4.200</td>
                </tr>
                <tr className="bg-ivory">
                  <td className="px-4 py-3 font-medium">Retiro en local</td>
                  <td className="px-4 py-3">Disponible al día siguiente</td>
                  <td className="px-4 py-3 text-success font-medium">Gratis</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}
