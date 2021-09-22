import { useState,useEffect } from "react";
import http from "../utils/http";
import uri from "../utils/uri";

const useDoctors = () => {
    
    const [ isLoading, setIsLoading] = useState(true);
    const [ doctors, setDoctors] = useState([]);   

    const callApi = async () => {
       
        const data = await http(uri.doctores.get).asGet();        
       
        setDoctors(data);
        setIsLoading(false);

    }

    const reload = callApi;
    
    useEffect(() => {
        callApi();
    }, [0]);

    return {
        doctors, 
        setDoctors,
        isLoading,
        reload,
    }

}

export default useDoctors;