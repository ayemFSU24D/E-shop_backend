import DatabaseObject from './DatabaseObject.js';
import client from "../DatabaseConnection.js";
import { ObjectId } from "mongodb";
import LineItem from './LineItem.js';

export default class User extends DatabaseObject{
    constructor(){
        super();
        this.first_name=null
        this.last_name=null
        this.email=null
        this.password=null
        this.phone=null
        this.street_address=null
        this.post_code=null
        this.city=null
        this.country=null
        this.created_at=null
        this.role=null
        this.membership_level=null
        this.poins=0
        this.created_at=null
    }

    setupFromDatabase(data) {
        this.first_name = data.name;
        this.last_name = data.name;
        this.email = data.email;
        this.password=data.password;
        this.phone=data.phone
        this.street_address=data.street_address
        this.post_code=data.post_code;
        this.city=data.city;
        this.country=data.country;
        this.created_at=data.created_at;
        this.role=data.role;
        this.membership_level=data.membership_level;
        this.poins=data.poins;
        this.created_at=data.created_at;
        }
    
        getCollection() {
            return "users";
        }
    
       

    
        static async getAll() {    //Nästan sämma med getAllByParameter(parameter), fast utan parameter
            let data = new LineItem();  
            let users = await data.getDatabaseData(); 
            return users.map(i => {
              let user = new LineItem();
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
    
}
