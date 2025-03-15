import { Product } from "../services/FakeStore/fakeStore";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartProduct {
  product: Product;
  quantity: number;
}

interface ShoppingCartState {
  open: boolean;
  toggleOpenCart: () => void;
  showCart: () => void;
  hideCart: () => void;
  items: CartProduct[];
  getTotal: () => number;
  addItemToCart: (item: Product) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
}

const useShoppingCart = create(
  persist<ShoppingCartState>(
    (set, get) => ({
      open: false,
      items: [],

      showCart: () => {
        set({ open: true });
      },

      hideCart: () => {
        set({ open: false });
      },

      toggleOpenCart: () => {
        set({ open: !get().open });
      },

      getTotal: () => {
        let total = 0;

        const allItems = get().items;

        for (let index = 0; index < allItems.length; index++) {
          const item = allItems[index];
          total += item.quantity * item.product.price;
        }

        return total;
      },

      addItemToCart: (item) => {
        const itemExists = get().items.find(
          (cartItem) => cartItem.product.id === item.id
        );

        if (itemExists) {
          if (typeof itemExists.quantity === "number") {
            itemExists.quantity++;
          }

          set({ items: [...get().items] });
        } else {
          set({ items: [...get().items, { product: item, quantity: 1 }] });
        }
      },

      increaseQuantity: (productId) => {
        const itemExists = get().items.find(
          (item) => item.product.id === productId
        );

        if (itemExists) {
          if (typeof itemExists.quantity === "number") {
            itemExists.quantity++;
          }

          set({ items: [...get().items] });
        }
      },

      decreaseQuantity: (productId) => {
        const itemExists = get().items.find(
          (item) => item.product.id === productId
        );

        if (itemExists) {
          if (typeof itemExists.quantity === "number") {
            if (itemExists.quantity === 1) {
              const updatedCartItems = get().items.filter(
                (item) => item.product.id !== productId
              );
              set({ items: updatedCartItems });
            } else {
              itemExists.quantity--;
              set({ items: [...get().items] });
            }
          }
        }
      },

      clearCart: () => {
        set({ items: [], open: false });
      },
    }),
    {
      name: "shopping-cart-items",
    }
  )
);

export default useShoppingCart;
