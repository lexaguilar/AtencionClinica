import React, { useRef } from 'react';
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
    Button as ButtonGrid
} from 'devextreme-react/data-grid';
import { Item } from 'devextreme-react/form';
import BlockHeader from '../../../components/shared/BlockHeader';
import Title from '../../../components/shared/Title';
import uri from '../../../utils/uri';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../../services/store';
import { createStore } from '../../../utils/proxy';
import { dialogAreaProduct } from '../../../store/areaProduct/areaProductDialogReducer';
import onExporting from '../../../components/grids/Importer';
import Nuevo from './Nuevo';

const Stock = () => {

    const { areaId } = useSelector(store => store.user);

    const dataGrid = useRef();
    const dispatch = useDispatch();

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
    });

    const openDialog = (e) => {
        console.log(e);
        const { productId, product } = e.row.data;
        dispatch(dialogAreaProduct({open : true, productId, name : product.name}));
    } 

    const onToolbarPreparing = (e) => {
        e.toolbarOptions.items.unshift({
            location: 'before',
            widget: 'dxButton',
            options: {
                text: 'Exportar a excel',
                icon: 'xlsxfile',
                type: 'success',
                stylingMode: "outlined",
                onClick: () => dataGrid.current.instance.exportToExcel(false)
            }
        });
    }
        
    const onSave = () => dataGrid.current.instance.refresh();


    const title = 'Inventario';

    return (
        <div className="container">
            <Title title={title} />
            <BlockHeader title={title} >
            </BlockHeader>
            <Nuevo onSave={onSave} areaId={areaId}/>   
            <DataGrid id="gridContainer"
                ref={dataGrid}
                selection={{ mode: 'single' }}
                dataSource={store({ uri: uri.areaProducts(areaId), cb  })}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
                onCellPrepared={onCellPrepared}
                onToolbarPreparing={onToolbarPreparing}
                onExporting={(e) => onExporting(e, title)}
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
                <Column dataField="product.presentationId" caption="Laboratorio" width={150}>
                    <Lookup disabled={true} dataSource={createStore({ name: 'Presentation' })} valueExpr="id" displayExpr="name" />
                </Column>
                <Column dataField="product.unitOfMeasureId" caption="UM" width={120}>
                    <Lookup disabled={true} dataSource={createStore({ name: 'UnitOfMeasure' })} valueExpr="id" displayExpr="name" />
                </Column>
                <Column dataField="stock" caption='Existencias' />
                <Column dataField="stockMin" />
                <Column dataField="isLimit" caption="Necesita abastecer ?" />
                <Column type="buttons" width={60}>
                   <ButtonGrid name="edit" onClick={e => openDialog(e)}/>
                </Column>
                <Editing
                    mode="popup"
                    useIcons={true}
                    allowUpdating={true}
                >                   
                </Editing>
            </DataGrid>
        </div>
    );
}

export default Stock;
