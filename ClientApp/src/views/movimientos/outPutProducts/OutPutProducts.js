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

    const typeId = outPutProductTypes.ajuste;

    const title = "Ajustes de salida de inventario";

    return authorized(
        <div className="container">
            <Title title={title}/>   
            <BlockHeader title={title} icon="dx-icon-decreaseindent color-icon-red" >
                <CustomButton                 
                    text='Agregar nueva salida'
                    icon='plus'                    
                    onClick={()=>dispatch(dialogOutputProduct({open : true}))}
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
                <HeaderFilter visible={true} />
                <ColumnChooser enabled={true} />
                <Export enabled={true} fileName={title} allowExportSelectedData={true} />
                <Column dataField="id" caption='Numero' width={100}  cellRender={dataFormatId}/>
                <Column dataField="date" caption='Fecha' dataType='date' format={formatDate} width={150} />
                <Column dataField="areaId" caption="Area" width={200}>
                    <Lookup disabled={true} dataSource={createStoreLocal({ name: 'area'})} valueExpr="id" displayExpr="name" />
                </Column> 
                <Column dataField="typeId" caption="Tipo Entrada" width={160}>
                    <Lookup disabled={true} dataSource={createStoreLocal({name: 'inPutProductType'})} valueExpr="id" displayExpr="name" />
                </Column> 
                <Column dataField="reference" caption='Referencia' />
                <Column dataField="stateId" caption="Estado" width={150}>
                    <Lookup disabled={true} dataSource={createStoreLocal({name: 'inPutProductState'})} valueExpr="id" displayExpr="name" />
                </Column> 
                <Column dataField="createAt" caption='Creando el' dataType='date' format={formatDateTime} width={180}/>
                <Column dataField="createBy" caption='Creado Por'/>
                <Editing
                    mode="popup"
                    allowDeleting={true}
                    useIcons={true}
                >
                </Editing>
            </DataGrid>
        </div>
    );
}

export default OutPutProducts;
