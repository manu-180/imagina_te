import { TopBar } from '@/components/admin/TopBar'
import { ProductForm } from '@/components/admin/ProductForm'
import { getAllCategories } from '@/lib/queries/categories'
import { getAllCollections } from '@/lib/queries/collections'

export const dynamic = 'force-dynamic'

export default async function NuevoProductoPage() {
  const [categories, collections] = await Promise.all([
    getAllCategories(),
    getAllCollections(),
  ])

  return (
    <>
      <TopBar title="Nuevo producto" description="Crear un producto desde cero" />
      <div className="p-6 lg:p-10">
        <ProductForm categories={categories} collections={collections} />
      </div>
    </>
  )
}
