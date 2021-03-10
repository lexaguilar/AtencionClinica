
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

export default gridsHelper;
