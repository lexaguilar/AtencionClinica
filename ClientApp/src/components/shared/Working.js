import React from 'react';
import Title from '../shared/Title';
import { working } from '../../data/logo';

const Working = () => {
    return (
        <div className="container text-center mt-50">
            <Title title="Inicio" />
            {working}     
        </div>
    );
}

export default Working;
