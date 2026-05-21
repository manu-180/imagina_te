/** Constantes de marca y configuración */

export const SITE_NAME = 'Imagina te'
export const SITE_TAGLINE = 'Renueva tu interior'
export const SITE_BRAND_HEART = '♥'

export const FREE_SHIPPING_THRESHOLD = 35000

export const SHIPPING_OPTIONS = [
  {
    id: 'andreani-estandar',
    label: 'Andreani Estándar',
    description: '3-5 días hábiles',
    price: 4500,
  },
  {
    id: 'andreani-express',
    label: 'Andreani Express',
    description: '1-2 días hábiles',
    price: 7800,
  },
  {
    id: 'oca',
    label: 'OCA',
    description: '3-5 días hábiles',
    price: 4200,
  },
  {
    id: 'retiro-local',
    label: 'Retiro en local',
    description: 'Bynnon 3623 esq. Martín Arín',
    price: 0,
  },
] as const

export const PAYMENT_METHODS = [
  {
    id: 'mercado-pago',
    label: 'Mercado Pago',
    description: 'Tarjeta, débito y cuotas sin interés',
  },
  {
    id: 'transferencia',
    label: 'Transferencia bancaria',
    description: '10% off pagando por transferencia',
  },
  {
    id: 'tarjeta',
    label: 'Tarjeta directa',
    description: 'Visa, Mastercard, Amex',
  },
] as const

export const PROVINCIAS_AR = [
  'Buenos Aires',
  'CABA',
  'Catamarca',
  'Chaco',
  'Chubut',
  'Córdoba',
  'Corrientes',
  'Entre Ríos',
  'Formosa',
  'Jujuy',
  'La Pampa',
  'La Rioja',
  'Mendoza',
  'Misiones',
  'Neuquén',
  'Río Negro',
  'Salta',
  'San Juan',
  'San Luis',
  'Santa Cruz',
  'Santa Fe',
  'Santiago del Estero',
  'Tierra del Fuego',
  'Tucumán',
] as const

export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: 'Pendiente',
  confirmed: 'Confirmado',
  paid: 'Pagado',
  shipped: 'Enviado',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
  refunded: 'Reembolsado',
}

export const ORDER_STATUS_COLORS: Record<string, string> = {
  pending: 'bg-warm-gray-100 text-soft-black',
  confirmed: 'bg-blush text-burgundy',
  paid: 'bg-success/15 text-success',
  shipped: 'bg-champagne/30 text-soft-black',
  delivered: 'bg-success text-cream',
  cancelled: 'bg-warm-gray-300 text-noir',
  refunded: 'bg-error/15 text-error',
}

export const CONTACT_PHONE = '+54 9 11 6175-5668'
export const CONTACT_WHATSAPP_NUMBER = '5491161755668'
export const CONTACT_INSTAGRAM = 'https://instagram.com/lenceria_imaginate'
export const CONTACT_ADDRESS = 'Bynnon 3623 esq. Martín Arín'
export const CONTACT_EMAIL = 'hola@imaginate-lenceria.com.ar'
