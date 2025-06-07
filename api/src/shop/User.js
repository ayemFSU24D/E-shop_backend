import DatabaseObject from './DatabaseObject.js';
import client from "../DatabaseConnection.js";
import { ObjectId } from "mongodb";
import LineItem from './LineItem.js';

export default class User extends DatabaseObject{
    constructor(){
        super();
        this.firstname=null
        this.lastname=null
        this.email=null
        this.password=null
        this.phone=null
        this.street_address=null
        this.postal_code=null
        this.city=null
        this.country=null
        this.created_at=null
        this.role=null
        this.membership_level=null
        this.poins=0
        this.created_at=null
    }

    setupFromDatabase(data) {
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.email = data.email;
        this.password=data.password;
        this.phone=data.phone
        this.street_address=data.street_address
        this.postal_code=data.postal_code;
        this.city=data.city;
        this.country=data.country;
        this.created_at=data.created_at;
        this.role=data.role;
        this.membership_level=data.membership_level;
        this.poins=data.poins;
        
        }
    
        getCollection() {
            return "users";
        }
    
       getSaveData() {
        return {"firstname": this.firstname, "lastname": this.lastname, "email": this.email ,"password": this.password,
             "phone":this.phone,"street_address":this.street_address, "postal_code":this.postal_code,"city":this.city,
             "country":this.country,"created_at":this.created_at,
             "role":this.role,"membership_level":this.membership_level,
             "poins":this.poins};
    }

    
        static async getAll() {    //Nästan sämma med getAllByParameter(parameter), fast utan parameter
            let data = new User();  
            let users = await data.getDatabaseData(); 
            return users.map(i => {
              let user = new User();
              user._id = i._id;  
              user.setupFromDatabase(i);
              return user;
             });
           }

        static async getOne(data) {
            let parameter= {"_id":new ObjectId(data)}
            let user= new User()
            user._id = new ObjectId(data); 
            await user.load(parameter)
            return user;
        }
        static async getOneByEmail(data) {
            let parameter= {"email":data}
         const user = new User();
  try {
    await user.load(parameter);
    return user;
  } catch (err) {
    if (err.message === "Document not found") {
      return null;
    }
    throw err;  // Om något annat fel inträffar, skicka vidare det
  }

        }
    
}
