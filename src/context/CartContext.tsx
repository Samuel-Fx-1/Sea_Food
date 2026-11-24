import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { CartItem } from '../types';
import { readCart, writeCart } from '../utils/bookingStorage';

interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>(() => readCart());

  useEffect(() => {
    writeCart(items);
  }, [items]);

  const addItem = useCallback((item: CartItem): void => {
    setItems((current) => [
      ...current.filter((existing) => existing.id !== item.id),
      item,
    ]);
  }, []);

  const removeItem = useCallback((id: string): void => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback((): void => {
    setItems([]);
  }, []);

  const value = useMemo<CartContextValue>(() => {
    return {
      items,
      count: items.reduce((total, item) => total + item.quantity, 0),
      total: items.reduce(
        (total, item) => total + item.unitPrice * item.quantity,
        0,
      ),
      addItem,
      removeItem,
      clearCart,
    };
  }, [items, addItem, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
}
