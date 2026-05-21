import { HeroSection } from '@/components/store/HeroSection'
import { CategoriesGrid } from '@/components/store/CategoriesGrid'
import { FeaturedProducts } from '@/components/store/FeaturedProducts'
import { EditorialSection } from '@/components/store/EditorialSection'
import { BestSellers } from '@/components/store/BestSellers'
import { ReviewsCarousel } from '@/components/store/ReviewsCarousel'
import { BenefitsStrip } from '@/components/store/BenefitsStrip'
import { InstagramFeed } from '@/components/store/InstagramFeed'
import { NewsletterCTA } from '@/components/store/NewsletterCTA'
import {
  getFeaturedProducts,
  getBestsellerProducts,
  getNewArrivals,
} from '@/lib/queries/products'
import { getAllCategories } from '@/lib/queries/categories'
import { getAllCollections } from '@/lib/queries/collections'
import { getFeaturedReviews } from '@/lib/queries/reviews'

// Forzar layout transparente sobre hero
import { Navbar } from '@/components/store/Navbar'

export default async function HomePage() {
  const [featured, bestsellers, newProducts, categories, collections, reviews] =
    await Promise.all([
      getFeaturedProducts(4),
      getBestsellerProducts(8),
      getNewArrivals(8),
      getAllCategories(),
      getAllCollections(),
      getFeaturedReviews(8),
    ])

  // Colección destacada (segunda en la lista)
  const featuredCollection = collections[1] ?? collections[0]

  return (
    <>
      {/* Hack: el Navbar default ya está en el layout, pero queremos transparencia.
          DECISION: Renderizamos un Navbar transparente acá que se solapa con el del layout.
          La forma correcta es manejar transparencia via Navbar prop + context.
          Para esta demo, dejamos el Navbar del layout en modo no transparente y
          el hero respira con padding extra. */}
      <HeroSection />
      <CategoriesGrid categories={categories} limit={4} />
      <FeaturedProducts
        products={featured.length > 0 ? featured : newProducts.slice(0, 4)}
        title="Nuestros favoritos"
        eyebrow="Curaduría"
      />
      {featuredCollection && <EditorialSection collection={featuredCollection} />}
      <BestSellers products={bestsellers.length > 0 ? bestsellers : newProducts} />
      <ReviewsCarousel reviews={reviews} />
      <BenefitsStrip />
      <InstagramFeed />
      <NewsletterCTA />
    </>
  )
}
