import React, { useEffect, useState, useRef } from 'react';
import { Popup } from 'devextreme-react/popup';
import Form, { SimpleItem, GroupItem, Label, RequiredRule, StringLengthRule, EmptyItem } from 'devextreme-react/form';
import { useDispatch, useSelector } from 'react-redux'
import { createStore, createStoreLocal } from '../../utils/proxy';
import { editorOptionsSelect } from '../../data/app';
import { DataGrid } from 'devextreme-react';
import { Column, Editing, Lookup, RequiredRule as RuleRequired, Button as ButtonGrid ,Summary,TotalItem} from 'devextreme-react/data-grid';
import ProductDDBComponent from '../../components/dropdown/ProductDDBComponent';
import uri from '../../utils/uri';
import { cellRender, formatId, onCellPrepared } from '../../utils/common';
import http from '../../utils/http';
import useProducts from '../../hooks/useProducts';
import gridsHelper from '../../utils/gridsHelper';
import ButtonForm from '../../components/buttons/ButtonForm';
import notify from 'devextreme/ui/notify';
import { purchaseDefault } from '../../data/defaultObject';
import { dialogPurchase } from '../../store/inPutProductPurchase/purchaseDialogReducer';
import { purchaseStates } from '../../data/catalogos';

const NewPurchase = props => {

    const active = true;

    const { purchaseDialog: { open, id }, user } = useSelector(store => store);

    const { products, setProducts } = useProducts({ areaId: user.areaId, active });
    const [purchase, setPurchase] = useState({ ...purchaseDefault });
    const [saving, setSaving] = useState(false);
    const [details, setDetails] = useState([]);

    let refForm = useRef();
    let refGrid = useRef();

    useEffect(() => {

        if (id > 0) {

            http(uri.purchases.getById(id)).asGet().then(resp => {

                http(uri.products.getByArea(resp.areaId)).asGet().then(data => {

                    setProducts(data);

                    const { purchaseDetails, ...rest } = resp;

                    purchaseDetails.map(detail => {

                        let info = products.find(x => x.id == detail.productId);

                        detail['presentation'] = info.presentation;
                        detail['um'] = info.um;

                        return detail;
                    })

                    setPurchase({ ...purchaseDefault, ...rest });
                    setDetails([...purchaseDetails]);

                });

            });

        } else {

            setPurchase({ ...purchaseDefault, areaId: user.areaId });
            setDetails([]);

        }

    }, [open]);

    const dispatch = useDispatch();
    const onToolbarPreparing = gridsHelper(refGrid, { text: 'Agregar producto', icon: 'plus' });

    const closeDialog = (load) => {

        refForm.current.instance.resetValues();
        refGrid.current.instance.cancelEditData();

        dispatch(dialogPurchase({ open: false, id: 0 }));
        if (load) {
            let { onSave } = props;
            onSave();
        }

        setPurchase({ ...purchaseDefault, areaId: user.areaId });
        setDetails([]);
    }

    const onHiding = ({ load }) => {
        closeDialog(load);
    }

    const guardarEntrada = (e, successCallback) => {

        let result = refForm.current.instance.validate();

        if (result.isValid) {

            setSaving(true);
            let data = { ...purchase, purchaseDetails: [...details] };

            http(uri.purchases.insert).asPost(data).then(resp => {
                setSaving(false);

                if (successCallback) {
                    successCallback(data);
                }
                else {
                    if (isNew) {
                        notify('Compra registrada correctamente');
                        closeDialog(true);
                    }
                    else {
                        notify('Compra actualizada correctamente');
                    }

                }


            }).catch(err => {
                setSaving(false);
                notify(err, 'error', 5000);
            });

        }

    }

    const procesarCompra = (e) => {

        guardarEntrada(e, (data) => {
            http(uri.purchaseProcess).asPost(data).then(resp => {
                notify('Compra procesada en inventario correctamente');
                closeDialog(true);
            });
        });

    }

    const setCellValue = (prop, newData, value, currentRowData) => {

        newData[prop] = value || 0;
        if (prop == 'productId' && value) {

            let info = products.find(x => x.id == value);
            newData['presentation'] = info.presentation;
            newData['um'] = info.um;
            newData['cost'] = 0;
            newData['price'] = 0;
            newData['quantity'] = 1;
            newData['royalty'] = 0;
            newData['total'] = info.cost;
        }

        if (prop == 'quantity' && (+value) >= 0) {
            newData['total'] = currentRowData['cost'] * value;
        }

        // if (prop == 'royalty' && (+value) >= 0) {
        //     newData['total'] = currentRowData['cost'] * value + currentRowData['quantity'] * currentRowData['cost'];
        // }

        if (prop == 'cost' && (+value) >= 0) {
            newData['total'] = currentRowData['quantity'] * value;
        }

    }

    const isNew = id == 0;

    const textSaving = 'Guardar Entrada';

    const canProcess = !isNew && purchase.statusId == purchaseStates.pendiente;

    const canSave = isNew || purchase.statusId == purchaseStates.pendiente;

    return (
        <div>
            <Popup
                width={950}
                height={520}
                title={isNew ? `Nueva compra de inventario` : `Compra #${formatId(id)}`}
                onHiding={onHiding}
                visible={open}
            >
                <Form formData={purchase} ref={refForm}>
                    <GroupItem colCount={3}>
                        <SimpleItem dataField="areaId" editorType="dxSelectBox"
                            editorOptions={{
                                disabled: true,
                                dataSource: createStoreLocal({ name: 'area' }),
                                ...editorOptionsSelect
                            }} >
                            <Label text="Area" />
                            <RequiredRule message="Seleccione el area" />
                        </SimpleItem>
                        <SimpleItem dataField="date" editorType="dxDateBox"
                            editorOptions={{
                                displayFormat: 'dd/MM/yyyy',
                                openOnFieldClick: true,
                            }} >
                            <Label text="Fecha" />
                            <RequiredRule message="Seleccione la fecha" />
                        </SimpleItem>
                        <SimpleItem dataField="purchaseTypeId" colSpan={2} editorType="dxSelectBox"
                            editorOptions={{
                                dataSource: createStore({ name: 'PurchaseType' }),
                                ...editorOptionsSelect
                            }} >
                            <Label text="Tipo de compra:" />
                            <RequiredRule message="Seleccione el tipo de compra" />
                        </SimpleItem>
                        <SimpleItem dataField="providerId" colSpan={1} editorType="dxSelectBox"
                            editorOptions={{
                                dataSource: createStore({ name: 'Provider' }),
                                ...editorOptionsSelect
                            }} >
                            <Label text="Proveedor" />
                            <RequiredRule message="Seleccione el proveedor" />
                        </SimpleItem>
                        <SimpleItem dataField="reference">
                            <Label text="Referencia" />
                            <RequiredRule message="Ingrese la referencia de compra" />
                        </SimpleItem>
                        <EmptyItem></EmptyItem>
                        {/* <EmptyItem></EmptyItem> */}
                        <SimpleItem dataField="observation" colSpan={3} editorType="dxTextArea">
                            <Label text="Observacion" />
                            {/* <RequiredRule message="Ingrese una observacion" /> */}
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
                            height={290}
                            onToolbarPreparing={onToolbarPreparing}
                            onCellPrepared={onCellPrepared}
                        >
                            <Column dataField="productId" caption="Producto"
                                setCellValue={setCellValue.bind(null, "productId")}
                                editCellComponent={ProductDDBComponent}>
                                <Lookup
                                    dataSource={products}
                                    valueExpr="id"
                                    displayExpr={item => item ? `${item.id} - ${item.name}` : ''}

                                />
                                <RuleRequired />
                            </Column>
                            <Column dataField="presentation" caption="Lab" width={120} allowEditing={false}>
                                <RuleRequired />
                            </Column>
                            <Column dataField="um" caption="Um" width={120} allowEditing={false}>
                                <RuleRequired />
                            </Column>
                            <Column dataField="quantity" caption="Cantidad" dataType="number" width={80} setCellValue={setCellValue.bind(null, "quantity")}>
                                <RuleRequired />
                            </Column>
                            <Column dataField="royalty" caption="Regalia" dataType="number" width={80} setCellValue={setCellValue.bind(null, "royalty")}>
                                <RuleRequired />
                            </Column>
                            <Column dataField="cost" caption="Costo" dataType="number" width={100} cellRender={cellRender()} setCellValue={setCellValue.bind(null, "cost")}>
                                <RuleRequired />
                            </Column>
                            <Column dataField="total" caption="Total" dataType="number" width={120} allowEditing={false} cellRender={cellRender()} >
                                <RuleRequired />
                            </Column>
                            <Column dataField="price" caption="Precio" dataType="number" width={100} cellRender={cellRender()} >
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
                            <Summary>
                                <TotalItem
                                    column="total"
                                    summaryType="sum"
                                    valueFormat="currency" 
                                    displayFormat="Total: {0}"/>
                            </Summary>
                        </DataGrid>
                    </GroupItem>
                </Form>


                <ButtonForm saving={saving} textSaving={textSaving} onClick={guardarEntrada} visible={canSave} />
                <ButtonForm saving={saving} textSaving="Procesar compra" onClick={procesarCompra} visible={canProcess} icon="check" />

            </Popup>
        </div>
    );
}

export default NewPurchase;
