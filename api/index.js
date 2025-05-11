import { MongoClient, ObjectId  } from "mongodb";

import Product from "./src/shop/Product.js";
import User from "./src/shop/User.js";
import Cart from "./src/shop/Cart.js";
import DatabaseObject from "./src/shop/DatabaseObject.js";
import LineItem from "./src/shop/LineItem.js";
import express from "express"
import client from "./src/DatabaseConnection.js"
import Review from "./src/shop/Review.js";
// import Stripe from 'stripe';
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


//let url="mongodb+srv://ayemfsu24:D83gTM1772z1TS1B@ayemfsu24.74ipt.mongodb.net/?retryWrites=true&w=majority&appName=ayemfsu24"
let url="mongodb://localhost:27017"

client.setup(url,"E-Shop_Systemutvekling")


let connectToMongo= async function(){
    
  
  let app=express();
  
  app.use(express.json());//---parsar från JSON 
  app.get("/", (req,res)=>{
    res.send({"test":"testfdf"})
  });
  
  app.get("/products/",async(req,res)=>{  //------------fungerar med ObjectOrienterat----------
    
    try {
      let products = await Product.getAll();
      res.json(products);
    } catch (err) {
      console.error(err);
      res.status(500).send("Något gick fel vid hämtning av produkter.");
    } 
  });
  
  
  
  /* app.get("/products/add", async (req, res) => {
  let document = { name: "Test product 3", price: 150 }; 
  
  // kommentera bort allt för test
   let result = await Product.save(document); 
  
  console.log("Inne i GET /products/add", result);


  
  res.send(result);
  }); */

    app.get("/products/add/", async (req, res) => {
        let newProduct = new Product();

        newProduct.name = "Test OOP";
        newProduct.price = 123;

      let result=  await newProduct.save(); 
        /* res.send({ message: "Produkt tillagd", product: newProduct }); */
        res.send(result);
      });  
  
  app.get("/products/:id",async(req,res)=>{    //------------fungerar med ObjectOrienterat----------
    let id="680d3230cc9be1a673923d3a"  /*  req.params.id  */
    let product=await Product.getOne(id);
    res.send(product);  
  })
        
        app.post("/products/",async(req,res)=>{
          
          
        })
        
        
        
        app.get("/products-with-category", async (req, res) => {
          
          
          
          
          const result= await productsCollection.aggregate([
                {
                  $lookup: {
                    from: "categories",
                    localField: "categoryIds",//---array
                    foreignField: "_id",
                    as: "categoryDetails"
                    }
                },
                {
                  $match: {
                    "categoryDetails.name": "Shoes"
                    }
                  },
                  {
                    //kan välja vilka fält vill att ska visas(kanske man behöver inte se alla egensakper)
                    $project: {//---1=visa egenskapen, 0=visa inte
                      name: 1,
                      price: 1,
                      //size: 1,          // eller sizes: 1
                      categoryDetails: 1
                    }
                  }
                ]
              ).toArray();
              //   console.log(result)
              res.send(result);})
              
              


      
        
        
        
        app.get("/users/", async(req,res)=>{    //------------fungerar med ObjectOrienterat----------
          try { 
                   let users = await User.getAll();
                   res.json(users);
                 } catch (err) {
                   console.error(err);
                   res.status(500).send("Något gick fel vid hämtning av produkter.");
                 } 
             });


    app.get("/users/:id",async(req,res)=>{    //------------fungerar med ObjectOrienterat----------
  
        let id="680d2395cc9be1a673923cf9"  /*  req.params.id  */
        let user=await User.getOne(id);
        res.send(user);  
})


app.get("/reviews_oop/",async(req,res)=>{  //------------fungerar med ObjectOrienterat----------
        
    try {
     let reviews = await Review.getAll();
     res.send(reviews);
   } catch (err) {
     console.error(err);
     res.status(500).send("Något gick fel vid hämtning av produkter.");
   } 
});




app.get("/reviews_oop/:id",async(req,res)=>{    //------------fungerar med ObjectOrienterat----------
let id="6811dd02dbc57c624e4d2ed4"  /*  req.params.id  */
let review=await Review.getOne(id);
res.send(review);  
})

app.get("/reviews_by_product/:product_id",async(req,res)=>{
    let productId="680d3230cc9be1a673923d3a"  /*  req.params.id  */
  let review=await Review.getOneByProduct(productId);
res.send(review);
})


    
    app.get("/reviews_detailed/",async(req,res)=>{   //------------fungerar----------    
        
        let detailedReview= await Review.getAllDetailedProductInfo()

        res.send(detailedReview)
     
    })


    app.get("/orders/",async(req,res)=>{    //------------fungerar ---------- 
        let orders= await client.findAll("Orders");
        res.send(orders)
    })


    app.get("/lineitems/", async(req,res)=>{    //-----------fungerar med ObjectOrienterat----------
     console.log("urlen körs")
        try { 
         let lineitems = await LineItem.getAll();
         res.send(lineitems);
       } catch (err) {
         console.error(err);
         res.status(500).send("Något gick fel vid hämtning av produkter.");
       } 
   });


    app.get("/lineitems/:id",async(req,res)=>{    //------------fungerar med ObjectOrienterat----------
        let id="680d3688cc9be1a673923d46"  /*  req.params.id  */
        let lineitem=await LineItem.getOne(id);
        res.send(lineitem);  
    })


    app.get("/cart/:order_id",async(req,res)=>{    //---------------------
        let id="680d3866cc9be1a673923d4a"  /*  req.params.id  */
        let cart=await Cart.getAllByOrderId(id);
        
        res.send(cart);  
    })
     




    // let database= client.db("Systemutveckling");
    // let productsCollection= database.collection("Products");
    // let query={price:{$gt:260}}
    //      let products= await productsCollection.find().toArray();-Tomt find() hämtar alla producter
    // let products= await productsCollection.find(query).toArray();
    // console.log(products);
    //      await productsCollection.insertOne({name:"Test product 3", price:150});--lägger till produkter i db
    // products.map((item)=>{
    //     console.log(item.name)
    // })



   
    


   


    // app.post('/stripe/create-checkout-session-embedded', async (req, res) => {
    //   try{
    
      
    //   const { order_id,order_items } = req.body;
      
    //   /* console.log(req.body)
    //   console.log(order_id)
    //   console.log(order_items) */
     
    
      
    
    //   const session = await stripe.checkout.sessions.create({
    //     line_items: order_items.map((item) => ({
    //       price_data: {
    //         currency: 'sek',
    //         product_data: {
    //           name: item.product_name,
    //         },
    //         unit_amount: item.unit_price * 100, // Stripe kräver belopp i öre
    //       },
    //       quantity: item.quantity,
    //     })),
    //     mode: 'payment',
    //     ui_mode: 'embedded',
    //     return_url: 'http://localhost:5173/order-confirmation?session_id={CHECKOUT_SESSION_ID}',
    //     client_reference_id: String(order_id)/* '123' */
    //   });
      
    //   console.log(session)
    //   res.send({clientSecret: session.client_secret});
    // }catch(error){
    //   console.log(error)
    //   res.json(error)
    // }
    // });
    
    // app.post('/stripe/webhook', async (req, res) => {
    //   const event = req.body;
      
    //   // Handle the event
    //   switch (event.type) {
    //     case 'checkout.session.completed':
    //       const session = event.data.object;
    //       const id = session.client_reference_id;
    //       const orderItems = session.display_items;
    //       console.log(session);
    //       try {
    //     const sql = `
    //       UPDATE orders 
    //       SET payment_status = ?, payment_id = ?,order_status = ?
    //       WHERE id = ?
    //     `;
    //     const payment_status = "Paid";
    //         const payment_id = session.id;
    //         const order_status = "Received";
    //         const id = session.client_reference_id; // t.ex. om du sparade order-id i metadata
    
    //         const [result] = await db.query<ResultSetHeader>(sql, [
    //           payment_status,
    //           payment_id,
    //           order_status,
    //           id
    //         ]);
    
    
    
    
    //         const orderItemsQuery = `
    //         SELECT * FROM order_items WHERE order_id = ?
    //       `;
    //       /* const [orderItems]:[IOrderItem[], FieldPacket[]] = await db.query(orderItemsQuery, [id]);
    //    */
    //       // Uppdatera lagerstatus för varje produkt i ordern
    //       for (const item of orderItems) {
    //         const productId = item.product_id;
    //         const quantitySold = item.quantity;
      
    //         const sqlUpdateProduct = `
    //           UPDATE products 
    //           SET stock = stock - ? 
    //           WHERE id = ?
    //         `;
      
    //         // Kör SQL-frågan för att uppdatera produktens lager
    //         const [productResult] = await db.query<ResultSetHeader>(sqlUpdateProduct, [
    //           quantitySold,
    //           productId
    //         ]);
    //          }
    
    
    
    
            
    
    //     result.affectedRows === 0
    //       ? res.status(404).json({message: 'Order not found'})
    //       : res.json({message: 'Order updated'});
    //       return;
    //   } catch(error) {
    //     res.status(500).json({error: logError(error)})
    //   }
          
    //       // Update order with confirmed payment
    //       // -- payment_status = "Paid"
    //       // -- payment_id = session.id
    //       // -- order_status = "Received"
    
    //       // Update product stock
    
    //       // Send confirmation email to customer
    
    //       // Sen purchase to accounting service
    //       console.log(event.type.object);
    //       break;
    //     default:
    //       console.log(`Unhandled event type ${event.type}`);
    //   }
    
    //   // Return a response to acknowledge receipt of the event
    //   res.json({received: true});
    // });














app.listen(4000,()=>{
    console.log("Servern körs på http://localhost:4000");
})

}
connectToMongo();