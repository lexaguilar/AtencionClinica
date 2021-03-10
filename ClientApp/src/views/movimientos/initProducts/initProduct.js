import React from 'react';
import { inPutProductTypes } from '../../../data/catalogos';
import InPutProducts from '../inPutProducts/InPutProducts';
import Nuevo from './Nuevo';

const initProduct = () => {

    const title ='Saldos iniciales';
    const btnAddText ='Nuevo saldo inicial';
    const typeId = inPutProductTypes.saldoInicial;

    return (
        <InPutProducts title={title} btnAddText={btnAddText} typeId={typeId} Component={Nuevo}/>
    );
}

export default initProduct;
