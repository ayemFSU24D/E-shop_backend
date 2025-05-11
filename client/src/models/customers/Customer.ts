export class Customer{
    constructor(
  
    public  firstname:string,
    public lastname: string,
    public email:string,
    public password:number,
    public phone:number,
    public street_address:string,
    public postal_code:number,
    public city:string,
    public country:string,
    ){}
  }

  /* {
	"firstname":"Aylin",
	"lastname":"Emin",
	"email":"nilya@abc.com",
	"password":"123",
	"phone":"072564",
	"street_address":"Mellangatan",
	"postal_code":"222",
	"city":"Dalarna",
	"country":"Sweden"
} */

    export class CustomersExt extends Customer{
        constructor(
      
        public  id:number,
         firstname:string,
         lastname: string,
         email:string,
         password:number,
         phone:number,
         street_address:string,
         post_code:number,
         city:string,
         country:string,
        public created_at:number,
        ){
            super(firstname,lastname,email,password,phone,street_address,post_code,city,country);
        }
      }

    /* "id": 1,
    "firstname": "Aylin",
    "lastname": "Emin",
    "email": "nilya@abc.com",
    "password": "123",
    "phone": "072564",
    "street_address": "Mellangatan",
    "postal_code": "222",
    "city": "Dalarna",
    "country": "Sweden",
    "created_at": "2025-03-10T11:41:53.000Z" */


   

   