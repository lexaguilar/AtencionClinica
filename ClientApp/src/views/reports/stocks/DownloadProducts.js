import React, { useEffect, useRef, useState } from 'react';
import { DateBox, Button, DataGrid } from "devextreme-react";
import Box, {  Item } from 'devextreme-react/box';
import moment from 'moment';
import { Column, Export, GroupItem, GroupPanel, Pager, Paging, Summary  } from "devextreme-react/data-grid";
import { formatDate, formatDateTime } from '../../../data/app';
import Title from '../../../components/shared/Title';
import BlockHeader from '../../../components/shared/BlockHeader';
import DropDownDoctors from '../../../components/dropdown/DropDownDoctors';
import SelectAreas from '../../../components/dropdown/SelectArea';
import DropDownProducts from '../../../components/dropdown/DropDownProducts';
import useParameters from '../../../hooks/useParameters';
import http from '../../../utils/http';

//PUNTO 18
const DownloadProducts = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const predicate = ({ from, to, areaId }) => from != null && to != null && areaId != 0 

    const { param, setParam, isValid } = useParameters({ predicate });   

    const generateReport = async() => {

        const from = moment(param.from).format('YYYY-MM-DD');
        const to = moment(param.to).format('YYYY-MM-DD');

        const { areaId, doctorId, productId } = param;
       
        setLoading(true);
        const resp = await http('reports/downloaded').asPost({ from, to, areaId, doctorId, productId });
        setLoading(false);

        setData(resp);

    }

    const changeData = ({ target, value}) => setParam({ ...param, [target]: value });

    const fromChanged = e => changeData({ target:'from', value: e.value});
    const toChanged = e => changeData({ target:'to', value: e.value});
    const areaChanged = e => changeData({ target:'areaId', value: e.value});
    const productChanged = value => changeData({ target:'productId', value});
    const doctorChanged = value => changeData({ target:'doctorId', value});
    
    const title = 'Reporte de productos';

    const allowedPageSizes = [20, 50, 'all'];

    return (
        <div className='container mt-20'>
            <Title title={title} />
            <BlockHeader title={title} />
            <div className="reporte">
                <Box  direction="row"
                    width="100%"
                    height={75}>
                    <Item ratio={1}>
                        <div className="p-10">
                            <label htmlFor="">Desde</label>
                            <DateBox defaultValue={param.from} type="date" name="from" displayFormat={formatDate} openOnFieldClick={true} onValueChanged={fromChanged}/>
                        </div>
                    </Item>
                    <Item ratio={1}>
                        <div className="p-10">
                            <label htmlFor="">Hasta</label>
                            <DateBox defaultValue={param.to} type="date" name="to" displayFormat={formatDate} openOnFieldClick={true} onValueChanged={toChanged}/>
                        </div>
                    </Item> 
                    <Item ratio={2}>
                        <div className="p-10">
                            <label htmlFor="">Area</label>
                            <SelectAreas useMargin={true} onValueChanged={areaChanged} />
                        </div>
                    </Item>    
                    <Item ratio={2}>
                        <div className="p-10">
                            <label htmlFor="">Producto</label>
                            <DropDownProducts  changeHandler={productChanged} areaId={param.areaId} />
                        </div>
                    </Item>
                    <Item ratio={2}>
                        <div className="p-10">
                            <label htmlFor="">Doctor</label>
                            <DropDownDoctors changeHandler={doctorChanged} />
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
                    <Column dataField="type" caption="Tipo" width={80} />
                    <Column dataField="id" width={70} groupIndex={1}/>
                    <Column dataField="followId" width={80} groupIndex={0}/>
                    <Column dataField="date" dataType="date" caption="Fecha" format={formatDate}  width={100} />
                    <Column dataField="reference" caption="Referencia"  width={90}/>
                    <Column dataField="identity" caption="Inss" width={80}/>
                    <Column dataField="beneficiary" caption="Paciente" />
                    <Column dataField="producto" caption="Producto" />
                    <Column dataField="quantity" caption="Cant" width={80}/>
                    <Column dataField="price" caption="Costo" width={80}/>
                    <Column dataField="total" width={80}/>
                    <Column dataField="name" caption="Doctor" width={100}/>
                    <Column dataField="createBy" caption="Creado Por" width={100}/>
                    <Column dataField="createAt" caption="Creado el"  dataType="date" format={formatDateTime}  width={100}/> 
                    <Summary>                       
                        <GroupItem
                            column="quantity"
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

export default DownloadProducts;
