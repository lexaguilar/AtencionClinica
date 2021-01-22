import React, { useState } from 'react';
import { Popup } from 'devextreme-react/popup';
import { Button } from 'devextreme-react/button';
import Form, { SimpleItem, GroupItem, Label, AsyncRule,RequiredRule } from 'devextreme-react/form';
import { useSelector, useDispatch } from 'react-redux';
import { updateSubsidio } from '../../store/subsidio/subsidioActions';
import Customer from '../../components/customer';
import { estadoCustomer } from '../../data/catalogos';
import { createStore, createStoreLocal } from '../../utils/proxy';
import uri from '../../utils/uri';
import { editorOptionsSelect, formatDate } from '../../data/app';
import moment from 'moment';
import http from '../../utils/http';
import notify from 'devextreme/ui/notify';
import DropDownBox from 'devextreme-react/drop-down-box';
import { store } from '../../services/store';
import DataSource from "devextreme/data/data_source";

const Nuevo = props => {

    const [subsidy, setSubsidy] = useState({});
    const [customer, setCustomer] = useState({inss : '',status : false});     
    const [clear, setClear] = useState(false);     

    const dispatch = useDispatch();
    const { open } = useSelector(store => store.subsidio);

    let refSubsidy = React.createRef(); 

    const closeDialog = ( load ) => {
        setClear(!clear);
        dispatch(updateSubsidio({open : false}));

        if (load) {

            let { onSave } = props;
            onSave();
      
        }
    }

    const onHiding = ({ load }) => {

        refSubsidy.instance.resetValues();

        closeDialog(load);
        
    }

    const valueChanged = custumer => {

        setCustomer({
            inss : custumer.inss,
            status : custumer.customerStatusId == estadoCustomer.activo
        });

    }

    const onDateChange = (params) => {
        
        const { dateStart, dateEnd } = subsidy;

        
        if(dateStart && dateEnd){

            let b = moment(dateEnd);
            let a = moment(dateStart);
            
            let result = b.diff(a, 'days');
            setSubsidy({...subsidy, days : result + 1})

        }

    }

    const guardarSubsidio = (params) => {

        let result = refSubsidy.instance.validate();
        if (result.isValid) {

            http(uri.subsidies.insert).asPost(subsidy)
            .then(resp => {
                if(resp){
                    notify(`Admisioin con boleta ${resp.reference} creada correctamente`);
                    setCustomer({inss : '',status : false});
                    setSubsidy({});
                    closeDialog(true);
                }
            })
            .catch(err => notify(err,'error'))

        }
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
                <Customer valueChanged={valueChanged} clear={clear}></Customer>
                <Form formData={subsidy} ref={ref => refSubsidy = ref}>
                    
                    <GroupItem cssClass="second-group" colCount={3}>
                        <GroupItem colSpan={2} colCount={2}>
                            <SimpleItem dataField="beneficiaryId" editorType="dxSelectBox" colSpan={2}
                                editorOptions={{                            
                                    dataSource: customer.inss == '' ? [] : createStoreLocal({ name: 'beneficiary', url : uri.beneficarios(customer.inss).getAsCatalog }),                            
                                    valueExpr: "id",
                                    displayExpr: item => item ? `${item.relationship} - ${item.name}` : '',
                                    searchEnabled: true,
                                    noDataText : customer.inss == ''? 'Busque un asegurado primero' : 'No hay beneficiarios agregado'
                                }} >
                                <Label text="Beneficiario" />
                                <RequiredRule message="Seleccione el beneficiario" />
                            </SimpleItem>
                            <SimpleItem
                                dataField="dateStart"
                                editorType="dxDateBox"
                                editorOptions={{                      
                                    displayFormat: formatDate,
                                    onValueChanged : onDateChange
                                }}
                            >
                                <Label text="Fecha de inicio" />
                                <RequiredRule message="Fecha de inicio" />
                            </SimpleItem>
                            <SimpleItem
                                dataField="dateEnd"
                                editorType="dxDateBox"
                                editorOptions={{                      
                                    displayFormat: formatDate,
                                    onValueChanged : onDateChange
                                }}
                            >
                                <Label text="Fecha final" />
                                <RequiredRule message="Fecha final" />
                            </SimpleItem>
                            <SimpleItem dataField="areaId" editorType="dxSelectBox" colSpan={2}
                                editorOptions={{
                                    dataSource: createStoreLocal({ name: 'area'}),
                                    ...editorOptionsSelect
                                }} >
                                <Label text="Area" />
                                <RequiredRule message="Seleccione el area" />
                            </SimpleItem>
                        
                            <SimpleItem dataField="doctorId" editorType="dxSelectBox" colSpan={2} 
                                editorOptions={{
                                    dataSource: createStoreLocal({ name: 'doctor' }),
                                    ...{...editorOptionsSelect, width: '100%'}
                                }} >
                                <Label text="Doctor" />
                                <RequiredRule message="Seleccione el doctor" />
                            </SimpleItem>                            
                            <SimpleItem dataField="cie10Id" editorType="dxSelectBox" colSpan={2}
                                editorOptions={{
                                    dataSource: new DataSource({
                                        load: (loadOptions) => {

                                            let params = {};
                                            params.skip = loadOptions.skip || 0;
                                            params.take = loadOptions.take || 10;

                                            if(loadOptions.searchValue)
                                                params.name = loadOptions.searchValue  ;

                                            return http(uri.cie10.get)
                                            .asGet(params).then(x => x.items);
                                            
                                        },
                                        paginate : true,
                                        pageSize: 10
                                    }),
                                    valueExpr:"id",
                                    displayExpr: item => item ? `${item.id} - ${item.name}` : '',
                                    searchEnabled: true
                                }} >
                                <Label text="Dianostico" />
                                <RequiredRule message="Seleccione el area" />
                            </SimpleItem>
                        </GroupItem>
                        <GroupItem >

                            <SimpleItem dataField="reference"><Label text="Boleta" />
                                <RequiredRule message="El numero de la boleta" />
                            </SimpleItem>
                        
                            <SimpleItem dataField="days" editorOptions={{disabled:true}}><Label text="Dias" /></SimpleItem>
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
                    disabled={!customer.status}
                    onClick={guardarSubsidio}
                />
            </Popup>
        </div>
    );
}

export default Nuevo;
