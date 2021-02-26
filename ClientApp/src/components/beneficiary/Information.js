import { Form } from 'devextreme-react';
import { GroupItem, Label, SimpleItem } from 'devextreme-react/form';
import React, { useEffect, useState } from 'react';
import http from '../../utils/http';
import uri from '../../utils/uri';

const Information = (props) => {

    const { beneficiaryId } = props;

    const [beneficary, setBeneficary] = useState({});

    useEffect(() => {
        if(beneficiaryId)
            http(uri.beneficarios(0).getInfo(beneficiaryId)).asGet().then(resp => setBeneficary(resp))

    }, [beneficiaryId]);

    return (
        <Form formData={beneficary} readOnly={true}>
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
