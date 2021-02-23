
import React, { useRef, useState } from 'react';
import { Popup  } from 'devextreme-react/popup';
import { useDispatch, useSelector } from 'react-redux'
import Form, { SimpleItem, GroupItem, Label, AsyncRule,RequiredRule } from 'devextreme-react/form';
import { dialogTransfer } from '../../store/transfer/transferDialogReducer';
import useAreas from '../../hooks/useAreas';
import { Button, SelectBox } from 'devextreme-react';
import { editorOptionsSelect } from '../../data/app';
import { createStoreLocal } from '../../utils/proxy';

const Transfer = () => {

    const { open } = useSelector(store => store.transfer);
    const dispatch = useDispatch();
    const onHiding = () => dispatch(dialogTransfer({open :  false, id : 0}));
    const [transfer] = useState({});

    let refForm = useRef();

    const { areas } = useAreas();

    const transferir = () => {
        refForm.current.instance.validate();
    }

    const active = true;
    const title = 'Tranferir';
    
    return (
        <div>           
            <Popup
                width={300}
                height={220}
                onHiding={onHiding}
                title={title}
                visible={open}
            >   
                <Form formData={transfer} ref={refForm}>  
                    <SimpleItem dataField="areaId" editorType="dxSelectBox"
                        editorOptions={{
                            dataSource: createStoreLocal({name: 'Area', active}),
                            ...editorOptionsSelect
                        }} >
                        <Label text="Area" />
                        <RequiredRule message="Seleccione el area" />
                    </SimpleItem>
                </Form>    
                <br />
                <Button className="m0" type="default" text="Transferir" onClick={transferir} width="100%" ></Button>
            </Popup>
        </div>
    );
}

export default Transfer;
