import "./../Styles/Products.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import { Product, ProductExt } from "../models/products/Product";
import { AddProducts } from "../components/products/AddProducts";
import { ShowProducts } from "../components/products/ShowProducts";

import { createProduct, deleteProduct, getProducts } from "../services/ShopService";
import { Outlet } from "react-router";


export const Products = () => {
  const [shouldRefetch, setShouldRefetch] = useState(false);
    const location = useLocation();//---uppdaterar listan varje g[ng det navigeras till sidan]
    const[, setIsLoading]=useState<boolean>(false)
    const [products, setProducts]=useState<ProductExt[]>(()=>{
        const cachedProducts = localStorage.getItem("products");
        return cachedProducts ? JSON.parse(cachedProducts) : [];}
        /* 
        JSON.parse(localStorage.getItem("products")||"[]") */)
        ;
   
    
    /* const { fetchData, data, loading, error } = useFetch() */


    /* useEffect(() => {   //-----Loc Stor(products) rensas efter 6sek efter enda gången körning på useEffecten
        const timeout = setTimeout(() => {
          console.log("Rensar LS");
          localStorage.removeItem("products");
        }, 6000); // 6 sekunder
      
        return () => clearTimeout(timeout);
      }, []); */


    /*   useEffect(() => {  //-----Loc Stor(products) rensas intervallvis efter 10min efter enda gången körning på useEffecten
        const interval = setInterval(() => {
          console.log("Rensar LS var 10:e minut");
          localStorage.removeItem("products");
          setShouldRefetch(true); //tirgger igång ny fetchning efter raderat locStor("products")
        }, 1000*60*10); // 10 min
      
        return () => clearInterval(interval);
      }, []);



      useEffect(() => {
        if (!shouldRefetch) return;
      
        const fetchFreshProducts = async () => {
          console.log("Fetching nya produkter efter LS-rensning...");
          const data = await getProducts();
          setProducts(data);
          localStorage.setItem("products", JSON.stringify(data));
          setShouldRefetch(false); // återställ flagga
        };
      
        fetchFreshProducts();
      }, [shouldRefetch]); */
      
      
      
    
    const addProduct = async(payload: Product) => {
     const newProduct:ProductExt= await createProduct(payload);
     /* const data = await getProducts(); *///--caching inte möjligt(hämtas annan format producter)
           const addedProductsList=[...products, newProduct]
            setProducts(addedProductsList);
         localStorage.setItem("products", JSON.stringify(addedProductsList));
        }
        
        
        useEffect(() => {
            console.log("useEffect körs vid navigering tillbaka");
          
            const cachedProducts = localStorage.getItem("products");
            if (cachedProducts) {
              const parsed = JSON.parse(cachedProducts);
              setProducts(parsed);
            } else {
              // Om det inte finns något i localStorage, hämta från server
              const fetchProducts = async () => {
                setIsLoading(true);
                const data = await getProducts();
                setProducts(data);
                localStorage.setItem("products", JSON.stringify(data));
                setIsLoading(false);
              };
              fetchProducts();
            }
          }, [location.pathname]);//-----k;rs vid varje navigering till sidan
           // 🔥 Tom beroendearray → körs bara en gång vid mount
    
    
    
    
    
    const handleDeleteProduct=async (id:number)=>{
        await deleteProduct(id);
        const newList=products.filter(p=>p._id!==id);
        localStorage.setItem("products", JSON.stringify(newList));
        setProducts(newList);
     }
        
        
        return <>
        <div>

    <AddProducts addProduct={addProduct} />
    <div className="style-uppdate-page" >  {/* div-för att kunna flexa innehollet */}
    <ShowProducts products={products} handleDeleteProduct={handleDeleteProduct}  />
        <div>
        {/* <Outlet context={{ handleUppdateProduct }} /> */}
        <Outlet  />
        </div>
    </div>
        </div>
    </>
}
        
                /*---------Fungerande lösning med Hooks--------------------
                const url = "http://localhost:3000/products";
                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newProduct) }
                    await fetchData<string>(url,options)
                    
                };
                
                const getData=()=>{
                    setProducts(data)
                */