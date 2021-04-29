import React, { useState, useEffect, useRef } from 'react';
import { Popup } from 'devextreme-react/popup';
import Form, { SimpleItem, GroupItem, Label, RequiredRule, StringLengthRule } from 'devextreme-react/form';
import { useDispatch, useSelector } from 'react-redux'
import ScrollView from 'devextreme-react/scroll-view';
import { Button } from 'devextreme-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
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

import 'react-tabs/style/react-tabs.css';

const Nuevo = props => {   
    
    const { followId, beneficiaryId } = props;
    const [ isClosing, setIsClosing]  = useState(false);

    const { workOrderDialog : { open, id }, user } = useSelector(store => store);

    const [tabIndex, setTabIndex] = useState(0);
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

        if(followId > 0){
            //verificar si trae productos preregistrados
            http(`follows/${followId}/getWorkPreOrders`).asGet().then(resp=>{
                console.log(resp);
                if(resp){
                    const { doctorId,  } = resp;
                    setWorkOrder({...workOrder, doctorId });
                    setDetails(resp.workPreOrderDetails.map(x => ({ 
                        productId : x.productId, 
                        quantity : x.quantity, 
                        price: x.price,
                        presentation: x.presentation,
                        um: x.um 
                    })))

                }
            });
        }
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

            http(`${uri.workOrders.insert}?followId=${followId}`).asPost(data).then(resp => {

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

    const isFarmacia = areaRestrict.farmacia == user.areaId;

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
                                <StringLengthRule max={150} message="Maximo 150 caracteres" />
                            </SimpleItem>
                            
                        </GroupItem>

                        <GroupItem>
                            <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                                
                                <TabList>
                                    <Tab>Productos</Tab>
                                    <Tab hidden={isFarmacia}>Procedimientos</Tab>                               
                                </TabList>

                                <TabPanel>   
                                    <GridMedicamentos 
                                        isClosing={isClosing}
                                        
                                        details={details}
                                        user={user}  />  

                                    {isFarmacia &&
                                       
                                        <GridListaMedicamentoPte 
                                            beneficiaryId={beneficiaryId} 
                                            open={open}
                                        />
                                    }
                                </TabPanel>
                                <TabPanel hidden={isFarmacia}>                                    
                                    <GridProcedimientos 
                                        isClosing={isClosing}
                                        detailsServices={detailsServices}
                                        user={user}
                                        open={open}
                                        rate={workOrder.rate}
                                    />
                                    
                                </TabPanel>
                            </Tabs>
                        </GroupItem>
                        <GroupItem>
                            
                        </GroupItem>
                        <GroupItem>
                           

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
