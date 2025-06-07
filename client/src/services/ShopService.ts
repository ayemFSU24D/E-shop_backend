import { Customer, CustomersExt, ExistingCustomer } from "../models/customers/Customer";
import { Order, OrderId } from "../models/orders/Order";
import { OrderById } from "../models/orders/OrderById";
import { OrderData } from "../models/orders/OrderData";

import { OrderList } from "../models/orders/OrderList";
import { UppdateOrderItemById } from "../models/orders/UppdateOrderItemById";
import { Product, ProductExt } from "../models/products/Product";

import { API_URL, handleRequest } from "./ServiceBase";


export const getProducts = async (): Promise<ProductExt[]> => {
  const response = await handleRequest<ProductExt[]>(fetch(`${API_URL}/products`));
  return response; }

export const getProductById = async (id:string): Promise<ProductExt> => {
  const response = await handleRequest<ProductExt>(fetch(`${API_URL}/products/${id}`));
  return response;
};



/* export const fetchPun = async (id: string): Promise<IPun> => {
  const response = await handleRequest<IPun>(fetch(`${API_URL}/puns/${id}`));
  return response;
}; */

export const createProduct = async (body: Product): Promise<ProductExt> => {
  const response = await handleRequest<ProductExt>(
    fetch(`${API_URL}/products/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
  );
  return response;
};

export const uppdateProduct = async (id: number, body: ProductExt): Promise<ProductExt> => {
  const response = await handleRequest<ProductExt>(
    fetch(`${API_URL}/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
  );
  return response;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await handleRequest<void>(
    fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
    })
  );
};



//-----------------Customers------------------------

export const createCustomer = async (body: Customer): Promise<ExistingCustomer> => {
    const response = await handleRequest<ExistingCustomer>(
      fetch(`${API_URL}/users/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
    );
    return response;
  };

  export const getCustomers = async (): Promise<CustomersExt[]> => {
    const response = await handleRequest<CustomersExt[]>(fetch(`${API_URL}/users`));
    return response;
  };
  
  export const getCustomerByEmail = async (email:string): Promise<CustomersExt> => {
    const response = await handleRequest<CustomersExt>(fetch(`${API_URL}/users/email/${email}`));
    return response; }



  //-----------------Orders------------------------

  export const createOrder = async (body: Order): Promise<OrderId> => {
    const response = await handleRequest<OrderId>(
      fetch(`${API_URL}/orders/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
    );
    return response;
  };


  export const getOrderList = async (): Promise<OrderList[]> => {
    const response = await handleRequest<OrderList[]>(fetch(`${API_URL}/orders`));
    return response; }

    export const deleteOrder = async (id: string): Promise<void> => {
      await handleRequest<void>(
        fetch(`${API_URL}/orders/${id}`, {
          method: "DELETE",
        })
      );
    };

    export const uppdateOrder = async (id: string, body: OrderData): Promise<OrderData> => {
      const response = await handleRequest<OrderData>(
        fetch(`${API_URL}/orders/update/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })
      );
      return response;
    };

    export const deleteOrderItem = async (id: string): Promise<void> => {
      await handleRequest<void>(
        fetch(`${API_URL}/admin/orders/order-items/${id}`, {
          method: "DELETE",
        })
      );
    };

    export const uppdateOrderItem = async (id: string, body: UppdateOrderItemById): Promise<UppdateOrderItemById> => {
      const response = await handleRequest<UppdateOrderItemById>(
        fetch(`${API_URL}/order-items/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })
      );
      return response;
    };


   
    export const getOrderListDetailed = async (id:string): Promise<OrderById> => {
      const response = await handleRequest<OrderById>(fetch(`${API_URL}/orders/${id}`));
      return response; }


    export const getOrderListByPaymentId = async (payment_id:string): Promise<OrderById> => {
      const response = await handleRequest<OrderById>(fetch(`${API_URL}/orders/payment/${payment_id}`));
      return response; }