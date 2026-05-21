import { createClient } from '@/lib/supabase/client'

const PRODUCTS_BUCKET = 'lenceria-products'
const CATEGORIES_BUCKET = 'lenceria-categories'
const COLLECTIONS_BUCKET = 'lenceria-collections'

const MAX_SIZE_BYTES = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export type StorageBucket = 'products' | 'categories' | 'collections'

const BUCKET_MAP: Record<StorageBucket, string> = {
  products: PRODUCTS_BUCKET,
  categories: CATEGORIES_BUCKET,
  collections: COLLECTIONS_BUCKET,
}

export interface UploadResult {
  url: string
  path: string
}

export class StorageError extends Error {
  constructor(
    message: string,
    public code: 'size' | 'type' | 'upload' | 'delete' | 'url'
  ) {
    super(message)
    this.name = 'StorageError'
  }
}

export function validateImageFile(file: File): void {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new StorageError(
      `Formato no permitido: ${file.type || 'desconocido'}. Usá JPG, PNG o WebP.`,
      'type'
    )
  }
  if (file.size > MAX_SIZE_BYTES) {
    const mb = (file.size / 1024 / 1024).toFixed(1)
    throw new StorageError(`La imagen pesa ${mb}MB. El máximo es 5MB.`, 'size')
  }
}

export async function uploadImage(
  file: File,
  bucket: StorageBucket,
  folder: string | null
): Promise<UploadResult> {
  validateImageFile(file)

  const supabase = createClient()
  const bucketName = BUCKET_MAP[bucket]
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const safeFolder = folder && folder.trim() ? folder : 'draft'
  const randomId = Math.random().toString(36).slice(2, 10)
  const timestamp = Date.now()
  const path = `${safeFolder}/${timestamp}-${randomId}.${ext}`

  const { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    })

  if (uploadError) {
    throw new StorageError(
      `No se pudo subir la imagen: ${uploadError.message}`,
      'upload'
    )
  }

  const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(path)
  if (!urlData?.publicUrl) {
    throw new StorageError('No se pudo obtener la URL pública de la imagen.', 'url')
  }

  return { url: urlData.publicUrl, path }
}

export async function uploadProductImage(
  file: File,
  productSlug: string | null
): Promise<UploadResult> {
  return uploadImage(file, 'products', productSlug)
}

export function extractStoragePath(
  publicUrl: string,
  bucket: StorageBucket = 'products'
): string | null {
  const bucketName = BUCKET_MAP[bucket]
  const marker = `/storage/v1/object/public/${bucketName}/`
  const idx = publicUrl.indexOf(marker)
  if (idx === -1) return null
  return publicUrl.slice(idx + marker.length)
}

export async function deleteImage(
  urlOrPath: string,
  bucket: StorageBucket = 'products'
): Promise<void> {
  const path = urlOrPath.startsWith('http')
    ? extractStoragePath(urlOrPath, bucket)
    : urlOrPath
  if (!path) return

  const supabase = createClient()
  const bucketName = BUCKET_MAP[bucket]
  const { error } = await supabase.storage.from(bucketName).remove([path])
  if (error) {
    throw new StorageError(
      `No se pudo eliminar la imagen: ${error.message}`,
      'delete'
    )
  }
}
