import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, DataGrid, SelectBox } from 'devextreme-react';
import { 
    Paging, 
    Pager, 
    FilterRow, 
    HeaderFilter, 
    Column, 
   } from 'devextreme-react/data-grid';

import uri from '../../utils/uri';
import { store } from '../../services/store';
import Title from '../../components/shared/Title';
import BlockHeader from '../../components/shared/BlockHeader';
import useAuthorization from '../../hooks/useAuthorization';
import { dataAccess, resources } from '../../data/app';
import ProductsProcedimientos from './ProductsProcedimientos';
import { Item } from 'devextreme-react/box';
import http from '../../utils/http';

const ProcedimientoEstandar = () => {

    const { authorized } = useAuthorization([resources.administracion, dataAccess.access ]);
    const { user } = useSelector(store => store);
    const [serviceId, setServiceId] = useState(0);
    const [areas, setAreas] = useState([]);
    const [areaId, setAreaId] = useState(0);
    const [services, setServices] = useState([]);

    const title = 'Estandares de productos';

    const changeArea = (e) => {
        setAreaId(e.value)
    }

    const onSelectionChanged = (e) => {
        if(e.selectedRowsData){
            let data = e.selectedRowsData[0];
            if(data)
                setServiceId(data.id);
            else
                setServiceId(0);
        }
    }

    useEffect(() => {
        http(uri.areas.get).asGet().then(resp => setAreas(resp));
    }, [0]);

    useEffect(() => {  
        http(`services/area/${areaId}/get`).asGet({ active:true }).then(resp => setServices(resp));
    }, [areaId]);


    return authorized(
        <div className="container">
            <Title title={title}/>
            <BlockHeader title={title}/>
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
            </Box>
            <div className="row-elemet">   
                <div className="mr-10">        
                <DataGrid
                        selection={{ mode: 'single' }}
                        dataSource={services}
                        showBorders={true}
                        showRowLines={true}
                        allowColumnResizing={true}
                        allowColumnReordering={true}
                        onSelectionChanged={onSelectionChanged}
                    >
                        <Paging defaultPageSize={20} />
                        <Pager
                            showPageSizeSelector={true}
                            allowedPageSizes={[10, 20, 50]}
                        />
                        <FilterRow visible={true} />
                        <HeaderFilter visible={true} />
                        <Column dataField="id" width={100}/>
                        <Column dataField="name" caption='Procedimiento' />
                    </DataGrid>          
                </div>
                <ProductsProcedimientos serviceId={serviceId} user={user} />
            </div>
        </div>
    );
}

export default ProcedimientoEstandar;
