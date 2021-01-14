import React, { useState } from 'react';
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
    Editing,
    Popup,     
    Form as FromGrid, 
    RequiredRule,
    StringLengthRule} from 'devextreme-react/data-grid';
import { Item } from 'devextreme-react/form';
import { store } from '../../services/store';
import { createStore } from '../../utils/proxy';
import uri from '../../utils/uri';
import BlockHeader from '../../components/shared/BlockHeader';
import Title from '../../components/shared/Title';
import Customer from '../../components/customer';
import { estadoAdmision,relationships,estadoBeneficiario } from '../../data/catalogos';

const title = 'Beneficiarios';

const Beneficiarios = () => {
    const [customer, setCustomer] = useState({inss : 0,status : false ,firstName: "", lastName: ""});     

    const valueChanged = data => {
        console.log(data);
        setCustomer({
            inss : data.inss,
            status : data.customerStatusId == estadoAdmision.activo,
            firstName : data.firstName,
            lastName : data.lastName
        });
    } 

    const onInitNewRow = (e) => {  
        e.data.inss = customer.inss;  
        e.data.beneficiaryStatusId = estadoBeneficiario.activo;
    } 

    const setCellValue = (newData, value, currentRowData) => {

        newData.relationshipId = value;
        if(value == relationships.asegurado)
        {
            newData.firstName = customer.firstName;
            newData.lastName = customer.lastName;
        }
    }

    return (
        <div className="container">
            <Title title={title} />
            <BlockHeader title={title} />           
            <Customer valueChanged={valueChanged} ></Customer>
            <DataGrid id="gridContainer"
                selection={{ mode: 'single' }}
                dataSource={store({ uri: uri.beneficarios(customer.inss) })}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
                noDataText='No se encontró ningun beneficiario'
                onInitNewRow={onInitNewRow}
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
                <Column dataField="inss"  width={100} />
                <Column dataField="relationshipId" width={120} caption="Parentesco" setCellValue={setCellValue}>
                    <Lookup disabled={true} dataSource={createStore('Relationship')} valueExpr="id" displayExpr="name" />
                </Column> 
                <Column dataField="identification" width={140} />
                <Column dataField="firstName" caption="Nombre"  />
                <Column dataField="lastName" caption="Apellidos"  />
                <Column dataField="birthDate" caption="Fecha Nac." width={140} dataType="date"  format='dd/MM/yyyy'/>
                <Column dataField="sexId" width={100} caption="Sexo">
                    <Lookup disabled={true} dataSource={createStore('sex')} valueExpr="id" displayExpr="name" />
                </Column> 
                <Column dataField="phoneNumber"  visible={false} caption="Telefono" width={150} />
                <Column dataField="cellNumber"  visible={false} caption="Celular" width={150} />
                <Column dataField="regionId"  visible={false} width={100} caption="Departamento">
                    <Lookup disabled={true} dataSource={createStore('Region')} valueExpr="id" displayExpr="name" />
                </Column> 
                <Column dataField="cityId"  visible={false} width={100} caption="Ciudad">
                    <Lookup disabled={true} dataSource={createStore('City')} valueExpr="id" displayExpr="name" />
                </Column> 
                <Column dataField="email"  visible={false} caption="Correo"/>
                <Column dataField="beneficiaryStatusId" width={100} caption="Estado">
                    <Lookup disabled={true} dataSource={createStore('BeneficiaryStatus')} valueExpr="id" displayExpr="name" />
                </Column> 
                <Column dataField='address' caption="Dirección" visible={false}></Column>
                <Editing
                    mode="popup"
                    allowUpdating={customer.status}                   
                    allowAdding={customer.status}
                    useIcons={true}
                >
                    <Popup title={title} showTitle={true} width={850} height={530}>

                    </Popup>
                    <FromGrid>
                        <Item dataField="relationshipId" >
                            <RequiredRule message="El campo es requerido" />
                        </Item>
                        <Item dataField="identification" >
                            <StringLengthRule max={50} min={0} message="Máximo de caracteres 50 y 2 mínimo" />
                        </Item>
                        <Item dataField="firstName" >
                            <RequiredRule message="El campo es requerido" />
                            <StringLengthRule max={50} min={0} message="Máximo de caracteres 50 y 2 mínimo" />
                        </Item>
                        <Item dataField="lastName" >
                            <RequiredRule message="El campo es requerido" />
                            <StringLengthRule max={50} min={0} message="Máximo de caracteres 50 y 2 mínimo" />
                        </Item>
                        <Item dataField="birthDate" >
                            <RequiredRule message="El campo es requerido" />
                        </Item>
                        <Item dataField="sexId" >
                            <RequiredRule message="El campo es requerido" />
                        </Item>
                        <Item dataField="phoneNumber" >
                            <StringLengthRule max={50} min={0} message="Máximo de caracteres 50 y 2 mínimo" />
                        </Item>
                        <Item dataField="cellNumber" >
                            <StringLengthRule max={50} min={0} message="Máximo de caracteres 50 y 2 mínimo" />
                        </Item>
                        <Item dataField="regionId" >
                            <RequiredRule message="El campo es requerido" />
                        </Item>
                        <Item dataField="cityId" >
                            <RequiredRule message="El campo es requerido" />
                        </Item>                        
                        <Item dataField="email" >
                            <StringLengthRule max={50} min={0} message="Máximo de caracteres 50 y 2 mínimo" />
                        </Item>
                        <Item dataField="beneficiaryStatusId" >                            
                            <RequiredRule message="El campo es requerido" />
                        </Item>    
                        <Item dataField="address" editorType='dxTextArea' colSpan={2}>                            
                            <RequiredRule message="El campo es requerido" />
                        </Item>                      
                    </FromGrid>
                </Editing>
            </DataGrid>
        </div>
    );
}

export default Beneficiarios;
