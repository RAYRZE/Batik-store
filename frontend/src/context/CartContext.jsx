import { useEffect, useMemo, useReducer } from "react";
import { CartContext } from "./cartContext";

const STORAGE_KEY = "batik_store_cart";

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Ignore storage failures (e.g. private mode / quota).
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity = 1 } = action;

      if (!product || product.stock <= 0) {
        return state;
      }

      const existing = state.find((item) => item.product.id === product.id);

      if (existing) {
        const nextQuantity = Math.min(
          existing.quantity + quantity,
          product.stock,
        );
        return state.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: nextQuantity }
            : item,
        );
      }

      const safeQuantity = Math.max(1, Math.min(quantity, product.stock));
      return [...state, { product, quantity: safeQuantity }];
    }

    case "REMOVE_ITEM":
      return state.filter((item) => item.product.id !== action.productId);

    case "UPDATE_QUANTITY": {
      const item = state.find(
        (entry) => entry.product.id === action.productId,
      );

      if (!item) {
        return state;
      }

      const raw = Number.isInteger(action.quantity)
        ? action.quantity
        : item.quantity;

      if (raw <= 0) {
        return state.filter(
          (entry) => entry.product.id !== action.productId,
        );
      }

      const safeQuantity = Math.min(raw, item.product.stock);
      return state.map((entry) =>
        entry.product.id === action.productId
          ? { ...entry, quantity: safeQuantity }
          : entry,
      );
    }

    case "CLEAR":
      return [];

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, loadCart);

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const value = useMemo(() => {
    const addItem = (product, quantity) =>
      dispatch({ type: "ADD_ITEM", product, quantity });

    const removeItem = (productId) =>
      dispatch({ type: "REMOVE_ITEM", productId });

    const updateQuantity = (productId, quantity) =>
      dispatch({ type: "UPDATE_QUANTITY", productId, quantity });

    const clearCart = () => dispatch({ type: "CLEAR" });

    const subtotal = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

    return {
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      subtotal,
      total: subtotal,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
