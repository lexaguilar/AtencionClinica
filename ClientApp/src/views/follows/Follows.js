import React, { useRef, useState } from 'react';
import { Button, DataGrid, Popup } from 'devextreme-react';
import {
    Paging,
    Pager,
    FilterRow,
    HeaderFilter,
    ColumnChooser,
    Column,
    Export,
    Lookup
} from 'devextreme-react/data-grid';
import { store } from '../../services/store';
import uri from '../../utils/uri';
import BlockHeader from '../../components/shared/BlockHeader';
import Title from '../../components/shared/Title';
import { areaRestrict, dataAccess, formatDateTime, resources } from '../../data/app';
import { useDispatch, useSelector } from 'react-redux';
import { dialogWorkOrders } from '../../store/workOrders/workOrdersDialogReducer';
import { dialogTransfer } from '../../store/transfer/transferDialogReducer';
import { dialogTransferWithProduct } from '../../store/transferWithProduct/transferWithProdcutDialogReducer';
import { dialogTransferWithService } from '../../store/transferWithService/transferWithServiceDialogReducer';
import PopupWorkOrder from '../../components/workOrder/PopupWorkOrder';
import { openDialogServiceTest } from '../../store/servicetest/serviceTestDialogReducer';
import useAuthorization from '../../hooks/useAuthorization';
import Transfer from '../../components/workOrder/Transfer';
import TransferWithProduct from '../../components/workOrder/TransferWithProduct';
import http from '../../utils/http';
import notify from 'devextreme/ui/notify';
import { createStoreLocal } from '../../utils/proxy';
import PopupServiceTest from '../../components/workOrder/PopupServiceTest';
import TransferWithService from '../../components/workOrder/TransferWithService';

