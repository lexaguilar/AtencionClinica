import React from 'react';
import { DataGrid } from 'devextreme-react';
import { 
    Paging, 
    Pager, 
    FilterRow, 
    HeaderFilter, 
    Column, 
    Export, 
    Editing,
    RequiredRule
 } from 'devextreme-react/data-grid';

import Title from '../shared/Title';
import { store } from '../../services/store';
import uri from '../../utils/uri';
import Nuevo from './Nuevo';
import { formatDate } from '../../data/app';


function TasaCambio() {
    let dataGrid = null;

    const reload = function(){
        dataGrid.instance.refresh();
    }

    return (
        <div className="container small">
            <Title title="Tasa de cambio"/>
            <Nuevo onSave={reload}  />
            <DataGrid id="gridContainer"
                ref={(ref) => dataGrid = ref}
                selection={{ mode: 'single' }}
                dataSource={store({
                    uri: uri.tasaCambio, 
                    msgInserted: 'Tasa de cambio agregada correctamente',
                    msgUpdated: 'Tasa de cambio modificada correctamente',
                    msgDeleted: 'Tasa de cambio eliminada correctamente',}
                )}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
            >
                <Paging defaultPageSize={20} />
                <Pager
                    showPageSizeSelector={true}
                    allowedPageSizes={[10, 20, 50]}
                />
                <FilterRow visible={true} />
                <HeaderFilter visible={true} />
                <Export enabled={true} fileName="TasaCambio" allowExportSelectedData={true} />
                <Column dataField="fecha" dataType="date" format={formatDate}>
                    <RequiredRule/>
                </Column>
                <Column dataField="cambio" dataType="number">
                    <RequiredRule/>
                </Column>
                <Editing
                    mode="batch"
                    allowUpdating={true}
                    allowDeleting={true}
                    allowAdding={true}
                >                   
                </Editing>
            </DataGrid>
        </div>
    )

};

export default TasaCambio; //connect(mapStateToProps, mapDispatchToProps)(GridSprintStart);