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
import MobileHeader from './mobile/MobileHeader';
import PrivateRoute from './header/PrivateRouter';
import Percapita from '../views/percapita';
import Admisiones from '../views/admision';
import Nuevo from '../views/admision/Nuevo';
import Beneficiarios from '../views/beneficiarios';
import Follows from '../views/follows';
import Subsidies from '../views/subsidies';
import Doctores from '../views/doctores';
import DoctoresById from '../views/doctores/DoctoresById';
import Appointments from '../views/appointments';
import * as AppointmentsNuevo from '../views/appointments/Nuevo';
import Paciente from './search/Paciente';
import Bills, { BillNuevo } from '../views/bills';
import Privados from '../views/privados';
import Procedimientos from '../views/procedimientos/Procedimientos';
import ProcedimientosXarea from '../views/procedimientos/ProcedimientosXarea';
import AreaProcedimientos from '../views/procedimientos/AreaProcedimientos';
import Parameters from '../views/condig/Parameters';
import OutPutProducts from '../views/movimientos/outPutProducts';
import InPutProducts from '../views/movimientos/inPutProducts';
import Products from '../views/products';
import Users from '../views/users';
import Roles from '../views/roles';
import Resources from '../views/resources';
import Rates from '../views/rates';

function Layout(props) {
    const { match, headerLayout } = props;

    const PrintCatalogos = catalogos.map(c => {
        return  <PrivateRoute key={c.name} exact path={`${_path[String(headerLayout).toUpperCase()]}/${c.name}`} render={(props) => (
                    <Catalogo {...props} {...c} />
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
                        {PrintCatalogos}
                        <PrivateRoute exact path={`${match.path}`} component={HomePage} />                              
                        <PrivateRoute exact path={`${_path.CLINICA}/config/percapitas`} component={Percapita} />                         
                        <PrivateRoute exact path={`${_path.CLINICA}/admisiones`} component={Admisiones} />                         
                        <PrivateRoute path={`${_path.CLINICA}/admisiones/nuevo`} component={Nuevo} />                         
                        <PrivateRoute exact path={`${_path.CLINICA}/citas`} component={Appointments} />                         
                        <PrivateRoute path={`${_path.CLINICA}/citas/nuevo`} component={AppointmentsNuevo.default} />                         
                        <PrivateRoute exact path={`${_path.CLINICA}/beneficiarios`} component={Beneficiarios} />                         
                        <PrivateRoute exact path={`${_path.CLINICA}/privados`} component={Privados} />                         
                        <PrivateRoute exact path={`${_path.CLINICA}/servicios`} component={Follows} />                         
                        <PrivateRoute exact path={`${_path.CLINICA}/subsidios`} component={Subsidies} />                         
                        <PrivateRoute exact path={`${_path.CLINICA}/doctores`} component={Doctores} />   
                        <PrivateRoute exact path={`${_path.CLINICA}/doctores/horarios`} component={DoctoresById} />   
                        <PrivateRoute exact path={`${_path.CLINICA}/paciente/:id`} component={Paciente} />
                        <PrivateRoute exact path={`${_path.CLINICA}/facturas`} component={Bills} />                         
                        <PrivateRoute path={`${_path.CLINICA}/facturas/nuevo`} component={BillNuevo} />    
                        <PrivateRoute exact path={`${_path.CLINICA}/procedimientos`} component={Procedimientos} />   
                        <PrivateRoute exact path={`${_path.CLINICA}/area/procedimientos`} component={AreaProcedimientos} />   
                        <PrivateRoute exact path={`${_path.CLINICA}/config/parameters`} component={Parameters} />   
                        <PrivateRoute exact path={`${_path.CLINICA}/movimientos/salidas`} component={OutPutProducts} />   
                        <PrivateRoute exact path={`${_path.CLINICA}/movimientos/entradas`} component={InPutProducts} />   
                        <PrivateRoute exact path={`${_path.CLINICA}/productos`} component={Products} />   
                        <PrivateRoute exact path={`${_path.CLINICA}/tasa-de-cambio`} component={Rates} />   

                        <PrivateRoute exact path={`${_path.CLINICA}/usuarios`} component={Users} />   
                        <PrivateRoute exact path={`${_path.CLINICA}/roles`} component={Roles} />   
                        <PrivateRoute exact path={`${_path.CLINICA}/permisos`} component={Resources} />   
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

