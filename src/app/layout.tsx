import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter, Italiana } from 'next/font/google'
import { Toaster } from 'sonner'
import { getSiteConfig } from '@/lib/site-config'
import { SiteConfigProvider } from '@/lib/site-config-context'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const italiana = Italiana({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-italiana',
  display: 'swap',
})

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: {
    default: 'Imagina te · Lencería premium argentina',
    template: '%s · Imagina te',
  },
  description:
    'Lencería premium argentina pensada para vos, primero. Encaje, satén, microfibra. Envío discreto a todo el país.',
  keywords: [
    'lencería',
    'lenceria',
    'corpiños',
    'bombachas',
    'conjuntos íntimos',
    'pijamas',
    'imagina te',
    'lencería argentina',
  ],
  openGraph: {
    title: 'Imagina te · Lencería premium argentina',
    description: 'Renueva tu interior. Lencería premium con envío discreto a todo el país.',
    type: 'website',
    locale: 'es_AR',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const config = await getSiteConfig()

  return (
    <html
      lang="es-AR"
      className={`${cormorant.variable} ${inter.variable} ${italiana.variable}`}
    >
      <body className="font-body bg-cream text-ink">
        <a href="#main" className="skip-link">
          Saltar al contenido
        </a>
        <SiteConfigProvider config={config}>
          {children}
          <Toaster
            position="bottom-center"
            theme="dark"
            toastOptions={{
              classNames: {
                toast: 'sonner-toast',
              },
              style: {
                background: '#0E0B0A',
                color: '#F5EFE7',
                border: '1px solid #C9A96E',
                borderRadius: '0',
                fontFamily: 'var(--font-inter)',
              },
            }}
          />
        </SiteConfigProvider>
      </body>
    </html>
  )
}
