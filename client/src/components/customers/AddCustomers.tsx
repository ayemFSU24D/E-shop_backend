import { ChangeEvent, FormEvent, useState } from "react"
import { Customer, CustomersExt } from "../../models/customers/Customer"
import { getCustomerByEmail } from "../../services/ShopService"


interface IAddCustomer{
    addCustomer:(p:Customer)=>void
}

export const AddCustomers=(props:IAddCustomer)=>{


    const [customer,setCustomer]=useState<Customer>(new Customer("","","",0,0,"", 0,"",""))

    const handleInput=(e:ChangeEvent<HTMLInputElement>)=>{
        if (e.target.type === "text") {
      setCustomer( { ...customer,[e.target.name]: e.target.value } );
      }
    if (e.target.type === "number") {
      setCustomer( { ...customer,[e.target.name]: +e.target.value } );
      }
    }


    const handleSubmit=async(e:FormEvent)=>{
       e.preventDefault();
       

    try {
        // Kolla om kunden redan finns
        const response:CustomersExt = await getCustomerByEmail(customer.email);
        
       
        
        if (response && response.email === customer.email) {
          console.log("Kunden finns redan:", response);
          localStorage.setItem("existingCustomer", JSON.stringify(response.id));
          return; 
        }  
        

        
        
        }
        catch (error:any) {
          const errorMessage = error.message || error.toString();
    console.log("Felmeddelande:", errorMessage);

    
    if (errorMessage.includes('Error 404')) {
              // Om kunden inte hittas (404), skapa en ny kund
              console.log("Kunden inte hittad, skapar en ny kund...");
              
              props.addCustomer(customer);
              setCustomer({
                  firstname: "",
                  lastname: "",
                  email: "",
                  password: 0,
                  phone: 0,
                  street_address: "",
                  postal_code: 0,
                  city: "",
                  country: ""
              });
              console.log("Ny kund skapad!");
          } else {
              console.error("Fel vid kontroll av kund:", error);
          }
      }
    }


    return <>Add Customers
    <form onSubmit={handleSubmit}>
        <label htmlFor="firstname">Firstname</label>
        <input type="text" onChange={handleInput} name="firstname" value={customer.firstname} required/>

        <label htmlFor="lastname">Lastname</label>
        <input type="text" onChange={handleInput} name="lastname" value={customer.lastname} required/>

        <label htmlFor="email">Email</label>
        <input type="text" onChange={handleInput} name="email" value={customer.email} required/>

        <label htmlFor="password">Password</label>
        <input type="number" onChange={handleInput} name="password" value={customer.password} required/>

        <label htmlFor="phone">Phone</label>
        <input type="number" onChange={handleInput} name="phone" value={customer.phone} required/>

        <label htmlFor="street_address">Adress</label>
        <input type="text" onChange={handleInput} name="street_address" value={customer.street_address} required/>

        <label htmlFor="postal_code">Postal code</label>
        <input type="number" onChange={handleInput} name="postal_code" value={customer.postal_code} required/>

        <label htmlFor="city">City</label>
        <input type="text" onChange={handleInput} name="city" value={customer.city} required/>

        <label htmlFor="country">Country</label>
        <input type="text" onChange={handleInput} name="country" value={customer.country} required/>

        <button>Spara</button>

        </form></>
} 
