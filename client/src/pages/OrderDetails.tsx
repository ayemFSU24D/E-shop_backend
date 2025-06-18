import { useNavigate, useParams } from "react-router";
import { OrderById } from "../models/orders/OrderById"
import { useEffect, useState } from "react";
import { getOrderListByPaymentId, getOrderListDetailed } from "../services/ShopService";



export const OrderDetails=()=>{
    const[ordersDetailed, setOrdersDetailed]=useState<OrderById>()
    const{paymentId}=useParams()


    const navigate=useNavigate()
    useEffect(() => {
        const getData = async () => {
            if (paymentId) {
                console.log("Orderdetails paymentId:", paymentId)
                const data: OrderById = await getOrderListByPaymentId(paymentId);
                console.log("Orderdetails data:", data)
                setOrdersDetailed(data);
                
            }
        };
    
        getData();
    }, [paymentId]);

  const handleUppdate=(id:string, item_id:string)=>{
    navigate(`/admin/orders/order-items/${id}/${item_id}`)
  }


    const handleOnClick=()=>{
        navigate("/admin/orders")
        setOrdersDetailed({
            "_id": "",
            "customer_id": 0,
            "total_price": 0,
            "payment_status": "",
            "payment_id": "",
            "order_status": "",
            "created_at": "",
            "customer_firstname": "",
            "customer_lastname": "",
            "customer_email": "",
            "customer_password": "",
            "customer_phone": "",
            "customer_street_address": "",
            "customer_postal_code": "",
            "customer_city": "",
            "customer_country": "",
            "order_items": []
        })
    }

   return (
    <>
        <h2>Orderdetaljer</h2>

        {ordersDetailed ? (
            <>
                <p><strong>Order ID:</strong> {ordersDetailed._id}</p>
                <p><strong>Kund:</strong> {ordersDetailed.customer_firstname} {ordersDetailed.customer_lastname}</p>
                <p><strong>Totalt pris:</strong> {ordersDetailed.total_price} SEK</p>
                <p><strong>Status:</strong> {ordersDetailed.order_status}</p>
                
                <h3>Produkter:</h3>
                {ordersDetailed.order_items?.length > 0 ? (
                    <ul>
                        {ordersDetailed.order_items.map((item, index) => (
                            <li key={index}>
                                <p><strong>Produkt:</strong> {item.product_name}</p>
                                <p><strong>Antal:</strong> {item.quantity}</p>
                                <p><strong>Pris per enhet:</strong> {item.unit_price} SEK</p>
                                <p><strong>Totalt:</strong> {item.unit_price * item.quantity} SEK</p>
                                <hr />
                                <button onClick={()=> handleUppdate(ordersDetailed._id, item.id)}>Ändra antal</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Inga produkter i ordern.</p>
                )}
            </>
        ) : (
            <p>Laddar orderinformation...</p>
        )}

        <button onClick={handleOnClick}>Stäng</button>
    </>
);

       
}