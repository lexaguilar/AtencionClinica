// react
import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { getCorte } from '../../store/corte/corteActions'
import { Component } from 'react';

import Dropdown from './Dropdown';
import { updateUser } from '../../store/user/userActions';

class DropdownCorte extends Component {
    constructor(props) {
        super(props)
        
    }        

    componentDidMount(){
        
        const { getCorte } = this.props;
        getCorte();

    }
   
    render(){

        const { cortes, user, updateUser } = this.props;

        const corte = cortes.find(x => x.id == user.corteId);    
    
        const title = (
            <React.Fragment>
                <FormattedMessage id="topbar.periodo" defaultMessage="Periodo" />
                {': '}
                <span className="topbar__item-value">{corte?corte.descripcion:''}</span>
            </React.Fragment>
        );

        
        return (
            <Dropdown
            title={title}
            items={cortes.map(corte =>({title:corte.descripcion, id:corte.id}))}
            onClick={c =>updateUser({corteId: c.id})}
            />
            );
        }
    }

DropdownCorte.propTypes = {
    cortes: PropTypes.array,
    user  : PropTypes.object
}

const mapDispatchToPros = ({
    getCorte,
    updateUser,
});

const mapStateToProps = (state) => ({     
        cortes: state.cortes,
        user: state.user,        
});

export default connect(mapStateToProps, mapDispatchToPros)(DropdownCorte);
