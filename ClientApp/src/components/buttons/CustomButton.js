import React from 'react';
import { Button } from 'devextreme-react/button';

const CustomButton = ({text, icon, onClick}) => {
    return (        
            <Button
                className ='btn-header'
                width={180}
                type="normal"
                text={text}
                icon={icon}
                onClick={onClick}
            />       
    );
}



export default CustomButton;
