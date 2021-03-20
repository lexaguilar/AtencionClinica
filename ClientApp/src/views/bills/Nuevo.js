import React, { useEffect, useRef, useState } from 'react';
import { createStoreLocal } from '../../utils/proxy';
import { Button } from 'devextreme-react/button';
import http from '../../utils/http';
import { dataAccess, editorOptionsSelect, resources } from '../../data/app';
import uri from '../../utils/uri';
import Title from '../../components/shared/Title';
import BlockHeader from '../../components/shared/BlockHeader';
import notify from 'devextreme/ui/notify';
import { _path } from "../../data/headerNavigation";
import { billDefault } from '../../data/bill';
import PopupPrivado from '../../components/beneficiary/PopupPrivado';
import DataSource from "devextreme/data/data_source";
import DataGrid, { Column, Editing, Lookup, Selection, Paging, FilterRow, Scrolling } from 'devextreme-react/data-grid';
import { cellRender, cellRenderBold, dataFormatId, obtenerTasaCambio } from '../../utils/common';
import urlReport from '../../services/reportServices';
import Resumen from '../../components/footer/Resumen';
import useAuthorization from '../../hooks/useAuthorization';

import {
    Validator,
    RequiredRule,
    CompareRule,
    EmailRule,
    PatternRule,
    StringLengthRule,
    RangeRule,
    AsyncRule
} from 'devextreme-react/validator';
import { DropDownBox, SelectBox, TextArea } from 'devextreme-react';
import './bill.css';
import { DivForm } from '../../utils/divHelpers';

