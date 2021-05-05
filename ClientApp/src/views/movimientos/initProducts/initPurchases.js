import React from 'react';
import { inPutProductTypes } from '../../../data/catalogos';
import InPutProducts from '../inPutProducts/InPutProducts';
import { resources } from '../../../data/app';
import NuevoPurchase from './NuevoPurchase';
import { dialogPurchase } from '../../../store/inPutProductPurchase/purchaseDialogReducer';

const initPurchases = () => {

    const title ='Compras';
    const btnAddText ='Nueva Compra';
    const typeId = inPutProductTypes.compra;
    const printName = 'compra';

    return (
        <InPutProducts 
            title={title} 
            btnAddText={btnAddText} 
            typeId={typeId} icon="dx-icon-cart color-icon-green" 
            resourcesId = {resources.compras}
            printName={printName}
            Component={NuevoPurchase}
            dialog = {dialogPurchase}/>
    );
}

export default initPurchases;
