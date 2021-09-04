import React, { useEffect, useRef, useState } from 'react';
import DataGrid, { Column, Editing, Lookup, RequiredRule as RuleRequired, Button as ButtonGrid, TotalItem, Summary } from 'devextreme-react/data-grid';
import gridsHelper from '../../utils/gridsHelper';
import { cellRender, formatToMoney, onCellPrepared } from '../../utils/common';
import ProductDDBComponent from '../../components/dropdown/ProductDDBComponent';
import useProducts from '../../hooks/useProducts';
import http from '../../utils/http';


const GridMedicamentos = ({useStandar = false, validate = [], detailsServices=[], isClosing, details,setDetails,  user, showPrice= false, currencyId = 1, rate= 1, refresh = false}) => {
 
    validate.push(() =>{

        ref.current.instance.saveEditData();
        const result = ref.current.instance.hasEditData();
     
        return !result;

    });

    const exists = true;    
    const active = true;   
    let ref = useRef();    

    const { products, reload } = useProducts({areaId: user.areaId, exists, active});

    const onToolbarPreparing = (e) => {  

        
        if(useStandar)
            e.toolbarOptions.items.unshift({
                location: 'before',
                widget: 'dxButton',
                options: {
                    stylingMode:"outlined",
                    text: 'Descargar Estandar',
                    icon: 'arrowdown',
                    type:'primary',
                    onClick: () =>  {

                        const services = detailsServices.map(x => http(`services/${x.serviceId}/products/get`).asGet());
                        Promise.all([
                            ...services
                        ]).then(resp => {

                            const listOfProducts = resp.flat();

                            let result = listOfProducts.map(x => {     
                                
                                let product = {};

                                let info = products.find(p => p.id == x.productId);

                                const price = getPriceByCurrency(info);
                    
                    
                                product['productId'] = x.productId;
                                product['presentation'] = info.presentation;
                                product['um'] = info.um
                                product['cost'] = info.cost;
                                product['price'] = price;
                                product['quantity'] = x.quantity;
                                product['serviceId'] = null;
                    
                                if(showPrice)
                                    product['total'] = price;
                                else
                                    product['total'] = info.cost; 

                                return product;

                            });

                            //details = [...result];

                            setDetails([...result]);

                            // result.forEach((prod, i) => {

                            //     ref.current.instance.addRow().then(add =>{
                            //         console.log(add);
                            //         ref.current.instance.cellValue(0, 'productId', prod.productId);
                            //         ref.current.instance.endUpdate();
                            //         ref.current.instance.saveEditData();
                            //     });
                            //     //console.log(valor);
                                
                            //     // ref.current.instance.cellValue(0, 'presentation', prod.presentation);
                            //     // ref.current.instance.cellValue(0, 'um', prod.um);
                            //     // ref.current.instance.cellValue(0, 'cost', prod.cost);
                            //     // ref.current.instance.cellValue(0, 'price', prod.price);
                            //     // ref.current.instance.cellValue(0, 'quantity', prod.quantity);
                            //     // ref.current.instance.cellValue(0, 'serviceId', prod.serviceId);
                            //     // ref.current.instance.cellValue(0, 'total', prod.total);

                                

                            // })

                            // console.log(result);

                           


                        });

                    }
                }
            });

        e.toolbarOptions.items.unshift({
            location: 'before',
            widget: 'dxButton',
            options: {
                stylingMode:"outlined",
                text: 'Agregar producto',
                icon: 'plus',
                type:'default',
                onClick: () =>  ref.current.instance.addRow()
            }
        });

    } 

    const getPriceByCurrency = product => {

        let price = 0;

        if (currencyId == product.currencyId)
            price = product.price;
        else
            if (currencyId == 1)
                price = product.price * rate;
            else
                price = product.price / rate;

        return price;

    }
    
    const setCellValue = (prop, newData, value, currentRowData) => {

        newData[prop] = value || 0;
        if(prop == 'productId' && value){

            let info = products.find(x => x.id == value);

            const price = getPriceByCurrency(info);


            newData['presentation'] = info.presentation;
            newData['um'] = info.um
            newData['cost'] = info.cost;
            newData['price'] = price;
            newData['quantity'] = 1;
            newData['serviceId'] = null;

            if(showPrice)
                newData['total'] = price;
            else
                newData['total'] = info.cost; 
            

        }
        
        if(prop == 'quantity' && (+value) >= 0)
            if(showPrice)
                newData['total'] = currentRowData['price'] * value;
            else
                newData['total'] = currentRowData['cost'] * value;

    }  

    useEffect(() => {
        if(refresh)
            reload();
    }, [refresh]); 


    if(isClosing)
        if(ref.current)
           ref.current.instance.cancelEditData();

    return (
        <DataGrid id="gridDetails"
            ref={ref}
            selection={{ mode: 'single' }}
            dataSource={details}
            showBorders={true}
            showRowLines={true}
            allowColumnResizing={true}
            allowColumnReordering={true}
            height={230}
            onToolbarPreparing={onToolbarPreparing}
            onCellPrepared={onCellPrepared}
        >
            <Column dataField="productId" caption="Producto"
                setCellValue={setCellValue.bind(null, "productId")}
                editCellComponent={props => <ProductDDBComponent showPrice={true} {...props} />}>
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
            <Column dataField="cost" caption="Costo" dataType="number" width={100} allowEditing={false} visible={!showPrice} cellRender={cellRender(currencyId)} >
                <RuleRequired />
            </Column>
            <Column dataField="price" caption="Precio" dataType="number" width={100} allowEditing={false} visible={showPrice} cellRender={cellRender(currencyId)} >
                <RuleRequired />
            </Column>
            <Column dataField="total" caption="Total" dataType="number" width={120} allowEditing={false} cellRender={cellRender(currencyId)} >
                <RuleRequired />
            </Column>
            <Column type="buttons" width={50}>
                <ButtonGrid name="delete" />
            </Column>
            <Summary>
                <TotalItem
                    column="total"
                    summaryType="sum" 
                    customizeText= {e=> formatToMoney(e.value, currencyId)} />                          
            </Summary>
            <Editing
                mode="cell"
                allowDeleting={true}
                allowUpdating={true}
                selectTextOnEditStart={true}
                useIcons={true}
            ></Editing>
        </DataGrid>
    );
}

export default GridMedicamentos;
