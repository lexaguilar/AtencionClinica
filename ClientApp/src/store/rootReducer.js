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
import workOrderDialogReducer from './workOrder';
import workOrdersDialogReducer from './workOrders';
import transferDialogReducer from './transfer';
import customDialogReducer from './customDialog';
import serviceTestDialogReducer from './servicetest';

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
    workOrderDialog : workOrderDialogReducer,
    workOrdersDialog : workOrdersDialogReducer,
    productDialog : productDialogReducer,
    catalog : catalogReducer,
    transfer : transferDialogReducer,
    customDialog : customDialogReducer,
    serviceTestDialog : serviceTestDialogReducer,
});