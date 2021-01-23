import React from 'react';
import Privados from '../../views/privados';
import CustomPopup from '../dialog/CustomPopup';

const PopupPrivado = () => {

    return <CustomPopup title='cliente privado' >
        <Privados/>
    </CustomPopup> 
}

export default PopupPrivado;
