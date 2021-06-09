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
    Lookup} from 'devextreme-react/data-grid';


import { store } from '../../services/store';

import { createProxyBase, createStoreLocal } from '../../utils/proxy';
import useAuthorization from '../../hooks/useAuthorization';
import { dataAccess, editorOptionsSwitch, resources } from '../../data/app';
import Title from '../../components/shared/Title';
import BlockHeader from '../../components/shared/BlockHeader';
import uri from '../../utils/uri';

function GroupsCatalos(props) {   

    const { authorized } = useAuthorization([resources.administracion, dataAccess.access ]);

    let dataGrid = useRef();

    const onToolbarPreparing = (e) => {  
        e.toolbarOptions.items.unshift({
            location: 'before',
            widget: 'dxButton',
            options: {
                text: 'Crear grupo',
                icon:'plus',
                type:'default',
                stylingMode:"outlined",
                onClick: () =>  dataGrid.current.instance.addRow()
            }
        });
    }  

    const onInitNewRow = (e) => {
        e.data.active = true;
    }

    const title = 'Grupos'
    
    return authorized(
        <div className="container small">
            <Title title={title}/>
            <BlockHeader title={title}/>          
            <DataGrid id="gridContainer"
                ref={dataGrid}
                selection={{ mode: 'single' }}
                dataSource={store({uri : uri.groups})}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
                onToolbarPreparing={onToolbarPreparing}
                onInitNewRow={onInitNewRow}
            >
                <Paging defaultPageSize={20} />
                <Pager
                    showPageSizeSelector={true}
                    allowedPageSizes={[10, 20, 50]}
                />
                <FilterRow visible={true} />
                <HeaderFilter visible={true} />
                <Export enabled={true} fileName={title} allowExportSelectedData={true} />
                <Column dataField="name" caption="Descripcion" />
                <Column dataField="areaId" caption="Area" width={150}>
                    <Lookup dataSource={createStoreLocal({name: 'area'})} valueExpr="id" displayExpr="name" />
                </Column>
                <Column dataField="active" caption="Activo" dataType="boolean" width={100} />
                <Editing
                    mode="popup"
                    allowUpdating={true}
                    useIcons={true}
                >
                    <Popup title={title} showTitle={true} width={450} height={300}>
                        
                    </Popup>
                    <Form>
                        <Item  dataField="name" colSpan={2} >
                            <RequiredRule message="El campo es requerida"/>
                            <StringLengthRule max={50} min={2} message="Máximo de caracteres 50 y 2 mínimo"/>
                        </Item>                       
                        <Item  dataField="areaId"  editorType="dxSelectBox"  colSpan={2}>
                        </Item>  
                        <Item  dataField="active"  editorType="dxSwitch" editorOptions={{...editorOptionsSwitch}}  colSpan={2}>
                        </Item>  
                    </Form>
                </Editing>
            </DataGrid>
        </div>
    )

};

export default GroupsCatalos; //connect(mapStateToProps, mapDispatchToProps)(GridSprintStart);