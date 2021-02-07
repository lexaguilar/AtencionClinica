import React, { useState } from 'react';
import { Popup } from 'devextreme-react/popup';
import Form, { SimpleItem, GroupItem, Label, AsyncRule,RequiredRule, StringLengthRule} from 'devextreme-react/form';
import { useDispatch, useSelector } from 'react-redux'
import { dialogInputProduct } from '../../../store/inPutProduct/inPutProductDialogReducer';
import { createStore, createStoreLocal } from '../../../utils/proxy';
import { editorOptionsSelect } from '../../../data/app';
import { Button } from 'devextreme-react/button';
import { DataGrid } from 'devextreme-react';
import { Column, Editing, Lookup } from 'devextreme-react/data-grid';
import ProductDDBComponent from '../../../components/dropdown/ProductDDBComponent';
import uri from '../../../utils/uri';

const Nuevo = props => {

    const [inPutProduct, setInPutProduct] = useState({});
    const [saving, setSaving] = useState(false);
    const [details, setDetails] = useState([]);
    let refInPutProduct = React.createRef(); 
    const dispatch = useDispatch();
    const { open } = useSelector(store => store.inPutProductDialog);

    const closeDialog = ( load ) => {
        dispatch(dialogInputProduct({open : false}));

        if (load) {

            let { onSave } = props;
            onSave();
      
        }
    }

    const onHiding = ({ load }) => {

        refInPutProduct.current.instance.resetValues();

        closeDialog(load);
        
    }

    const guardarEntrada = (e) => {


        refInPutProduct.current.instance.validate();
        console.log(inPutProduct);
        console.log(details);
    }

    const setCellValue = (prop, newData, value, currentRowData) => {
        console.log(prop);
        console.log(newData);
        console.log(value);
        console.log(currentRowData);

        newData[prop] = value || 0;

    }

    return (
        <div>
             <Popup
                width={850}
                height={550}
                title={`Nueva entrada de inventario`}
                onHiding={onHiding}
                visible={open}
            >
                <Form formData={inPutProduct} ref={refInPutProduct}>
                    <GroupItem colCount={2}>
                        <SimpleItem dataField="areaId" editorType="dxSelectBox"
                            editorOptions={{
                                dataSource: createStoreLocal({ name: 'area'}),
                                ...editorOptionsSelect
                            }} >
                            <Label text="Area" />
                            <RequiredRule message="Seleccione el area" />
                        </SimpleItem>
                        <SimpleItem dataField="typeId" editorType="dxSelectBox"
                            editorOptions={{
                                dataSource: createStore({name: 'inPutProductType'}),
                                ...editorOptionsSelect
                            }} >
                            <Label text="Tipo" />
                            <RequiredRule message="Seleccione el tipo" />
                        </SimpleItem>
                        <SimpleItem dataField="observation" colSpan={2}  editorType="dxTextArea">
                            <Label text="Observacion" />
                            <RequiredRule message="Ingrese una observacion" />
                            <StringLengthRule max={500} message="Maximo 500 caracteres" />
                        </SimpleItem>
                    </GroupItem>
                    <GroupItem>
                        <DataGrid id="gridContainer"
                            selection={{ mode: 'single' }}
                            dataSource={details}
                            //dataSource={store({ uri : uri.inPutProducts, remoteOperations : true })}
                            showBorders={true}
                            showRowLines={true}
                            allowColumnResizing={true}
                            allowColumnReordering={true}
                        >
                            <Column dataField="productId" caption="Producto" width={250}
                                editCellComponent={ProductDDBComponent} >
                                <Lookup 
                                    dataSource={createStoreLocal({ name: 'product', url : uri.products.getAsCatalog, active : true})} 
                                    valueExpr="id" 
                                    displayExpr={item => item ? `${item.id} - ${item.name}` : ''}
                                />
                            </Column>
                            <Column dataField="quantity" caption="Cantidad" dataType="number" width={60} setCellValue={setCellValue.bind(null,"quantity")}></Column>
                            <Editing
                                mode="cell"
                                allowDeleting={true}
                                allowAdding={true}
                                allowUpdating={true}
                                selectTextOnEditStart={true}
                                useIcons={true}
                            ></Editing>
                        </DataGrid>
                    </GroupItem>
                </Form>
                
                <Button
                    width={120}
                    text="Guardar"
                    type="default"
                    icon="save"
                    stylingMode="contained"
                    className="m-1"
                    disabled={saving}
                    onClick={guardarEntrada}
                />
            </Popup>
        </div>
    );
}

export default Nuevo;
