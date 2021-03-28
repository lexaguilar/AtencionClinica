export const addMenu = (e, items) => {

    if (e.target == "content") {
       
        if (!e.items) e.items = [];
       
        if (e.rowIndex >= 0)
            e.items.push(...items);

    }

}