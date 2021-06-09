import React from 'react';
import DataGrid, { Column } from 'devextreme-react/data-grid';
import { store } from '../../services/store';
import BlockHeader from '../../components/shared/BlockHeader';
import { createProxy } from '../../utils/proxy';
import { formatDate } from '../../data/app';

const GridListaMedicamentoPte = ({beneficiaryId}) => {

    const title = 'Ultimos medicamentos despacho al paciente'

    return (
        <div className="mr-10">
            <BlockHeader title={title}/>
            <DataGrid id="gridContainer"
                selection={{ mode: 'single' }}
                dataSource={beneficiaryId == 0 ? [] : store({uri : createProxy(`beneficiaries/${beneficiaryId}/products`) })}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
            >          
                <Column dataField="date" caption="Fecha" width={170} dataType='date'  format={formatDate}/> 
                <Column dataField="product" caption="Medicamento"/> 
                <Column dataField="quantity" caption='Cantidad'  width={100} />        
                <Column dataField="doctor" caption="Medico" width={130}/> 
                <Column dataField="createBy" caption="Creado por" width={130}/> 
            </DataGrid>
        </div>
    );
}

export default GridListaMedicamentoPte;
