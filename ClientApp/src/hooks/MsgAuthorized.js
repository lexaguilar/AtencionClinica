import React from 'react';

const MsgAuthorized = ({message = 'El usuario no tiene permisos para este recurso'}) => {
    return (
        <div className="container small text-center text-danger mt-25">
            <p>{message}</p>
        </div>
    );
}

export default MsgAuthorized;
