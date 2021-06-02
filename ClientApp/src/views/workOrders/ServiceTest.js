import React, { useState, useEffect, useRef } from 'react';
import { SimpleItem, GroupItem, Label, RequiredRule, StringLengthRule, Form as FormNew } from 'devextreme-react/form';
import DataGrid, {
    Popup as PopupGrid,
    Column,
    Editing,
    Lookup,
    Form,
    FormItem,
    Button as ButtonGrid
} from 'devextreme-react/data-grid';
import http from '../../utils/http';
import notify from 'devextreme/ui/notify';

import Information from '../../components/beneficiary/Information';

import { editorOptionsSelect, formatDate } from '../../data/app';

import { store } from '../../services/store';
import { appearance, appearanceBio, observationBK, testFrescs, testAntiBiotics } from '../../data/catalogos';
import { Button, Popup, ScrollView } from 'devextreme-react';
import urlReport from '../../services/reportServices';

const ServiceTest = ({ beneficiaryId, user, open, followId }) => {


    const [resultados, setResultado] = useState([]);
    const [service, setService] = useState(0);
    const [ids, setIds] = useState({ id: 0, sendTestId: 0 });

    useEffect(() => {
        http(`follows/${followId}/getServicesSent`).asGet().then(resp => {
            setIds({
                id: 0,
                sendTestId: 0
            });
            setService(0);
            setResultado(resp);
        });

    }, [open]);

    let ref = useRef();
    let refExamen = useRef();

    const onSelectionChanged = (e) => {
        if (e.selectedRowsData) {

            let data = e.selectedRowsData[0];

            if (data)
                setIds({
                    id: data.id,
                    sendTestId: data.sendTestId
                });
        }
    }

    const onSelectionChangedExamen = (e) => {
        if (e.selectedRowsData) {

            let data = e.selectedRowsData[0];

            if (data)
                setService({ ...data });
        }
    }

    const report = urlReport();
    const addMenuItems = (e) => {
        if (e.target == "content") {
            if (!e.items) e.items = [];

            if (e.row?.data) {

                e.items.push({
                    text: 'Imprimir examenes',
                    icon: 'print',
                    onItemClick: () => {

                        report.print(`${report.testsResult(e.row.data.id)}`);

                        // let { id } = e.row.data;
                        // dispatch(openDialogServiceTest({ id, beneficiaryId}));

                    }
                });

            }
        }
    }

    const addMenuItems2 = (e) => {
        if (e.target == "content") {
            if (!e.items) e.items = [];

            if (e.row?.data) {

                e.items.push({
                    text: 'Imprimir examen',
                    icon: 'print',
                    onItemClick: () => {

                        report.print(`${report.privateTestsResult(e.row.data.id)}`);
                 
                    }
                });

            }
        }
    }


    return (

        <div>
            <Information beneficiaryId={beneficiaryId} />
            <div style={{ display: 'flex' }}>
                <div className="mr-10" style={{ width: '30%' }}>
                    <DataGrid
                        ref={ref}
                        selection={{ mode: 'single' }}
                        dataSource={resultados}
                        showBorders={true}
                        showRowLines={true}
                        allowColumnResizing={true}
                        allowColumnReordering={true}
                        onSelectionChanged={onSelectionChanged}
                        onContextMenuPreparing={addMenuItems}
                    >
                        <Column dataField="doctor.name" caption="Medico" allowEditing={false} />
                        <Column dataField="date" caption="Fecha" dataType="date" format={formatDate} allowEditing={false} />
                        <Column dataField="createBy" caption="Usuario" allowEditing={false} />

                    </DataGrid>
                </div>
                <div className="mr-10" style={{ width: '30%' }}>
                    <DataGrid
                        ref={refExamen}
                        selection={{ mode: 'single' }}
                        dataSource={ids.sendTestId == 0 ? [] : store({
                            uri: {
                                get: `follows/${followId}/getServicesSent/${ids.sendTestId}`
                            }
                        })}
                        showBorders={true}
                        showRowLines={true}
                        allowColumnResizing={true}
                        allowColumnReordering={true}
                        onSelectionChanged={onSelectionChangedExamen}
                        onContextMenuPreparing={addMenuItems2}

                    >
                        <Column dataField="name" caption="Procedimiento">
                        </Column>
                    </DataGrid>
                </div>
                <div style={{ width: '40%' }}>

                    {service &&
                        service.isCultive
                        ?
                        <GridCultivo id={ids.id} service={service} />
                        :
                        service.id == 8 ?
                            <GridBaarTests id={ids.id} serviceId={service.id} />
                            :
                            <GridTests id={ids.id} serviceId={service.id} />
                    }
                </div>
            </div>


        </div>
    )
}

