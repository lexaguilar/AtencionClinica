import React, { useState } from 'react';
import DataGrid, { Column, Editing, Lookup, Selection, Paging, FilterRow, Scrolling, Summary, TotalItem } from 'devextreme-react/data-grid';
import DropDownBox from 'devextreme-react/drop-down-box';
import useClients from '../../hooks/useClients';
import { dataFormatId } from '../../utils/common';
import {
    Validator,
    RequiredRule
} from 'devextreme-react/validator';

const DropDownClients = ({ dropDownBoxRef, changeHandler }) => {
    const { clients } = useClients();

    const [gridBoxValue, setGridBoxValue] = useState(null);

    const dataGridRender = () => {
        return (
            <DataGrid
                allowColumnResizing={true}
                dataSource={clients}
                hoverStateEnabled={true}
                selectedRowKeys={gridBoxValue}
                onSelectionChanged={dataGrid_onSelectionChanged}
                height="100%">
                <Selection mode="single" />
                <Scrolling mode="infinite" />
                <Paging enabled={true} pageSize={10} />
                <FilterRow visible={true} />
                <Column visible={false} dataField="id" caption="Codigo" width={80} cellRender={dataFormatId} />
                <Column dataField="inss" width={80} />
                <Column dataField="type" caption="Tipo" width={80} allowFiltering={false} />
                <Column dataField="contract" caption="Convenio" width={150} allowFiltering={false} />
                <Column dataField="identification" caption="Identificacion" width={130} />
                <Column dataField="name" caption="Nombre" />
                <Column dataField="sex" caption="Sexo" width={120} visible={false}></Column>
            </DataGrid>
        );
    }

    const dataGrid_onSelectionChanged = (e) => {  
        const value =   e.selectedRowKeys[0].id;  
        setGridBoxValue(value);
        dropDownBoxRef.current.instance.close();
        changeHandler(value);

    }

    return (
        <DropDownBox
            ref={dropDownBoxRef}
            dropDownOptions={{ width: 700 }}
            dataSource={clients}
            key="id"
            placeholder="Selecciona un paciente"
            showClearButton={true}
            valueExpr="id"
            displayExpr={item => item ? `${item.id} - ${item.name}` : ''}
            value={gridBoxValue}
            onValueChanged={e => console.log(e)}
            contentRender={dataGridRender}
            
        >
            <Validator>
                <RequiredRule message="Seleccione este campo" />
            </Validator>
        </DropDownBox>
    );
}

export default DropDownClients;
