import http from "./http";
import CustomStore from 'devextreme/data/custom_store';
import toCapital from "./common";
import { catalogsName } from "../store/consts";

const createProxy = (get = '', insert = '', remove = (id = 0) => '', getById = (id = 0) => '') => ({get, insert, remove, getById });
const createProxyBase = root => createProxy(`${root}/get`, `${root}/post`, id => `${root}/${id}/delete`, id => `${root}/get/${id}`)


/**
 * returna una url despues del prefijo api/catalogsCustom/ 
 * @param {name} name -  nombre de la accion
 */
const createStore = ({ name, active }) => createCustomStore({url : `catalogos/${toCapital(name)}`, active})();

const createStoreLocal = ({ name = required('name'), url = '', active = false }) => {
    return {
        store: new CustomStore({
            key: "id",
            loadMode: "raw",
            load: function() {
                return new Promise(resolve => {

                    let endPoint = url || `catalogos/${toCapital(name)}`
                    let catalogs = JSON.parse(localStorage.getItem(catalogsName));

                    let existe = catalogs?.[name]?.length;

                    if(existe){    
                        let arr = catalogs[name];

                        let first = arr[0];

                        if(first.active && active)
                            resolve(arr.filter(x => x.active))
                        else
                            resolve(arr);
                    }
                    else
                        http(endPoint)
                        .asGet({active})
                        .then(r => {
                            resolve(r);
                        });

                });
            }
        })
    }
}

const required = name => new Error(`El parametro ${name} es requerido`);


/**
 * returna una url despues del prefijo api/catalogsCustom/ 
 * @param {String} url -  nombre de la accion
 * @param {Function} myStore -  nombre de la accion
 */
const createCustomStore = ({url, active = false}) => myStore => {

    return {
        store: new CustomStore({
            key: "id",
            loadMode: "raw",
            load: function() {
                return new Promise(resolve => {
                    http(url)
                        .asGet({active})
                        .then(r => resolve(typeof myStore == 'function' ? myStore(r) : r))
                });
            }
        })
    }

}

export { createProxy, createProxyBase, createStore, createStoreLocal, createCustomStore, required };