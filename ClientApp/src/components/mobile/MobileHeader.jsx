// react
import React, { Component } from 'react';

// third-party
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// application
import {
    Menu18x14Svg,
    Search20Svg,
    Cross20Svg,
} from '../../svg';
import { mobileMenuOpen } from '../../store/mobile-menu';
import {logo} from '../../data/logo'

class MobileHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchOpen: false,
        };
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleOutsideClick);
    }

    componentDidUpdate(prevProps, prevState) {
        const { searchOpen } = this.state;

        if (searchOpen && searchOpen !== prevState.searchOpen && this.searchInputRef) {
            this.searchInputRef.focus();
        }
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleOutsideClick);
    }

    setSearchWrapperRef = (node) => {
        this.searchWrapperRef = node;
    };

    setSearchInputRef = (node) => {
        this.searchInputRef = node;
    };

    handleOutsideClick = (event) => {
        if (this.searchWrapperRef && !this.searchWrapperRef.contains(event.target)) {
            this.setState(() => ({ searchOpen: false }));
        }
    };

    handleOpenSearch = () => {
        this.setState(() => ({ searchOpen: true }));
    };

    handleCloseSearch = () => {
        this.setState(() => ({ searchOpen: false }));
    };

    handleSearchKeyDown = (event) => {
        if (event.which === 27) {
            this.setState(() => ({ searchOpen: false }));
        }
    };

    render() {
        const { openMobileMenu } = this.props;
        const { searchOpen } = this.state;
        const searchClasses = classNames('mobile-header__search', {
            'mobile-header__search--opened': searchOpen,
        });

        return (
            <div className="mobile-header">
                <div className="mobile-header__panel">
                    <div className="container">
                        <div className="mobile-header__body">
                            <button type="button" className="mobile-header__menu-button" onClick={openMobileMenu}>
                                <Menu18x14Svg />
                            </button>
                            <Link to="/">{logo}</Link>
                            <div className={searchClasses} ref={this.setSearchWrapperRef}>
                                <form className="mobile-header__search-form" action="">
                                    <input
                                        className="mobile-header__search-input"
                                        name="search"
                                        placeholder="Search over 10,000 products"
                                        aria-label="Site search"
                                        type="text"
                                        autoComplete="off"
                                        onKeyDown={this.handleSearchKeyDown}
                                        ref={this.setSearchInputRef}
                                    />
                                    <button type="submit" className="mobile-header__search-button mobile-header__search-button--submit">
                                        <Search20Svg />
                                    </button>
                                    <button
                                        type="button"
                                        className="mobile-header__search-button mobile-header__search-button--close"
                                        onClick={this.handleCloseSearch}
                                    >
                                        <Cross20Svg />
                                    </button>
                                    <div className="mobile-header__search-body" />
                                </form>
                            </div>

                           
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



const mapDispatchToProps = {
    openMobileMenu: mobileMenuOpen,
};

export default connect(
    null,
    mapDispatchToProps,
)(MobileHeader);
