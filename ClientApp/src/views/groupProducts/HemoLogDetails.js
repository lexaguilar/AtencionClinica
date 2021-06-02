import React from 'react';
import { DataGrid } from 'devextreme-react';
import { FilterRow, Column, Editing, Lookup, RequiredRule, Summary, GroupItem } from 'devextreme-react/data-grid';

import { store } from '../../services/store';
import { createStore } from '../../utils/proxy';
import { cellRender, cellRenderBold, formatToMoney } from '../../utils/common';

const HemoLogDetails = ({ groupId }) => {

    return (

        <DataGrid
            selection={{ mode: 'single' }}
            dataSource={store({ uri: { get: `HemoLogs/get/${groupId}/details` } })}
            showBorders={true}
            showRowLines={true}
            allowColumnResizing={true}
            allowColumnReordering={true}
            groupPanel={true}
        >
            <FilterRow visible={true} />
            <Column dataField="customer" caption="Paciente" groupIndex={0} />
            <Column dataField="productId" caption="Codigo" width={110} />
            <Column dataField="product" caption="Producto" />
            <Column dataField="quantity" caption="Cantidad" width={120} />
            <Column dataField="cost" caption="Costo" width={120} cellRender={cellRender()} />
            <Column dataField="total" width={120} cellRender={cellRenderBold()} />
            <Column dataField="observation" />
            <Summary>
                <GroupItem
                    column="total"
                    summaryType="sum" 
                    customizeText={e => formatToMoney(e.value)}/>
            </Summary>
        </DataGrid>
    );
}

export default HemoLogDetails;
