import LineItem from './LineItem.js';
import client from "../DatabaseConnection.js"
import { ObjectId } from "mongodb";

export default class Order extends LineItem{
    constructor(){
        super();
        
    }
} 