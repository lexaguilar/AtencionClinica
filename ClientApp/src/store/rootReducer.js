import { combineReducers } from 'redux';

// reducers
import currencyReducer from './currency';
import localeReducer from './locale';
import mobileMenuReducer from './mobile-menu';
import sidebarReducer from './sidebar';
import corteReducer from './corte'
import userReducer from './user'
import compraReducer from './compra'
import facturaReducer from './factura'
import servicioReducer from './servicio'
import appReducer from './app';
import subsidioReducer from './subsidio';
import dialogReducer from './dialog';
import customerClearReducer from './customer';
import beneficiaryDialogReducer from './beneficiary';
import catalogReducer from './catalogs';
import inPutProductDialogReducer from './inPutProduct';
import outPutProductDialogReducer from './outPutProduct';
import productDialogReducer from './product';
import workOrderOutFollowDialogReducer from './workOrderOutFollow';
import workOrderDialogReducer from './workOrder';
import workOrdersDialogReducer from './workOrders';
import privateWorkOrderDialogReducer from './privateWorkOrder';
import privateWorkOrdersDialogReducer from './privateWorkOrders';
import transferDialogReducer from './transfer';
import transferWithProdcutDialogReducer from './transferWithProduct';
import transferWithServiceDialogReducer from './transferWithService';
import privateTransferWithServiceDialogReducer from './privateTransferWithService';
import privateTransferWithProdcutDialogReducer from './privateTransferWithProduct';
import customDialogReducer from './customDialog';
import serviceTestDialogReducer from './servicetest';
import privateServiceTestDialogReducer from './privateServicetest';
import areaProductDialogReducer from './areaProduct/areaProductDialogReducer';
import convertProductDialogReducer from './convertProduct/convertProductDialogReducer';
import traslateDialogReducer from './traslate';
import purchaseDialogReducer from './inPutProductPurchase/purchaseDialogReducer';

export default combineReducers({
    currency: currencyReducer,
    locale: localeReducer,
    mobileMenu: mobileMenuReducer,
    sidebar: sidebarReducer,
    cortes: corteReducer,
    user: userReducer,
    compra: compraReducer,
    factura: facturaReducer,
    servicio: servicioReducer,
    appInfo: appReducer,
    subsidio: subsidioReducer,
    dialog: dialogReducer,
    customerClear : customerClearReducer,
    beneficiaryDialog : beneficiaryDialogReducer,
    inPutProductDialog : inPutProductDialogReducer,
    outPutProductDialog : outPutProductDialogReducer,
    workOrderOutFollowDialog : workOrderOutFollowDialogReducer,
    workOrderDialog : workOrderDialogReducer,
    workOrdersDialog : workOrdersDialogReducer,
    productDialog : productDialogReducer,
    catalog : catalogReducer,
    transfer : transferDialogReducer,
    transferWithProdcut : transferWithProdcutDialogReducer,   

    privateTransferWithProdcut : privateTransferWithProdcutDialogReducer,
    privateTransferWithService : privateTransferWithServiceDialogReducer,
    transferWithService : transferWithServiceDialogReducer,
    customDialog : customDialogReducer,
    serviceTestDialog : serviceTestDialogReducer,
    privateServiceTestDialog : privateServiceTestDialogReducer,
    areaProductDialog : areaProductDialogReducer,
    convertProductDialog : convertProductDialogReducer,
    purchaseDialog : purchaseDialogReducer,
    traslateDialog : traslateDialogReducer,
    privateWorkOrderDialog : privateWorkOrderDialogReducer,
    privateWorkOrdersDialog : privateWorkOrdersDialogReducer,
});