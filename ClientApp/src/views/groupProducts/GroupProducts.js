import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { DataGrid } from 'devextreme-react';
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
import ProductsGroup from './ProductsGroup';
import Group from './Group';

const GroupProducts = () => {

    const { authorized } = useAuthorization([resources.administracion, dataAccess.access ]);
    const { user } = useSelector(store => store);
    const [groupId, setGroupId] = useState(0);

    const title = 'Productos por grupo';

    const onSelectionChanged = (e) => {
        if(e.selectedRowsData){
            let data = e.selectedRowsData[0];
            setGroupId(data.id);
        }
    }

    return authorized(
        <div className="container">
            <Title title={title}/>
            <BlockHeader title={title}/>
            <div className="row-elemet">   
                <div className="mr-10">        
                    <Group onSelectionChanged={onSelectionChanged}/>                    
                </div>    
                <ProductsGroup groupId={groupId} user={user} />
            </div>
        </div>
    );
}

export default GroupProducts;
