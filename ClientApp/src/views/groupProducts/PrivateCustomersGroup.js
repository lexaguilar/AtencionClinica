import React, { useRef, useState } from 'react';
import { DataGrid } from 'devextreme-react';
import { FilterRow, Column, Editing, Lookup, RequiredRule, FormItem, Popup, Form } from 'devextreme-react/data-grid';

import uri from '../../utils/uri';
import { store } from '../../services/store';
import { createStore, createStoreLocal } from '../../utils/proxy';
import ProductDDBComponent from '../../components/dropdown/ProductDDBComponent';
import useProducts from '../../hooks/useProducts';
import DataSource from 'devextreme/data/data_source';
import http from '../../utils/http';
import { Item } from 'devextreme-react/form';
import useClients from '../../hooks/useClients';

const PrivateCustomersGroup = ({ user, groupId }) => {

    const { clients } = useClients({});

    const onInitNewRow = (e) => {
        e.data.groupId = groupId;
    }

    let dataGrid = useRef();

    const onToolbarPreparing = (e) => {
        groupId && e.toolbarOptions.items.unshift({
            location: 'before',
            widget: 'dxButton',
            options: {
                text: 'Agregar paciente',
                icon: 'plus',
                type: 'default',
                stylingMode: "outlined",
                onClick: () => dataGrid.current.instance.addRow()
            }
        });
    }

    // const dataSource = new DataSource({
    //     load: (loadOptions) => {

    //         let params = {};
    //         params.skip = loadOptions.skip || 0;
    //         params.take = loadOptions.take || 10;

    //         if (loadOptions.searchValue)
    //             params.name = loadOptions.searchValue;

    //         return http(uri.privateCustomers().getAsCatalog)
    //             .asGet(params).then(x => x.items);

    //     },
    //     paginate: true,
    //     pageSize: 10,
    //     byKey: id => http(uri.privateCustomers().getById(id)).asGet()
    // });

    return (

        <DataGrid
            ref={dataGrid}
            selection={{ mode: 'single' }}
            dataSource={store({ uri: uri.groupPrivateCustomers(groupId) })}
            showBorders={true}
            showRowLines={true}
            allowColumnResizing={true}
            allowColumnReordering={true}
            onInitNewRow={onInitNewRow}
            onToolbarPreparing={onToolbarPreparing}
        >
            <Column dataField="groupId" visible={false} />

            <Column dataField="privateCustomerId" caption="Paciente">
                {/* <Lookup 
                    dataSource={createStoreLocal({name : '', url:'privateCustomers/get/catalog?skip=1&take=2000'})} 
                    valueExpr="id" displayExpr="name" /> */}
                 <Lookup
                    dataSource={clients}
                    valueExpr="id"
                    displayExpr={item => item ? `${item.id} - ${item.name}` : ''}

                /> 
                   
                <RequiredRule />
            </Column>
            <Editing
                mode="batch"
                allowUpdating={true}
                allowDeleting={true}
                useIcons={true}
            >
                {/* <Popup title="Seleccione una paciente" showTitle={true} width={700} height={220} />
                <Form>                   
                    <Item
                        dataField="privateCustomerId"
                        editorType="dxSelectBox"
                        colSpan={2}
                        editorOptions={{
                            dataSource: dataSource,
                            valueExpr:"id",
                            displayExpr: item => item ? `${item.id} - ${item.name} ${item.lastName}` : '',
                            searchEnabled: true
                        }} />  
                </Form> */}
            </Editing>
        </DataGrid>
    );
}

export default PrivateCustomersGroup;
