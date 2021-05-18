import { useState,useEffect } from "react";
import http from "../utils/http";
import uri from "../utils/uri";

const useClients = () => {
    
    const [ isLoading, setIsLoading] = useState(true);
    const [ clients, setClients] = useState([]);   

    const callApi = async () => {
       
        const data = await http(uri.privateCustomers().getAsCatalogSingle).asGet();        
       
        setClients(data);
        setIsLoading(false);

    }

    const reload = callApi;
    
    useEffect(() => {
        callApi();
    }, [0]);

    return {
        clients, 
        setClients,
        isLoading,
        reload,
    }

}

export default useClients;