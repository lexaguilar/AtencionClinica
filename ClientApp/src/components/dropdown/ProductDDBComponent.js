import React from 'react';
import DataGrid, {
    Column,
    Scrolling,
    Selection,
    FilterRow
} from 'devextreme-react/data-grid';
import DropDownBox from 'devextreme-react/drop-down-box';
import { cellRender } from '../../utils/common';
import CustomStore from 'devextreme/data/custom_store';
import http from '../../utils/http';

const dropDownOptions = { width: 930 };

export default class ProductDDBComponent extends React.Component {

    quantity = 'quantity';

    constructor(props) {
        super(props);
        this.state = {
            currentValue: props.data.value
        };
        this.dropDownBoxRef = React.createRef();
        this.onSelectionChanged = this.onSelectionChanged.bind(this);
        this.contentRender = this.contentRender.bind(this);
        this.showPrice = props.showPrice;

        this.quantity = props.quantity || this.quantity;
    }

    customStore(url){
        return new CustomStore({
            key:"id",
            load: (loadOptions) => {
    
                let params = {};
                params.skip = loadOptions.skip || 0;
                params.take = loadOptions.take || 10;    
              
                if (loadOptions.filter) {
                    if (typeof loadOptions.filter[0] == 'object') {
    
                        let moreParams = {};
    
                        const dataFilter = filters =>{
                            
                            for (var filter in filters) {
                                if (filters.hasOwnProperty(filter)) {
    
                                    if(['columnIndex','filterValue'].includes(filter)) continue;
    
                                    const element = filters[filter]
                                    
                                    if(['!=','==','<','>','<=','>=','and','or'].includes(element)) continue;
                                    
                                    if (typeof element == 'object') {
                                        dataFilter(element);
                                    }else{
                                        if(moreParams[filters[0]])
                                        moreParams[`${filters[0]}End` ] = filters[2];
                                        else
                                        moreParams[filters[0]] = filters[2];
                                        break;
                                    }
                                }
                            }
    
                        };
    
                        dataFilter(loadOptions.filter);                    
                        params = { ...params, ...moreParams};
    
                    } else {
                        params[loadOptions.filter[0]] = loadOptions.filter[2];
                    }
                }
    
                return http(url)
                    .asGet(params)
                    .then((data) => {

                        return {
                            data:data.items,
                            totalCount: data.totalCount,
                        };

                    })
                    .catch(() => { throw 'Data Loading Error'; });
            },
            byKey: id => http(`products/get/${id}`).asGet()
        })
    }

    onCellPrepared(e) {

        if (e.rowType == 'data') {
            if(e.column.dataField == "stock")
                if(e.value == 0)
                    e.cellElement.classList.add('stock-0');
           
        }
    }   

    contentRender() {
        return (
            <DataGrid
                dataSource={this.props.data.column.lookup.dataSource}
                keyExpr="id"                
                height={350}               
                selectedRowKeys={[this.state.currentValue]}
                hoverStateEnabled={true}
                onSelectionChanged={this.onSelectionChanged}
                focusedRowEnabled={true}
                defaultFocusedRowKey={this.state.currentValue}
                rowAlternationEnabled={true}
                allowColumnResizing={true}
                columnAutoWidth={true}
                onCellPrepared ={this.onCellPrepared}
            >
                <FilterRow visible={true} />
                <Column dataField="id" caption="Codigo" width={80}></Column>
                <Column dataField="name" caption="Nombre" ></Column>
                <Column dataField="presentation" caption="Laboratorio" width={120}></Column>
                <Column dataField="um" caption="UM" width={90}></Column>
                <Column dataField="stock" caption="Cant" width={80}></Column>                
                <Column dataField="cost" caption="Costo" visible={!this.showPrice} cellRender={cellRender()} width={80}></Column>
                <Column dataField="price" caption="Precio" visible={this.showPrice} cellRender={cellRender()} width={90}></Column>
                <Scrolling mode="virtual" />
                <Selection mode="single" />
            </DataGrid>
        );
    }

    onSelectionChanged(e) {

        this.setState({ currentValue: e.selectedRowKeys[0] });
        this.props.data.setValue(this.state.currentValue);
        if (e.selectedRowKeys.length > 0) {   
            this.dropDownBoxRef.current.instance.close();     
            this.props.data.component.editCell(this.props.data.rowIndex, this.quantity);       
        }

    }

    

    render() {
        return (
            <DropDownBox
                ref={this.dropDownBoxRef}
                key="id"
                dropDownOptions={dropDownOptions}
                dataSource={this.props.data.column.lookup.dataSource}
                value={this.state.currentValue}
                displayExpr={item => item ? `${item.id} - ${item.name}` : ''}
                valueExpr="id"                
                contentRender={this.contentRender}>
            </DropDownBox>
        );
    }
}