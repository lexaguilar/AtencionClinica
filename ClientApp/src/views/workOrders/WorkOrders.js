import React from 'react';
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
  } from 'devextreme-react/data-grid';
import {  createStoreLocal } from '../../utils/proxy';
import uri from '../../utils/uri';
import { store } from '../../services/store';
import { formatDate, formatDateTime } from '../../data/app';
import Nuevo from './Nuevo';
import CustomButton from '../../components/buttons/CustomButton';
import { useDispatch, useSelector } from 'react-redux'
import { dialogWorkOrder } from '../../store/workOrder/workOrderDialogReducer';
import { typeTraslate } from '../../data/catalogos';

const WorkOrders = (props) => {

    const { followId, beneficiaryId } = props;

    let dataGrid = React.createRef();
    const dispatch = useDispatch();

    const reload = () => dataGrid.current.instance.refresh();    

    const title = `Ordenes de trabajo movimiento ${followId}`;

    let extraParameter = { key : 'followId', value : followId };

    return (
        <div className="container">
            <Title title={title}/>
            <BlockHeader title={title} >
                <CustomButton                                       
                    text='Nueva orden'
                    icon='plus'
                    onClick={()=>dispatch(dialogWorkOrder({open : true}))}
                />
            </BlockHeader>
            <Nuevo onSave={reload} followId={followId} beneficiaryId={beneficiaryId}/> 
            
            <DataGrid id="gridContainer"
                ref={dataGrid}
                selection={{ mode: 'single' }}
                dataSource={store({ uri : uri.workOrders, remoteOperations : true, extraParameter})}
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
                <Column dataField="reference" caption='Referencia' width={100} />               
                <Column dataField="observation" caption='Observacion' />
                <Column dataField="createAt" caption='Creando el' dataType='date' format={formatDateTime} width={180}/>
                <Column dataField="createBy" caption='Creado Por'width={150}/>
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

export default WorkOrders;
