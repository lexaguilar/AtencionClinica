// react
import React from 'react';

// third-party
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HomePage from './home/HomePage';

// application
import Footer from './footer';
import Header from './header';
import MobileMenu from './mobile/MobileMenu';

import catalogos from '../data/catalogos';
import Catalogo from './shared/Catalogos';
import { _path } from '../data/headerNavigation';
import Clientes from './clientes';
import MobileHeader from './mobile/MobileHeader';
import PrivateRoute from './header/PrivateRouter';
import Usuarios from './usuarios';
import Entes from './shared/Entes';
import Agenda from './agenda';

function Layout(props) {
    const { match, headerLayout } = props;

    const PrintCatalogos = catalogos.map(c => {
        return  <PrivateRoute key={c} exact path={`${_path[String(headerLayout).toUpperCase()]}/${c}`} render={(props) => (
                    <Catalogo {...props} catalogo={c} />
        )} />
    });
    

    return (
        <React.Fragment>          

            <ToastContainer autoClose={5000} hideProgressBar />

            <MobileMenu layout={headerLayout}/>

            <div className="site">
                <header className="site__header d-lg-none">
                    <MobileHeader />
                </header>

                <header className="site__header d-lg-block d-none">
                    <Header layout={headerLayout} />
                </header>

                <div className="site__body">
                
                    <Switch>
                        <PrivateRoute exact path={`${match.path}`} component={HomePage} />
                        <PrivateRoute exact path={`${_path.CLINICA}/clientes`} component={Clientes} />                         
                        <PrivateRoute exact path={`${_path.CLINICA}/usuarios`} component={Usuarios} />                         
                        <PrivateRoute exact path={`${_path.CLINICA}/agenda/doctores`} render={props => <Entes {...props} ente="Doctores" /> } />                         
                        <PrivateRoute exact path={`${_path.CLINICA}/agenda/vendedores`} render={props => <Entes {...props} ente="Vendedores" /> } />                         
                        <PrivateRoute exact path={`${_path.CLINICA}/agenda`} component={Agenda} />                         
                        {PrintCatalogos}
                    </Switch>
                </div>

                <footer className="site__footer">
                    <Footer />
                </footer>
            </div>
        </React.Fragment>

    )
}

export default Layout;