const GridTests = ({ id, serviceId }) => {
    return (
        <DataGrid
            selection={{ mode: 'single' }}
            dataSource={store({
                uri: {
                    get: `follows/${id}/getServicesSent/${serviceId}/Details`,
                    insert: `follows/${id}/getServicesSent/${serviceId}/Details`
                }
            })}
            showBorders={true}
            showRowLines={true}
            allowColumnResizing={true}
            allowColumnReordering={true}
        >
            <Column dataField="name" caption="Examen" allowEditing={false} />
            <Column dataField="reference" allowEditing={false} />
            <Column dataField="um" allowEditing={false} />
            <Column dataField="result" />
            <Editing
                mode="cell"
                allowUpdating={true}
                selectTextOnEditStart={true}
                useIcons={true}
            ></Editing>
        </DataGrid>
    )
}

const GridBaarTests = ({ id, serviceId }) => {
    return (
        <DataGrid
            selection={{ mode: 'single' }}
            dataSource={store({
                uri: {
                    get: `follows/${id}/getServicesSent/${serviceId}/Details/baar`,
                    insert: `follows/${id}/getServicesSent/${serviceId}/Details/baar`
                }
            })}
            showBorders={true}
            showRowLines={true}
            allowColumnResizing={true}
            allowColumnReordering={true}

        >
            <Column dataField="testNumber" caption="Muestra" allowEditing={false} width={70} />
            <Column dataField="testDate" caption="Fecha" dataType="date" format={formatDate}  >
                <RequiredRule message="El campo es requerido" />
            </Column>
            <Column dataField="appearanceBio" caption="Muestra Biologica">
                <StringLengthRule max={20} message="Maximo de caracteres {20}" />
                <FormItem colSpan={2} editorOptions={{ dataSource: appearanceBio }} editorType="dxAutocomplete" />
            </Column>
            <Column dataField="appearance" caption="Aspecto">
                <StringLengthRule max={20} message="Maximo de caracteres {20}" />
                <FormItem colSpan={2} editorOptions={{ dataSource: appearance }} editorType="dxAutocomplete" />
            </Column>
            <Column dataField="observationBk" caption="Observacion BK">
                <StringLengthRule max={50} message="Maximo de caracteres {50}" />
                <FormItem colSpan={2} editorOptions={{ dataSource: observationBK }} editorType="dxAutocomplete" />
            </Column>
            <Column dataField="observation" caption="Observacion">
                <StringLengthRule max={150} message="Maximo de caracteres {150}" />
                <FormItem colSpan={2} editorType="dxTextArea" editorOptions={{}} />
            </Column>
            <Editing
                mode="popup"
                allowUpdating={true}
                selectTextOnEditStart={true}
                useIcons={true}
            >
                <PopupGrid title={"Examenes BAAR"} showTitle={true} width={550} height={420}>
                </PopupGrid>
            </Editing>
        </DataGrid>
    )
}

const GridCultivo = ({ id, service }) => {

    const [cultiveOpen, setCultiveOpen] = useState(false);

    const onHiding = (params) => {
        setCultiveOpen(false);
    }


    return (
        <div>
            <GridCultivoNew open={cultiveOpen} onHiding={onHiding} service={service} serviceTestId={id} />
            <DataGrid
                selection={{ mode: 'single' }}
                dataSource={store({
                    uri: {
                        get: `follows/${id}/getServicesSent/${service.id}/Details/cultivos`,
                        insert: `follows/${id}/getServicesSent/${service.id}/Details/cultivos`
                    }
                })}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
            >

                <Column dataField="name" >
                </Column>
                <Column dataField="testDate" caption="Fecha" dataType="date" format={formatDate} >
                </Column>
                <Column dataField="gram" >
                </Column>
                <Column type="buttons" width={50}>
                    <ButtonGrid name="modificar" icon="edit" onClick={e => setCultiveOpen(true)} />
                </Column>
                <Editing
                    mode="popup"
                    allowUpdating={true}
                    selectTextOnEditStart={true}
                    useIcons={true}
                >
                </Editing>
            </DataGrid>


        </div>


    )
}

