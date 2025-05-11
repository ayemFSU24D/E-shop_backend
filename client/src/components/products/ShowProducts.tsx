import {  useNavigate } from "react-router"
import { ProductExt } from "../../models/products/Product"



interface IProductsProps{
    products:ProductExt[],
    handleDeleteProduct:(id:number)=>void,
   
}

export const ShowProducts=(props:IProductsProps)=>{
    const navigate= useNavigate();


    const handleUppdate=(id:number)=>{
        navigate(`/admin/products/${id}`)

    }

    const handleDelete=(id:number)=>{
        props.handleDeleteProduct(id)


    }

    return<>{props.products.map((p)=>{
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
            <button onClick={() => handleUppdate(p.id)}>Uppdate</button>
            <button onClick={() => handleDelete(p.id)}>Delete</button>
            
        </div>
        </>
    })}
    </>
}