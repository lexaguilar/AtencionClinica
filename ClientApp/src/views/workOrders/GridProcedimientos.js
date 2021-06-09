import React, { useRef, useState, useEffect } from 'react';
import DataGrid, { Column, Editing, Lookup, RequiredRule as RuleRequired, Button as ButtonGrid } from 'devextreme-react/data-grid';
import { cellRender, cellRenderBold, getPriceByCurrency, onCellPrepared } from '../../utils/common';
import gridsHelper from '../../utils/gridsHelper';
import http from '../../utils/http';

const GridProcedimientos = ({detailsServices=[], open, user, rate}) => {

    let ref = useRef();
    const onToolbarPreparing = gridsHelper(ref, { text : 'Agregar procedimiento', icon:'plus' });

    const [services, setServices] = useState([]);

    useEffect(() => {  
        http(`services/area/${user.areaId}/get`).asGet({ active:true }).then(resp => setServices(resp));
    }, [open]);

    const setCellValue = (newData, value, currentRowData) => {

        const service = services.find(x => x.id == value);

        const price = getPriceByCurrency(1, rate)(service);
      
        newData.serviceId = value;
      
        newData.quantity = 1;     
        newData.price = price;
        newData.productId = null;
        newData.cost = 0;
        newData.subTotal = price * newData.quantity;  
        newData.total = newData.subTotal;  
      
    }

    const setCellValueCant = (newData, value, currentRowData) => {

        newData.quantity = value;
        newData.price = currentRowData.price;     
        newData.subTotal = currentRowData.price * newData.quantity;  
        newData.total = newData.subTotal;  

    }

    return (
        <DataGrid id="gridDetailsServices"
            ref={ref}
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
            <Column dataField="serviceId" caption="Procedimiento" setCellValue={setCellValue}>
                <Lookup
                    disabled={true}
                    dataSource={services}
                    valueExpr="id" displayExpr="name"
                />
            </Column>
            <Column dataField="quantity"
                // allowEditing={false} 
                caption="Cantidad"
                dataType="number" width={120}
                //setCellValue={setCellValueCant}
                >
                <RuleRequired />
            </Column>
            <Column dataField="price" allowEditing={false} caption='Precio' width={100} cellRender={cellRender()} />
            <Column dataField="total" allowEditing={false} width={120} cellRender={cellRenderBold()} />
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
    );
}

export default GridProcedimientos;
