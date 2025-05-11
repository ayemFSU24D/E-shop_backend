export class Product{
  constructor(

  public  name:string,
  public description: string,
  public price:number,
  public stock:number,
  public category:string,
  public image:string
  ){}
}

export class ProductExt extends Product {
  constructor(
    public id:number,
    name:string,
    description:string,
    price:number,
    stock:number,
    category:string,
    image:string,
    public created_at:number
  ){super(name,description,price,stock,category,image)}}

/* {
	"name": "Keso",
	"description": "Coolt",
	"price": 100,
	"stock": 50,
	"category": "Mejeri",
	"image": ""
} */