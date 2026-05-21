export interface SiteConfig {
  store_name: string
  store_tagline: string
  store_currency: string
  free_shipping_threshold: number
  announcement_bar: { text: string; active: boolean }
  brand_colors: { primary: string; accent: string; ink: string; cream: string }
  contact_phone: string
  contact_address: string
  instagram_url: string
  whatsapp_number: string
}

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  store_name: 'Imagina te',
  store_tagline: 'Renueva tu interior',
  store_currency: 'ARS',
  free_shipping_threshold: 35000,
  announcement_bar: {
    text: 'Envío gratis a todo el país en compras desde $35.000',
    active: true,
  },
  brand_colors: {
    primary: '#C9A96E',
    accent: '#C99E9A',
    ink: '#0E0B0A',
    cream: '#F5EFE7',
  },
  contact_phone: '+54 9 11 6175-5668',
  contact_address: 'Bynnon 3623 esq. Martín Arín',
  instagram_url: 'https://instagram.com/lenceria_imaginate',
  whatsapp_number: '5491161755668',
}
