import React, { useEffect, useState } from 'react';
import { Popup } from 'devextreme-react/popup';
import Form, { SimpleItem, GroupItem, Label, RequiredRule } from 'devextreme-react/form';
import { useDispatch, useSelector } from 'react-redux'
import { dialogProduct } from '../../store/product/productDialogReducer';
import { createStore, createStoreLocal } from '../../utils/proxy';
import { editorOptionsSelect } from '../../data/app';
import { Button } from 'devextreme-react/button';
import { StringLengthRule } from 'devextreme-react/data-grid';
import http from '../../utils/http';
import uri from '../../utils/uri';
import notify from 'devextreme/ui/notify';
import { productDefault } from '../../data/product';

const Nuevo = props => {

    let refProduct = React.createRef();

    const [product, setProduct] = useState({...productDefault});
    const [saving, setSaving] = useState(false);
    const dispatch = useDispatch();
    const { open, id } = useSelector(store => store.productDialog);

    const closeDialog = ( load ) => {
        dispatch(dialogProduct({open : false, id: 0}));

        if (load) {

            let { onSave } = props;
            onSave();
      
        }
    }

    const onHiding = ({ load }) => {

        refProduct.current.instance.resetValues();

        closeDialog(load);
        
    }

    const guardarProduct = (e) => {

        let result = refProduct.current.instance.validate();
        if (result.isValid) 
        {
            setSaving(true);
            http(uri.products.insert).asPost({...product})
            .then(resp => {
                setSaving(false);
                notify(`Producto creado correctamente`);
                setProduct({...productDefault});
                closeDialog(true);
            })
            .catch(err => {
                setSaving(false);
                notify(err,'error');
            })
        }
    }

    useEffect(() => {

        if(id > 0){
            http(uri.products.getById(id)).asGet()
            .then(resp => {
                setProduct({...resp});
            })
        }
               
    }, [id]);

    const active = true;

    return (
        <div>
             <Popup
                width={650}
                height={400}
                title={`Nuevo invantario`}
                onHiding={onHiding}
                visible={open}
            >
                <Form formData={product} ref={refProduct}>
                    <GroupItem colCount={2}>
                        <SimpleItem dataField="name" colSpan={2}>
                            <Label text="Nombre" />
                            <RequiredRule message="Ingrese el nombre" />
                            <StringLengthRule max={50} min={2} message="Máximo de caracteres 50 y 2 mínimo"/>
                        </SimpleItem>
                        <SimpleItem dataField="description" colSpan={2}>
                            <Label text="Descripcion" />
                            <RequiredRule message="Ingrese la descripcion" />
                            <StringLengthRule max={150} min={2} message="Máximo de caracteres 150 y 2 mínimo"/>
                        </SimpleItem>
                        <SimpleItem dataField="familyId" editorType="dxSelectBox"
                            editorOptions={{
                                dataSource: createStoreLocal({ name: 'family', active}),
                                ...editorOptionsSelect
                            }} >
                            <Label text="Familia" />
                            <RequiredRule message="Seleccione la familia" />
                        </SimpleItem>
                        <SimpleItem dataField="presentationId" editorType="dxSelectBox"
                            editorOptions={{
                                dataSource: createStore({name: 'Presentation', active}),
                                ...editorOptionsSelect
                            }} >
                            <Label text="Presentacion" />
                            <RequiredRule message="Seleccione la presentacion" />
                        </SimpleItem>
                        <SimpleItem dataField="unitOfMeasureId" editorType="dxSelectBox"
                            editorOptions={{
                                dataSource: createStoreLocal({ name: 'UnitOfMeasure', active}),
                                ...editorOptionsSelect
                            }} >
                            <Label text="Unidad Med." />
                            <RequiredRule message="Seleccione la unida medida" />
                        </SimpleItem>
                        <SimpleItem dataField="stateId" editorType="dxSelectBox"
                            editorOptions={{
                                dataSource: createStore({name: 'ProductState', active}),
                                ...editorOptionsSelect
                            }} >
                            <Label text="Estado" />
                            <RequiredRule message="Seleccione el estado" />
                        </SimpleItem>
                        <SimpleItem dataField="hasIva" editorType="dxCheckBox">
                            <Label text="Aplica IVA" />
                        </SimpleItem>                        
                    </GroupItem>
                </Form>       
                <br/>        
                <Button
                    width={120}
                    text={`${saving?'Guardando...':'Guardar'}`}
                    type="default"
                    icon="save"
                    stylingMode="contained"
                    className="m-1"
                    disabled={saving}
                    onClick={guardarProduct}
                />
            </Popup>
        </div>
    );
}

export default Nuevo;
