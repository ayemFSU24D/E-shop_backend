/*---------------------Sebastians lösning-----------
export const get = async <T>(url: string) => {
    const response = await fetch(url);
    const data: T = await response.json();
    
    return data;
  }; */
  export const API_URL = "http://localhost:4000";
  
  export const handleRequest = async <T>(request: Promise<Response>): Promise<T> => {
    const response = await request;
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }
    return response.json();
  };
  