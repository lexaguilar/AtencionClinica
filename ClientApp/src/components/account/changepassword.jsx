import React, { useState } from "react";
import { userService } from "../../services/user.service";
import notify from "devextreme/ui/notify";
import { useDispatch } from "react-redux";
import * as actions from '../../store/user/userActions';
import { ToastContainer } from "react-toastify";
import Footer from "../footer";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

function ChangePassword(props) {

    const currenteUser = useSelector(store => store.user); 

    const dispatch = useDispatch();
    const [user, setUser] = useState({ 
        username: currenteUser.username, 
        oldPassword: "", 
        newPassword: "",
        repeatPassword: "" 
    });
    const [loading, setLoading] = useState(false);

    const onValueChange = e => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    }

    const sendUser = (e) => {

        e.preventDefault();

        setLoading(true);
        userService.changePassword(user)
        .then(userResp => {

            let pathname = '/account/login';
           
            props.history.push({ pathname }, {username : currenteUser.username});

        }).catch(err => {
            setLoading(false)
            notify(err, "error")
        });

    }

    return (
        <React.Fragment>
            <ToastContainer autoClose={5000} hideProgressBar />
            <div className="wrapper-login">
                <form className="form-signin" onSubmit={sendUser}>                 
                    <div style={{ paddingTop: 50 }}>
                        <h4>Iniciar sesión</h4>
                        <input value={user.username} type="text" className="form-control" name="username" placeholder="Usuario" required="" readOnly={true}/>
                        <input value={user.oldPassword} onChange={onValueChange} type="password" className="form-control" name="oldPassword" placeholder="Contraseña  actual" required  autoFocus={true} />
                        <input value={user.newPassword} onChange={onValueChange} type="password" className="form-control" name="newPassword" placeholder="Nueva contraseña" required />
                        <input value={user.repeatPassword} onChange={onValueChange} type="password" className="form-control" name="repeatPassword" placeholder="Repetir contraseña" required />
                    </div>
                    <Link to={'/clinica/'} >Regresar</Link>
                    <br />
                    <input 
                        className="btn btn-lg btn-primary btn-block" 
                        type="submit" 
                        value={loading ? "Iniciando..." : "Cambiar contraseña"}                         
                        disabled={loading}/>
                </form>
            </div>
            <footer className="site__footer">
                <Footer />
            </footer>
        </React.Fragment>
    );

}

export default ChangePassword;
