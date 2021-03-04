import React from "react";
import { userService } from "../services/user.service";

const Authorized = isAuthorization => component => {
    return isAuthorization ? component : (
        <div className="container small text-center text-danger mt-25">
            <p>El usuario no tiene permisos para este recurso</p>
        </div>
    )
}

/**
 * Retorna el un componente si el usuario no tiene permiso al recurso actual
 * @param {{resourceId : boolean, action : Number}} token -  token que se va guardar
 * @return {{isAuthorization: false  Unauthorized}} token
 */
const useAuthorization = ([resourceId, action]) => {
    
    const user = userService.getUser();

    const resource = user.resources.find(x => x.resource == resourceId);
    
    const isAuthorization = (resource.action & action) > 0;

    return {
        isAuthorization,
        authorized : Authorized(isAuthorization)
    }
}

export default useAuthorization;