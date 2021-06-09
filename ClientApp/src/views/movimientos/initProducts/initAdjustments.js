import React from 'react';
import { inPutProductTypes } from '../../../data/catalogos';
import InPutProducts from '../inPutProducts/InPutProducts';
import { resources } from '../../../data/app';
import Nuevo from './Nuevo';

const initAdjustments = () => {

    const title ='Ajuste de entrada';
    const btnAddText ='Nueva entrada';
    const typeId = inPutProductTypes.ajusteEntrada;
    const printName = 'ajusteentrada';

    return (
        <InPutProducts 
            title={title} 
            btnAddText={btnAddText} 
            typeId={typeId} 
            icon="dx-icon-increaseindent color-icon-green" 
            printName={printName}
            resourcesId = {resources.movimientos}
            Component={props => <Nuevo {...props} exists={true} />}
        />
    );
}

export default initAdjustments;
