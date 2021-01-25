import React from 'react';
import { DataGrid } from 'devextreme-react';
import { Item } from 'devextreme-react/form';
import { 
    Paging, 
    Pager, 
    FilterRow, 
    HeaderFilter, 
    ColumnChooser, 
    Column, 
    Export, 
    Editing,
    Popup,     
    Form, 
    RequiredRule,
    StringLengthRule, Lookup} from 'devextreme-react/data-grid';

import uri from '../../utils/uri';
import { store } from '../../services/store';
import Title from '../../components/shared/Title';
import BlockHeader from '../../components/shared/BlockHeader';
import { createStore } from '../../utils/proxy';
import { formatDateTime } from '../../data/app';

const DoctoresById = () => {

    const title = 'Horario de Doctores';

    let dataGrid = React.createRef();

    const onToolbarPreparing = (e) => {  
        e.toolbarOptions.items.unshift({
            location: 'before',
            widget: 'dxButton',
            options: {
                text: 'Agregar nuevo',
                icon:'plus',
                onClick: () =>  dataGrid.instance.addRow()
            }
        });
    }  

    return (
        <div className="container">
        <Title title={title}/>
        <BlockHeader title={title}/>          
        <DataGrid id="gridContainer"
            ref={(ref) => dataGrid = ref}
            selection={{ mode: 'single' }}
            dataSource={store({uri : uri.doctoresTimes})}
            showBorders={true}
            showRowLines={true}
            allowColumnResizing={true}
            allowColumnReordering={true}
            onToolbarPreparing={onToolbarPreparing}
        >
            <Paging defaultPageSize={20} />
            <Pager
                showPageSizeSelector={true}
                allowedPageSizes={[10, 20, 50]}
            />
            <FilterRow visible={true} />
            <HeaderFilter visible={true} />
            <ColumnChooser enabled={true} />
            <Export enabled={true} fileName={title} allowExportSelectedData={true} />
            <Column dataField="doctorId" width={180} caption="Doctor">              
                <Lookup disabled={true} dataSource={createStore('doctor')} valueExpr="id" displayExpr="name" />
            </Column> 
            <Column dataField="days" caption='Regla de dias' >
            </Column>
            <Column dataField="startHour" caption='Inicio' width={120} dataType ='datetime' format="hh:mm a">
            </Column>
            <Column dataField="countBeneficiarios" width={150} caption='Pacientes atendidos' >
            </Column>
            <Column dataField="timeMinutesForBeneficiary" width={150} caption='Tiempo de atencion' >
            </Column>
            <Editing
                mode="popup"
                allowUpdating={true}
                allowDeleting={true}
                useIcons={true}
            >       
                <Popup title={title} showTitle={true} width={450} height={400}>                    
                </Popup>
                <Form>
                    <Item dataField="doctorId" colSpan={2}>
                        <RequiredRule message="El campo es requerido"/>
                        <StringLengthRule max={50} message="Máximo de caracteres 50"/>
                    </Item>
                    <Item  dataField="days" colSpan={2}>
                        <RequiredRule message="El campo es requerido"/>
                    </Item>
                    <Item  dataField="startHour" editorType="dxDateBox" editorOptions={{
                        type:"time",
                        displayFormat: 'hh:mm a'
                    }} colSpan={2}>
                        <RequiredRule message="El campo es requerido"/>
                    </Item>
                    <Item  dataField="countBeneficiarios" colSpan={2}>
                        <RequiredRule message="El campo es requerido"/>
                    </Item>
                    <Item  dataField="timeMinutesForBeneficiary" colSpan={2}>
                        <RequiredRule message="El campo es requerido"/>
                    </Item>
                </Form>            
            </Editing>

        </DataGrid>
    </div>
    );
}

export default DoctoresById;
