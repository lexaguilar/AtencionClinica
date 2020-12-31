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

class Clientes extends Component {

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
                uri: { get: `clientes/get` },
                msgInserted: 'Cuenta agregada correctamente',
                msgUpdated: 'Cuenta modificada correctamente',
                msgDeleted: 'Cuenta eliminada correctamente',
                remoteOperations: remoteOperations
            });

        const title = "Clientes";
        
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
                    onToolbarPreparing={this.onToolbarPreparing}
                    onRowDblClick={this.onRowDblClick}
                    onRowPrepared={this.onRowPrepared}
                >
                    <Pager allowedPageSizes={[10, 15, 30, 50]} showPageSizeSelector={true} showInfo={true} />
                    <Paging defaultPageSize={15} />
                    <SearchPanel visible={true} width={250} />
                    <FilterRow visible={true} />
                    <ColumnChooser enabled={true} />
                    <Export enabled={true} fileName={title} allowExportSelectedData={true} />     
                    {/* <Column dataField="tipoIdentificacionId" width={260} caption="Tipo Identificacion">
                        <Lookup disabled={true} dataSource={createStore('tipoComprobantes')} valueExpr="id" displayExpr="nombre" />
                    </Column>               */}
                    <Column dataField="identificacion" allowFiltering={false} />
                    <Column dataField="nombres" allowFiltering={false} />
                    <Column dataField="apellido" allowFiltering={false} />
                    <Column dataField="fechaNacimiento" width={120} dataType="date" format="dd/MM/yyyy" />
                    <Column dataField="sexo" allowFiltering={false} />
                    <Column dataField="telefono" allowFiltering={false} />
                    <Column dataField="celular" allowFiltering={false} />
                    <Column dataField="telefonoTrabajo" allowFiltering={false} />                 
                    <Column dataField="numeroExpediente" width={120} allowFiltering={false} />
                </DataGrid>
            </div>
        )
    }

}


export default Clientes;
