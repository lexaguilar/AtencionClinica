import React from 'react';
import { DataGrid } from 'devextreme-react';
import { Paging, Pager, FilterRow, Column, Export, Editing, RequiredRule } from 'devextreme-react/data-grid';

import Title from '../../components/shared/Title';
import { store } from '../../services/store';
import uri from '../../utils/uri';
import Nuevo from './Nuevo';
import BlockHeader from '../../components/shared/BlockHeader';
import useAuthorization from '../../hooks/useAuthorization';
import { dataAccess, resources } from '../../data/app';

const Rates = () => {

    const { authorized } = useAuthorization([resources.administracion, dataAccess.access ]);

    let dataGrid = React.createRef();

    const reload = () => dataGrid.current.instance.refresh();    

    const title="Tasa de cambio";

    return authorized(
        <div className="container small">
            <Title title={title}/>
            <BlockHeader title={title} />
            <Nuevo onSave={reload}  />
            <DataGrid id="gridContainer"
                ref={dataGrid}
                selection={{ mode: 'single' }}
                dataSource={store({
                    uri: uri.rates, 
                    msgInserted: 'Tasa de cambio agregada correctamente',
                    msgUpdated: 'Tasa de cambio modificada correctamente',
                    msgDeleted: 'Tasa de cambio eliminada correctamente',
                    remoteOperations : true}
                )}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
                remoteOperations={{
                    paging: true,
                    filtering: true
                }}     
            >
                <Paging defaultPageSize={10} />
                <Pager
                    showInfo={true}
                    showPageSizeSelector={true}
                    allowedPageSizes={[10, 20, 50]}
                />
                <FilterRow visible={true} />              
                <Export enabled={true} fileName="TasaCambio" allowExportSelectedData={true} />
                <Column dataField="date" dataType="date" caption="Fecha" format='dd/MM/yyyy'>
                    <RequiredRule/>
                </Column>
                <Column dataField="value" caption="Valor" dataType="number">
                    <RequiredRule/>
                </Column>
                <Editing
                    mode="cell"
                    allowUpdating={true}
                    allowDeleting={true}
                    allowAdding={true}
                    useIcons={true}
                >                   
                </Editing>
            </DataGrid>
        </div>
    );
}

export default Rates;
