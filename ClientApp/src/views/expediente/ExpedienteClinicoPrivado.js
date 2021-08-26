import React, { useRef, useState } from 'react';
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
import DropDownClients from '../../components/dropdown/DropDownClients';
import { DivForm } from '../../utils/divHelpers';

const ExpedienteClinicoPrivado = () => {

    const [tabIndex, setTabIndex] = useState(0);
    const  [ customerId, setCustomerId ] = useState(0);
    let dropDownBoxRef = useRef();

    const changeHandler = (e) => {
        setCustomerId(e.value);
    } 


    const title = "Expediente clinico privado";

    return (
        <div className="container">
            <Title title={title} />
            <BlockHeader title={title} >
            </BlockHeader>
            <form>
                <div className="dx-fieldset">
                
                <DivForm title='Paciente' required>
                    <DropDownClients dropDownBoxRef={dropDownBoxRef} changeHandler={changeHandler} />
                </DivForm>
                
                </div>
                
                    <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>

                        <TabList>
                            <Tab>Medicamentos</Tab>
                            <Tab>Examenes</Tab>
                            <Tab>Facturas</Tab>
                        </TabList>
                        <TabPanel>
                            <GridListaMedicamentoPte customerId={customerId} />
                        </TabPanel>
                        <TabPanel>

                        </TabPanel>
                    </Tabs>
            </form>

        </div>
    );
}

export default ExpedienteClinicoPrivado;
