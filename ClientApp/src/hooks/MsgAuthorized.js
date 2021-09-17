import React from 'react';

const MsgAuthorized = ({resourceId, message = 'El usuario no tiene permisos para este recurso'}) => {

    const msg = `${message} ${resourceId}`;

    return (
        <div className="container small text-center text-danger mt-25">
            <p>{msg}</p>
        </div>
    );
}

export default MsgAuthorized;
