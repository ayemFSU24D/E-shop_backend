import { useEffect, useState } from "react";
import { AddCustomers } from "../components/customers/AddCustomers"
import { Customer, CustomersExt } from "../models/customers/Customer";
import { createCustomer, getCustomers } from "../services/ShopService";
import { ShowCustomers } from "../components/customers/ShowCustomers";

export const Customers = () => {
  const [customers, setCustomers]=useState<CustomersExt[]>([]);
  
  const addCustomer = async(newCustomer: Customer) => {
    
       await createCustomer(newCustomer);
       const data= await getCustomers();
       setCustomers(data)
      }

     useEffect(() => {
           
             const handleGetCustomers = async () => {
               if (customers.length === 0) {
                 const data = await getCustomers();
                 setCustomers(data);
                 console.log(data);
               }
             };
           
             handleGetCustomers(); // Hämta produkterna bara en gång
         }, [customers]);

     return <>
  Customers
  <AddCustomers addCustomer={addCustomer}/>
  <ShowCustomers customers={customers}/>
    </>
    }