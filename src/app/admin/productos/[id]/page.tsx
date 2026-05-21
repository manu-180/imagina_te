import { notFound } from 'next/navigation'
import { TopBar } from '@/components/admin/TopBar'
import { ProductForm } from '@/components/admin/ProductForm'
import { getAllCategories } from '@/lib/queries/categories'
import { getAllCollections } from '@/lib/queries/collections'
import { getProductById } from '@/lib/queries/products'

export const dynamic = 'force-dynamic'

interface Props {
  params: { id: string }
}

export default async function EditarProductoPage({ params }: Props) {
  const [product, categories, collections] = await Promise.all([
    getProductById(params.id),
    getAllCategories(),
    getAllCollections(),
  ])

  if (!product) notFound()

  return (
    <>
      <TopBar
        title={product.name}
        description={`/${product.slug}`}
      />
      <div className="p-6 lg:p-10">
        <ProductForm
          product={product}
          categories={categories}
          collections={collections}
        />
      </div>
    </>
  )
}
