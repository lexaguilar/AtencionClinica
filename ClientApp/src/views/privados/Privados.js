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
    Editing,
    Popup,
    Form as FromGrid} from 'devextreme-react/data-grid';
import {  RequiredRule, AsyncRule, StringLengthRule, EmptyItem, Item } from 'devextreme-react/form';
import { store } from '../../services/store';
import { createStoreLocal } from '../../utils/proxy';
import uri from '../../utils/uri';
import BlockHeader from '../../components/shared/BlockHeader';
import Title from '../../components/shared/Title';
import { dataAccess, formatDate, resources } from '../../data/app';
import useAuthorization from '../../hooks/useAuthorization';
import { EmailRule } from 'devextreme-react/validator';



const Privados = () => {

    const { authorized } = useAuthorization([resources.administracion, dataAccess.access ]);

    let dataGrid = React.createRef();    
    
    const onToolbarPreparing = (e) => {
        e.toolbarOptions.items.unshift({
            location: 'before',
            widget: 'dxButton',
            options: {
                text: 'Agregar paciente',
                icon:'plus',
                type:'default',
                stylingMode:"outlined",
                onClick: () =>  dataGrid.instance.addRow()
            }
        });
    }

    const validateContract = (e) => {
        console.log(e)
        return false;
    }

    const title = 'Pacientes privados y convenios';

    return authorized(
        <div className="container">
            <Title title={title} />
            <BlockHeader title={title} />           
            <DataGrid id="gridContainer"
                ref={(ref) => dataGrid = ref}
                selection={{ mode: 'single' }}
                dataSource={store({ uri: uri.privateCustomers(), remoteOperations: true })}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
                noDataText='No se encontró ningun paciente'
                onToolbarPreparing={onToolbarPreparing}
                remoteOperations={{
                    paging: true,
                    filtering: true
                }}
            >
                <Paging defaultPageSize={20} />
                <Pager
                    showInfo={true}
                    showPageSizeSelector={true}
                    allowedPageSizes={[5,10, 20, 50]}
                />
                <FilterRow visible={true} />
                <HeaderFilter visible={true} />
                <ColumnChooser enabled={true} />               
                <Column dataField="id" width={140} visible={false} />
                <Column dataField="identification" width={140} />
                <Column dataField="inss" visible={false} dataType="number" />
                <Column dataField="firstName" caption="Nombre"  />
                <Column dataField="lastName" caption="Apellidos"  />
                <Column dataField="birthDate" caption="Fecha Nac." width={140} dataType="date"  format={formatDate}/>
                <Column dataField="sexId" width={100} caption="Sexo">
                    <Lookup disabled={true} dataSource={createStoreLocal({ name:'sex'})} valueExpr="id" displayExpr="name" />
                </Column> 
                <Column dataField="typeId" caption="Tipo" width={150}>
                    <Lookup disabled={true} dataSource={createStoreLocal({ name:'privateCustomerType'})} valueExpr="id" displayExpr="name" />
                </Column> 
                <Column dataField="contractId" caption="Convenio" width={160}>
                    <Lookup disabled={true} dataSource={createStoreLocal({ name:'contract'})} valueExpr="id" displayExpr="name" />
                </Column> 
                <Column dataField="phoneNumber"  visible={false} caption="Telefono" width={150} />
                <Column dataField="cellNumber"  visible={false} caption="Celular" width={150} />
                <Column dataField="regionId"  visible={false} width={100} caption="Departamento">
                    <Lookup disabled={true} dataSource={createStoreLocal({ name:'region'})} valueExpr="id" displayExpr="name" />
                </Column> 
                <Column dataField="cityId"  visible={false} width={100} caption="Ciudad">
                    <Lookup disabled={true} dataSource={createStoreLocal({ name:'city'})} valueExpr="id" displayExpr="name" />
                </Column> 
                <Column dataField="email"  visible={false} caption="Correo"/>
                <Column dataField="privateCustomerStatusId" width={100} caption="Estado">
                    <Lookup disabled={true} dataSource={createStoreLocal({ name:'privateCustomerStat'})} valueExpr="id" displayExpr="name" />
                </Column> 
                <Column dataField='address' caption="Dirección" visible={false}></Column>
                <Editing
                    mode="popup"
                    allowUpdating={true}                       
                    useIcons={true}
                >
                    <Popup title={title} showTitle={true} width={850} height={580}>

                    </Popup>
                    <FromGrid>   
                        <Item dataField="typeId" >
                            <RequiredRule message="El campo es requerido" />
                        </Item>                    
                        <Item dataField="contractId" >
                        </Item>                    
                        <Item dataField="identification" >
                            <StringLengthRule max={50} message="Máximo de caracteres 50" />
                        </Item>
                        <Item dataField="inss" >
                        </Item>
                        <Item dataField="firstName" >
                            <RequiredRule message="El campo es requerido" />
                            <StringLengthRule max={50} message="Máximo de caracteres 50" />
                        </Item>
                        <Item dataField="lastName" >
                            <RequiredRule message="El campo es requerido" />
                            <StringLengthRule max={50} message="Máximo de caracteres 50" />
                        </Item>
                        <Item dataField="birthDate" >
                            <RequiredRule message="El campo es requerido" />
                        </Item>
                        <Item dataField="sexId" >
                            <RequiredRule message="El campo es requerido" />
                        </Item>
                        <Item dataField="phoneNumber" >
                            <StringLengthRule max={50} message="Máximo de caracteres 50" />
                        </Item>
                        <Item dataField="cellNumber" >
                            <StringLengthRule max={50} message="Máximo de caracteres 50" />
                        </Item>                
                        <Item dataField="email" >
                            <StringLengthRule max={50} message="Máximo de caracteres 50" />
                            <EmailRule></EmailRule>
                        </Item>
                        <Item dataField="privateCustomerStatusId" >                            
                            <RequiredRule message="El campo es requerido" />
                        </Item>   
                        <Item dataField="regionId" >
                            <RequiredRule message="El campo es requerido" />
                        </Item>
                        <Item dataField="cityId" >
                            <RequiredRule message="El campo es requerido" />
                        </Item>  
                        <Item dataField="address" editorType='dxTextArea' colSpan={2}>                            
                            <RequiredRule message="El campo es requerido" />
                            <StringLengthRule max={150} message="Máximo de caracteres 50" />
                        </Item>                      
                    </FromGrid>
                </Editing>
            </DataGrid>
        </div>
    );
}

export default Privados;
