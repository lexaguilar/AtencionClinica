import React, { Component } from "react";
import {
    Column,
    ColumnChooser,
    FilterRow,
    SearchPanel,
    Lookup,
    Pager,
    Paging,
    Export,
    Button as ButtonGrid,
    Editing,
    Popup,
    Form,
    RequiredRule,
    StringLengthRule,
    EmailRule,
    ToolbarItem
}
    from 'devextreme-react/data-grid';
import { DataGrid } from 'devextreme-react';
import { createStore } from "../../utils/proxy";

import BlockHeader from '../../components/shared/BlockHeader';
import Title from "../../components/shared/Title";
import { store } from "../../services/store";
import { Item } from "devextreme-react/form";
import uri from "../../utils/uri";

class Users extends Component {

    constructor(props) {
        super(props)

        this.store = null
        this.dataGrid = null;
    }

    reload() {
        this.dataGrid.instance.refresh();
    }

    onToolbarPreparing = (e) => {
        e.toolbarOptions.items.unshift({
            location: 'before',
            widget: 'dxButton',
            options: {
                text: 'Exportar a excel',
                icon: 'xlsxfile',
                type: 'success',
                stylingMode: "outlined",
                onClick: () => this.dataGrid.instance.exportToExcel(false)
            }
        });
    }

    render() {
        let remoteOperations = true;
        this.store = store(
            {
                uri: uri.users,
                msgInserted: 'Usuario agregado correctamente',
                msgUpdated: 'Usuario modificado correctamente',
                msgDeleted: 'Usuario eliminado correctamente',
                remoteOperations: remoteOperations
            });
        const title = "Usuarios";
        return (
            <div className="container medium">
                <Title title={title} />
                <BlockHeader title={title} />
                <DataGrid
                    ref={(ref) => this.dataGrid = ref}
                    dataSource={this.store}
                    selection={{ mode: 'single' }}
                    showBorders={true}
                    showRowLines={true}
                    allowColumnResizing={true}
                    allowColumnReordering={true}
                    hoverStateEnabled={true}
                    remoteOperations={{
                        paging: true,
                        filtering: true
                    }}
                    onToolbarPreparing={this.onToolbarPreparing}
                >
                    <Pager allowedPageSizes={[10, 15, 30, 50]} showPageSizeSelector={true} showInfo={true} />
                    <Paging defaultPageSize={15} />
                    <SearchPanel visible={true} width={250} />
                    <FilterRow visible={true} />
                    <ColumnChooser enabled={true} />
                    <Export enabled={true} fileName={title} allowExportSelectedData={true} />
                    <Column dataField="username" width={150} />
                    <Column dataField="fullName" caption="Nombre" />
                    <Column dataField="email" allowFiltering={false} />
                    <Column dataField="areaId" width={150} caption="Area">
                        <Lookup disabled={true} dataSource={createStore({name :'area'})} valueExpr="id" displayExpr="name" />
                    </Column>
                    <Column dataField="rolId" width={150} caption="Permisos">
                        <Lookup disabled={true} dataSource={createStore({name :'rol'})} valueExpr="id" displayExpr="name" />
                    </Column>
                    <Editing
                        mode="popup"
                        allowUpdating={true}                        
                        allowAdding={true}
                        useIcons={true}
                        
                    >
                        <Popup title={title} showTitle={true} width={400} height={390}>                           
                        </Popup>
                        <Form colCount={1}>
                            <Item dataField="username" disabled={true}>
                                <RequiredRule message="El nombre de usuario es requerido" />
                                <StringLengthRule max={50} min={5} message="Máximo de caracteres 100 y 2 mínimo" />
                            </Item>
                            <Item dataField="fullName" >
                                <RequiredRule message="El nombre es requerido" />
                                <StringLengthRule max={150} min={10} message="Máximo de caracteres 150 y 10 mínimo" />
                            </Item>
                            <Item dataField="email" >
                                <RequiredRule message="El email es requerido" />
                                <EmailRule />
                                <StringLengthRule max={50} min={5} message="Máximo de caracteres 50 y 5 mínimo" />
                            </Item>                          
                            <Item dataField="areaId" >
                                <RequiredRule message="El area es requerida" />
                            </Item>
                            <Item dataField="rolId" >
                                <RequiredRule message="El rol es requerido" />
                            </Item>

                        </Form>
                    </Editing>
                </DataGrid>
            </div>
        )
    }

}


export default Users;
