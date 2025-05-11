import { createContext, PropsWithChildren, useState } from "react";
import { CustomersExt } from "../models/customers/Customer";

type CustomerContextType = {
    customer: CustomersExt | null,
   
    
  }
  
  const CustomerContext = createContext< CustomerContextType | undefined>(undefined)
  
  
  export const CustomerProvider = ({children}: PropsWithChildren) => {
    const [customer] = useState<CustomersExt| null>(null);
    
  
   
  
    return (
      <CustomerContext.Provider value={{customer}}>
        {children}
      </CustomerContext.Provider>
    )
  } 
  
  
  export default CustomerContext