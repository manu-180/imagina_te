import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <p className="font-accent text-base tracking-eyebrow uppercase text-champagne mb-3">
        404
      </p>
      <h1 className="font-display italic text-5xl md:text-6xl text-ink mb-4">
        No encontramos lo que buscás
      </h1>
      <p className="text-warm-gray-500 max-w-md mb-8">
        Esta página no existe o se movió. Volvé al inicio y te ayudamos a encontrar lo que necesitás.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center h-12 px-8 bg-ink text-cream text-[12px] uppercase tracking-eyebrow font-medium hover:bg-champagne hover:text-ink transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
