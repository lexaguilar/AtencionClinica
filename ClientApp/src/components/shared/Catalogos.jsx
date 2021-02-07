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
import toCapital from '../../utils/common';
import { store } from '../../services/store';
import Title from './Title';
import BlockHeader from './BlockHeader';
import { createProxyBase } from '../../utils/proxy';

function Catalogo(props) {

    const { name, url, caption } = props;

    let dataGrid = React.createRef();

    const onToolbarPreparing = (e) => {  
        e.toolbarOptions.items.unshift({
            location: 'before',
            widget: 'dxButton',
            options: {
                text: 'Crear nuevo',
                icon:'plus',
                onClick: () =>  dataGrid.instance.addRow()
            }
        });
    }  
    
    return (
        <div className="container small">
            <Title title={caption||name}/>
            <BlockHeader title={toCapital(caption||name)}/>          
            <DataGrid id="gridContainer"
                ref={(ref) => dataGrid = ref}
                selection={{ mode: 'single' }}
                dataSource={store({uri : createProxyBase(url)})}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
                onToolbarPreparing={onToolbarPreparing}
            >
                <Paging defaultPageSize={20} />
                <Pager
                    showPageSizeSelector={true}
                    allowedPageSizes={[10, 20, 50]}
                />
                <FilterRow visible={true} />
                <HeaderFilter visible={true} />
                <Export enabled={true} fileName={name} allowExportSelectedData={true} />
                <Column dataField="name" />
                <Column dataField="active" caption="Activo" dataType="boolean" width={100} />
                <Editing
                    mode="popup"
                    allowUpdating={true}
                    useIcons={true}
                >
                    <Popup title={toCapital(name)} showTitle={true} width={450} height={250}>
                        
                    </Popup>
                    <Form>
                        <Item  dataField="name" editorOptions={{ width:300 }} colSpan={2} >
                            <RequiredRule message="El campo es requerida"/>
                            <StringLengthRule max={50} min={2} message="Máximo de caracteres 50 y 2 mínimo"/>
                        </Item>
                        <Item  dataField="active" editorOptions={{ width:300 }}  colSpan={2}>
                        </Item>  
                    </Form>
                </Editing>
            </DataGrid>
        </div>
    )

};

export default Catalogo; //connect(mapStateToProps, mapDispatchToProps)(GridSprintStart);