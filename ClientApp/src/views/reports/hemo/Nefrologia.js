import React, { useState } from 'react';
import { DateBox, Button } from "devextreme-react";
import Box, {  Item } from 'devextreme-react/box';
import moment from 'moment';

import { formatDate } from '../../../data/app';
import Title from '../../../components/shared/Title';
import BlockHeader from '../../../components/shared/BlockHeader';
import urlReport from '../../../services/reportServices';
  
const Nefrologia = () => {

    const [date, setDate] = useState({from: null, to: null});   

    const generateReport = () => {

        const from = moment(date.from).format('YYYY-MM-DD');
        const to = moment(date.to).format('YYYY-MM-DD');

        const report = urlReport();
        report.print(`${report.hemodialisis(from, to)}`);

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
                            <DateBox type="date" name="from" displayFormat={formatDate} openOnFieldClick={true} onValueChanged={e => setDate({...date, from: e.value})}/>
                        </div>
                    </Item>
                    <Item ratio={1}>
                        <div className="p-10">
                            <DateBox type="date" name="to" displayFormat={formatDate} openOnFieldClick={true} onValueChanged={e => setDate({...date, to: e.value})}/>
                        </div>
                    </Item>
                    <Item ratio={1}>
                        <div className="p-10">
                            <Button disabled={!hasDate} text='Generar reporte' onClick={generateReport} type='default' stylingMode="outlined" icon='search'/> 
                        </div>
                    </Item>
                </Box>
            </div>
        </div>
    );
}

export default Nefrologia;
