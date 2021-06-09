import React, { useState } from 'react';
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

import PopupDialog from 'devextreme-react/popup';
import uri from '../../utils/uri';
import { store } from '../../services/store';
import Title from '../../components/shared/Title';
import BlockHeader from '../../components/shared/BlockHeader';
import { createStore } from '../../utils/proxy';
import { cellRender } from '../../utils/common';
import useAuthorization from '../../hooks/useAuthorization';
import { dataAccess, editorOptionsSwitch, resources } from '../../data/app';
import CustomButton from '../../components/buttons/CustomButton';
import Tipos from './Tipos';

const Procedimientos = () => {

    const { authorized } = useAuthorization([resources.administracion, dataAccess.access ]);
    
    const [open, setOpen] = useState(false);

    const title = 'Procedimientos';

    let dataGrid = React.createRef();

    const onToolbarPreparing = (e) => {  
        e.toolbarOptions.items.unshift({
            location: 'before',
            widget: 'dxButton',
            options: {
                text: 'Agregar procedimiento o examen',
                icon:'plus',
                type:'default',
                stylingMode:"outlined",
                onClick: () =>  dataGrid.instance.addRow()
            }
        });
       
    } 

    const onInitNewRow = (e) => {
        e.data.active = true;
    }

    return authorized(
        <div className="container medium">
            <Title title={title}/>
            <BlockHeader title={title}>
                <CustomButton                                       
                        text='Agrupaciones'
                        icon='plus'
                        onClick={()=> setOpen(true)}
                    />
            </BlockHeader>
            <PopupDialog
                width={500}
                height={450}
                onHiding={()=> setOpen(false)}
                title={`Tipos de procedimientos`}
                visible={open}
            >                
                <Tipos />
            </PopupDialog>
            <DataGrid id="gridContainer"
                ref={(ref) => dataGrid = ref}
                selection={{ mode: 'single' }}
                dataSource={store({uri : uri.services,  remoteOperations: true })}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
                hoverStateEnabled={true}
                onToolbarPreparing={onToolbarPreparing}
                onInitNewRow={onInitNewRow}
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
                <ColumnChooser enabled={true} />
                <Export enabled={true} fileName={title} allowExportSelectedData={true} />
                <Column dataField="id" width={100}/>
                <Column dataField="name" caption='Nombre' />
                <Column dataField="price" caption='Precio' width={120} allowFiltering={false} cellRender={cellRender()}/>          
                <Column dataField="typeId" caption="Tipo" width={100}>
                    <Lookup disabled={true} dataSource={createStore({name: 'ServiceType'})} valueExpr="id" displayExpr="name" />
                </Column>
                <Column dataField="currencyId" caption="Moneda" width={100}>
                    <Lookup disabled={true} dataSource={createStore({name: 'Currency'})} valueExpr="id" displayExpr="name" />
                </Column>
                <Column dataField="isCultive" caption='Es Cultivo' allowFiltering={false}  width={100}/>
                <Column dataField="active" caption='Activo' allowFiltering={false}  width={100}/>
                <Editing
                    mode="popup"
                    allowUpdating={true}
                    allowDeleting={true}
                    useIcons={true}
                >
                    <Popup title={title} showTitle={true} width={450} height={470}>
                        
                    </Popup>
                    <Form>
                        <Item dataField="name" colSpan={2}>
                            <RequiredRule message="El campo es requerido"/>
                            <StringLengthRule max={50} message="Máximo de caracteres 50"/>
                        </Item>
                        <Item  dataField="price" colSpan={2}>
                            <RequiredRule message="El campo es requerido"/>
                        </Item>
                        <Item  dataField="typeId" colSpan={2}>
                            <RequiredRule message="El campo es requerido"/>
                        </Item>
                        <Item  dataField="currencyId" colSpan={2}>
                            <RequiredRule message="El campo es requerido"/>
                        </Item>
                        <Item  dataField="isCultive" colSpan={2} editorType="dxSwitch" editorOptions={{...editorOptionsSwitch}}>
                        </Item>
                        <Item  dataField="active" colSpan={2} editorType="dxSwitch" editorOptions={{...editorOptionsSwitch}}>
                        </Item>
                    </Form>
                </Editing>
            </DataGrid>
        </div>
    );
}

export default Procedimientos;
