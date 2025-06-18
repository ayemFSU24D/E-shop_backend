import { ProductExt } from "../products/Product";


export class CartItem {
  constructor(
    public product: ProductExt,
    public quantity: number,
    public image:string
  ) {}
}

/* export interface IOrderItem extends RowDataPacket {
  id: number | null
  order_id: number
  product_id: number
  product_name: string
  quantity: number
  unit_price: number
  created_at: string
} */


  export class CartAddition {
      constructor(
    public product: ProductExt,
    public quantity: number,
  ) {}
  }