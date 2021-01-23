import React from 'react';
import Beneficiarios from '../../views/beneficiarios';
import CustomPopup from '../dialog/CustomPopup';

const PopupBeneficiary = () => {

    return <CustomPopup title='beneficiario' >
        <Beneficiarios/>
    </CustomPopup> 
}

export default PopupBeneficiary;
