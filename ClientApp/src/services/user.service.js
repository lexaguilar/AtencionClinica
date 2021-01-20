import http from "../utils/http"
import uri from "../utils/uri"

const tokenName = 'token';

/**
 * Logea un usuario y guarda el token
 */
const login = user => http(uri.account).asPost(user).then(resp => setToken(resp));

/**
 * Eliminar el token guardado en memoria
 */
const logout = () => localStorage.removeItem(tokenName);

/**
 * Guarda el token en memoria
 * @param {string} token -  token que se va guardar
 * @return {object} - Objeto del usuario
 */
const setToken = resp => (localStorage.setItem(tokenName, resp.token), resp);

/**
 * Retorna el token guardado en memoria
 * @return {string} token
 */
const getToken = () => localStorage.getItem(tokenName);

/**
 * Retorna el token guardado en memoria
 * @return {boolean}
 */
const isLogged = () => getToken() != null;

export const userService = {
    login,
    logout,
    getToken,
    isLogged
}