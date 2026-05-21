import type { ReactNode } from 'react'
import { AnnouncementBar } from '@/components/store/AnnouncementBar'
import { Navbar } from '@/components/store/Navbar'
import { Footer } from '@/components/store/Footer'
import { CartDrawer } from '@/components/store/CartDrawer'
import { WhatsAppFloat } from '@/components/store/WhatsAppFloat'
import CartFlyEffect from '@/components/store/CartFlyEffect'

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main id="main" className="min-h-[60vh]">
        {children}
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppFloat />
      <CartFlyEffect />
    </>
  )
}
