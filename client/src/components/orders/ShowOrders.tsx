import { Outlet, useNavigate } from "react-router"
import { OrderList } from "../../models/orders/OrderList"
import { OrderItem } from "../../models/orders/OrderItem"


interface IOrdersProps {
    orders: OrderList[],
    
    
    handleDeleteOrderItem: (id: string) => void,
    handleUppdateOrderItem: (id: string, body: OrderItem) => void
}

export const ShowOrders = (props: IOrdersProps) => {
    const navigate = useNavigate()

    const handleOrderDetails = (paymentId: string) => {
        
        navigate(`/admin/orders/order-details/${paymentId}`)
    }

    return (
        <>
            {props.orders.map((o) => (
                <div key={o._id}>
                    <p>{o.customer_id}</p>
                    <p>{o.total_price}</p>
                    <p>{o.payment_status}</p>
                    <p>{o.payment_id}</p>
                    <p>{o.order_status}</p>
                    <p>{o.created_at}</p>
                    <p>{o.customer_firstname}</p>
                    <p>{o.customer_lastname}</p>
                    <p>{o.customer_email}</p>
                    <p>{o.customer_phone}</p>
                    <p>{o.customer_street_address}</p>
                    <p>{o.customer_postal_code}</p>
                    <p>{o.customer_city}</p>
                    <p>{o.customer_country}</p>
                    <p>{o.customers_created_at}</p>
                    <button onClick={() => handleOrderDetails(o.payment_id)}>Visa Detaljer</button>
                </div>
                
            ))}
            <div><Outlet/></div>
        </>
    )
}

    
    
    
  //  {/* <button onClick={() => handleUppdate(o.id)}>Uppdate</button>
  //  <button onClick={() => handleDelete(o.id)}>Delete</button> */}

/* {
    

    id:number,
     customer_id: number,
     total_price:number,
     payment_status:number,
     payment_id: null,
     order_status:boolean,
     created_at:string,
     customer_firstname: string,
		customer_lastname: string,
		customer_email: string,
		customer_phone: number,
		customer_street_address: string,
		customer_postal_code: string,
		customer_city: string,
		customer_country: string,
		customers_created_at: string
} */