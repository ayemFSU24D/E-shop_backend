import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useEffect,
  useReducer,
} from "react";
import { CartItem } from "../models/cart/Cartitem";
import { CartReducer, ICartAction } from "../redusers/CartReduser";

// Typ för contexten
interface ICartContext {
  totalItems: number;
  cart: CartItem[];
  cartDispatch: Dispatch<ICartAction>;
}

// Skapa context
export const CartContext = createContext<ICartContext>({
  totalItems: 0,
  cart: [],
  cartDispatch: () => {},
});

// 🔄 Hämta initialt tillstånd från localStorage
const getInitialCartState = () => {
  const saved = localStorage.getItem("cart");
  if (saved) {
    const cart: CartItem[] = JSON.parse(saved);
    return {
      cart,
      totalItems: cart.reduce((sum, item) => sum + item.quantity, 0),
    };
  }
  return { cart: [], totalItems: 0 };
};

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [state, cartDispatch] = useReducer(
    CartReducer,
    undefined,
    getInitialCartState
  );

  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        totalItems: state.totalItems,
        cartDispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

