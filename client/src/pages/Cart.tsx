import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { CartItem } from "../models/cart/Cartitem";
import { ProductExt } from "../models/products/Product";
import { CartACtionType } from "../redusers/CartReduser";
import { useNavigate } from "react-router";


export const Cart = () => {
    const navigate=useNavigate()
    const {cart, cartDispatch} = useContext(CartContext);
    // const [cart, dispatch] = useReducer(CartReducer, []);
    
  
    const totalCartPrice = cart.reduce( (total, item: CartItem) => (
      total + (item.quantity * item.product.price)
    ), 0) // Initial value
  
  
   
  
    const handleChangeQuantity = (product: ProductExt, quantity: number) => {
      cartDispatch({
        type: CartACtionType.CHANGE_QUANTITY,
        payload: new CartItem(product, quantity)
      })
    }
  
    const handleRemoveFromCart = (cartItem: CartItem) => {
        cartDispatch({
        type: CartACtionType.REMOVE_ITEM,
        payload: cartItem
      })
    }
  
  
    const handleResetCart = () => {
        cartDispatch({
        type: CartACtionType.RESET_CART,
        payload: null
      })
    }

    const handleCassa=()=>{
        navigate("/checkout")
        
    }
  
  
    return (
      <>


<div className="cart mt-20">
          <h2 className='text-3xl'>Cart</h2>
          <ul className='border-t-2 border-b-2 my-5'>
            {
              cart.map((item) => (
                <li key={item.product.id}>
                  <div className='flex justify-between items-center p-2'>
                    <h3>{item.product.name}</h3>
                    <div>
                      <button onClick={() => handleChangeQuantity(item.product, 1)}>+</button>
                      <button onClick={() => handleChangeQuantity(item.product, -1)}>-</button>
                    </div>
                    <p>{item.quantity} X {item.product.price} kr</p>
                    <button onClick={() => handleRemoveFromCart(item)}className='bg-red-700 text-white'>Remove</button>
                  </div>
                </li>
              ))
            }
    
          </ul>
          <h3>Total: {totalCartPrice} kr</h3>
          <button onClick={handleResetCart}>Reset Cart</button>
          <button onClick={handleCassa}>Gå till kassan</button>
        </div>
        </>   )  }