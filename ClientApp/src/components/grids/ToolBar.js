export const onToolbar = (actions, grid) => e => {   

    const options = [];

    if(actions.export)
        options.push({
            location: 'before',
            widget: 'dxButton',
            options: {
                text: 'Exportar a excel',
                icon: 'xlsxfile',
                type: 'success',
                stylingMode: "outlined",
                onClick: () => grid.current.instance.exportToExcel(false)
            }
        }); 

    e.toolbarOptions.items.unshift(...options);
}