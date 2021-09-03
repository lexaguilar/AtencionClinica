import React, { useEffect, useRef, useState } from 'react';
import Form, {
    ButtonItem,
    SimpleItem,
    GroupItem,
    Label,
    EmailRule,
    RequiredRule,
    AsyncRule,
    
} from 'devextreme-react/form';
import { dataAccess, editorOptionsNumberBox, editorOptionsSelect, editorOptionsSwitch, resources } from '../../data/app';
import useAuthorization from '../../hooks/useAuthorization';
import { Button, NumberBox, Switch, Validator, SelectBox } from 'devextreme-react';
import http from '../../utils/http';
import notify from 'devextreme/ui/notify';
import { useSelector,useDispatch } from 'react-redux';
import { setAppInfo } from '../../store/app/appActions';
import { DivFormColumns } from "../../components/form/DivForm";
import { createStoreLocal } from '../../utils/proxy';

const AppConfig = () => {

    const { authorized } = useAuthorization([resources.app, dataAccess.access ]);
    const [saving, setSaving] = useState({
        loading : false,
        text : 'Guardar'
    });

    const dispatch = useDispatch();
    const { appInfo } = useSelector(store => store); 
    
    const [app, setApp] = useState({...appInfo});
    const refForm = useRef();

    const onFormSubmit = (e) => {

        e.preventDefault();

        setSaving({loading : true, text:'Guardando...'});
        http('about/set-info').asPost(app).then(resp => {

            notify('Datos actualizados');
            setSaving({loading : false, text:'Guardar'});
            dispatch(setAppInfo(app));
            
        }).catch(err => {

            notify(err, 'error');
            setSaving({loading : false, text:'Guardar'});

        });
    }

    useEffect(() => {
        setApp({...app, ...appInfo});
    }, [appInfo]);   

    return authorized(
        <div className="container small">
            <form onSubmit={onFormSubmit}>
                <div className="dx-fieldset">
                    <div className="dx-fieldset-header">Configuracion de la aplicacion</div>
                    <DivFormColumns title='Validar precio'
                        description="Validar que el precio sea mayor al costo?">                        
                        <Switch style={{ float : "left" }}                        
                            value={app.validatePriceGreaterCost}                           
                            onValueChanged={e => setApp(app => ({ ...app, validatePriceGreaterCost: e.value }))}     
                            {...editorOptionsSwitch}                      
                        >                            
                        </Switch>
                    </DivFormColumns>                   
                    <DivFormColumns title='Edad maxima para hijos'
                        description="Edad maxima para beneficiarios hijo">                        
                        <NumberBox                            
                            value={app.minAgeToAdmission}                           
                            onValueChanged={e => setApp(app => ({ ...app, minAgeToAdmission: e.value }))}
                            {...editorOptionsNumberBox}
                        >
                            <Validator>
                                <RequiredRule message="Este campo es requerido" />
                            </Validator>
                        </NumberBox>
                    </DivFormColumns>
                    <DivFormColumns title='Hora de diferencias'
                        description="Indica hasta cuantas horas el beneficiario puede retirar medicamentos">                        
                        <NumberBox                            
                            value={app.admissionHoursDifferent}                           
                            onValueChanged={e => setApp(app => ({ ...app, admissionHoursDifferent: e.value }))}
                            {...editorOptionsNumberBox}
                        >
                            <Validator>
                                <RequiredRule message="Este campo es requerido" />
                            </Validator>
                        </NumberBox>
                    </DivFormColumns>
                    <DivFormColumns title='Doctor Hemodialisis' required
                        description="Seleccione el doc que de hemodialisis">                      
                        <SelectBox                                       
                            dataSource= {createStoreLocal({ name: 'Doctor', active: true })}
                            value={app.areaDoctorId}                            
                            onValueChanged={e => setApp(app => ({ ...app, areaDoctorId: e.value }))}
                            {...editorOptionsSelect}
                        >
                            <Validator>
                                <RequiredRule message="Este campo es requerido" />
                            </Validator>
                        </SelectBox>
                    </DivFormColumns>
                    
                </div>
                <Button 
                    icon='save'
                    text={saving.text} 
                    disabled={saving.loading}
                    type="default"                     
                    useSubmitBehavior={true}>
                </Button>
            </form>           
        </div>
    );
}

export default AppConfig;
