import React from 'react';
import { DataGrid } from 'devextreme-react';
import { Item } from 'devextreme-react/form';
import  { 
    Paging, 
    Pager, 
    FilterRow, 
    HeaderFilter, 
    ColumnChooser, 
    Column, 
    Export, 
    Editing,
    Popup,     
    Form, 
    RequiredRule,
    StringLengthRule, Lookup} from 'devextreme-react/data-grid';
import Title from '../../components/shared/Title';
import BlockHeader from '../../components/shared/BlockHeader';
import { store } from '../../services/store';

const Parameters = () => {

    const title = 'Parametros del sistema';

    return (
        <div className="container medium">
        <Title title={title}/>
        <BlockHeader title={title}/>          
        <DataGrid id="gridContainer"
            selection={{ mode: 'single' }}
            dataSource={store({uri : { get : 'parameters/get' }})}
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
            <Column dataField="name" width={150} />
            <Column dataField="description" />
        </DataGrid>
    </div>
    );
}

export default Parameters;
