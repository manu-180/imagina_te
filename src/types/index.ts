// =====================================================
// Tipos del dominio — Imagina Te Lencería
// =====================================================

export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  short_description: string | null
  care_instructions: string | null
  composition: string | null
  price: number
  compare_at_price: number | null
  category_id: string | null
  collection_id: string | null
  is_featured: boolean
  is_new: boolean
  is_bestseller: boolean
  status: 'active' | 'draft' | 'archived'
  rating_avg: number
  rating_count: number
  view_count: number
  created_at: string
  updated_at: string
  // Relaciones (cuando se hace join)
  images?: ProductImage[]
  variants?: ProductVariant[]
  category?: Category | null
  collection?: Collection | null
}

export interface ProductImage {
  id: string
  product_id: string
  url: string
  alt: string | null
  position: number
  is_primary: boolean
}

export interface ProductVariant {
  id: string
  product_id: string
  size: string
  cup: string | null
  color: string
  color_hex: string
  stock: number
  sku: string
  weight_grams: number
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  parent_id: string | null
  position: number
  created_at: string
}

export interface Collection {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  hero_image_url: string | null
  is_active: boolean
  season: string | null
  position: number
  created_at: string
}

export interface Review {
  id: string
  product_id: string
  customer_name: string
  customer_email: string | null
  rating: number
  title: string | null
  body: string | null
  size_purchased: string | null
  is_verified: boolean
  is_published: boolean
  photo_urls: string[] | null
  created_at: string
}

export interface SizeGuideEntry {
  id: string
  category: string
  size_label: string
  underbust_cm_min: number | null
  underbust_cm_max: number | null
  bust_cm_min: number | null
  bust_cm_max: number | null
  cup: string | null
  hip_cm_min: number | null
  hip_cm_max: number | null
  notes: string | null
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'paid'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'

export interface ShippingAddress {
  line1: string
  line2?: string
  city: string
  state: string
  postal_code: string
  country: string
}

export interface Order {
  id: string
  order_number: string
  customer_email: string
  customer_name: string
  customer_phone: string | null
  customer_dni: string | null
  subtotal: number
  shipping: number
  shipping_method: string | null
  discount: number
  total: number
  status: OrderStatus
  payment_method: string | null
  payment_status: string
  shipping_address: ShippingAddress | null
  discreet_packaging: boolean
  notes: string | null
  internal_notes: string | null
  created_at: string
  updated_at: string
  items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string | null
  variant_id: string | null
  product_name: string
  variant_size: string | null
  variant_cup: string | null
  variant_color: string | null
  product_image_url: string | null
  quantity: number
  unit_price: number
  line_total: number
}

export interface OrderAuditLogEntry {
  id: string
  order_id: string
  actor: string | null
  action: string
  from_value: Record<string, unknown> | null
  to_value: Record<string, unknown> | null
  notes: string | null
  created_at: string
}

export interface SiteSetting {
  id: string
  key: string
  value: unknown
  updated_at: string
}

// =====================================================
// Carrito (cliente)
// =====================================================

export interface CartItem {
  product: Pick<
    Product,
    'id' | 'name' | 'slug' | 'price' | 'compare_at_price'
  > & { image_url: string | null }
  variant: Pick<
    ProductVariant,
    'id' | 'size' | 'cup' | 'color' | 'color_hex' | 'stock' | 'sku'
  >
  quantity: number
}
