import React from 'react';
import DataGrid, { Column, Pager,
    Paging,} from 'devextreme-react/data-grid';
import { store } from '../../services/store';
import BlockHeader from '../../components/shared/BlockHeader';
import { createProxy } from '../../utils/proxy';
import { formatDate } from '../../data/app';
import urlReport from '../../services/reportServices';

const GridListaExamenesPte = ({ beneficiaryId = 0, customerId = 0 }) => {

    let localStore = [];

    if (customerId > 0)
        localStore = store({ uri: createProxy(`privateCustomers/${customerId}/tests`) });

    const title = 'Examenes hechos al paciente';

    const report = urlReport();
    const addMenuItems = (e) => {
        if (e.target == "content") {
            if (!e.items) e.items = [];

            if (e.row?.data) {

                e.items.push({
                    text: 'Imprimir examenes',
                    icon: 'print',
                    onItemClick: () => {

                        report.print(`${report.testsResult(e.row.data.testDetailId)}`);

                        // let { id } = e.row.data;
                        // dispatch(openDialogServiceTest({ id, beneficiaryId}));

                    }
                });

            }
        }
    }

    return (
        <div className="mr-10">
            <BlockHeader title={title} />
            <DataGrid id="gridContainer"
                selection={{ mode: 'single' }}
                dataSource={localStore}
                showBorders={true}
                showRowLines={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
                remoteOperations={{
                    paging: true,
                    filtering: true
                }}
                onContextMenuPreparing={addMenuItems}
            >
                <Paging defaultPageSize={20} />
                <Pager
                    showInfo={true}
                    showPageSizeSelector={true}
                    allowedPageSizes={[10, 20, 50]}
                />
                <Column dataField="testDetailId" visible={false}/>
                <Column dataField="createAt" caption="Fecha" width={170} dataType='date' format={formatDate} />
                <Column dataField="testName" caption="Examen" />
                <Column dataField="doctor" caption="Medico" width={130} />
              
            </DataGrid>
        </div>
    );
}

export default GridListaExamenesPte;
