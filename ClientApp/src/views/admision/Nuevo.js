import React, { useRef, useState } from 'react';
import Form, { SimpleItem, GroupItem, Label, RequiredRule, StringLengthRule } from 'devextreme-react/form';
import { createStoreLocal } from '../../utils/proxy';
import { Button } from 'devextreme-react/button';
import http from '../../utils/http';
import { dataAccess, editorOptionsSelect, resources } from '../../data/app';
import uri from '../../utils/uri';
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
import { admisionDefault } from '../../data/admision';
import { useDispatch, useSelector } from 'react-redux'
import Citas from '../../components/grids/Citas';
import urlReport from '../../services/reportServices';
import useAuthorization from '../../hooks/useAuthorization';

const Nuevo = props => {    

    const { authorized } = useAuthorization([resources.admision, dataAccess.create ]);

    const { clear } = useSelector(store => store.customerClear);
    const dispatch = useDispatch();

    const [customer, setCustomer] = useState({ inss: '', status: false });   
    const [loading, setLoading] = useState(false);
    const [admision, setAdmision] = useState({...admisionDefault});
    const [beneficiaryId, setBeneficiaryId] = useState(0);

    let refAdmision = useRef();

    const guardarAdmision = () => {

        let result = refAdmision.current.instance.validate();
        if (result.isValid) {


            setLoading(true);
            http(uri.admisions.insert).asPost(admision).then(resp => {
                if (resp) {

                    setLoading(false);
                    notify(`Admision ${resp.numberOfDay} creada correctamente`);

                    setCustomer({ inss: '', status: false });

                    setAdmision({...admisionDefault});

                    dispatch(clearCustomer({clear : !clear}));

                    const report = urlReport();
                    report.print(`${report.admisionTicket(resp.id)}`);

                    refAdmision.current.instance.resetValues();

                }
            }).catch(err => {

                notify(err, 'error');
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
        setBeneficiaryId(e.value);
    }

    const title = 'Admision';

    return authorized(
        <div className="container">
            <Title title={title} />
            <BlockHeader title='Nueva Admision' >
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
                            onValueChanged: onValueChanged,
                            noDataText : customer.inss == ''? 'Busque un asegurado primero' : 'No hay beneficiarios agregado'
                        }} >
                        <Label text="Beneficiario" />
                        <RequiredRule message="Seleccione el beneficiario" />
                    </SimpleItem>
                    <SimpleItem dataField="areaId" editorType="dxSelectBox"
                        editorOptions={{
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
                    <SimpleItem dataField="typeId" editorType="dxSelectBox"  colSpan={2}
                        editorOptions={{
                            dataSource: createStoreLocal({ name: 'admissionType'}),
                            ...editorOptionsSelect
                        }} >
                        <Label text="Tipo de Ingreso" />
                        <RequiredRule message="Seleccione el tipo de ingreso" />
                    </SimpleItem>
                    {/* <SimpleItem dataField="motive" colSpan={2}>
                        <StringLengthRule max={250} message="Maximo 250 caracteres" />
                        <Label text="Motivo de consulta" />
                    </SimpleItem> */}
                    <SimpleItem dataField="observation" colSpan={2}>
                        <StringLengthRule max={250} message="Maximo 250 caracteres" />
                        <Label text="Observacion" />
                    </SimpleItem>
                </GroupItem>
            </Form>
            <br />
            <Button
                width={180}
                text={loading ? 'Guardando...' : 'Guardar admision'}
                type="success"
                icon='save'
                disabled={!customer.status || loading}
                onClick={guardarAdmision}
            />
            <br />
            <Box direction="row" width="100%">
                <Item ratio={1}>
                    <Admision beneficiaryId={beneficiaryId} />
                </Item>
                <Item ratio={1}>
                    <Citas beneficiaryId={beneficiaryId}/>
                </Item>
            </Box>
        </div>
    );
}

export default Nuevo;
