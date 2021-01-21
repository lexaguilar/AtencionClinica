import React from 'react';
import { Popup } from 'devextreme-react/popup';
import Beneficiarios from '../../views/beneficiarios';
import { useDispatch, useSelector } from 'react-redux'
import { closeDialogBeneficiary, openDialogBeneficiary } from '../../store/beneficiary/beneficiaryDialogReducer';
import CustomButton from '../buttons/CustomButton';

const PopupBeneficiary = () => {

    const { open } = useSelector(store => store.beneficiaryDialog);
    const dispatch = useDispatch();

    const onHiding = (params) => dispatch(closeDialogBeneficiary());
    
    return (
        <div>
            <CustomButton
                text="Crear beneficiario"
                icon='plus'
                onClick={() => dispatch(openDialogBeneficiary())}
            />
            <Popup
                fullScreen={true}
                width={850}
                height={550}
                onHiding={onHiding}
                title={`Nuevo beneficiario`}
                visible={open}
            >
                <Beneficiarios />
            </Popup>
        </div>
    );
}

export default PopupBeneficiary;
