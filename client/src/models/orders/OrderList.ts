

export type OrderList={
    

     id:number,
     customer_id: number,
     total_price:number,
     payment_status:number,
     payment_id: null,
     order_status:boolean,
     created_at:string,
        customer_firstname: string,
		customer_lastname: string,
		customer_email: string,
		customer_phone: number,
		customer_street_address: string,
		customer_postal_code: string,
		customer_city: string,
		customer_country: string,
		customers_created_at: string
}







/* [   hämtar alla ordrar
	{
		"id": 1,
		"customer_id": 1,
		"total_price": 669,
		"payment_status": "unpaid",
		"payment_id": null,
		"order_status": "pending",
		"created_at": "2025-03-13T21:15:08.000Z",
		"customer_firstname": "John",
		"customer_lastname": "Doe",
		"customer_email": "john.doe@gmail.com",
		"customer_phone": "53451234",
		"customer_street_address": "Street 123",
		"customer_postal_code": "Postal code",
		"customer_city": "City",
		"customer_country": "Country",
		"customers_created_at": "2025-03-13T20:42:58.000Z"
	}
] */