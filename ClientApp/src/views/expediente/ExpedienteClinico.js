import React, { useState } from 'react';
import Form, { SimpleItem, GroupItem, Label } from 'devextreme-react/form';
import Customer from '../../components/customer';
import BlockHeader from '../../components/shared/BlockHeader';
import Title from '../../components/shared/Title';
import { estadoAdmision } from '../../data/catalogos';
import { createStoreLocal } from '../../utils/proxy';
import uri from '../../utils/uri';
import GridListaMedicamentoPte from '../workOrders/GridListaMedicamentoPte';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const ExpedienteClinico = () => {

    const [customer, setCustomer] = useState({ inss: '', status: false });
    const [beneficiaryId, setBeneficiaryId] = useState(0);
    const [tabIndex, setTabIndex] = useState(0);

    const valueChanged = custumer => {       

        setCustomer({
            inss: custumer.inss,
            status: custumer.customerStatusId == estadoAdmision.activo
        });

    }

    const onValueChanged = (e) => {
        console.log(e);
        setBeneficiaryId(e.value);
    }

    const title = "Expediente clinico";

    return (
        <div className="container">
            <Title title={title} />
            <BlockHeader title={title} >
            </BlockHeader>
            <Customer valueChanged={valueChanged} active={false}></Customer>
            <Form>
                <GroupItem cssClass="second-group" colCount={4}>
                    <SimpleItem dataField="beneficiaryId" colSpan={2} editorType="dxSelectBox"
                        editorOptions={{
                            dataSource: customer.inss == '' ? [] : createStoreLocal({ name: 'beneficiary', url: uri.beneficarios(customer.inss).getAsCatalog }),
                            valueExpr: "id",
                            displayExpr: item => item ? `${item.relationship} - ${item.name}` : '',
                            searchEnabled: true,
                            onValueChanged: onValueChanged,
                            noDataText: customer.inss == '' ? 'Busque un asegurado primero' : 'No hay beneficiarios agregado'
                        }} >
                        <Label text="Beneficiario" />
                    </SimpleItem>
                </GroupItem>
                <GroupItem>
                    <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>

                        <TabList>
                            <Tab>Medicamentos</Tab>
                            <Tab>Examenes</Tab>
                            <Tab>Admisiones</Tab>
                            <Tab>Citas</Tab>
                        </TabList>
                        <TabPanel>

                            <GridListaMedicamentoPte
                                beneficiaryId={beneficiaryId}                                    
                            />                           

                        </TabPanel>
                        <TabPanel>
                           

                               
                            
                        </TabPanel>
                    </Tabs>
                </GroupItem>
            </Form>

        </div>
    );
}

export default ExpedienteClinico;
