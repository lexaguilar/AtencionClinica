
import React, { useEffect, useRef, useState } from 'react';
import { DataGrid } from 'devextreme-react';
import { Popup } from 'devextreme-react/popup';
import Form, { GroupItem, SimpleItem, Label, RequiredRule, StringLengthRule } from 'devextreme-react/form';
import { useDispatch, useSelector } from 'react-redux'
import notify from 'devextreme/ui/notify';
import { Column, Editing, Lookup, RequiredRule as RuleRequired, Button as ButtonGrid } from 'devextreme-react/data-grid';
import { dialogTransferWithProduct } from '../../store/transferWithProduct/transferWithProdcutDialogReducer';
import { Button } from 'devextreme-react';
import { editorOptionsSelect } from '../../data/app';
import { createStoreLocal } from '../../utils/proxy';
import http from '../../utils/http';
import uri from '../../utils/uri';
import useProducts from '../../hooks/useProducts';
import ProductDDBComponent from '../dropdown/ProductDDBComponent';
import { onCellPrepared } from '../../utils/common';
import gridsHelper from '../../utils/gridsHelper';

const TransferWithProduct = () => {

    const exists = true;
    const active = true;

    const { open, id } = useSelector(store => store.transferWithProdcut);

    const [workPreOrder, setWorkPreOrder] = useState({});
    const [areaId, setAreaId] = useState(0);    
    const [details, setDetails] = useState([]);
    const { products } = useProducts({ areaId, exists, active });

    const dispatch = useDispatch();
    const onHiding = () => dispatch(dialogTransferWithProduct({ open: false, id: 0 }));

    let refForm = useRef();
    let refGrid = useRef();

    const onToolbarPreparing = gridsHelper(refGrid, { text : 'Agregar productos', icon:'plus' });   

    const transferir = () => {

        var result = refForm.current.instance.validate();
        if (result.isValid) {

            http(`follows/post/withproduct/Admission/${id}/areaTarget/${workPreOrder.areaTargetId}`)
            .asPost({ ...workPreOrder, workPreOrderDetails : details }).then(resp => {
                notify("Se realizo la transferencia con éxito");
                refForm.current.instance.resetValues();
                onHiding();
            }).catch(err => {
                notify(err, 'error')
            })

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
    const onValueChanged = (e) => {
        setAreaId(e.value);
        setDetails([]);
    }

    useEffect(() => {
        setAreaId(0);
        setDetails([]);    
        setWorkPreOrder({})    
    }, [open]);


    const title = 'Tranferir';

    return (
        <div>
            <Popup
                width={600}
                height={500}
                onHiding={onHiding}
                title={title}
                visible={open}
            >
                <Form formData={workPreOrder} ref={refForm}>
                    <SimpleItem dataField="areaTargetId" editorType="dxSelectBox"
                        editorOptions={{
                            dataSource: createStoreLocal({ name: 'Area', active }),
                            ...editorOptionsSelect,
                            onValueChanged: onValueChanged
                        }} >
                        <Label text="Area" />
                        <RequiredRule message="Seleccione el area" />
                    </SimpleItem>
                    <SimpleItem dataField="doctorId" colSpan={2} editorType="dxSelectBox"
                            editorOptions={{
                                dataSource: createStoreLocal({name: 'Doctor', active : true}),
                                ...editorOptionsSelect
                            }} >
                            <Label text="Doctor" />
                            <RequiredRule message="Seleecione el medico" />
                        </SimpleItem>
                    <SimpleItem dataField="observation" editorType="dxTextBox">
                        <Label text="Observacion" />
                        <StringLengthRule max={150} message="Maximo 150 caracteres" />
                    </SimpleItem>
                    <GroupItem>
                        <DataGrid id="gridDetails"
                            ref={refGrid}
                            selection={{ mode: 'single' }}
                            dataSource={details}
                            showBorders={true}
                            showRowLines={true}
                            allowColumnResizing={true}
                            allowColumnReordering={true}
                            height={280}
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
                            <Column dataField="presentation" caption="Laboratorio" width={120} allowEditing={false}>
                                <RuleRequired />
                            </Column>
                            <Column dataField="um" caption="Um" width={120} allowEditing={false}>
                                <RuleRequired />
                            </Column>
                            <Column dataField="quantity"
                                caption="Cantidad"
                                dataType="number" width={80}
                                setCellValue={setCellValue.bind(null, "quantity")}>
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
                <br />
                <Button className="m0" type="default" text="Transferir" onClick={transferir} width="100%" ></Button>
            </Popup>
        </div>
    );
}

export default TransferWithProduct;
