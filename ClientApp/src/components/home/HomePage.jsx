
import React from 'react';
import { logoHome } from '../../data/logo';
import http from '../../utils/http';
import Title from '../shared/Title';

export default function HomePage() {

    http('about/info').asGet().then(resp => resp);
    
    return (
        <div className="container text-center mt-50">
            <Title title="Inicio" />
            {logoHome}     
        </div>
    )
}