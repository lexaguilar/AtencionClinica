import React from 'react';
import { DataGrid } from 'devextreme-react';
import { Item } from 'devextreme-react/form';
import { 
    Paging, 
    Pager, 
    FilterRow, 
    HeaderFilter, 
    ColumnChooser, 
    Column, 
    Export, 
    Editing,
    Popup,     
    Form, 
    RequiredRule,
    StringLengthRule, Lookup} from 'devextreme-react/data-grid';

import uri from '../../utils/uri';
import { store } from '../../services/store';

import { createStore } from '../../utils/proxy';

const ProcedimientosXarea = ({areaId}) => {

    const title = 'Procedimientos';

    const onInitNewRow = (e) => {  
        e.data.areaId = areaId;  
    } 

    return (
     
        <DataGrid
            selection={{ mode: 'single' }}
            dataSource={store({uri : uri.areaServices(areaId) })}
            showBorders={true}
            showRowLines={true}
            allowColumnResizing={true}
            allowColumnReordering={true}
            onInitNewRow={onInitNewRow}
        >           
            <FilterRow visible={true} />
            <HeaderFilter visible={true} />         
            <Column dataField="areaId" visible={false}/>
            <Column dataField="serviceId" width={180} caption="Procedimiento">              
                <Lookup disabled={true} dataSource={createStore({name:'service'})} valueExpr="id" displayExpr="name" />
            </Column>             
            <Editing
                mode="cell"
                allowUpdating={true}
                allowDeleting={true}
                allowAdding={true}
                useIcons={true}
            >              
            </Editing>
        </DataGrid>
    );
}

export default ProcedimientosXarea;
