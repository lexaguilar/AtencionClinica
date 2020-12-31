import React from 'react';
import { DataGrid } from 'devextreme-react';
import { Item } from 'devextreme-react/form';
import { 
    Paging, 
    Pager, 
    FilterRow, 
    HeaderFilter, 
    ColumnChooser, 
    Column, 
    Lookup,
    Export, 
    Editing,
    Popup,     
    Form, 
    RequiredRule,
    StringLengthRule} from 'devextreme-react/data-grid';

import { createStore } from "../../utils/proxy";
import uri from '../../utils/uri';
import toCapital from '../../utils/common';
import { store } from '../../services/store';
import Title from './Title';
import BlockHeader from './BlockHeader';

function Entes(props) {

    const { ente } = props;
    
    return (
        <div className="container">
            <Title title={ente}/>
            <BlockHeader title={toCapital(ente)}/>          
            <DataGrid id="gridContainer"
                selection={{ mode: 'single' }}
                dataSource={store({uri : uri[String(ente).toLocaleLowerCase()]})}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
            >
                <Paging defaultPageSize={20} />
                <Pager
                    showPageSizeSelector={true}
                    allowedPageSizes={[10, 20, 50]}
                />
                <FilterRow visible={true} />
                <HeaderFilter visible={true} />
                <ColumnChooser enabled={true} />
                <Export enabled={true} fileName={ente} allowExportSelectedData={true} />
                <Column dataField="nombre" width={300} />
                <Column dataField="telefono"  width={150} />
                <Column dataField="celular"  width={150} />
                <Column dataField="correo" />
                <Column dataField="direccion" />
                <Column dataField="observacion" visible={false} />
                <Column dataField="estadoId" width={100} caption="Estado">
                    <Lookup disabled={true} dataSource={createStore('estado')} valueExpr="id" displayExpr="nombre" />
                </Column>  
                <Editing
                    mode="popup"
                    allowUpdating={true}
                    allowDeleting={true}
                    allowAdding={true}
                >
                    <Popup title={toCapital(ente)} showTitle={true} width={850} height={420}>
                        
                    </Popup>
                    <Form>
                        <Item  dataField="nombre" editorOptions={{ width:300 }} >
                            <RequiredRule message="El nombre es requerido"/>
                            <StringLengthRule max={100} min={2} message="Máximo de caracteres 100 y 2 mínimo"/>
                        </Item>
                        <Item  dataField="telefono" editorOptions={{ width:300 }} >
                            <StringLengthRule max={15} min={0} message="Máximo de caracteres 15 y 2 mínimo"/>
                        </Item>                    
                        <Item  dataField="celular" editorOptions={{ width:300 }} >
                            <StringLengthRule max={15} min={0} message="Máximo de caracteres 15 y 2 mínimo"/>
                        </Item>                    
                        <Item  dataField="correo" editorOptions={{ width:300 }} >
                            <StringLengthRule max={50} min={0} message="Máximo de caracteres 50 y 2 mínimo"/>
                        </Item>      
                        <Item  dataField="direccion" colSpan={2} editorType="dxTextArea" editorOptions={{ height: 50 }} >
                            <RequiredRule message="La direccion es requerida"/>
                            <StringLengthRule max={150} min={2} message="Máximo de caracteres 150 y 2 mínimo"/>
                        </Item>                 
                        <Item  dataField="observacion" colSpan={2} editorType="dxTextArea" editorOptions={{ height: 50 }} >
                            <StringLengthRule max={250} min={0} message="Máximo de caracteres 250 y 2 mínimo"/>
                        </Item>   
                        <Item  dataField="estadoId" >
                            <RequiredRule message="El estado es requerido"/>
                        </Item>                  
                    </Form>
                </Editing>
            </DataGrid>
        </div>
    )

};

export default Entes;