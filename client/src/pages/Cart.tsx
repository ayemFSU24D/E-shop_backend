import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { ProductExt } from "../models/products/Product";
import { CartACtionType } from "../redusers/CartReduser";
import { useNavigate } from "react-router";
import { CartItem } from "../models/cart/Cartitem";
import "../styles/Cart.css";


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
        payload: new CartItem(product, quantity, product.image)
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
      <><div className="cart mt-20">
  <h2>Cart</h2>
  <ul>
    {cart.map((item) => (
      <li key={item.product._id}>
        <div className="cart-item">
          <h3>{item.product.name}</h3>
          <img src={item.product.image} alt={item.product.name} />
          <div className="cart-quantity-controls">
            <button onClick={() => handleChangeQuantity(item.product, 1)}>+</button>
            <button onClick={() => handleChangeQuantity(item.product, -1)}>-</button>
          </div>
          <p>{item.quantity} x {item.product.price} kr</p>
          <button
            onClick={() => handleRemoveFromCart(item)}
            className="cart-remove-button"
          >
            Remove
          </button>
        </div>
      </li>
    ))}
  </ul>

  <h3 className="cart-total">Total: {totalCartPrice} kr</h3>

  <div className="cart-actions">
    <button onClick={handleResetCart}>Reset Cart</button>
    <button onClick={handleCassa}>Gå till kassan</button>
  </div>
</div>

        </>   )  }