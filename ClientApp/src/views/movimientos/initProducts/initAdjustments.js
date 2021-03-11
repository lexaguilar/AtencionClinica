import React from 'react';
import { inPutProductTypes } from '../../../data/catalogos';
import InPutProducts from '../inPutProducts/InPutProducts';
import Nuevo from './Nuevo';

const initAdjustments = () => {

    const title ='Ajuste de entrada';
    const btnAddText ='Nueva entrada';
    const typeId = inPutProductTypes.ajusteEntrada;

    return (
        <InPutProducts title={title} btnAddText={btnAddText} typeId={typeId} icon="dx-icon-increaseindent color-icon-green" Component={props => <Nuevo {...props} exists={true} />}/>
    );
}

export default initAdjustments;
