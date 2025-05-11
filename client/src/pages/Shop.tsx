import { useContext, useEffect, useState } from "react";
import { ProductExt } from "../models/products/Product";
import { CartACtionType } from "../redusers/CartReduser";
import { CartContext } from "../contexts/CartContext";
import { CartItem } from "../models/cart/Cartitem";
import { getProducts } from "../services/ShopService";
import  ChatBot  from "../components/ChatBot";


export const Shop = () => {
       const[, setIsLoading]=useState<boolean>(false)
       const [shouldRefetch, setShouldRefetch] = useState(false);
        const [products, setProducts]=useState<ProductExt[]>( ()=>
         { const cachedProducts = localStorage.getItem("products");
          return cachedProducts ? JSON.parse(cachedProducts) : [];
          })
        const {cartDispatch} = useContext(CartContext);




        
      //-----------------Cacheing----------------------------------------
    /* useEffect(() => {   //-----Loc Stor(products) rensas efter 6sek efter enda gången körning på useEffecten
        const timeout = setTimeout(() => {
          console.log("Rensar LS");
          localStorage.removeItem("products");
        }, 6000); // 6 sekunder
      
        return () => clearTimeout(timeout);
      }, []); */

      //-----------------Cacheing----------------------------------------
      useEffect(() => {  //-----Loc Stor(products) rensas intervallvis efter 10min efter enda gången körning på useEffecten
        const interval = setInterval(() => {
          console.log("Rensar LS var 10:e minut");
          localStorage.removeItem("products");
          setShouldRefetch(true); //tirgger igång ny fetchning efter raderat locStor("products")
        }, 1000 * 60 * 10); // 10 min
      
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
      }, [shouldRefetch]);




        useEffect(() => {
          /* setTimeout(()=>{localStorage.removeItem("products")}, 1000*60) *///--var 10-nde minut raderas LS-products och kommer behovet att fetcha på nytt
          if(products.length > 0)return;
          console.log("useEffect")
          const fetchProducts = async () => {
            console.log("useEffect")
            try {
              setIsLoading(true)
              const productList: ProductExt[] = await getProducts();
              if(productList)
              setProducts(productList);
              localStorage.setItem("products", JSON.stringify(productList));
              setIsLoading(false)
        
              // Om du vill spara dem lokalt
              // localStorage.setItem("products", JSON.stringify(productList));
            } catch (error) {
              console.error("Failed to fetch products:", error);
            }
          };
        
          fetchProducts();
        }, []);

        
        
    
        const handleAddToCart = (product: ProductExt, quantity: number) => {
            cartDispatch({
              type: CartACtionType.ADD_ITEM,
              payload: new CartItem(product, quantity)
            })
          }
    
            return<>
            <div>
              {products.map((p)=>{
                return <>
                <div key={p.id}>
                    <p>{p.name}</p>
                    <p>{p.description}</p>
                    <p>{p.price}</p>
                    <p>{p.stock}</p>
                    <p>{p.category}</p>
                    <p>{p.created_at}</p>
                    <img src={p.image} alt="" style={{
                      maxWidth: "300px", // Maximal bredd på bilden
                      maxHeight: "300px", // Maximal höjd på bilden
                      objectFit: "contain"}}/>
                    <button onClick={() => handleAddToCart(p,1)}>Add to Cart</button>
               
                    
                </div>
                </>
            })}
            </div>
            <ChatBot/>
            </>
}