import { useState,useEffect } from "react";
import http from "../utils/http";


const useProducts = (areaId, exists=false) => {
    
    const [ isLoading, setIsLoading] = useState(true);
    const [ products, setProducts] = useState([]);   

    const callApi = async () => {

        const data = await http(`products/getbyarea/${areaId}`).asGet({ exists });        

        setProducts(data);
        setIsLoading(false);

    }

    
    useEffect(() => {
        callApi();
    }, [areaId]);

    return {
        products, 
        isLoading
    }
}

export default useProducts;