import React, { useState } from 'react';
import { DataGrid } from 'devextreme-react';
import { 
    Paging, 
    Pager, 
    FilterRow, 
    HeaderFilter, 
    ColumnChooser, 
    Column,     
    Export, 
   } from 'devextreme-react/data-grid';
import { store } from '../../services/store';
import uri from '../../utils/uri';
import BlockHeader from '../../components/shared/BlockHeader';
import Title from '../../components/shared/Title';
import { formatDate } from '../../data/app';

const title = 'Asegurados Activos';

const Customers = () => {

    let dataGrid = React.createRef();

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
            });
    }

    const onCellPrepared = e => {
        
        if (e.rowType == 'data') {

            if(e.column.dataField == "inss")
                e.cellElement.classList.add('text-inss');

        }

    }

    return (
        <div className="container">
            <Title title={title} />
            <BlockHeader title={title} />           
            <DataGrid id="gridContainer"
                ref={dataGrid}
                selection={{ mode: 'single' }}
                dataSource={store({ uri: uri.customers })}
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
                <Column dataField="ptronalId" caption="# Patronal" width={140} />
                <Column dataField="firstName" caption="Nombre"  />
                <Column dataField="lastName" caption="Apellidos"  />
                <Column dataField="dateAdd" caption="Fecha" width={140} dataType="date"  format={formatDate}/>                             
            </DataGrid>
        </div>
    );
}

export default Customers;
