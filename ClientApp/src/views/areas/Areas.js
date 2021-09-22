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

    import useAuthorization from '../../hooks/useAuthorization';
import { dataAccess, editorOptionsSwitch, resources } from '../../data/app';
import toCapital from '../../utils/common';
import { createProxyBase, createStoreLocal } from '../../utils/proxy';
import uri from '../../utils/uri';
import Title from '../../components/shared/Title';
import BlockHeader from '../../components/shared/BlockHeader';
import { store } from '../../services/store';

function Areas(props) {

    const { authorized } = useAuthorization([resources.administracion, dataAccess.access ]);

    let dataGrid = useRef();

    const onToolbarPreparing = (e) => {  
        e.toolbarOptions.items.unshift({
            location: 'before',
            widget: 'dxButton',
            options: {
                text: 'Crear nuevo',
                icon:'plus',
                type:'default',
                stylingMode:"outlined",
                onClick: () =>  dataGrid.current.instance.addRow()
            }
        });
    }  

    const onInitNewRow = (e) => {
        e.data.active = true;
        e.data.typeId = 1;
    }

    const title = 'Areas';
    
    return authorized(
        <div className="container small">
            <Title title={title}/>
            <BlockHeader title={toCapital(title)}/>          
            <DataGrid id="gridContainer"
                ref={dataGrid}
                selection={{ mode: 'single' }}
                dataSource={store({uri : uri.areas})}
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
                <Column dataField="typeId"  width={120} caption="Tipo">
                    <Lookup disabled={true} dataSource={createStoreLocal({ name:'areaType'})} valueExpr="id" displayExpr="name" />
                </Column> 
                <Column dataField="active" caption="Activo" dataType="boolean" width={100} />
                <Editing
                    mode="popup"
                    allowUpdating={true}
                    useIcons={true}
                >
                    <Popup title={title} showTitle={true} width={400} height={230}>
                        
                    </Popup>
                    <Form>
                        <Item  dataField="name" colSpan={2} >
                            <RequiredRule message="El campo es requerida"/>
                            <StringLengthRule max={50} min={2} message="Máximo de caracteres 50 y 2 mínimo"/>
                        </Item>
                        <Item  dataField="typeId" colSpan={2} >
                            <RequiredRule message="El campo es requerida"/>
                        </Item>
                        <Item  dataField="active"  editorType="dxSwitch" editorOptions={{...editorOptionsSwitch}}  colSpan={2}>
                        </Item>  
                    </Form>
                </Editing>
            </DataGrid>
        </div>
    )

};

export default Areas; //connect(mapStateToProps, mapDispatchToProps)(GridSprintStart);