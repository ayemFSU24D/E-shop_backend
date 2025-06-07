import client from "../DatabaseConnection.js"


export default class DatabaseObject{
    constructor(){
        this._id=null
        
    }

    getCollection() {
        return null;
    }

        async getDatabaseData(parameter){
            /* let query={"product_id":this.product_id} */
            let data= await client.findAll(this.getCollection(),parameter)
            console.log("getDatabaseData", data);
                return data
            }
     
        
    

    setupFromDatabase(data){  //--overriddas sedan
        console.warn("setupFromDatabase should be overriden", this);
    }
    

    async load(parameter) {  //----hämtar bara en filterat dokument efter vis parameter
        let data= await this.getDatabaseData(parameter);
        console.log("testar data",data[0], data);
        if (!data || data.length === 0) {
        throw new Error("Document not found");
    }
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







                                            //---anv'nds inte fr[n min frontend]
    static async getAllByOrderId(data) {     //---Hämtar filterat LISTA[] efter vis parameter, men ska skrivas i specifa sidor(inte i basklassen)
        console.warn("setupFromDatabase should be overriden", this);
        }

    getSaveData() {
        console.warn("Does not have save data", this);
        return {};
    }
    

    
    async save() {  //--fungerar inte om man vill push till redan befintlig [] i db
            let collection = await client.getCollection(this.getCollection());
            let data = this.getSaveData();
            console.log(data)
            if(this._id) {
                let objectid=client.toObjectId(this._id)
                console.log(objectid)
                let updateResult= await collection.updateOne({_id: objectid}, {$set: data})// skriver över de befintliga egenskaper(dvs kan inte push till redan befintlig [] i db) )
                /* { $push: { lineItems: { $each: [item1, item2] } } }---bara pusha flera items på en gång till befintlig array */
                console.log(updateResult)
                return updateResult;
            }
            else {
                let insertResult = await collection.insertOne(data);
                
                this._id = insertResult.insertedId;
                
                return insertResult;
            }
        }  
    
        
        async  deleteOne(id) {
            
            let collection = await client.getCollection(this.getCollection())
            let objectid=client.toObjectId(id)
            let product= await collection.deleteOne({ _id: objectid});
            return product;
    }
    
}