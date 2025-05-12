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
   constructor(product, amount) {
     this.id = null;
     this.product = product;
     this.amount = amount;
     this.price = this.product.price;
     this.owner = null;
    }
    
    remove() {
      this.owner.removeLineItem(this);
    }
    
    setAmount(amount) {
      this.amount = amount;
    }
    
    decreaseAmount(n) {
      if (n >= this.amount) {
        this.remove(); // ta bort raden helt om du försöker minska för mycket
      } else {
        this.amount -= n;
      }
    }
    increaseAmount(n) {
  this.amount += n;
}



    getTotalItemPrice() {
      return this.price * this.amount;
    }
  }
  
  