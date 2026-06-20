import Link from 'next/link'
import { Instagram, MapPin, Phone, MessageCircle } from 'lucide-react'
import { Logo } from './Logo'
import {
  CONTACT_ADDRESS,
  CONTACT_INSTAGRAM,
  CONTACT_PHONE,
  CONTACT_WHATSAPP_NUMBER,
} from '@/lib/constants'

const TIENDA_LINKS = [
  { href: '/productos', label: 'Todos los productos' },
  { href: '/colecciones', label: 'Colecciones' },
  { href: '/productos?categoria=corpinos', label: 'Corpiños' },
  { href: '/productos?categoria=conjuntos', label: 'Conjuntos' },
  { href: '/productos?categoria=ropa-de-dormir', label: 'Ropa de dormir' },
]

const AYUDA_LINKS = [
  { href: '/guia-talles', label: 'Guía de talles' },
  { href: '/envios-devoluciones', label: 'Envíos y devoluciones' },
  { href: '/contacto', label: 'Contacto' },
  { href: '/nosotros', label: 'Nosotros' },
]

const LEGAL_LINKS = [
  { href: '/legales/terminos', label: 'Términos y condiciones' },
  { href: '/legales/privacidad', label: 'Política de privacidad' },
]

export function Footer() {
  return (
    <footer className="bg-ink text-cream pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-12">
          {/* Marca */}
          <div className="col-span-2 md:col-span-1">
            <Logo variant="horizontal" size="md" textColor="#F5EFE7" />
            <p className="mt-4 text-sm text-warm-gray-300 leading-relaxed max-w-xs">
              Lencería pensada para vos, primero. Diseños premium, hechos en Argentina con materiales nobles.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={CONTACT_INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 inline-flex items-center justify-center border border-warm-gray-500 hover:border-champagne hover:text-champagne transition-colors"
              >
                <Instagram size={16} strokeWidth={1.5} />
              </a>
              <a
                href={`https://wa.me/${CONTACT_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 inline-flex items-center justify-center border border-warm-gray-500 hover:border-champagne hover:text-champagne transition-colors"
              >
                <MessageCircle size={16} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Tienda */}
          <div>
            <h3 className="text-[11px] uppercase tracking-eyebrow text-champagne font-medium mb-4">
              Tienda
            </h3>
            <ul className="space-y-2.5">
              {TIENDA_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-warm-gray-300 hover:text-cream transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <h3 className="text-[11px] uppercase tracking-eyebrow text-champagne font-medium mb-4">
              Ayuda
            </h3>
            <ul className="space-y-2.5">
              {AYUDA_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-warm-gray-300 hover:text-cream transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-[11px] uppercase tracking-eyebrow text-champagne font-medium mb-4">
              Contacto
            </h3>
            <ul className="space-y-3 text-sm text-warm-gray-300">
              <li className="flex items-start gap-2">
                <MapPin size={14} strokeWidth={1.5} className="mt-0.5 flex-shrink-0" />
                <span>{CONTACT_ADDRESS}</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={14} strokeWidth={1.5} className="mt-0.5 flex-shrink-0" />
                <a
                  href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`}
                  className="hover:text-cream transition-colors"
                >
                  {CONTACT_PHONE}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Instagram size={14} strokeWidth={1.5} className="mt-0.5 flex-shrink-0" />
                <a
                  href={CONTACT_INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cream transition-colors"
                >
                  @lenceria_imaginate
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-14 pt-8 border-t border-warm-gray-500/40 flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <p className="text-xs text-warm-gray-500">
            © {new Date().getFullYear()} Imagina te. Todos los derechos reservados.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <div className="flex gap-5">
              {LEGAL_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-xs text-warm-gray-500 hover:text-cream transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <span
              aria-hidden="true"
              className="hidden h-3 w-px bg-warm-gray-500/40 sm:block"
            />
            <a
              href="https://www.theapexweb.com"
              target="_blank"
              rel="noopener"
              aria-label="Un proyecto de APEX — desarrollo web (theapexweb.com)"
              className="group inline-flex items-center gap-2 text-xs text-warm-gray-500 transition-colors hover:text-cream motion-reduce:transition-none"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-[18px] w-[18px] items-center justify-center border border-warm-gray-500/70 text-[9px] font-medium text-warm-gray-300 transition-colors group-hover:border-champagne group-hover:text-champagne motion-reduce:transition-none"
              >
                A
              </span>
              <span>
                Un proyecto de{" "}
                <span className="text-warm-gray-300 transition-colors group-hover:text-champagne">
                  APEX
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
