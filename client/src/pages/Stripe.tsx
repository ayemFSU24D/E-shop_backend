import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";

import { loadStripe} from '@stripe/stripe-js';

import { Payload } from "../models/orders/Payload";
import { useCallback, useEffect } from "react";



const stripePromise = loadStripe('pk_test_51R4JM8Qva8ur031RJvsjShY3l0J5bhZM5je1wEv4a1bqsmevGqX4NPabEYrQFIRVC40cUvbspkBu2iLkNqJDwO9S00JGnrweok');


export const Stripe = () => {
  console.log("Kommit till Gammal checkout")
  /* const [payloadd, setPayloadd] = useState<Payload>(); */
  const storedPayloadd:Payload =  JSON.parse(localStorage.getItem('storedPayload')||"");
  console.log("Den parsade payload",storedPayloadd)
   /* const parsedPayload = JSON.parse(storedPayloadd); */
  
  /* 
  setPayload(JSON.parse(storedPayload)); // Parse and set the payload state

  // Fetch payload from localStorage when component mounts
  useEffect(() => {
    if (storedPayloadd) {
      try {
        // Only parse if there's data in localStorage
      } catch (error) {
        console.error("Error parsing payload from localStorage:", error);
      }
    }
  }, []); */

  ////--------------------Fungerar
   /*  const payload = {  
    order_id:"123",
    order_items: [
      { name: 'Product 1', price: 100, quantity: 1 },
      { name: 'Product 2', price: 150, quantity: 2 }
    ],
  };  
  console.log("Den feik payload",payload) */
  
    

    /*  if (!payload || payload.order_id === 0) return ; */
    
    const fetchClientSecret = useCallback(() => {
      const storedPayloadd =  JSON.parse(localStorage.getItem('storedPayload')||"");
      
      
      // Create a Checkout Session
      return fetch("http://localhost:4000/stripe/create-checkout-session-embedded", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( storedPayloadd),
      })
      .then((res) => res.json())
      .then((data) => data.clientSecret)
      
    }, []);
    console.log("Den parsade payload",storedPayloadd)
      
    
    useEffect(() => {
      /* console.log("Den parsade  feik payload",payload) */
      console.log("Den parsade payload",storedPayloadd)
      fetchClientSecret(); // Anropa funktionen när komponenten laddas
    }, []); 
    
    
      const options = {fetchClientSecret};
    
      return (
        <div id="checkout">
    
  
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={options}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      )
}
  
  
  
  
     /*  {
          "customer_id": 2,
          "payment_status": "unpaid",
          "payment_id": null,
          "order_status": "pending",
          "order_items": [
            {
              "product_id": 6,
              "product_name": "Mjölk",
              "quantity": 3,
              "unit_price": 100
            },
            {
              "product_id": 8,
              "product_name": "Yogurt",
              "quantity": 3,
              "unit_price": 123
            }
          ]
        } */
  
  
      
     /*  useEffect(() => {
          const handleCreateOrder = async () => {
              if (order) { // Kontrollera att order finns
                  try {
                      const createdOrder: string = await createOrder(order);
                      console.log("Order skapad:", createdOrder);
                  } catch (error) {
                      console.error("Fel vid order-skapande:", error);
                  }
              }
          };
      
          handleCreateOrder();
      }, [order]); */