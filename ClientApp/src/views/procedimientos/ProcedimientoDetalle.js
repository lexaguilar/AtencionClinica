import React, { useState } from 'react';
import { DataGrid } from 'devextreme-react';
import { 
    Paging, 
    Pager, 
    FilterRow, 
    HeaderFilter, 
    Column, 
   } from 'devextreme-react/data-grid';

import uri from '../../utils/uri';
import { store } from '../../services/store';
import Title from '../../components/shared/Title';
import BlockHeader from '../../components/shared/BlockHeader';
import Detalle from './Detalle';
import useAuthorization from '../../hooks/useAuthorization';
import { dataAccess, resources } from '../../data/app';

const ProcedimientoDetalle = () => {    

    const { authorized } = useAuthorization([resources.administracion, dataAccess.access ]);

    const [serviceId, setServiceId] = useState(0);

    let dataGrid = React.createRef();

    const onSelectionChanged = (e) => {
        if(e.selectedRowsData){
            let data = e.selectedRowsData[0];
            setServiceId(data.id);
        }
    }

    const title = 'Detalle de procedimientos';

    return authorized(
        <div className="container">
            <Title title={title}/>
            <BlockHeader title={title}/>
            <div className="row-elemet">   
                <div className="mr-10">            
                    <DataGrid
                        ref={(ref) => dataGrid = ref }
                        selection={{ mode: 'single' }}
                        dataSource={store({uri : uri.services, remoteOperations : true })}
                        showBorders={true}
                        showRowLines={true}
                        allowColumnResizing={true}
                        allowColumnReordering={true}
                        onSelectionChanged={onSelectionChanged}
                        remoteOperations={{
                            paging: true,
                            filtering: true
                        }}    
                    >
                        <Paging defaultPageSize={10} />
                        <Pager
                            showPageSizeSelector={true}
                            allowedPageSizes={[10, 20, 50]}
                        />
                        <FilterRow visible={true} />
                        <HeaderFilter visible={true} />
                        <Column dataField="id" width={100}/>
                        <Column dataField="name" caption='Procedimiento' />
                    </DataGrid> 
                </div>    
                <Detalle serviceId={serviceId} />
            </div>
        </div>
    );
}

export default ProcedimientoDetalle;
