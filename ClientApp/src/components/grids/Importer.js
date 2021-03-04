import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';

const onExporting = (e, title) => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Main sheet');

    exportDataGrid({
        component: e.component,
        worksheet: worksheet
    }).then(function() {
        workbook.xlsx.writeBuffer()
            .then(function(buffer) {
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `${title}.xlsx`);
            });
    });
    e.cancel = true;
}

export default onExporting;