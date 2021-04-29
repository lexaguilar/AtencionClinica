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

const Providers = () => {

    const { authorized } = useAuthorization([resources.administracion, dataAccess.access ]);

    const title = 'Proveedores';

    let dataGrid = React.createRef();

    const onToolbarPreparing = (e) => {
        e.toolbarOptions.items.unshift({
            location: 'before',
            widget: 'dxButton',
            options: {
                text: 'Nuevo Proveedor',
                icon: 'plus',
                type:'default',
                stylingMode:"outlined",
                onClick: () => dataGrid.instance.addRow()
            }
        });
    }

    return authorized(
        <div className="container">
            <Title title={title} />
            <BlockHeader title={title} />
            <DataGrid id="gridContainer"
                ref={(ref) => dataGrid = ref}
                selection={{ mode: 'single' }}
                dataSource={store({ uri: uri.providers })}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
                hoverStateEnabled={true}
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
                <Column dataField="ruc" caption='RUC' />
                <Column dataField="phoneNumber" caption='Telefono' />
                <Column dataField="email" caption='Email' />
                <Column dataField="address" caption='Direccion' visible={false}/>
                <Column dataField="stateId" width={150} caption="Estado">
                    <Lookup disabled={true} dataSource={createStore({ name: 'ProviderState' })} valueExpr="id" displayExpr="name" />
                </Column>
                <Editing
                    mode="popup"
                    allowUpdating={true}
                    allowDeleting={true}
                    useIcons={true}
                >
                    <Popup title={title} showTitle={true} width={500} height={520}>

                    </Popup>
                    <Form>
                        <Item dataField="name" colSpan={2}>
                            <RequiredRule message="El campo es requerido" />     
                            <StringLengthRule max={50} message="Máximo de caracteres 50" />                       
                        </Item>
                        <Item dataField="ruc" colSpan={2}>
                            <RequiredRule message="El campo es requerido" />
                        </Item>
                        <Item dataField="phoneNumber" colSpan={2}>
                            <StringLengthRule max={20} message="Máximo de caracteres 20" />
                        </Item>
                        <Item dataField="email" colSpan={2}>
                            <StringLengthRule max={50} message="Máximo de caracteres 50" />
                        </Item>
                        <Item  dataField="address" editorType="dxTextArea" colSpan={2}>
                            <RequiredRule message="El campo es requerido" />
                            <StringLengthRule max={150} message="Máximo de caracteres 150"/>
                        </Item>
                        <Item dataField="stateId" colSpan={2}>
                        </Item>
                    </Form>
                </Editing>
            </DataGrid>
        </div>
    );
}

export default Providers;
