import React, { useRef } from 'react';
import BlockHeader from '../../components/shared/BlockHeader';
import Title from '../../components/shared/Title';
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
import {  createStoreLocal } from '../../utils/proxy';
import uri from '../../utils/uri';
import { store } from '../../services/store';
import { inPutProductStates } from '../../data/catalogos';
import { dataAccess, formatDate, formatDateTime } from '../../data/app';
import CustomButton from '../../components/buttons/CustomButton';
import { useDispatch } from 'react-redux'
import { dialogPurchase } from '../../store/inPutProductPurchase/purchaseDialogReducer';
import useAuthorization from '../../hooks/useAuthorization';
import { dataFormatId } from '../../utils/common';
import { addMenu } from '../../components/grids/Menu';
import { onToolbar } from '../../components/grids/ToolBar';
import urlReport from '../../services/reportServices';
import { resources } from '../../data/app';
import NewPurchase from './NewPurchase';

const Purchases = (    
    { 
        title= "Entrada de entrada inventario", 
        btnAddText= "Crear entrada",
        typeId= null,
        icon="",
        Component= NewPurchase,
        resourcesId = resources.compras,
        printName = null,
        dialog = dialogPurchase
    }) => {

    const { authorized } = useAuthorization([resourcesId, dataAccess.access ]);

    let dataGrid = useRef();
    const dispatch = useDispatch();

    const reload = () => dataGrid.current.instance.refresh();    

    const onRowPrepared = (e) => {
        if (e.rowType == 'data') {
            
            if (e.data.stateId == inPutProductStates.noActivo) 
                e.rowElement.classList.add('no-activo');
            
        }
    }

    const showDialog = id => dispatch(dialog({ open: true, id }));  
    
    const report = urlReport();

    const addMenuItems = (e) => {
        addMenu(e, [{
            text: `Ver ${title}`,
            icon: 'find',
            onItemClick: () => showDialog(e.row.data.id)
        },{
            text: `Imprimir ${title}`,
            icon: 'print',
            onItemClick: () => {

                if(printName)
                    report.print(`${report[printName](e.row.data.id)}`) ;
            }
        }])
    }

    const onToolbarPreparing = onToolbar({ export : true } , dataGrid);

    return authorized(
        <div className="container">
            <Title title={title}/>
            <BlockHeader title={title} icon={icon} >
                <CustomButton                 
                    text={btnAddText}
                    icon='plus'
                    onClick={() => showDialog(0)}
                />
            </BlockHeader>
            <Component onSave={reload} typeId={typeId}/> 
            
            <DataGrid id="gridContainer"
                ref={dataGrid}
                selection={{ mode: 'single' }}
                dataSource={store({ uri : uri.purchases, remoteOperations : true, extraParameter: typeId ? { key : 'typeId', value : typeId } : null })}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
                hoverStateEnabled={true}
                onRowPrepared={onRowPrepared}
                onContextMenuPreparing={addMenuItems}
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
                <Column dataField="id" caption='Numero' width={100} cellRender={dataFormatId}/>
                <Column dataField="date" caption='Fecha' dataType='date' format={formatDate} width={90} />
                <Column dataField="areaId" caption="Area" width={170}>
                    <Lookup disabled={true} dataSource={createStoreLocal({ name: 'area'})} valueExpr="id" displayExpr="name" />
                </Column> 
                <Column dataField="reference" caption='Referencia' width={100}/>
                <Column dataField="observation" caption='Observacion'/>

                <Column dataField="purchaseTypeId" caption="Tipo Compra" width={90}>
                    <Lookup disabled={true} dataSource={createStoreLocal({name: 'purchaseTypes'})} valueExpr="id" displayExpr="name" />
                </Column> 

                <Column dataField="statusId" caption="Estado" width={90}>
                    <Lookup disabled={true} dataSource={createStoreLocal({name: 'purchaseStatuses'})} valueExpr="id" displayExpr="name" />
                </Column> 
                
                <Column dataField="createAt" caption='Creando el' dataType='date' format={formatDateTime} width={180}/>
                <Column dataField="createBy" caption='Creado Por'  width={120}/>
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

export default Purchases;
