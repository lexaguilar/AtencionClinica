// react
import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
// application
import Indicator from './Indicator';
import { Cross20Svg, Search20Svg } from '../../svg';


class IndicatorSearch extends Component {
    constructor(props) {
        super(props);

        this.input = React.createRef();
        this.indicator = React.createRef();
        this.onSubmit = this.onSubmit.bind(this); 
    }

    handleOpen = () => {
        if (this.input.current) {
            this.input.current.focus();
        }
    };

    handleKeyDown = (event) => {
        if (event.which === 27 && this.indicator.current) {
            this.indicator.current.close();
        }
    };

    onSubmit(e){
        e.preventDefault();
        this.props.history.push({ pathname : `/clinica/paciente/${this.input.current.value}`})
    }

    render() {
        const searchIcon = (
            <React.Fragment>
                <Search20Svg className="indicator__icon" />
                <Cross20Svg className="indicator__icon indicator__icon--open" />
            </React.Fragment>
        );

        const searchDropdown = (
            <div className="drop-search">
                <form action="clinica/paciente" className="drop-search__form" onSubmit={this.onSubmit}>
                    <input
                        ref={this.input}
                        onKeyDown={this.handleKeyDown}
                        className="drop-search__input"
                        name="id"
                        placeholder="Buscar paciente"
                        aria-label="Site search"
                        type="text"
                        autoComplete="off"
                    />
                    <button className="drop-search__button drop-search__button--submit" type="submit">
                        <Search20Svg />
                    </button>
                </form>
            </div>
        );

        return (
            <Indicator
                ref={this.indicator}
                dropdown={searchDropdown}
                icon={searchIcon}
                onOpen={this.handleOpen}
            />
        );
    }
}

export default withRouter(IndicatorSearch);
