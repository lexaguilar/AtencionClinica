import React, { useState, useEffect, useRef } from 'react';
import Form, { SimpleItem, GroupItem, Label, RequiredRule, StringLengthRule } from 'devextreme-react/form';
import DataGrid,{ 
    Paging, 
    Pager, 
    FilterRow, 
    HeaderFilter, 
    Column, 
   } from 'devextreme-react/data-grid';
import { useDispatch, useSelector } from 'react-redux'
import ScrollView from 'devextreme-react/scroll-view';
import { Button } from 'devextreme-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import uri from '../../utils/uri';
import { obtenerTasaCambio } from '../../utils/common';
import http from '../../utils/http';
import notify from 'devextreme/ui/notify';
import { dialogWorkOrder } from '../../store/workOrder/workOrderDialogReducer';
import Information from '../../components/beneficiary/Information';
import { createStoreLocal } from '../../utils/proxy';
import { areaRestrict, editorOptionsSelect } from '../../data/app';
import GridMedicamentos from './GridMedicamentos';
import GridProcedimientos from './GridProcedimientos';
import GridListaMedicamentoPte from './GridListaMedicamentoPte';

const ServiceTest = () => {

    return(
        <div>En proceso</div>
    )

    // const { serviceTestDialog : { open, beneficiaryId, id }, user } = useSelector(store => store);

    // console.log(beneficiaryId);

    // return (
    //     <div>
    //         <Information beneficiaryId={beneficiaryId}/>
    //         <DataGrid
    //             ref={(ref) => dataGrid = ref }
    //             selection={{ mode: 'single' }}
    //             dataSource={store({uri : uri.workOrdersServices(id) })}
    //             showBorders={true}
    //             showRowLines={true}
    //             allowColumnResizing={true}
    //             allowColumnReordering={true}
    //             onSelectionChanged={onSelectionChanged}
    //         >
    //             <Paging defaultPageSize={20} />
    //             <Pager
    //                 showPageSizeSelector={true}
    //                 allowedPageSizes={[10, 20, 50]}
    //             />
    //             <FilterRow visible={true} />
    //             <HeaderFilter visible={true} />
    //             <Column dataField="id" width={100}/>
    //             <Column dataField="name" caption='Procedimiento' />
    //         </DataGrid> 
    //     </div>
    // );
}

export default ServiceTest;
