import LineItem from './LineItem.js';
import Product from './Product.js';
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
        this.customer_id=null
        this.total_price = 0;

       /*  this.customerDetails = {//AETODO: add all parameters for customer
            "firstName": "",
            "lastName": "",
            "email": "",
            "phone":null,
            "street_address":"",
            "postal_code":"",
            "city":"",
            "country":""
        };*/
    }

     /* type Order = {   //---frontend skickar uppgifter
     payment_id: string | null;
     payment_status: string;
     order_status: string;
     order_items: OrderItem[];
     customer_id: number;
} */

    getCollection() {
        return "orders";
    }

    setupFromDatabase(data) {
        this.payment_id = data.payment_id;
        this.payment_status = data.payment_status;
        this.order_status=data.order_status;
        this.customer_id=data.customer_id;

         if (data.order_items && Array.isArray(data.order_items)) {
    for (let item of data.order_items) {
      // Skapa ett "produkt-liknande" objekt som LineItem förväntar sig
      let fakeProduct = {
        product_id: item.product_id,
        product_name: item.product_name,
        unit_price: item.unit_price
      };

      // Använd ärvda addProduct från LineItemsObject
      this.addProduct(fakeProduct, item.quantity);
    }
  }

      /* if (data.order_items && Array.isArray(data.order_items)) { //---fungerar inte
    this.lineItems = data.order_items.map(item => {
      let lineItem = new LineItem(
        { _id: item.product_id, _name: item.product_name, unit_price: item.unit_price },
        item.quantity
      );
      return lineItem;
    });
  } */
        
        
    }

    getBaseSaveData() {
        return {
            "payment_id":this.payment_id,
            "payment_status":this.payment_status,
            "order_status":this.order_status,
            "customer_id": this.customer_id ? new ObjectId(this.customer_id) : null,
            "total_price": this.totalPrice()
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

  




  static async getOneByPaymentID(paymentId) {
    const ordersCollection = await client.getCollection("orders");

    const pipeline = [
      { $match: { payment_id: paymentId } },
      {
        $lookup: {
          from: "users", // ändra till din användarkollektion om den heter något annat
          localField: "customer_id",
          foreignField: "_id",
          as: "customer"
        }
      },
      { $unwind: { path: "$customer", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          id: { $toString: "$_id" },
          customer_id: { $toString: "$customer_id" },
          total_price: 1,
          payment_status: 1,
          payment_id: 1,
          order_status: 1,
          created_at: {
            $dateToString: { format: "%Y-%m-%dT%H:%M:%S.%LZ", date: "$created_at" }
          },
          customer_firstname: "$customer.firstname",
          customer_lastname: "$customer.lastname",
          customer_email: "$customer.email",

          customer_phone: "$customer.phone",
          customer_street_address: "$customer.street_address",
          customer_postal_code: "$customer.postal_code",
          customer_city: "$customer.city",
          customer_country: "$customer.country",
          order_items: "$lineItems" // OBS: se till att order_items finns i dokumentet
        }
      }
    ];

    const result = await ordersCollection.aggregate(pipeline).toArray();

    if (result.length === 0) return null;
    return result[0]; // matchar din OrderById typ
  }


static async updateOrder(orderId, updates) {
  try {
    const existingOrders = await client.findAll("orders", { _id: new ObjectId(orderId) });
    const existingOrder = existingOrders[0];

    if (!existingOrder) {
      return { error: "Order not found" };
    }

    const updatedOrder = {
      ...existingOrder,
      ...updates,
      lineItems: updates.lineItems ?? existingOrder.lineItems,
    };
    
    await client.update("orders", { _id: new ObjectId(orderId) }, { $set: updatedOrder });
    
    return { success: true, order: updatedOrder };
  } catch (error) {
    console.error("Update failed:", error);
    return { error: "Internal server error" };
  }
}
// services/ProductService.js eller liknande
static async updateStockAfterPayment(orderId) {
  try {
    const ordersCollection = await client.getCollection("orders");
    const existingOrder = await ordersCollection.findOne({ _id: new ObjectId(orderId) });

    if (!existingOrder) {
      return { error: "Order not found" };
    }

    for (const item of existingOrder.lineItems) {
      const result = await Product.decreaseStock(item.product_id, item.quantity);

      if (result.error) {
        console.warn(`⚠️ Could not decrease stock for product ${item.product_id}`);
      }
    }

    return { success: true };
  } catch (error) {
    console.error("❌ Failed to update stock:", error);
    return { error: "Stock update failed" };
  }
}



// static async updateStockAfterPayment(orderId) {   //----fungerar------
//   try {
//     const ordersCollection = await client.getCollection("orders");
//     const existingOrder = await ordersCollection.findOne({ _id: new ObjectId(orderId) });
//       if (!existingOrder) {
//         return res.status(404).json({ message: "Order not found" });
//       }
//     const productsCollection = await client.getCollection("products");

//     for (const item of existingOrder.lineItems) {
//       const result = await productsCollection.updateOne(
//         { _id: new ObjectId(item.product_id) },
//         { $inc: { stock: -item.quantity } }
//       );

//       if (result.matchedCount === 0) {
//         console.warn(`Product with ID ${item.product_id} not found`);
//       }
//     }

//     return { success: true };
//   } catch (error) {
//     console.error("Failed to update stock:", error);
//     return { error: "Stock update failed" };
//   }
// }





//     static async update(id) {

//   const order = new Order();
//   const data = await Order.load(id)

//   if (!data) return null;

//   order.id = data._id;
//   order.customerDetails = data.customer;
//   order.lineItems = data.lineItems;
//   order.totalPrice = data.totalPrice;
//   order.status = data.status;

//   return order;
// }



}