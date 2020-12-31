import http from "./http";
import CustomStore from 'devextreme/data/custom_store';
import toCapital from "./common";

const createProxy = (get = '', insert = '', remove = (id = 0) => '', getById = (id = 0) => '') => ({get, insert, remove, getById });
const createProxyBase = root => createProxy(`${root}/get`, `${root}/post`, id => `${root}/${id}/delete`, id => `${root}/get/${id}`)


/**
 * returna una url despues del prefijo api/catalogsCustom/ 
 * @param {name} name -  nombre de la accion
 */
const createStore = name => createCustomStore(`catalogos/${toCapital(name)}`)();

const createStoreLocal = ({ name = required('name'), local = required('local'), url = '' }) => {
    return {
        store: new CustomStore({
            key: "id",
            loadMode: "raw",
            load: function() {
                return new Promise(resolve => {
                    let endPoint = url || `catalogos/${toCapital(name)}`
                    if (local[name] && local[name].length)
                        resolve(local[name]);
                    else
                        http(endPoint)
                        .asGet()
                        .then(r => {
                            local[name] = r;
                            resolve(local[name]);
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
const createCustomStore = url => myStore => {

    return {
        store: new CustomStore({
            key: "id",
            loadMode: "raw",
            load: function() {
                return new Promise(resolve => {
                    http(url)
                        .asGet()
                        .then(r => resolve(typeof myStore == 'function' ? myStore(r) : r))
                });
            }
        })
    }

}

export { createProxy, createProxyBase, createStore, createStoreLocal, createCustomStore, required };