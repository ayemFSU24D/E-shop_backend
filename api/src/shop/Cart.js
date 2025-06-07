import LineItem from './LineItem.js'
import { ObjectId } from "mongodb";
import LineItemsObject from "./LineItemsObject.js";
/* 


export default class Cart extends LineItem{
    constructor(){
        super();
    }


    getCollection() {
        return "lineitems";
    }


    static async getOne(data) {  //---------------Gett one by id
        let parameter= {"_id":new ObjectId(data)}
        let cart=new Cart()
        cart._id=new ObjectId(data);
        await cart.load(parameter)
        return cart;
    }
       
       

        static async getAllByParameter(parameter) {
        let instance = new Cart();  
        let data = await instance.getDatabaseData(parameter); 
        return data.map(itemData => {
            let cartItem = new Cart();
            cartItem._id = itemData._id;  
            cartItem.setupFromDatabase(itemData);
            return cartItem;
        });
    }

    
    
    static async getAllByOrderId(data) { 
        const parameter = { order_id: new ObjectId(data) };
        const cartItems = await Cart.getAllByParameter(parameter);
    
        const total_cartPrice = cartItems.reduce((sum, item) => {
            return sum + item.getTotalItemPrice();
        }, 0);
        
        return {
            items: cartItems,
            total_cartPrice
        };
    }
             
 } */


   ///////////////////// GET LineItems By Order Id  --AETODO
               //-- använd funktionen getbyParameter
   /////////////  GET Total Price By Order Id  --AETODO




   //---------------------------------------Ny----------------------------------
   //---------------------------------------använd inte från min frontend -----------------------------



export default class Cart extends LineItemsObject {
    constructor() {
        super();
    }

    getCollection() {
        return "carts";
    }

    static async getById(id) {
        let newItem = new Cart();
        newItem.id = id;
        await newItem.load();

        return newItem;
    }
}
