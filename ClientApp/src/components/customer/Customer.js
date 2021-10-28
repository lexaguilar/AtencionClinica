import React, { useEffect, useState } from 'react';
import { custumerDefault } from '../../data/custumer';
import { Button } from 'devextreme-react/button';
import { editorOptionsSelect, cssClasses } from '../../data/app';
import http from '../../utils/http';
import Form, { SimpleItem, GroupItem, Label } from 'devextreme-react/form';
import { createProxyBase, createStoreLocal } from '../../utils/proxy';
import notify from 'devextreme/ui/notify';
import { useSelector } from 'react-redux'
import { TextBox, But } from 'devextreme-react/text-box';
import { CheckBox } from 'devextreme-react';

const Customer = props => {

    const { clear } = useSelector(store => store.customerClear);
    
    const [inss, setInss] = useState(null);
    const [onlyBeneficary, setOnlyBeneficary] = useState(false);
    const [custumer, setCustumer] = useState({...custumerDefault});

    const buscarAsegurado = e =>{        

        const { valueChanged, active = true } = props;

        http(createProxyBase('customers').getById(inss)).asGet({active, onlyBeneficary}).then(data => {
            
            if(valueChanged)
                valueChanged(data);
            
            data.fullName = `${data.firstName} ${data.lastName}`
            setCustumer({...data});

        }).catch(err => {
            
            notify(err, 'error');

            if(valueChanged)
                valueChanged({...custumerDefault});

            setCustumer({...custumerDefault});

        });
        
    }

    const onValueChanged = e =>  setInss(e.value);
    const handleBene = e =>  setOnlyBeneficary(e.value);

    useEffect(()=>{
        
        setCustumer({...custumerDefault});
        setInss(null);
        
    },[clear])

    return (
        <div>
            
            <div className="dx-field">
                <div className="dx-field-cutomer">
                    <div className="row-elemet">
                        <TextBox placeholder="Número INSS o cédula" value={inss} defaultValue={inss} onValueChanged={onValueChanged} />
                        <Button
                            width={150}
                            text="Buscar"
                            type="default"
                            icon='search'
                            onClick={buscarAsegurado}
                        />
                        <CheckBox text='Buscar por beneficiario' rtlEnabled={true} defaultValue={false} value={onlyBeneficary} onValueChanged={handleBene}/>
                        <label className="label-customer">
                            <span className="label-customer-inss">{custumer.inss}</span>
                            <span className="label-customer-patronal">{custumer.patronal}</span>
                        </label>
                    </div>
                </div>
            </div>
            <Form formData={custumer} readOnly={true}>
                <GroupItem cssClass="second-group" colCount={4}>
                    <SimpleItem dataField="fullName" editorType="dxTextBox" colSpan={2}>
                        <Label text="Nombres" />
                    </SimpleItem>                 
                    <SimpleItem dataField="customerTypeId" editorType="dxSelectBox"
                        editorOptions={{                           
                            dataSource: createStoreLocal({ name: 'customerType' }),
                            ...editorOptionsSelect
                        }} >
                        <Label text="Tipo" />
                    </SimpleItem>
                    <SimpleItem dataField="customerStatusId" editorType="dxSelectBox" cssClass={cssClasses[custumer.customerStatusId]}
                        editorOptions={{                           
                            dataSource: createStoreLocal({ name: 'customerStatus' }),    
                            ...editorOptionsSelect
                        }} >
                        <Label text="Estado" />
                    </SimpleItem>
                </GroupItem>
            </Form>

            <br></br>
        </div>
    );
}

export default Customer;
