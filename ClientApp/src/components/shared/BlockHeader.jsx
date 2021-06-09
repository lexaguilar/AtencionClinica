// react
import React from 'react';
function BlockHeader({title, icon, children}) {

    return (
        <div className="block-header">
            <h3 className="block-header__title">{title} {icon && <span className={icon} style={{fontSize : 20}}></span>}</h3>
            <div className="block-header__divider" />       
            {children}
        </div>
    );
}

export default BlockHeader;
