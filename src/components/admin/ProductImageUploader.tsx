'use client'

import { useState, type ChangeEvent } from 'react'
import Image from 'next/image'
import { Trash2, Upload, Star, Plus } from 'lucide-react'
import { toast } from 'sonner'
import { uploadProductImage, deleteImage } from '@/lib/supabase/storage'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface FormImage {
  url: string
  alt: string
  position: number
  is_primary: boolean
}

interface ProductImageUploaderProps {
  productSlug: string
  images: FormImage[]
  onChange: (images: FormImage[]) => void
}

export function ProductImageUploader({
  productSlug,
  images,
  onChange,
}: ProductImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [externalUrl, setExternalUrl] = useState('')

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const { url } = await uploadProductImage(file, productSlug || null)
      onChange([
        ...images,
        {
          url,
          alt: file.name.replace(/\.[^.]+$/, ''),
          position: images.length,
          is_primary: images.length === 0,
        },
      ])
      toast.success('Imagen subida')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al subir'
      toast.error(message)
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  function addExternalUrl() {
    if (!externalUrl.startsWith('http')) {
      toast.error('Ingresá una URL válida')
      return
    }
    onChange([
      ...images,
      {
        url: externalUrl,
        alt: '',
        position: images.length,
        is_primary: images.length === 0,
      },
    ])
    setExternalUrl('')
    toast.success('Imagen agregada')
  }

  function removeImage(i: number) {
    const img = images[i]
    onChange(images.filter((_, idx) => idx !== i))
    // Borrar de storage solo si es del bucket lenceria-products
    if (img.url.includes('lenceria-products')) {
      deleteImage(img.url, 'products').catch(() => {})
    }
  }

  function setPrimary(i: number) {
    onChange(
      images.map((img, idx) => ({
        ...img,
        is_primary: idx === i,
      }))
    )
  }

  function updateAlt(i: number, alt: string) {
    onChange(images.map((img, idx) => (idx === i ? { ...img, alt } : img)))
  }

  return (
    <div className="space-y-4">
      {/* Lista de imágenes */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {images.map((img, i) => (
            <div key={i} className="relative group bg-warm-gray-100">
              <div className="relative aspect-[3/4]">
                <Image
                  src={img.url}
                  alt={img.alt || 'Producto'}
                  fill
                  sizes="200px"
                  className="object-cover"
                />
                {img.is_primary && (
                  <div className="absolute top-1 left-1 bg-champagne text-ink text-[9px] uppercase tracking-eyebrow px-1.5 py-0.5">
                    Principal
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/40 transition-colors flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                {!img.is_primary && (
                  <button
                    type="button"
                    onClick={() => setPrimary(i)}
                    className="w-9 h-9 bg-cream hover:bg-champagne text-ink inline-flex items-center justify-center"
                    aria-label="Marcar principal"
                  >
                    <Star size={14} strokeWidth={1.5} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="w-9 h-9 bg-error text-cream inline-flex items-center justify-center"
                  aria-label="Eliminar"
                >
                  <Trash2 size={14} strokeWidth={1.5} />
                </button>
              </div>
              <input
                type="text"
                value={img.alt}
                onChange={(e) => updateAlt(i, e.target.value)}
                placeholder="Alt"
                className="w-full px-2 py-1.5 text-xs bg-ivory border-t border-warm-gray-100"
              />
            </div>
          ))}
        </div>
      )}

      {/* Upload local */}
      <label
        className={`relative block border-2 border-dashed border-warm-gray-300 p-6 text-center cursor-pointer hover:border-champagne hover:bg-blush/20 transition-colors ${uploading ? 'opacity-50' : ''}`}
      >
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFile}
          disabled={uploading}
          className="sr-only"
        />
        <Upload size={20} strokeWidth={1.5} className="mx-auto text-warm-gray-500 mb-2" />
        <p className="text-sm text-soft-black">
          {uploading ? 'Subiendo...' : 'Hacé click para subir una imagen'}
        </p>
        <p className="text-xs text-warm-gray-500 mt-1">
          JPG, PNG o WebP. Máximo 5MB.
        </p>
      </label>

      {/* Url externa */}
      <div className="flex gap-2 pt-2 border-t border-warm-gray-100">
        <Input
          placeholder="O pegá una URL de imagen (Unsplash)"
          value={externalUrl}
          onChange={(e) => setExternalUrl(e.target.value)}
          className="h-10 flex-1"
        />
        <Button type="button" variant="ghost" onClick={addExternalUrl}>
          <Plus size={14} strokeWidth={1.5} className="mr-1" />
          Agregar
        </Button>
      </div>
    </div>
  )
}
