import { useState,useEffect } from "react";
import http from "../utils/http";
import uri from "../utils/uri";

const useProducts = ({areaId = 0,exists=false, active=false}) => {
    
    const [ isLoading, setIsLoading] = useState(true);
    const [ products, setProducts] = useState([]);   

    const callApi = async () => {

        const data = await http(uri.products.getByArea(areaId)).asGet({ exists: exists, active : active });        

        setProducts(data);
        setIsLoading(false);

    }
    
    useEffect(() => {
        callApi();
    }, [areaId]);

    return {
        products, 
        setProducts,
        isLoading
    }

}

export default useProducts;