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
import ProcedimientosXarea from './ProcedimientosXarea';
import useAuthorization from '../../hooks/useAuthorization';
import { dataAccess, resources } from '../../data/app';

const AreaProcedimientos = () => {

    const { isAuthorization, Unauthorized } = useAuthorization([resources.administracion, dataAccess.access ]);

    const [areaId, setAreaId] = useState(0);

    const title = 'Procedimientos';

    let dataGrid = React.createRef();

    const onSelectionChanged = (e) => {
        if(e.selectedRowsData){
            let data = e.selectedRowsData[0];
            setAreaId(data.id);
        }
    }

    return !isAuthorization 
    ?  <Unauthorized />  
    : (
        <div className="container">
        <Title title={title}/>
        <BlockHeader title={title}/>
        <div className="row-elemet">   
            <div className="mr-10">            
                <DataGrid
                    ref={(ref) => dataGrid = ref }
                    selection={{ mode: 'single' }}
                    dataSource={store({uri : uri.areas })}
                    showBorders={true}
                    showRowLines={true}
                    allowColumnResizing={true}
                    allowColumnReordering={true}
                    onSelectionChanged={onSelectionChanged}
                >
                    <Paging defaultPageSize={20} />
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
            <ProcedimientosXarea areaId={areaId} />
        </div>
    </div>
    );
}

export default AreaProcedimientos;
