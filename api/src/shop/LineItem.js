import DatabaseObject from './DatabaseObject.js';
import client from "../DatabaseConnection.js"
import { ObjectId } from "mongodb";


/* export default class LineItem extends DatabaseObject{
    constructor() {
      super();
      this.order_id=null
      this.product_id = null;
      this.product_name=null
      this.unit_price=0
      this.quantity = 0;
      this.image=null
      this.created_at=null
    }
    
    getTotalItemPrice() {
      return this.unit_price * this.quantity;
    }
    
    
    setupFromDatabase(data) {
      this.order_id=data.order_id;
      this.product_id=data.product_id;
      this.product_name = data.product_name;
      this.unit_price = data.unit_price;
      this.quantity=data.quantity;
      this.image=data.image;
      this.created_at=data.created_at;
      }
      
      getCollection() {
        return "lineitems";
        }
        
        
        
        static async getAll() {    //Nästan sämma med getAllByParameter(parameter), fast utan parameter
        let instance = new LineItem();  
        let data = await instance.getDatabaseData(); 
        return data.map(itemData => {
          let lineItem = new LineItem();
          lineItem._id = itemData._id;  
          lineItem.setupFromDatabase(itemData);
          return lineItem;
          });
          }
          
          static async getOne(id) {
            let lineitem= new LineItem()
            lineitem.id = new ObjectId(id); 
            await lineitem.load();
            return lineitem;
            }
            } */
           
           
           
           //---------------------------------------Ny----------------------------------
  export default class LineItem {
   constructor(product, quantity) {
     this._id = null;
     this.product_id =  new ObjectId(product.product_id)
     this.product_name = product.product_name;
     this.quantity = quantity;
     this.unit_price = product.unit_price;
     this.owner = null;
    }

  
    /* id:number,  //OrderItemById--frontend
product_id:number,
product_name:string,
quantity:number,
unit_price:number */

     /* order_id: JSON.stringify(orderID.insertedId),  // Från frontend
        order_items: cart.map((c) => ({
          order_id: orderID.insertedId,  // Det här borde vara samma som order_id
          product_id: c.product.id,
          product_name: c.product.name,
          quantity: c.quantity,
          unit_price: c.product.price,
          created_at: JSON.stringify(c.product.created_at) */
    
    remove() {
      this.owner.removeLineItem(this);
    }
    
    setAmount(quantity) {
      this.quantity = quantity;
    }
    
    decreaseAmount(n) {
      if (n >= this.quantity) {
        this.remove(); // ta bort raden helt om du försöker minska för mycket
      } else {
        this.quantity -= n;
      }
    }
    increaseAmount(n) {
  this.quantity += n;
}



    getTotalItemPrice() {
      return this.unit_price * this.quantity;
    }
  }
  
  