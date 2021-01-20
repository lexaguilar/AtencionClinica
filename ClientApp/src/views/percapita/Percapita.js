import React, { useState } from 'react';
import Nuevo from './Nuevo';
import { DataGrid } from 'devextreme-react';
import {
    Paging,
    Pager,
    FilterRow,
    HeaderFilter,
    Column,
    Export,
    GroupPanel,
} from 'devextreme-react/data-grid';
import Box, {
    Item
  } from 'devextreme-react/box';
import DateBox from 'devextreme-react/date-box';
import Title from '../../components/shared/Title';
import CustomStore from 'devextreme/data/custom_store';
import http from '../../utils/http';
import { customizeText, getMonthName } from '../../utils/common';
import { Button } from 'devextreme-react/button';
import Delete from './Delete';

const Percapita = () => {

    const [ date, setDate ] = useState(new Date());

    const onChange = e => {
        setDate(e.value)
    }
   
    let dataGrid = null;

    const reload = function () {
        dataGrid.instance.refresh();
    }

    const customStore = new CustomStore({
        load: (loadOptions) => {
            return http(`percapitas/get/year/${date.getFullYear()}/month/${date.getMonth() + 1}`).asGet();
        }
    })

    return (
        
        <div className="container">
            <Title title="Tasa de cambio" />
            
            <Box
                direction="row"
                width="100%"
                height={75}>
                <Item ratio={1}>
                    <div className="dx-field">
                        <div className="dx-field-label">Fecha mes/año</div>
                        <div className="dx-field-value">
                        <DateBox defaultValue={date}
                            placeholder="Year: 2020" 
                            useMaskBehavior={true}
                            type="date"
                            onValueChanged={onChange}
                            displayFormat={"MM/yyyy"} />
                        </div>
                    </div>
                </Item>            
                <Item ratio={1}/>   
                <Item ratio={1}/>    
                <Item ratio={1}>
                    <Nuevo onSave={reload} />
                </Item>
            </Box>
            <DataGrid id="gridContainer"
                    
                ref={(ref) => dataGrid = ref}
                selection={{ mode: 'single' }}
                dataSource={customStore}
                hoverStateEnabled={true}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
            >
                <Paging defaultPageSize={20} />
                <Pager
                    showPageSizeSelector={true}
                    allowedPageSizes={[10, 20, 50]}
                />
                <FilterRow visible={true} />
                <HeaderFilter visible={true} />
                <Export enabled={true} fileName="Percapita" allowExportSelectedData={true} />
                <GroupPanel visible={true} />
                <Column dataField="year" caption='Año' groupIndex={0}/>
                <Column dataField="month" caption='Mes' groupIndex={1}  customizeText={customizeText}/>
                <Column dataField="patronalId" width={100}/>
                <Column dataField="rason" />
                <Column dataField="inss" width={100}/>
                <Column dataField="firstName"  caption='Nombre'/>
                <Column dataField="lastName"  caption='Apellidos'/>
                <Column dataField="adscription" />
                <Column dataField="dateAdd" dataType="date" format='dd/MM/yyyy' caption='Fecha' width={100}/>              
            </DataGrid>
            <br/>
            <Delete onDelete={reload} year={date.getFullYear()} month={date.getMonth() + 1} />           
        </div>
    );
}

export default Percapita;