const GridCultivoNew = ({ serviceTestId, service, open, onHiding }) => {

    console.log(service);

    const [cultivo, setCultivo] = useState({ serviceTestCultiveFrescs: [], serviceTestCultiveAntiBiotics: [] });
    const [saving, setSaving] = useState(false);
    const refForm = useRef();

    const save = (e) => {

        let result = refForm.current.instance.validate();

        if (result.isValid) {

            setSaving(true);

            http(`follows/${serviceTestId}/getServicesSent/${service.id}/Details/cultivos`).asPost(cultivo).then(resp => {

                setSaving(false);
                notify('Orden de trabajo registrada correctamente');
                onHiding()

            }).catch(err => {
                setSaving(false);
                notify(err, 'error', 5000);
            });

        }


    }

    useEffect(() => {

        http(`follows/${serviceTestId}/getServicesSent/0/Details/cultivos`).asGet()
            .then(resp => {
                setCultivo({ ...resp })
            })

    }, [open]);

    const onInitNewRowAntiBiotics = (e) => {
        e.data.serviceTestCultiveId = cultivo.id;
    }
    const onInitNewRowFresh = (e) => {
        e.data.serviceTestCultiveId = cultivo.id;
    }

    return (
        <Popup
            width={720}
            height={680}
            title={`Resultado de cultivos`}
            onHiding={onHiding}
            visible={open}
        >
            <ScrollView id="scrollview">
                <FormNew formData={cultivo} ref={refForm}>
                    <GroupItem colCount={4}>

                        <SimpleItem dataField="testDate" editorType="dxDateBox" colSpan={2}
                            editorOptions={{
                                displayFormat: 'dd/MM/yyyy',
                                openOnFieldClick: true,
                            }} >
                            <Label text="Fecha" />
                            <RequiredRule message="Este campo es querido"></RequiredRule>
                        </SimpleItem>
                        <SimpleItem dataField="aminas" colSpan={2} editorType="dxSelectBox" editorOptions={{
                            dataSource: [{ id: 1, name: "Positivas" },
                            { id: 2, name: "Negativas" },
                            { id: 3, name: "Sin asignar" }
                            ], displayExpr: "name", valueExpr: "id"
                        }}>
                            <Label text="Aminas" />
                        </SimpleItem>
                        <SimpleItem dataField="gram" colSpan={4}>
                            <Label text="GRAM" />
                            <StringLengthRule max={250} message="Maximo 250 caracteres maximo" />
                        </SimpleItem>

                        <SimpleItem dataField="isolated" colSpan={4}>
                            <Label text="Se Aislo" />
                            <StringLengthRule max={250} message="Maximo 250 caracteres maximo" />
                        </SimpleItem>
                        <SimpleItem dataField="mycologycal" colSpan={4}>
                            <Label text="Micologico" />
                            <StringLengthRule max={250} message="Maximo 250 caracteres maximo" />
                        </SimpleItem>
                        <SimpleItem dataField="observation" colSpan={4}>
                            <Label text="Observacion" />
                            <StringLengthRule max={250} message="Maximo 250 caracteres maximo" />
                        </SimpleItem>
                    </GroupItem>
                    <GroupItem colCount={4}>
                        <GroupItem colSpan={2} caption="Antibioticos">
                            <DataGrid
                                selection={{ mode: 'single' }}
                                dataSource={cultivo.serviceTestCultiveAntiBiotics}
                                showBorders={true}
                                showRowLines={true}
                                allowColumnResizing={true}
                                allowColumnReordering={true}
                                onInitNewRow={onInitNewRowAntiBiotics}
                            >
                                <Column dataField="testId" caption="Frescos">
                                    <FormItem colSpan={2} editorOptions={{ dataSource: testAntiBiotics }} editorType="dxAutocomplete" />
                                    <RequiredRule message="Este campo es requerido" />
                                </Column>

                                <Column dataField="resultId" caption="Resistencia">
                                    <RequiredRule message="Este campo es requerido" />
                                    <Lookup disabled={true} dataSource={[
                                        { id: 1, name: 'Sensibilidad' },
                                        { id: 2, name: 'Intermedio' },
                                        { id: 3, name: 'Resistente' }
                                    ]} valueExpr="id" displayExpr="name" />

                                </Column>
                                <Editing
                                    mode="popup"
                                    allowUpdating={true}
                                    allowAdding={true}
                                    selectTextOnEditStart={true}
                                    useIcons={true}
                                >
                                    <PopupGrid showTitle={false} width={550} height={200}>
                                    </PopupGrid>
                                </Editing>
                            </DataGrid>
                        </GroupItem>
                        <GroupItem colSpan={2} caption="Frescos">
                            <DataGrid
                                selection={{ mode: 'single' }}
                                dataSource={cultivo.serviceTestCultiveFrescs}
                                showBorders={true}
                                showRowLines={true}
                                allowColumnResizing={true}
                                allowColumnReordering={true}
                                onInitNewRow={onInitNewRowFresh}
                            >
                                <Column dataField="testId" caption="Frescos" width={70} >
                                    <FormItem colSpan={2} editorOptions={{ dataSource: testFrescs }} editorType="dxAutocomplete" />
                                    <RequiredRule message="Este campo es requerido" />
                                </Column>
                                <Column dataField="resultId" caption="Resultado"  >
                                    <StringLengthRule max={50} message="Maximo de caracteres {50}" />
                                    <RequiredRule message="Este campo es requerido" />
                                    <FormItem colSpan={2} editorOptions={{ dataSource: appearanceBio }} editorType="dxAutocomplete" />
                                </Column>
                                <Editing
                                    mode="popup"
                                    allowUpdating={true}
                                    allowAdding={true}
                                    selectTextOnEditStart={true}
                                    useIcons={true}
                                >
                                    <PopupGrid showTitle={false} width={450} height={200}>
                                    </PopupGrid>
                                </Editing>
                            </DataGrid>
                        </GroupItem>
                    </GroupItem>
                </FormNew>
                <Button
                    text={`${saving ? 'Guardando...' : 'Guardar'}`}
                    type="success"
                    icon="save"
                    stylingMode="contained"
                    className="m-1"
                    disabled={saving}
                    onClick={save}
                />
            </ScrollView>
        </Popup>
    )
}

export default ServiceTest;
