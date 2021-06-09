import React, { useEffect, useRef, useState } from 'react';
import { Popup } from 'devextreme-react/popup';
import Form, { SimpleItem, GroupItem, Label, EmptyItem, StringLengthRule, RequiredRule, EmailRule } from 'devextreme-react/form';
import { useDispatch, useSelector } from 'react-redux'
import DataSource from "devextreme/data/data_source";
import notify from 'devextreme/ui/notify';
import uri from '../../../utils/uri';
import http from '../../../utils/http';
import { Button } from 'devextreme-react';
import { dialogConvertProduct } from '../../../store/convertProduct/convertProductDialogReducer';
import { editorOptionsNumberBox } from '../../../data/app';

const ConvertProduct = props => {

    const defaultProductConvert = {
        productId : 0,
        quantity : 0,
        convertProductId : 0,
        convertProductQuantity : 0,
        total : 0,
        name : '',
        stock : 0,
    }

    const { areaId } = props;

    const [product, setProduct] = useState({...defaultProductConvert});
    const [saving, setSaving] = useState(false);
    let refProduct = useRef();
    const dispatch = useDispatch();

    const { open, productId  } = useSelector(store => store.convertProductDialog);

    const closeDialog = ( load ) => {

        dispatch(dialogConvertProduct({open : false, productId: 0}));

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

    useEffect(() => {

        if(productId > 0){
            http(uri.areaProducts(areaId).getById(productId)).asGet()
            .then(resp => {

                let currentProduct = {}

                currentProduct.name = resp.product.name;
                currentProduct.stock = resp.stock;
                currentProduct.quantity = 0;

                if(resp.product.convertProductId != null){
                    currentProduct.quantity = 1;
                }

                currentProduct.convertProductId = resp.product.convertProductId == null ? 0 : resp.product.convertProductId;
                currentProduct.total = resp.product.convertProductQuantity == null ? 0 : resp.product.convertProductQuantity;
                currentProduct.convertProductQuantity = resp.product.convertProductQuantity == null ? 0 : resp.product.convertProductQuantity;

                setProduct({productId, ...currentProduct});
            })
        }
               
    }, [open]);

    const convertirProducto = e => {

        setSaving(true);

        http(`products/${product.productId}/convert/${product.quantity}`).asGet().then(resp => {

            setSaving(false);
            notify('La conversion se ha realizado correctamente');
            closeDialog(true);

        }).catch(err => {

            setSaving(false);
            notify(err,'error');

        })

    }

    const onValueChanged = (e) => {

        let total = product.convertProductQuantity * e.value;

        setProduct({...product, total });        
    }
    

    return (
        <div>
            <Popup
                width={550}
                height={490}
                title={`Convercion de inventario`}
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
                        <GroupItem caption="Convertir a:"  colSpan={2}>  
                            <SimpleItem dataField="quantity" colSpan={2} editorType="dxNumberBox" 
                                editorOptions={{
                                    ...editorOptionsNumberBox, 
                                    disabled: (product.quantity == 0),  
                                    onValueChanged : onValueChanged
                                }}> 
                                <Label text="Cantidad" />
                            </SimpleItem>                        
                            <SimpleItem dataField="convertProductId" editorType="dxSelectBox"
                                colSpan={2}
                                editorOptions={{
                                    disabled :true,
                                    dataSource: new DataSource({
                                        byKey : id => http(`catalogos/products/${id}`).asGet(),
                                        load: (loadOptions) => {

                                            let params = {};
                                            params.skip = loadOptions.skip || 0;
                                            params.take = loadOptions.take || 10;

                                            if(loadOptions.searchValue)
                                                params.name = loadOptions.searchValue  ;

                                            return http(`catalogos/productsAsCatalog`)
                                            .asGet(params).then(x => x.items);
                                            
                                        },
                                        
                                        paginate : true,
                                        pageSize: 10
                                    }),
                                    valueExpr:"id",
                                    displayExpr: item => item ? `${item.id} - ${item.name}` : '',
                                    searchEnabled: true
                                }} 
                                >
                                <Label text="Producto" />
                            </SimpleItem>  
                            <SimpleItem dataField="convertProductQuantity" colSpan={2} editorOptions={{ disabled : true }}> 
                                <Label text="Razon" />
                            </SimpleItem>
                            <SimpleItem dataField="total" colSpan={2} editorOptions={{ disabled : true }}> 
                                <Label text="Total" />
                            </SimpleItem>
                        </GroupItem>  
                    </GroupItem>
                </Form>  
                <Button
                    width={120}
                    text={`${saving ? 'Convertiendo...' : 'Convertir'}`}
                    type="default"
                    icon="save"
                    stylingMode="contained"
                    className="m-1"
                    disabled={saving}
                    onClick={convertirProducto}
                />
            </Popup>
        </div>
    );
}

export default ConvertProduct;
