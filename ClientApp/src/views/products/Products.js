import React from 'react';
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
    Button as ButtonGrid 
  } from 'devextreme-react/data-grid';
import { createStore } from '../../utils/proxy';
import uri from '../../utils/uri';
import { store } from '../../services/store';
import CustomButton from '../../components/buttons/CustomButton';
import { useDispatch } from 'react-redux'
import { dialogProduct } from '../../store/product/productDialogReducer';
import BlockHeader from '../../components/shared/BlockHeader';
import Nuevo from './Nuevo';
import useAuthorization from '../../hooks/useAuthorization';
import { dataAccess, resources } from '../../data/app';


const Products = () => {

    const { authorized } = useAuthorization([resources.inventarios, dataAccess.access ]);

    let dataGrid = React.createRef();
    const dispatch = useDispatch();

    const reload = (params) => {
        dataGrid.current.instance.refresh();
    }

    const openDialog = (id=0) => dispatch(dialogProduct({open : true, id}));

    const title = "Inventario";
    const active = true;

    return authorized(
        <div className="container">
            <Title title={title}/>
            <BlockHeader title={title} >
                <CustomButton
                    text="Crear inventario"
                    icon='plus'
                    onClick={openDialog}
                />
            </BlockHeader>
            <Nuevo onSave={reload}/>
            <DataGrid id="gridContainer"
                ref={dataGrid}
                selection={{ mode: 'single' }}
                dataSource={store({ uri : uri.products, remoteOperations : true })}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
                hoverStateEnabled={true}
                remoteOperations={{
                    paging: true,
                    filtering: true
                }}     
            >
                <Paging defaultPageSize={20} />
                <Pager
                    showPageSizeSelector={true}
                    allowedPageSizes={[10, 20, 50]}
                    showInfo={true} 
                />
                <FilterRow visible={true} />
                <HeaderFilter visible={true} />
                <ColumnChooser enabled={true} />
                <Export enabled={true} fileName={title} allowExportSelectedData={true} />
                <Column dataField="id" caption='Codigo' width={80}/>
                <Column dataField="name" caption='Nombre' />
                <Column dataField="description" caption='Descripcion' />
                <Column dataField="familyId" caption="Familia" width={150}>
                    <Lookup disabled={true} dataSource={createStore({name:'family'})} valueExpr="id" displayExpr="name" />
                </Column> 
                <Column dataField="presentationId" caption="Presentacion" width={150}>
                    <Lookup disabled={true} dataSource={createStore({name:'Presentation'})} valueExpr="id" displayExpr="name" />
                </Column>
                <Column dataField="unitOfMeasureId" caption="UM" width={120}>
                    <Lookup disabled={true} dataSource={createStore({name: 'UnitOfMeasure'})} valueExpr="id" displayExpr="name" />
                </Column>
                <Column dataField="stateId" caption="Estado" width={100}>
                    <Lookup disabled={true} dataSource={createStore({name: 'productState'})} valueExpr="id" displayExpr="name" />
                </Column>
                <Column dataField="currencyId" caption="Moneda" width={100}>
                    <Lookup disabled={true} dataSource={createStore({name: 'currency'})} valueExpr="id" displayExpr="name" />
                </Column>
                <Column dataField="hasIva" caption='IVA ?' width={80} dataType="boolean"/>               
                <Column dataField="stockMin" caption='Stock' width={80} />               
                <Column dataField="createBy" caption='Creado Por' visible={false}/>
                <Column dataField="createAt" caption='Creando el' visible={false} />
                <Column dataField="lastModificationBy" caption='Modificado Por' visible={false}/>
                <Column dataField="lastDateModificationAt" caption='Modificado el' visible={false} />
                <Column type="buttons">
                    <ButtonGrid name="edit" icon="edit" onClick={e => openDialog(e.row.data.id)}/>
                </Column>
                <Editing
                    mode="popup"
                    useIcons={true}
                    allowUpdating={true}
                >
                </Editing>
            </DataGrid>
        </div>
    );
}

export default Products;
