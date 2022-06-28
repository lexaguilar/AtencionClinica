import React, { useEffect, useRef, useState } from 'react';
import { DateBox, Button, DataGrid } from "devextreme-react";
import Box, {  Item } from 'devextreme-react/box';
import moment from 'moment';
import { Column, Export, GroupItem, GroupPanel, Pager, Paging, Summary, TotalItem  } from "devextreme-react/data-grid";
import { formatDate, formatDateTime } from '../../../data/app';
import Title from '../../../components/shared/Title';
import BlockHeader from '../../../components/shared/BlockHeader';
import DropDownDoctors from '../../../components/dropdown/DropDownDoctors';
import SelectAreas from '../../../components/dropdown/SelectArea';
import DropDownProducts from '../../../components/dropdown/DropDownProducts';
import useParameters from '../../../hooks/useParameters';
import http from '../../../utils/http';
import { cellRender, formatToMoney, formatToMoneySymoboless } from '../../../utils/common';

//PUNTO 28
const DealySalesDetail = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const predicate = ({ from, to, areaId }) => from != null && to != null && areaId != 0 

    const { param, setParam, isValid } = useParameters({ predicate });   

    const generateReport = async() => {

        const from = moment(param.from).format('YYYY-MM-DD');
        const to = moment(param.to).format('YYYY-MM-DD');

        const { areaId } = param;
       
        setLoading(true);
        const resp = await http('reports/salesed-details').asPost({ from, to, areaId });
        setLoading(false);

        setData(resp);

    }

    const changeData = ({ target, value}) => setParam({ ...param, [target]: value });

    const fromChanged = e => changeData({ target:'from', value: e.value});
    const toChanged = e => changeData({ target:'to', value: e.value});
    const areaChanged = e => changeData({ target:'areaId', value: e.value});

    const title = 'Reporte de ventas diarias detallado';

    const allowedPageSizes = [20, 50, 'all'];

    return (
        <div className='container medium mt-20'>
            <Title title={title} />
            <BlockHeader title={title} />
            <div className="reporte">
                <Box  direction="row"
                    width="100%"
                    height={75}>
                    <Item ratio={1}>
                        <div className="p-10">
                            <label htmlFor="">Desde:</label>
                            <DateBox defaultValue={param.from} type="date" name="from" displayFormat={formatDate} openOnFieldClick={true} onValueChanged={fromChanged}/>
                        </div>
                    </Item>
                    <Item ratio={1}>
                        <div className="p-10">
                            <label htmlFor="">Hasta:</label>
                            <DateBox defaultValue={param.to} type="date" name="to" displayFormat={formatDate} openOnFieldClick={true} onValueChanged={toChanged}/>
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
                            <Button disabled={!isValid} text={loading ? 'Cargando...':'Generar reporte'} onClick={generateReport} type='default' stylingMode="outlined" icon='search'/> 
                        </div>
                    </Item>         
                </Box>
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
                    <Column dataField="id" caption='No Factura' width={70} groupIndex={1}/>

                    <Column dataField="date" caption="Fecha"  dataType="date" format={formatDate}  width={100} groupIndex={0}/> 
                   
                    <Column dataField="createBy" caption="Creado Por" />
                    <Column dataField="createAt" caption="Creado el"  dataType="date" format={formatDateTime}  width={120}/> 

                    <Column dataField="name" caption="Producto"/>
                    <Column dataField="price" caption="Precio" cellRender={cellRender()}/>
                    <Column dataField="quantity" caption="Cant"/>
                    <Column dataField="total" caption="Total" cellRender={cellRender()}/>

                    <Summary>                       
                        <TotalItem
                            column="total"
                            summaryType="sum"
                            showInGroupFooter={false} 
                            alignByColumn={true}
                            customizeText={data => `Total: ${formatToMoneySymoboless(data.value)}`}
                        />
                        <GroupItem
                            column="total"
                            summaryType="sum"
                            displayFormat="Total: {0}"
                            showInGroupFooter={false} 
                            alignByColumn={true}
                            />
                    </Summary>                   
                </DataGrid>
            </div>
        </div>
    );
}

export default DealySalesDetail;
