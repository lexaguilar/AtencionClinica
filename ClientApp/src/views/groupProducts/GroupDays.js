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
import DaysGroup from './DaysGroup';
import Group from './Group';

const GroupDays = () => {

    const { authorized } = useAuthorization([resources.administracion, dataAccess.access ]);
    const [groupId, setGroupId] = useState(0);

    const title = 'Calendario de grupo';

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
                <DaysGroup groupId={groupId}/>
            </div>
        </div>
    );
}

export default GroupDays;
