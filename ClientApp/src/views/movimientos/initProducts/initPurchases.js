import React from 'react';
import InPutProducts from '../inPutProducts/InPutProducts';
import NuevoPurchase from './NuevoPurchase';

const initPurchases = () => {

    const title ='Compras';
    const btnAddText ='Nueva Compra';
    const typeId = 1;

    return (
        <InPutProducts title={title} btnAddText={btnAddText} typeId={typeId} Component={NuevoPurchase}/>
    );
}

export default initPurchases;
