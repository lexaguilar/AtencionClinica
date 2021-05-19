import React from 'react';
import { DataGrid } from 'devextreme-react';
import {
    Paging,
    Pager,
    FilterRow,
    HeaderFilter,
    Column,
    Lookup,
} from 'devextreme-react/data-grid';

import uri from '../../utils/uri';
import { store } from '../../services/store';
import { createStoreLocal } from '../../utils/proxy';


const Group = ({ onSelectionChanged }) => {

    return (
        <DataGrid
            selection={{ mode: 'single' }}
            dataSource={store({ uri: uri.groups })}
            showBorders={true}
            showRowLines={true}
            allowColumnResizing={true}
            allowColumnReordering={true}
            onSelectionChanged={onSelectionChanged}
        >
            <Paging defaultPageSize={20} />
            <Pager
                showPageSizeSelector={true}
                allowedPageSizes={[10, 20, 50]}
            />
            <FilterRow visible={true} />
            <HeaderFilter visible={true} />
            <Column dataField="id" width={100} />
            <Column dataField="name" caption='Grupo' />
            <Column dataField="areaId" caption="Area" width={100}>
                <Lookup dataSource={createStoreLocal({name: 'area'})} valueExpr="id" displayExpr="name" />
            </Column>
        </DataGrid>


    );
}

export default Group;
