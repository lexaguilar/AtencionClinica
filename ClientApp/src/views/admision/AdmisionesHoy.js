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
import { _path } from "../../data/headerNavigation";
import { formatDateTime, resources, dataAccess } from '../../data/app';
import urlReport from '../../services/reportServices';
import useAuthorization from '../../hooks/useAuthorization';
import { useDispatch } from 'react-redux';
import NuevoOutWithFollow from '../workOrders/NuevoOutWithFollow';
import { dialogWorkOrderOutFollow } from '../../store/workOrderOutFollow/workOrderOutFollowDialogReducer';
import { exportToExcel } from '../../utils/gridsHelper';

const AdmisionesHoy = props => {

    let dataGrid = useRef();

    const dispatch = useDispatch();

    const { authorized } = useAuthorization([resources.servicios, dataAccess.access ]);  

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
                text: 'Nueva orden',
                icon:'folder',
                type:'default',
                stylingMode:"outlined",
                onClick: () =>  {

                    let data = dataGrid.current.instance.getSelectedRowsData();
                    if(data?.length)
                    {
                        let { id, beneficiaryId } = data[0];      
                        dispatch(dialogWorkOrderOutFollow({ open: true, id, beneficiaryId: beneficiaryId }));
                    }

                }
            }
        },{
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

    const extraParameter = {
        key :'onlyNow',
        value :'',
    }

    const title = 'Admisiones de hoy';

    return authorized(
        <div className="container">
            <Title title={title}/>
            <BlockHeader title={title}>               
            </BlockHeader>
            <NuevoOutWithFollow ></NuevoOutWithFollow>
            <DataGrid id="gridContainer"
                ref={dataGrid}
                selection={{ mode: 'single' }}
                dataSource={store({uri : uri.admisions, remoteOperations: true, extraParameter})}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
                hoverStateEnabled={true}
                onRowPrepared={onRowPrepared}
                onCellPrepared={onCellPrepared}
                onToolbarPreparing={onToolbarPreparing}
                focusedRowChanging={e => console.log(e)}
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


export default AdmisionesHoy;


