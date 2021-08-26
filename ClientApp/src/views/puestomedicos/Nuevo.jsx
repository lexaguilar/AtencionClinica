import React, { useRef, useState } from 'react';
import Form, { SimpleItem, GroupItem, Label, RequiredRule, StringLengthRule } from 'devextreme-react/form';
import { createStoreLocal } from '../../utils/proxy';
import { Button } from 'devextreme-react/button';
import http from '../../utils/http';
import { dataAccess, editorOptionsSelect, resources } from '../../data/app';
import uri, { routeReset } from '../../utils/uri';
import Title from '../../components/shared/Title';
import BlockHeader from '../../components/shared/BlockHeader';
import Customer from '../../components/customer';
import notify from 'devextreme/ui/notify';
import { estadoAdmision } from '../../data/catalogos';
import { _path } from "../../data/headerNavigation";
import Box, { Item } from 'devextreme-react/box';
import Admision from '../../components/grids/Admision';
import { clearCustomer } from '../../store/customer/customerReducer';
import PopupBeneficiary from '../../components/beneficiary/PopupBeneficiary';
import { admisionPuestoMedicoDefault } from '../../data/admision';
import { useDispatch, useSelector } from 'react-redux'
import Citas from '../../components/grids/Citas';
import urlReport from '../../services/reportServices';
import useAuthorization from '../../hooks/useAuthorization';
import GridMedicamentos from '../workOrders/GridMedicamentos';

const Nuevo = props => {    

    const { authorized } = useAuthorization([resources.puestoMedicos, dataAccess.create ]);

    const { clear } = useSelector(store => store.customerClear);
    const dispatch = useDispatch();

    const [customer, setCustomer] = useState({ inss: '', status: false });   
    const [loading, setLoading] = useState(false);
    const [admision, setAdmision] = useState({...admisionPuestoMedicoDefault, typeId : 1});
    const [procedimientos, setProcedimientos] = useState([]);

    let refAdmision = useRef();

    const guardarAdmision = print => {

        let result = refAdmision.current.instance.validate();
        if (result.isValid) {


            setLoading(true);
            var data = {...admision, workOrderDetailModels : procedimientos};
            http(uri.puestomedico.insert).asPost(data).then(resp => {
                if (resp) {

                    setLoading(false);
                    notify(`Admision ${resp.numberOfDay} creada correctamente`);

                    setCustomer({ inss: '', status: false });

                    setAdmision({...admisionPuestoMedicoDefault});

                    dispatch(clearCustomer({clear : !clear}));

                    if(print){
                        const report = urlReport();
                        report.print(`${report.admisionTicket(resp.id)}`);
                    }

                    refAdmision.current.instance.resetValues();
                    setProcedimientos([]);

                    //routeReset(props);

                }
            }).catch(err => {

                notify(err, 'error', 5000);
                setLoading(false);
            });
        }
    }

    const valueChanged = custumer => {

        setCustomer({
            inss: custumer.inss,
            status: custumer.customerStatusId == estadoAdmision.activo
        });

    }

    const onValueChanged = (e) => {
        setAdmision({...admision, areaId: e.value});
    }

    const title = 'admision puesto medico';

    return authorized(
        <div className="container">
            <Title title={title} />
            <BlockHeader title='Nueva Admision puesto medico' >
                <PopupBeneficiary />
            </BlockHeader>            
            <Customer valueChanged={valueChanged}></Customer>
            <Form formData={admision} ref={refAdmision}>
                <GroupItem cssClass="second-group" colCount={4}>
                    <SimpleItem dataField="beneficiaryId" colSpan={2} editorType="dxSelectBox"
                        editorOptions={{
                            dataSource: customer.inss == '' ? [] : createStoreLocal({ name: 'beneficiary', url: uri.beneficarios(customer.inss).getAsCatalog }),
                            valueExpr: "id",
                            displayExpr: item => item ? `${item.relationship} - ${item.name}` : '',
                            searchEnabled: true,
                           
                            noDataText : customer.inss == ''? 'Busque un asegurado primero' : 'No hay beneficiarios agregado'
                        }} >
                        <Label text="Beneficiario" />
                        <RequiredRule message="Seleccione el beneficiario" />
                    </SimpleItem>
                    <SimpleItem dataField="areaId" editorType="dxSelectBox"
                        editorOptions={{
                            onValueChanged: onValueChanged,
                            dataSource: createStoreLocal({ name: 'area', active: true }),
                            ...editorOptionsSelect
                        }} >
                        <Label text="Area" />
                        <RequiredRule message="Seleccione el area" />
                    </SimpleItem>
                    <SimpleItem dataField="specialtyId" editorType="dxSelectBox"
                        editorOptions={{
                            dataSource: createStoreLocal({ name: 'specialty',active: true }),
                            ...editorOptionsSelect
                        }} >
                        <Label text="Especialidad" />
                        <RequiredRule message="Seleccione la especialidad" />
                    </SimpleItem>
                    <SimpleItem dataField="doctorId" editorType="dxSelectBox"  colSpan={2}
                        editorOptions={{
                            dataSource: createStoreLocal({ name: 'Doctor'}),
                            ...editorOptionsSelect
                        }} >
                        <Label text="Medico" />
                        <RequiredRule message="Seleccione el medico" />
                    </SimpleItem>                   
                    <SimpleItem dataField="date" editorType="dxDateBox"
                        editorOptions={{
                            displayFormat : 'dd/MM/yyyy',
                            openOnFieldClick:true,
                        }} >
                        <Label text="Fecha" />
                        <RequiredRule message="Seleccione la fecha" />
                    </SimpleItem>
                    <SimpleItem dataField="reference" colSpan={2}>
                        <RequiredRule message="Seleccione el medico" />
                        <StringLengthRule max={20} message="Maximo 20 caracteres" />
                        <Label text="No Receta" />
                    </SimpleItem>
                </GroupItem>
            </Form>
            <br />
            <GridMedicamentos isClosing={true}
                details={procedimientos}
                user={{ areaId : admision.areaId}} 
                showPrice={true}
                currencyId = "1"
                rate={1}
            />
            <br />
            <Button
                text={loading ? 'Guardando...' : 'Guardar admision'}
                type="success"
                icon='save'
                disabled={!customer.status || loading}
                onClick={e => guardarAdmision(true)}
            />
            <Button className="ml-10"
                text={loading ? 'Guardando...' : 'Guardar y crear nuevo'}
                type="success"
                icon='save'
                disabled={!customer.status || loading}
                onClick={e => guardarAdmision(false)}
            />
        </div>
    );
}

export default Nuevo;
