import React, { useRef, useState } from 'react';
import { DataGrid, Switch } from 'devextreme-react';
import { 
    Paging, 
    Pager, 
    FilterRow, 
    HeaderFilter, 
    ColumnChooser, 
    Column,     
    Editing, 
    Lookup,
    Button as ButtonGrid 
   } from 'devextreme-react/data-grid';
   import { useDispatch } from 'react-redux'
import { store } from '../../services/store';
import uri from '../../utils/uri';
import BlockHeader from '../../components/shared/BlockHeader';
import Title from '../../components/shared/Title';
import { formatDate } from '../../data/app';
import Facultativo from './Facultativo';
import { openDialogFactultativo } from '../../store/factultativo/factultativoDialogReducer';
import { createStoreLocal } from '../../utils/proxy';

const title = 'Asegurados Activos';

const Customers = () => {

    const [viewActive, setViewActive] = useState(true);


    let dataGrid = useRef();
    const dispatch = useDispatch();

    const onToolbarPreparing = (e) => {        
            e.toolbarOptions.items.unshift({
                location: 'before',
                widget: 'dxButton',
                options: {
                    text: 'Exportar a excel',
                    icon:'xlsxfile',
                    type:'success',
                    stylingMode:"outlined",
                    onClick: () =>  dataGrid.current.instance.exportToExcel(false)
                }
            },{
                location: 'before',
                widget: 'dxButton',
                options: {
                    text: 'Crear facultativo',
                    icon:'group',
                    type:'default',
                    stylingMode:"outlined",
                    onClick: (id=0) => dispatch(openDialogFactultativo({open : true, id:0 }))
                }

            });
    }

    const onCellPrepared = e => {
        
        if (e.rowType == 'data') {

            if(e.column.dataField == "inss")
                e.cellElement.classList.add('text-inss');

        }

    }

    const reload = function () {
        dataGrid.current.instance.refresh();
    }  

    const openDialog = id =>   dispatch(openDialogFactultativo({ id }));

    const extraParameter = [["active", viewActive]];

    return (
        <div className="container">
            <Title title={title} />
            <BlockHeader title={title}>
                <div>
                    <span >Mostrar solo registros activos?: </span>
                    <Switch defaultValue={true}
                        switchedOffText="NO"
                        switchedOnText="SI"
                        onValueChange={value => {
                            setViewActive(value)
                        }}
                    />
                </div>
            </BlockHeader>        
            <Facultativo onSave={reload} />        
            <DataGrid id="gridContainer"
                ref={dataGrid}
                selection={{ mode: 'single' }}
                dataSource={store({ uri: uri.customers  , extraParameter })}                    
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
                hoverStateEnabled={true}
                noDataText='No se encontró ningun asegurado'
                onToolbarPreparing={onToolbarPreparing}
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
                <Column dataField="inss"  width={110} />              
                <Column dataField="identification" width={140} />
                <Column dataField="patronalId" caption="# Patronal" width={140} />
                <Column dataField="firstName" caption="Nombre"  />
                <Column dataField="lastName" caption="Apellidos"  />
                <Column dataField="dateAdd" caption="Fecha" width={140} dataType="date"  format={formatDate}/>   
                <Column dataField="customerTypeId" width={180} caption="Tipo">
                    <Lookup disabled={true} dataSource={createStoreLocal({ name:'CustomerType'})} valueExpr="id" displayExpr="name" />
                </Column>   
                <Column type="buttons">
                    <ButtonGrid name="edit" icon="edit" onClick={e => openDialog(e.row.data.inss)}/>
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

export default Customers;
