import { NavLink, Outlet } from "react-router"
import "./../Styles/LayoutAdmin.css";

export const LayoutAdmin=()=>{
    return ( 
 
        <>
 <header>
 
     <nav>
     <ul>
         <li>
             <NavLink to={"/admin/customers"} >Customers</NavLink>
         </li>
 
         <li>
             <NavLink to={"/admin/products"} >Products</NavLink>
         </li>
 
         <li>
             <NavLink to={"/admin/orders"} >Orders</NavLink>
         </li>
        {/*  <li>
             <NavLink to={"/home"} >Hem</NavLink>
         </li> */}
     </ul>
 </nav>
 </header>
 
 <main>
     <Outlet/>
 </main>
 </>
     ) 
 } 