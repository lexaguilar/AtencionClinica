import React, { useState } from 'react';
import Form, { SimpleItem, GroupItem, Label, RequiredRule, StringLengthRule } from 'devextreme-react/form';
import { createStoreLocal } from '../../utils/proxy';
import { Button } from 'devextreme-react/button';
import http from '../../utils/http';
import { editorOptionsSelect } from '../../data/app';
import uri from '../../utils/uri';
import Title from '../../components/shared/Title';
import BlockHeader from '../../components/shared/BlockHeader';
import Customer from '../../components/customer';
import notify from 'devextreme/ui/notify';
import { estadoAdmision } from '../../data/catalogos';
import { _path } from "../../data/headerNavigation";
import Box, { Item } from 'devextreme-react/box';
import Calendar from 'devextreme-react/calendar';
import { appointmentDefault } from '../../data/appointment';
import { useDispatch, useSelector } from 'react-redux'
import { clearCustomer } from '../../store/customer/customerReducer';
import PopupBeneficiary from '../../components/beneficiary/PopupBeneficiary';
import { getDayInLastWeek, getWeekOfMonth, getWeeksOfMonth } from '../../utils/common';
import List from 'devextreme-react/list';
import moment from 'moment';

const Nuevo = props => {

    const dispatch = useDispatch();
    const { clear } = useSelector(store => store.customerClear);
    
    const [customer, setCustomer] = useState({ inss: '', status: false });
    const [loading, setLoading] = useState(false);
    const [appointment, setAppointment] = useState({...appointmentDefault});
    const [citas, setCitas] = useState([]);
    const [time, setTime] = useState({
        countBeneficiarios: 0,
        days: "",
        doctorId: 0,
        startHour: null
    });
    
    let refCitas = React.createRef();    
    let hour = null;

    const storeTransient = {
        areas: [],
        specialties: [],
    }

    const minDateValue = new Date();
    let disabledDates = (data) => data.view === 'month' && isWeekend(data.date);
    let weeks = getWeeksOfMonth(minDateValue);    
    let dayInLastWeek = null;

    const guardaCita = () => {
        console.log(appointment);
        let result = refCitas.instance.validate();

        if (result.isValid) {
            if(hour){
                let lastDate = appointment.dateAppointment;
                appointment.dateAppointment = moment(new Date(
                    appointment.dateAppointment.getFullYear(),
                    appointment.dateAppointment.getMonth(),
                    appointment.dateAppointment.getDate(),  
                    hour.getHours(),          
                    hour.getMinutes()          
                )).format('YYYY-MM-DD hh:mm');
                
                setLoading(true);
                http(uri.appointments.insert).asPost(appointment).then(resp => {
                    if (resp) {
                    
                        setLoading(false);
                        notify(`Cita creada correctamente`);
                        
                        setCustomer({ inss: '', status: false });
                        
                        setAppointment({...appointmentDefault});

                        setCitas([]);
                        
                        dispatch(clearCustomer({clear : !clear}));
                    
                    }
                }).catch(err => {
                    
                    notify(err, 'error');
                    setLoading(false);
                    appointment.dateAppointment = lastDate;
                    
                });
            }else
                notify('Debe seleccionar una hora','error');
        }
    }

    const valueChanged = custumer => {

        setCustomer({
            inss: custumer.inss,
            status: custumer.customerStatusId == estadoAdmision.activo
        });

    }

    const onValueChangedDateAppointment = (e) => {
      
       if(appointment.doctorId && appointment.specialtyId){

            let data = {
                date : moment(e.value).format('YYYY-MM-DD'), 
                doctorId : appointment.doctorId, 
                specialtyId : appointment.specialtyId
            };

           http('appointments/getTimes').asGet(data).then(resp => {
               setCitas(resp);
            });
        }

    }

    const onValueChangedDoctor = (e) => {
        setCitas([]);
        if(e.value)
            http(uri.doctores.times(e.value)).asGet()
            .then(resp => {
                setTime(resp);
            }).catch(err => {
                notify(err, 'error')
            });

    }
    
    const onValueChangedSpecialty = (e) => {

        setAppointment({
            ...appointment,
            specialtyId : e.value,
            doctorId :null
        });

        setCitas([]);

    }

    const onOptionChanged = (e) => {

        // if(e.name == 'currentDate')
        //     dayInLastWeek = getDayInLastWeek(e.value, 1);
    }

    const isWeekend = (date) => {
        const day = date.getDay();
        return day === 0 || day === 6;
        //console.log(date);
        //return false;
        
        
        // if(!time.doctorId) return false;

        // const days = date.getDay();
        // const week = getWeekOfMonth(date);

        // let regDays = /{days}/g;
        // let regWeeks = /{week}/g;
        // let regLastWeeks = /{lastWeek}/g;
        // let result = time.days.replace(regDays, days);

        // if(time.days.includes('{week}')){
        //     if(dayInLastWeek == null){
        //         dayInLastWeek = getDayInLastWeek(date, 1);
        //     }
        //     result = result.replace(regWeeks, week).replace(regLastWeeks, dayInLastWeek);
        // }

        // let disable = !eval(result);

        // console.log(date);
        // console.log(result);
        // console.log(week);
        // console.log(dayInLastWeek);
        // console.log(disable);
        
        // return disable;
    }

    const itemRender = (item) => {
        return (
            <div className="citas-lista">              
              <div className="cita-hora">{moment(item.time).format('hh:mm a')}</div>
              <div className="cita-beneficiary">{item.nombre == '' ? 'Disponible' : `${item.tipo} - ${item.nombre}` }</div>
            </div>
          );
    }

    const onOptionChangedHour = (e) => {
        if(e.addedItems.length > 0)
            hour =new Date(e.addedItems[0].time);
        else
            hour = null;
        console.log(hour);
    }

    const title = 'Citas';

    return (
        <div className="container">
            <Title title={title} />
            <BlockHeader title='Nueva Cita' >              
                <PopupBeneficiary />
            </BlockHeader>
            <Customer valueChanged={valueChanged}></Customer>
            <Form formData={appointment} ref={ref => refCitas = ref} height={400}>
                <GroupItem cssClass="second-group" colCount={4}>
                    <SimpleItem dataField="beneficiaryId" colSpan={2} editorType="dxSelectBox"
                        editorOptions={{
                            dataSource: createStoreLocal({ name: 'beneficiary', local: storeTransient, url: uri.beneficarios(customer.inss).getAsCatalog }),
                            valueExpr: "id",
                            displayExpr: item => item ? `${item.relationship} - ${item.name}` : '',
                            searchEnabled: true,
                        }} >
                        <Label text="Beneficiario" />
                        <RequiredRule message="Seleccione el beneficiario" />
                    </SimpleItem>                  
                    <SimpleItem dataField="specialtyId" colSpan={2} editorType="dxSelectBox"
                        editorOptions={{
                            dataSource: createStoreLocal({ name: 'specialty', local: storeTransient }),
                            ...editorOptionsSelect,
                            onValueChanged: onValueChangedSpecialty,
                        }} >
                        <Label text="Especialidad" />
                        <RequiredRule message="Seleccione la especialidad" />
                    </SimpleItem>
                    <SimpleItem dataField="doctorId" colSpan={2} editorType="dxSelectBox"
                        editorOptions={{
                            dataSource: createStoreLocal({ name: 'doctor', local: storeTransient, url: uri.doctores.forSpecialty(appointment.specialtyId) }),
                            ...editorOptionsSelect,
                            onValueChanged:onValueChangedDoctor
                        }} >
                        <Label text="Doctor" />
                        <RequiredRule message="Seleccione el area" />
                    </SimpleItem>                   
                    <SimpleItem dataField="observation" colSpan={2}>
                        <StringLengthRule max={250} message="Maximo 250 caracteres" />
                        <Label text="Observacion" />
                    </SimpleItem>                   
                    <SimpleItem dataField="dateAppointment" colSpan={2} editorType="dxCalendar" 
                        editorOptions={{
                            onValueChanged : onValueChangedDateAppointment,      
                            min : minDateValue,
                            disabledDates : disabledDates,
                            onOptionChanged : onOptionChanged,
                            disabled : !appointment.doctorId || !appointment.specialtyId
                        }} >
                        <Label text="Calendario" />
                    </SimpleItem>
                    <GroupItem cssClass="second-group" colSpan={2} caption="Horario">                        
                        <List                            
                            dataSource={citas}
                            height={400}
                            showSelectionControls={true}
                            selectionMode='single'
                            itemRender={itemRender}
                            onSelectionChanged={onOptionChangedHour}
                            >
                        </List>
                        
                    </GroupItem>
                </GroupItem>
            </Form>     
            <Button
                width={180}
                text={loading ? 'Guardando...' : 'Guardar cita'}
                type="default"
                icon='save'
                disabled={!customer.status || loading}
                onClick={guardaCita}
            />
            
        </div>
    );
}

export default Nuevo;
