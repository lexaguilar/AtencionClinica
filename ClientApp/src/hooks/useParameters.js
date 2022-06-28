import { useState } from "react";
import PropTypes from 'prop-types';
import moment from "moment";


const useParameters = ({ predicate = () => true }) => {

    const mydate = new Date(moment().year(), moment().month(), moment().date(), 0, 0, 0, 0);
    
    const [ param, setParam ] = useState({ from: mydate, to: mydate, areaId: 0, doctorId : 0, productId : 0 });

    return {
        param, 
        setParam,
        isValid: predicate(param)
    }

}

useParameters.propTypes = {
    predicate: PropTypes.func
};

export default useParameters;