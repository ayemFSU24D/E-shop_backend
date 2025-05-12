import LineItem from './LineItem.js';
import client from "../DatabaseConnection.js"
import { ObjectId } from "mongodb";

import LineItemsObject from "./LineItemsObject.js";

export default class Order extends LineItemsObject {
    constructor() {
        super();

        this.customerDetails = {
            "firstName": "",
            "lastName": "",
            "email": ""
        };
    }

    getCollection() {
        return "orders";
    }

    getBaseSaveData() {
        return {
            "customer": this.customerDetails
        }
    }
}