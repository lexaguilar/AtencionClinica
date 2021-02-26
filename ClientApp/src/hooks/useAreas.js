import { useState,useEffect } from "react";
import http from "../utils/http";
import uri from "../utils/uri";


const useAreas = () => {
    
    const [ isLoading, setIsLoading] = useState(true);
    const [ areas, setAreas] = useState([]);   

    const callApi = async () => {

        const data = await  http(uri.areas.get).asGet();
        setAreas(data);
        setIsLoading(false);

    }

    
    useEffect(() => {
        callApi();
    }, [0]);

    return {
        areas, 
        isLoading
    }
}

export default useAreas;