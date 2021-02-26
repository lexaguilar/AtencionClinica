import React, { useState, useEffect, useRef } from 'react';
import { Popup } from 'devextreme-react/popup';
import Form, { SimpleItem, GroupItem, Label, AsyncRule,RequiredRule, StringLengthRule} from 'devextreme-react/form';
import { useDispatch, useSelector } from 'react-redux'
import { closeDialog } from '../../../store/customDialog/customDialogReducer';
import { createStoreLocal } from '../../../utils/proxy';
import { editorOptionsSelect } from '../../../data/app';
import { DataGrid } from 'devextreme-react';
import { Column, Editing, Lookup, RequiredRule as RuleRequired, Button as ButtonGrid, Summary, TotalItem } from 'devextreme-react/data-grid';
import ProductDDBComponent from '../../../components/dropdown/ProductDDBComponent';
import uri from '../../../utils/uri';
import { cellRender, onCellPrepared } from '../../../utils/common';
import http from '../../../utils/http';
import useProducts from '../../../hooks/useProducts';
import gridsHelper from '../../../utils/gridsHelper';
import ButtonForm from '../../../components/buttons/ButtonForm';
import notify from 'devextreme/ui/notify';
import { typeTraslate } from '../../../data/catalogos';

const Nuevo = props => {    

    const exists = true;
    const active = true;

    const  {stageId, type}  = props;

    const isCreate = type == typeTraslate.create;

    const { customDialog : { open, id }, user } = useSelector(store => store);

    const [ areaSourceId, setAreaSourceId ] = useState(0);
    const { products, setProducts } = useProducts({areaId: areaSourceId, exists, active });
    const [ traslate, setTraslate ] = useState({});
    const [ saving, setSaving ] = useState(false);
    const [ details, setDetails ] = useState([]);

    let refForm = useRef();
    let refGrid = useRef();

    useEffect(() => {        
        setTraslate({areaId : user.areaId, stageId : stageId});
        setDetails([]);
    }, [open]);

    const dispatch = useDispatch();
    const onToolbarPreparing = areaSourceId > 0 ? gridsHelper(refGrid, { text : 'Agregar producto', icon:'plus' }) : undefined;

    const close = ( load ) => {

        refForm.current.instance.resetValues();  
        refGrid.current.instance.cancelEditData();
        dispatch(closeDialog());
        if (load) {
            let { onSave } = props;
            onSave();      
        }     

    }

    const onHiding = ({ load }) => {
       
        close(load);

    }

    const crearTraslado = (e) => {

        let result = refForm.current.instance.validate();

        if (result.isValid) {

            setSaving(true);
            let data = {...traslate, traslateDetails:[...details] };

            http(uri.traslates.insert).asPost(data).then(resp => {

                setSaving(false);
                notify('Soliictud de traslado registrado correctamente');
                close(true);

            }).catch(err => {

                setSaving(false);
                notify(err, 'error', 5000);

            });

        }

    }

    const despacharTraslado = (e) => {

        setSaving(true);
            let data = {...traslate, traslateDetails:[...details] };
        
        http(uri.traslates.insert).asPost(data).then(resp => {

            setSaving(false);
            notify('Traslado registrado correctamente');
            close(true);

        }).catch(err => {

            setSaving(false);
            notify(err, 'error', 5000);

        });

    }

    const setCellValue = (prop, newData, value, currentRowData) => {

        newData[prop] = value || 0;
        if(prop == 'productId' && value){

            let info = products.find(x => x.id == value);
            newData['presentation'] = info.presentation;
            newData['um'] = info.um
            newData['cost'] = info.cost;        
            newData['quantityResponse'] = 0;  
            !currentRowData['quantityRequest'] && (newData['quantityRequest'] = 1);
            !currentRowData['total'] &&( newData['total'] = info.cost);

        }
        
        if(prop == 'quantityRequest' && (+value) >= 0)
            newData['total'] = currentRowData['cost'] * value;

    }

    const setCellValueForResponse = (prop, newData, value, currentRowData) => {

        newData[prop] = value || 0;
        if(prop == 'quantityResponse' && (+value) >= 0)
            newData['total'] = currentRowData['cost'] * value;

    }

    const onValueChangedArea = (e) => {
        setAreaSourceId(e.value);
        setDetails([]);
    }

    const onShowing = e =>{

        if(id > 0){

            http(uri.traslates.getById(id)).asGet().then(resp =>{

                setTraslate({ ...withOutDetaill(resp) });

                http(uri.products.getByArea(resp.areaSourceId)).asGet({ exists }).then(data =>{
                    
                    setProducts(data);

                    let arr = resp.traslateDetails.map(prod => {

                        let info = data.find(x => x.id == prod.productId);

                        prod['presentation'] = info.presentation;
                        prod['um'] = info.um;

                        return prod;
                    })

                    setDetails(arr);

                })        


            });

        }

    }

    const withOutDetaill = ({traslateDetails,...rest}) => rest;

    const textCreating = 'Guardar traslado';
    const textEditing = 'Despachar traslado';

    var itemHTML = isCreate ?  <SimpleItem dataField="areaSourceId" editorType="dxSelectBox"
                                        editorOptions={{
                                            dataSource: createStoreLocal({ name: 'area'}),
                                            ...editorOptionsSelect,
                                            onValueChanged: onValueChangedArea
                                        }} >
                                        <Label text="Bodega" />
                                        <RequiredRule message="Seleccione la bodega" />
                                </SimpleItem> 
                                :
                                <SimpleItem dataField="areaTargetId" editorType="dxSelectBox"
                                    editorOptions={{
                                        dataSource: createStoreLocal({ name: 'area'}),
                                        ...editorOptionsSelect,
                                    }} >
                                    <Label text="Area solicitante" />
                                    <RequiredRule message="Seleccione la bodega" />
                                </SimpleItem>

    return (
        <div>
             <Popup
                width={1050}
                height={580}
                title={isCreate  ? `Nueva solicitud de traslado` : `Despachar solicitud ${id}`}
                onHiding={onHiding}
                onShowing={onShowing}
                visible={open}                
            >
                <Form formData={traslate} ref={refForm} readOnly={!isCreate}>
                    <GroupItem colCount={3}>                       
                        {itemHTML}
                    
                        <SimpleItem dataField="date" editorType="dxDateBox"
                            editorOptions={{
                                displayFormat : 'dd/MM/yyyy',
                                openOnFieldClick:true,
                            }} >
                            <Label text="Fecha" />
                            <RequiredRule message="Seleccione la fecha" />
                        </SimpleItem>     
                        <SimpleItem dataField="stageId" editorType="dxSelectBox"
                            editorOptions={{
                                disabled : true,
                                dataSource: createStoreLocal({ name: 'traslateStage'}),
                                ...editorOptionsSelect
                            }} >
                            <Label text="Etapa" />
                            <RequiredRule message="Seleccione la bodega" />
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
                            onToolbarPreparing={isCreate ? onToolbarPreparing : undefined}
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
                            <Column dataField="presentation" caption="Presentac" width={120} allowEditing={false}>
                                <RuleRequired />
                            </Column>
                            <Column dataField="um" caption="Um" width={120} allowEditing={false}>
                                <RuleRequired />
                            </Column>
                            <Column dataField="quantityRequest" 
                                caption="Cantidad Solic" 
                                dataType="number" width={80}                
                                allowEditing={isCreate}                 
                                setCellValue={setCellValue.bind(null,"quantityRequest")}>
                                <RuleRequired />
                            </Column>
                            <Column dataField="quantityResponse" 
                                caption="Cantidad" 
                                dataType="number" width={80} 
                                visible={!isCreate}
                                setCellValue={setCellValueForResponse.bind(null,"quantityResponse")}>
                                <RuleRequired />
                            </Column>
                            <Column dataField="cost" caption="Costo" dataType="number" width={100} allowEditing={false} cellRender={cellRender()} >
                                <RuleRequired />
                            </Column>
                            <Column dataField="total" caption="Total" dataType="number" width={120} allowEditing={false} cellRender={cellRender()} >
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

                <ButtonForm 
                    saving={saving} 
                    textSaving={textCreating} 
                    visible={isCreate} 
                    onClick={crearTraslado}/>
                <ButtonForm 
                    saving={saving} 
                    textSaving={textEditing} 
                    visible={!isCreate} 
                    onClick={despacharTraslado}/>
               
            </Popup>
        </div>
    );
}

export default Nuevo;
