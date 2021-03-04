import http from "../utils/http"
import uri from "../utils/uri"

const tokenName = 'token';
const _user = 'user';

/**
 * Logea un usuario y guarda el token
 */
const login = user => http(uri.account).asPost(user).then(resp => setToken(resp));


const changePassword = user => http(uri.changepassword).asPost(user);

const resetPassword = user => http(uri.resetPassword).asPost(user);
/**
 * Eliminar el token guardado en memoria
 */
const logout = () => {

    localStorage.removeItem(tokenName);
    localStorage.removeItem(_user);
    
} 

/**
 * Guarda el token en memoria
 * @param {string} token -  token que se va guardar
 * @return {object} - Objeto del usuario
 */
const setToken = resp => 
{
    localStorage.setItem(tokenName, resp.token);
    localStorage.setItem(_user, JSON.stringify(buildUser(resp)));

    return resp;
}

const buildUser = ({token, ...rest}) => rest;

/**
 * Retorna el token guardado en memoria
 * @return {string} token
 */
const getToken = () => localStorage.getItem(tokenName);

/**
 * Retorna el usuario guardado en memoria
 * @return {{ resources : []}} token
 */
const getUser = () => JSON.parse(localStorage.getItem(_user));

/**
 * Verificar si el usuario esta logeado
 * @return {boolean}
 */
const isLogged = () => getToken() != null;

export const userService = {
    login,
    changePassword,
    resetPassword,
    logout,
    getToken,
    getUser,
    isLogged
}