import { createContext, useContext, useReducer, type ReactNode, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

interface CartContextValue extends CartState {
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const initialState: CartState = { items: [] };

type Action =
  | { type: 'ADD'; product: Product }
  | { type: 'REMOVE'; id: string }
  | { type: 'UPDATE'; id: string; quantity: number }
  | { type: 'CLEAR' };

function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(i => i.id === action.product.id);
      if (existing) {
        return {
          items: state.items.map(i =>
            i.id === action.product.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        };
      }
      return { items: [...state.items, { ...action.product, quantity: 1 }] };
    }
    case 'REMOVE': {
      return { items: state.items.filter(i => i.id !== action.id) };
    }
    case 'UPDATE': {
      return {
        items: state.items.map(i =>
          i.id === action.id ? { ...i, quantity: Math.max(1, action.quantity) } : i
        )
      };
    }
    case 'CLEAR':
      return initialState;
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    try {
      const raw = localStorage.getItem('honeygo_cart');
      if (raw) return JSON.parse(raw) as CartState;
    } catch (_) { /* ignore */ }
    return initialState;
  });

  // Persist
  useEffect(() => {
    try { localStorage.setItem('honeygo_cart', JSON.stringify(state)); } catch (_) { /* ignore */ }
  }, [state]);

  const addToCart = (product: Product) => dispatch({ type: 'ADD', product });
  const removeFromCart = (id: string) => dispatch({ type: 'REMOVE', id });
  const updateQuantity = (id: string, quantity: number) => dispatch({ type: 'UPDATE', id, quantity });
  const clearCart = () => dispatch({ type: 'CLEAR' });

  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
