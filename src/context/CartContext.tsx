import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import type { Product } from '@/types';

export interface CartLine {
  id: string;                     // composite: productId-color-size
  product: Product;
  colorId: string;
  sizeId: string;
  quantity: number;
}

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD'; product: Product; colorId: string; sizeId: string; quantity?: number }
  | { type: 'REMOVE'; lineId: string }
  | { type: 'UPDATE_QTY'; lineId: string; quantity: number }
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'CLEAR' };

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const id = `${action.product.id}-${action.colorId}-${action.sizeId}`;
      const existing = state.lines.find((l) => l.id === id);
      if (existing) {
        return {
          ...state,
          isOpen: true,
          lines: state.lines.map((l) =>
            l.id === id ? { ...l, quantity: l.quantity + (action.quantity ?? 1) } : l,
          ),
        };
      }
      return {
        ...state,
        isOpen: true,
        lines: [
          ...state.lines,
          {
            id,
            product: action.product,
            colorId: action.colorId,
            sizeId: action.sizeId,
            quantity: action.quantity ?? 1,
          },
        ],
      };
    }
    case 'REMOVE':
      return { ...state, lines: state.lines.filter((l) => l.id !== action.lineId) };
    case 'UPDATE_QTY':
      return {
        ...state,
        lines: state.lines
          .map((l) =>
            l.id === action.lineId ? { ...l, quantity: Math.max(1, action.quantity) } : l,
          )
          .filter((l) => l.quantity > 0),
      };
    case 'OPEN':
      return { ...state, isOpen: true };
    case 'CLOSE':
      return { ...state, isOpen: false };
    case 'CLEAR':
      return { ...state, lines: [] };
    default:
      return state;
  }
}

interface CartContextValue extends CartState {
  add: (product: Product, colorId: string, sizeId: string, quantity?: number) => void;
  remove: (lineId: string) => void;
  updateQty: (lineId: string, quantity: number) => void;
  open: () => void;
  close: () => void;
  clear: () => void;
  subtotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

/** Seed an empty cart for demo. */
const INITIAL_STATE: CartState = { lines: [], isOpen: false };

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const add = useCallback(
    (product: Product, colorId: string, sizeId: string, quantity = 1) =>
      dispatch({ type: 'ADD', product, colorId, sizeId, quantity }),
    [],
  );
  const remove = useCallback((lineId: string) => dispatch({ type: 'REMOVE', lineId }), []);
  const updateQty = useCallback(
    (lineId: string, quantity: number) => dispatch({ type: 'UPDATE_QTY', lineId, quantity }),
    [],
  );
  const open = useCallback(() => dispatch({ type: 'OPEN' }), []);
  const close = useCallback(() => dispatch({ type: 'CLOSE' }), []);
  const clear = useCallback(() => dispatch({ type: 'CLEAR' }), []);

  const subtotal = useMemo(
    () => state.lines.reduce((sum, l) => sum + l.product.price * l.quantity, 0),
    [state.lines],
  );
  const itemCount = useMemo(
    () => state.lines.reduce((sum, l) => sum + l.quantity, 0),
    [state.lines],
  );

  const value = useMemo<CartContextValue>(
    () => ({ ...state, add, remove, updateQty, open, close, clear, subtotal, itemCount }),
    [state, add, remove, updateQty, open, close, clear, subtotal, itemCount],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
