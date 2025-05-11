import { useState, useEffect } from "react";

import { OrderList } from "../models/orders/OrderList";
import {  deleteOrderItem, getOrderList,  uppdateOrderItem } from "../services/ShopService";
import { ShowOrders } from "../components/orders/ShowOrders";

import { OrderItem } from "../models/orders/OrderItem";


export const Orders = () => {
  const [orders, setOrders]=useState<OrderList[]>([]);
  

 /* const addOrder = async(newOrder: Order) => {
      await createOrder(newOrder);
     } */

     useEffect(() => {
           
             const handleGetOrderList = async () => {
               if (orders.length === 0) {
                 const data = await getOrderList();
                 setOrders(data);
                 console.log(data);
               }
             };
           
             handleGetOrderList(); // Hämta produkterna bara en gång
         }, [orders]);

          /* const handleUppdateOrder= async(id:string, body:OrderData)=>{
                 await uppdateOrder(id,body);
                 const data = await getOrderList();
                     setOrders(data);
             }
             
             const handleDeleteOrder=async (id:string)=>{
                   await deleteOrder(id);
                   const data = await getOrderList();
                     setOrders(data);
         
                 } */


                 const handleUppdateOrderItem= async(id:string, body:OrderItem)=>{
                    await uppdateOrderItem(id,body);
                    const data = await getOrderList();
                        setOrders(data);
                }
                
                const handleDeleteOrderItem=async (id:string)=>{
                      await deleteOrderItem(id);
                      const data = await getOrderList();
                        setOrders(data);
            
                    }


                   

     return <>
  Orders
  {/* <AddOrder addCustomer={addOrder}/> */}
  <ShowOrders orders={orders}  handleDeleteOrderItem={handleDeleteOrderItem} handleUppdateOrderItem={handleUppdateOrderItem} />
   
    </>
    }