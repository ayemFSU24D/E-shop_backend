


//----------------------------------------------
//----------------------------------------------
//-----körs INLEMNINGSUPPGIFT i terminalen med:-----------------------------------------
//----stripe listen --forward-to http://localhost:4000/stripe/webhook
//------------------------------------------
//----------------------------------------------
//----------------------------------------------







import { MongoClient, ObjectId  } from "mongodb";
import cookieParser from "cookie-parser";
import cors from "cors";
import Product from "./src/shop/Product.js";
import User from "./src/shop/User.js";
import Cart from "./src/shop/Cart.js";
import Order from "./src/shop/Order.js";
import DatabaseObject from "./src/shop/DatabaseObject.js";
import LineItem from "./src/shop/LineItem.js";
import express from "express"
import client from "./src/DatabaseConnection.js"
import Review from "./src/shop/Review.js";
 import Stripe from 'stripe';
 import dotenv from 'dotenv';
dotenv.config(); 
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


//let url="mongodb+srv://ayemfsu24:D83gTM1772z1TS1B@ayemfsu24.74ipt.mongodb.net/?retryWrites=true&w=majority&appName=ayemfsu24"
let url="mongodb://localhost:27017"

client.setup(url,"E-Shop_Systemutvekling")


let connectToMongo= async function(){
    
  
  let app=express();
  
  app.use(express.json());//---parsar från JSON 

  app.use(cookieParser());
app.use(cors());

  
  
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
  
  
  app.get("/products/delete/:id", async (req, res) => { //------------fungerar med ObjectOrienterat----------
    let product = new Product();
    let result= await product.deleteOne(req.params.id) // Mongoose
    
    res.send(result);
  });  
                                                  //------------fungerar med ObjectOrienterat----------
  app.post("/products/add", async (req, res) => { //-------fungerar i Insomnia-------
   
    let data= req.body
    let newProduct = new Product();//--at skriva data i Product hjälper inte

    newProduct.setupFromDatabase(data)
    
      let result=  await newProduct.save(); 
      /* res.send({ message: "Produkt tillagd", product: newProduct }); */
      res.send(result);
    });  
  app.post("/products/add/:id", async (req, res) => { //-------fungerar i Insomnia-------
    let id=  req.params.id 
    let data= req.body
    let newProduct = new Product();//--at skriva data i Product hjälper inte

    newProduct.setupFromDatabase(data)
    newProduct._id=id
     
      
      let result=  await newProduct.save(); 
      /* res.send({ message: "Produkt tillagd", product: newProduct }); */
      res.send(result);
    });  
    
    
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
    
    /* app.post("/products/",async(req,res)=>{
      
      
    }) */
    
    app.get("/products/:id",async(req,res)=>{    //------------fungerar med ObjectOrienterat----------
      let id=  req.params.id 
      let product=await Product.getOne(id);
      res.send(product);  
    })
         
              
              
      app.get("/users/", async(req,res)=>{    //------------fungerar med ObjectOrienterat----------
        try { 
          let users = await User.getAll();
          res.json(users);
        } catch (err) {
          console.error(err);
          res.status(500).send("Något gick fel vid hämtning av produkter.");
        } 
      });
      
  //     app.post("/users/add", async (req, res) => { //----------fungerar med oop----todo: kolla om kunden redan finns
  
  //  let data= req.body
  //  let newUser = new User();//--at skriva data i Product hjälper inte-----

  //  newUser.setupFromDatabase(data)
   
  //    let result=  await newUser.save(); 
  //    /* res.send({ message: "Produkt tillagd", product: newProduct }); */
  //    res.send(result);
  //  });  
      
  
  app.post("/users/add", async (req, res) => { //----------fungerar med oop----todo: kolla om kunden redan finns
  
   let data= req.body
   let newUser = new User();//--at skriva data i Product hjälper inte-----

   newUser.setupFromDatabase(data)
   
     let result=  await newUser.save(); 
     /* res.send({ message: "Produkt tillagd", product: newProduct }); */
     res.send(result);
   });  
  
       
      
      app.get("/users/:id",async(req,res)=>{    //------------fungerar med ObjectOrienterat----------
        
        let id=/* "680d2395cc9be1a673923cf9" */    req.params.id  
        let user=await User.getOne(id);
        res.send(user);  
      })

      app.get("/users/email/:email",async(req,res)=>{    //------------fungerar med ObjectOrienterat----------
        
        let email=/* "680d2395cc9be1a673923cf9" */    req.params.email 
        let user=await User.getOneByEmail(email);
        if (!user) {
      // Skicka 404 om användaren inte hittas
      return res.status(404).json({ message: "User not found" });
    }
        console.log("user by email",user)
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
  
  
  app.get("/orders/",async(req,res)=>{    //------------fungerar med OOP ---------- 
   /*  let orders= await client.findAll("orders");
   res.send(orders) */
   
   let orders= await Order.getAll("orders");
   res.send(orders)

  })

  // app.post("/orders/add", async (req, res) => { //-------fungerar med OOP------
    
  //   let data= req.body
  //   let newOrder = new Order()

  //   newOrder.setupFromDatabase(data)
  //     let result=  await newOrder.save(); 
  //     res.send(result);
  //   }); 

  app.post("/orders/add", async (req, res) => { //-------------
    
    let data= req.body
    let newOrder = new Order()

    newOrder.setupFromDatabase(data)
      let result=  await newOrder.save(); 
      res.send(result);
    }); 

  

    /* type Order = {   //---frontend skickar uppgifter
    payment_id: string | null;
    payment_status: string;
    order_status: string;
    order_items: OrderItem[];
    customer_id: number;
} */


/*   app.post("/orders/update", async (req, res) => { //-------TODO-----
    
    let data= req.body
    let newOrder = new Order()

    newOrder.setupFromDatabase(data)
      let result=  await newOrder.save(); 
      res.send(result);
    }); 
 */
    

 // Pseudokod för PUT /orders/:id


app.patch('/orders/update/:id', async (req, res) => {
  const orderId = req.params.id;
  const updates = req.body;

  const result = await Order.updateOrder(orderId, updates);

  if (result.error) {
    return res.status(400).json(result); // eller 500 beroende på fel
  }

  res.json(result);
});




    // I din backend, t.ex. routes/orders.js eller server.js


app.get('/orders/payment/:session_id', async (req, res) => {
  const sessionId = req.params.session_id;

    let order=await Order.getOneByPaymentID(sessionId);
        if (!order) {
      // Skicka 404 om användaren inte hittas
      return res.status(404).json({ message: "User not found" });
    }
        console.log("order by payment?id",order)
        res.send(order); 
});


// app.post("/orders/update/:id",async(req,res)=>{ //---AETODO: hänta osh updatera order
//   /* let order= req.body */
//   let id="68223156b7a01b09a275d454"  /*  req.params.id  */
//   let order=await Order.getOne(id);
//   res.send(order)   
// })
  
  app.get("/orders/:id",async(req,res)=>{  //------------fungerar med OOP ----------
    
   /*  let id="68223156b7a01b09a275d454"  */
    let id= req.params.id
    let order=await Order.getOne(id);
    res.send(order)
  }  )  
  
    
   
    /*
    newProduct.name = "Test OOP 2";
    newProduct.price = 456;
  
         await newProduct.save();
  
         res.send({"id": newProduct.id});
  
         let order = new Order();
         
         let lineItem = order.addProduct(newProduct, 3);
         
         lineItem.remove();
         lineItem.setAmount(5);
         lineItem.totalPrice();
         
        let savedOrder= await order.save();
        res.send(savedOrder)
        */

  
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
  
  
  app.get("/cart/:order_id",async(req,res)=>{    //--används inte från min frontend-------------------
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
    
    
    
    
    
    
    
    
    
    
    app.post('/stripe/create-checkout-session-embedded', async (req, res) => {
        try{
          
          
          const { order_id,order_items } = req.body;
          console.log("client_session_id i stripe session", order_id);
      
        console.log("hela body i stripe session",req.body)
        /* 
        console.log(order_id)
        console.log(order_items) */
      
      
      
      
        const session = await stripe.checkout.sessions.create({
            line_items: order_items.map((item) => ({
                price_data: {
                    currency: 'sek',
                    product_data: {
                        name: item.product_name,
                      },
                      unit_amount: item.unit_price * 100, // Stripe kräver belopp i öre
                    },
                    quantity: item.quantity,
                  })),
                  mode: 'payment',
        ui_mode: 'embedded',
        return_url: 'http://localhost:5173/order-confirmation?session_id={CHECKOUT_SESSION_ID}',
        client_reference_id: order_id/* '123' */
        
      });
      
      console.log(session)
      res.send({clientSecret: session.client_secret});
    }catch(error){
      console.log(error)
      res.json(error)
    }
    });
    
    app.post('/stripe/webhook', async (req, res) => {
  const event = req.body;
  console.log("webbhook body----", event);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.client_reference_id;

    try {
     

      // Bygg upp de uppdateringar som behövs
      const updatedFields = {
        payment_id: session.id,
        payment_status: "Paid",
        order_status: "Received",
      };
      const result = await Order.updateOrder(orderId, updatedFields);
     
      await Order.updateStockAfterPayment(orderId)
    

      res.json({ message: "Order updated and inventory adjusted" });
    } catch (err) {
      console.error("Webhook error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(200).json({ received: true });
  }
;





      // switch (event.type) {
      //   case 'checkout.session.completed':
      //     const session = event.data.object;
      //     const id = session.client_reference_id;
      //     const orderItems = session.display_items;
      //     console.log(session);
      //     try {
      //   const sql = `
      //     UPDATE orders 
      //     SET payment_status = ?, payment_id = ?,order_status = ?
      //     WHERE id = ?
      //   `;
      //   const payment_status = "Paid";
      //       const payment_id = session.id;
      //       const order_status = "Received";
      //       const id = session.client_reference_id; // t.ex. om du sparade order-id i metadata
    
      //       const [result] = await db.query<ResultSetHeader>(sql, [
      //         payment_status,
      //         payment_id,
      //         order_status,
      //         id
      //       ]);
    
    
    
    
      //       const orderItemsQuery = `
      //       SELECT * FROM order_items WHERE order_id = ?
      //     `;
      //     /* const [orderItems]:[IOrderItem[], FieldPacket[]] = await db.query(orderItemsQuery, [id]);
      //  */
      //     // Uppdatera lagerstatus för varje produkt i ordern
      //     for (const item of orderItems) {
      //       const productId = item.product_id;
      //       const quantitySold = item.quantity;
      
      //       const sqlUpdateProduct = `
      //         UPDATE products 
      //         SET stock = stock - ? 
      //         WHERE id = ?
      //       `;
      
      //       // Kör SQL-frågan för att uppdatera produktens lager
      //       const [productResult] = await db.query<ResultSetHeader>(sqlUpdateProduct, [
      //         quantitySold,
      //         productId
      //       ]);
      //        }
    
    
    
    
            
    
      //   result.affectedRows === 0
      //     ? res.status(404).json({message: 'Order not found'})
      //     : res.json({message: 'Order updated'});
      //     return;
      // } catch(error) {
      //   res.status(500).json({error: logError(error)})
      // }
          
      //     // Update order with confirmed payment
      //     // -- payment_status = "Paid"
      //     // -- payment_id = session.id
      //     // -- order_status = "Received"
    
      //     // Update product stock
    
      //     // Send confirmation email to customer
    
      //     // Sen purchase to accounting service
      //     console.log(event.type.object);
      //     break;
      //   default:
      //     console.log(`Unhandled event type ${event.type}`);
      // }
    
      // Return a response to acknowledge receipt of the event
     
    });














app.listen(4000,()=>{
    console.log("Servern körs på http://localhost:4000");
})

}
connectToMongo();