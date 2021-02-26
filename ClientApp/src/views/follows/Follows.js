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
import { dataAccess, formatDate, formatDateTime, resources } from '../../data/app';
import { useDispatch, useSelector } from 'react-redux';
import { dialogWorkOrders } from '../../store/workOrders/workOrdersDialogReducer';
import { dialogTransfer } from '../../store/transfer/transferDialogReducer';
import PopupWorkOrder from '../../components/workOrder/PopupWorkOrder';
import useAuthorization from '../../hooks/useAuthorization';
import Transfer from '../../components/workOrder/Transfer';

const Follows = () => {

    const { isAuthorization, Unauthorized } = useAuthorization([resources.servicios, dataAccess.access ]);
    
    const {  areaId } = useSelector(store => store.user); 
    const dispatch = useDispatch();

    const addMenuItems =(e) => {

        if (e.target == "content") {
            if (!e.items) e.items = [];
            
            if(e.row?.data)
                e.items.push({
                    text: 'Nueva orden de trabajo',
                    icon : 'folder',
                    onItemClick: () => {
                                               
                        let { id, beneficiaryId } = e.row.data;
                        dispatch(dialogWorkOrders({open : true, id, beneficiaryId : beneficiaryId}));

                    }
                },{
                    text: 'Nueva transferencia',
                    icon : 'chevrondoubleright',
                    onItemClick: () => {

                        let { admissionId } = e.row.data;
                        dispatch(dialogTransfer({open : true, id : admissionId}));

                    }              
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

    return !isAuthorization 
    ?  <Unauthorized />  
    : (
        <div className="container">
            <Title title={title} />
            <BlockHeader title={title} />   

            <PopupWorkOrder />  
            <Transfer />  
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
                remoteOperations={{
                    paging: true,
                    filtering: true
                }}     
            >
                <Paging defaultPageSize={20} />
                <Pager
                    showInfo={true}
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
                <Column dataField="createAt" caption='Creado el' dataType='date' format={formatDateTime} width={150} />
            </DataGrid>
        </div>
    );
}

export default Follows;
