import React, { useRef, useState } from 'react';
import Nuevo from './Nuevo';
import { DataGrid } from 'devextreme-react';
import {
    Paging,
    Pager,
    FilterRow,
    HeaderFilter,
    Column,
    Export,
} from 'devextreme-react/data-grid';
import Box, {
    Item
  } from 'devextreme-react/box';
import DateBox from 'devextreme-react/date-box';
import Title from '../../components/shared/Title';
import Delete from './Delete';
import { dataAccess, formatDate, resources } from '../../data/app';
import { store } from '../../services/store';
import useAuthorization from '../../hooks/useAuthorization';
import { exportToExcel } from '../../utils/gridsHelper';

const Percapita = () => {

    const { authorized } = useAuthorization([resources.administracion, dataAccess.access ]);

    const [ date, setDate ] = useState(new Date());

    const onChange = e => {
        setDate(e.value)
    }
   
    let dataGrid = useRef();

    const reload = function () {
        dataGrid.current.instance.refresh();
    }

    const onToolbarPreparing = (e) => {  
        e.toolbarOptions.items.unshift({
            location: 'before',
            widget: 'dxButton',
            options: {
                text: 'Exportar a excel',
                icon:'xlsxfile',
                type:'success',
                stylingMode:"outlined",
                onClick: () =>  exportToExcel(dataGrid)
            }
        });
    } 

    return authorized(        
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
                    
                ref={dataGrid}
                selection={{ mode: 'single' }}
                //dataSource={customStore}
                dataSource={store({ uri : 
                    {
                        get : `percapitas/get/year/${date.getFullYear()}/month/${date.getMonth() + 1}`
                    }, 
                    remoteOperations : true 
                })}
                onToolbarPreparing={onToolbarPreparing}
                hoverStateEnabled={true}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
                
                remoteOperations={{
                    paging: true,
                    filtering: true
                }}     
            >
                <Paging defaultPageSize={20} />
                <Pager
                    showInfo={true}
                    showPageSizeSelector={true}
                    allowedPageSizes={[10, 20, 50]}
                />
                <FilterRow visible={true} />
                <HeaderFilter visible={true} />
                {/* <GroupPanel visible={true} />
                <Column dataField="year" caption='Año' groupIndex={0}/>
                <Column dataField="month" caption='Mes' groupIndex={1}  customizeText={customizeText}/> */}
                <Column dataField="patronalId" width={100}/>
                <Column dataField="rason" visible={false}/>
                <Column dataField="inss" width={100}/>
                <Column dataField="identification" width={150}/>
                <Column dataField="firstName"  caption='Nombre'/>
                <Column dataField="lastName"  caption='Apellidos'/>
                <Column dataField="adscription" visible={false}/>
                <Column dataField="dateAdd" dataType="date" format={formatDate} caption='Fecha' width={100}/>              
            </DataGrid>
            <br/>
            <Delete onDelete={reload} year={date.getFullYear()} month={date.getMonth() + 1} />           
        </div>
    );
}

export default Percapita;
