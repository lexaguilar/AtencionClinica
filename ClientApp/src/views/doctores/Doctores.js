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
import useAuthorization from '../../hooks/useAuthorization';
import { dataAccess, resources } from '../../data/app';

const Doctores = (props) => {

    const { isAuthorization, Unauthorized } = useAuthorization([resources.administracion, dataAccess.access ]);

    const title = 'Doctores';

    let dataGrid = React.createRef();

    const onToolbarPreparing = (e) => {  
        e.toolbarOptions.items.unshift({
            location: 'before',
            widget: 'dxButton',
            options: {
                text: 'Agregar nuevo',
                icon:'plus',
                type:'default',
                stylingMode:"outlined",
                onClick: () =>  dataGrid.instance.addRow()
            }
        },{
            location: 'before',
            widget: 'dxButton',
            options: {
                text: 'Ver horarios',
                icon:'far fa-calendar-alt',
                onClick: () =>  props.history.push({ pathname : '/clinica/doctores/horarios' })
            }
        });
    }  

    return !isAuthorization 
    ?  <Unauthorized />  
    : (
        <div className="container">
        <Title title={title}/>
        <BlockHeader title={title}/>          
        <DataGrid id="gridContainer"
            ref={(ref) => dataGrid = ref}
            selection={{ mode: 'single' }}
            dataSource={store({uri : uri.doctores})}
            showBorders={true}
            showRowLines={true}
            allowColumnResizing={true}
            allowColumnReordering={true}
            onToolbarPreparing={onToolbarPreparing}
        >
            <Paging defaultPageSize={20} />
            <Pager
                showInfo={true}
                showPageSizeSelector={true}
                allowedPageSizes={[10, 20, 50]}
            />
            <FilterRow visible={true} />
            <HeaderFilter visible={true} />
            <ColumnChooser enabled={true} />
            <Export enabled={true} fileName={title} allowExportSelectedData={true} />
            <Column dataField="name" caption='Nombre' />
            <Column dataField="minsaCode" caption='Cod Minsa' />
            <Column dataField="specialtyId" width={150} caption="Especialidad">
                <Lookup disabled={true} dataSource={createStore({name : 'specialty'})} valueExpr="id" displayExpr="name" />
            </Column> 
            <Column dataField="phoneNumber" caption='Telefono' />
            <Column dataField="address" caption='Direccion' />
            <Column dataField="active" dataType="boolean" width={100} />
            <Editing
                mode="popup"
                allowUpdating={true}
                allowDeleting={true}
                useIcons={true}
            >
                <Popup title={title} showTitle={true} width={500} height={420}>
                    
                </Popup>
                <Form>
                    <Item  dataField="name" colSpan={2}>
                        <RequiredRule message="El campo es requerido"/>
                        <StringLengthRule max={50} min={2} message="Máximo de caracteres 50 y 2 mínimo"/>
                    </Item>
                    <Item  dataField="specialtyId" colSpan={2}>
                        <RequiredRule message="El campo es requerido"/>
                    </Item>
                    <Item  dataField="minsaCode" >
                        <RequiredRule message="El campo es requerido"/>
                        <StringLengthRule max={10} message="Máximo de caracteres 10"/>
                    </Item>                    
                    <Item  dataField="phoneNumber" >
                        <StringLengthRule max={10} message="Máximo de caracteres 10"/>
                    </Item>
                    <Item  dataField="address" editorType="dxTextArea" colSpan={2}>
                        <StringLengthRule max={250} message="Máximo de caracteres 250"/>
                    </Item>
                    <Item  dataField="active" editorType="dxCheckBox">
                    </Item>
                </Form>
            </Editing>
        </DataGrid>
    </div>
    );
}

export default Doctores;
