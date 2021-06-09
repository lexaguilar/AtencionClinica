import React, { useRef } from 'react';
import { DataGrid } from 'devextreme-react';
import { FilterRow, Column, Editing, Lookup, RequiredRule} from 'devextreme-react/data-grid';

import uri from '../../utils/uri';
import { store } from '../../services/store';
import { createStore } from '../../utils/proxy';
import ProductDDBComponent from '../../components/dropdown/ProductDDBComponent';
import useProducts from '../../hooks/useProducts';

const ProductsProcedimientos = ({ user, serviceId }) => {

    const exists = true;

    const { products } = useProducts({areaId: user.areaId, exists});

    const onInitNewRow = (e) => {  
        e.data.serviceId = serviceId;  
    } 

    let dataGrid = useRef();

    const onToolbarPreparing = (e) => {
        serviceId && e.toolbarOptions.items.unshift({
            location: 'before',
            widget: 'dxButton',
            options: {
                text: 'Agregar producto',
                icon: 'plus',
                type:'default',
                stylingMode:"outlined",
                onClick: () => dataGrid.current.instance.addRow()
            }
        });
    }

    return (
     
        <DataGrid
            ref={dataGrid}
            selection={{ mode: 'single' }}
            dataSource={store({uri : uri.serviceProducts(serviceId) })}
            showBorders={true}
            showRowLines={true}
            allowColumnResizing={true}
            allowColumnReordering={true}
            onInitNewRow={onInitNewRow}
            onToolbarPreparing={onToolbarPreparing}
        >                         
            <Column dataField="serviceId" visible={false}/>          
         
            <Column dataField="productId" caption="Producto"              
                editCellComponent={props => <ProductDDBComponent showPrice={true} {...props} />}>
                <Lookup
                    dataSource={products}
                    valueExpr="id"
                    displayExpr={item => item ? `${item.id} - ${item.name}` : ''}

                />
                <RequiredRule  />
            </Column>
            <Column dataField="quantity" caption="Cantidad" width={80}>
                <RequiredRule  />
            </Column>
            <Editing
                mode="batch"
                allowUpdating={true}
                allowDeleting={true}               
                useIcons={true}
            >              
            </Editing>
        </DataGrid>
    );
}

export default ProductsProcedimientos;
