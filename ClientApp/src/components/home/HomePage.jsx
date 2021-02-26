// react
import React from 'react';

// third-party
import { Helmet } from 'react-helmet';
import { logoHome } from '../../data/logo';
import Title from '../shared/Title';

export default function HomePage() {
    
    return (
        <div className="container text-center mt-50">
            <Title title="Inicio" />
            {logoHome}     
        </div>
    )
}