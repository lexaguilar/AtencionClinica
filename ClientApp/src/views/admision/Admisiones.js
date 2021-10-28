import React, { useRef } from 'react';
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
import { formatDateTime, resources, dataAccess } from '../../data/app';
import urlReport from '../../services/reportServices';
import useAuthorization from '../../hooks/useAuthorization';
import { estadoAdmision, typeAdmision } from '../../data/catalogos';
import http from '../../utils/http';


const Admisiones = props => {

    let dataGrid = useRef();

    const { authorized } = useAuthorization([resources.admision, dataAccess.access ]);    

    const addMenuItems =(e) => {
        
        if (e.target == "content") {
            
            // e.items can be undefined
            if (!e.items) e.items = [];
 
            // Add a custom menu item
            if(e.rowIndex >= 0){

                if(e.row?.data?.typeId ==  typeAdmision.consulta){
                    e.items.push({
                        text: 'Convertir a Hospitalizacion',
                        icon: 'pin',
                        onItemClick: () => {
                            http(`admisions/convertToHosp/${e.row.data.id}`).asGet().then(res => dataGrid.current.instance.refresh())
                        }
                    });
                } 

                e.items.push({
                    
                    text: 'Re-imprimir ticket admision',
                    icon : 'print',
                    onItemClick: () => {
                        const report = urlReport();
                        report.print(`${report.admisionTicket(e.row.data.id)}`);
                    }
                    
                },{
                    
                    text: 'Anular admision',
                    icon : 'remove',
                    onItemClick: () => dataGrid.current.instance.deleteRow(e.rowIndex),
                    color : 'red'
                });
            }
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

    const title = 'Admisiones';

    return authorized(
        <div className="container">
            <Title title={title}/>
            <BlockHeader title={title}>
                <CustomButton
                    text="Nueva admision"
                    icon='plus'
                    onClick = {() => props.history.push({ pathname : `${_path.CLINICA}/admisiones/nuevo`})}
                />
            </BlockHeader>
            <DataGrid id="gridContainer"
                ref={dataGrid}
                selection={{ mode: 'single' }}
                dataSource={store({uri : uri.admisions, remoteOperations: true})}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
                hoverStateEnabled={true}
                onContextMenuPreparing={addMenuItems}
                onRowPrepared={onRowPrepared}
                onCellPrepared={onCellPrepared}
                
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
                <Export enabled={true} fileName={title} allowExportSelectedData={true}  />
                <Column dataField="id"  width={80} allowHeaderFiltering={false} />
                <Column dataField="numberOfDay" width={80} caption='Numero' allowFiltering={false} allowHeaderFiltering={false}/>
                <Column dataField="inss"  width={100}  allowHeaderFiltering={false}/>
                <Column dataField="tipo"  width={110} allowFiltering={false}/>
                <Column dataField="identification" caption="Identificacion" width={130}/>
                <Column dataField="nombre"  allowHeaderFiltering={false}/>
                <Column dataField="typeId" width={120} caption="Tipo Ingreso">
                    <Lookup disabled={true} dataSource={createStoreLocal({name : 'admissionType' })} valueExpr="id" displayExpr="name" />
                </Column> 
                <Column dataField="areaId" width={150} caption="Area">
                    <Lookup disabled={true} dataSource={createStoreLocal({name : 'area' })} valueExpr="id" displayExpr="name" />
                </Column> 
                <Column dataField="specialtyId" width={150} caption="Especialidad">
                    <Lookup disabled={true} dataSource={createStoreLocal({name : 'specialty'})} valueExpr="id" displayExpr="name" />
                </Column> 
                <Column dataField="Finished" caption='Cerrado' width={80} visible={false} />
                <Column dataField="createBy" caption='Creado por' width={80}  allowHeaderFiltering={false} visible={false}/>
                <Column dataField="createAt" caption='Creado el' dataType='date'  format={formatDateTime} width={150}  allowHeaderFiltering={false}/>
                <Column dataField="active" caption='Estado' width={80} visible={false} />
                <Editing
                        mode="popup"                 
                        allowDeleting={true}
                        useIcons={true}
                ></Editing>
            </DataGrid>
        </div>
    );

    
}


export default Admisiones;


