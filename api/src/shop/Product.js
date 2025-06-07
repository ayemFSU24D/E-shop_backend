
import DatabaseObject from './DatabaseObject.js';
import client from "../DatabaseConnection.js"
import { ObjectId } from "mongodb";


export default class Product extends DatabaseObject{
    constructor(){
        super();
      this.name=null;
      this.brand=null;
      this.price=0 ; 
      this.description=null;
      this.stock=0;
      this.status=null;
      this.image=null;
      this.category=null;
      this.created_at = new Date();

    }

    setupFromDatabase(data) {
        console.log("Data från databasen:", data);
        this.name = data.name;
        this.brand= data.brand;
        this.price = data.price;
        this.description=data.description;
        this.stock=data.stock;
        this.category=data.category;
        this.image=data.image;
        this.created_at=new Date();
        this.status=data.status
    }

    getCollection() {
        return "products";
    }
    
    getSaveData() {
        return {"name": this.name, "brand": this.brand ,"price": this.price,
             "description":this.description,"stock":this.stock, "category":this.category,"image":this.image,
             "created_at":this.created_at,"status":this.status};
    } 


     static async getAll() {    //Nästan sämma med getAllByParameter(parameter), fast utan parameter
                let data = new Product();  
                let products = await data.getDatabaseData(); 
                return products.map(i => {
                  let product = new Product();
                  product._id = i._id;  
                  product.setupFromDatabase(i);
                  return product;
                 });
               }

    

       static async getOne(data) {
        let parameter= {"_id":new ObjectId(data)}
        let product= new Product()
        product._id = new ObjectId(data); 
        await product.load(parameter)
        return product;
       }
      
      
static async increaseStock(productId, quantity) {
  const productsCollection = await client.getCollection("products");
  const result = await productsCollection.updateOne(
    { _id: new ObjectId(productId) },
    { $inc: { stock: quantity } }  // notera plus!
  );
  if (result.matchedCount === 0) {
    console.warn(`Produkt med ID ${productId} hittades inte`);
    return { error: "Produkt ej hittad" };
  }
  return { success: true };
}


static async decreaseStock(productId, quantity) {
  try {
    if (!ObjectId.isValid(productId)) {
      console.error(`Invalid ObjectId: ${productId}`);
      return { error: "Invalid ObjectId" };
    }

    const productsCollection = await client.getCollection("products");

    const result = await productsCollection.updateOne(
      { _id: new ObjectId(productId) },
      { $inc: { stock: -quantity } }
    );

    if (result.matchedCount === 0) {
      console.warn(`Product with ID ${productId} not found`);
      return { error: "Product not found" };
    }

    return { success: true };
  } catch (err) {
    console.error("Error decreasing stock:", err);
    return { error: "Failed to decrease stock" };
  }
}



    

}

