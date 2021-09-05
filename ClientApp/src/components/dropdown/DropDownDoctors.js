import React, { useState } from 'react';
import DataGrid, { Column, Editing, Lookup, Selection, Paging, FilterRow, Scrolling, Summary, TotalItem } from 'devextreme-react/data-grid';
import DropDownBox from 'devextreme-react/drop-down-box';
import useDoctors from '../../hooks/useDoctors';
import { dataFormatId } from '../../utils/common';
import { createStore } from '../../utils/proxy';
import {
    Validator,
    RequiredRule
} from 'devextreme-react/validator';

const DropDownDoctors = ({ dropDownBoxRef, changeHandler }) => {
    const { doctors } = useDoctors();

    const [gridBoxValue, setGridBoxValue] = useState(null);

    const dataGridRender = () => {
        return (
            <DataGrid
                allowColumnResizing={true}
                dataSource={doctors}
                selection={{ mode: 'single' }}
  
                
                hoverStateEnabled={true}
                selectedRowKeys={gridBoxValue}
                onSelectionChanged={dataGrid_onSelectionChanged}
                height="100%">
                <Selection mode="single" />
                <Scrolling mode="infinite" />
                <Paging enabled={true} pageSize={10} />
                <FilterRow visible={true} />
                
                <Column dataField="name" caption='Nombre' />
                <Column dataField="minsaCode" caption='Cod Minsa' visible={false} />
                <Column dataField="specialtyId" width={150} caption="Especialidad">
                    <Lookup disabled={true} dataSource={createStore({name : 'specialty'})} valueExpr="id" displayExpr="name" />
                </Column> 
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
            dataSource={doctors}
            key="id"
            placeholder="Selecciona un doctor"
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

export default DropDownDoctors;
