import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '@/types'

interface CartStore {
  items: CartItem[]
  isDrawerOpen: boolean
  addItem: (item: CartItem) => void
  removeItem: (variantId: string) => void
  updateQuantity: (variantId: string, quantity: number) => void
  clearCart: () => void
  openDrawer: () => void
  closeDrawer: () => void
  toggleDrawer: () => void
  getSubtotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,

      addItem: (item) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) => i.variant.id === item.variant.id
          )

          if (existingIndex > -1) {
            const updatedItems = [...state.items]
            const existing = updatedItems[existingIndex]
            const maxStock = item.variant.stock || 99
            updatedItems[existingIndex] = {
              ...existing,
              quantity: Math.min(existing.quantity + item.quantity, maxStock),
            }
            return { items: updatedItems }
          }

          return { items: [...state.items, item] }
        })
      },

      removeItem: (variantId) =>
        set((state) => ({
          items: state.items.filter((i) => i.variant.id !== variantId),
        })),

      updateQuantity: (variantId, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((i) => i.variant.id !== variantId),
            }
          }
          return {
            items: state.items.map((i) =>
              i.variant.id === variantId
                ? { ...i, quantity: Math.min(quantity, i.variant.stock || 99) }
                : i
            ),
          }
        })
      },

      clearCart: () => set({ items: [] }),

      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set((s) => ({ isDrawerOpen: !s.isDrawerOpen })),

      getSubtotal: () =>
        get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        ),

      getItemCount: () =>
        get().items.reduce((count, item) => count + item.quantity, 0),
    }),
    {
      name: 'imagina-te-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
)
