
const gridsHelper = (gridRef, options) => {

    
    const onToolbarPreparing = (e) => {  
        e.toolbarOptions.items.unshift({
            location: 'before',
            widget: 'dxButton',
            options: {
                stylingMode:"outlined",
                text: options.text,
                icon:options.icon,
                type:'default',
                onClick: () =>  gridRef.current.instance.addRow()
            }
        });
    } 
    
    return onToolbarPreparing;
}

const exportToExcel = (grid) => {

    localStorage.setItem('requireTotalCount', 'false');
    try {
        grid.current.instance.exportToExcel(false);        
    } catch (error) {
        localStorage.removeItem('requireTotalCount');
    }

}

export { exportToExcel };

export default gridsHelper;
