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
import { dataAccess, formatDateTime, resources } from '../../data/app';
import urlReport from '../../services/reportServices';
import useAuthorization from '../../hooks/useAuthorization';

const Appointments = props => {

    const { authorized } = useAuthorization([ resources.citas, dataAccess.access ]);

    let dataGrid = React.createRef();

    const addMenuItems =(e) => {
        
        if (e.target == "content") {
            
            // e.items can be undefined
            if (!e.items) e.items = [];
 
            // Add a custom menu item
            if(e.rowIndex >= 0)
                e.items.push({

                    text: 'Re-imprimir cita',
                    icon : 'print',
                    onItemClick: () => {
                        const report = urlReport();
                        report.print(`${report.appointment(e.row.data.id)}`);
                    }
                    
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
                type:'success',
                stylingMode:"outlined",
                onClick: () =>  dataGrid.instance.exportToExcel(false)
            }
        });
    }  

    const title = 'Citas'
    return authorized(
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
                hoverStateEnabled={true}
                onContextMenuPreparing={addMenuItems}
                onRowPrepared={onRowPrepared}
                onCellPrepared={onCellPrepared}
                onToolbarPreparing={onToolbarPreparing}
                //onExporting={(e) => onExporting(e, title)}
                remoteOperations={{
                    paging: true,
                    filtering: true
                }}
            >
                <Paging defaultPageSize={5} />
                <Pager
                    showInfo={true}
                    showPageSizeSelector={true}
                    allowedPageSizes={[5, 10, 20, 50, 100, 300, 1000]}
                />
                <FilterRow visible={true} />
                <ColumnChooser enabled={true} />
                <Export enabled={false} fileName={title} allowExportSelectedData={true} />
                <Column dataField="id"  width={100} />
                <Column dataField="inss"  width={110} />
                <Column dataField="tipo"  width={110} />
                <Column dataField="identification" caption="Identificacion" width={130}/>
                <Column dataField="nombre" allowFiltering={false}/>
                <Column dataField="doctorId" width={160} caption="Doctor">
                    <Lookup disabled={true} dataSource={createStore({name: 'doctor'})} valueExpr="id" displayExpr="name" />
                </Column> 
                <Column dataField="specialtyId" width={160} caption="Especialidad">
                    <Lookup disabled={true} dataSource={createStore({name: 'specialty'})} valueExpr="id" displayExpr="name" />
                </Column> 
                <Column dataField="dateAppointment" caption='Cita' dataType='date' format={formatDateTime} width={160} />
                <Column dataField="observation" allowFiltering={false} visible={false}/>
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
