
import React, { useEffect, useRef, useState } from 'react';
import { Popup  } from 'devextreme-react/popup';
import { useDispatch, useSelector } from 'react-redux'
import Form, { SimpleItem, Label,RequiredRule, StringLengthRule } from 'devextreme-react/form';
import { dialogTransfer } from '../../store/transfer/transferDialogReducer';
import useAreas from '../../hooks/useAreas';
import { Button } from 'devextreme-react';
import { editorOptionsSelect } from '../../data/app';
import { createStoreLocal } from '../../utils/proxy';
import http from '../../utils/http';
import uri from '../../utils/uri';
import notify from 'devextreme/ui/notify';

const Transfer = () => {

    const { open, id } = useSelector(store => store.transfer);
    const dispatch = useDispatch();
    const onHiding = () => dispatch(dialogTransfer({open :  false, id : 0}));
    const [ transfer, setTransfer ] = useState({});

    let refForm = useRef();

    const transferir = () => {
        
        var result = refForm.current.instance.validate();
        if(result.isValid){
           
            http(uri.follows(0).insert).asPost({...transfer, admissionId : id}).then(resp => {
                notify("Se realizo la transferencia con éxito");
                refForm.current.instance.resetValues();
                onHiding();
            }).catch(err => {
                notify(err, 'error')
            });

        }

    }

    useEffect(() => {       
        setTransfer({})    
    }, [open]);

    const active = true;
    const title = 'Tranferir';
    
    return (
        <div>           
            <Popup
                width={350}
                height={210}
                onHiding={onHiding}
                title={title}
                visible={open}
            >   
                <Form formData={transfer} ref={refForm}>  
                    <SimpleItem dataField="areaTargetId" editorType="dxSelectBox"
                        editorOptions={{
                            dataSource: createStoreLocal({name: 'Area', active}),
                            ...editorOptionsSelect
                        }} >
                        <Label text="Area" />
                        <RequiredRule message="Seleccione el area" />
                    </SimpleItem>
                    <SimpleItem dataField="observation" editorType="dxTextArea">
                        <Label text="Observacion" />
                        <StringLengthRule max={150} message="Maximo 150 caracteres" />
                    </SimpleItem>
                </Form>    
                <br />
                <Button className="m0" type="default" text="Transferir" onClick={transferir} width="100%" ></Button>
            </Popup>
        </div>
    );
}

export default Transfer;
