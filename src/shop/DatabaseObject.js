import client from "../DatabaseConnection.js"


export default class DatabaseObject{
    constructor(){
        this._id=null
        
    }

    getCollection() {
        return null;
    }

    /* async getDatabaseData(){   //------------hämtar collectionen i array men möjlighet query (filter)
        let data= await client.findAll(this.getCollection(),{"_id":this._id})
        return data
    } */

 
        async getDatabaseData(parameter){
            /* let query={"product_id":this.product_id} */
            let data= await client.findAll(this.getCollection(),parameter)
                return data
            }
       /*  console.warn("setupFromDatabase should be overriden", this); */
        
    

    setupFromDatabase(data){  //--overriddas sedan
        console.warn("setupFromDatabase should be overriden", this);
    }
    
    /* async load(){  //---hämtar data om vis document
        let data= await this.getDatabaseData();
        this.setupFromDatabase(data[0])
        console.log(this);
    } */

    async load(parameter) {  //----hämtar bara en filterat dokument efter vis parameter
        let data= await this.getDatabaseData(parameter);
        console.log("testar data",data[0]);
        
        this._id = data[0]._id;
        this.setupFromDatabase(data[0])
        console.log(this);
    }
    
    /* 
    //---Hämtar filterat LISTA[] efter vis parameter, men ska skrivas i specifa sidor(inte i basklassen)----------------------------------------
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------
    static async getAllByParameter() {
        let instance = new LineItem();  
   let data = await instance.getDatabaseData(); 
   return data.map(itemData => {
    let lineItem = new LineItem();
    lineItem._id = itemData._id;  
    lineItem.setupFromDatabase(itemData);
    return lineItem;
    });
    }
    
    static async getAllByOrderId(data) {    
        let parameter = { "order_id": new ObjectId(data) };
        return await Cart.getAllByParameter(parameter);  
        } */
    // -----------------------------------------------------------------------------------------------------------------------------------------------------------------
    //---Hämtar filterat LISTA[] efter vis parameter, men ska skrivas i specifa sidor(inte i basklassen)----------------------------------------








    static async getAllByOrderId(data) {     //---Hämtar filterat LISTA[] efter vis parameter, men ska skrivas i specifa sidor(inte i basklassen)
        console.warn("setupFromDatabase should be overriden", this);
        }



    save(){}
}