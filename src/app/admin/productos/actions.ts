'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export interface ProductFormData {
  id?: string
  name: string
  slug: string
  description: string
  short_description: string
  care_instructions: string
  composition: string
  price: number
  compare_at_price: number | null
  category_id: string | null
  collection_id: string | null
  is_featured: boolean
  is_new: boolean
  is_bestseller: boolean
  status: 'active' | 'draft' | 'archived'
  images: { url: string; alt: string; position: number; is_primary: boolean }[]
  variants: {
    id?: string
    size: string
    cup: string | null
    color: string
    color_hex: string
    stock: number
    sku: string
  }[]
}

export async function upsertProduct(formData: ProductFormData) {
  const supabase = createClient()

  const productPayload = {
    name: formData.name,
    slug: formData.slug,
    description: formData.description || null,
    short_description: formData.short_description || null,
    care_instructions: formData.care_instructions || null,
    composition: formData.composition || null,
    price: formData.price,
    compare_at_price: formData.compare_at_price,
    category_id: formData.category_id,
    collection_id: formData.collection_id,
    is_featured: formData.is_featured,
    is_new: formData.is_new,
    is_bestseller: formData.is_bestseller,
    status: formData.status,
  }

  let productId = formData.id

  if (productId) {
    const { error } = await supabase
      .from('lenceria_products')
      .update(productPayload)
      .eq('id', productId)
    if (error) return { error: error.message }
  } else {
    const { data, error } = await supabase
      .from('lenceria_products')
      .insert(productPayload)
      .select('id')
      .single()
    if (error || !data) return { error: error?.message ?? 'No se pudo crear' }
    productId = data.id
  }

  // Imágenes — borrar y reinsertar
  if (productId) {
    await supabase.from('lenceria_product_images').delete().eq('product_id', productId)
    if (formData.images.length > 0) {
      await supabase.from('lenceria_product_images').insert(
        formData.images.map((img) => ({
          product_id: productId!,
          url: img.url,
          alt: img.alt,
          position: img.position,
          is_primary: img.is_primary,
        }))
      )
    }

    // Variantes — más cuidadoso (no romper FKs en order_items)
    // Estrategia: borrar variantes sin order_items, upsert el resto
    const incomingIds = formData.variants.map((v) => v.id).filter(Boolean) as string[]
    if (incomingIds.length > 0) {
      await supabase
        .from('lenceria_product_variants')
        .delete()
        .eq('product_id', productId)
        .not('id', 'in', `(${incomingIds.map((i) => `'${i}'`).join(',')})`)
    } else {
      await supabase
        .from('lenceria_product_variants')
        .delete()
        .eq('product_id', productId)
    }

    for (const v of formData.variants) {
      const payload = {
        product_id: productId,
        size: v.size,
        cup: v.cup,
        color: v.color,
        color_hex: v.color_hex,
        stock: v.stock,
        sku: v.sku,
      }
      if (v.id) {
        await supabase
          .from('lenceria_product_variants')
          .update(payload)
          .eq('id', v.id)
      } else {
        await supabase.from('lenceria_product_variants').insert(payload)
      }
    }
  }

  revalidatePath('/admin/productos')
  revalidatePath(`/productos/${formData.slug}`)
  revalidatePath('/productos')

  return { success: true, productId }
}

export async function deleteProduct(id: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('lenceria_products')
    .update({ status: 'archived' })
    .eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/productos')
  return { success: true }
}

export async function updateOrderStatus(
  orderId: string,
  newStatus: string,
  notes: string | null
) {
  const supabase = createClient()
  const { data: order } = await supabase
    .from('lenceria_orders')
    .select('status')
    .eq('id', orderId)
    .single()

  const { error } = await supabase
    .from('lenceria_orders')
    .update({ status: newStatus })
    .eq('id', orderId)

  if (error) return { error: error.message }

  const { data: user } = await supabase.auth.getUser()
  await supabase.from('lenceria_order_audit_log').insert({
    order_id: orderId,
    actor: user.user?.email ?? 'admin',
    action: 'status_change',
    from_value: { status: order?.status },
    to_value: { status: newStatus },
    notes,
  })

  revalidatePath('/admin/ordenes')
  revalidatePath(`/admin/ordenes/${orderId}`)
  return { success: true }
}

export async function updateReviewStatus(
  reviewId: string,
  isPublished: boolean,
  isVerified?: boolean
) {
  const supabase = createClient()
  const update: { is_published: boolean; is_verified?: boolean } = {
    is_published: isPublished,
  }
  if (isVerified !== undefined) update.is_verified = isVerified

  const { error } = await supabase
    .from('lenceria_reviews')
    .update(update)
    .eq('id', reviewId)

  if (error) return { error: error.message }
  revalidatePath('/admin/reviews')
  return { success: true }
}

export async function updateSiteSetting(key: string, value: unknown) {
  const supabase = createClient()
  const { data: existing } = await supabase
    .from('lenceria_site_settings')
    .select('id')
    .eq('key', key)
    .maybeSingle()

  if (existing) {
    await supabase
      .from('lenceria_site_settings')
      .update({ value, updated_at: new Date().toISOString() })
      .eq('id', existing.id)
  } else {
    await supabase.from('lenceria_site_settings').insert({ key, value })
  }

  revalidatePath('/')
  revalidatePath('/admin/configuracion')
  return { success: true }
}
