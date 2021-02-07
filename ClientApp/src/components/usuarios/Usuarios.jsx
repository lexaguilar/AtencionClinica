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
    Button as ButtonGrid 
}
    from 'devextreme-react/data-grid';
import { DataGrid } from 'devextreme-react';
import { createStore } from "../../utils/proxy";

import BlockHeader from "../shared/BlockHeader";
import Title from "../shared/Title";
import { store } from "../../services/store";

class Usuarios extends Component {

    constructor(props) {
        super(props)

        this.store = null
        this.dataGrid = null;
    }

    reload() {
        this.dataGrid.instance.refresh();
    }
  
    render() {
        let remoteOperations = true;
        this.store = store(
            {
                uri: { get: `usuarios/get` },
                msgInserted: 'Usuario agregado correctamente',
                msgUpdated: 'Usuario modificado correctamente',
                msgDeleted: 'Usuario eliminado correctamente',
                remoteOperations: remoteOperations
            });
        const title = "Usuarios";
        return (
            <div className="container">
                <Title title={title}/>
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
                >
                    <Pager allowedPageSizes={[10, 15, 30, 50]} showPageSizeSelector={true} showInfo={true} />
                    <Paging defaultPageSize={15} />
                    <SearchPanel visible={true} width={250} />
                    <FilterRow visible={true} />
                    <ColumnChooser enabled={true} />
                    <Export enabled={true} fileName={title} allowExportSelectedData={true} />     
                    <Column dataField="username" allowFiltering={false} />
                    <Column dataField="nombre" allowFiltering={false} />
                    <Column dataField="correo" allowFiltering={false} />
                    <Column dataField="rolId" width={260} caption="Permisos">
                        <Lookup disabled={true} dataSource={createStore({name:'role'})} valueExpr="id" displayExpr="nombre" />
                    </Column>               
                </DataGrid>
            </div>
        )
    }

}


export default Usuarios;
