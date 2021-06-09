
import React from 'react';
import { Popup } from 'devextreme-react/popup';
import { useDispatch, useSelector } from 'react-redux'
import { closeDialogServiceTest } from '../../store/servicetest/serviceTestDialogReducer';
import ServiceTest from '../../views/workOrders/ServiceTest';

const PopupServiceTest = ({user}) => {

    const { open, beneficiaryId, followId } = useSelector(store => store.serviceTestDialog);
    const dispatch = useDispatch();
    const onHiding = () => dispatch(closeDialogServiceTest({id : 0, followId : 0, beneficiaryId : 0}));

    const title = 'Resultados';

    return (
        <div>           
            <Popup
                fullScreen={true}
                width={850}
                height={700}
                onHiding={onHiding}
                title={title}
                visible={open}
            >               
                <ServiceTest beneficiaryId={beneficiaryId} user={user} open={open} followId={followId} />
            </Popup>
        </div>
    );
}

export default PopupServiceTest;
