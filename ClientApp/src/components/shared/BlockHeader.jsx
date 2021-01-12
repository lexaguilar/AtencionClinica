// react
import React from 'react';
function BlockHeader({title, children}) {

    return (
        <div className="block-header">
            <h3 className="block-header__title">{title}</h3>
            <div className="block-header__divider" />       
            {children}
        </div>
    );
}

export default BlockHeader;
