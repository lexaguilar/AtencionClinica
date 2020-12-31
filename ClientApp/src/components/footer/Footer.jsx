// react
import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { getAppInfo } from '../../store/app/appActions';

class Footer extends Component {
    constructor(props) {
        super(props);       
    }

    componentDidMount() {
        let { getAppInfo } = this.props;
        getAppInfo();
    }

    
    render() {
        let { app } = this.props;

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
                        <div className="site-footer__payments">
                            <img src="images/payments.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    app: state.appInfo,
});

const mapDispatchToPros = ({
    getAppInfo
});

export default connect(mapStateToProps, mapDispatchToPros)(Footer);
