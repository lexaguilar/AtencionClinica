import React from 'react';
import { Button } from 'devextreme-react/button';

const ButtonForm = ({saving, textSaving, onClick, visible=true, icon="save"}) => {
    return (
        <Button
            text={`${saving?'Guardando...': textSaving}`}
            type="success"
            icon={icon}	
            stylingMode="contained"
            className="m-1"
            disabled={saving}
            onClick={onClick}
            visible={visible}
        />      
    );
}

export default ButtonForm;
