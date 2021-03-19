import React, { useRef, useState } from 'react';
import { Button, DataGrid, Popup } from 'devextreme-react';
import {
    Paging,
    Pager,
    FilterRow,
    HeaderFilter,
    ColumnChooser,
    Column,
    Export
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
import PopupWorkOrder from '../../components/workOrder/PopupWorkOrder';
import useAuthorization from '../../hooks/useAuthorization';
import Transfer from '../../components/workOrder/Transfer';
import TransferWithProduct from '../../components/workOrder/TransferWithProduct';
import http from '../../utils/http';
import notify from 'devextreme/ui/notify';

const Follows = () => {

    const { authorized } = useAuthorization([resources.servicios, dataAccess.access]);
    const [visible, setVisible] = useState(false);
    const [admissionId, setAdmissionId] = useState(0);

    const { areaId } = useSelector(store => store.user);
    const dispatch = useDispatch();

    let dataGrid = useRef();

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
                }, {
                    text: 'Nueva transferencia',
                    icon: 'chevrondoubleright',
                    onItemClick: () => {

                        let { admissionId } = e.row.data;
                        dispatch(dialogTransfer({ open: true, id: admissionId }));

                    }
                }, {
                    text: 'Transferir con medicamentos',
                    icon: 'chevrondoubleright',
                    onItemClick: () => {

                        let { admissionId } = e.row.data;
                        dispatch(dialogTransferWithProduct({ open: true, id: admissionId }));

                    }
                }, {
                    text: 'Ver movimientos',
                    icon: 'runner',
                    onItemClick: () => 0

                }, {

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
            <DataGrid id="gridContainer"
                ref={dataGrid}
                selection={{ mode: 'single' }}
                dataSource={store({ uri: uri.follows(areaId), remoteOperations: true })}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
                onCellPrepared={onCellPrepared}
                onContextMenuPreparing={addMenuItems}
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
                <Column dataField="relationship" width={100} caption="Tipo" />
                <Column dataField="firstName" caption='Nombres' />
                <Column dataField="lastName" caption='Apellidos' />
                <Column dataField="areaSource" caption='Area Origen' />
                <Column dataField="admissionType" caption='Tipo Ingreso' width={120} />
                <Column dataField="finished" caption='Finalizado' dataType='boolean' width={100} />
                <Column dataField="createBy" caption='Creado por' width={120} />
                <Column dataField="createAt" caption='Creado el' dataType='date' format={formatDateTime} width={150} />
            </DataGrid>
        </div>
    );
}

export default Follows;
