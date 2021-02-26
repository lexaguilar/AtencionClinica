import React from 'react';
import { DataGrid } from 'devextreme-react';
import { Column, Export} from 'devextreme-react/data-grid';
import BlockHeader from '../shared/BlockHeader';
import { store } from '../../services/store';

import { _path } from "../../data/headerNavigation";
import { createProxy } from '../../utils/proxy';
import { formatDate, formatDateTime } from '../../data/app';

const Citas = props => {
    
    const { beneficiaryId } = props;    

    const title = 'Ultimas citas'

    return (
        <div className="mr-10">
        <BlockHeader title={title}/>
        <DataGrid id="gridContainer"
            selection={{ mode: 'single' }}
            dataSource={beneficiaryId == 0 ? [] : store({uri : createProxy(`appointments/get/${beneficiaryId}/last/${10}`) })}
            showBorders={true}
            showRowLines={true}
            allowColumnResizing={true}
            allowColumnReordering={true}
        >          
            <Export enabled={true} fileName={title} allowExportSelectedData={true} />
            <Column dataField="doctor" width={170} /> 
            <Column dataField="specialty" caption="Especialidad"/> 
            <Column dataField="dateAppointment" caption='Cita' dataType='date'  format={formatDateTime} width={160} />        
            <Column dataField="createAt" caption='Creado el' dataType='date'  format={formatDate} width={100} />        
            <Column dataField="createBy" width={130} caption="Creado por" visible={false}/> 
        </DataGrid>
    </div>
    );
}

export default React.memo(Citas);
