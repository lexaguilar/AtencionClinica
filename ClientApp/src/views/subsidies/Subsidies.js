import React from 'react';
import { DataGrid } from 'devextreme-react';
import { 
    Paging, 
    Pager, 
    FilterRow, 
    HeaderFilter, 
    ColumnChooser, 
    Column, 
    Lookup,
    Export, 
    Editing
} from 'devextreme-react/data-grid';
import { store } from '../../services/store';
import { createStore } from '../../utils/proxy';
import uri from '../../utils/uri';
import BlockHeader from '../../components/shared/BlockHeader';
import Title from '../../components/shared/Title';
import Nuevo from './Nuevo';
import CustomButton from '../../components/buttons/CustomButton';
import { useDispatch } from 'react-redux'
import { updateSubsidio } from '../../store/subsidio/subsidioActions';

const Subsidies = () => {

    let dataGrid = React.createRef();
    const dispatch = useDispatch();

    const addMenuItems =(e) => {
        
        if (e.target == "content") {

            if (!e.items) e.items = [];

            if(e.rowIndex >= 0)
                e.items.push({

                    text: 'Re-imprimir subsidio',
                    icon : 'print',
                    onItemClick: () => 0
                    
                },{

                    text: 'Anular subsidio',
                    icon : 'remove',
                    onItemClick: () => dataGrid.instance.deleteRow(e.rowIndex)

                });
        }
    }

    const reload = (params) => {
        dataGrid.instance.refresh();
    }

    const onRowPrepared = (e) => {
        if (e.rowType == 'data') {

            if (!e.data.active) 
                e.rowElement.classList.add('no-activo');
            
        }
    }

    const onCellPrepared = e => {
        
        if (e.rowType == 'data') {

            if(e.column.dataField == "inss")
                e.cellElement.classList.add('text-inss');
            if(e.column.dataField == 'reference')
                e.cellElement.classList.add('text-reference');

        }

    }
    
    const title = 'Subsidios';

    return (
        <div className="container">
            <Title title={title} />
            <BlockHeader title={title} >
                <CustomButton
                    text="Crear subsidio"
                    icon='plus'
                    onClick={()=>dispatch(updateSubsidio({open : true}))}
                />
            </BlockHeader>
            <Nuevo onSave={reload}  />
            <DataGrid id="gridContainer"
                ref={(ref) => dataGrid = ref}
                selection={{ mode: 'single' }}
                dataSource={store({ uri: uri.subsidies, remoteOperations: true })}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
                onContextMenuPreparing={addMenuItems}
                onCellPrepared={onCellPrepared}
                onRowPrepared={onRowPrepared}
                noDataText='No se encontró ningún subsidio'
                remoteOperations={{
                    paging: true,
                    filtering: true
                }}
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
                <Column dataField="id"  width={80} />
                <Column dataField="reference"  width={90} caption='Boleta' alignment='right'/>
                <Column dataField="inss"  width={100} />
                <Column dataField="nombre" caption='Nombre'/>
                <Column dataField="areaId" width={150} caption="Area procedencia">
                    <Lookup disabled={true} dataSource={createStore('area')} valueExpr="id" displayExpr="name" />
                </Column> 
                <Column dataField="cie10Id" width={100} caption="Diagnostico">
                    <Lookup disabled={true} dataSource={createStore('cie10')} valueExpr="id" displayExpr="name" />
                </Column> 
                <Column dataField="doctorId" width={100} caption="Doctor" visible={false}>
                    <Lookup disabled={true} dataSource={createStore('doctor')} valueExpr="id" displayExpr="name" />
                </Column> 
                <Column dataField="dateStart" caption='Inicio'  width={100} dataType='date'/>
                <Column dataField="dateEnd" caption='Finaliza'  width={100} dataType='date'/>
                <Column dataField="days" caption='Dias' width={60} />
                <Column dataField="createBy" caption='Creado por' visible={false} width={100} />
                <Column dataField="createAt" caption='Creado el' dataType='date' visible={false} width={100} />
                <Editing
                    mode="popup"                 
                    allowDeleting={true}
                    useIcons={true}
                ></Editing>
            </DataGrid>
        </div>
    );
}

export default Subsidies;