const Nuevo = props => {

    const { authorized } = useAuthorization([resources.caja, dataAccess.create]);

    let dropDownBoxRef = useRef();

    const [loading, setLoading] = useState(false);
    const [bill, setBill] = useState({ ...billDefault });
    const [procedimientos, setProcedimientos] = useState([]);
    const [services, setServices] = useState([]);

    let refBill = React.createRef();
    let dataGrid = React.createRef();

    const guardarFactura = () => {
        let result = refBill.instance.validate();
        if (result.isValid) {

            setLoading(true);
            http(uri.bill.insert).asPost({ ...bill, billDetails: procedimientos.map(x => ({ ...x, ...{ serviceId: x.id, id: 0 } })) }).then(resp => {
                if (resp) {

                    setLoading(false);
                    notify(`Factura ${resp.id} creada correctamente`);

                    setBill({ ...billDefault });

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
            areaId: e.value
        });
        setProcedimientos([]);
        loadServices();
    }

    const loadServices = (areaId) => {
        http(`services/area/${areaId}/get`).asGet({ active: true }).then(resp => setServices(resp))
    }

    const onToolbarPreparing = (e) => {
        if (bill.areaId > 0)
            e.toolbarOptions.items.unshift({
                location: 'before',
                widget: 'dxButton',
                options: {
                    text: 'Agregar Procedimiento',
                    icon: 'plus',
                    type: 'default',
                    stylingMode: "outlined",
                    onClick: () => dataGrid.instance.addRow()
                }
            });
    }

    const getPriceByCurrency = (currencyId, rate) => service => {

        let price = 0;

        if (currencyId == service.currencyId)
            price = service.price;
        else
            if (currencyId == 1)
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
        setBill({ ...bill, currencyId: e.value });
        setProcedimientos([]);
    }

    useEffect(() => {
        obtenerTasaCambio(new Date()).then(rate => {
            if (rate)
                setBill({ ...bill, rate: rate.value });
        });
    }, [0]);

    const updateBills = (e) => {
        setProcedimientos([...procedimientos]);
    }

    const [gridBoxValue, setGridBoxValue] = useState([]);
    const changeHandler = (e) => {
        setGridBoxValue(e.value);
    }

    const dataGrid_onSelectionChanged = (e) => {
        setGridBoxValue(e.selectedRowKeys[0].id);
        dropDownBoxRef.current.instance.close();

    }

    const dataSource = new DataSource({
        load: (loadOptions) => {

            let params = {};
            params.skip = loadOptions.skip || 0;
            params.take = loadOptions.take || 10;

            if (loadOptions.searchValue)
                params.name = loadOptions.searchValue;

            return http(uri.privateCustomers().getAsCatalog)
                .asGet(params).then(x => x.items);

        },
        paginate: true,
        pageSize: 10,
        byKey: id => http(uri.privateCustomers().getById(id)).asGet()
    });


    const dataGridRender = () => {
        return (
            <DataGrid
                dataSource={dataSource}
                hoverStateEnabled={true}
                selectedRowKeys={gridBoxValue}
                onSelectionChanged={dataGrid_onSelectionChanged}
                height="100%">
                <Selection mode="single" />
                <Scrolling mode="infinite" />
                <Paging enabled={true} pageSize={10} />
                <FilterRow visible={true} />
                <Column visible={false} dataField="id" caption="Codigo" width={80} cellRender={dataFormatId} />
                <Column dataField="type" caption="Tipo" width={80} allowFiltering={false} />
                <Column dataField="contract" caption="Convenio" width={150} allowFiltering={false} />
                <Column dataField="identification" caption="Identificacion" width={100} />
                <Column dataField="name" caption="Nombre" />
                <Column dataField="sex" caption="Sexo" width={120} visible={false}></Column>
            </DataGrid>
        );
    }

    const onFormSubmit = (e) => {
        window.location.ref = window.location.ref;
        console.log(bill)
        e.preventDefault();


        setLoading(true);
        http(uri.bill.insert).asPost({ ...bill,privateCustomerId: gridBoxValue, billDetails: procedimientos.map(x => ({ ...x, ...{ serviceId: x.id, id: 0 } })) }).then(resp => {
            if (resp) {

                setLoading(false);
                //notify(`Factura ${resp.id} creada correctamente`);

                // setBill({ ...billDefault });
                // setGridBoxValue(null);

                // setProcedimientos([]);
                // dropDownBoxRef.current.instance.reset();


                const report = urlReport();
                report.print(`${report.billTicket(resp.id)}`);

                window.location.reload(false);

            }
        }).catch(err => {

            notify(err, 'error');
            setLoading(false);

        });
    }

    const title = 'Nueva factura';

    return authorized(
        <div className="container medium">
            <Title title={title} />
            <BlockHeader title={title} >
                <PopupPrivado />
            </BlockHeader>
            <form onSubmit={onFormSubmit}>
                <div className="dx-fieldset">
                    <DivForm title='Asegurado' required>
                        <DropDownBox
                            ref={dropDownBoxRef}
                            dropDownOptions={{ width: 700 }}
                            dataSource={dataSource}
                            key="id"
                            placeholder="Selecciona un paciente"
                            showClearButton={true}
                            valueExpr="id"
                            displayExpr={item => item ? `${item.id} - ${item.firstName} ${item.lastName}` : ''}
                            value={gridBoxValue}
                            onValueChanged={changeHandler}
                            contentRender={dataGridRender}
                        >
                            <Validator>
                                <RequiredRule message="Seleccione este campo" />
                            </Validator>
                        </DropDownBox>
                    </DivForm>

                    <DivForm title='Tipo Ingreso' required>
                        <SelectBox
                            value={bill.billTypeId}
                            onValueChanged={e => setBill({ ...bill, billTypeId: e.value })}
                            dataSource={createStoreLocal({ name: 'billType', active: true })}
                            {...editorOptionsSelect}
                        >
                            <Validator>
                                <RequiredRule message="Este campo es requerido" />
                            </Validator>
                        </SelectBox>
                    </DivForm>

                    <DivForm title='Area' required>
                        <SelectBox
                            value={bill.areaId}
                            onValueChanged={e => {

                                setBill(bill => ({ ...bill, areaId: e.value }));
                                setProcedimientos([]);
                                loadServices(e.value);

                            }}
                            dataSource={createStoreLocal({ name: 'area', active: true })}
                            {...editorOptionsSelect}
                        >
                            <Validator>
                                <RequiredRule message="Este campo es requerido" />
                            </Validator>
                        </SelectBox>
                    </DivForm>

                    <DivForm title='Moneda' required>
                        <SelectBox
                            defaultValue={bill.currencyId}
                            value={bill.currencyId}
                            onValueChanged={e => {
                                setBill({ ...bill, currencyId: e.value })
                                setProcedimientos([]);
                            }}
                            dataSource={createStoreLocal({ name: 'currency', active: true })}
                            {...editorOptionsSelect}
                        >
                            <Validator>
                                <RequiredRule message="Este campo es requerido" />
                            </Validator>
                        </SelectBox>
                    </DivForm>
                    <DivForm title='Observacion' >
                        <TextArea
                         defaultValue={bill.observaction}
                         value={bill.observaction}
                         onValueChanged={e => {
                             setBill({ ...bill, observaction: e.value })                             
                         }}>

                        </TextArea>
                    </DivForm>

                    <DataGrid id="gridContainer"
                        ref={(ref) => dataGrid = ref}
                        dataSource={procedimientos}
                        selection={{ mode: 'single' }}
                        showBorders={true}
                        showRowLines={true}
                        allowColumnResizing={true}
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
                        <Column dataField="quantity" caption='Cant' width={70} setCellValue={setCellValueCant} />
                        <Column dataField="price" allowEditing={false} caption='Precio' width={100} cellRender={cellRender(bill.currencyId)} />
                        <Column dataField="total" allowEditing={false} width={120} cellRender={cellRenderBold(bill.currencyId)} />
                        <Editing
                            mode="cell"
                            selectTextOnEditStart={true}
                            allowDeleting={true}
                            allowUpdating={true}
                            useIcons={true}
                        ></Editing>
                    </DataGrid>

                </div>
                <Button
                    width={180}
                    text={loading ? 'Guardando...' : 'Guardar factura'}
                    type="success"
                    icon='save'
                    disabled={loading}
                    useSubmitBehavior={true}
                //onClick={guardarFactura} 
                />
            </form>
            {/*<Form formData={bill} ref={ref => refBill = ref}>
                <GroupItem cssClass="second-group" colCount={2}>
                    <SimpleItem dataField="privateCustomerId" editorType="dxSelectBox"
                        editorOptions={{
                            dataSource: new DataSource({
                                load: (loadOptions) => {

                                    let params = {};
                                    params.skip = loadOptions.skip || 0;
                                    params.take = loadOptions.take || 10;

                                    if (loadOptions.searchValue)
                                        params.name = loadOptions.searchValue;

                                    return http(uri.privateCustomers().getAsCatalog)
                                        .asGet(params).then(x => x.items);

                                },
                                paginate: true,
                                pageSize: 10
                            }),
                            valueExpr: "id",
                            displayExpr: item => item ? `${item.id} - ${item.name}` : '',
                            searchEnabled: true
                        }} >
                        <Label text="Paciente" />
                        <RequiredRule message="Seleccione el area" />
                    </SimpleItem>
                    <EmptyItem />
                    <SimpleItem dataField="billTypeId" editorType="dxSelectBox"
                        editorOptions={{
                            dataSource: createStoreLocal({ name: 'billType', active: true }),
                            ...editorOptionsSelect
                        }} >
                        <Label text="Tipo Ingreso" />
                        <RequiredRule message="Seleccione la especialidad" />
                    </SimpleItem>
                    <EmptyItem />
                    <SimpleItem dataField="areaId" editorType="dxSelectBox"
                        editorOptions={{
                            dataSource: createStoreLocal({ name: 'area', active: true }),
                            ...editorOptionsSelect,
                            onValueChanged: onValueChangedArea,
                        }} >
                        <Label text="Area" />
                        <RequiredRule message="Seleccione el area" />
                    </SimpleItem>
                    <EmptyItem />
                    <SimpleItem dataField="currencyId" editorType="dxSelectBox"
                        editorOptions={{
                            dataSource: createStoreLocal({ name: 'Currency', active: true }),
                            ...editorOptionsSelect,
                            onValueChanged: onValueChangedCurrency
                        }} >
                        <Label text="Moneda" />
                        <RequiredRule message="Seleccione el area" />
                    </SimpleItem>
                    <EmptyItem />
                    <SimpleItem dataField="observation">
                        <StringLengthRule max={250} message="Maximo 250 caracteres" />
                        <Label text="Observacion" />
                    </SimpleItem>
                    <EmptyItem />
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
                            <Column dataField="quantity" caption='Cant' width={70} setCellValue={setCellValueCant} />
                            <Column dataField="price" allowEditing={false} caption='Precio' width={100} cellRender={cellRender(bill.currencyId)} />
                            <Column dataField="total" allowEditing={false} width={120} cellRender={cellRenderBold(bill.currencyId)} />
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
                    </Form> */}
        </div>
    );
}

export default Nuevo;
