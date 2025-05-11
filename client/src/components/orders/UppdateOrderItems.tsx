import { useNavigate, useParams } from "react-router";

import { ChangeEvent, FormEvent,  useState } from "react";
import { uppdateOrderItem } from "../../services/ShopService";

import { UppdateOrderItemById } from "../../models/orders/UppdateOrderItemById";

//-------Koden fungerar inte---uppdaterar inte antal items----------


export const UppdateOrderItems=()=>{
    const{id, item_id}=useParams()
    const navigate=useNavigate()
    const[orderItemByIdState, setOrderItemByIdState]=useState<UppdateOrderItemById>({
        quantity:0
    })


    
        const handleSubmit = async (e:FormEvent) => {
            e.preventDefault()
            if (item_id) {
                await uppdateOrderItem(item_id,orderItemByIdState);
                
            }
                navigate(`/admin/orders/order-details/${id}`)
                console.log("Laddas 1 gång")
        };
        
        /* setOrderItemByIdState({
            id: 0,
            product_id: 0,
            product_name: "",
            quantity: 0,
            unit_price: 100}) */
        
 const handleInputs=(e:ChangeEvent<HTMLInputElement>)=>{
             if (e.target.type === "text") {
                setOrderItemByIdState( { ...orderItemByIdState,[e.target.name]: e.target.value } );
              }
            if (e.target.type === "number") {
                setOrderItemByIdState( { ...orderItemByIdState,[e.target.name]: +e.target.value } );
              }
              }
        


    return<>Uppdate orderitem {item_id}
    
    <form  onSubmit={handleSubmit}>

			{/* <label htmlFor="product_id">OrderItem Id</label>
			<input type="number" onChange={handleInputs} value={orderItemByIdState.product_id} name="product_id"/>

			<label htmlFor="product_name">OrderItem name</label>
			<input type="text" onChange={handleInputs} value={orderItemByIdState.product_name} name="product_name"/> 
			<label htmlFor="stock">Stock</label>
			<input type="unit_price" onChange={handleInputs} value={orderItemByIdState.unit_price} name="unit_price" />
            */}

			<label htmlFor="quantity">Quantity</label>
			<input type="number"  onChange={handleInputs} value={orderItemByIdState.quantity} name="quantity"/>

			
            <button>Spara</button>
		</form>
    </>

       
}