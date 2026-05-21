'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Toggle } from '@/components/ui/Toggle'
import { Button } from '@/components/ui/Button'
import { updateSiteSetting } from '@/app/admin/productos/actions'
import type { SiteConfig } from '@/lib/site-config'

const HEX_REGEX = /^#[0-9a-fA-F]{6}$/

export function SettingsForm({ config }: { config: SiteConfig }) {
  const router = useRouter()
  const [form, setForm] = useState({
    store_name: config.store_name,
    store_tagline: config.store_tagline,
    free_shipping_threshold: config.free_shipping_threshold,
    announcement_text: config.announcement_bar.text,
    announcement_active: config.announcement_bar.active,
    primary: config.brand_colors.primary,
    accent: config.brand_colors.accent,
    contact_phone: config.contact_phone,
    contact_address: config.contact_address,
    instagram_url: config.instagram_url,
    whatsapp_number: config.whatsapp_number,
  })
  const [saving, setSaving] = useState(false)

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function save() {
    if (!HEX_REGEX.test(form.primary) || !HEX_REGEX.test(form.accent)) {
      toast.error('Los colores deben ser hex válidos (ej: #C9A96E)')
      return
    }
    setSaving(true)
    try {
      await Promise.all([
        updateSiteSetting('store_name', form.store_name),
        updateSiteSetting('store_tagline', form.store_tagline),
        updateSiteSetting('free_shipping_threshold', form.free_shipping_threshold),
        updateSiteSetting('announcement_bar', {
          text: form.announcement_text,
          active: form.announcement_active,
        }),
        updateSiteSetting('brand_colors', {
          ...config.brand_colors,
          primary: form.primary,
          accent: form.accent,
        }),
        updateSiteSetting('contact_phone', form.contact_phone),
        updateSiteSetting('contact_address', form.contact_address),
        updateSiteSetting('instagram_url', form.instagram_url),
        updateSiteSetting('whatsapp_number', form.whatsapp_number),
      ])
      toast.success('Configuración guardada')
      router.refresh()
    } catch (e) {
      console.error(e)
      toast.error('Algo salió mal')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-8">
      <section className="bg-cream border border-warm-gray-100 p-6 space-y-4">
        <h2 className="font-display italic text-2xl text-ink">Marca</h2>
        <Input
          label="Nombre de la tienda"
          value={form.store_name}
          onChange={(e) => update('store_name', e.target.value)}
        />
        <Input
          label="Tagline"
          value={form.store_tagline}
          onChange={(e) => update('store_tagline', e.target.value)}
        />
        <Input
          label="Umbral envío gratis (ARS)"
          type="number"
          value={form.free_shipping_threshold.toString()}
          onChange={(e) =>
            update('free_shipping_threshold', Number(e.target.value))
          }
        />
      </section>

      <section className="bg-cream border border-warm-gray-100 p-6 space-y-4">
        <h2 className="font-display italic text-2xl text-ink">Anuncio superior</h2>
        <Textarea
          label="Texto del anuncio"
          value={form.announcement_text}
          onChange={(e) => update('announcement_text', e.target.value)}
          rows={2}
        />
        <Toggle
          checked={form.announcement_active}
          onChange={(v) => update('announcement_active', v)}
          label="Anuncio activo"
          description="Mostrar la barra arriba del navbar"
        />
      </section>

      <section className="bg-cream border border-warm-gray-100 p-6 space-y-4">
        <h2 className="font-display italic text-2xl text-ink">Colores de marca</h2>
        <p className="text-xs text-warm-gray-500">
          Estos valores se guardan en site_settings pero los colores efectivos del sitio se aplican via Tailwind config. Los colores del admin se mantienen.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] uppercase tracking-eyebrow text-soft-black/80 font-medium mb-1.5">
              Color principal (champagne)
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={form.primary}
                onChange={(e) => update('primary', e.target.value)}
                className="w-14 h-12 border border-warm-gray-300 cursor-pointer"
              />
              <Input
                value={form.primary}
                onChange={(e) => update('primary', e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-eyebrow text-soft-black/80 font-medium mb-1.5">
              Acento (rosa)
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={form.accent}
                onChange={(e) => update('accent', e.target.value)}
                className="w-14 h-12 border border-warm-gray-300 cursor-pointer"
              />
              <Input
                value={form.accent}
                onChange={(e) => update('accent', e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream border border-warm-gray-100 p-6 space-y-4">
        <h2 className="font-display italic text-2xl text-ink">Contacto</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Teléfono"
            value={form.contact_phone}
            onChange={(e) => update('contact_phone', e.target.value)}
          />
          <Input
            label="WhatsApp (con cód. país)"
            value={form.whatsapp_number}
            onChange={(e) => update('whatsapp_number', e.target.value)}
            hint="Ej: 5491161755668"
          />
        </div>
        <Input
          label="Dirección"
          value={form.contact_address}
          onChange={(e) => update('contact_address', e.target.value)}
        />
        <Input
          label="URL Instagram"
          value={form.instagram_url}
          onChange={(e) => update('instagram_url', e.target.value)}
        />
      </section>

      <div className="sticky bottom-0 bg-cream/95 backdrop-blur-sm border-t border-warm-gray-100 px-6 py-4 -mx-6 lg:-mx-10">
        <Button variant="primary" loading={saving} onClick={save} fullWidth size="lg">
          Guardar cambios
        </Button>
      </div>
    </div>
  )
}
