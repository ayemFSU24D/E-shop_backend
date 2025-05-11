import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { getOrderListByPaymentId } from "../../services/ShopService";
import { OrderById } from "../../models/orders/OrderById";
import { ProductExt } from "../../models/products/Product";

export const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");



  const [orderDetails, setOrderDetails] = useState<OrderById>();
  const [products, setProducts] = useState<ProductExt[]>(() => {
    const cached = localStorage.getItem("products");
    return cached ? JSON.parse(cached) : [];
  });

  const clearLocalStorageExcept = (keepKeys: string[]) => {
    Object.keys(localStorage).forEach((key) => {
      if (!keepKeys.includes(key)) {
        localStorage.removeItem(key);
      }
    });
  };
  

  useEffect(() => {
    if (!sessionId) return;
  
    const ORDER_HANDLED_KEY = `order-handled-${sessionId}`;
    const alreadyHandled = localStorage.getItem(ORDER_HANDLED_KEY);
  
    console.log("Session ID:", sessionId);
    console.log("Already handled?", alreadyHandled);
  
    if (alreadyHandled) {
      console.log("Skipping stock update for session:", sessionId);
      return;
    }
  
    const handleOrderDetails = async () => {
      try {
        const data: OrderById = await getOrderListByPaymentId(sessionId);
        setOrderDetails(data);
  
        console.log("Fetched order:", data);
  
        const updatedProducts = products.map((p) => {
          const orderedItem = data.order_items.find(item => Number(item.product_id) === p.id);
          if (orderedItem) {
            console.log(`Updating stock for ${p.name}: ${p.stock} - ${orderedItem.quantity}`);
            return { ...p, stock: p.stock - orderedItem.quantity };
          }
          return p;
        });
  
        setProducts(updatedProducts);
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        localStorage.setItem(ORDER_HANDLED_KEY, "true");
  
        console.log("Stock updated and flag set:", ORDER_HANDLED_KEY);
      } catch (err) {
        console.error("Kunde inte hämta order:", err);
      }
    };
  
    handleOrderDetails();
    clearLocalStorageExcept(["products", ORDER_HANDLED_KEY]);
  }, [sessionId]);
  

  return (
    <>
      <h2>Orderbekräftelse</h2>
      <div>{orderDetails?.customer_firstname} {orderDetails?.customer_lastname}</div>
      <h3>Leveransadress:</h3>
      <div>{orderDetails?.customer_city}</div>
      <div>{orderDetails?.customer_country}</div>
      <div>{orderDetails?.customer_email}</div>
      <p>Session: {sessionId}</p>
      <h3>Beställda produkter:</h3>
      <div>
        {orderDetails?.order_items.map((i) => (
          <div key={i.product_id}>
            <div>{i.product_name}</div>
            <div>Antal: {i.quantity}</div>
            <div>Pris: {i.unit_price}</div>
            <div>{orderDetails?.total_price}</div>
          </div>
        ))}
      </div>
      <div>Totalpris: {orderDetails?.total_price}</div>
    </>
  );
};
