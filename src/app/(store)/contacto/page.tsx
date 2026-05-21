'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Instagram, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import {
  CONTACT_ADDRESS,
  CONTACT_INSTAGRAM,
  CONTACT_PHONE,
  CONTACT_WHATSAPP_NUMBER,
} from '@/lib/constants'

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' })
  const [sending, setSending] = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.nombre || !form.email || !form.mensaje) {
      toast.error('Completá todos los campos')
      return
    }
    setSending(true)
    setTimeout(() => {
      toast.success('Mensaje enviado. Te contestamos en menos de 24 hs.')
      setForm({ nombre: '', email: '', mensaje: '' })
      setSending(false)
    }, 800)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <header className="text-center mb-12">
        <p className="text-[11px] uppercase tracking-eyebrow text-champagne font-medium mb-3">
          Estamos cerca
        </p>
        <h1 className="font-display italic text-5xl md:text-6xl text-ink mb-4">
          Contacto
        </h1>
        <p className="text-warm-gray-500 max-w-md mx-auto">
          Te respondemos por el canal que elijas. Sin algoritmos.
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Info */}
        <div className="space-y-6">
          <a
            href={`https://wa.me/${CONTACT_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 p-5 border border-warm-gray-100 hover:border-champagne transition-colors group"
          >
            <MessageCircle size={22} strokeWidth={1.5} className="text-success" />
            <div>
              <p className="font-display italic text-2xl text-ink group-hover:text-champagne transition-colors">
                WhatsApp
              </p>
              <p className="text-sm text-warm-gray-500 mt-1">{CONTACT_PHONE}</p>
              <p className="text-xs text-warm-gray-500 mt-2">
                Respondemos en horario comercial.
              </p>
            </div>
          </a>

          <a
            href={CONTACT_INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 p-5 border border-warm-gray-100 hover:border-champagne transition-colors group"
          >
            <Instagram size={22} strokeWidth={1.5} className="text-rose-deep" />
            <div>
              <p className="font-display italic text-2xl text-ink group-hover:text-champagne transition-colors">
                Instagram
              </p>
              <p className="text-sm text-warm-gray-500 mt-1">@lenceria_imaginate</p>
              <p className="text-xs text-warm-gray-500 mt-2">
                Mirá los últimos drops y editoriales.
              </p>
            </div>
          </a>

          <div className="flex items-start gap-4 p-5 border border-warm-gray-100">
            <MapPin size={22} strokeWidth={1.5} className="text-champagne" />
            <div>
              <p className="font-display italic text-2xl text-ink">El local</p>
              <p className="text-sm text-warm-gray-500 mt-1">{CONTACT_ADDRESS}</p>
              <p className="text-xs text-warm-gray-500 mt-2">
                Lun a Sáb · 10:00 a 19:30
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 border border-warm-gray-100">
            <Phone size={22} strokeWidth={1.5} className="text-ink" />
            <div>
              <p className="font-display italic text-2xl text-ink">Teléfono fijo</p>
              <p className="text-sm text-warm-gray-500 mt-1">2067-6665</p>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <form
          onSubmit={submit}
          className="bg-ivory border border-warm-gray-100 p-6 lg:p-8 space-y-4"
        >
          <h2 className="font-display italic text-2xl text-ink mb-2">
            Escribinos
          </h2>
          <Input
            label="Nombre"
            required
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />
          <Input
            label="Email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Textarea
            label="Mensaje"
            required
            value={form.mensaje}
            onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
            rows={5}
          />
          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={sending}
          >
            Enviar
          </Button>
        </form>
      </div>
    </div>
  )
}
