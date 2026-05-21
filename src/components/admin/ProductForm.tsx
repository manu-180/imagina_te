'use client'

import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { toast } from 'sonner'
import { Trash2, Plus } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Toggle } from '@/components/ui/Toggle'
import { Button } from '@/components/ui/Button'
import { upsertProduct, type ProductFormData } from '@/app/admin/productos/actions'
import type { Category, Collection, Product } from '@/types'
import { slugify } from '@/lib/utils'
import { ProductImageUploader } from './ProductImageUploader'

interface ProductFormProps {
  product?: Product | null
  categories: Category[]
  collections: Collection[]
}

export function ProductForm({ product, categories, collections }: ProductFormProps) {
  const router = useRouter()
  const isEdit = Boolean(product)

  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState<ProductFormData>({
    id: product?.id,
    name: product?.name ?? '',
    slug: product?.slug ?? '',
    description: product?.description ?? '',
    short_description: product?.short_description ?? '',
    care_instructions: product?.care_instructions ?? '',
    composition: product?.composition ?? '',
    price: product?.price ?? 0,
    compare_at_price: product?.compare_at_price ?? null,
    category_id: product?.category_id ?? null,
    collection_id: product?.collection_id ?? null,
    is_featured: product?.is_featured ?? false,
    is_new: product?.is_new ?? true,
    is_bestseller: product?.is_bestseller ?? false,
    status: product?.status ?? 'draft',
    images: (product?.images ?? []).map((i) => ({
      url: i.url,
      alt: i.alt ?? '',
      position: i.position,
      is_primary: i.is_primary,
    })),
    variants: (product?.variants ?? []).map((v) => ({
      id: v.id,
      size: v.size,
      cup: v.cup,
      color: v.color,
      color_hex: v.color_hex,
      stock: v.stock,
      sku: v.sku,
    })),
  })

  function update<K extends keyof ProductFormData>(key: K, value: ProductFormData[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function addVariant() {
    setForm((f) => ({
      ...f,
      variants: [
        ...f.variants,
        {
          size: '',
          cup: null,
          color: '',
          color_hex: '#000000',
          stock: 0,
          sku: '',
        },
      ],
    }))
  }

  function updateVariant(i: number, key: string, value: string | number | null) {
    setForm((f) => ({
      ...f,
      variants: f.variants.map((v, idx) =>
        idx === i ? { ...v, [key]: value } : v
      ),
    }))
  }

  function removeVariant(i: number) {
    setForm((f) => ({
      ...f,
      variants: f.variants.filter((_, idx) => idx !== i),
    }))
  }

  async function submit(e: FormEvent) {
    e.preventDefault()
    if (!form.name || !form.slug || form.price <= 0) {
      toast.error('Completá nombre, slug y precio')
      return
    }
    setSubmitting(true)
    const res = await upsertProduct(form)
    if (res.error) {
      toast.error(res.error)
      setSubmitting(false)
      return
    }
    toast.success(isEdit ? 'Producto actualizado' : 'Producto creado')
    router.push('/admin/productos')
    router.refresh()
  }

  return (
    <form onSubmit={submit} className="space-y-10">
      {/* Datos básicos */}
      <section className="bg-cream border border-warm-gray-100 p-6 space-y-4">
        <h2 className="font-display italic text-2xl text-ink">Datos básicos</h2>
        <Input
          label="Nombre"
          required
          value={form.name}
          onChange={(e) => {
            update('name', e.target.value)
            if (!isEdit) update('slug', slugify(e.target.value))
          }}
        />
        <Input
          label="Slug"
          required
          value={form.slug}
          onChange={(e) => update('slug', slugify(e.target.value))}
        />
        <Textarea
          label="Descripción corta"
          value={form.short_description}
          onChange={(e) => update('short_description', e.target.value)}
          rows={2}
        />
        <Textarea
          label="Descripción completa"
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          rows={5}
        />
        <div className="grid md:grid-cols-2 gap-4">
          <Textarea
            label="Composición"
            value={form.composition}
            onChange={(e) => update('composition', e.target.value)}
            rows={3}
          />
          <Textarea
            label="Cuidado"
            value={form.care_instructions}
            onChange={(e) => update('care_instructions', e.target.value)}
            rows={3}
          />
        </div>
      </section>

      {/* Precio y categorías */}
      <section className="bg-cream border border-warm-gray-100 p-6 space-y-4">
        <h2 className="font-display italic text-2xl text-ink">Precio y clasificación</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Precio (ARS)"
            type="number"
            required
            value={form.price.toString()}
            onChange={(e) => update('price', Number(e.target.value))}
          />
          <Input
            label="Precio anterior (opcional)"
            type="number"
            value={form.compare_at_price?.toString() ?? ''}
            onChange={(e) =>
              update(
                'compare_at_price',
                e.target.value ? Number(e.target.value) : null
              )
            }
            hint="Para mostrar descuento"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Select
            label="Categoría"
            value={form.category_id ?? ''}
            onChange={(e) => update('category_id', e.target.value || null)}
          >
            <option value="">— Sin categoría —</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </Select>
          <Select
            label="Colección"
            value={form.collection_id ?? ''}
            onChange={(e) => update('collection_id', e.target.value || null)}
          >
            <option value="">— Sin colección —</option>
            {collections.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </Select>
        </div>
      </section>

      {/* Flags */}
      <section className="bg-cream border border-warm-gray-100 p-6 space-y-3">
        <h2 className="font-display italic text-2xl text-ink mb-3">Visibilidad</h2>
        <Toggle
          checked={form.is_featured}
          onChange={(v) => update('is_featured', v)}
          label="Producto destacado"
          description="Aparece en la sección de favoritos del home"
        />
        <Toggle
          checked={form.is_new}
          onChange={(v) => update('is_new', v)}
          label="Marcar como nuevo"
          description="Aparece el badge 'Nuevo'"
        />
        <Toggle
          checked={form.is_bestseller}
          onChange={(v) => update('is_bestseller', v)}
          label="Bestseller"
          description="Aparece en la sección 'Best sellers'"
        />
        <Select
          label="Estado"
          value={form.status}
          onChange={(e) =>
            update('status', e.target.value as ProductFormData['status'])
          }
        >
          <option value="draft">Borrador (no visible)</option>
          <option value="active">Activo (visible en tienda)</option>
          <option value="archived">Archivado</option>
        </Select>
      </section>

      {/* Imágenes */}
      <section className="bg-cream border border-warm-gray-100 p-6 space-y-4">
        <h2 className="font-display italic text-2xl text-ink">Imágenes</h2>
        <ProductImageUploader
          productSlug={form.slug}
          images={form.images}
          onChange={(imgs) => update('images', imgs)}
        />
      </section>

      {/* Variantes */}
      <section className="bg-cream border border-warm-gray-100 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display italic text-2xl text-ink">Variantes</h2>
          <Button type="button" variant="ghost" onClick={addVariant}>
            <Plus size={14} strokeWidth={1.5} className="mr-1" />
            Agregar variante
          </Button>
        </div>
        {form.variants.length === 0 ? (
          <p className="text-sm text-warm-gray-500">
            Agregá al menos una variante (talle × color).
          </p>
        ) : (
          <div className="space-y-3">
            {form.variants.map((v, i) => (
              <div
                key={i}
                className="grid grid-cols-2 md:grid-cols-7 gap-3 p-3 bg-ivory border border-warm-gray-100"
              >
                <Input
                  placeholder="Talle (M, 90B)"
                  value={v.size}
                  onChange={(e) => updateVariant(i, 'size', e.target.value)}
                />
                <Input
                  placeholder="Copa (opcional)"
                  value={v.cup ?? ''}
                  onChange={(e) => updateVariant(i, 'cup', e.target.value || null)}
                />
                <Input
                  placeholder="Color"
                  value={v.color}
                  onChange={(e) => updateVariant(i, 'color', e.target.value)}
                />
                <input
                  type="color"
                  value={v.color_hex}
                  onChange={(e) => updateVariant(i, 'color_hex', e.target.value)}
                  className="w-full h-12 border border-warm-gray-300 cursor-pointer"
                />
                <Input
                  placeholder="Stock"
                  type="number"
                  value={v.stock.toString()}
                  onChange={(e) => updateVariant(i, 'stock', Number(e.target.value))}
                />
                <Input
                  placeholder="SKU"
                  value={v.sku}
                  onChange={(e) => updateVariant(i, 'sku', e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeVariant(i)}
                  className="inline-flex items-center justify-center h-12 text-error hover:bg-error/10 transition-colors"
                  aria-label="Eliminar variante"
                >
                  <Trash2 size={14} strokeWidth={1.5} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="flex gap-3 sticky bottom-0 bg-cream/95 backdrop-blur-sm border-t border-warm-gray-100 px-6 py-4 -mx-6 lg:-mx-10">
        <Button type="button" variant="ghost" onClick={() => router.back()}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" loading={submitting} fullWidth>
          {isEdit ? 'Guardar cambios' : 'Crear producto'}
        </Button>
      </div>
    </form>
  )
}
