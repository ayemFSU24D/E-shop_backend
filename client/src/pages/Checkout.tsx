import React, { useEffect, useState } from "react";



import { CartItem } from "../models/cart/Cartitem";
import { AddCustomers } from "../components/customers/AddCustomers";
import { Customer, CustomersExt, ExistingCustomer } from "../models/customers/Customer";
import { createCustomer,createOrder} from "../services/ShopService";

import {Order, OrderId } from "../models/orders/Order";
import { OrderItem } from "../models/orders/OrderItem";

import { Payload } from "../models/orders/Payload";
import { Stripe } from "./Stripe";
import "../styles/Checkout.css";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.




export const Checkout = () => {
  const [showStripe, setShowStripe] = useState(false);
  const [showCustomerForm, setShowCustomerForm] = useState(true);

  const [, setPayload] = useState<Payload>({ order_id: "", order_items: [] });
  const [, setOrderState] = useState<Order | null>(null);
  
  
  const [cart, setCart] = React.useState<CartItem[] >([]);
  /* const [storedCustomerId, setStoredCustomer] = useState<number>(() => {---------finns i handleOrder
    const savedCustomer = localStorage.getItem("existingCustomer");
    return savedCustomer ? JSON.parse(savedCustomer) : null;
  }); */
  
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      // console.log(storedCart)
      setCart(JSON.parse(storedCart));
      setShowCustomerForm(true); // Visa Stripe om det finns en kundvagn
    } else {
      setCart([]); // Se till att cart är en tom array om inget hittas
      setShowCustomerForm(false); // Göm Stripe om det inte finns någon kundvagn
    }
  }, []);
  
  const addCustomer = async (newCustomer: Customer) => {
    const existingCustomer: ExistingCustomer = await createCustomer(
      newCustomer
    );
    localStorage.setItem(
      "existingCustomer",
      JSON.stringify(existingCustomer.insertedId)
    );
    /*  const data= await getCustomers(); */
    /* setCustomers(data) */
    
  };

  
  
  const handleOrder = async () => {
    const customerId= localStorage.getItem("existingCustomer")
    
    /* const [storedCustomerId, setStoredCustomer] = useState<number>(() => {
      const savedCustomer = localStorage.getItem("existingCustomer");
      return savedCustomer ? JSON.parse(savedCustomer) : null;
      }); */
     
      if (!customerId || cart.length === 0) {
        console.log("Väntar på kund och varukorg...");
        return;
      }
      const storedCustomerId= (JSON.parse(customerId));
      
      const newOrderState: Order = {
        customer_id: storedCustomerId,
        payment_status: "unpaid",
        payment_id: null,
        order_status: "pending",
        order_items: cart.map(
        (item) =>
          new OrderItem(
            item.product._id,
            item.product.name,
            item.quantity,
            item.product.price
          )
        ),
      };
      
      console.log(newOrderState)
      setOrderState(newOrderState);
      
      try {
        const newOrderId: OrderId = await createOrder(newOrderState);       
        
        console.log("Order skapad:", newOrderId);
        return newOrderId;
      } catch (error) {
        console.error("Fel vid skapande av order:", error);
        return null;
      }
    };
    
    
    const handleSubmit = async () => {
      const orderID = await handleOrder();
      console.log(orderID)
      if (!orderID || !orderID.insertedId) {
        console.error("Order ID saknas.");
        return
      }
      
      
      const newPayload: Payload = {
        order_id: orderID.insertedId.toString(),
        order_items: cart.map((c) => ({
          order_id: orderID.insertedId,
          product_id: c.product._id,
          product_name: c.product.name,
          quantity: c.quantity,
          unit_price: c.product.price,
          created_at: JSON.stringify(c.product.created_at)
        }))
      };
/*   export type Payload = {
        order_id: number;
        order_items: {
          product_id: number;
          product_name: string;
          quantity: number;
          unit_price: number;
          created_at: string;
        }[];
      }; */

     /*  id: number | null
      order_id: number
      product_id: number
      product_name: string
      quantity: number
      unit_price: number
      created_at: string */
       
      /* console.log("efter setPayload",orderID)   */    
      
      setPayload(newPayload)
      /* console.log("in newPayload objekt",newPayload) */
      setShowStripe(true); // Visa Stripe om det finns en kundvagn
      localStorage.setItem("storedPayload", JSON.stringify(newPayload))
      console.log("in local strorage payload objekt",newPayload)
      
      
    };
    
    useEffect(() => {
      const storedPayloadd = localStorage.getItem('storedPayload');
      if (storedPayloadd) {
        try {
          // Only parse if there's data in localStorage
          setPayload(JSON.parse(storedPayloadd)); // Parse and set the payload state
          console.log("hämtat loc stor",JSON.parse(storedPayloadd))
        } catch (error) {
          console.error("Error parsing payload from localStorage:", error);
        }
      }
    }, []);
    
  console.log(showStripe)
   
    
   return (
  <div className="checkout-page">
    <h2>Checkout</h2>

    <div className="checkout-cart-preview">
      <h3>Varukorgens innehåll:</h3>
      {cart.length === 0 ? (
        <p>Varukorgen är tom</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.product._id} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
              <img
                src={item.product.image}
                alt={item.product.name}
                style={{ maxWidth: "100px", maxHeight: "100px", objectFit: "contain" }}
              />
              <div>
                <p><strong>{item.product.name}</strong></p>
                <p>Antal: {item.quantity}</p>
                <p>Pris: {item.product.price} kr</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>

    {showCustomerForm ? (
      <div className="checkout-customer-form">
        <h3>Fyll i dina uppgifter:</h3>
        <AddCustomers addCustomer={addCustomer} />
        <button className="checkout-button" onClick={handleSubmit}>
          Gå till betalning
        </button>
      </div>
    ) : (
      <p className="checkout-empty-message">Inga varor i kundvagnen</p>
    )}

    {showStripe ? (
      <div className="checkout-stripe-container">
        <Stripe />
      </div>
    ) : (
      <p className="checkout-empty-message">Inga varor i kundvagnen – gömt GammalCheckout</p>
    )}
  </div>
);


};

/* import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { AddCustomers } from "../components/customers/AddCustomers";
import { Customer } from "../models/customers/Customer";
import { createCustomer } from "../services/ShopService";

export const Checkout = () => {
    const {cart, cartDispatch} = useContext(CartContext);
    // const [cart, dispatch] = useReducer(CartReducer, []);
    const addCustomer = async(newCustomer: Customer) => {
          await createCustomer(newCustomer);
         }
    return (
      <div>
        <h2 className='text-3xl my-4'>Checkout</h2>
  
        {JSON.stringify(cart)}

        <div>
        </div>
        <AddCustomers addCustomer={addCustomer}/>
          
      </div>
    )
  }
 */
