import React from 'react';
import BlockHeader from '../../../components/shared/BlockHeader';
import Title from '../../../components/shared/Title';

const OutPutProducts = () => {

    const title = "Salida de inventario";

    return (
        <div className="container">
            <Title title={title}/>
            <BlockHeader title={title}/>     
            
        </div>
    );
}

export default OutPutProducts;
