import React, { useState } from "react";
import { userService } from "../../services/user.service";
import notify from "devextreme/ui/notify";
import { useDispatch } from "react-redux";
import * as actions from '../../store/user/userActions';
import { ToastContainer } from "react-toastify";
import Footer from "../footer";

function Login(props) {

    const dispatch = useDispatch();
    const [user, setUser] = useState({ username: "", password: "" });
    const [ loading, setLoading] = useState(false);

    const onValueChange = e => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    }

    const sendUser = () => {
        setLoading(true);
        userService.login(user).then(userResp => {

            let pathname = props?.location?.state?.from?.pathname || '/';

            dispatch(actions.updateUser({ username: userResp.username }));
            props.history.push({ pathname });

        }).catch(err => 
        {
            setLoading(false)
            notify(err, "error")
        });

    }

    return (
        <React.Fragment>
            <ToastContainer autoClose={5000} hideProgressBar />
            <div className="wrapper-login">
                <form className="form-signin">
                    <img className="nav-panel-logo" width={300} src={require('../../svg/logoclinica.png')} />
                    <div style={{paddingTop:50}}>
                        <h4>Iniciar sesión</h4>
                        <input value={user.username} onChange={onValueChange} type="text" className="form-control" name="username" placeholder="Usuario" required="" autoFocus={true} />
                        <input value={user.password} onChange={onValueChange} type="password" className="form-control" name="password" placeholder="Contraseña" required="" />
                    </div>
                        
                    <a href="/">Olvide mi Contraseña</a>
                    <br />
                    <button className="btn btn-lg btn-primary btn-block" type="button" onClick={sendUser} disabled={loading} >
                        {loading ? "Iniciando..." : "Login"}
                    </button>
                </form>
            </div>
            <footer className="site__footer">
                <Footer />
            </footer>
        </React.Fragment>
    );

}

export default Login;
