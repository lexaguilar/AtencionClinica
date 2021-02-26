import React, { useState } from "react";
import { userService } from "../../services/user.service";
import notify from "devextreme/ui/notify";
import { ToastContainer } from "react-toastify";
import Footer from "../footer";
import { Link } from "react-router-dom";

function ResetPassword(props) {   

    const [user, setUser] = useState({ username: "" });
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const onValueChange = e => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    }

    const sendUser = e => {
        e.preventDefault();
        setLoading(true);
        userService.resetPassword(user)
        .then(userResp => {

            setEmail(userResp.email);

            
        }).catch(err => {
            setLoading(false)
            notify(err, "error")
        });

    }

    const Login = () =>     <div>                                
                                <input value={user.username} onChange={onValueChange} type="text" className="form-control" name="username" placeholder="Usuario o correo" required autoFocus={true} />
                                <br />
                                <input
                                    className="btn btn-lg btn-primary btn-block" 
                                    type="submit" 
                                    value={loading ? "Restableciendo..." : "Restablecer"}                         
                                    disabled={loading}/>
                            </div>
                           

    const Info = () =>  <div>
                            <p>La contraseña fue restablecida y enviada al correo <b>{email}</b></p>
                        </div>

    return (
        <React.Fragment>
            <ToastContainer autoClose={5000} hideProgressBar />
            <div className="wrapper-login">
                <form className="form-signin" onSubmit={sendUser}>
                    <div className="imglog">
                        <img className="nav-panel-logo" width={200} src={require('../../svg/logoclinica.png')} />
                    </div>
                    <div style={{ paddingTop: 50 }}>
                        <h4>Restablecer contraseña</h4>
                        {email ? <Info /> : <Login />}
                    </div>                   
                    <br/>
                    <Link to={'/account/login'} >Iniciar sesión</Link>
                </form>;
            </div>
            <footer className="site__footer">
                <Footer />
            </footer>
        </React.Fragment>
    );

}

export default ResetPassword;
