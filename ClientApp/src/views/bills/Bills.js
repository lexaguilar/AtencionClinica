import React from 'react';
import { DataGrid } from 'devextreme-react';
import { 
    Paging, 
    Pager, 
    FilterRow, 
    HeaderFilter, 
    ColumnChooser, 
    Column, 
    Lookup,
    Export, Editing} from 'devextreme-react/data-grid';
import { createStoreLocal } from '../../utils/proxy';
import Title from '../../components/shared/Title';
import BlockHeader from '../../components/shared/BlockHeader';
import uri from '../../utils/uri';
import { store } from '../../services/store';

import CustomButton from '../../components/buttons/CustomButton';
import { _path } from "../../data/headerNavigation";
import { dataAccess, formatDateTime, resources } from '../../data/app';
import { cellRender } from '../../utils/common';
import urlReport from '../../services/reportServices';
import useAuthorization from '../../hooks/useAuthorization';
import { billTypes } from '../../data/bill';

const Bills = props => {

    const { authorized } = useAuthorization([resources.caja, dataAccess.access ]);

    let dataGrid = React.createRef();

    const report = urlReport();

    const addMenuItems =(e) => {
        
        if (e.target == "content") {
            
            // e.items can be undefined
            if (!e.items) e.items = [];
 
            // Add a custom menu item
            if(e.rowIndex >= 0)
                e.items.push({                  

                    text: 'Re-imprimir factura',
                    icon : 'print',
                    onItemClick: () => {
                        
                        report.print(`${report.billTicket(e.row.data.id)}`)  

                    } 
                    
                },{

                    text: 'Estado de cuenta',
                    icon : 'print',
                    onItemClick: () => {

                        if(e.row.data.billTypeId == billTypes.ingreso )
                            report.print(`${report.billbyClient(e.row.data.id)}`);

                    }
                    
                },{

                    text: 'Anular factura',
                    icon : 'remove',
                    onItemClick: () => dataGrid.instance.deleteRow(e.rowIndex),
                    color : 'red'
                });
        }
    }

    const onRowPrepared = (e) => {
        if (e.rowType == 'data') {
            if (!e.data.active) 
                e.rowElement.classList.add('no-activo');
            
        }
    }

    const title = 'Facturas';
    const active = true;
    return authorized(
        <div className="container">
            <Title title={title}/>
            <BlockHeader title={title}>
                <CustomButton
                    text="Nueva factura"
                    icon='plus'
                    onClick = {() => props.history.push({ pathname : `${_path.CLINICA}/facturas/nuevo`})}
                />
            </BlockHeader>
            <DataGrid id="gridContainer"
                ref={(ref) => dataGrid = ref}
                selection={{ mode: 'single' }}
                dataSource={store({uri : uri.bill, remoteOperations: true})}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
                hoverStateEnabled={true}
                onContextMenuPreparing={addMenuItems}
                onRowPrepared={onRowPrepared}
                
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
                <ColumnChooser enabled={true} />
                <Export enabled={true} fileName={title} allowExportSelectedData={true} />
                <Column dataField="id"  width={100} />          
                <Column dataField="nombre" />
                <Column dataField="areaId" width={170} caption="Area">
                    <Lookup disabled={true} dataSource={createStoreLocal({name : 'area'})} valueExpr="id" displayExpr="name" />
                </Column> 
                <Column dataField="billTypeId" width={170} caption="Tipo Ingreso">
                    <Lookup disabled={true} dataSource={createStoreLocal({name : 'billType'})} valueExpr="id" displayExpr="name" />
                </Column> 
                <Column dataField="currencyId" caption="Moneda" width={100}>
                    <Lookup disabled={true} dataSource={createStoreLocal({name: 'currency'})} valueExpr="id" displayExpr="name" />
                </Column>
                <Column dataField="total" width={100} cellRender={cellRender()} />
                <Column dataField="createBy" caption='Creado por' width={100} />
                <Column dataField="createAt" caption='Creado el' dataType='date'  format={formatDateTime} width={180} />
                <Editing
                    mode="popup"                 
                    allowDeleting={true}
                    useIcons={true}
                ></Editing>
            </DataGrid>
        </div>
    );
}

export default Bills;
