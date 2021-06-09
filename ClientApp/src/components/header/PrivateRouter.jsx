import React from "react";
import { Route, Redirect } from "react-router-dom";
import { userService } from '../../services/user.service';


const PrivateRoute = routeProps => {

      let {component: Component,render: Render, ...rest} = routeProps;

      return (<Route exact {...rest} render= { props => 
        userService.isLogged() 
          ? Component ? <Component {...props} /> : <Render {...props}/>
          : <Redirect to={{pathname:'/account/login', state:{from: props.location}}} />
      } />)
};


export default PrivateRoute;
