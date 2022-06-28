import React, { useRef, useState } from 'react';
import DataGrid, { Column, Editing, Lookup, Selection, Paging, FilterRow, Scrolling, Summary, TotalItem } from 'devextreme-react/data-grid';
import DropDownBox from 'devextreme-react/drop-down-box';
import {
    Validator,
    RequiredRule
} from 'devextreme-react/validator';
import useProducts from '../../hooks/useProducts';

const DropDownProducts = ({ changeHandler, areaId = 0}) => {

    const dropDownBoxRef = useRef();

    const {products} = useProducts({ areaId });

    const [gridBoxValue, setGridBoxValue] = useState(null);

    const dataGridRender = () => {  
        return (
            <DataGrid
                allowColumnResizing={true}
                dataSource={products}
                selection={{ mode: 'single' }} 
                hoverStateEnabled={true}
                selectedRowKeys={gridBoxValue}
                onSelectionChanged={dataGrid_onSelectionChanged}
                height="100%">
                <Selection mode="single" />
                <Scrolling mode="infinite" />
                <Paging enabled={true} pageSize={10} />
                <FilterRow visible={true} />
                
                <Column dataField="id" caption="Codigo" width={80}/>
                <Column dataField="name" caption="Nombre" />
                <Column dataField="presentation" caption="Laboratorio" width={100}/>
                <Column dataField="um" caption="UM" width={80}/>
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
            dataSource={products}
            key="id"
            placeholder="Selecciona un producto"
            showClearButton={true}
            valueExpr="id"
            displayExpr={item => item ? `${item.id} - ${item.name}` : ''}
            value={gridBoxValue}
            onValueChanged={e => setGridBoxValue(e.value)}
            contentRender={dataGridRender}
            
        >
           
        </DropDownBox>
    );
}

export default DropDownProducts;
