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
                            showClearButton={true}
                            useMaskBehavior={true}
                            type="date"
                            onValueChanged={onChange}
                            displayFormat={"MM/yyyy"} />
                        </div>
                    </div>
                </Item>                
                <Item ratio={2}>                    
                </Item>
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
                <Column dataField="year" groupIndex={0}/>
                <Column dataField="month" groupIndex={1}/>
                <Column dataField="patronalId"  width={100}/>
                <Column dataField="rason" />
                <Column dataField="inss"  width={100}/>
                <Column dataField="firstName" />
                <Column dataField="lastName" />
                <Column dataField="adscription" />
                <Column dataField="dateAdd" dataType="date" format='dd/MM/yyyy'  width={100}/>              
            </DataGrid>
        </div>
    );
}

export default Percapita;
