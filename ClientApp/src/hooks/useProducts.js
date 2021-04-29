import { useState,useEffect } from "react";
import http from "../utils/http";
import uri from "../utils/uri";

const useProducts = ({areaId = 0,exists=false, active=false, has=false}) => {
    
    const [ isLoading, setIsLoading] = useState(true);
    const [ products, setProducts] = useState([]);   

    const callApi = async () => {
       
        const data = await http(uri.products.getByArea(areaId)).asGet({ exists, active, has });        
       
        setProducts(data);
        setIsLoading(false);

    }

    const reload = callApi;
    
    useEffect(() => {
        callApi();
    }, [areaId]);

    return {
        products, 
        setProducts,
        isLoading,
        reload,
    }

}

export default useProducts;