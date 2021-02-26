import React, { useState, useEffect, useRef } from 'react';
import { Popup, ToolbarItem } from 'devextreme-react/popup';
import Form, { SimpleItem, GroupItem, Label, RequiredRule, StringLengthRule, EmptyItem} from 'devextreme-react/form';
import { useDispatch, useSelector } from 'react-redux'
import ScrollView from 'devextreme-react/scroll-view';
import { dialogInputProduct } from '../../store/inPutProduct/inPutProductDialogReducer';
import { Button, DataGrid } from 'devextreme-react';
import { Column, Editing, Lookup, RequiredRule as RuleRequired, Button as ButtonGrid } from 'devextreme-react/data-grid';
import ProductDDBComponent from '../../components/dropdown/ProductDDBComponent';
import uri from '../../utils/uri';
import { cellRender, getPriceByCurrency, obtenerTasaCambio } from '../../utils/common';
import http from '../../utils/http';
import gridsHelper from '../../utils/gridsHelper';
import ButtonForm from '../../components/buttons/ButtonForm';
import notify from 'devextreme/ui/notify';
import { cellRenderBold } from '../../utils/common';
import useProducts from '../../hooks/useProducts';
import { dialogWorkOrder } from '../../store/workOrder/workOrderDialogReducer';
import Information from '../../components/beneficiary/Information';
import { createStore, createStoreLocal } from '../../utils/proxy';
import { editorOptionsSelect } from '../../data/app';

