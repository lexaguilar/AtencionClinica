import React from 'react';
import { DataGrid } from 'devextreme-react';
import { FilterRow, HeaderFilter, Column, Editing, Lookup} from 'devextreme-react/data-grid';

import uri from '../../utils/uri';
import { store } from '../../services/store';
import { createStore } from '../../utils/proxy';

const ProcedimientosXarea = ({areaId}) => {

    const onInitNewRow = (e) => {  
        e.data.areaId = areaId;  
    } 

    let dataGrid = React.createRef();

    const onToolbarPreparing = (e) => {
        areaId && e.toolbarOptions.items.unshift({
            location: 'before',
            widget: 'dxButton',
            options: {
                text: 'Nuevo procedimiento',
                icon: 'plus',
                type:'default',
                stylingMode:"outlined",
                onClick: () => dataGrid.instance.addRow()
            }
        });
    }

    return (
     
        <DataGrid
        ref={(ref) => dataGrid = ref}
            selection={{ mode: 'single' }}
            dataSource={store({uri : uri.areaServices(areaId) })}
            showBorders={true}
            showRowLines={true}
            allowColumnResizing={true}
            allowColumnReordering={true}
            onInitNewRow={onInitNewRow}
            onToolbarPreparing={onToolbarPreparing}
        >           
            <FilterRow visible={true} />               
            <Column dataField="areaId" visible={false}/>
            <Column dataField="serviceId" width={180} caption="Procedimiento">              
                <Lookup disabled={true} dataSource={createStore({name:'service'})} valueExpr="id" displayExpr="name" />
            </Column>             
            <Editing
                mode="cell"
                allowUpdating={true}
                allowDeleting={true}               
                useIcons={true}
            >              
            </Editing>
        </DataGrid>
    );
}

export default ProcedimientosXarea;
