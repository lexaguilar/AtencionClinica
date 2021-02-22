import React from 'react';
import { Button } from 'devextreme-react/button';

const CustomButton = ({text, icon, onClick, type='default',stylingMode="contained"}) => {
    return (        
            <Button
                className ='btn-header'
                type={type}
                text={text}
                icon={icon}
                stylingMode={stylingMode}
                onClick={onClick}
            />       
    );
}

export default CustomButton;
