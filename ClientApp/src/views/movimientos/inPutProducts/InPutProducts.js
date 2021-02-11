import React, { useEffect, useState } from 'react';
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
import { createStore, createStoreLocal } from '../../../utils/proxy';
import uri from '../../../utils/uri';
import { store } from '../../../services/store';
import { formatDateTime } from '../../../data/app';
import Nuevo from './Nuevo';
import CustomButton from '../../../components/buttons/CustomButton';
import { useDispatch } from 'react-redux'
import { dialogInputProduct } from '../../../store/inPutProduct/inPutProductDialogReducer';

const InPutProducts = () => {

    const [typeId, setTypeId] = useState(0);

    let dataGrid = React.createRef();
    const dispatch = useDispatch();

    const reload = (params) => {
        dataGrid.current.instance.refresh();
    }

    const title = "Entrada de inventario";

    return (
        <div className="container">
            <Title title={title}/>
            <BlockHeader title={title} >
                <CustomButton
                    stylingMode='outlined'                    
                    text="Crear entrada"
                    icon='plus'
                    onClick={()=>dispatch(dialogInputProduct({open : true}))}
                />
            </BlockHeader>
            <Nuevo onSave={reload}  />            
            <div id="form-demo">
                <div className="widget-container">
                    <div>Tipo de entradas:</div>
                    <SelectBox
                        dataSource={createStoreLocal({name: 'inPutProductType'})}
                        displayExpr="name"
                        valueExpr="id"
                    />
                </div>
            </div>
            <br />
            <DataGrid id="gridContainer"
                ref={dataGrid}
                selection={{ mode: 'single' }}
                dataSource={store({ uri : uri.inPutProducts, remoteOperations : true })}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
            >
                <Paging defaultPageSize={20} />
                <Pager
                    showPageSizeSelector={true}
                    allowedPageSizes={[10, 20, 50]}
                />
                <FilterRow visible={true} />
                <HeaderFilter visible={true} />
                <ColumnChooser enabled={true} />
                <Export enabled={true} fileName={title} allowExportSelectedData={true} />
                <Column dataField="number" caption='Numero' width={100}/>
                <Column dataField="date" caption='Fecha' type='datetime' width={120} format={formatDateTime} />
                <Column dataField="areaId" caption="Area" width={180}>
                    <Lookup disabled={true} dataSource={createStoreLocal({ name: 'area'})} valueExpr="id" displayExpr="name" />
                </Column> 
                <Column dataField="typeId" caption="Tipo" width={160}>
                    <Lookup disabled={true} dataSource={createStoreLocal({name: 'inPutProductType'})} valueExpr="id" displayExpr="name" />
                </Column> 
                <Column dataField="stateId" caption="Estado" width={150}>
                    <Lookup disabled={true} dataSource={createStoreLocal({name: 'inPutProductState'})} valueExpr="id" displayExpr="name" />
                </Column> 
                <Column dataField="sourceId" caption='Origen' />
                <Column dataField="createAt" caption='Creando el' visible={false} />
                <Column dataField="createBy" caption='Creado Por' visible={false}/>
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
