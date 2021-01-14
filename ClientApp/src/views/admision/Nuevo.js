import React, { useState } from 'react';
import Form, { SimpleItem, GroupItem, Label, RequiredRule, StringLengthRule } from 'devextreme-react/form';
import { createStoreLocal } from '../../utils/proxy';
import { Button } from 'devextreme-react/button';
import http from '../../utils/http';
import { editorOptionsSelect } from '../../data/app';
import uri from '../../utils/uri';
import Title from '../../components/shared/Title';
import BlockHeader from '../../components/shared/BlockHeader';
import Customer from '../../components/customer';
import notify from 'devextreme/ui/notify';
import { estadoAdmision } from '../../data/catalogos';
import CustomButton from '../../components/buttons/CustomButton';
import Beneficiarios from '../beneficiarios';
import { Popup } from 'devextreme-react/popup';
import { _path } from "../../data/headerNavigation";

const Nuevo = props => {
    const [customer, setCustomer] = useState({inss : '',status : false});     
    const [visible, setVisible] = useState(false);     
    const [clear, setClear] = useState(false);     

    

    const [admision, setAdmision] = useState({
        areaId : null,
        beneficiaryId : null,
        specialtyId : null,
        observacion : '',
    });

    const storeTransient = {
        areas: [],
        specialties: [],
    }    

    const guardarAdmision = () => {

        http(uri.admisions.insert).asPost(admision).then(resp => {
            if(resp){
                notify(`Admision ${resp.numberOfDay} creada correctamente`);
                setCustomer({inss : '',status : false});
                setAdmision({
                    areaId : null,
                    beneficiaryId : null,
                    specialtyId : null,
                    observacion : '',
                });
                setClear(!clear);

            }
        }).catch(err => {
            
            notify(err, 'error');

        });

    }

    const valueChanged = custumer => {

        setCustomer({
            inss : custumer.inss,
            status : custumer.customerStatusId == estadoAdmision.activo
        });

    }
    
    const onHiding = (params) => {
        setVisible(false)
    }

    const title = 'Admision';

    return (
        <div className="container">
            <Title title={title} />
            <BlockHeader title='Nueva Admision' >
                <CustomButton
                    text="Crear beneficiario"
                    icon='plus'
                    onClick={()=>setVisible(true)}
                />
            </BlockHeader>
            <Popup
                fullScreen={true}
                width={850}
                height={550}
                onHiding={onHiding}
                title={`Nuevo beneficiario`}
                visible={visible}
                
            >
                <Beneficiarios></Beneficiarios>
            </Popup>
            <Customer valueChanged={valueChanged} clear={clear}></Customer>
            <Form formData={admision}>
                <GroupItem cssClass="second-group" colCount={3}>                    
                    <SimpleItem dataField="beneficiaryId" editorType="dxSelectBox"
                        editorOptions={{                            
                            dataSource: createStoreLocal({ name: 'beneficiary', local: storeTransient, url : uri.beneficarios(customer.inss).getAsCatalog }),                            
                            valueExpr: "id",
                            displayExpr: item => item ? `${item.relationship} - ${item.name}` : '',
                            searchEnabled: true
                            
                        }} >
                        <Label text="Beneficiario" />
                        <RequiredRule message="Seleccione el beneficiario" />
                    </SimpleItem>
                    <SimpleItem dataField="areaId" editorType="dxSelectBox"
                        editorOptions={{
                            dataSource: createStoreLocal({ name: 'area', local: storeTransient }),
                            ...editorOptionsSelect
                        }} >
                        <Label text="Area" />
                        <RequiredRule message="Seleccione el area" />
                    </SimpleItem>
                    <SimpleItem dataField="specialtyId" editorType="dxSelectBox"
                        editorOptions={{
                            dataSource: createStoreLocal({ name: 'specialty', local: storeTransient }),    
                            ...editorOptionsSelect
                        }} >
                        <Label text="Especialidad" />
                        <RequiredRule message="Seleccione el area" />
                    </SimpleItem>
                    <SimpleItem dataField="observacion" colSpan={3}>
                        <StringLengthRule max={250} message="Maximo 250 caracteres" />
                    </SimpleItem>
                </GroupItem>               
            </Form>
            <br/>
            <Button
                width={180}
                text="Guardar admision"
                type="default"
                icon='save'
                disabled={!customer.status}
                onClick={guardarAdmision}                
            />
        </div>
    );
}

export default Nuevo;
