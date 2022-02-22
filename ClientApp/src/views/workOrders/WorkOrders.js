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
import { formatDate, formatDateTime } from '../../data/app';
import Nuevo from './Nuevo';
import CustomButton from '../../components/buttons/CustomButton';
import { useDispatch } from 'react-redux'
import { dialogWorkOrder } from '../../store/workOrder/workOrderDialogReducer';
import http from '../../utils/http';
import notify from 'devextreme/ui/notify';
import { confirm } from 'devextreme/ui/dialog';

const WorkOrders = (props) => {

    const { followId, beneficiaryId, areaId } = props;

    let dataGrid = useRef();
    const dispatch = useDispatch();

    const reload = () => dataGrid.current.instance.refresh(); 
    
   // const isLaboratorio = areaRestrict.laboratorio == areaId;

    const addMenuItems =(e) => {

        if (e.target == "content") {
            if (!e.items) e.items = [];
            
            if(e.row?.data){                 

                e.items.push({
                    text: 'Ver registro',
                    icon : 'info',
                    onItemClick: () => {
                        
                        let { id } = e.row.data;
                        viewInfo( id );
                        
                    }
                });

                e.items.push({
                    text: 'Anular registro',
                    icon : 'remove',
                    onItemClick: () => {
                        
                        let { id } = e.row.data;
                        deleteInfo( id );
                        
                    }
                });
                
            }
        }
    }

    const viewInfo = id => {

        console.log(id)

        dispatch(dialogWorkOrder({open : true, id }));

    }

    const deleteInfo = id => {

        let result = confirm(`<i>Estás seguro de anular el registro <b>${id}</b>?</i>`, "Confirmar");
        result.then(dialogResult => {
            if(dialogResult){
                http(uri.workOrders.remove(id)).asGet()
                .then(() => reload()).catch(err => notify(err, 'error', 5000));
            }
            
        });

        

    }
    

    const title = `Ordenes de trabajo movimiento ${followId}`;

    let extraParameter = { key : 'followId', value : followId };

    return (
        <div className="container">
            <Title title={title}/>
            <BlockHeader title={title} >
                <CustomButton                                       
                    text='Nueva orden'
                    icon='plus'
                    onClick={()=>dispatch(dialogWorkOrder({id: 0, open : true}))}
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
                hoverStateEnabled={true}
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
                <Export enabled={true} fileName={title} allowExportSelectedData={true} />
                <Column dataField="id" caption='Numero' width={100}/>
                <Column dataField="date" caption='Fecha' dataType='date' format={formatDate} width={120} />               
                <Column dataField="reference" caption='Referencia' width={100} />               
                <Column dataField="doctorId" caption='Medico' width={250} >
                    <Lookup disabled={true} dataSource={createStoreLocal({name: 'Doctor'})} valueExpr="id" displayExpr="name" />
                </Column>               
                <Column dataField="observation" caption='Observacion' />
                <Column dataField="active" caption='Activo?' dataType='boolean' width={80} />
                <Column dataField="createAt" caption='Creando el' dataType='date' format={formatDateTime} width={180}/>
                <Column dataField="createBy" caption='Creado Por'width={130}/>
                {/* <Column type="buttons" width={60}>
                    <ButtonGrid name="edit" onClick={e => viewInfo(e.row.data.id)}/>
                    <ButtonGrid name="delete" onClick={e => deleteInfo(e.row.data.id)}/>
                </Column>
                <Editing
                    mode="popup"
                    allowUpdating={true}
                    allowDeleting={true}
                    useIcons={true}
                >
                </Editing> */}
            </DataGrid>
        </div>
    );
}

export default WorkOrders;
