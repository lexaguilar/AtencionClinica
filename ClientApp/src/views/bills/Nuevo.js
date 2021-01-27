import React, { useState } from 'react';
import Form, { SimpleItem, GroupItem, Label, RequiredRule, StringLengthRule, EmptyItem } from 'devextreme-react/form';
import { createStore, createStoreLocal } from '../../utils/proxy';
import { Button } from 'devextreme-react/button';
import http from '../../utils/http';
import { editorOptionsSelect } from '../../data/app';
import uri from '../../utils/uri';
import Title from '../../components/shared/Title';
import BlockHeader from '../../components/shared/BlockHeader';
import notify from 'devextreme/ui/notify';
import { _path } from "../../data/headerNavigation";
import { billDefault } from '../../data/bill';
import { useDispatch, useSelector } from 'react-redux'
import PopupPrivado from '../../components/beneficiary/PopupPrivado';
import DataSource from "devextreme/data/data_source";
import DataGrid, { Column, Editing, Lookup, Summary, TotalItem} from 'devextreme-react/data-grid';
import { cellRender, cellRenderBold, formatToMoney } from '../../utils/common';

const Nuevo = props => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [bill, setBill] = useState({...billDefault});
    const [procedimientos, setProcedimientos] = useState([]);
    const [services, setServices] = useState([]);

    let refBill = React.createRef();
    let dataGrid = React.createRef();

    const guardarFactura = () => {
        let result = refBill.instance.validate();
        if (result.isValid) {
            console.log(procedimientos);

            setLoading(true);
            http(uri.bill.insert).asPost({...bill, billDetails : procedimientos.map(x => ({...x, ...{serviceId : x.id, id: 0}  }))}).then(resp => {
                if (resp) {

                    setLoading(false);
                    notify(`Factura ${resp.id} creada correctamente`);

                    setBill({...billDefault});                   

                }
            }).catch(err => {

                notify(err, 'error');
                setLoading(false);
            });
        }
    }

    const onValueChangedArea = (e) => {
        setBill({
            ...bill,
            areaId : e.value
        });
        setProcedimientos([]);
        loadServices();
    }

    const loadServices = (areaId) => {
        http(`services/area/${bill.areaId}/get`).asGet().then(resp => setServices(resp))
    }

    const onToolbarPreparing = (e) => {  
        if(bill.areaId > 0)
            e.toolbarOptions.items.unshift({
                location: 'before',
                widget: 'dxButton',
                options: {
                    text: 'Agregar Procedimiento',
                    icon:'plus',
                    onClick: () =>  dataGrid.instance.addRow()
                }
            });
    }  

    const setCellValue = (newData, value, currentRowData) => {

        const service = services.find(x => x.id == value);
      
        newData.id = value;
      
        newData.quantity = 1;     
        newData.price = service.price;     
        newData.total = service.price * newData.quantity;  
      
    }

    const setCellValueCant = (newData, value, currentRowData) => {
        newData.quantity = value;
        newData.price = currentRowData.price;     
        newData.total = currentRowData.price * newData.quantity;  
    }

    const onRowInserted = (e) => {
        console.log(e);    
        console.log(procedimientos);
    }


    const title = 'Factura';

    return (
        <div className="container">
            <Title title={title} />
            <BlockHeader title='Nueva Factura' >
                <PopupPrivado />
            </BlockHeader>
            <Form formData={bill} ref={ref => refBill = ref}>
                <GroupItem cssClass="second-group" colCount={2}>
                    <SimpleItem dataField="privateCustomerId" editorType="dxSelectBox"
                        editorOptions={{
                            dataSource: new DataSource({
                                load: (loadOptions) => {

                                    let params = {};
                                    params.skip = loadOptions.skip || 0;
                                    params.take = loadOptions.take || 10;

                                    if(loadOptions.searchValue)
                                        params.name = loadOptions.searchValue  ;

                                    return http(uri.privateCustomers().getAsCatalog)
                                    .asGet(params).then(x => x.items);
                                    
                                },
                                paginate : true,
                                pageSize: 10
                            }),
                            valueExpr:"id",
                            displayExpr: item => item ? `${item.id} - ${item.name}` : '',
                            searchEnabled: true
                        }} >
                        <Label text="Paciente" />
                        <RequiredRule message="Seleccione el area" />
                    </SimpleItem>                   
                    <EmptyItem/>
                    <SimpleItem dataField="billTypeId" editorType="dxSelectBox"
                        editorOptions={{
                            dataSource: createStoreLocal({ name: 'billType' }),
                            ...editorOptionsSelect
                        }} >
                        <Label text="Tipo Ingreso" />
                        <RequiredRule message="Seleccione la especialidad" />
                    </SimpleItem>
                    <EmptyItem/>
                    <SimpleItem dataField="areaId" editorType="dxSelectBox"
                        editorOptions={{
                            dataSource: createStoreLocal({ name: 'area' }),
                            ...editorOptionsSelect,
                            onValueChanged: onValueChangedArea,
                        }} >
                        <Label text="Area" />
                        <RequiredRule message="Seleccione el area" />
                    </SimpleItem>
                    <EmptyItem/>
                    <SimpleItem dataField="observation">
                        <StringLengthRule max={250} message="Maximo 250 caracteres" />
                        <Label text="Observacion" />
                    </SimpleItem>
                    <EmptyItem/>
                    <GroupItem cssClass="second-group" colCount={2}>
                        <DataGrid id="gridContainer"
                            ref={(ref) => dataGrid = ref}
                            dataSource={procedimientos}
                            selection={{ mode: 'single' }}
                            showBorders={true}
                            showRowLines={true}
                            allowColumnResizing={true}
                            allowColumnReordering={true}    
                            onToolbarPreparing={onToolbarPreparing}    
                            onRowInserted={onRowInserted}
                            >                                   
                               
                                <Column dataField="id" caption="Area" setCellValue={setCellValue}>
                                    <Lookup 
                                        disabled={true} 
                                        dataSource={services} 
                                        valueExpr="id" displayExpr="name" 
                                    />
                                </Column>
                                <Column dataField="quantity" caption='Cant' width={70} setCellValue={setCellValueCant}/>                             
                                <Column dataField="price" allowEditing={false} caption='Precio' width={100}  cellRender={cellRender}/>                             
                                <Column dataField="total" allowEditing={false} width={120}  cellRender={cellRenderBold}/>
                                <Editing
                                    mode="cell"
                                    selectTextOnEditStart={true}
                                    allowDeleting={true}          
                                    allowUpdating={true}        
                                    useIcons={true}  
                                ></Editing>
                                <Summary>                                   
                                    <TotalItem
                                        column="total"
                                        summaryType="sum" 
                                        customizeText={cellRender} />
                                </Summary>
                        </DataGrid>
                    </GroupItem>
                </GroupItem>
            </Form>
            <br />
            <Button
                width={180}
                text={loading ? 'Guardando...' : 'Guardar factura'}
                type="default"
                icon='save'
                disabled={loading}
                onClick={guardarFactura}
            />
        </div>
    );
}

export default Nuevo;