const Nuevo = props => {   
    
    const { followId, beneficiaryId } = props;

    const exists = true;    
    const active = true;    

    const { workOrderDialog : { open }, user } = useSelector(store => store);
  
    const { products, setProducts } = useProducts({areaId: user.areaId, exists, active});
    const [services, setServices] = useState([]);

    const [ workOrder, setWorkOrder ] = useState({});
    const [ saving, setSaving ] = useState(false);
    const [ detailsServices, setDetailsServices ] = useState([]);
    const [ details, setDetails ] = useState([]);

    let refForm = useRef();
    let refGridServices = useRef();
    let refGridProducts = useRef();

    useEffect(() => {        
        setWorkOrder({areaId : user.areaId });
        setDetails([]);
        http(`services/area/${user.areaId}/get`).asGet({ active }).then(resp => setServices(resp));
    }, [open]);

    const dispatch = useDispatch();
    const onToolbarPreparing = gridsHelper(refGridServices, { text : 'Agregar procedimientos', icon:'plus' });
    const onToolbarPreparingProducts = gridsHelper(refGridProducts, { text : 'Agregar productos', icon:'plus' });

    const closeDialog = ( load ) => {

        refForm.current.instance.resetValues();  
        refGridProducts.current.instance.cancelEditData();
        refGridServices.current.instance.cancelEditData();

        dispatch(dialogWorkOrder({open : false}));

        if (load) {
            let { onSave } = props;
            onSave();      
        }        
    }

    const onHiding = ({ load }) => {
       
        closeDialog(load);
    }

    const crearOrdenTrabajo = (e) => {

        let result = refForm.current.instance.validate();

        if (result.isValid) {

            setSaving(true);
            let data = {...workOrder, followId,  WorkOrderDetails:[...details] };

            http(uri.workOrders.insert).asPost(data).then(resp => {

                setSaving(false);
                notify('Orden de trabajo registrada correctamente');
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
            newData['um'] = info.um
            newData['cost'] = info.cost;
            newData['price'] = info.price;
            newData['quantity'] = 1;
            newData['serviceId'] = null;
            !currentRowData['total'] &&( newData['total'] = info.cost);

        }
        
        if(prop == 'quantity' && (+value) >= 0)
            newData['total'] = currentRowData['cost'] * value;

    }    

    const setCellValueServices = (newData, value, currentRowData) => {

        const service = services.find(x => x.id == value);

        const price = getPriceByCurrency(1, workOrder.rate)(service);
      
        newData.id = value;
      
        newData.quantity = 1;     
        newData.price = price;
        newData.productId = null;
        newData.cost = 0;
        newData.subTotal = price * newData.quantity;  
        newData.total = newData.subTotal;  
      
    }

    const setCellValueCantServices = (newData, value, currentRowData) => {

        newData.quantity = value;
        newData.price = currentRowData.price;     
        newData.subTotal = currentRowData.price * newData.quantity;  
        newData.total = newData.subTotal;  

    }

    useEffect(() => {
        obtenerTasaCambio(new Date()).then(rate =>{
            if(rate)
                setWorkOrder({...workOrder, rate : rate.value});
        });
    }, [0]);

    const onCellPrepared = e => {
        
        if (e.rowType == 'data') {

            if(e.column.dataField == "quantity")
                e.cellElement.classList.add('quantity-text');
        }

    }

    const text = 'Guardar orden';  

    return (
        <div>
             <Popup
                width={1050}
                height={660}
                title={`Nueva orden de trabajo`}
                onHiding={onHiding}
                visible={open}    
                showCloseButton={!saving}

            >
                <ScrollView id="scrollview">                    
                    <Information beneficiaryId={beneficiaryId}/>
                    <br />
                    <Form formData={workOrder} ref={refForm}>
                        <GroupItem colCount={3}>                      
                            
                            <SimpleItem dataField="date" editorType="dxDateBox"
                                editorOptions={{
                                    displayFormat : 'dd/MM/yyyy',
                                    openOnFieldClick:true,
                                }} >
                                <Label text="Fecha" />
                                <RequiredRule message="Seleccione la fecha" />
                            </SimpleItem>
                            <SimpleItem dataField="doctorId" colSpan={2} editorType="dxSelectBox"
                                editorOptions={{
                                    dataSource: createStoreLocal({name: 'Doctor', active : true}),
                                    ...editorOptionsSelect
                                }} >
                                <Label text="Doctor" />
                                <RequiredRule message="Seleecione el medico" />
                            </SimpleItem>
                            <SimpleItem dataField="reference">
                                <Label text="Referencia" />
                                <RequiredRule message="Ingrese una referencia" />
                                <StringLengthRule max={20} message="Maximo 20 caracteres" />
                            </SimpleItem>                           
                            <SimpleItem dataField="observation" colSpan={2}>
                                <Label text="Observacion" />
                                <RequiredRule message="Ingrese una observacion" />
                                <StringLengthRule max={500} message="Maximo 500 caracteres" />
                            </SimpleItem>
                            
                        </GroupItem>
                        <GroupItem>
                            <DataGrid id="gridDetails"
                                ref={refGridProducts}
                                selection={{ mode: 'single' }}
                                dataSource={details}
                                showBorders={true}
                                showRowLines={true}
                                allowColumnResizing={true}
                                allowColumnReordering={true}
                                height={200}
                                onToolbarPreparing={onToolbarPreparingProducts}                                
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
                                <Column dataField="presentation" caption="Presentacion" width={120} allowEditing={false}>
                                    <RuleRequired />
                                </Column>
                                <Column dataField="um" caption="Um" width={120} allowEditing={false}>
                                    <RuleRequired />
                                </Column>
                                <Column dataField="quantity" 
                                    caption="Cantidad" 
                                    dataType="number" width={80}                               
                                    setCellValue={setCellValue.bind(null,"quantity")}>
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
                        <GroupItem>
                            <DataGrid id="gridDetailsServices"
                                ref={refGridServices}
                                selection={{ mode: 'single' }}
                                dataSource={detailsServices}
                                showBorders={true}
                                showRowLines={true}
                                allowColumnResizing={true}
                                allowColumnReordering={true}
                                height={200}
                                onToolbarPreparing={onToolbarPreparing}
                                onCellPrepared={onCellPrepared}
                            >
                                <Column dataField="id" caption="Procedimiento" setCellValue={setCellValueServices}>
                                    <Lookup 
                                        disabled={true} 
                                        dataSource={services} 
                                        valueExpr="id" displayExpr="name" 
                                    />
                                </Column>                          
                                <Column dataField="quantity" 
                                    caption="Cantidad" 
                                    dataType="number" width={120}                               
                                    setCellValue={setCellValueCantServices}>
                                    <RuleRequired />
                                </Column>
                                <Column dataField="price" allowEditing={false} caption='Precio' width={100}  cellRender={cellRender()}/>
                                <Column dataField="total" allowEditing={false} width={120}  cellRender={cellRenderBold()}/>
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
                    <Button                    
                        text={`${saving?'Guardando...':text}`}
                        type="success"
                        icon="save"
                        stylingMode="contained"
                        className="m-1"
                        disabled={saving}
                        onClick={crearOrdenTrabajo}
                    /> 
                </ScrollView>
            </Popup>
        </div>
    );
}

export default Nuevo;
