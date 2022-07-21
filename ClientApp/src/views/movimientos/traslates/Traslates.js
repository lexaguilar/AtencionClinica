import React, { useRef } from 'react';
import BlockHeader from '../../../components/shared/BlockHeader';
import Title from '../../../components/shared/Title';
import DataGrid, {
    Column,
    ColumnChooser,
    Editing,
    Export,
    FilterRow,
    HeaderFilter,
    Lookup,
    Pager,
    Paging,
    Button 
  } from 'devextreme-react/data-grid';
import {  createStoreLocal } from '../../../utils/proxy';
import uri from '../../../utils/uri';
import { store } from '../../../services/store';
import { dataAccess, formatDate, formatDateTime, resources } from '../../../data/app';
import Nuevo from './Nuevo';
import CustomButton from '../../../components/buttons/CustomButton';
import { useDispatch, useSelector } from 'react-redux'
import { openDialog } from '../../../store/customDialog/customDialogReducer';
import { inPutProductStates, stagesTraslate, typeTraslate } from '../../../data/catalogos';
import useAuthorization from '../../../hooks/useAuthorization';
import { dataFormatId, formatId } from '../../../utils/common';
import { onToolbar } from '../../../components/grids/ToolBar';
import { dialogTraslate } from '../../../store/traslate/traslateDialogReducer';
import urlReport from '../../../services/reportServices';
import { addMenu } from '../../../components/grids/Menu';
import { exportToExcel } from '../../../utils/gridsHelper';

const Traslates = (props) => {

    const { authorized } = useAuthorization([resources.requisas, dataAccess.access ]);    

    const {  areaId } = useSelector(store => store.user); 

    const { type } = props;

    let dataGrid = useRef();
    const dispatch = useDispatch();

    const reload = (params) => dataGrid.current.instance.refresh();    

    const title = type==typeTraslate.create ? "Traslado de inventario" : "Despacho de inventario";

    let extraParameter = { key : type == typeTraslate.create ? 'areaTargetId':'areaSourceId', value : areaId };

    const onRowPrepared = (e) => {

        if (e.rowType == 'data') {
            
            if (e.data.stateId == inPutProductStates.noActivo) 
                e.rowElement.classList.add('no-activo');
            
        }
    }

    const onCellPrepared = e => {
        
        if (e.rowType == 'data') {
            if(e.column.dataField == 'id')
                e.cellElement.classList.add('trastateId');

                if(e.column.dataField == 'stageId'){
                    if(e.data.stageId === stagesTraslate.pendiente)
                        e.cellElement.classList.add('trastateStege1');
                    if(e.data.stageId === stagesTraslate.anulado)
                        e.cellElement.classList.add('trastateStege2');
                    if(e.data.stageId === stagesTraslate.procesado)
                        e.cellElement.classList.add('trastateStege3');
                    if(e.data.stageId === stagesTraslate.autorizado)
                        e.cellElement.classList.add('trastateStege4');
                }

        }       

    }

    const showDialog = (id, editing= false) => dispatch(dialogTraslate({ open: true, id, editing }))

    const isEditVisible = e => type == typeTraslate.create && e.row.data.stageId == stagesTraslate.pendiente;
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

    const report = urlReport();

    const addMenuItems = (e) => {
        addMenu(e, [{
            text: `Ver requisa`,
            icon: 'find',
            onItemClick: () => showDialog(e.row.data.id, false)
        },{
            text: `Imprimir requisa ${e.row.data.id}`,
            icon: 'print',
            onItemClick: () => {

                if(type==typeTraslate.create)
                    report.print(`${report.requisaSolicitud(e.row.data.id)}`);
                else
                    report.print(`${report.requisaDespacho(e.row.data.id)}`);

            } 
            
        }])
    }

    return authorized(
        <div className="container">
            <Title title={title}/>
            <BlockHeader title={title} >
                {type==typeTraslate.create && <CustomButton                                       
                    text='Nueva requisa'
                    icon='plus'
                    onClick={()=>showDialog( 0 ) }
                />}
            </BlockHeader>
            <Nuevo onSave={reload} stageId={1} type={type}/> 
            
            <DataGrid id="gridContainer"
                ref={dataGrid}
                selection={{ mode: 'single' }}
                dataSource={store({ uri : uri.traslates, remoteOperations : true, extraParameter})}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
                hoverStateEnabled={true}
                onRowPrepared={onRowPrepared}
                onCellPrepared={onCellPrepared}
                onToolbarPreparing={onToolbarPreparing}
                onContextMenuPreparing={addMenuItems}
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
                <Column type="buttons">
                    <Button hint="Ver" icon="find"onClick={e => showDialog(e.row.data.id, false)} />                  
                </Column>
                <Column dataField="id" caption='Numero' width={100}  cellRender={dataFormatId}/>
                <Column dataField="date" caption='Fecha' dataType='date' format={formatDate} width={150} />
                <Column dataField="areaSourceId" caption="Bodega" width={200} visible={type==typeTraslate.create}>
                    <Lookup disabled={true} dataSource={createStoreLocal({ name: 'area'})} valueExpr="id" displayExpr="name" />
                </Column>
                <Column dataField="areaTargetId" caption="Area Solicitante" width={200} visible={type==typeTraslate.update}>
                    <Lookup disabled={true} dataSource={createStoreLocal({ name: 'area'})} valueExpr="id" displayExpr="name" />
                </Column>
                <Column dataField="stageId" caption="Proceso" width={100}>
                    <Lookup disabled={true} dataSource={createStoreLocal({name: 'traslateStage'})} valueExpr="id" displayExpr="name" />
                </Column>               
                <Column dataField="stateId" caption="Estado" width={100}>
                    <Lookup disabled={true} dataSource={createStoreLocal({name: 'traslateState'})} valueExpr="id" displayExpr="name" />
                </Column> 
                <Column dataField="createBy" caption='Creado Por'/>
                <Column dataField="createAt" caption='Creando el' dataType='date' format={formatDateTime} width={150}/>
                <Column dataField="authorizedBy" caption='Autorizado Por'/>
                <Column dataField="authorizedAt" caption='Autorizado el' dataType='date' format={formatDateTime} width={150}/>
                <Column type="buttons">
                    <Button hint="Modificar" icon="edit"onClick={e => showDialog(e.row.data.id, true)} visible={isEditVisible} />
                    <Button name="delete" />
                    <Button hint="Despachar" name="edit" icon="bulletlist" onClick={e => showDialog(e.row.data.id)}/>
                </Column>
                <Editing
                    mode="popup"
                    allowUpdating={type == typeTraslate.update}
                    allowDeleting={true}
                    useIcons={true}
                >
                </Editing>
            </DataGrid>
        </div>
    );
}

export default Traslates;
