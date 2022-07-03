import React, { useRef, useState } from 'react';
import { DateBox, Button, Switch } from "devextreme-react";
import Box, {  Item } from 'devextreme-react/box';
import moment from 'moment';

import { formatDate } from '../../../data/app';
import Title from '../../../components/shared/Title';
import BlockHeader from '../../../components/shared/BlockHeader';
import urlReport from '../../../services/reportServices';
import DropDownClients from '../../../components/dropdown/DropDownClients';
import SelectServicesByArea from '../../../components/dropdown/SelectServicesByArea';
  
const Nefrologia = () => {

    const [date, setDate] = useState({ from: null, to: null, onlyIngreso: true, customerId : 0, serviceId : 0 });   

    const generateReport = () => {

        const from = moment(date.from).format('YYYY-MM-DD');
        const to = moment(date.to).format('YYYY-MM-DD');
        const { customerId, serviceId }  = date;

        const report = urlReport();
        report.print(`${report.hemodialisis(from, to, date.onlyIngreso, customerId, serviceId)}`);

    }

    let dropDownBoxRef = useRef();

    const changeHandler = value => {
        setDate({...date, customerId: value})
    } 

    const onServiceChance = e => {
        setDate({...date, serviceId: e.value ? e.value : 0})
    }

    const hasDate = date.from && date.to;

    const title = 'Reporte de Nefrologia';

    return (
        <div className='container small mt-20'>
            <Title title={title} />
            <BlockHeader title={title} />
            <div className="reporte">
                <Box  direction="row"
                    width="100%"
                    height={75}>
                    <Item ratio={1}>
                        <div className="p-10">
                            Desde
                            <DateBox type="date" name="from" displayFormat={formatDate} openOnFieldClick={true} onValueChanged={e => setDate({...date, from: e.value})}/>
                        </div>
                    </Item>
                    <Item ratio={1}>
                        <div className="p-10">
                            Hasta
                            <DateBox type="date" name="to" displayFormat={formatDate} openOnFieldClick={true} onValueChanged={e => setDate({...date, to: e.value})}/>
                        </div>
                    </Item>
                    <Item ratio={1}>
                        <div className="p-10">
                            Aplicar solo ingreso?
                            <Switch switchedOnText='Si' switchedOffText='No' defaultValue={date.onlyIngreso} onValueChanged={e => setDate({ ...date, onlyIngreso: e.value })}  />
                        </div>
                    </Item>
                </Box>
                <Box  direction="row">
                    <Item ratio={2}>
                        <div className="p-10">
                            Cliente
                            <DropDownClients dropDownBoxRef={dropDownBoxRef} changeHandler={changeHandler} />
                        </div>
                    </Item>
                    <Item ratio={1}>
                        
                    </Item>
                </Box>
                <Box  direction="row">
                    <Item ratio={2}>
                        <div className="p-10">
                            Servicio
                            <SelectServicesByArea onValueChanged={onServiceChance} areaId={17} />
                        </div>
                    </Item>
                    <Item ratio={1}>
                        <div className="p-25">
                            <Button disabled={!hasDate} text='Generar reporte' onClick={generateReport} type='default' stylingMode="outlined" icon='search'/> 
                        </div>
                    </Item>
                </Box>
            </div>
        </div>
    );
}

export default Nefrologia;
