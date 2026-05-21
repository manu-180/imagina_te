'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/Button'

export function NewsletterCTA() {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@')) {
      toast.error('Ingresá un email válido')
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      toast.success('¡Listo! Te sumamos a la lista ♥')
      setEmail('')
      setSubmitting(false)
    }, 800)
  }

  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-ink text-cream">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-[11px] uppercase tracking-eyebrow text-champagne font-medium mb-3">
          Suscribite
        </p>
        <h2 className="font-display italic text-4xl md:text-5xl mb-4">
          Quedate cerca
        </h2>
        <p className="text-warm-gray-300 max-w-md mx-auto mb-8">
          Sé la primera en enterarte de nuevas colecciones, ofertas exclusivas y consejos de estilo. Cero spam, todo cuidado.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            required
            placeholder="Tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 h-12 px-4 bg-noir border border-warm-gray-500/50 text-cream placeholder:text-warm-gray-500 focus:outline-none focus:border-champagne transition-colors"
          />
          <Button
            type="submit"
            variant="champagne"
            loading={submitting}
            className="sm:w-auto"
          >
            Suscribirme
          </Button>
        </form>
      </div>
    </section>
  )
}
