import React, { useEffect, useRef, useState } from 'react';
import SelectBox from 'devextreme-react/select-box';
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
  } from 'devextreme-react/data-grid';
import {  createStoreLocal } from '../../../utils/proxy';
import uri from '../../../utils/uri';
import { store } from '../../../services/store';
import { dataAccess, formatDate, formatDateTime, resources } from '../../../data/app';
import Nuevo from './Nuevo';
import CustomButton from '../../../components/buttons/CustomButton';
import { useDispatch, useSelector } from 'react-redux'
import { dialogInputProduct } from '../../../store/inPutProduct/inPutProductDialogReducer';
import { typeTraslate } from '../../../data/catalogos';
import useAuthorization from '../../../hooks/useAuthorization';

const Traslates = (props) => {

    const { isAuthorization, Unauthorized } = useAuthorization([resources.requisas, dataAccess.access ]);    

    const {  areaId } = useSelector(store => store.user); 

    const { type } = props;

    let dataGrid = useRef();
    const dispatch = useDispatch();

    const reload = (params) => dataGrid.current.instance.refresh();    

    const title = type==typeTraslate.create ? "Traslado de inventario" : "Despacho de inventario";

    let extraParameter = { key : type == typeTraslate.create ? 'areaTargetId':'areaSourceId', value : areaId };

    return !isAuthorization 
    ?  <Unauthorized />  
    : (
        <div className="container">
            <Title title={title}/>
            <BlockHeader title={title} >
                {type==typeTraslate.create && <CustomButton                                       
                    text='Nueva requisa'
                    icon='plus'
                    onClick={()=>dispatch(dialogInputProduct({open : true}))}
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
                <Column dataField="id" caption='Numero' width={100}/>
                <Column dataField="date" caption='Fecha' dataType='date' format={formatDate} width={150} />
                <Column dataField="areaSourceId" caption="Bodega" width={250} visible={type==typeTraslate.create}>
                    <Lookup disabled={true} dataSource={createStoreLocal({ name: 'area'})} valueExpr="id" displayExpr="name" />
                </Column>
                <Column dataField="areaTargetId" caption="Area Solicitante" width={250} visible={type==typeTraslate.update}>
                    <Lookup disabled={true} dataSource={createStoreLocal({ name: 'area'})} valueExpr="id" displayExpr="name" />
                </Column>
                <Column dataField="stageId" caption="Proceso" width={150}>
                    <Lookup disabled={true} dataSource={createStoreLocal({name: 'traslateStage'})} valueExpr="id" displayExpr="name" />
                </Column>               
                <Column dataField="stateId" caption="Estado" width={150}>
                    <Lookup disabled={true} dataSource={createStoreLocal({name: 'traslateState'})} valueExpr="id" displayExpr="name" />
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

export default Traslates;
