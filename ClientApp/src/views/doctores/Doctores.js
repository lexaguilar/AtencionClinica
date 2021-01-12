import React from 'react';
import { DataGrid } from 'devextreme-react';
import { Item } from 'devextreme-react/form';
import { 
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
    StringLengthRule} from 'devextreme-react/data-grid';

import uri from '../../utils/uri';
import { store } from '../../services/store';
import Title from '../../components/shared/Title';
import BlockHeader from '../../components/shared/BlockHeader';

const Doctores = () => {

    const title = 'Doctores';

    return (
        <div className="container small">
        <Title title={title}/>
        <BlockHeader title={title}/>          
        <DataGrid id="gridContainer"
            selection={{ mode: 'single' }}
            dataSource={store({uri : uri.doctores})}
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
            <ColumnChooser enabled={true} />
            <Export enabled={true} fileName={title} allowExportSelectedData={true} />
            <Column dataField="name" caption='Nombre' />
            <Editing
                mode="popup"
                allowUpdating={true}
                allowDeleting={true}
                allowAdding={true}
            >
                <Popup title={title} showTitle={true} width={500} height={220}>
                    
                </Popup>
                <Form>
                    <Item  dataField="name" editorOptions={{ width:300 }} >
                        <RequiredRule message="El campo es requerido"/>
                        <StringLengthRule max={50} min={2} message="Máximo de caracteres 50 y 2 mínimo"/>
                    </Item>                    
                </Form>
            </Editing>
        </DataGrid>
    </div>
    );
}

export default Doctores;
