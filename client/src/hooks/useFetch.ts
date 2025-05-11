/* import { useState } from "react";

 
export const useFetch = () => {    
     const url = "http://localhost:3000/products"
    const [data, setData] = useState<T>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

   

    const fetchData = async <T>( options?: RequestInit) => { 
        try {
            setLoading(true);
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            
            const result:T = await response.json();
            setData(result);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
        
    };

    return { fetchData, data, loading, error };
}; */






/* 
------------------Min bästa fetch-----men fungerade inte i functionen addProducts(hooks kan inte anropas i functioner)------------------

export const useFetch = <T>(url: string, options?: RequestInit) => {     // Så var på lektionerna: export const fetch(url: string, options?: FetchOptions):Promise<Response> =>
    const [data, setData] = useState<T>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => { 
            try {
                setLoading(true);
                const response = await fetch(url, options);
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                
                const result: T = await response.json();
                setData(result);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, JSON.stringify(options)]); // Se till att hooken reagerar på ändringar i URL och options

    return { data, loading, error };
}; */