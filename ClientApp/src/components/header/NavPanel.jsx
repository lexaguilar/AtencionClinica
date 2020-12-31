// react
import React from 'react';

// third-party
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// application
import NavLinks from './NavLinks';
import IndicatorSearch from './IndicatorSearch';
import { logo, colorNavBar } from '../../data/logo';


function NavPanel(props) {
    const { layout } = props;

    let _logo = null;
    let searchIndicator;
  
    _logo = (
        <div className="nav-panel__logo" style={{paddingRight:20}}>
            <Link to="/">{logo}</Link>
        </div>
    );

    searchIndicator = <IndicatorSearch />;

    var color = colorNavBar(layout);

    return (
        <div className="nav-panel" style={{background : color}}>
            <div className="nav-panel__container container">
                <div className="nav-panel__row">
                    {_logo}                   

                    <div className="nav-panel__nav-links nav-links">
                        <NavLinks layout={layout} />
                    </div>

                    <div className="nav-panel__indicators">
                        {searchIndicator}
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    wishlist: state.wishlist,
});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NavPanel);
