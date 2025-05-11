
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
      this.created_at=0;

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
        this.created_at=data.created_at;
        this.status=data.status
    }

    getCollection() {
        return "products";
    }
    
    getSaveData() {
        return {"name": this.name, "price": this.price};
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

        
      
    

}

