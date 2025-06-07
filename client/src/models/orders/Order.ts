import { OrderItem } from "./OrderItem";

export type Order = {
  customer_id: number;
  payment_status: string;
  payment_id: string | null;
  order_status: string;
  order_items: OrderItem[];
};


/* {   Skapar order
  "customer_id": 2,
  "payment_status": "unpaid",
  "payment_id": null,
  "order_status": "pending",
  "order_items": [
    {
      "product_id": 6,
      "product_name": "Mjölk",
      "quantity": 3,
      "unit_price": 100
    },
    {
      "product_id": 8,
      "product_name": "Yogurt",
      "quantity": 3,
      "unit_price": 123
    }
  ]
} */

  export interface OrderId {
    insertedId: number;    
}