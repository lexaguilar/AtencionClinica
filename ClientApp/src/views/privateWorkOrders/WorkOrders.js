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
  } from 'devextreme-react/data-grid';
import {  createStoreLocal } from '../../utils/proxy';
import uri from '../../utils/uri';
import { store } from '../../services/store';
import { areaRestrict, formatDate, formatDateTime } from '../../data/app';
import Nuevo from './Nuevo';
import CustomButton from '../../components/buttons/CustomButton';
import { useDispatch } from 'react-redux'
import { dialogPrivateWorkOrder } from '../../store/privateWorkOrder/privateWorkOrderDialogReducer';
import PopupServiceTest from '../../components/workOrder/PopupServiceTest';


const WorkOrders = (props) => {

    const { followId, customerId, areaId } = props;

    let dataGrid = useRef();
    const dispatch = useDispatch();

    const reload = () => dataGrid.current.instance.refresh(); 
    
    const isLaboratorio = areaRestrict.laboratorio == areaId;

    const addMenuItems =(e) => {

        if (e.target == "content") {
            if (!e.items) e.items = [];
            
            if(e.row?.data){ 
                if(isLaboratorio){

                    e.items.push({
                        text: 'Registrar resultados',
                        icon : 'fas fa-flask',
                        onItemClick: () => {
                            
                            let { id } = e.row.data;
                           // dispatch(openDialogServiceTest({ id, customerId}));
                            
                        }
                    });
                }
            }
        }
    }

    const verOrdenTrabajo = e =>{

        dispatch(dialogPrivateWorkOrder({id: e.data.id, open : true, followId}))

    }
    

    const title = `Ordenes de trabajo privado movimiento ${followId}`;

    let extraParameter = { key : 'followId', value : followId };

    console.log(followId);

    return (
        <div className="container">
            <Title title={title}/>
            <BlockHeader title={title} >
                <CustomButton                                       
                    text='Nueva orden'
                    icon='plus'
                    onClick={()=>dispatch(dialogPrivateWorkOrder({open : true, followId}))}
                />
            </BlockHeader>

            <Nuevo onSave={reload} followId={followId} customerId={customerId}/> 
            <PopupServiceTest /> 
            
            <DataGrid id="gridContainer"
                ref={dataGrid}
                selection={{ mode: 'single' }}
                dataSource={store({ uri : uri.privateWorkOrders, remoteOperations : true, extraParameter})}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
                onContextMenuPreparing={addMenuItems}
                onRowDblClick={verOrdenTrabajo}
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
                <Column dataField="date" caption='Fecha' dataType='date' format={formatDate} width={120} />               
                <Column dataField="reference" caption='Referencia' width={100} />               
                <Column dataField="doctorId" caption='Medico' width={250} >
                    <Lookup disabled={true} dataSource={createStoreLocal({name: 'Doctor'})} valueExpr="id" displayExpr="name" />
                </Column>               
                <Column dataField="observation" caption='Observacion' />
                <Column dataField="createAt" caption='Creando el' dataType='date' format={formatDateTime} width={180}/>
                <Column dataField="createBy" caption='Creado Por'width={130}/>
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
