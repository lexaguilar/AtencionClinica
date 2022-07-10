import React, { useState } from 'react';

import { DataGrid } from "devextreme-react";
import moment from 'moment';
import { Column, Export, GroupPanel, Pager, Paging, Summary, TotalItem  } from "devextreme-react/data-grid";

import { formatDate, formatDateTime } from '../../../data/app';
import Title from '../../../components/shared/Title';
import BlockHeader from '../../../components/shared/BlockHeader';
import useParameters from '../../../hooks/useParameters';
import http from '../../../utils/http';
import { cellRender,  formatToMoneySymoboless } from '../../../utils/common';
import HeaderReport from '../../../components/form/HeaderReport';

//PUNTO 30
const DealySales = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const predicate = ({ from, to, areaId }) => from != null && to != null && areaId != 0 

    const { param, setParam, isValid } = useParameters({ predicate });   

    const generateReport = async() => {

        const from = moment(param.from).format('YYYY-MM-DD');
        const to = moment(param.to).format('YYYY-MM-DD');

        const { areaId } = param;
       
        setLoading(true);
        const resp = await http('reports/salesed').asPost({ from, to, areaId });
        setLoading(false);

        setData(resp);

    }

    const changeData = ({ target, value}) => setParam({ ...param, [target]: value });

    const fromChanged = e => changeData({ target:'from', value: e.value});
    const toChanged = e => changeData({ target:'to', value: e.value});
    const areaChanged = e => changeData({ target:'areaId', value: e.value});

    const title = 'Reporte de ventas diarias';

    const allowedPageSizes = [20, 50, 'all'];

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
                    <GroupPanel visible={true} />          
                    <Export enabled={true} fileName={title} allowExportSelectedData={true} />
                    <Column dataField="id" caption='No Factura' width={80}/>
                    <Column dataField="date" caption="Fecha"  dataType="date" format={formatDate}  width={100}/> 
                    <Column dataField="isCredit" caption='Es Credito?' width={100} />
                    <Column dataField="totalC" caption="Total en C$" cellRender={cellRender(1)}/>
                    <Column dataField="totalD" caption="Total en $" cellRender={cellRender(2)}/>
                    <Column dataField="createBy" caption="Creado Por" />
                    <Column dataField="createAt" caption="Creado el"  dataType="date" format={formatDateTime}  width={130}/> 
                    <Summary>                       
                        <TotalItem
                            column="totalC"
                            summaryType="sum"
                            showInGroupFooter={false} 
                            alignByColumn={true}
                            customizeText={data => `Total: ${formatToMoneySymoboless(data.value)}`}
                        />
                        <TotalItem
                            column="totalD"
                            summaryType="sum"
                            showInGroupFooter={false} 
                            alignByColumn={true}
                            customizeText={data => `Total: ${formatToMoneySymoboless(data.value)}`}
                        />
                    </Summary>                   
                </DataGrid>
            </div>
        </div>
    );
}

export default DealySales;
