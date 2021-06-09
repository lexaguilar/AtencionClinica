import React, { useState, useEffect, useRef } from 'react';
import { Popup } from 'devextreme-react/popup';
import Form, { SimpleItem, GroupItem, Label, AsyncRule,RequiredRule, StringLengthRule} from 'devextreme-react/form';
import { useDispatch, useSelector } from 'react-redux'
import { dialogInputProduct } from '../../../store/inPutProduct/inPutProductDialogReducer';
import { createStoreLocal } from '../../../utils/proxy';
import { editorOptionsSelect } from '../../../data/app';
import { DataGrid } from 'devextreme-react';
import { Column, Editing, Lookup, RequiredRule as RuleRequired, Button as ButtonGrid } from 'devextreme-react/data-grid';
import ProductDDBComponent from '../../../components/dropdown/ProductDDBComponent';
import uri from '../../../utils/uri';
import { cellRender, formatId, onCellPrepared } from '../../../utils/common';
import http from '../../../utils/http';
import useProducts from '../../../hooks/useProducts';
import gridsHelper from '../../../utils/gridsHelper';
import ButtonForm from '../../../components/buttons/ButtonForm';
import notify from 'devextreme/ui/notify';
import { inPutProductTypes } from '../../../data/catalogos';
import { inPutProductDefault } from '../../../data/defaultObject';

