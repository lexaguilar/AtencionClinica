import React, { useEffect, useRef, useState } from 'react';
import { Popup } from 'devextreme-react/popup';
import Form, { SimpleItem, GroupItem, Label, EmptyItem, StringLengthRule, RequiredRule, EmailRule } from 'devextreme-react/form';
import { useDispatch, useSelector } from 'react-redux'
import notify from 'devextreme/ui/notify';
import uri from '../../../utils/uri';
import http from '../../../utils/http';
import { dialogAreaProduct } from '../../../store/areaProduct/areaProductDialogReducer';
import { Button } from 'devextreme-react';
import { editorOptionsNumberBox, editorOptionsSwitch } from '../../../data/app';


const Nuevo = props => {

    const { areaId } = props;

    let refProduct = useRef();

    const [product, setProduct] = useState({});
    const [saving, setSaving] = useState(false);
    const { open, productId, name, stock } = useSelector(store => store.areaProductDialog);

    const dispatch = useDispatch();

    const closeDialog = ( load ) => {

        dispatch(dialogAreaProduct({open : false, id: 0}));

        if (load) {

            let { onSave } = props;
            onSave();
      
        }
    }

    const onHiding = ({ load }) => {

        refProduct.current.instance.resetValues();
        setProduct({});
        closeDialog(load);
        
    }

    const guardarProduct = (e) => {

        let result = refProduct.current.instance.validate();
        if (result.isValid) 
        {
            setSaving(true);
            console.log(product);
            http(uri.areaProducts(areaId).insert).asPost({...product})
            .then(resp => {
                setSaving(false);
                notify(`Producto modificado correctamente`);
                closeDialog(true);
            })
            .catch(err => {
                setSaving(false);
                notify(err,'error');
            })
        }
    }
    const onValueChanged = (e) => {

        if(e.value != undefined)
            if(e.value)
                setProduct({...product, inherit: e.value, stockMin: 0});        
            else
                setProduct({...product, inherit: e.value, stockMin: 1});     


    }

    useEffect(() => {

        if(productId > 0){
            http(uri.areaProducts(areaId).getById(productId)).asGet()
            .then(resp => {
                setProduct({productId, name, ...resp});
            })
        }
               
    }, [open]);

    return (
        <div>
             <Popup
                width={650}
                height={520}
                title={`Stock de inventario`}
                onHiding={onHiding}
                visible={open}
                className="bg-fbfbfb"             
            >   
                <Form formData={{
                    productId : product.productId,
                    name : product.name,
                    stock : product.stock,
                }} readOnly={true}>
                    <GroupItem colCount={2}>
                        <SimpleItem dataField="productId" colSpan={1} editorType="dxNumberBox"> 
                            <Label text="Codigo" />
                        </SimpleItem>
                        <EmptyItem/>
                        <SimpleItem dataField="name" colSpan={2}> 
                            <Label text="Nombre" />
                        </SimpleItem>
                        <SimpleItem dataField="stock" colSpan={2}> 
                            <Label text="Existencias" />
                        </SimpleItem>
                    </GroupItem>
                </Form>
                <Form formData={product} ref={refProduct}>
                    <GroupItem colCount={2}>                          
                        <GroupItem caption="Configuracion de stock"  colSpan={2}>
                            <SimpleItem dataField="inherit" colSpan={2} editorType="dxSwitch" 
                                editorOptions={{
                                    ...editorOptionsSwitch,
                                    onValueChanged : onValueChanged
                                }}>           
                                <Label text="Heredar" />                 
                            </SimpleItem>    
                            <SimpleItem dataField="stockMin" colSpan={2} editorType="dxNumberBox" 
                                editorOptions={{...editorOptionsNumberBox, disabled : product.inherit}}>
                                <Label text="Mínimo" />
                            </SimpleItem>    
                            {/* <SimpleItem dataField="stockMax" colSpan={2} editorType="dxNumberBox" 
                                editorOptions={{...editorOptionsNumberBox, disabled : product.inherit}} >
                                <Label text="Máximo" />
                            </SimpleItem>                      
                            <SimpleItem dataField="discount" colSpan={2} editorType="dxNumberBox" 
                                editorOptions={{...editorOptionsNumberBox, disabled : product.inherit, format:"#0%"}} >
                                <Label text="% Descuento" />
                            </SimpleItem> */}
                        </GroupItem>
                      
                        
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