const Follows = () => {

    const { authorized } = useAuthorization([resources.servicios, dataAccess.access]);
    const [visible, setVisible] = useState(false);
    const [admissionId, setAdmissionId] = useState(0);

    const { user } = useSelector(store => store);
    const { areaId } = user;
    const dispatch = useDispatch();

    let dataGrid = useRef();

    const isLaboratorio = areaRestrict.laboratorio == areaId;

    const addMenuItems = (e) => {

        if (e.target == "content") {
            if (!e.items) e.items = [];

            if (e.row?.data) {
                e.items.push({
                    text: 'Nueva orden de trabajo',
                    icon: 'folder',
                    onItemClick: () => {

                        let { id, beneficiaryId } = e.row.data;
                        dispatch(dialogWorkOrders({ open: true, id, beneficiaryId: beneficiaryId }));

                    }
                });

                e.items.push({
                    text: 'Nueva transferencia',
                    icon: 'chevrondoubleright',
                    onItemClick: () => {

                        let { admissionId } = e.row.data;
                        dispatch(dialogTransfer({ open: true, id: admissionId }));

                    }
                });

                e.items.push({
                    text: 'Transferir con medicamentos',
                    icon: 'chevrondoubleright',
                    onItemClick: () => {

                        let { admissionId } = e.row.data;
                        dispatch(dialogTransferWithProduct({ open: true, id: admissionId }));

                    }
                });

                e.items.push({
                    text: 'Transferir a laboratorio',
                    icon: 'chevrondoubleright',
                    onItemClick: () => {

                        let { admissionId, followId } = e.row.data;
                        dispatch(dialogTransferWithService({ open: true, id: admissionId }));

                    }
                });

                if(isLaboratorio)
                    e.items.push({
                        text: 'Registrar resultados',
                        icon : 'fas fa-flask',
                        onItemClick: () => {
                            
                            let { id, beneficiaryId } = e.row.data;
                            dispatch(openDialogServiceTest({ id, beneficiaryId, followId: id }));
                            
                        }
                    });

                e.items.push({

                    text: 'Dar de alta',
                    icon: 'fas fa-wheelchair',
                    onItemClick: () => {

                        if (e.row.data.admissionTypeId == 2) {
                            setAdmissionId(e.row.data.admissionId);
                            setVisible(true);
                        } else
                            notify('Solo se permite dar alta a admisiones tipo ingreso Hospitalarios', 'error');

                    },
                    color: 'red'
                });
            }
        }
    }

    const onCellPrepared = e => {

        if (e.rowType == 'data') {

            if (e.column.dataField == "id")
                e.cellElement.classList.add('text-id');
            if (e.column.dataField == "inss")
                e.cellElement.classList.add('text-inss');
            if (e.column.dataField == 'admissionId')
                e.cellElement.classList.add('text-admision');

        }

    }

    const anular = () => {

        http(`admisions/${admissionId}/alta`).asGet().then(resp => {
            notify('Paciente ha sido dado de alta con éxito');
            onHiding();
            //dataGrid.current.instance.refresh();  
        });

    }

    const onToolbarPreparing = (e) => {

        e.toolbarOptions.items.unshift({
            location: 'before',
            widget: 'dxButton',
            options: {
                text: 'Nueva orden',
                icon:'folder',
                type:'default',
                stylingMode:"outlined",
                onClick: () =>  {

                    let data = dataGrid.current.instance.getSelectedRowsData();
                    if(data?.length)
                    {
                        let { id, beneficiaryId } = data[0];
                        dispatch(dialogWorkOrders({ open: true, id, beneficiaryId: beneficiaryId }));
                    }

                }
            }
        },{
            location: 'before',
            widget: 'dxButton',
            options: {
                text: 'Tranferir',
                icon:'chevrondoubleright',
                type:'default',
                stylingMode:"outlined",
                onClick: () =>  {

                    let data = dataGrid.current.instance.getSelectedRowsData();
                    if(data?.length)
                    {                       
                        
                        let { admissionId } =  data[0];
                        dispatch(dialogTransfer({ open: true, id: admissionId }));
                    }
                }
            }
        });
        
    }  

    const onHiding = () => {
        setAdmissionId(0);
        setVisible(false);
    }

    const title = 'Servicios';

    return authorized(
        <div className="container">
            <Title title={title} />
            <BlockHeader title={title} />
            <Popup
                width={350}
                height={220}
                title='Dar de alta'
                onHiding={onHiding}
                visible={visible}
            >
                <p>Esta seguro de dar de alta al paciente?</p>
                <p className="text-danger">Despues de esto ya no se podra atender al paciente, hasta que tenga una nueva admisión</p>
                <br />
                <Button className="m0" type="default" text="Confirmar" onClick={anular} width="100%" ></Button>
            </Popup>
            <PopupWorkOrder areaId={areaId} />
            <Transfer />
            <TransferWithProduct />
            <TransferWithService />
            <PopupServiceTest user={user} /> 
            <DataGrid id="gridContainer"
                ref={dataGrid}
                selection={{ mode: 'single' }}
                dataSource={store({ uri: uri.follows(areaId), remoteOperations: true })}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
                hoverStateEnabled={true}
                onCellPrepared={onCellPrepared}
                onContextMenuPreparing={addMenuItems}
                onToolbarPreparing={onToolbarPreparing}
                noDataText='No se encontró ninguna transferencia'
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
                <Column dataField="id" width={100} />
                <Column dataField="admissionId" width={100} caption='Admision' />
                <Column dataField="inss" width={100} />
                <Column dataField="relationship" width={100} caption="Tipo" allowFiltering={false} allowHeaderFiltering={false}/>
                <Column dataField="identification" caption='Identificacion'  width={130}/>
                <Column dataField="firstName" caption='Nombres' />
                <Column dataField="lastName" caption='Apellidos' />
                <Column dataField="areaSourceId" caption='Area Origen' >
                    <Lookup disabled={true} dataSource={createStoreLocal({name : 'area' })} valueExpr="id" displayExpr="name" />
                </Column>
                <Column dataField="admissionTypeId" caption='Tipo Ingreso' width={120} >
                    <Lookup disabled={true} dataSource={createStoreLocal({name : 'admissionType' })} valueExpr="id" displayExpr="name" />
                </Column>
                <Column dataField="finished" caption='Finalizado' dataType='boolean' allowFiltering={false} allowHeaderFiltering={false} width={90} />
                <Column dataField="createBy" caption='Creado por' width={120} visible={false} allowFiltering={false} allowHeaderFiltering={false} />
                <Column dataField="createAt" caption='Creado el' dataType='date' format={formatDateTime} width={150} />
            </DataGrid>
        </div>
    );
}

export default Follows;
