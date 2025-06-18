import { createBrowserRouter } from "react-router";

import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { Layout } from "./pages/Layout";

import { NotFound } from "./pages/NotFound";
import { Customers } from "./pages/Customers";
import { Orders } from "./pages/Orders";

import { Shop } from "./pages/Shop";
import { LayoutAdmin } from "./pages/LayoutAdmin";

import { Products } from "./pages/Products";
import { UppdateProduct } from "./components/products/UppdateProduct";
import { Cart } from "./pages/Cart";

import { OrderDetails } from "./pages/OrderDetails";

import { UppdateOrderItems } from "./components/orders/UppdateOrderItems";
import { OrderConfirmation } from "./components/orders/OrderConfirmation";

import { Checkout} from "./pages/Checkout";
import { Stripe } from "./pages/Stripe";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement:<NotFound/>,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/shop",
          element: <Shop />,
        },
        {
          path: "/cart",
          element: <Cart/>,
        },
        {
          path: "/GammalCheckout",
          element: <Stripe/>,
        },
        {
          path: "/checkout",
          element: <Checkout/>,
        },
        
        {
          path: "/order-confirmation",
          element: <OrderConfirmation/>,
        },
        {
            path: "/admin",
            element: <LayoutAdmin />,
            children:[
                
                {
                    path: "/admin/customers",
                    element: <Customers/>,
                },
                {
                    path: "/admin/products",
                    element: <Products/>,
                    children:[
                      {
                        path: "/admin/products/:id",
                        element: <UppdateProduct/>,
                    }
                  ]
                },
                
                {
                  path: "/admin/orders",
                  element: <Orders/>,
                  children:[
                      {
                        path: "/admin/orders/order-details/:paymentId",
                        element: <OrderDetails />,
                    },
                      {
                        path: "/admin/orders/order-items/:id/:id",
                        element: <UppdateOrderItems />,
                    }

                    ]
                }
                ,
               
                /* {
                    path: "/admin/order-items/:id",
                    element: <OrderItemChange/>,
                } */
          ]
        },
      ],
    },
  ]);