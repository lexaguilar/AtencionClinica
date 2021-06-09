import React, { useRef } from "react";
import {
    Column,
    FilterRow,
    SearchPanel,
    Lookup,
    Pager,
    Paging,
    Export,
    Editing,
    Popup,
    Form,
    RequiredRule,
    StringLengthRule,
    EmailRule,
}
    from 'devextreme-react/data-grid';
import { DataGrid } from 'devextreme-react';
import { createStore } from "../../utils/proxy";
import { confirm } from 'devextreme/ui/dialog';

import BlockHeader from '../../components/shared/BlockHeader';
import Title from "../../components/shared/Title";
import { store } from "../../services/store";
import { Item } from "devextreme-react/form";
import uri from "../../utils/uri";
import http from "../../utils/http";
import notify from "devextreme/ui/notify";
import { dataAccess, resources } from "../../data/app";
import useAuthorization from "../../hooks/useAuthorization";

const Users = () => {

    const { authorized } = useAuthorization([resources.usuarios, dataAccess.access ]);

    const dataGrid = useRef();

    const reload = () => {
        dataGrid.current.instance.refresh();
    }

    const addMenuItems = (e) => {

        if (e.target == "content") {
            if (!e.items) e.items = [];

            let { username, active } = e.row.data;
 
            e.items.push({
                text: `${active ? 'Anular' : 'Activar'} usuario`,
                icon :  active ? 'remove' : 'check',
                onItemClick: () => {                    

                    http('users/update').asGet({username, active: !active}).then(resp => {
                        reload();
                        notify("Usuario actualizado correctamente");
                    });                    

                }
            },{
                text: `Restablecer contraseña`,
                icon :  'refresh',
                onItemClick: () => {
                    
                    let result = confirm("<i>Estas seguro de restablecer la contraseña?</i>", "Confirmar");
                    result.then((dialogResult) => {
                        if(dialogResult)
                            http('account/resetpassworddefault').asPost({username}).then(resp => {
                                notify("Contraseña retablecida correctamente");
                            });
                    });

                   
                }
            });
        }
    }

    const onToolbarPreparing = (e) => {
        e.toolbarOptions.items.unshift({
            location: 'before',
            widget: 'dxButton',
            options: {
                text: 'Nuevo usuario',
                icon: 'add',
                type: 'default',
                stylingMode: "outlined",
                onClick: () => dataGrid.current.instance.addRow()
            }
        },{
            location: 'before',
            widget: 'dxButton',
            options: {
                text: 'Exportar a excel',
                icon: 'xlsxfile',
                type: 'success',
                stylingMode: "outlined",
                onClick: () => dataGrid.current.instance.exportToExcel(false)
            }
        });
    }

    let remoteOperations = true;
    const _store = store(
        {
            uri: uri.users,
            msgInserted: 'Usuario agregado correctamente',
            msgUpdated: 'Usuario modificado correctamente',
            msgDeleted: 'Usuario eliminado correctamente',
            remoteOperations: remoteOperations
        });
   
    const title = "Usuarios";

    return authorized(
        <div className="container">
                <Title title={title} />
                <BlockHeader title={title} />
                <DataGrid
                    ref={dataGrid}
                    dataSource={_store}
                    selection={{ mode: 'single' }}
                    showBorders={true}
                    showRowLines={true}
                    allowColumnResizing={true}
                    allowColumnReordering={true}
                    hoverStateEnabled={true}
                    onContextMenuPreparing={addMenuItems}
                    remoteOperations={{
                        paging: true,
                        filtering: true
                    }}
                    onToolbarPreparing={onToolbarPreparing}
                >
                    <Pager allowedPageSizes={[10, 15, 30, 50]} showPageSizeSelector={true} showInfo={true} />
                    <Paging defaultPageSize={15} />
                    <SearchPanel visible={true} width={250} />
                    <FilterRow visible={true} />                 
                    <Export enabled={true} fileName={title} allowExportSelectedData={true} />
                    <Column dataField="username" width={140} allowEditing={false}/>
                    <Column dataField="fullName" caption="Nombre" />
                    <Column dataField="email" allowFiltering={false} />
                    <Column dataField="areaId" width={150} caption="Area">
                        <Lookup disabled={true} dataSource={createStore({name :'area'})} valueExpr="id" displayExpr="name" />
                    </Column>
                    <Column dataField="rolId" width={160} caption="Permisos">
                        <Lookup disabled={true} dataSource={createStore({name :'rol'})} valueExpr="id" displayExpr="name" />
                    </Column>
                    <Column dataField="active" caption="Activo" dataType="boolean"  width={100}/>
                    <Editing
                        mode="popup"
                        allowUpdating={true}    
                        useIcons={true}                        
                    >
                        <Popup title={title} showTitle={true} width={400} height={390}>                           
                        </Popup>
                        <Form colCount={1}>
                            <Item dataField="username">
                            </Item>
                            <Item dataField="fullName" >
                                <RequiredRule message="El nombre es requerido" />
                                <StringLengthRule max={150} min={5} message="Máximo de caracteres 150 y 5 mínimo" />
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
    );
}

export default Users;

