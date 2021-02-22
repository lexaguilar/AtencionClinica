import React, { useState, useEffect, useRef } from "react";
import { Box, DataGrid, DropDownBox, SelectBox } from "devextreme-react";
import { Item } from "devextreme-react/box";
import http from "../../../utils/http";
import uri from "../../../utils/uri";
import { store } from "../../../services/store";
import { Column, Editing, Popup, Form,
    Selection,
    Paging, FilterRow, Scrolling  } from "devextreme-react/data-grid";
import Title from "../../../components/shared/Title";
import BlockHeader from "../../../components/shared/BlockHeader";
import useProducts from "../../../hooks/useProducts";
import { cellRender } from "../../../utils/common";
import { formatDate } from "../../../data/app";

const Kardex = () => {

    let dropDownBoxRef = useRef();

    const [areas, setAreas] = useState([]);
    const [areaId, setAreaId] = useState(0);
    const {products} = useProducts(areaId);   
    const [gridBoxValue, setGridBoxValue] = useState([]);  

    const [kardex, setKardex] = useState([]);

    const changeHandler = (e) => {

    }

    const gridColumns = ['id','name', 'presentation', 'um'];

    const dataGrid_onSelectionChanged = (e) => {        
        setGridBoxValue(e.selectedRowKeys[0].id);
        dropDownBoxRef.current.instance.close();            

    }

    const dataGridRender = () => {
        return (
          <DataGrid
            dataSource={products}
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
            <Column dataField="presentation" caption="Presentacion" width={100}/>
            <Column dataField="um" caption="UM" width={80}/>
          </DataGrid>
        );
    }

    const changeArea = e => {
        setAreaId(e.value)
    }

    useEffect(() => {
        http(uri.areas.get).asGet().then(resp => setAreas(resp));
    }, [0]);

    useEffect(() => {
        http('reports/kardex').asGet({areaId, ProductId : gridBoxValue}).then(resp => setKardex(resp));      
    }, [gridBoxValue]);

    const title ='Recursos';    

    return (
        <div className="container">
            <Title title={title} />
            <BlockHeader title={title} />
            <Box direction="row" width="100%" height={75}>
                <Item ratio={1}>
                    <label>Seleccione el area:</label>
                    <SelectBox items={areas}
                        placeholder="Selecciona un producto"
                        showClearButton={true} valueExpr="id" displayExpr="name" 
                        onValueChanged={changeArea}                         
                    />
                </Item>
                <Item ratio={2}>
                    <label>Seleccione un producto:</label>
                    <DropDownBox 
                        ref={dropDownBoxRef}
                        dataSource={products}
                        key="id"
                        placeholder="Selecciona un producto"
                        showClearButton={true} 
                        valueExpr="id"      
                        displayExpr={item => item ? `${item.id} - ${item.name}` : ''} 
                        value = {gridBoxValue}              
                        onValueChanged={changeHandler} 
                        contentRender={dataGridRender}
                    />
                </Item>
                <Item ratio={1}></Item>
            </Box>
            <Box direction="row" width="100%" height={75}>

                <Item ratio={1}>
                    <label>Kardex</label>
                    <DataGrid
                        dataSource={kardex}
                        showBorders={true}
                        showRowLines={true}
                    >                       
                        <Column dataField="type" caption="Tipo" width={150} />
                        <Column dataField="id" caption="Documento" width={150} />
                        <Column dataField="date" dataType="date" caption="Fecha" format={formatDate}  width={120} />
                        <Column dataField="reference" caption="Referencia" width={120} />
                        <Column caption="Entradas">
                            <Column dataField="quantityIn" caption="Cantidad"  width={120} />
                            <Column dataField="costIn" caption="Costo" cellRender={cellRender()} width={100} />
                            <Column dataField="costTotalIn" caption="Total" cellRender={cellRender()} width={120} />
                        </Column>                        
                        <Column caption="Salidas">
                            <Column dataField="quantityOut" caption="Cantidad"  width={120} />
                            <Column dataField="costOut" caption="Costo" cellRender={cellRender()} width={100} />
                            <Column dataField="costTotalOut" caption="Total" cellRender={cellRender()} width={120} />
                        </Column>   
                        <Column caption="Existencias">
                            <Column dataField="stocks" caption="Existencia"  width={120} />
                            <Column dataField="costAVG" caption="Costo Promedio" cellRender={cellRender()} width={120} />
                            <Column dataField="costAVG" caption="Total" cellRender={cellRender()} width={120} />
                        </Column>                     
                    </DataGrid>
                </Item>

            </Box>

        </div>
    );
}

export default Kardex;