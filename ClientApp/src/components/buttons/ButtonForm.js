import React from 'react';
import { Button } from 'devextreme-react/button';

const ButtonForm = ({saving, textSaving, onClick}) => {
    return (
        <Button
            text={`${saving?'Guardando...': textSaving}`}
            type="success"
            icon="save"
            stylingMode="contained"
            className="m-1"
            disabled={saving}
            onClick={onClick}
        />      
    );
}

export default ButtonForm;
