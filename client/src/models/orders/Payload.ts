
export type Payload = {
  order_id: string;
  order_items: {
    product_id: number;
    product_name: string;
    quantity: number;
    unit_price: number;
    created_at: string;
  }[];
};