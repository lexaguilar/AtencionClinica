// react
import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { getAppInfo } from '../../store/app/appActions';
import { getUser } from '../../store/user/userActions';

class Footer extends Component {
    constructor(props) {
        super(props);       
    }

    componentDidMount() {
        let { getAppInfo, getUser } = this.props;
        getAppInfo();        
        getUser();
    }

    
    render() {

        let { app, user, showInfo } = this.props;

        return (
            <div className="site-footer">
                <div className="container">

                    <div className="site-footer__bottom">
                        <div className="site-footer__copyright">
                            {app.name}
                            {' '}
                        — Version
                        {' '}
                            {app.version}
                        </div>
                        {showInfo && 
                            <div className="site-footer__payments">
                                <i className="fa fa-home text-danger"></i> Area : {user.area}
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    app: state.appInfo,
    user : state.user
});

const mapDispatchToPros = ({
    getAppInfo,
    getUser,
});

export default connect(mapStateToProps, mapDispatchToPros)(Footer);
