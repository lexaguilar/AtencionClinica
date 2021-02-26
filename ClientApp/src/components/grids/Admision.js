import React from 'react';
import { DataGrid } from 'devextreme-react';
import { Column, Export} from 'devextreme-react/data-grid';
import BlockHeader from '../../components/shared/BlockHeader';
import { store } from '../../services/store';

import { _path } from "../../data/headerNavigation";
import { createProxy } from '../../utils/proxy';
import { formatDate } from '../../data/app';

const Admision = props => {
    
    const { beneficiaryId } = props;    

    const title = 'Ultimas admisiones'

    return (
        <div className="mr-10">
        <BlockHeader title={title}/>
        <DataGrid id="gridContainer"
            selection={{ mode: 'single' }}
            dataSource={beneficiaryId == 0 ? [] : store({uri : createProxy(`admisions/get/${beneficiaryId}/last/${10}`) })}
            showBorders={true}
            showRowLines={true}
            allowColumnResizing={true}
            allowColumnReordering={true}
        >          
            <Export enabled={true} fileName={title} allowExportSelectedData={true} />
            <Column dataField="area" width={170} /> 
            <Column dataField="especialidad" caption="Especialidad"/> 
            <Column dataField="createAt" caption='Creado el' dataType='date'  format={formatDate} width={100} />        
            <Column dataField="createBy" width={130} caption="Creado por"/> 
        </DataGrid>
    </div>
    );
}

export default React.memo(Admision);
