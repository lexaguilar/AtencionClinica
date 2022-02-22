import React, { useEffect, useRef, useState } from 'react';
import { Popup } from 'devextreme-react/popup';
import { Button } from 'devextreme-react/button';
import Form, { SimpleItem, GroupItem, Label, RequiredRule, AsyncRule } from 'devextreme-react/form';
import { StringLengthRule } from 'devextreme-react/data-grid';
import { useDispatch, useSelector } from 'react-redux'
import http from '../../utils/http';
import uri from '../../utils/uri';
import notify from 'devextreme/ui/notify';

import { facultativoDefault } from '../../data/facultativo';
import { closeDialogFactultativo } from '../../store/factultativo/factultativoDialogReducer';
import { validateReferenceValues } from '../../utils/common';
import { dataAccess, editorOptionsSelect, resources } from '../../data/app';
import { createStoreLocal } from '../../utils/proxy';

import useAuthorization from '../../hooks/useAuthorization';

const Facultativo = props => {

    const { authorized } = useAuthorization([resources.addFacultative, dataAccess.create ]);

    const [facultativo, setFacultativo] = useState({ ...facultativoDefault });
    const [saving, setSaving] = useState(false);

    const { open, id } = useSelector(store => store.factultativoDialog);
    const dispatch = useDispatch();

    let refFacultativo = useRef();

    const closeDialog = (load) => {

        dispatch(closeDialogFactultativo());

        if (load) {

            let { onSave } = props;
            onSave();

        }
    }

    const onHiding = ({ load }) => {

        refFacultativo.current.instance.resetValues();

        closeDialog(load);

    }

   

    const guardarFacultativo = (e) => {

       const result = validateReferenceValues(refFacultativo);

       result.then(isValid => {

        if (isValid) {
            setSaving(true);
            http(uri.customers.insert).asPost({ ...facultativo })
                .then(resp => {
                    setSaving(false);
                    notify(`Asegurado creado correctamente`);
                    setFacultativo({ ...facultativoDefault });
                    closeDialog(true);
                })
                .catch(err => {
                    setSaving(false);
                    notify(err, 'error');
                })
        }

       }) 
        
    }

    useEffect(() => {

        if (id > 0) {
            http(`customers/get/${id}/principal`).asGet()
                .then(resp => {
                    setFacultativo({ ...resp });
                })
        }else{
            setFacultativo({ ...facultativoDefault });
        }

    }, [open]);


    const title = 'Facultativo';

    //Agregar el cdn del open
    //Beneficarios ilimitado
    //combo en parentesco    
    //Poner en el ultimo paso contactar a Seguros
    //Enviar por correo la cedula, grupo de lafise

    const validationCallback = (e) =>
    {

        return new Promise(resolve =>{
            setTimeout(() => {
                resolve(true);
            }, 1000);
        });
    } 
    
    return (
        <>
        <Popup
            fullScreen={false}
            width={400} 
            height={350}
            onHiding={onHiding}
            title={title}
            visible={open}
        >               
            <Form formData={facultativo} ref={refFacultativo}>
                <GroupItem colCount={2}>
                    <SimpleItem dataField="inss" colSpan={2}>
                        <Label text="INSS" />
                        <RequiredRule message="Ingrese el inss" />
                    </SimpleItem>
                    <SimpleItem dataField="firstName" colSpan={2}>
                        <Label text="Nombres" />
                        <RequiredRule message="Ingrese el nombre" />
                        <StringLengthRule max={50} min={2} message="Máximo de caracteres 50 y 2 mínimo" />
                    </SimpleItem>
                    <SimpleItem dataField="lastName" colSpan={2}>
                        <Label text="Apellidos" />
                        <RequiredRule message="Ingrese el apellido" />
                        <StringLengthRule max={50} min={2} message="Máximo de caracteres 50 y 2 mínimo" />
                    </SimpleItem>
                    <SimpleItem dataField="patronalId" colSpan={2}>
                        <Label text="Patronal Id" />
                        <RequiredRule message="Ingrese el Patronal Id" />
                    </SimpleItem>
                    <SimpleItem dataField="identification" colSpan={2}>
                        <Label text="Identification" />
                        <RequiredRule message="Ingrese la identification" />
                        <AsyncRule message="Ingrese la cantidad a convertir" validationCallback={validationCallback}></AsyncRule>
                    </SimpleItem>
                    <SimpleItem dataField="customerStatusId"  colSpan={2} editorType="dxSelectBox"
                        editorOptions={{                                
                            dataSource: createStoreLocal({ name: 'CustomerStatus'}),
                            ...editorOptionsSelect
                        }} >
                        <Label text="Estado" />
                        <RequiredRule message="Seleccione el estado" />
                    </SimpleItem>
                    <SimpleItem dataField="customerTypeId"  colSpan={2} editorType="dxSelectBox"
                        editorOptions={{                                
                            dataSource: createStoreLocal({ name: 'CustomerType'}),
                            ...editorOptionsSelect
                        }} >
                        <Label text="Tipo" />
                        <RequiredRule message="Seleccione el tipo" />
                    </SimpleItem>
                </GroupItem> 
            </Form>
            <br />
            {authorized(<Button
                width={120}
                text={`${saving ? 'Guardando...' : 'Guardar'}`}
                type="default"
                icon="save"
                stylingMode="contained"
                className="m-1"
                disabled={saving}
                onClick={guardarFacultativo}
            />)}
        </Popup>
        </>
    );
}

export default Facultativo;
