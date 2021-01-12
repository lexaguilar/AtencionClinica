import React from 'react';
import { Button } from 'devextreme-react/button';
import Popup from 'devextreme-react/popup';

const Dialog = props => {

    const renderPopup =() => {

        const onClick = () => {

        };

        return (
            <div className="popup-property-details">
                <div className="large-text">{props.text}</div>
                <Button
                    icon="favorites"
                    text="Si"
                    width={210}
                    height={44}
                    onClick={onClick}
                />              
            </div>
        );
    }

    const onHidding = () => {

        const { hidding } = props;
        if(hidding) 
            hidding();
            
    }

    return (
        <div>
            <Popup
                width={660}
                height={540}
                showTitle={true}
                title='Advertencia'
                dragEnabled={false}
                closeOnOutsideClick={true}
                visible={props.visible}
                onHiding={onHidding}
                contentRender={renderPopup}
            />
        </div>
    );
}

Dialog.defaultProps = {
    visible:false,
    text : ''
} 

export default Dialog;
