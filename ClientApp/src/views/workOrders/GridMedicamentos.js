import React, { useEffect, useRef } from 'react';
import DataGrid, { Column, Editing, Lookup, RequiredRule as RuleRequired, Button as ButtonGrid, TotalItem, Summary } from 'devextreme-react/data-grid';
import gridsHelper from '../../utils/gridsHelper';
import { cellRender, formatToMoney, onCellPrepared } from '../../utils/common';
import ProductDDBComponent from '../../components/dropdown/ProductDDBComponent';
import useProducts from '../../hooks/useProducts';


const GridMedicamentos = ({isClosing, details, user, showPrice= false, currencyId = 1, rate= 1, refresh = false}) => {

    const exists = true;    
    const active = true;   
    let ref = useRef();    

    const { products, reload } = useProducts({areaId: user.areaId, exists, active});
    const onToolbarPreparing = gridsHelper(ref, { text : 'Agregar productos', icon:'plus' });   

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
            height={200}
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
