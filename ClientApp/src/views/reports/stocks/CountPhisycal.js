import React, { useState } from 'react';

import { DataGrid } from "devextreme-react";
import moment from 'moment';
import { Column, Export, GroupPanel, Pager, Paging } from "devextreme-react/data-grid";

import Title from '../../../components/shared/Title';
import BlockHeader from '../../../components/shared/BlockHeader';
import useParameters from '../../../hooks/useParameters';
import http from '../../../utils/http';
import HeaderReport from '../../../components/form/HeaderReport';

//Punto 9
const CountPhisycal = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const predicate = ({ from, to, areaId }) => from != null && to != null && areaId != 0 

    const { param, setParam, isValid } = useParameters({ predicate });   

    const generateReport = async() => {

        const from = moment(param.from).format('YYYY-MM-DD');
        const to = moment(param.to).format('YYYY-MM-DD');

        const { areaId } = param;
       
        setLoading(true);
        const resp = await http('reports/countPhisycal').asPost({ from, to, areaId });
        setLoading(false);

        const newData = resp.map(item => {

            item.total = item.entradas - item.salidas + item.saldoAnterior;

            return item;

        })

        setData(newData);

    }

    const changeData = ({ target, value}) => setParam({ ...param, [target]: value });

    const fromChanged = e => changeData({ target:'from', value: e.value});
    const toChanged = e => changeData({ target:'to', value: e.value});
    const areaChanged = e => changeData({ target:'areaId', value: e.value});

    const title = 'Reporte Conteo Físico';

    const allowedPageSizes = [20, 50];

    return (
        <div className='container medium mt-20'>
            <Title title={title} />
            <BlockHeader title={title} />
            <div className="reporte">
                <HeaderReport 
                    param={param} 
                    fromChanged={fromChanged} 
                    toChanged={toChanged} 
                    areaChanged={areaChanged} 
                    generateReport={generateReport} 
                    isValid={isValid} 
                    loading={loading} 
                />
                <DataGrid
                    id="gridContainer"
                    dataSource={data}
                    showBorders={true}
                    showRowLines={true}
                >             
                    <Paging defaultPageSize={20} />
                    <Pager
                        visible={true}
                        allowedPageSizes={allowedPageSizes}
                        showPageSizeSelector={true}
                        showInfo={true} />       
                    <Export enabled={true} fileName={title} allowExportSelectedData={true} />
                    <Column dataField="id" caption='Código' width={70}/>
                    <Column dataField="product" caption="Producto" /> 
                    <Column dataField="um" caption="UM" width={100} /> 
                    <Column dataField="saldoAnterior" caption='Cant Inicial' width={100}/>
                    <Column dataField="entradas" caption='Cant Entradas' width={100}/>
                    <Column dataField="salidas" caption='Cant Salidas' width={100}/> 
                    <Column dataField="total" caption='Existencias' width={100}/> 
                               
                </DataGrid>
            </div>
        </div>
    );
};


export default CountPhisycal;
