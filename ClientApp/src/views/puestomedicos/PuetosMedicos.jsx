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
import BlockHeader from '../../components/shared/BlockHeader';
import Title from '../../components/shared/Title';
import { store } from '../../services/store';
import uri from '../../utils/uri';
import { _path } from '../../data/headerNavigation';
import { createStoreLocal } from '../../utils/proxy';
import CustomButton from '../../components/buttons/CustomButton';
import { dataAccess, formatDateTime, resources } from '../../data/app';
import useAuthorization from '../../hooks/useAuthorization';
import { exportToExcel } from '../../utils/gridsHelper';

const PuetosMedicos = props => {

    const { authorized } = useAuthorization([resources.puestoMedicos, dataAccess.create ]);

    let dataGrid = useRef();

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

    const title = 'Puesto Medicos';

    const onToolbarPreparing = (e) => {  
        e.toolbarOptions.items.unshift({
            location: 'before',
            widget: 'dxButton',
            options: {
                text: 'Exportar a excel',
                icon:'xlsxfile',
                type:'success',
                stylingMode:"outlined",
                onClick: () =>  exportToExcel(dataGrid)
            }
        });
    }  

    return authorized(
        <div className="container">
            <Title title={title}/>
            <BlockHeader title={title}>
                <CustomButton
                    text="Nueva admision"
                    icon='plus'
                    onClick = {() => props.history.push({ pathname : `${_path.CLINICA}/puestos-medicos/nuevo`})}
                />
            </BlockHeader>
            <DataGrid id="gridContainer"
                ref={dataGrid}
                selection={{ mode: 'single' }}
                dataSource={store({uri : uri.puestomedico, remoteOperations: true})}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
                hoverStateEnabled={true}
                onRowPrepared={onRowPrepared}
                onCellPrepared={onCellPrepared}
                onToolbarPreparing={onToolbarPreparing}
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
                <Column dataField="id"  width={80} allowHeaderFiltering={false} />
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

export default PuetosMedicos;
