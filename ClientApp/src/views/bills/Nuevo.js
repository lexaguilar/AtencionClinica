import React, { useEffect, useState } from 'react';
import Form, { SimpleItem, GroupItem, Label, RequiredRule, StringLengthRule, EmptyItem } from 'devextreme-react/form';
import { createStoreLocal } from '../../utils/proxy';
import { Button } from 'devextreme-react/button';
import http from '../../utils/http';
import { editorOptionsSelect } from '../../data/app';
import uri from '../../utils/uri';
import Title from '../../components/shared/Title';
import BlockHeader from '../../components/shared/BlockHeader';
import notify from 'devextreme/ui/notify';
import { _path } from "../../data/headerNavigation";
import { billDefault } from '../../data/bill';
import PopupPrivado from '../../components/beneficiary/PopupPrivado';
import DataSource from "devextreme/data/data_source";
import DataGrid, { Column, Editing, Lookup } from 'devextreme-react/data-grid';
import { cellRender, cellRenderBold, obtenerTasaCambio } from '../../utils/common';
import urlReport from '../../services/reportServices';
import Resumen from '../../components/footer/Resumen';

const Nuevo = props => {
    
    const [loading, setLoading] = useState(false);
    const [bill, setBill] = useState({...billDefault});
    const [procedimientos, setProcedimientos] = useState([]);
    const [services, setServices] = useState([]);

    let refBill = React.createRef();
    let dataGrid = React.createRef();

    const guardarFactura = () => {
        let result = refBill.instance.validate();
        if (result.isValid) {            

            setLoading(true);
            http(uri.bill.insert).asPost({...bill, billDetails : procedimientos.map(x => ({...x, ...{serviceId : x.id, id: 0}  }))}).then(resp => {
                if (resp) {

                    setLoading(false);
                    notify(`Factura ${resp.id} creada correctamente`);

                    setBill({...billDefault});      
                    
                    const report = urlReport();
                    report.print(`${report.billTicket(resp.id)}`);

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
        http(`services/area/${bill.areaId}/get`).asGet({active:true}).then(resp => setServices(resp))
    }

    const onToolbarPreparing = (e) => {  
        if(bill.areaId > 0)
            e.toolbarOptions.items.unshift({
                location: 'before',
                widget: 'dxButton',
                options: {
                    text: 'Agregar Procedimiento',
                    icon:'plus',
                    type:'default',
                    stylingMode:"outlined",
                    onClick: () =>  dataGrid.instance.addRow()
                }
            });
    }  

    const getPriceByCurrency = (currencyId, rate) => service => {
       
        let price = 0;

        if(currencyId == service.currencyId)
            price = service.price;
        else
            if(currencyId == 1)
                price = service.price * rate;
            else
                price = service.price / rate;

        return price;
         
    }

    const setCellValue = (newData, value, currentRowData) => {

        const service = services.find(x => x.id == value);

        const price = getPriceByCurrency(bill.currencyId, bill.rate)(service);
      
        newData.id = value;
      
        newData.quantity = 1;     
        newData.price = price;
        newData.subTotal = price * newData.quantity;  
        newData.total = newData.subTotal;  
      
    }

    const setCellValueCant = (newData, value, currentRowData) => {

        newData.quantity = value;
        newData.price = currentRowData.price;     
        newData.subTotal = currentRowData.price * newData.quantity;  
        newData.total = newData.subTotal;  

    }

    const onValueChangedCurrency = (e) => {
        setBill({...bill, currencyId : e.value});    
        setProcedimientos([]);
    }

    useEffect(() => {
        obtenerTasaCambio(new Date()).then(rate =>{
            if(rate)
                setBill({...bill, rate : rate.value});
        });
    }, [0]);

    const updateBills = (e) => {
        setProcedimientos([...procedimientos]);
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
                            dataSource: createStoreLocal({ name: 'billType', active: true }),
                            ...editorOptionsSelect
                        }} >
                        <Label text="Tipo Ingreso" />
                        <RequiredRule message="Seleccione la especialidad" />
                    </SimpleItem>
                    <EmptyItem/>
                    <SimpleItem dataField="areaId" editorType="dxSelectBox"
                        editorOptions={{
                            dataSource: createStoreLocal({ name: 'area', active: true }),
                            ...editorOptionsSelect,
                            onValueChanged: onValueChangedArea,
                        }} >
                        <Label text="Area" />
                        <RequiredRule message="Seleccione el area" />
                    </SimpleItem>
                    <EmptyItem/>
                    <SimpleItem dataField="currencyId" editorType="dxSelectBox"
                        editorOptions={{
                            dataSource: createStoreLocal({ name: 'Currency', active: true }),
                            ...editorOptionsSelect,
                            onValueChanged: onValueChangedCurrency
                        }} >
                        <Label text="Moneda" />
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
                            allowColumnResizing={ true}
                            allowColumnReordering={true}    
                            onToolbarPreparing={onToolbarPreparing} 
                            onRowUpdated={updateBills}
                            onRowRemoved={updateBills}
                            onRowInserted={updateBills}
                            >                                    
                                <Column dataField="id" caption="Procedimiento" setCellValue={setCellValue}>
                                    <Lookup 
                                        disabled={true} 
                                        dataSource={services} 
                                        valueExpr="id" displayExpr="name" 
                                    />
                                </Column>
                                <Column dataField="quantity" caption='Cant' width={70} setCellValue={setCellValueCant}/>                             
                                <Column dataField="price" allowEditing={false} caption='Precio' width={100}  cellRender={cellRender(bill.currencyId)}/>                             
                                <Column dataField="total" allowEditing={false} width={120}  cellRender={cellRenderBold(bill.currencyId)}/>
                                <Editing
                                    mode="cell"
                                    selectTextOnEditStart={true}
                                    allowDeleting={true}          
                                    allowUpdating={true}        
                                    useIcons={true}  
                                ></Editing>
                        </DataGrid>
                    </GroupItem>
                    <GroupItem colCount={1}>
                        <Resumen arr={procedimientos} currencyId={bill.currencyId} />                       
                    </GroupItem>
                </GroupItem>
            </Form>
            <br />
            <Button
                width={180}
                text={loading ? 'Guardando...' : 'Guardar factura'}
                type="success"
                icon='save'
                disabled={loading}
                onClick={guardarFactura}
            />
        </div>
    );
}

export default Nuevo;
