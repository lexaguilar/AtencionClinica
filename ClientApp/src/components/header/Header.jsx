// react
import React from 'react';
import { useDispatch } from "react-redux";
import { getCatalogs } from '../../store/catalogs/catalogReducer';

// application
import NavPanel from './NavPanel';
import Topbar from './Topbar';


function Header(props) {
    
    const dispatch = useDispatch();
    dispatch(getCatalogs());

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
