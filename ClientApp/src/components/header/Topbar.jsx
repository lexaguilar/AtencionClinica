// react
import React from 'react';

import { connect } from 'react-redux';
// third-party
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

// application
import Dropdown from './Dropdown';


function Topbar(props) {
    let  { user } = props;
    const links = [
        { title: <FormattedMessage id="topbar.aplicacion" defaultMessage="Aplicación" />, url: '/clinica/app' }
    ];

    const accountLinks = [
        { title: 'Contraseña', url: '/account/password' },
        { title: 'Salir', url: '/account/logout' },
    ];

    const linksList = links.map((item, index) => (
        <div key={index} className="topbar__item topbar__item--link">
            <Link className="topbar-link" to={item.url}>{item.title}</Link>
        </div>
    ));


    return (
        <div className="site-header__topbar topbar">
            <div className="topbar__container container">
                <div className="topbar__row">
                    {linksList}
                    <div className="topbar__spring" />
                    <div className="topbar__item">
                        <Dropdown
                            title={<><span className="far fa-user-circle"></span> <b>{user.username}</b></>}
                            items={accountLinks}
                        />
                    </div>                                              
                </div>
            </div>
        </div>
    );

}

const mapStateToProps = (state) => ({   
    user: state.user,        
});

export default connect(mapStateToProps, null)(Topbar);