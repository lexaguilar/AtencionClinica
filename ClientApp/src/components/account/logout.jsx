import React from "react";
import { _path } from "../../data/headerNavigation";
import { userService } from "../../services/user.service";


function Logout(props) {

    userService.logout();

    props.history.push({ pathname : `${_path.CLINICA}/login`});

    return (
        <div></div>
    );

}


export default Logout;
