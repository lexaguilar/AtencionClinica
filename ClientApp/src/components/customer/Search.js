import React from 'react';
import { NumberBox } from 'devextreme-react/number-box';
import { Button } from 'devextreme-react/button';
import { useSelector, useDispatch } from 'react-redux'
import http from '../../utils/http';
import * as action from '../../store/inss/inssActions';
import { updateCustomer } from '../../store/customer/customerActions';
import { createProxyBase } from '../../utils/proxy';
import notify from 'devextreme/ui/notify';
import { custumerDefault } from '../../data/custumer';

const Search = () => {
    const dispatch = useDispatch();
    const inss = useSelector(store => store.inss); 

    const buscarAsegurado = e => {

        http(createProxyBase('customers').getById(inss)).asGet().then(data => {

      
            data.fullName = `${data.firstName} ${data.lastName}`;
            dispatch(updateCustomer(data));

        }).catch(err => {

            notify(err, 'error');         
            dispatch(updateCustomer({ ...custumerDefault }));

        });

    }

    const onValueChanged = e => {

        dispatch(action.updateInss(e.value));

    }


    return (
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
    );
}

export default Search;
