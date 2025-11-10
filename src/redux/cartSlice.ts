import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartState, Product } from "./types";

const initialState: CartState = {
  items: [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<CartState | any>) {
      // Asegurarse de que siempre haya un array de items
      const payload = action.payload;
      if (Array.isArray(payload)) {
        // Si payload es un array, asumimos que son los items
        state.items = payload;
      } else if (payload && typeof payload === 'object') {
        // Si payload es un objeto con items
        state.items = payload.items || [];
        state.isOpen = payload.isOpen ?? state.isOpen;
      } else {
        // Fallback: mantener estado actual
        state.items = state.items || [];
      }
    },

    addToCart: (
      state,
      action: PayloadAction<{ product: Product; quantity?: number }>
    ) => {
      const { product, quantity = 1 } = action.payload;
      const productKey = String(product.id);
      const existingItem = state.items.find(
        (item) => String(item.product.id) === productKey
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ product, quantity });
      }
    },
    removeFromCart: (state, action: PayloadAction<string | number>) => {
      const key = action.payload;
      const normalized = String(key);
      state.items = state.items.filter(
        (item) => String(item.product.id) !== normalized
      );
    },

    decreaseQuantity(state, action: PayloadAction<{ productKey: string; amount?: number }>) {
      const amount = action.payload.amount ?? 1;
      const key = String(action.payload.productKey);
      const it = state.items.find((i) => String(i.product.id) === key);
      if (!it) return;
      it.quantity -= amount;
      if (it.quantity <= 0) {
        state.items = state.items.filter((i) => String(i.product.id) !== key);
      }
    },
    increaseQuantity(state, action: PayloadAction<{ productKey: string; amount?: number }>) {
      const amount = action.payload.amount ?? 1; 
      const key = String(action.payload.productKey);
      const item = state.items.find(i => String(i.product?.id ?? i.product?.title) === key);
      if (!item) return;

      item.quantity += amount;
    },

    clearCart: (state) => {
      state.items = [];
    },

    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const shoppingCartSelect = (state: { cart: CartState }) => state.cart;
export const { setCart, addToCart, removeFromCart, clearCart, setCartOpen, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;

