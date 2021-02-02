import React, { useEffect, useState } from 'react';
import { DataGrid } from 'devextreme-react';
import { Column } from 'devextreme-react/data-grid';
import { formatDate } from '../../data/app';
import http from '../../utils/http';
import BlockHeader from '../shared/BlockHeader';

const Paciente = props => {

    const [beneficiaries, setBeneficiaries] = useState([]);

    const { id } = props.match.params;

    useEffect(() => {
       http(`beneficiaries/search/${id}`).asGet().then(resp => setBeneficiaries(resp));
    }, [id]);

    const title = `Resultado de la busqueda de ${id}`;

    return (
        <div className="container">            
            <BlockHeader title={title} />           
            <DataGrid id="gridContainer"
                selection={{ mode: 'single' }}
                dataSource={beneficiaries}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
                noDataText='No se encontró ningun beneficiario'
            >                
                <Column dataField="inss"  width={100} />
                <Column dataField="relationship" width={120} caption="Parentesco">
                </Column> 
                <Column dataField="identification" width={140} />
                <Column dataField="firstName" caption="Nombre"  />
                <Column dataField="lastName" caption="Apellidos"  />
                <Column dataField="birthDate" caption="Fecha Nac." width={140} dataType="date"  format={formatDate}/>
                <Column dataField="sex" width={100} caption="Sexo">
                </Column> 
                <Column dataField="phoneNumber"  visible={false} caption="Telefono" width={150} />
                <Column dataField="cellNumber"  visible={false} caption="Celular" width={150} />               
                <Column dataField="email"  visible={false} caption="Correo"/>
                <Column dataField="beneficiaryStatus" width={100} caption="Estado">
                </Column> 
                <Column dataField='address' caption="Dirección" visible={false}></Column>
               
            </DataGrid>
        </div>
    );
}

export default Paciente;
