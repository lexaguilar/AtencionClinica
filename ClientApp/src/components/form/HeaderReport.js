import React, { useEffect, useRef, useState } from 'react';
import { DateBox, Button, DataGrid } from "devextreme-react";
import Box, {  Item } from 'devextreme-react/box';
import moment from 'moment';
import { formatDate } from '../../data/app';
import SelectAreas from '../dropdown/SelectArea';

const HeaderReport = ({ param, fromChanged, toChanged, areaChanged, generateReport, isValid, loading }) => {
    return (
        <Box direction="row"
            width="100%"
            height={75}>
            <Item ratio={1}>
                <div className="p-10">
                    <label htmlFor="">Desde:</label>
                    <DateBox defaultValue={param.from} type="date" name="from" displayFormat={formatDate} openOnFieldClick={true} onValueChanged={fromChanged} />
                </div>
            </Item>
            <Item ratio={1}>
                <div className="p-10">
                    <label htmlFor="">Hasta:</label>
                    <DateBox defaultValue={param.to} type="date" name="to" displayFormat={formatDate} openOnFieldClick={true} onValueChanged={toChanged} />
                </div>
            </Item>
            <Item ratio={2}>
                <div className="p-10">
                    <label htmlFor="">Area:</label>
                    <SelectAreas useMargin={true} onValueChanged={areaChanged} />
                </div>
            </Item>
            <Item ratio={1}>
                <div className="p-10 mt-20">
                    <Button disabled={!isValid} text={loading ? 'Cargando...' : 'Generar reporte'} onClick={generateReport} type='default' stylingMode="outlined" icon='search' />
                </div>
            </Item>
        </Box>
    );
}

export default HeaderReport;
