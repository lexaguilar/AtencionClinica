import React, { useRef, useState } from 'react';
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
import { createStoreLocal } from '../../utils/proxy';
import uri from '../../utils/uri';
import BlockHeader from '../../components/shared/BlockHeader';
import Title from '../../components/shared/Title';
import Customer from '../../components/customer';
import { estadoAdmision,relationships,estadoBeneficiario } from '../../data/catalogos';
import http from '../../utils/http';
import { formatDate } from '../../data/app';

const title = 'Beneficiarios';

const BeneficiariosAll = () => {    

    let dataGrid = useRef();     
  

    return (
        <div className="container">
            <Title title={title} />
            <BlockHeader title={title} />           
            <DataGrid id="gridContainer"
                ref={dataGrid}
                selection={{ mode: 'single' }}
                dataSource={store({ uri: uri.beneficariosAll })}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
                hoverStateEnabled={true}
                noDataText='No se encontró ningun beneficiario'           
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
                <Column dataField='inssAlternative' caption="Inss 2"  width={100}></Column>                
              
                <Column dataField="identification" width={140} />
                <Column dataField="firstName" caption="Nombre"  />
                <Column dataField="lastName" caption="Apellidos"  />
                <Column dataField="birthDate" caption="Fecha Nac." width={140} dataType="date"  format={formatDate}/>
                <Column dataField="ralation" caption="Relacion"  />
                <Column dataField="status" caption="Estado"  />
               
                <Column dataField="phoneNumber"  visible={false} caption="Telefono" width={150} />
                <Column dataField="cellNumber"  visible={false} caption="Celular" width={150} />
               
                <Column dataField="email"  visible={false} caption="Correo"/>
               
                <Column dataField='address' caption="Dirección" visible={false}></Column>
            </DataGrid>
        </div>
    );
}

export default BeneficiariosAll;
