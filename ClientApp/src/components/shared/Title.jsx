// react
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

function Title(props) {

    const { title, app } = props;

    return  <Helmet>
                <title>{app.name} - {title}</title>
            </Helmet>
}

const mapStateToProps = (state) => ({   
    app: state.appInfo,        
});

export default connect(mapStateToProps, null)(Title);
