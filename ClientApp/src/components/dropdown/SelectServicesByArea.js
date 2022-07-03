import React from 'react';
import { SelectBox } from 'devextreme-react';
import useAreas from '../../hooks/useAreas';
import useAreaServices from '../../hooks/useAreaServices';

const SelectServicesByArea = ({ useMargin = false, onValueChanged, areaId } ) => {

    const { services } = useAreaServices({areaId});

    const margin = useMargin ? 'l-10' : '';

    return (
        
        <SelectBox items={services}
            placeholder="Selecciona un servicio"
            showClearButton={true} 
            valueExpr="serviceId" 
            displayExpr={e => e ? `${e.serviceId}-${e.service}` : ''}
            onValueChanged={onValueChanged}                         
        />
       
    );
}

export default SelectServicesByArea;
