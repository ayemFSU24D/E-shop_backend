import { createContext, Dispatch, PropsWithChildren, useReducer } from "react";
import { CartItem } from "../models/cart/Cartitem";
import { CartReducer, ICartAction } from "../redusers/CartReduser";



interface ICartContext{
   totalItems: number;
    cart:CartItem[];
    cartDispatch:Dispatch<ICartAction>

}



export const CartContext=createContext<ICartContext>({
  totalItems: 0,
    cart:[],
    cartDispatch:()=>{
        return;
    }
})
const initialCartState = {
  cart: [],
  totalItems: 0,
};

export const CartProvider = ({children}: PropsWithChildren) => {
    const [ state, cartDispatch] = useReducer(CartReducer, initialCartState);
  
    return (
      <CartContext.Provider value={{cart: state.cart,
        totalItems: state.totalItems, cartDispatch}}>
        {/* // RouterProvider comes in here though children */}
        {children} 
      </CartContext.Provider>
    )
  }
