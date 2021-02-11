
const gridsHelper = (gridRef, options) => {
    const onToolbarPreparing = (e) => {  
        e.toolbarOptions.items.unshift({
            location: 'before',
            widget: 'dxButton',
            options: {
                text: options.text,
                icon:options.icon,
                onClick: () =>  gridRef.current.instance.addRow()
            }
        });
    } 
    
    return onToolbarPreparing;
}

export default gridsHelper;
