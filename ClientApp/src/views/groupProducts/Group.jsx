import React from 'react';
import { DataGrid } from 'devextreme-react';
import {
    Paging,
    Pager,
    FilterRow,
    HeaderFilter,
    Column,
} from 'devextreme-react/data-grid';

import uri from '../../utils/uri';
import { store } from '../../services/store';


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
        </DataGrid>


    );
}

export default Group;
