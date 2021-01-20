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
import errorReducer from './errorHandler';
import subsidioReducer from './subsidio';
import dialogReducer from './dialog';


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
    error: errorReducer,
    subsidio: subsidioReducer,
    dialog: dialogReducer,
});