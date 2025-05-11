import { CustomersExt } from "../../models/customers/Customer"

interface ICustomersProps{
    customers:CustomersExt[]
}

export const ShowCustomers=(props:ICustomersProps)=>{

    return <>
    Show Customers
    <div>{props.customers.map((c)=>{
    return<>
    <div key={c.id}>
        <p>{c.firstname} </p>
        <p>{c.lastname} </p>
        <p>{c.phone} </p>
        <p>{c.street_address} </p>
        <p>{c.city} </p>
        <p>{c.country} </p>
        <p>{c.email} </p>
        <p>{c.password} </p>
        <p>{c.postal_code} </p>
        <p>{c.created_at} </p>
    </div>
    </>} )}
        </div></>
} 

