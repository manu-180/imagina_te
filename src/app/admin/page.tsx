import { DollarSign, ShoppingBag, Package, Star } from 'lucide-react'
import { TopBar } from '@/components/admin/TopBar'
import { StatsCard } from '@/components/admin/StatsCard'
import { RevenueChart } from '@/components/admin/RevenueChart'
import { OrdersDonut } from '@/components/admin/OrdersDonut'
import { TopProducts } from '@/components/admin/TopProducts'
import { getOrderStats, getTopProducts } from '@/lib/queries/orders'
import { getAllProducts } from '@/lib/queries/products'
import { formatPriceARS } from '@/lib/utils'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const supabase = createClient()
  const [stats, topProducts, products, { count: pendingReviews }] =
    await Promise.all([
      getOrderStats(),
      getTopProducts(5),
      getAllProducts(),
      supabase
        .from('lenceria_reviews')
        .select('id', { count: 'exact', head: true })
        .eq('is_published', false),
    ])

  return (
    <>
      <TopBar
        title="Dashboard"
        description={`Hoy ${new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}`}
      />
      <div className="p-6 lg:p-10 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            label="Ingresos (30d)"
            value={formatPriceARS(stats.totalRevenue)}
            icon={DollarSign}
            accent="champagne"
          />
          <StatsCard
            label="Órdenes (30d)"
            value={stats.totalOrders}
            icon={ShoppingBag}
            accent="ink"
          />
          <StatsCard
            label="Productos activos"
            value={products.filter((p) => p.status === 'active').length}
            icon={Package}
            accent="rose"
          />
          <StatsCard
            label="Reviews pendientes"
            value={pendingReviews ?? 0}
            icon={Star}
            accent="success"
          />
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <RevenueChart data={stats.dailyRevenue} />
          <OrdersDonut byStatus={stats.byStatus} />
        </div>

        {/* Top products */}
        <TopProducts products={topProducts} />
      </div>
    </>
  )
}
