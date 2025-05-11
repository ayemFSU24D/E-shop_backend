import { CartItem } from "../models/cart/Cartitem";

export interface ICartAction {
    type: CartACtionType;
    payload: CartItem | any;
  }
  export interface CartState {
    cart: CartItem[];
    totalItems: number;
  }
  
  
  export enum CartACtionType  {
    ADD_ITEM,
    REMOVE_ITEM,
    CHANGE_QUANTITY,
    RESET_CART
  }
  
  export const CartReducer = (state: CartState, action: ICartAction) => {
    const { payload, type } = action;
  
    switch (type) {
      case CartACtionType.ADD_ITEM: {
        const itemExists = state.cart.find((item) => item.product.id === payload.product.id);
  
        const updatedCart = itemExists
          ? state.cart.map((item) =>
              item.product.id === payload.product.id
                ? { ...item, quantity: item.quantity + payload.quantity }
                : item
            )
          : [...state.cart, payload];
  
        // ✅ Spara till Local Storage
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return {
          cart: updatedCart,
          totalItems: updatedCart.reduce((sum, item) => sum + item.quantity, 0),
        };
      }
  
      case CartACtionType.REMOVE_ITEM: {
        const updatedCart = state.cart.filter((item) => item.product.id !== payload.product.id);
  
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return {
          cart: updatedCart,
          totalItems: updatedCart.reduce((sum, item) => sum + item.quantity, 0),
        };
      }
  
      case CartACtionType.CHANGE_QUANTITY: {
        const updatedCart = state.cart.map((item) =>
          item.product.id === payload.product.id
            ? {
                ...item,
                quantity: Math.max(item.quantity + payload.quantity, 1), // 🛑 Minimum är 1
              }
            : item
        );
  
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return {
          cart: updatedCart,
          totalItems: updatedCart.reduce((sum, item) => sum + item.quantity, 0),
        };

      }
  
      case CartACtionType.RESET_CART: {
        localStorage.removeItem("cart");
        return {
          cart: [],
          totalItems: 0,
        };
      }
      
      
      default:
       
        return state;
      }
  };

//-------------------------------------------------------------------
//-------------------------------------------------------------------
//--------------------------Edgars Lösning-----------------------------------------
//-------------------------------------------------------------------
//-------------------------------------------------------------------
//-------------------------------------------------------------------

//   "use client"

// import { useState, useEffect } from "react"
// import type { Product, CartItem } from "./db-types"
// import { useAuth } from "@/contexts/auth-context"

// export function useCart() {
//   const [cart, setCart] = useState<CartItem[]>([])
//   const [isLoaded, setIsLoaded] = useState(false)
//   const { user } = useAuth()

//   useEffect(() => {
//     const cartKey = user ? `cart_${user.id}` : "cart_guest"
//     const savedCart = localStorage.getItem(cartKey)
  
//     if (savedCart) {
//       try {
//         setCart(JSON.parse(savedCart))
//       } catch (e) {
//         console.error("Failed to parse cart from localStorage", e)
//       }
//     } else {
//       setCart([])
//     }
  
//     setIsLoaded(true)
//   }, [user])
  

//   useEffect(() => {
//     if (isLoaded) {
//       const cartKey = user ? `cart_${user.id}` : "cart_guest"
//       localStorage.setItem(cartKey, JSON.stringify(cart))
//     }
//   }, [cart, isLoaded, user])
  

//   const addToCart = (product: Product, quantity = 1) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((item) => item.product.id === product.id)

//       if (existingItem) {
//         return prevCart.map((item) =>
//           item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
//         )
//       } else {
//         return [...prevCart, { product, quantity }]
//       }
//     })
//   }

//   const removeFromCart = (productId: number) => {
//     setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId))
//   }

//   const updateQuantity = (productId: number, quantity: number) => {
//     if (quantity <= 0) {
//       removeFromCart(productId)
//       return
//     }

//     setCart((prevCart) => prevCart.map((item) => (item.product.id === productId ? { ...item, quantity } : item)))
//   }

//   const clearCart = () => {
//     setCart([])
//   }

//   const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

//   const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

//   return {
//     cart,
//     addToCart,
//     removeFromCart,
//     updateQuantity,
//     clearCart,
//     totalPrice,
//     totalItems,
//     isLoaded,
//   }
// }
  