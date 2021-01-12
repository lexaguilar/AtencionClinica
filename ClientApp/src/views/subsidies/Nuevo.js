import React, { useState } from 'react';
import { Popup } from 'devextreme-react/popup';
import { Button } from 'devextreme-react/button';
import Form, { SimpleItem, GroupItem, Label, AsyncRule,RequiredRule } from 'devextreme-react/form';
import { useSelector, useDispatch } from 'react-redux'
import { updateSubsidio } from '../../store/subsidio/subsidioActions';
import Customer from '../../components/customer';
import { estadoCustomer } from '../../data/catalogos';
import { createStoreLocal } from '../../utils/proxy';
import uri from '../../utils/uri';
import { editorOptionsSelect } from '../../data/app';
const Nuevo = props => {

    const [subsidy, setSubsidy] = useState({});
    const [customer, setCustomer] = useState({inss : '',status : false});     

    const dispatch = useDispatch();
    const { open } = useSelector(store => store.subsidio)

    let refSubsidy = React.createRef();
    const storeTransient = {
        areas: [],
        specialties: [],
    }  

    const onHiding = ({ cancel }) => {

        refSubsidy.instance.resetValues();

        dispatch(updateSubsidio({open : false}));

        if (cancel) {

            let { onSave } = props;
            onSave();
      
        }
        
    }

    const valueChanged = custumer => {

        setCustomer({
            inss : custumer.inss,
            status : custumer.customerStatusId == estadoCustomer.activo
        });

    }

    return (
        <div>
            <Popup
                width={950}
                height={550}
                title={`Nuevo subsidio`}
                onHiding={onHiding}
                visible={open}
            >
                <Customer valueChanged={valueChanged}></Customer>
                <Form formData={subsidy} ref={ref => refSubsidy = ref}>
                    
                    <GroupItem cssClass="second-group" colCount={3}>
                        <GroupItem colSpan={2} colCount={2}>
                            <SimpleItem dataField="beneficiaryId" editorType="dxSelectBox" colSpan={2}
                                editorOptions={{                            
                                    dataSource: createStoreLocal({ name: 'beneficiary', local: storeTransient, url : uri.beneficarios(customer.inss).getAsCatalog }),                            
                                    valueExpr: "id",
                                    displayExpr: item => item ? `${item.relationship} - ${item.name}` : '',
                                    searchEnabled: true
                                    
                                }} >
                                <Label text="Beneficiario" />
                                <RequiredRule message="Seleccione el beneficiario" />
                            </SimpleItem>
                            <SimpleItem
                                dataField="dateStart"
                                editorType="dxDateBox"
                                editorOptions={{                      
                                    displayFormat: "dd/MM/yyyy"
                                }}
                            >
                                <RequiredRule message="Fecha de inicio" />
                            </SimpleItem>
                            <SimpleItem
                                dataField="dateEnd"
                                editorType="dxDateBox"
                                editorOptions={{                      
                                    displayFormat: "dd/MM/yyyy"
                                }}
                            >
                                <RequiredRule message="Fecha final" />
                            </SimpleItem>
                            <SimpleItem dataField="areaId" editorType="dxSelectBox" colSpan={2}
                                editorOptions={{
                                    dataSource: createStoreLocal({ name: 'area', local: storeTransient }),
                                    ...editorOptionsSelect
                                }} >
                                <Label text="Area" />
                                <RequiredRule message="Seleccione el area" />
                            </SimpleItem>
                        
                            <SimpleItem dataField="doctorId" editorType="dxSelectBox" colSpan={2} 
                                editorOptions={{
                                    dataSource: createStoreLocal({ name: 'doctor', local: storeTransient }),
                                    ...{...editorOptionsSelect, width: '100%'}
                                }} >
                                <Label text="Doctor" />
                                <RequiredRule message="Seleccione el area" />
                            </SimpleItem>
                            <SimpleItem dataField="cie10Id" editorType="dxSelectBox" colSpan={2}
                                editorOptions={{
                                    dataSource: createStoreLocal({ name: 'cie10', local: storeTransient }),
                                    ...editorOptionsSelect
                                }} >
                                <Label text="Dianostico" />
                                <RequiredRule message="Seleccione el area" />
                            </SimpleItem>
                        </GroupItem>
                        <GroupItem >

                            <SimpleItem dataField="reference"><Label text="Boleta" /></SimpleItem>
                        
                            <SimpleItem dataField="days"><Label text="Dias" /></SimpleItem>
                        </GroupItem>
                        <SimpleItem dataField="observation" colSpan={3}>
                            <Label text="Observacion" />
                        </SimpleItem>    
                    </GroupItem>
                </Form>
                <Button
                    width={120}
                    text="Guardar"
                    type="default"
                    icon="save"
                    stylingMode="contained"
                    className="m-1"
                />
            </Popup>
        </div>
    );
}

export default Nuevo;
