import React, { useState } from "react";
import { userService } from "../services/user.service";

/**
 * Retorna el un componente si el usuario no tiene permiso al recurso actual
 * @param {{resourceId : boolean, action : Number}} token -  token que se va guardar
 * @return {{isAuthorization: false  Unauthorized}} token
 */
const useAuthorization = ([resourceId, action]) => {
    
    const user = userService.getUser();

    const resource = user.resources.find(x => x.resource == resourceId);
    
    const [ isAuthorization ] = useState( (resource.action & action) > 0);

    return {
        isAuthorization,
        Unauthorized
    }
}

const Unauthorized = props => {
    return (
        <div className="container small text-center text-danger mt-25">
            <p>El usuario no tiene permisos para este recurso</p>
        </div>
    )
}

export default useAuthorization;