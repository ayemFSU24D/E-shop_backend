import LineItem from './LineItem.js';
import client from "../DatabaseConnection.js"
import { ObjectId } from "mongodb";

import LineItemsObject from "./LineItemsObject.js";

export default class Order extends LineItemsObject {
    constructor() {
        super();
        this.payment_id=null
        this.payment_status=null
        this.order_status= null
        this.created_at=new Date()
        this.customerDetails = {//AETODO: add all parameters for customer
            "firstName": "",
            "lastName": "",
            "email": ""
        };
    }

    getCollection() {
        return "orders";
    }

    setupFromDatabase(data) {
        this.payment_id = data.payment_id;
        this.payment_status = data.payment_status;
        this.order_status=data.order_status;
        this.customerDetails=data.customerDetails;
    }

    getBaseSaveData() {
        return {
            "payment_id":this.payment_id,
            "payment_status":this.payment_status,
            "order_status":this.order_status,
            "customer": this.customerDetails,
        }
    }

static async getOne(data) {
        let parameter= {"_id":new ObjectId(data)}
        let order= new Order()
        order._id = new ObjectId(data); 
        await order.load(parameter)
        return order;
       }

static async getAll() {    //Nästan sämma med getAllByParameter(parameter), fast utan parameter
                let data = new Order();  
                let orders = await data.getDatabaseData(); 
                return orders.map(i => {
                  let order = new Order();
                  order._id = i._id;  
                  order.setupFromDatabase(i);
                  return order;
                 });
               }

    static async update(id) {

  const order = new Order();
  const data = await Order.load(id)

  if (!data) return null;

  order.id = data._id;
  order.customerDetails = data.customer;
  order.lineItems = data.lineItems;
  order.totalPrice = data.totalPrice;
  order.status = data.status;

  return order;
}



}