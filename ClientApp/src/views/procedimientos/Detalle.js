import React from 'react';
import { DataGrid } from 'devextreme-react';
import { Column, Editing, RequiredRule} from 'devextreme-react/data-grid';

import uri from '../../utils/uri';
import { store } from '../../services/store';

const Detalle = ({serviceId}) => {

    const onInitNewRow = (e) => {  
        e.data.serviceId = serviceId;  
    } 

    let dataGrid = React.createRef();

    const onToolbarPreparing = (e) => {
        serviceId && e.toolbarOptions.items.unshift({
            location: 'before',
            widget: 'dxButton',
            options: {
                text: 'Agregar detalle',
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
            dataSource={store({uri : uri.servicesDetails(serviceId) })}
            showBorders={true}
            showRowLines={true}
            allowColumnResizing={true}
            allowColumnReordering={true}
            onInitNewRow={onInitNewRow}
            onToolbarPreparing={onToolbarPreparing}
        >                    
            <Column dataField="serviceId" visible={false}/>
            <Column dataField="name" width={180} caption="Nombre" >
                <RequiredRule message="El campo es requerido"/>
            </Column>             
            <Column dataField="um" width={180} caption="UM" >
                <RequiredRule message="El campo es requerido"/>
            </Column>              
            <Column dataField="reference" width={180} caption="Referencia" >
                <RequiredRule message="El campo es requerido"/>
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

export default Detalle;
