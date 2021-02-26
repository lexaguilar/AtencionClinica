import React from 'react';
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
import { useDispatch } from 'react-redux'
import { dialogInputProduct } from '../../../store/inPutProduct/inPutProductDialogReducer';
import useAuthorization from '../../../hooks/useAuthorization';

const InPutProducts = (    
    { 
        title= "Entrada de inventario", 
        btnAddText= "Crear entrada",
        typeId= null,
        Component= Nuevo
    }) => {

    const { isAuthorization, Unauthorized } = useAuthorization([resources.movimientos, dataAccess.access ]);

    let dataGrid = React.createRef();
    const dispatch = useDispatch();

    const reload = (params) => {
        dataGrid.current.instance.refresh();
    }

    return !isAuthorization 
    ?  <Unauthorized />  
    : (
        <div className="container">
            <Title title={title}/>
            <BlockHeader title={title} >
                <CustomButton                 
                    text={btnAddText}
                    icon='plus'
                    onClick={()=>dispatch(dialogInputProduct({open : true}))}
                />
            </BlockHeader>
            <Component onSave={reload} typeId={typeId}/> 
            
            <DataGrid id="gridContainer"
                ref={dataGrid}
                selection={{ mode: 'single' }}
                dataSource={store({ uri : uri.inPutProducts, remoteOperations : true, extraParameter: typeId ? { key : 'typeId', value : typeId } : null })}
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

export default InPutProducts;
