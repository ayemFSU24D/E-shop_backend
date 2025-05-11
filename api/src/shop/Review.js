import DatabaseObject from './DatabaseObject.js';
import client from "../DatabaseConnection.js"
import { ObjectId } from "mongodb";


export default class Review extends DatabaseObject{
    constructor(){
        super();
      this.product_id=null;
      this.review=null;
      this.rating=0;
      this.customer_id=null;
    }

    setupFromDatabase(data) {
        console.log("Data från databasen:", data);
        this.product_id=data.product_id;
        this.review=data.review;
        this.rating=data.rating;
        this.customer_id=data.customer_id;
    }

    getCollection() {
        return "reviews";
    }

    static async getAll() {
        let items = await client.findAll("reviews");
        let reviews = items.map((data) => {
            let newReview = new Review();
            newReview._id = data._id;
            newReview.setupFromDatabase(data);
            return newReview;
        });

        return reviews;
    }

    

      /*  static async getOne(id) {
           let reviewitem= new Review()
           reviewitem._id = new ObjectId(id); 
           await reviewitem.load();
           return reviewitem;
       } */
        static async getOne(data) {
            let parameter= {"_id":new ObjectId(data)}
           let review= new Review()
           review._id = new ObjectId(data); 
           await review.load(parameter)
           return review;
       } 



    

       

        static async getOneByProduct(data) {  //---------------Gett by arameter
            let parameter= {"product_id":new ObjectId(data)}   //---för Parametrar
            let review=new Review()
            review.product_id=new ObjectId(data);
            await review.load(parameter)
            return review;
        }
        
       



       static async getAllDetailedProductInfo() {

           let reviews= await client.findAll("reviews");
           
           for(let i=0; i< reviews.length; i++){
               let review=reviews[i];
               console.log(review);
               
               
               {   //----i skåp eftersom query har ju anpassande värde vid varje kodlogik
                let productId=review.product_id;
                let query={_id:productId};
                let products = await client.findAll("products",query);
                console.log(products);
                review.product_id=products[0];  //---här sägs att productId fältet i review dokumentet ska ersättas med hela productet istället.
            } 
            
            
            
            {
                let customerId=review.customer_id;
                let query={_id:customerId};
                let customers = await client.findAll("users",query);
                console.log(customers);
                
                let customer=customers[0];
                
                review.customer_id=customer;
                delete customer["email"];  //---om vi inte vill skicka ut pers uppgifter(mail)
                delete customer["phone"];
                delete customer["password"];
            } 
        }   
        return reviews
    }

}