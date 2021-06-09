import React, { useRef } from 'react';
import { DataGrid } from 'devextreme-react';
import { Item } from 'devextreme-react/form';
import {
    Paging,
    Pager,
    FilterRow,
    HeaderFilter,
    Column,
    Export,
    Editing,
    Popup,
    Form,
    RequiredRule,
    StringLengthRule,
    Lookup
} from 'devextreme-react/data-grid';

import useAuthorization from '../../hooks/useAuthorization';
import { dataAccess, editorOptionsSwitch, resources } from '../../data/app';
import toCapital from '../../utils/common';
import { createProxyBase, createStoreLocal } from '../../utils/proxy';
import uri from '../../utils/uri';
import Title from '../../components/shared/Title';
import BlockHeader from '../../components/shared/BlockHeader';
import { store } from '../../services/store';

function Tipos(props) {

    return (
        
            <DataGrid
                selection={{ mode: 'single' }}
                dataSource={store({ uri: uri.tipos })}
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
                <Column dataField="name" caption="Descripcion" />
                <Editing
                    mode="cell"
                    allowUpdating={true}
                    allowAdding={true}
                    useIcons={true}
                >
                </Editing>
            </DataGrid>        

    )

};

export default Tipos; //connect(mapStateToProps, mapDispatchToProps)(GridSprintStart);