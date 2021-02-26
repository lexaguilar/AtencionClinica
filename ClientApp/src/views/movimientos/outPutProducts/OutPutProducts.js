import React from 'react';
import BlockHeader from '../../../components/shared/BlockHeader';
import Title from '../../../components/shared/Title';
import { dataAccess, resources } from '../../../data/app';
import useAuthorization from '../../../hooks/useAuthorization';

const OutPutProducts = () => {

    const { authorized } = useAuthorization([resources.movimientos, dataAccess.access ]);

    const title = "Salida de inventario";

    return authorized(
        <div className="container">
            <Title title={title}/>
            <BlockHeader title={title}/>     
            
        </div>
    );
}

export default OutPutProducts;
