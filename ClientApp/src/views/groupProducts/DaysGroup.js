import React, { useRef } from 'react';
import { DataGrid } from 'devextreme-react';
import { FilterRow, Column, Editing, Lookup, RequiredRule} from 'devextreme-react/data-grid';

import uri from '../../utils/uri';
import { store } from '../../services/store';
import { createStore } from '../../utils/proxy';
import ProductDDBComponent from '../../components/dropdown/ProductDDBComponent';
import useProducts from '../../hooks/useProducts';

const DaysGroup = ({ groupId }) => {

    const daysOfWeek = [ 
        { id : 1, name: 'Lunes' } 
        ,{ id : 2, name: 'Martes' } 
        ,{ id : 3, name: 'Miercoles' } 
        ,{ id : 4, name: 'Jueves' } 
        ,{ id : 5, name: 'Viernes' } 
        ,{ id : 6, name: 'Sabado' } 
    ];

    const onInitNewRow = (e) => {  
        e.data.groupId = groupId;  
    } 

    let dataGrid = useRef();

    const onToolbarPreparing = (e) => {
        groupId && e.toolbarOptions.items.unshift({
            location: 'before',
            widget: 'dxButton',
            options: {
                text: 'Agregar dia',
                icon: 'plus',
                type:'default',
                stylingMode:"outlined",
                onClick: () => dataGrid.current.instance.addRow()
            }
        });
    }

    return (
     
        <DataGrid
            ref={dataGrid}
            selection={{ mode: 'single' }}
            dataSource={store({uri : uri.groupProductDays(groupId) })}
            showBorders={true}
            showRowLines={true}
            allowColumnResizing={true}
            allowColumnReordering={true}
            onInitNewRow={onInitNewRow}
            onToolbarPreparing={onToolbarPreparing}
        >                         
            <Column dataField="groupId" visible={false}/>         
            <Column dataField="dayOfWeek" caption="Dia de semana">
                <Lookup
                    dataSource={daysOfWeek}
                    valueExpr="id"
                    displayExpr="name"

                />
                <RequiredRule  />
            </Column>          
            <Editing
                mode="batch"
                allowUpdating={true}
                allowDeleting={true}               
                useIcons={true}
            >              
            </Editing>
        </DataGrid>
    );
}

export default DaysGroup;
