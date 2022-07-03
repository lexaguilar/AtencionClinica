import { useState,useEffect } from "react";
import http from "../utils/http";
import uri from "../utils/uri";


const useAreaServices = ({ areaId }) => {
    
    const [ isLoading, setIsLoading] = useState(true);
    const [ services, setServices] = useState([]);   

    const callApi = async () => {

        const data = await  http(uri.areaServices(areaId).get).asGet();
        setServices(data);
        setIsLoading(false);

    }
    
    useEffect(() => {
        callApi();
    }, [0]);

    return {
        services, 
        isLoading
    }
}

export default useAreaServices;