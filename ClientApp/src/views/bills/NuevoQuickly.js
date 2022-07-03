import React, { useEffect, useRef, useState } from 'react';
import { createStoreLocal } from '../../utils/proxy';
import { Button } from 'devextreme-react/button';
import http from '../../utils/http';
import { areaRestrict, dataAccess, editorOptionsSelect, resources } from '../../data/app';
import uri, { routeReset } from '../../utils/uri';
import Title from '../../components/shared/Title';
import BlockHeader from '../../components/shared/BlockHeader';
import notify from 'devextreme/ui/notify';
import { _path } from "../../data/headerNavigation";
import { billDefault, billTypes } from '../../data/bill';
import PopupPrivado from '../../components/beneficiary/PopupPrivado';
import DataSource from "devextreme/data/data_source";
import DataGrid, { Column, Editing, Lookup, Selection, Paging, FilterRow, Scrolling, Summary, TotalItem } from 'devextreme-react/data-grid';
import { cellRender, cellRenderBold, dataFormatId, obtenerTasaCambio, formatToMoney } from '../../utils/common';
import urlReport from '../../services/reportServices';
import useAuthorization from '../../hooks/useAuthorization';

import {
    Validator,
    RequiredRule
} from 'devextreme-react/validator';
import { CheckBox, SelectBox, TextArea, TextBox } from 'devextreme-react';
import Box, {  Item } from 'devextreme-react/box';
import { DivForm } from '../../utils/divHelpers';
import GridMedicamentos from '../workOrders/GridMedicamentos';
import { useSelector } from 'react-redux';
import MsgAuthorized from '../../hooks/MsgAuthorized';

const NuevoQuickly = props => {

    //const { user } = useSelector(store => store);

    const billDefaultQuickly = { ...billDefault, areaId: areaRestrict.farmaciaPrivada, billTypeId: billTypes.expontanea }

    const { authorized } = useAuthorization([resources.caja, dataAccess.create]);

    const [loading, setLoading] = useState(false);
    const [bill, setBill] = useState({ ...billDefaultQuickly });
    const [procedimientos, setProcedimientos] = useState([]);
    const [services, setServices] = useState([]);

    let dataGrid = React.createRef();

    const loadServices = (areaId) => {
        http(`services/area/${areaId}/get`).asGet({ active: true }).then(resp => setServices(resp))
    }

    useEffect(() => {
        obtenerTasaCambio(new Date()).then(rate => {
            if (rate)
                setBill({ ...bill, rate: rate.value });
        });
    }, [0]);


    const onFormSubmit = (e) => {


        e.preventDefault();

        setLoading(true);

        http(uri.bill.insert).asPost({ ...bill, privateCustomerId: 1, billDetails: [...procedimientos] }).then(resp => {
            if (resp) {

                setLoading(false);
                const report = urlReport();
                report.print(`${report.billTicket(resp.id)}`);

                routeReset(props);

            }
        }).catch(err => {

            notify(err, 'error');
            setLoading(false);

        });
    }

    const onlyFarmacias = data => data.filter(x => x.id == areaRestrict.farmacia || x.id == areaRestrict.farmaciaPrivada);

    const title = 'Nueva factura';

    return authorized(
        <div className="container medium">
            <Title title={title} />
            <BlockHeader title={title} >
            </BlockHeader>
            <form onSubmit={onFormSubmit}>
                <div className="dx-fieldset">
                    <DivForm title='Cliente'>
                        <TextBox
                            placeholder="Ingrese el nombre del cliente"
                            defaultValue={bill.nameCustomer}
                            value={bill.nameCustomer}
                            onValueChanged={e => {
                                setBill({ ...bill, nameCustomer: e.value })
                            }}>

                        </TextBox>
                    </DivForm>

                    <DivForm title='Tipo Ingreso' required>
                        <SelectBox
                            disabled={true}
                            value={bill.billTypeId}
                            onValueChanged={e => setBill({ ...bill, billTypeId: e.value })}
                            dataSource={createStoreLocal({ name: 'billType', active: true })}
                            {...editorOptionsSelect}
                        >
                            <Validator>
                                <RequiredRule message="Este campo es requerido" />
                            </Validator>
                        </SelectBox>
                    </DivForm>

                    <DivForm title='Area' required>
                        <SelectBox
                            //disabled={true}
                            defaultValue={bill.areaId}
                            value={bill.areaId}
                            onValueChanged={e => {

                                setBill(bill => ({ ...bill, areaId: e.value }));
                                setProcedimientos([]);
                                loadServices(e.value);

                            }}
                            dataSource={createStoreLocal({ name: 'area', active: true, ck: onlyFarmacias })}
                            {...editorOptionsSelect}
                        >
                            <Validator>
                                <RequiredRule message="Este campo es requerido" />
                            </Validator>
                        </SelectBox>
                    </DivForm>

                    <DivForm title='Moneda' required>
                        <SelectBox
                            defaultValue={bill.currencyId}
                            value={bill.currencyId}
                            onValueChanged={e => {
                                setBill({ ...bill, currencyId: e.value })
                                setProcedimientos([]);
                            }}
                            dataSource={createStoreLocal({ name: 'currency', active: true })}
                            {...editorOptionsSelect}
                        >
                            <Validator>
                                <RequiredRule message="Este campo es requerido" />
                            </Validator>
                        </SelectBox>
                    </DivForm>
                    <Box direction="row"
                        width="100%"
                        height={75}>
                            
                            <Item ratio={1}>
                                <DivForm title='Es de Credito?'>
                                    <CheckBox
                                        value={bill.isCredit}
                                        onValueChanged={e => {
                                            setBill({ ...bill, isCredit: e.value })
                                        }}
                                    >
                                    </CheckBox>
                                </DivForm>
                            </Item>
                            <Item ratio={2}></Item>
                    </Box>  
                    <DivForm title='Observacion' >
                        <TextArea
                            defaultValue={bill.observaction}
                            value={bill.observaction}
                            onValueChanged={e => {
                                setBill({ ...bill, observaction: e.value })
                            }}>

                        </TextArea>
                    </DivForm>

                    <GridMedicamentos isClosing={true}
                        details={procedimientos}
                        user={{ areaId: bill.areaId }}
                        showPrice={true}
                        currencyId={bill.currencyId}
                        rate={bill.rate}
                    />


                </div>
                <Button
                    width={180}
                    text={loading ? 'Guardando...' : 'Guardar factura'}
                    type="success"
                    icon='save'
                    disabled={loading}
                    useSubmitBehavior={true}
                />
            </form>
        </div>
    );
}

export default NuevoQuickly;
