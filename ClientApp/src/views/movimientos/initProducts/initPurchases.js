import React from 'react';
import { inPutProductTypes } from '../../../data/catalogos';
import InPutProducts from '../inPutProducts/InPutProducts';
import NuevoPurchase from './NuevoPurchase';

const initPurchases = () => {

    const title ='Compras';
    const btnAddText ='Nueva Compra';
    const typeId = inPutProductTypes.compra;

    return (
        <InPutProducts title={title} btnAddText={btnAddText} typeId={typeId} icon="dx-icon-cart color-icon-green" Component={NuevoPurchase}/>
    );
}

export default initPurchases;
