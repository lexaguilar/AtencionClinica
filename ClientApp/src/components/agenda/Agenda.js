import React, { useEffect, useState } from 'react';
import Scheduler, { Resource } from 'devextreme-react/scheduler';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';

import BlockHeader from "../shared/BlockHeader";
import Title from "../shared/Title";
import http from '../../utils/http';
import uri from '../../utils/uri';

const Agenda = props => {

    const [ doctores, setDoctores ] = useState([]);
    const [ clientes, setClientes ] = useState([]);
    const [ actividades, setActividades ] = useState([]);

    const title = "Agenda";
    const views = ['day', 'week', 'month', 'timelineDay', 'agenda'];
    const currentDate = new Date(2021, 4, 25);



    const dataSource = AspNetData.createStore({
        key: 'id',
        loadUrl: `api/${uri.agendas.get}` ,
        insertUrl: `api/${uri.agendas.insert}`,
        updateUrl: `api/${uri.agendas.insert}`,
        //deleteUrl: uri.agendas.remove(),
      });

    useEffect(()=>{

        Promise.all(
            [
                http(uri.actividades.get).asGet(data => data), 
                http(uri.doctores.get).asGet(data => data),
                http(`clientes/catalogo`).asGet(data => data),
            ]
        ).then(result => {             

            setActividades(result[0]);
            setDoctores(result[1]);
            setClientes(result[2]);

        });

    },[]);

    const onAppointmentFormOpening = data => {

        console.log(data);

        let form = data.form;
         // movieInfo = getMovieById(data.appointmentData.movieId) || {},
         // startDate = data.appointmentData.startDate;
    
        form.option('items', [{
            label: {
                text: 'Cliente'
            },
            editorType: 'dxSelectBox',
            dataField: 'clienteId',
            editorOptions: {
                items: clientes,
                displayExpr: 'nombre',
                valueExpr: 'id',          
            },
        }, {
            label: {
                text: 'Doctor'
            },
            editorType: 'dxSelectBox',
            dataField: 'doctorId',
            editorOptions: {
              items: doctores,
              displayExpr: 'nombre',
              valueExpr: 'id',          
            },
        }, {
            label: {
                text: 'Actividad'
            },
            editorType: 'dxSelectBox',
            dataField: 'actividadId',
            editorOptions: {
              items: actividades,
              displayExpr: 'descripcion',
              valueExpr: 'id',          
            },
        },  {
          label: {
            text: 'Nota'
          },
          name: 'nota',
          editorType: 'dxTextBox'
        }, {
          dataField: 'fechaHora',
          editorType: 'dxDateBox',
          editorOptions: {
            width: '100%',
            type: 'datetime',
            // onValueChanged: function(args) {
            //   startDate = args.value;
            //   form.getEditor('endDate')
            //     .option('value', new Date(startDate.getTime() +
            //       60 * 1000 * movieInfo.duration));
            // }
          }
        }
        ]);

      }

    return (
        <div className="container">
            <Title title={title}/>
            <BlockHeader title={title}/>      
            <Scheduler
                dataSource={dataSource}
                views={views}
                defaultCurrentView="day"
                defaultCurrentDate={currentDate}
                //groups={groups}
                height={600}
                firstDayOfWeek={0}
                startDayHour={9}
                endDayHour={23}
                showAllDayPanel={false}
                crossScrollingEnabled={true}
                cellDuration={20}
                //editing={{ allowAdding: false }}
                //appointmentComponent={Appointment}
                onAppointmentFormOpening={onAppointmentFormOpening}
            >
                <Resource
                    dataSource={doctores}
                    fieldExpr="doctorId"
                    useColorAsDefault={true}
                />
                <Resource
                    dataSource={clientes}
                    fieldExpr="clienteId"
                />
            </Scheduler>
        </div>
    );
}

export default Agenda;
