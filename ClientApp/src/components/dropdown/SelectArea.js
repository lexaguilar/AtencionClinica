import React from 'react';
import { SelectBox } from 'devextreme-react';
import useAreas from '../../hooks/useAreas';

const SelectAreas = ({ useMargin = false, onValueChanged } ) => {

    const { areas } = useAreas();

    const margin = useMargin ? 'l-10' : '';

    return (
        
        <SelectBox items={areas}
            placeholder="Selecciona un producto"
            showClearButton={true} valueExpr="id" displayExpr="name" 
            onValueChanged={onValueChanged}                         
        />
       
    );
}

export default SelectAreas;
