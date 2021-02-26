
import React from 'react';
import { Popup } from 'devextreme-react/popup';
import { useDispatch, useSelector } from 'react-redux'
import { dialogWorkOrders } from '../../store/workOrders/workOrdersDialogReducer';
import WorkOrders from '../../views/workOrders/WorkOrders';

const PopupWorkOrder = () => {

    const { open, id, beneficiaryId } = useSelector(store => store.workOrdersDialog);
    const dispatch = useDispatch();
    const onHiding = () => dispatch(dialogWorkOrders({open :  false, id : 0}));

    const title = 'Servicios';

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
                <WorkOrders followId={id} beneficiaryId={beneficiaryId}/>
            </Popup>
        </div>
    );
}

export default PopupWorkOrder;
