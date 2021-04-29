import React, { useState, useEffect, useRef } from 'react';
import Form, { SimpleItem, GroupItem, Label, RequiredRule, StringLengthRule } from 'devextreme-react/form';
import DataGrid,{ 
    Paging, 
    Pager, 
    FilterRow, 
    HeaderFilter, 
    Column,
    Editing,
    Lookup, 
   } from 'devextreme-react/data-grid';
import { useDispatch, useSelector } from 'react-redux'
import ScrollView from 'devextreme-react/scroll-view';
import { Box, Button } from 'devextreme-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import uri from '../../utils/uri';
import { obtenerTasaCambio } from '../../utils/common';
import http from '../../utils/http';
import notify from 'devextreme/ui/notify';
import { dialogWorkOrder } from '../../store/workOrder/workOrderDialogReducer';
import Information from '../../components/beneficiary/Information';
import { createStoreLocal } from '../../utils/proxy';
import { areaRestrict, editorOptionsSelect, formatDate } from '../../data/app';
import GridMedicamentos from './GridMedicamentos';
import GridProcedimientos from './GridProcedimientos';
import GridListaMedicamentoPte from './GridListaMedicamentoPte';
import gridsHelper from '../../utils/gridsHelper';
import { Item } from 'devextreme-react/box';
import { store } from '../../services/store';

const ServiceTest = ({ beneficiaryId, user, open, followId }) => {

    const [ resultados, setResultado ] = useState([]);
    const [ examenes, setExamen ] = useState([]);
    const [ examenDetalles, setExamenDetalle ] = useState([]);
    const [services, setServices] = useState([]);
    const [serviceId, setServiceId] = useState(0);
    const [ids, setIds] = useState({id:0, sendTestId : 0});

    useEffect(() => {         
        http(`follows/${followId}/getServicesSent`).asGet().then(resp => setResultado(resp));
    }, [open]);

    let ref = useRef();
    let refExamen = useRef();
    let refExamenDetalle = useRef();

    const onSelectionChanged = (e) => {
        if(e.selectedRowsData){
            let data = e.selectedRowsData[0];
            console.log(data);
            setIds({
                id: data.id,
                sendTestId : data.sendTestId
            });
        }
    }

    const onSelectionChangedExamen = (e) => {
        if(e.selectedRowsData){
            let data = e.selectedRowsData[0];
            setServiceId(data.id);
        }
    }


    return(
        
        <div>
            <Information beneficiaryId={beneficiaryId}/>
            <div style={{display: 'flex'}}>
                <div className="mr-10">
                    <DataGrid 
                        ref={ref}
                        selection={{ mode: 'single' }}
                        dataSource={resultados}
                        showBorders={true}
                        showRowLines={true}
                        allowColumnResizing={true}
                        allowColumnReordering={true}
                        onSelectionChanged={onSelectionChanged}
                    >                
                        <Column dataField="doctor.name" caption="Medico" allowEditing={false}  />
                        <Column dataField="date" caption="Fecha" dataType="date" format={formatDate} allowEditing={false}  />                      
                        <Column dataField="createBy" caption="Usuario" allowEditing={false}  />
                     
                    </DataGrid>
                </div>
                <div className="mr-10">
                    <DataGrid 
                        ref={refExamen}
                        selection={{ mode: 'single' }}
                        dataSource={ids.sendTestId == 0 ? [] : store({uri :{
                            get : `follows/${followId}/getServicesSent/${ids.sendTestId}`
                        } })}
                        showBorders={true}
                        showRowLines={true}
                        allowColumnResizing={true}
                        allowColumnReordering={true}
                        onSelectionChanged={onSelectionChangedExamen}
                    >              
                        <Column dataField="name" caption="Procedimiento">                          
                        </Column>  
                    </DataGrid>
                </div>
                <div>
                    <DataGrid
                        ref={refExamenDetalle}
                        selection={{ mode: 'single' }}
                        dataSource={store({uri:{
                            get : `follows/${ids.id}/getServicesSent/${serviceId}/Details`,
                            insert : `follows/${ids.id}/getServicesSent/${serviceId}/Details`
                        }})}
                        showBorders={true}
                        showRowLines={true}
                        allowColumnResizing={true}
                        allowColumnReordering={true}  
                                             
                    
                    >                
                        <Column dataField="Examen" allowEditing={false} />                     
                        <Column dataField="reference" allowEditing={false} />                     
                        <Column dataField="um"  allowEditing={false}/>                     
                        <Column dataField="result" />      
                        <Editing
                            mode="cell"                         
                            allowUpdating={true}
                            selectTextOnEditStart={true}
                            useIcons={true}
                        ></Editing>         
                    </DataGrid>
                </div>
            </div>
            
           
        </div>
    )
}

export default ServiceTest;
