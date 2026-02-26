import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@shared/schema';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  cartCount: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      setIsOpen: (isOpen) => set({ isOpen }),
      
      addItem: (newItem) => set((state) => {
        const existingItem = state.items.find(i => i.productId === newItem.productId);
        if (existingItem) {
          return {
            items: state.items.map(i => 
              i.productId === newItem.productId 
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
            isOpen: true
          };
        }
        return { items: [...state.items, { ...newItem, quantity: 1 }], isOpen: true };
      }),
      
      removeItem: (productId) => set((state) => ({
        items: state.items.filter(i => i.productId !== productId)
      })),
      
      updateQuantity: (productId, quantity) => set((state) => ({
        items: quantity <= 0 
          ? state.items.filter(i => i.productId !== productId)
          : state.items.map(i => i.productId === productId ? { ...i, quantity } : i)
      })),
      
      clearCart: () => set({ items: [] }),
      
      cartTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
      },
      
      cartCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'frocone-cart',
      partialize: (state) => ({ items: state.items }), // Only persist items
    }
  )
);
