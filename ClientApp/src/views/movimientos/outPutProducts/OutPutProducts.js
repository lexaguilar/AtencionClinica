import React, { useRef } from 'react';
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
    Button as ButtonGrid,
  } from 'devextreme-react/data-grid';
import BlockHeader from '../../../components/shared/BlockHeader';
import Title from '../../../components/shared/Title';
import { dataAccess, formatDate, formatDateTime, resources } from '../../../data/app';
import useAuthorization from '../../../hooks/useAuthorization';
import { useDispatch } from 'react-redux';
import uri from '../../../utils/uri';
import { createStoreLocal } from '../../../utils/proxy';
import Nuevo from './Nuevo';
import CustomButton from '../../../components/buttons/CustomButton';
import { store } from '../../../services/store';
import { dialogOutputProduct } from '../../../store/outPutProduct/outPutProductDialogReducer';
import { inPutProductStates, outPutProductStates, outPutProductTypes } from '../../../data/catalogos';
import { dataFormatId, formatId } from '../../../utils/common';
import { onToolbar } from '../../../components/grids/ToolBar';

const OutPutProducts = () => {

    const { authorized } = useAuthorization([resources.movimientos, dataAccess.access ]);

    let refGrid = useRef();
    const dispatch = useDispatch();

    const reload = () => refGrid.current.instance.refresh();
    
    const onRowPrepared = (e) => {
        if (e.rowType == 'data') {

            if (e.data.stateId == outPutProductStates.noActivo) 
                e.rowElement.classList.add('no-activo');
            
        }
    }

    const showDialog = id =>  dispatch(dialogOutputProduct({ open: true, id }))

    const onToolbarPreparing = onToolbar({ export : true } , refGrid);

    const typeId = outPutProductTypes.ajuste;

    const title = "Ajustes de salida de inventario";

    return authorized(
        <div className="container">
            <Title title={title}/>   
            <BlockHeader title={title} icon="dx-icon-decreaseindent color-icon-red" >
                <CustomButton                 
                    text='Agregar nueva salida'
                    icon='plus'                    
                    onClick={()=>showDialog(0)}
                />
            </BlockHeader>
            <Nuevo onSave={reload} typeId={outPutProductTypes.ajuste}/> 
            
            <DataGrid id="gridContainer"
                ref={refGrid}
                selection={{ mode: 'single' }}
                dataSource={store({ uri : uri.outPutProducts, remoteOperations : true, extraParameter: typeId ? { key : 'typeId', value : typeId } : null })}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
                hoverStateEnabled={true}
                onRowPrepared={onRowPrepared}
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
                <Export enabled={true} fileName={title} allowExportSelectedData={true} />
                <Column dataField="id" caption='Numero' width={100}  cellRender={dataFormatId}/>
                <Column dataField="date" caption='Fecha' dataType='date' format={formatDate} width={150} />
                <Column dataField="areaId" caption="Area" width={200}>
                    <Lookup disabled={true} dataSource={createStoreLocal({ name: 'area'})} valueExpr="id" displayExpr="name" />
                </Column> 
                <Column dataField="typeId" caption="Tipo Salida" width={160}>
                    <Lookup disabled={true} dataSource={createStoreLocal({name: 'outPutProductType'})} valueExpr="id" displayExpr="name" />
                </Column> 
                <Column dataField="reference" caption='Referencia' />
                <Column dataField="stateId" caption="Estado" width={150}>
                    <Lookup disabled={true} dataSource={createStoreLocal({name: 'outPutProductState'})} valueExpr="id" displayExpr="name" />
                </Column> 
                <Column dataField="createAt" caption='Creando el' dataType='date' format={formatDateTime} width={180}/>
                <Column dataField="createBy" caption='Creado Por'/>
                <Column type="buttons" width={60}>
                    <ButtonGrid name="edit" icon="find" onClick={e => showDialog(e.row.data.id)}/>
                    <ButtonGrid name="delete" />
                </Column>
                <Editing
                     mode="popup"
                     allowDeleting={true}
                     allowUpdating={true}
                     useIcons={true}
                >
                </Editing>
            </DataGrid>
        </div>
    );
}

export default OutPutProducts;
