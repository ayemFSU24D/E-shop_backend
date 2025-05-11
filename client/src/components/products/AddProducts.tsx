import { ChangeEvent, FormEvent, useState } from "react"
import { Product } from "../../models/products/Product";

interface IAddProduct{
	addProduct:(p:Product)=>void
}


export const AddProducts = (props:IAddProduct) => {
	const [product, setProduct]=useState<Product>(new Product("","",0,0,"",""));
	
	
	const handleSubmit=(e:FormEvent)=>{
		e.preventDefault()
		props.addProduct(product)
		setProduct({
			name: "",
			description: "",
			price: 0,
			stock: 0,
			category: "",
			image: "",
		  });
		
		

	}
	const handleInputs=(e:ChangeEvent<HTMLInputElement>)=>{
		if (e.target.type === "text") {
			setProduct( { ...product,[e.target.name]: e.target.value } );
		  }
		if (e.target.type === "number") {
			setProduct( { ...product,[e.target.name]: +e.target.value } );
		  }
	}
	
	
	/* const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.type === "text") {
		  setPerson({ ...person, [e.target.name]: e.target.value });
		}
		if (e.target.type === "number") {
		  setPerson({ ...person, [e.target.name]: +e.target.value });
		}
		if (e.target.type === "checkbox") {
		  setPerson({ ...person, [e.target.name]: e.target.checked });
		} */
		return <> 
	   Products
		<form  onSubmit={handleSubmit}>
			<label htmlFor="name">Name</label>
			<input type="text" onChange={handleInputs} value={product.name} name="name"/>

			<label htmlFor="description">Description</label>
			<input type="text" onChange={handleInputs} value={product.description} name="description"/>

			<label htmlFor="price">Price</label>
			<input type="number"  onChange={handleInputs} value={product.price} name="price"/>

			<label htmlFor="stock">Stock</label>
			<input type="number" onChange={handleInputs} value={product.stock} name="stock" />

			<label htmlFor="category" >Category</label>
			<input type="text" onChange={handleInputs} value={product.category} name="category"/>

			<label htmlFor="image" >Image</label>
			<input type="text"onChange={handleInputs} value={product.image} name="image" />

			<button>Spara</button>
		</form>

		<div>här visas min state
			{product.name}
		</div>
		</>
	}
	

/* {
	"name": "Keso",
	"description": "Coolt",
	"price": 100,
	"stock": 50,
	"category": "Mejeri",
	"image": ""
} */