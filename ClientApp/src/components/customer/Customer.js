import React, { useEffect, useState } from 'react';
import { custumerDefault } from '../../data/custumer';
import { NumberBox } from 'devextreme-react/number-box';
import { Button } from 'devextreme-react/button';
import { editorOptionsSelect, cssClasses } from '../../data/app';
import http from '../../utils/http';
import Form, { SimpleItem, GroupItem, Label } from 'devextreme-react/form';
import { createProxyBase, createStoreLocal } from '../../utils/proxy';
import notify from 'devextreme/ui/notify';

const Customer = props => {
    
    const [inss, setInss] = useState(props.inss);
    const [custumer, setCustumer] = useState({...custumerDefault});

    const buscarAsegurado = e =>{

        const { valueChanged } = props;

        http(createProxyBase('customers').getById(inss)).asGet().then(data => {
            
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

    const storeTransient = {
        areas: [],
        specialties: [],
    }  

    const onValueChanged = e => {   
        
       setInss(e.value);
      
    }

    return (
        <div>
            
            <div className="dx-field">
                <div className="dx-field-label">
                    <label>Número de Inss</label>
                    <div className="row-elemet">
                        <NumberBox placeholder="Ingrese el numero INSS" value={inss} defaultValue={inss} onValueChanged={onValueChanged} />
                        <Button
                            width={120}
                            text="Buscar"
                            type="success"
                            icon='search'
                            onClick={buscarAsegurado}
                        />
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
                            dataSource: createStoreLocal({ name: 'CustomerType', local: storeTransient }),
                            ...editorOptionsSelect
                        }} >
                        <Label text="Tipo" />
                    </SimpleItem>
                    <SimpleItem dataField="customerStatusId" editorType="dxSelectBox" cssClass={cssClasses[custumer.customerStatusId]}
                        editorOptions={{                           
                            dataSource: createStoreLocal({ name: 'customerStatus', local: storeTransient }),    
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
