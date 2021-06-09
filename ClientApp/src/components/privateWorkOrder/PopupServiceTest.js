
import React from 'react';
import { Popup } from 'devextreme-react/popup';
import { useDispatch, useSelector } from 'react-redux'
import { closeDialogPrivateServiceTest } from '../../store/privateServicetest/privateServiceTestDialogReducer';
import ServiceTest from '../../views/privateWorkOrders/ServiceTest';

const PopupServiceTest = ({user}) => {

    const { open, customerId, followId } = useSelector(store => store.privateServiceTestDialog);
    const dispatch = useDispatch();
    const onHiding = () => dispatch(closeDialogPrivateServiceTest({id : 0, followId : 0, customerId : 0}));

    const title = 'Resultados privados';

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
                <ServiceTest  customerId={customerId} user={user} open={open} followId={followId}/>
            </Popup>
        </div>
    );
}

export default PopupServiceTest;
