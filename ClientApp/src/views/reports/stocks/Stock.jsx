import React from 'react';
import DataGrid, {
    Column,
    ColumnChooser,
    Editing,
    Export,
    FilterRow,
    HeaderFilter,
    Lookup,
    Pager,
    Paging,
    Popup,
    Form as FromGrid
} from 'devextreme-react/data-grid';
import { Item } from 'devextreme-react/form';
import BlockHeader from '../../../components/shared/BlockHeader';
import Title from '../../../components/shared/Title';
import uri from '../../../utils/uri';
import { useSelector } from 'react-redux';
import { store } from '../../../services/store';
import { createStore } from '../../../utils/proxy';

const Stock = () => {

    const { areaId } = useSelector(store => store.user);

    const onCellPrepared = e => {
        
        if (e.rowType == 'data') {            
            if(e.column.dataField == "stock" && e.data.stockMin)     
                if(e.data.stock < e.data.stockMin)           
                    e.cellElement.classList.add('txt-stockMin');  
                else
                    e.cellElement.classList.add('txt-stock');  

        }

    }

    const cb = data => data.map(x => {
        x.isLimit = x.stockMin ? x.stock <= x.stockMin : false
        return x;
    })

    const title = 'Inventario';

    return (
        <div className="container">
            <Title title={title} />
            <BlockHeader title={title} >
            </BlockHeader>
            <DataGrid id="gridContainer"

                selection={{ mode: 'single' }}
                dataSource={store({ uri: uri.areaProducts(areaId), cb  })}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
                onCellPrepared={onCellPrepared}
            >
                <Paging defaultPageSize={20} />
                <Pager
                    showPageSizeSelector={true}
                    allowedPageSizes={[10, 20, 50]}
                    showInfo={true}
                />
                <FilterRow visible={true} />
                <HeaderFilter visible={true} />
                <ColumnChooser enabled={true} />
                <Export enabled={true} fileName={title} allowExportSelectedData={true} />
                <Column dataField="areaId" visible={false} />
                <Column dataField="product.id" caption='Codigo'  width={100}/>
                <Column dataField="product.name" caption='Nombre' />
                <Column dataField="product.familyId" caption="Familia" width={150}>
                    <Lookup disabled={true} dataSource={createStore({ name: 'family' })} valueExpr="id" displayExpr="name" />
                </Column>
                <Column dataField="product.presentationId" caption="Presentacion" width={150}>
                    <Lookup disabled={true} dataSource={createStore({ name: 'Presentation' })} valueExpr="id" displayExpr="name" />
                </Column>
                <Column dataField="product.unitOfMeasureId" caption="UM" width={120}>
                    <Lookup disabled={true} dataSource={createStore({ name: 'UnitOfMeasure' })} valueExpr="id" displayExpr="name" />
                </Column>
                <Column dataField="stock" caption='Existencias' />
                <Column dataField="stockMin" />
                <Column dataField="isLimit" caption="Necesita abastecer ?" />
                <Editing
                    mode="popup"
                    allo
                    useIcons={true}
                    allowUpdating={true}
                >
                    <Popup title={title} showTitle={true} width={450} height={300}>

                    </Popup>
                    <FromGrid>
                        <Item dataField="product.name" colSpan={2} >
                        </Item>
                        <Item dataField="stock"  colSpan={2}>
                        </Item>
                        <Item dataField="stockMin"  colSpan={2}>
                        </Item>
                    </FromGrid>
                </Editing>
            </DataGrid>
        </div>
    );
}

export default Stock;
