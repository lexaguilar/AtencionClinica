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
import { createStore } from '../../utils/proxy';
import Title from '../../components/shared/Title';
import BlockHeader from '../../components/shared/BlockHeader';
import uri from '../../utils/uri';
import { store } from '../../services/store';

import CustomButton from '../../components/buttons/CustomButton';
import { _path } from "../../data/headerNavigation";
import onExporting from '../../components/grids/Importer';
import { formatDateTime } from '../../data/app';

const Appointments = props => {

    let dataGrid = React.createRef();

    const addMenuItems =(e) => {
        
        if (e.target == "content") {
            
            // e.items can be undefined
            if (!e.items) e.items = [];
 
            // Add a custom menu item
            if(e.rowIndex >= 0)
                e.items.push({

                    text: 'Re-imprimir ticket admision',
                    icon : 'print',
                    onItemClick: () => 0
                    
                },{

                    text: 'Anular cita',
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

    const onCellPrepared = e => {
        
        if (e.rowType == 'data') {

            if(e.column.dataField == "inss")
                e.cellElement.classList.add('text-inss');
            if(e.column.dataField == 'id')
                e.cellElement.classList.add('text-admision');

        }

    }

    const onToolbarPreparing = (e) => {  
        e.toolbarOptions.items.unshift({
            location: 'before',
            widget: 'dxButton',
            options: {
                text: 'Exportar a excel',
                icon:'xlsxfile',
                onClick: () =>  dataGrid.instance.exportToExcel(false)
            }
        });
    }  

    const title = 'Citas'
    return (
        <div className="container">
        <Title title={title}/>
        <BlockHeader title={title}>
            <CustomButton
                text="Nueva cita"
                icon='plus'
                onClick = {() => props.history.push({ pathname : `${_path.CLINICA}/citas/nuevo`})}
            />
        </BlockHeader>
        <DataGrid id="gridContainer"
            ref={(ref) => dataGrid = ref}
            selection={{ mode: 'single' }}
            dataSource={store({uri : uri.appointments, remoteOperations: true})}
            showBorders={true}
            showRowLines={true}
            allowColumnResizing={true}
            allowColumnReordering={true}
            onContextMenuPreparing={addMenuItems}
            onRowPrepared={onRowPrepared}
            onCellPrepared={onCellPrepared}
            onToolbarPreparing={onToolbarPreparing}
            onExporting={(e) => onExporting(e, title)}
            remoteOperations={{
                paging: true,
                filtering: true
            }}
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
            <Column dataField="inss"  width={110} />
            <Column dataField="tipo"  width={110} />
            <Column dataField="nombre" />
            <Column dataField="doctorId" width={160} caption="Doctor">
                <Lookup disabled={true} dataSource={createStore('doctor')} valueExpr="id" displayExpr="name" />
            </Column> 
            <Column dataField="specialtyId" width={160} caption="Especialidad">
                <Lookup disabled={true} dataSource={createStore('specialty')} valueExpr="id" displayExpr="name" />
            </Column> 
            <Column dataField="dateAppointment" caption='Cita' dataType='date' format={formatDateTime} width={160} />
            <Column dataField="createBy" caption='Creado por' width={80} visible={false} />
            <Column dataField="createAt" caption='Creado el' dataType='date' visible={false} format={formatDateTime} width={150} />
            <Editing
                    mode="popup"                 
                    allowDeleting={true}
                    useIcons={true}
            ></Editing>
        </DataGrid>
    </div>
    );
}

export default Appointments;