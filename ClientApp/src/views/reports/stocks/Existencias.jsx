import React, { useState, useEffect, useRef } from "react";
import { Box, DataGrid, DateBox, DropDownBox, SelectBox } from "devextreme-react";
import { Item } from "devextreme-react/box";
import { Switch } from 'devextreme-react/switch';
import { Button } from 'devextreme-react/button';
import http from "../../../utils/http";
import uri from "../../../utils/uri";
import { Column, Selection, Paging, FilterRow, Scrolling, Export  } from "devextreme-react/data-grid";
import Title from "../../../components/shared/Title";
import BlockHeader from "../../../components/shared/BlockHeader";
import useProducts from "../../../hooks/useProducts";
import { cellRender } from "../../../utils/common";
import { formatDate } from "../../../data/app";

const Existencias = () => {
    let dataGrid = useRef();

    let dropDownBoxRef = useRef();

    const [areas, setAreas] = useState([]);
    const [areaId, setAreaId] = useState( null );
    const [withStock, setWithStock] = useState( true );
    const {products} = useProducts({ areaId });   
    const [gridBoxValue, setGridBoxValue] = useState(null);  

    const [stocks, setStocks] = useState([]);

    const changeHandler = (e) => {
        setGridBoxValue(e.value);
    }

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
            <Column dataField="presentation" caption="Laboratorio" width={100}/>
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

    const buscar = (params) => {
        http('reports/stock').asPost({areaId, productId: gridBoxValue, withStock}).then(resp => {
            setStocks(resp)
        });  
    }

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

    const title ='Existencias';    

    return (
        <div className="container big">
            <Title title={title} />
            <BlockHeader title={title} />
            <Box direction="row" width="100%" height={75}>
                <Item ratio={1}>
                    <div className="ml-10">
                        <label>Seleccione el area:</label>
                        <SelectBox items={areas}
                            placeholder="Selecciona un producto"
                            showClearButton={true} valueExpr="id" displayExpr="name" 
                            onValueChanged={changeArea}                         
                        />
                    </div>
                </Item>
                <Item ratio={2}>
                    <div className="ml-10">
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
                    </div>
                </Item>
                <Item ratio={1}>   
                    <div className="ml-10">
                        <label>Ver solo existencias mayor a 0?:</label>  
                        <br />
                        <Switch 
                            switchedOnText = "SI"
                            switchedOffText ="NO"
                            defaultValue={withStock} 
                            onValueChanged={e => setWithStock(e.value)}/>   
                    </div> 
                </Item>
                <Item ratio={1}>   
                    <div className="ml-10">
                        <label></label>  
                        <br />
                        <Button text='Realizar busqueda' onClick={buscar} type='default' stylingMode="outlined" icon='search'/> 
                    </div> 
                </Item>
            </Box>
            <Box direction="row" width="100%" height={75}>

                <Item ratio={1}>
                    <label>Existencias</label>
                    <DataGrid
                        ref={dataGrid}
                        id="gridContainer"
                        dataSource={stocks}
                        showBorders={true}
                        hoverStateEnabled={true}
                        showRowLines={true}
                        onToolbarPreparing={onToolbarPreparing}
                    >                       
                        <Export enabled={false} fileName={title} allowExportSelectedData={true} />
                        <Column dataField="areaId" visible={false} />
                        <Column dataField="area" visible={false} groupIndex={0} />
                        <Column dataField="productId" caption="Codigo" width={150}/>
                        <Column dataField="productName" caption="Producto"  />
                        <Column dataField="um" caption="Unidad Medida" width={120} />
                        <Column dataField="presentation" caption="Laboratorio" width={120} />
                        <Column dataField="price" caption="Precio" cellRender={cellRender()} width={120} alignment="right" />
                        <Column dataField="costAvg" caption="Costo" cellRender={cellRender()} width={120} alignment="right" />
                        <Column dataField="stock" caption="Existencia" width={100} />
                                
                    </DataGrid>
                </Item>

            </Box>

        </div>
    );
}

export default Existencias;
