import { useState,useEffect } from "react";
import http from "../utils/http";


const useProducts = (areaId) => {
    
    const [ isLoading, setIsLoading] = useState(true);
    const [ products, setProducts] = useState([]);   

    const callApi = async () => {

        const data = await http(`products/getbyarea/${areaId}`).asGet();        
        setProducts(data);
        setIsLoading(false);

    }

    
    useEffect(() => {
        callApi();
    }, []);

    return {
        products, 
        isLoading
    }
}

export default useProducts;