// react
import React from 'react';

// application
import NavPanel from './NavPanel';
import Topbar from './Topbar';


function Header(props) {
    const { layout } = props;    

    return (
        <div className="site-header">
            <Topbar />            
            <div className="site-header__nav-panel">
                <NavPanel layout={layout} />
            </div>
        </div>
    );
}

export default Header;