const Nuevo = props => {    
    
    const { typeId, exists = false } = props;

    const canEdit = typeId == inPutProductTypes.saldoInicial;

    const { inPutProductDialog : { open, id }, user } = useSelector(store => store);
    
    const active = true;

    const { products, setProducts } = useProducts({ areaId: user.areaId, active, exists });
    const [ inPutProduct, setInPutProduct ] = useState({...inPutProductDefault});
    const [ saving, setSaving ] = useState(false);
    const [ details, setDetails ] = useState([]);

    let refForm = useRef();
    let refGrid = useRef();

    useEffect(() => {     
        console.log(open, id);   
        if(id > 0){
            
            http(uri.inPutProducts.getById(id)).asGet().then(resp => {

                http(uri.products.getByArea(resp.areaId)).asGet().then(data =>{

                    setProducts(data);

                    const { inPutProductDetails, ...rest } = resp;

                    inPutProductDetails.map(detail =>{

                        let info = products.find(x => x.id == detail.productId);

                        console.log(info)

                        detail['presentation'] = info.presentation;
                        detail['um'] = info.um;

                        return detail;
                    });

                    setInPutProduct({...inPutProduct, ...rest});
                    setDetails([...inPutProductDetails]);

                });                

            });

        }else{

            setInPutProduct({...inPutProductDefault, areaId : user.areaId, typeId : typeId});
            setDetails([]);          

        }
    }, [open]);

    const dispatch = useDispatch();
    const onToolbarPreparing = gridsHelper(refGrid, { text : 'Agregar producto', icon:'plus' });

    const closeDialog = ( load ) => {

        refForm.current.instance.resetValues();  
        refGrid.current.instance.cancelEditData();

        dispatch(dialogInputProduct({open : false, id : 0}));
        if (load) {
            let { onSave } = props;
            onSave();      
        }        
    }

    const onHiding = ({ load }) => {
       
        closeDialog(load);        
    }

    const guardarEntrada = (e) => {

        let result = refForm.current.instance.validate();

        if (result.isValid) {

            setSaving(true);
            let data = {...inPutProduct,inPutProductDetails:[...details] };

            http(uri.inPutProducts.insert).asPost(data).then(resp => {
                setSaving(false);
                notify('Entrada registrada correctamente');
                closeDialog(true);
            }).catch(err => {
                setSaving(false);
                notify(err, 'error', 5000);
            });

        }

    }

    const setCellValue = (prop, newData, value, currentRowData) => {

        newData[prop] = value || 0;
        if(prop == 'productId' && value){

            let info = products.find(x => x.id == value);
          
            newData['presentation'] = info.presentation;
            newData['um'] = info.um;
            newData['cost'] = canEdit ? 0 : info.cost ;
            newData['price'] = canEdit ? 0 : info.price ;
            newData['quantity'] = 1;
            newData['total'] = info.cost;
        }
        
        if(prop == 'quantity' && (+value) >= 0){
            newData['total'] = currentRowData['cost'] * value;
        }

        if(prop == 'cost' && (+value) >= 0){
            newData['total'] = currentRowData['quantity'] * value;
        }

    }

    const isNew = id == 0;

    const textSaving = 'Guardar Entrada';

    return (
        <div>
             <Popup
                width={1050}
                height={550}
                title={isNew ? `Nueva entrada de inventario` : `Entrada #${ formatId(id)}`}
                onHiding={onHiding}
                visible={open}                
            >
                <Form formData={inPutProduct} ref={refForm}>
                    <GroupItem colCount={3}>                       
                        <SimpleItem dataField="areaId" editorType="dxSelectBox"
                            editorOptions={{
                                disabled: true,
                                dataSource: createStoreLocal({ name: 'area'}),
                                ...editorOptionsSelect
                            }} >
                            <Label text="Area" />
                            <RequiredRule message="Seleccione el area" />
                        </SimpleItem>
                        <SimpleItem dataField="date" editorType="dxDateBox"
                            editorOptions={{
                                displayFormat : 'dd/MM/yyyy',
                                openOnFieldClick:true,
                            }} >
                            <Label text="Fecha" />
                            <RequiredRule message="Seleccione la fecha" />
                        </SimpleItem>
                        <SimpleItem dataField="typeId" editorType="dxSelectBox"
                            editorOptions={{
                                disabled: true,
                                dataSource: createStoreLocal({name: 'inPutProductType'}),
                                ...editorOptionsSelect
                            }} >
                            <Label text="Tipo" />
                            <RequiredRule message="Seleccione el tipo" />
                        </SimpleItem>
                        <SimpleItem dataField="observation" colSpan={3}  editorType="dxTextArea">
                            <Label text="Observacion" />
                            <RequiredRule message="Ingrese una observacion" />
                            <StringLengthRule max={500} message="Maximo 500 caracteres" />
                        </SimpleItem>
                    </GroupItem>
                    <GroupItem>
                        <DataGrid id="gridDetails"
                            ref={refGrid}
                            selection={{ mode: 'single' }}
                            dataSource={details}
                            showBorders={true}
                            showRowLines={true}
                            allowColumnResizing={true}
                            allowColumnReordering={true}
                            height={320}
                            onToolbarPreparing={onToolbarPreparing}
                            onCellPrepared={onCellPrepared}
                        >
                            <Column dataField="productId" caption="Producto"
                                setCellValue={setCellValue.bind(null,"productId")}
                                editCellComponent={ProductDDBComponent}>
                                    <Lookup 
                                        dataSource={products}
                                        valueExpr="id" 
                                        displayExpr={item => item ? `${item.id} - ${item.name}` : ''}
                                    
                                    />
                                    <RuleRequired />
                            </Column>                          
                            <Column dataField="presentation" caption="Lab." width={120} allowEditing={false}>
                                <RuleRequired />
                            </Column>
                            <Column dataField="um" caption="Um" width={120} allowEditing={false}>
                                <RuleRequired />
                            </Column>
                            <Column dataField="quantity" caption="Cantidad" dataType="number" width={80} setCellValue={setCellValue.bind(null,"quantity")}>
                                <RuleRequired />
                            </Column>
                            <Column dataField="cost" allowEditing={canEdit} caption="Costo" dataType="number" width={100} cellRender={cellRender()} setCellValue={setCellValue.bind(null,"cost")}>
                                <RuleRequired />
                            </Column>
                            <Column dataField="total" caption="Total" dataType="number" width={120} allowEditing={false} cellRender={cellRender()} >
                                <RuleRequired />
                            </Column>        
                            <Column visible={canEdit} dataField="price" caption="Precio" dataType="number" width={100} cellRender={cellRender()} >
                                <RuleRequired />
                            </Column>                  
                            <Column type="buttons" width={50}>
                                <ButtonGrid name="delete" />                            
                            </Column>
                            <Editing
                                mode="cell"
                                allowDeleting={true}                               
                                allowUpdating={true}
                                selectTextOnEditStart={true}
                                useIcons={true}
                            ></Editing>
                        </DataGrid>
                    </GroupItem>
                </Form>

                <ButtonForm saving={saving} visible={isNew} textSaving={textSaving} onClick={guardarEntrada}/>
               
            </Popup>
        </div>
    );
}

export default Nuevo;
