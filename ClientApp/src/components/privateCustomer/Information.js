import { Form } from 'devextreme-react';
import { GroupItem, Label, SimpleItem } from 'devextreme-react/form';
import React, { useEffect, useState } from 'react';
import http from '../../utils/http';
import uri from '../../utils/uri';

const Information = props => {

    const { customerId } = props;

    const [customer, setCustomer] = useState({});

    useEffect(() => {
        if(customerId)
            http(uri.privateCustomers().getInfo(customerId)).asGet().then(resp => setCustomer(resp))

    }, [customerId]);

    return (
        <Form formData={customer} readOnly={true}>
            <GroupItem colCount={4}>
                <SimpleItem dataField="name" colSpan={2}>
                    <Label text="Paciente"></Label>
                </SimpleItem>
                <SimpleItem dataField="type">
                    <Label text="Tipo"></Label>
                </SimpleItem>
                <SimpleItem dataField="status" cssClass="custome-active">
                    <Label text="Estado"></Label>
                </SimpleItem>
            </GroupItem>
        </Form>
    );
}

export default Information;