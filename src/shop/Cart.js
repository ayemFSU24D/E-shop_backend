import LineItem from './LineItem.js'
import { ObjectId } from "mongodb";


export default class Cart extends LineItem{
    constructor(){
        super();
    }

      setupFromDatabase(data) {

        this.product_id = data.product_id;
    this.quantity = data.quantity;
    this.unit_price = data.unit_price;
    this.order_id = data.order_id;
    this.product_name = data.product_name;
    this.image = data.image;
    this.created_at = data.created_at; 
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


    

                
 }


   ///////////////////// GET LineItems By Order Id  --AETODO
               //-- använd funktionen getbyParameter
   /////////////  GET Total Price By Order Id  --AETODO

