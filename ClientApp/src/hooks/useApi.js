import { useState,useEffect } from "react";


const useApi = url => {
    
    const [ isLoading, setIsLoading] = useState(true);
    const [ data, setData] = useState(null);
    const [ error, setError] = useState('');

    const callApi = async () => {

        const response = await fetch(url);
        const data = await response.json();
        setData(data);
        setIsLoading(false);

    }

    
    useEffect(() => {
        callApi();
    }, []);

    return {
        response = data, 
        error,  
        isLoading
    }
}

export default useApi;