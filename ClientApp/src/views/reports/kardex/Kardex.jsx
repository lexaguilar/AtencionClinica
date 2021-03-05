import React, { useState, useEffect, useRef } from "react";
import { Box, DataGrid, DateBox, DropDownBox, SelectBox } from "devextreme-react";
import { Item } from "devextreme-react/box";
import http from "../../../utils/http";
import uri from "../../../utils/uri";
import { Column, Selection, Paging, FilterRow, Scrolling, Export  } from "devextreme-react/data-grid";
import Title from "../../../components/shared/Title";
import BlockHeader from "../../../components/shared/BlockHeader";
import useProducts from "../../../hooks/useProducts";
import { cellRender } from "../../../utils/common";
import { formatDate } from "../../../data/app";

const Kardex = () => {

    let dropDownBoxRef = useRef();

    const [areas, setAreas] = useState([]);
    const [areaId, setAreaId] = useState(0);
    const [date, setDate] = useState(null);
    const {products} = useProducts({ areaId });   
    const [gridBoxValue, setGridBoxValue] = useState([]);  

    const [kardex, setKardex] = useState(undefined);
    const [saldoAnterior, setSaldoAnterior] = useState(0);

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
            <Column dataField="presentation" caption="Presentacion" width={100}/>
            <Column dataField="um" caption="UM" width={80}/>
          </DataGrid>
        );
    }

    const changeArea = e => {
        setAreaId(e.value)
    }

    const changeDate = e => {
        setDate(e.value)
    }

    useEffect(() => {
        http(uri.areas.get).asGet().then(resp => setAreas(resp));
    }, [0]);

    useEffect(() => {
        if(areaId && gridBoxValue && date)
            http('reports/kardex').asPost({areaId, productId : gridBoxValue, date}).then(resp => {
                setKardex(resp.result)
                setSaldoAnterior(resp.saldoAnterior)
            });      
    }, [areaId, gridBoxValue, date]);

    const stockcellRender = (cellData) => {
        return (
            <div className={cellData.data.quantityIn > 0 ? 'inc' : 'dec'} >             
              <div className='diff'>{cellData.value}</div>
            </div>
          );
    }

    const title ='Kardex';    

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
                        <label>Seleccione la fecha de corte:</label>
                        <DateBox type="date" displayFormat={formatDate} openOnFieldClick={true} onValueChanged={changeDate}/>
                    </div>
                </Item>
            </Box>
            <Box direction="row" width="100%" height={75}>

                <Item ratio={1}>
                    <label>Kardex</label>
                    <DataGrid
                        dataSource={[{ stocks : saldoAnterior, type:'Saldo Anterior',id:'-', date: date  }]}
                        showBorders={true}
                        showRowLines={true}
                    >                       
                        <Export enabled={false} fileName={title} allowExportSelectedData={true} />
                        <Column dataField="type" caption="Saldo Antorior" width={150} />
                        <Column dataField="id" caption="Documento" width={100} alignment="right"/>
                        <Column dataField="date" dataType="date" caption="Fecha" format={formatDate}  width={100} />
                        <Column dataField="reference" caption="Referencia" />                        
                        <Column dataField="stocks" caption="Existencia"  width={80} />
                    </DataGrid>
                    <DataGrid
                        id="gridContainer"
                        dataSource={kardex}
                        showBorders={true}
                        showRowLines={true}
                    >                       
                        <Export enabled={false} fileName={title} allowExportSelectedData={true} />
                        <Column dataField="type" caption="Tipo" width={150} />
                        <Column dataField="id" caption="Documento" width={100} />
                        <Column dataField="date" dataType="date" caption="Fecha" format={formatDate}  width={100} />
                        <Column dataField="reference" caption="Referencia" />
                        <Column caption="Entradas" alignment="center">
                            <Column dataField="quantityIn" caption="Cantidad"  width={75} />
                            <Column dataField="costIn" caption="Costo" cellRender={cellRender()} width={100} alignment="right" />
                            <Column dataField="costTotalIn" caption="Total" cellRender={cellRender()} width={115} alignment="right"/>
                        </Column>                        
                        <Column caption="Salidas" alignment="center">
                            <Column dataField="quantityOut" caption="Cantidad"  width={75} />
                            <Column dataField="costOut" caption="Costo" cellRender={cellRender()} width={100} alignment="right"/>
                            <Column dataField="costTotalOut" caption="Total" cellRender={cellRender()} width={115} alignment="right"/>
                        </Column>   
                        <Column caption="Existencias" alignment="center">
                            <Column dataField="stocks" caption="Existencia" width={80} cellRender={stockcellRender} />
                            <Column dataField="costAvg" caption="Costo Prom" cellRender={cellRender()} width={100} alignment="right"/>
                            <Column dataField="costPromOut" caption="Total" cellRender={cellRender()} width={115} alignment="right"/>
                        </Column>                     
                    </DataGrid>
                </Item>

            </Box>

        </div>
    );
}

export default Kardex;
