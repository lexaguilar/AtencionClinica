import React, { useState } from 'react';
import { DataGrid } from 'devextreme-react';
import { 
    Paging, 
    Pager, 
    FilterRow, 
    HeaderFilter, 
    ColumnChooser, 
    Column, 
    Lookup,
    Export, 
    Editing,
    Popup,     
    Form as FromGrid, 
    RequiredRule,
    StringLengthRule} from 'devextreme-react/data-grid';
import { Item } from 'devextreme-react/form';
import { store } from '../../services/store';
import uri from '../../utils/uri';
import BlockHeader from '../../components/shared/BlockHeader';
import Title from '../../components/shared/Title';
import { useSelector } from 'react-redux'
import { formatDate, formatDateTime } from '../../data/app';


const Follows = () => {
    
    const {  areaId } = useSelector(store => store.user); 

    const addMenuItems =(e) => {
        
        if (e.target == "content") {
            if (!e.items) e.items = [];
 
            e.items.push({
                text: 'Nueva orden de trabajo',
                icon : 'folder',
                onItemClick: () => 0                
            },{
                text: 'Nueva transferencia',
                icon : 'chevrondoubleright',
                onItemClick: () => 0                
            },{
                text: 'Ver movimientos',
                icon : 'runner',
                onItemClick: () => 0                
            });
        }
    }

    const onCellPrepared = e => {
        
        if (e.rowType == 'data') {

            if(e.column.dataField == "inss")
                e.cellElement.classList.add('text-inss');
            if(e.column.dataField == 'admissionId')
                e.cellElement.classList.add('text-admision');

        }

    }
    
    const title = 'Servicios';

    return (
        <div className="container">
            <Title title={title} />
            <BlockHeader title={title} />         
            <DataGrid id="gridContainer"
                selection={{ mode: 'single' }}
                dataSource={store({ uri: uri.follows(areaId), remoteOperations: true })}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
                onCellPrepared={onCellPrepared}
                onContextMenuPreparing={addMenuItems}
                noDataText='No se encontró ninguna transferencia'
            >
                <Paging defaultPageSize={20} />
                <Pager
                    showPageSizeSelector={true}
                    allowedPageSizes={[10, 20, 50]}
                />
                <FilterRow visible={true} />
                <HeaderFilter visible={true} />
                <ColumnChooser enabled={true} />
                <Export enabled={true} fileName={title} allowExportSelectedData={true} />
                <Column dataField="id"  width={100} />
                <Column dataField="admissionId"  width={100} caption='Admision' />
                <Column dataField="inss"  width={100} />
                <Column dataField="relationship"  width={100} caption="Tipo" />
                <Column dataField="firstName" caption='Nombres'/>
                <Column dataField="lastName" caption='Apellidos'/>
                <Column dataField="areaSource" caption='Area Origen' />       
                <Column dataField="createBy" caption='Creado por' width={120} />
                <Column dataField="createAt" caption='Creado el' dataType='date' format={formatDate} width={120} />
            </DataGrid>
        </div>
    );
}

export default Follows;
