import React, { useState, useEffect, useRef } from 'react';
import { Popup } from 'devextreme-react/popup';
import Form, { SimpleItem, GroupItem, Label, RequiredRule, StringLengthRule } from 'devextreme-react/form';
import { useDispatch, useSelector } from 'react-redux'
import ScrollView from 'devextreme-react/scroll-view';
import { Button } from 'devextreme-react';
import uri from '../../utils/uri';
import { obtenerTasaCambio } from '../../utils/common';
import http from '../../utils/http';
import notify from 'devextreme/ui/notify';
import { dialogWorkOrder } from '../../store/workOrder/workOrderDialogReducer';
import Information from '../../components/beneficiary/Information';
import { createStoreLocal } from '../../utils/proxy';
import { areaRestrict, editorOptionsSelect } from '../../data/app';
import GridMedicamentos from './GridMedicamentos';
import GridProcedimientos from './GridProcedimientos';
import GridListaMedicamentoPte from './GridListaMedicamentoPte';

const Nuevo = props => {   
    
    const { followId, beneficiaryId } = props;
    const [ isClosing, setIsClosing]  = useState(false);

    const { workOrderDialog : { open }, user } = useSelector(store => store);

    const [ workOrder, setWorkOrder ] = useState({});
    const [ saving, setSaving ] = useState(false);
    const [ detailsServices, setDetailsServices ] = useState([]);
    const [ details, setDetails ] = useState([]);

    let refForm = useRef();

    useEffect(() => {      

        obtenerTasaCambio(new Date()).then(rate =>{
            if(rate)
                setWorkOrder({...workOrder, rate : rate.value});
        });  

        setWorkOrder({areaId : user.areaId });
        setDetails([]);
    }, [open]);

    const dispatch = useDispatch();

    const closeDialog = ( load ) => {
        
        refForm.current.instance.resetValues();  
        
        dispatch(dialogWorkOrder({open : false}));
        setIsClosing(true);

        if (load) {
            let { onSave } = props;
            onSave();      
        }        
    }

    const onHiding = ({ load }) => {
       
        closeDialog(load);
    }

    const crearOrdenTrabajo = (e) => {

        let result = refForm.current.instance.validate();

        if (result.isValid) {

            setSaving(true);

            const workOrderDetails = [...details,...detailsServices];

            let data = {...workOrder, followId,  WorkOrderDetails: workOrderDetails };

            http(uri.workOrders.insert).asPost(data).then(resp => {

                setSaving(false);
                notify('Orden de trabajo registrada correctamente');
                closeDialog(true);

            }).catch(err => {
                setSaving(false);
                notify(err, 'error', 5000);
            });

        }

    } 

    const text = 'Guardar orden';  

    return (
        <div>
             <Popup
                width={1050}
                height={695}
                title={`Nueva orden de trabajo`}
                onHiding={onHiding}
                visible={open}    
                showCloseButton={!saving}

            >
                <ScrollView id="scrollview">                    
                    <Information beneficiaryId={beneficiaryId}/>
                    <br />
                    <Form formData={workOrder} ref={refForm}>
                        <GroupItem colCount={3}>                      
                            
                            <SimpleItem dataField="date" editorType="dxDateBox"
                                editorOptions={{
                                    displayFormat : 'dd/MM/yyyy',
                                    openOnFieldClick:true,
                                }} >
                                <Label text="Fecha" />
                                <RequiredRule message="Seleccione la fecha" />
                            </SimpleItem>
                            <SimpleItem dataField="doctorId" colSpan={2} editorType="dxSelectBox"
                                editorOptions={{
                                    dataSource: createStoreLocal({name: 'Doctor', active : true}),
                                    ...editorOptionsSelect
                                }} >
                                <Label text="Doctor" />
                                <RequiredRule message="Seleecione el medico" />
                            </SimpleItem>
                            <SimpleItem dataField="reference">
                                <Label text="Referencia" />
                                <RequiredRule message="Ingrese una referencia" />
                                <StringLengthRule max={20} message="Maximo 20 caracteres" />
                            </SimpleItem>                           
                            <SimpleItem dataField="observation" colSpan={2}>
                                <Label text="Observacion" />
                                <RequiredRule message="Ingrese una observacion" />
                                <StringLengthRule max={500} message="Maximo 500 caracteres" />
                            </SimpleItem>
                            
                        </GroupItem>
                        <GroupItem>
                            <GridMedicamentos 
                                isClosing={isClosing}
                                details={details}
                                user={user}  />
                        </GroupItem>
                        <GroupItem>
                            {areaRestrict.farmacia != user.areaId ?
                                <GridProcedimientos 
                                    isClosing={isClosing}
                                    detailsServices={detailsServices}
                                    user={user}
                                    open={open}
                                    rate={workOrder.rate}
                                />
                            :
                                <GridListaMedicamentoPte beneficiaryId={beneficiaryId} open={open}/>}

                        </GroupItem>
                        
                    </Form>    
                    <Button                    
                        text={`${saving?'Guardando...':text}`}
                        type="success"
                        icon="save"
                        stylingMode="contained"
                        className="m-1"
                        disabled={saving}
                        onClick={crearOrdenTrabajo}
                    /> 
                </ScrollView>
            </Popup>
        </div>
    );
}

export default Nuevo;
