import DatabaseObject from "./DatabaseObject.js";
import LineItem from "./LineItem.js";

export default class LineItemsObject extends DatabaseObject {
    constructor() {
        super();

        this.lineItems = [];
        
        
    }

    getBaseSaveData() {
        return {};
    }

    addLineItemsToSaveData(saveData) {
        if (Array.isArray(this.lineItems) && this.lineItems.length > 0) {
   
            saveData["lineItems"] = this.lineItems.map(item => {
                return {
                    product_id: item.product_id,
                    product_name: item.product_name,
                    quantity: item.quantity,
                    unit_price: item.unit_price,
                    id: item.id // om du vill spara din slumpade id också
                };
            });
        } else(

            saveData["lineItems"] = this.lineItems
        )
  //---order_items: OrderItem[];--så kommer från frontend
    }

    getSaveData() {//--den är som setupFromDatabase() fast för att spara ner data i DB
        let saveData = this.getBaseSaveData();
        
        this.addLineItemsToSaveData(saveData);
        
        return saveData;
    }
    
    setupFromDatabase(){//AE todo---verkar inte fungera. Den ska bara överridas i order?
        let getData = this.getBaseDBData();
        
        this.getLineItemsToData(getData);
        
        return getData;

    }
    
   

    addProduct(product, quantity) {
        let newLineItem = new LineItem(product, quantity);
        newLineItem.id = Math.round(10000000000*Math.random()); //METODO: better id
        newLineItem.owner = this;
        this.lineItems.push(newLineItem);

        return newLineItem;
    }

    getLineItem(id) {
        for(let i = 0; i < this.lineItems.length; i++) {
            if(this.lineItems[i]._id === id) {
                return this.lineItems[i];
            }
        }

        return null
    }

    removeLineItem(lineItem) {
        this.lineItems.splice(this.lineItems.indexOf(lineItem), 1);
    }

   /*  removeProduct(id) {
        for(let i = 0; i < this.lineItems.length; i++) {
            if(this.lineItems[i].id === id) {
                this.lineItems.splice(i, 1);
                break;
            }
        }
    } */

    changeQuantity(id, quantity) {
        //METODO: implement this
    }

    
    totalPrice() {
  return this.lineItems.reduce((sum, item) => sum + item.getTotalItemPrice(), 0);
}

};
