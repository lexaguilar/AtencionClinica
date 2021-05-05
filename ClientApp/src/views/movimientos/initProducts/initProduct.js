import React from 'react';
import { inPutProductTypes } from '../../../data/catalogos';
import InPutProducts from '../inPutProducts/InPutProducts';
import { resources } from '../../../data/app';
import Nuevo from './Nuevo';

const initProduct = () => {

    const title ='Saldos iniciales';
    const btnAddText ='Nuevo saldo inicial';
    const typeId = inPutProductTypes.saldoInicial;
    const printName = 'saldoincial';

    return (
        <InPutProducts 
            title={title} 
            btnAddText={btnAddText} 
            typeId={typeId}  
            icon="dx-icon-increaseindent color-icon-green" 
            resourcesId = {resources.movimientos}
            printName={printName}
            Component={Nuevo}/>
    );
}

export default initProduct;
