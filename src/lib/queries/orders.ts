import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'
import type { Order, OrderItem, OrderAuditLogEntry } from '@/types'

export async function getOrderByNumber(
  orderNumber: string
): Promise<(Order & { items: OrderItem[] }) | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('lenceria_orders')
    .select(`
      *,
      items:lenceria_order_items(*)
    `)
    .eq('order_number', orderNumber)
    .maybeSingle()

  if (error) {
    console.error('[getOrderByNumber]', error)
    return null
  }
  return data as (Order & { items: OrderItem[] }) | null
}

export async function getOrderById(
  id: string
): Promise<(Order & { items: OrderItem[] }) | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('lenceria_orders')
    .select(`
      *,
      items:lenceria_order_items(*)
    `)
    .eq('id', id)
    .maybeSingle()

  if (error) {
    console.error('[getOrderById]', error)
    return null
  }
  return data as (Order & { items: OrderItem[] }) | null
}

export const getAllOrders = cache(async (): Promise<Order[]> => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('lenceria_orders')
    .select(`
      *,
      items:lenceria_order_items(*)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[getAllOrders]', error)
    return []
  }
  return (data ?? []) as Order[]
})

export const getOrderAuditLog = cache(
  async (orderId: string): Promise<OrderAuditLogEntry[]> => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('lenceria_order_audit_log')
      .select('*')
      .eq('order_id', orderId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[getOrderAuditLog]', error)
      return []
    }
    return (data ?? []) as OrderAuditLogEntry[]
  }
)

export const getOrderStats = cache(async () => {
  const supabase = createClient()
  const since = new Date()
  since.setDate(since.getDate() - 30)

  const { data: orders } = await supabase
    .from('lenceria_orders')
    .select('id, status, total, created_at')

  const all = orders ?? []
  const last30 = all.filter((o) => new Date(o.created_at) >= since)
  const totalRevenue = last30.reduce((sum, o) => sum + Number(o.total ?? 0), 0)
  const totalOrders = last30.length

  const byStatus: Record<string, number> = {}
  all.forEach((o) => {
    byStatus[o.status] = (byStatus[o.status] ?? 0) + 1
  })

  // Revenue diario para chart
  const dailyRevenue: { date: string; revenue: number; orders: number }[] = []
  const daysMap = new Map<string, { revenue: number; orders: number }>()
  for (let i = 29; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = d.toISOString().slice(0, 10)
    daysMap.set(key, { revenue: 0, orders: 0 })
  }
  last30.forEach((o) => {
    const key = new Date(o.created_at).toISOString().slice(0, 10)
    const entry = daysMap.get(key)
    if (entry) {
      entry.revenue += Number(o.total ?? 0)
      entry.orders += 1
    }
  })
  daysMap.forEach((v, k) => dailyRevenue.push({ date: k, ...v }))

  return {
    totalRevenue,
    totalOrders,
    byStatus,
    dailyRevenue,
  }
})

export const getTopProducts = cache(async (limit = 5) => {
  const supabase = createClient()
  const { data } = await supabase
    .from('lenceria_order_items')
    .select('product_id, product_name, quantity, line_total')

  const map = new Map<string, { name: string; quantity: number; revenue: number }>()
  ;(data ?? []).forEach((item) => {
    if (!item.product_id) return
    const cur = map.get(item.product_id)
    if (cur) {
      cur.quantity += item.quantity
      cur.revenue += Number(item.line_total ?? 0)
    } else {
      map.set(item.product_id, {
        name: item.product_name ?? 'Producto',
        quantity: item.quantity,
        revenue: Number(item.line_total ?? 0),
      })
    }
  })

  return Array.from(map.entries())
    .map(([id, v]) => ({ id, ...v }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, limit)
})
